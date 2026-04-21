import { cn } from "../../lib/utils"

export function PortalCard({
  children,
  className = "",
  accent = "red",
  padding = "md",
}) {
  const accentClass =
    accent === "gold"
      ? "before:bg-[#caa447]"
      : accent === "none"
        ? "before:hidden"
        : "before:bg-[#9b1810]"

  const paddingClass = padding === "sm" ? "p-4" : padding === "lg" ? "p-7" : "p-6"

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[6px] border border-[#ebe1d5] bg-white shadow-[0_14px_30px_rgba(74,25,16,0.06)] before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px]",
        accentClass,
        paddingClass,
        className,
      )}
    >
      {children}
    </section>
  )
}

