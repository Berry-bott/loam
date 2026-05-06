// AdminPaymentsPage.jsx
import { useState } from "react"
import { Download } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminPaymentRows } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, MetricCard, ChartCard,
  ResponsiveTable, StatusPill, FilterBar, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminPaymentsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>LOAM POLYTECHNIC</PageEyebrow>
        <PageTitle
          title="Payment Monitoring"
          description="Observe live institutional collections, trace failed transactions, and reconcile pending student obligations."
          actions={
            <>
              <PortalButton
                variant="outline"
                onClick={() => setToastMessage("Printable ledger copy opened.")}
              >
                Print Ledger Copy
              </PortalButton>
              <PortalButton onClick={() => setModalOpen(true)}>
                <Download className="h-4 w-4" />Export Ledger
              </PortalButton>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Institution Revenue" value="N42.8M" note="Running collection" />
          <MetricCard label="Receipts Today" value="146" note="At 3 pm" accent="gold" />
          <MetricCard label="Billed Users" value="12" note="Awaiting action" accent="gold" />
          <MetricCard label="Disputed Payments" value="03" note="Needs manual review" />
        </div>

        <PortalCard>
          <div className="mb-4">
            <FilterBar
              filters={["By Department", "Receipt Type", "Date Range"]}
              onAction={() => setToastMessage("Payment filters applied successfully.")}
              onSelect={(value) => setToastMessage(`${value} selected.`)}
            />
          </div>
          <ResponsiveTable
            headers={["ID", "Student / Payer", "Description", "Amount", "Status"]}
            rows={adminPaymentRows}
            renderRow={(row) => (
              <tr key={row[0]} className="bg-portal-surface text-sm text-portal-text">
                <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4 font-semibold">{row[0]}</td>
                <td className="border-y border-portal-border px-4 py-4">{row[1]}</td>
                <td className="border-y border-portal-border px-4 py-4">{row[2]}</td>
                <td className="border-y border-portal-border px-4 py-4 font-semibold">{row[3]}</td>
                <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4">
                  <StatusPill>{row[4]}</StatusPill>
                </td>
              </tr>
            )}
            mobileRender={(row) => (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-portal-text">{row[1]}</p>
                <p className="text-sm text-portal-text-muted">{row[2]}</p>
                <p className="text-lg font-bold text-portal-text">{row[3]}</p>
                <StatusPill>{row[4]}</StatusPill>
              </div>
            )}
          />
        </PortalCard>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_320px]">
          <ChartCard title="Revenue Trend" accent="gold">
            <div className="mt-6 flex h-[220px] items-end gap-4 rounded-[8px] bg-portal-surface p-4">
              {[70, 95, 88, 120, 104, 138].map((bar, index) => (
                <div key={bar} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex h-full w-full items-end rounded-[4px] bg-[#f4eee6]">
                    <div
                      className={`w-full rounded-[4px] ${index === 5 ? "bg-analytics-series-primary" : "bg-[#ebe1d6]"}`}
                      style={{ height: `${bar}px` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ad9a86]">{`M${index + 1}`}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <PortalCard className="bg-[#283f53] text-white before:bg-[#283f53]">
            <p className="text-[22px] font-bold">Exception Monitor</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>Duplicate transaction flagged in faculty services.</li>
              <li>Pending verification for receipt batch #9034.</li>
              <li>Cashless kiosk sync delayed in satellite campus.</li>
            </ul>
          </PortalCard>
        </div>
      </div>

      <StandardActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Export Payment Ledger"
        description="Download a ledger report for finance reconciliation and reporting."
        confirmLabel="Export Ledger"
        onConfirm={() => {
          setModalOpen(false)
          setToastMessage("Payment ledger export queued successfully.")
        }}
      />
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
