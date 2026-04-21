// AdminAnalyticsPage.jsx
import { useState } from "react"
import { Download } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminAnalyticsRows } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, ChartCard, ResponsiveTable,
  StatusPill, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminAnalyticsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="The Analytics Ledger"
          description="Get a visual understanding of institutional trends, revenue health, and campaign performance from the registry intelligence layer."
          actions={
            <>
              <PortalButton onClick={() => setModalOpen(true)}>
                <Download className="h-4 w-4" />Export Report
              </PortalButton>
              <PortalButton
                variant="outline"
                onClick={() => setToastMessage("Analytics print view opened successfully.")}
              >
                FYA Print View
              </PortalButton>
            </>
          }
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_330px]">
          <ChartCard
            title="Enrollment Projections"
            right={
              <div className="flex gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a68e7c]">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#75110d]" />Undergraduate</span>
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#d4c7b8]" />Postgraduate</span>
              </div>
            }
          >
            <div className="mt-6 h-[220px] rounded-[8px] bg-[#fffdfa] p-4">
              <div className="flex h-full items-end gap-4">
                {[45, 56, 72, 90, 104].map((bar) => (
                  <div key={bar} className="flex flex-1 items-end rounded-[4px] bg-[#f3ede4]">
                    <div className="w-full rounded-[4px] bg-[#75110d]" style={{ height: `${bar}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <div className="space-y-5">
            <PortalCard className="bg-[#8f120d] text-white before:bg-[#8f120d]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Revenue Delta</p>
              <p className="mt-3 text-[42px] font-bold">$2.84M</p>
              <p className="mt-2 text-sm text-white/80">+32.4% above last quarter benchmark</p>
            </PortalCard>
            <PortalCard accent="gold">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Internet Uptime</p>
              <p className="mt-3 text-[44px] font-bold text-[#b08a2b]">92.4%</p>
              <p className="mt-2 text-sm text-[#8b7969]">Current infrastructure health</p>
            </PortalCard>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_280px_280px]">
          <PortalCard accent="gold">
            <p className="text-[22px] font-bold text-[#4f1d14]">Faculty Performance Forecast</p>
            <div className="mt-5 space-y-3">
              {[
                ["Faculty of Engineering", "Strong"],
                ["Pure & Applied Sciences", "Stable"],
                ["Management Sciences", "Stable"],
                ["General Studies", "Watch"],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="flex items-center justify-between rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] px-4 py-3"
                >
                  <span className="text-sm font-semibold text-[#541b13]">{item[0]}</span>
                  <StatusPill>{item[1]}</StatusPill>
                </div>
              ))}
            </div>
          </PortalCard>

          <PortalCard accent="gold">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Enrollment Split</p>
            <div className="mt-8 flex h-[180px] items-center justify-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[16px] border-[#75110d] border-r-[#d9c4b2] border-b-[#d9c4b2]">
                <span className="text-[28px] font-bold text-[#651d13]">62%</span>
              </div>
            </div>
          </PortalCard>

          <PortalCard accent="gold">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Internet Uptime</p>
            <p className="mt-6 text-[48px] font-bold text-[#b08a2b]">92.4%</p>
          </PortalCard>
        </div>

        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#4f1d14]">Recent Financials</p>
            <button className="rounded-full bg-[#fff3d8] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#aa7b11]">
              Certified
            </button>
          </div>
          <div className="mt-4">
            <ResponsiveTable
              headers={["Transaction ID", "Activity / Narration", "Faculty", "Amount"]}
              rows={adminAnalyticsRows}
              renderRow={(row) => (
                <tr key={row[0]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
                  <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
                  <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
                  <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
                  <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4 font-semibold">{row[3]}</td>
                </tr>
              )}
              mobileRender={(row) => (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#5c2418]">{row[0]}</p>
                  <p className="text-sm text-[#8b7969]">{row[1]}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#a38e7c]">{row[2]}</span>
                    <span className="text-sm font-semibold text-[#5c2418]">{row[3]}</span>
                  </div>
                </div>
              )}
            />
          </div>
        </PortalCard>
      </div>

      <StandardActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Export Analytics Report"
        description="Prepare an export of the current analytics ledger view."
        confirmLabel="Queue Export"
        onConfirm={() => {
          setModalOpen(false)
          setToastMessage("Analytics report export queued successfully.")
        }}
      />
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}