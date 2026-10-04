"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function SubmitButton({ children, className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending || props.disabled}
      className={`bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-70 flex items-center justify-center gap-2 ${className || ""}`}
      {...props}
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? "Lütfen bekleyin..." : children}
    </button>
  )
}
