'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { showToast } from '@/app/components/ToastProvider'

const OTP_LENGTH = 6
const RESEND_DELAY = 30

const page = () => {
    const router = useRouter()
    const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
    const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY)
    const [email, setEmail] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const inputRefs = useRef([])

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('verificationEmail')
        if (storedEmail) {
            setEmail(storedEmail)
            return
        }

        try {
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || 'null')
            setEmail(userInfo?.email || userInfo?.userInfo?.email || '')
        } catch {
            setEmail('')
        }
    }, [])

    useEffect(() => {
        if (secondsLeft === 0) return undefined
        const timerId = window.setTimeout(() => {
            setSecondsLeft((remaining) => Math.max(remaining - 1, 0))
        }, 1000)
        return () => window.clearTimeout(timerId)
    }, [secondsLeft])

    const fillDigits = (startIndex, value) => {
        const numbers = value.replace(/\D/g, '')
        if (!numbers) {
            setDigits((currentDigits) => currentDigits.map((digit, index) => index === startIndex ? '' : digit))
            return
        }

        setDigits((currentDigits) => {
            const nextDigits = [...currentDigits]
            numbers.slice(0, OTP_LENGTH - startIndex).split('').forEach((number, offset) => {
                nextDigits[startIndex + offset] = number
            })
            return nextDigits
        })
        inputRefs.current[Math.min(startIndex + numbers.length, OTP_LENGTH - 1)]?.focus()
    }

    const handlePaste = (event, index) => {
        event.preventDefault()
        fillDigits(index, event.clipboardData.getData('text'))
    }

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !digits[index] && index > 0) inputRefs.current[index - 1]?.focus()
        if (event.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus()
        if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
    }

    const handleResend = () => {
        if (!email || isResending) return

        setIsResending(true)
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/resendotp`, { email })
            .then((response) => {
                setDigits(Array(OTP_LENGTH).fill(''))
                setSecondsLeft(RESEND_DELAY)
                inputRefs.current[0]?.focus()
                showToast(response.data?.message || 'A new OTP has been sent to your email.')
            })
            .catch((error) => {
                showToast(error.response?.data?.message || 'Unable to resend OTP. Please try again.', 'error')
            })
            .finally(() => setIsResending(false))
    }

    const handleVerify = async () => {
        const otp = digits.join('')
        if (otp.length !== OTP_LENGTH || isVerifying) {
            if (otp.length !== OTP_LENGTH) showToast('Please enter the complete 6-digit OTP.', 'error')
            return
        }

        setIsVerifying(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verifyotp`, { otp })
            sessionStorage.removeItem('verificationEmail')
            showToast(response.data?.message || 'Email verified successfully.')
            router.push('/login')
        } catch (error) {
            showToast(error.response?.data?.message || 'Unable to verify OTP. Please try again.', 'error')
        } finally {
            setIsVerifying(false)
        }
    }

    const canResend = secondsLeft === 0

  return (
        <main className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:grid-cols-2 sm:gap-14 sm:px-6">
            <Image width={400} height={400} src="/group3653.png" alt="Account verification" className="mx-auto hidden h-auto w-auto sm:block" />
            <section className="mx-auto w-full max-w-lg">
                <p className="mb-2 text-center font-poppins text-sm font-semibold uppercase tracking-[0.16em] text-[#01A49E] sm:text-left">Account security</p>
                <h1 className="font-poppins text-center text-3xl font-semibold text-[#212529] sm:text-left">Verify your email</h1>
                <p className="mt-3 text-center font-poppins text-sm leading-6 text-[#666666] sm:text-left">Enter the 6-digit code sent to your email address.</p>

                <div className="mt-8">
                    <label className="mb-3 block font-poppins text-sm font-medium text-deepdark">Verification code</label>
                    <div className="grid grid-cols-6 gap-2 sm:gap-3" role="group" aria-label="6-digit verification code">
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                ref={(element) => { inputRefs.current[index] = element }}
                                aria-label={`Digit ${index + 1}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                                value={digit}
                                onChange={(event) => fillDigits(index, event.target.value)}
                                onPaste={(event) => handlePaste(event, index)}
                                onKeyDown={(event) => handleKeyDown(event, index)}
                                className="h-12 min-w-0 rounded-md border border-[#c9e3e1] bg-white text-center font-poppins text-xl font-semibold text-[#212529] outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15 sm:h-14"
                            />
                        ))}
                    </div>
                    <button type="button" onClick={handleVerify} disabled={isVerifying || isResending || digits.some((digit) => !digit)} className="mt-6 w-full rounded-md bg-[#01A49E] px-8 py-4 font-poppins text-base font-semibold text-white cursor-pointer transition hover:bg-[#028d88] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                        {isVerifying ? 'VERIFYING...' : 'VERIFY OTP'}
                    </button>
                    <div className="mt-5 text-center font-poppins text-sm">
                        {canResend ? (
                            <button type="button" onClick={handleResend} disabled={isResending || !email} className="font-semibold text-[#01A49E] transition hover:text-[#028d88] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                                {isResending ? 'Sending OTP...' : 'Resend OTP'}
                            </button>
                        ) : (
                            <p className="text-[#666666]" aria-live="polite">
                                Resend OTP in <span className="font-semibold tabular-nums text-[#212529]">00:{String(secondsLeft).padStart(2, '0')}</span>
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
  )
}

export default page