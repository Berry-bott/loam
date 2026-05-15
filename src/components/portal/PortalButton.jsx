import { cn } from "../../lib/utils"

const variants = {
  primary:
    "bg-primary text-white shadow-[0_10px_18px_rgba(109,15,13,0.18)] hover:bg-red-900",
  outline:
    "border border-stone-300 bg-white text-red-900 hover:bg-stone-50",
  ghost:
    "bg-transparent text-red-900 hover:bg-portal-surface-soft",
  gold:
    "bg-amber-300 text-red-950 hover:bg-amber-500",
  soft:
    "bg-stone-100 text-red-900 hover:bg-stone-100",
}

export function PortalButton({
  className = "",
  variant = "primary",
  size = "md",
  children,
  ...props
}) {
  const sizeClass =
    size === "sm"
      ? "h-9 px-4 text-[11px] tracking-[0.12em]"
      : size === "lg"
        ? "h-12 px-6 text-[12px] tracking-[0.16em]"
        : "h-10 px-5 text-[11px] tracking-[0.14em]"

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold uppercase transition-colors",
        sizeClass,
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}


