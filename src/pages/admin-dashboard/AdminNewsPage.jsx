// AdminNewsPage.jsx
import { useState } from "react"
import { Eye, Plus, Settings2 } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminNewsItems } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, MetricCard, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminNewsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>Institutional Communications</PageEyebrow>
        <PageTitle
          title="News Management"
          description="Track and schedule all institutional bulletins, news items, announcements, and faculty notices."
          actions={
            <PortalButton onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" />Create News Bulletin
            </PortalButton>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.35fr]">
          <MetricCard label="Published Stories" value="1,284" note="+ 12% this month" />
          <MetricCard label="Active Announcers" value="14" note="Across all faculties" accent="gold" />
          <PortalCard className="bg-[linear-gradient(135deg,#7b0f0d,#b32a1d)] text-white before:bg-transparent">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Priority Alert</p>
            <p className="mt-3 text-[26px] font-bold leading-tight">
              Emergency Protocol Update: Faculty of Engineering
            </p>
          </PortalCard>
        </div>

        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-portal-text-strong">Recent Uploads / News</p>
            <div className="flex gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft">
              <button onClick={() => setToastMessage("Faculty filter options opened.")}>Filter by Faculty</button>
              <button onClick={() => setToastMessage("News list sorted by date.")}>Sort by Date</button>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {adminNewsItems.map((item) => (
              <div
                key={item[1]}
                className="flex flex-col gap-4 rounded-[6px] border border-portal-border bg-portal-surface px-4 py-4 sm:flex-row sm:items-center"
              >
                <div className="w-14 rounded-[4px] border border-portal-border bg-[#faf5ed] px-2 py-2 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-analytics-gold-label">
                    {item[0].split(" ")[1]}
                  </p>
                  <p className="text-[20px] font-bold text-[#5c1a12]">{item[0].split(" ")[0]}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-portal-text-strong">{item[1]}</p>
                  <p className="text-sm text-[#a18f7d]">{item[2]}</p>
                </div>
                <div className="flex gap-3 text-portal-brand-soft">
                  <button onClick={() => setToastMessage(`Preview opened for "${item[1]}".`)}>
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => setToastMessage(`Editing tools opened for "${item[1]}".`)}>
                    <Settings2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </PortalCard>
      </div>

      <StandardActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create News Bulletin"
        description="Draft a new institutional update for publication."
        confirmLabel="Create Bulletin"
        onConfirm={() => {
          setModalOpen(false)
          setToastMessage("News bulletin draft created successfully.")
        }}
      />
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
