'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}
      className="font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
}
