// shared.jsx
// Shared helpers, layout primitives, and compound components used across all admin pages.

import { PortalButton } from "../portal/PortalButton"
import { PortalCard } from "../portal/PortalCard"
import { PortalDropdown } from "../portal/PortalDropdown"
import { PortalModal } from "../portal/PortalModal"

// ─── Utility helpers ─────────────────────────────────────────────────────────

export function toneClass(tone) {
  if (tone === "green") return "text-[#2f8a44]"
  if (tone === "red") return "text-[#b81d13]"
  return "text-[#b18a1d]"
}

export function statusClass(status) {
  const value = status.toLowerCase()
  if (
    value.includes("approved") || value.includes("success") ||
    value.includes("verified") || value.includes("cleared") ||
    value.includes("strong")
  ) return "bg-[#eaf7ec] text-[#2f8a44]"
  if (value.includes("rejected") || value.includes("failed") || value.includes("urgent"))
    return "bg-[#fde8e4] text-[#b81d13]"
  if (
    value.includes("official") || value.includes("live") ||
    value.includes("reviewed") || value.includes("stable")
  ) return "bg-[#ebf3fe] text-[#3c78b4]"
  return "bg-[#fff3d8] text-[#aa7b11]"
}

// ─── Layout primitives ────────────────────────────────────────────────────────

export function PageEyebrow({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">
      {children}
    </p>
  )
}

export function PageTitle({ title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <h1 className="text-[30px] font-bold tracking-tight text-[#651d13] sm:text-[44px]">
          {title}
        </h1>
        <p className="mt-2 max-w-[720px] text-sm leading-6 text-[#8d7a68] sm:text-[15px]">
          {description}
        </p>
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  )
}

export function StatusPill({ children }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClass(children)}`}
    >
      {children}
    </span>
  )
}

export function MetricCard({ label, value, note, accent = "red" }) {
  return (
    <PortalCard accent={accent} className="p-5 h-[150px]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a88f7d]">
        {label}
      </p>
      <p className="mt-4 text-[19px] font-extrabold text-[#541b13]">{value}</p>
      <p
        className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${toneClass(
          note?.toLowerCase().includes("priority") || note?.toLowerCase().includes("needs")
            ? "red"
            : "green"
        )}`}
      >
        {note}
      </p>
    </PortalCard>
  )
}

export function ChartCard({ title, children, accent = "red", right }) {
  return (
    <PortalCard accent={accent}>
      <div className="flex items-center justify-between">
        <p className="text-[22px] font-bold text-[#4f1d14]">{title}</p>
        {right}
      </div>
      {children}
    </PortalCard>
  )
}

export function ResponsiveTable({ headers, rows, renderRow, mobileRender }) {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b09d88]">
              {headers.map((header) => (
                <th key={header} className="pb-1">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows.map(renderRow)}</tbody>
        </table>
      </div>
      <div className="space-y-3 md:hidden">
        {rows.map((row, index) => (
          <div key={index} className="rounded-[10px] border border-[#efe4d6] bg-[#fffdfa] p-4">
            {mobileRender(row)}
          </div>
        ))}
      </div>
    </>
  )
}

export function FilterBar({ filters, onAction, onSelect }) {
  return (
    <div className="grid gap-3 md:grid-cols-[repeat(3,minmax(0,1fr))_160px]">
      {filters.map((filter) => (
        <PortalDropdown
          key={filter}
          label={filter}
          align="left"
          className="w-full"
          triggerClassName="w-full justify-between text-sm normal-case tracking-normal font-medium"
          items={[
            { label: `${filter} option 1`, onClick: () => onSelect?.(`${filter} option 1`) },
            { label: `${filter} option 2`, onClick: () => onSelect?.(`${filter} option 2`) },
            { label: `${filter} option 3`, onClick: () => onSelect?.(`${filter} option 3`) },
          ]}
        />
      ))}
      <PortalButton variant="gold" className="w-full" onClick={onAction}>
        Apply Filter
      </PortalButton>
    </div>
  )
}

export function StandardActionModal({
  open, onClose, title, description, confirmLabel = "Continue", onConfirm,
}) {
  return (
    <PortalModal open={open} onClose={onClose} title={title} description={description}>
      <div className="space-y-4">
        <div className="rounded-[12px] bg-[#faf3ea] p-4 text-sm leading-6 text-[#7f6d5f]">
          This interaction is working as a frontend flow and is ready to be connected to your backend process.
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <PortalButton onClick={onConfirm}>{confirmLabel}</PortalButton>
          <PortalButton variant="outline" onClick={onClose}>Cancel</PortalButton>
        </div>
      </div>
    </PortalModal>
  )
}