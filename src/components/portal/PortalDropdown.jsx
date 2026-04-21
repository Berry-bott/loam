import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

export function PortalDropdown({
  label,
  items = [],
  className = "",
  menuClassName = "",
  align = "right",
  triggerClassName = "",
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleOutside = (event) => {
      if (!ref.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-[6px] border border-[#eadfce] bg-white px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7e6c5e]",
          triggerClassName,
        )}
      >
        <span>{label}</span>
      </button>

      {open ? (
        <div
          className={cn(
            "absolute top-[calc(100%+8px)] z-30 min-w-[200px] rounded-[10px] border border-[#eadfce] bg-[#fffdfa] p-2 shadow-[0_18px_40px_rgba(44,16,10,0.14)]",
            align === "left" ? "left-0" : "right-0",
            menuClassName,
          )}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setOpen(false)
                item.onClick?.()
              }}
              className="flex w-full items-center justify-between rounded-[6px] px-3 py-2.5 text-left text-sm text-[#5e2619] transition-colors hover:bg-[#faf3ea]"
            >
              <span>{item.label}</span>
              {item.meta ? <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b59a58]">{item.meta}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
