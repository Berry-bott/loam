import { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

export function PortalModal({
  open,
  onClose,
  title,
  description,
  children,
  className = "",
}) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#230705]/55 px-4 py-6 backdrop-blur-[3px]">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        className={cn(
          "relative z-10 w-full max-w-[560px] overflow-hidden rounded-[16px] border border-portal-border-soft bg-portal-surface shadow-[0_25px_60px_rgba(50,16,10,0.26)]",
          className,
        )}
      >
        <div className="border-b border-[#efe5db] px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[22px] font-bold tracking-tight text-[#551d14]">{title}</p>
              {description ? <p className="mt-1 text-sm leading-6 text-[#8d7a68]">{description}</p> : null}
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-portal-border-soft bg-white text-[#7a6554]"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>
      </div>
    </div>
  )
}


