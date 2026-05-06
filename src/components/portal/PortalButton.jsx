import { cn } from "../../lib/utils"

const variants = {
  primary:
    "bg-primary text-white shadow-[0_10px_18px_rgba(109,15,13,0.18)] hover:bg-[#7d0f0b]",
  outline:
    "border border-[#d8cdbf] bg-white text-[#6f170f] hover:bg-[#faf5ef]",
  ghost:
    "bg-transparent text-[#6f170f] hover:bg-portal-surface-soft",
  gold:
    "bg-[#f3c95f] text-[#5c1c10] hover:bg-[#e8bd51]",
  soft:
    "bg-[#f6f1e8] text-[#6f170f] hover:bg-[#efe4d3]",
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


