import { cn } from "../../lib/utils"

export function PortalSkeleton({ className = "" }) {
  return <div className={cn("spotify-skeleton rounded-[10px]", className)} aria-hidden="true" />
}

export function PortalCardSkeleton({
  lines = 3,
  className = "",
  showBadge = false,
}) {
  return (
    <div className={cn("rounded-[10px] border border-portal-border bg-portal-surface px-4 py-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-3">
          <PortalSkeleton className="h-5 w-40" />
          {Array.from({ length: lines }).map((_, index) => (
            <PortalSkeleton
              key={index}
              className={`h-4 ${index === lines - 1 ? "w-28" : "w-full"}`}
            />
          ))}
        </div>
        {showBadge ? <PortalSkeleton className="h-8 w-24 rounded-full" /> : null}
      </div>
    </div>
  )
}
