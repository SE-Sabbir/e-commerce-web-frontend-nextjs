"use client";

import { useEffect, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";

export function showToast(message, type = "success") {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("app-toast", { detail: { message, type } }));
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const id = `${Date.now()}-${Math.random()}`;
      const toast = { id, ...event.detail };

      setToasts((currentToasts) => [...currentToasts, toast]);
      window.setTimeout(() => {
        setToasts((currentToasts) => currentToasts.filter((item) => item.id !== id));
      }, 4000);
    };

    window.addEventListener("app-toast", handleToast);
    return () => window.removeEventListener("app-toast", handleToast);
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-100 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3" aria-live="polite">
      {toasts.map((toast) => {
        const isError = toast.type === "error";
        const Icon = isError ? FiAlertCircle : FiCheckCircle;

        return (
          <div
            key={toast.id}
            role={isError ? "alert" : "status"}
            className={`pointer-events-auto flex items-start gap-3 rounded-lg border bg-white p-4 shadow-lg ${isError ? "border-red-200 text-red-700" : "border-emerald-200 text-emerald-800"}`}
          >
            <Icon className="mt-0.5 shrink-0 text-lg" />
            <p className="min-w-0 flex-1 text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setToasts((currentToasts) => currentToasts.filter((item) => item.id !== toast.id))}
              className="shrink-0 text-current opacity-70 transition hover:opacity-100"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}