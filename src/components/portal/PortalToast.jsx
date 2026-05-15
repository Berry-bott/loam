import { useEffect } from "react"
import { CheckCircle2 } from "lucide-react"

export function PortalToast({ open, message, onClose }) {
  useEffect(() => {
    if (!open) return
    const timeout = window.setTimeout(onClose, 2600)
    return () => window.clearTimeout(timeout)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed bottom-4 right-4 z-[130] w-[calc(100vw-2rem)] max-w-sm rounded-[14px] border border-portal-border-soft bg-portal-surface p-4 shadow-[0_18px_45px_rgba(44,16,10,0.18)]">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-portal-status-success-bg p-1 text-portal-status-success-text">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-950">Action completed</p>
          <p className="mt-1 text-sm text-stone-500">{message}</p>
        </div>
      </div>
    </div>
  )
}

