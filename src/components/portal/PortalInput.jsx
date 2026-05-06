import { cn } from "../../lib/utils"

export function PortalInput({
  label,
  hint,
  rightLabel,
  className = "",
  inputClassName = "",
  inputWrapperClassName = "",
  trailingElement,
  ...props
}) {
  return (
    <label className={cn("block", className)}>
      {(label || rightLabel) && (
        <span className="mb-2 flex items-center justify-between text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#8d7969]">
          <span>{label}</span>
          {rightLabel ? <span className="text-[#b48d2d]">{rightLabel}</span> : null}
        </span>
      )}
      <div className={cn("relative", inputWrapperClassName)}>
        <input
          className={cn(
            "h-12 w-full rounded-[3px] border border-admin-field-border bg-admin-field-bg px-4 text-sm text-admin-field-text placeholder:text-[#d0c5b7] outline-none transition focus:border-admin-field-focus-border focus:ring-2 focus:ring-admin-field-focus-ring",
            trailingElement ? "pr-14" : "",
            inputClassName,
          )}
          {...props}
        />
        {trailingElement ? (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {trailingElement}
          </div>
        ) : null}
      </div>
      {hint ? <span className="mt-1 block text-xs text-[#9f8f7f]">{hint}</span> : null}
    </label>
  )
}

