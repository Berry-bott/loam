
// AdminDashboardPage.jsx
import { useEffect, useState } from "react"
import { Download, Plus } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminActivityRows } from "../../lib/portal-data"
import { getOverview } from "../../store/admin/adminApi"
import {
  PageEyebrow, PageTitle, MetricCard, ChartCard,
  ResponsiveTable, StatusPill, StandardActionModal,
} from "../../components/admin-shared/Shared"

const overviewCardTemplate = [
  { label: "Total Students", note: "Registered student records", accent: "red" },
  { label: "Total Staff", note: "Active administrative staff", accent: "gold" },
  { label: "Departments", note: "Academic departments configured", accent: "red" },
  { label: "Courses", note: "Course registry entries", accent: "gold" },
  { label: "Applications", note: "Admission applications received", accent: "red" },
]

let overviewCache = null
let overviewRequest = null

function formatMetricValue(value) {
  if (value === undefined || value === null || value === "") return "0"
  return typeof value === "number" ? value.toLocaleString() : String(value)
}

async function loadOverviewOnce() {
  if (overviewCache) return overviewCache
  if (overviewRequest) return overviewRequest

  overviewRequest = getOverview()
    .then((payload) => {
      overviewCache = payload
      return payload
    })
    .finally(() => {
      overviewRequest = null
    })

  return overviewRequest
}

export default function AdminDashboardPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [overviewStats, setOverviewStats] = useState(
    overviewCardTemplate.map((item) => ({ ...item, value: "0" })),
  )

  useEffect(() => {
    let ignore = false

    const loadOverview = async () => {
      try {
        const payload = await loadOverviewOnce()
        if (ignore) return

        const totals = payload?.data?.totals || {}
        setOverviewStats([
          {
            ...overviewCardTemplate[0],
            value: formatMetricValue(totals.students),
          },
          {
            ...overviewCardTemplate[1],
            value: formatMetricValue(totals.staff),
          },
          {
            ...overviewCardTemplate[2],
            value: formatMetricValue(totals.departments),
          },
          {
            ...overviewCardTemplate[3],
            value: formatMetricValue(totals.courses),
          },
          {
            ...overviewCardTemplate[4],
            value: formatMetricValue(totals.applications),
          },
        ])
      } catch (error) {
        if (!ignore) {
          setToastMessage(error.message || "Unable to load dashboard overview right now.")
        }
      }
    }

    loadOverview()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>LOAM POLYTECHNIC</PageEyebrow>
        <PageTitle
          title="Dashboard Overview"
          description="Institutional performance and application pipeline"
          actions={
            <>
              <PortalButton variant="outline" onClick={() => setModalOpen(true)}>
                <Download className="h-4 w-4" />
                Export PDF
              </PortalButton>
              <PortalButton onClick={() => setToastMessage("New record workspace opened from the dashboard overview.")}>
                <Plus className="h-4 w-4" />
                New Record
              </PortalButton>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {overviewStats.map((item, index) => (
            <MetricCard
              key={item.label}
              label={item.label}
              value={item.value}
              note={item.note}
              accent={index === 1 ? "gold" : "red"}
            />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]">
          <ChartCard
            title="Application Trends"
            right={
              <div className="flex gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-analytics-series-primary" />Current</span>
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-analytics-series-secondary" />Previous</span>
              </div>
            }
          >
            <div className="mt-6 flex h-[220px] items-end gap-3 rounded-[8px] bg-portal-surface p-4">
              {[42, 54, 87, 110, 94, 128].map((bar, index) => (
                <div key={bar} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div className="relative flex h-full w-full items-end justify-center rounded-[4px] bg-stone-100">
                    <div
                      className={`w-full rounded-[4px] ${index % 2 === 0 ? "bg-stone-200" : "bg-analytics-series-primary"}`}
                      style={{ height: `${bar}px` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">{`Q${index + 1}`}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard
            title="Revenue Summary"
            accent="gold"
            right={
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-analytics-gold-value">
                Current Year
              </span>
            }
          >
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">Tuition Revenue</p>
                <p className="mt-2 text-[34px] font-bold text-shared-title">N214.8M</p>
                <div className="mt-4 h-2 rounded-full bg-stone-200"><div className="h-2 w-[68%] rounded-full bg-analytics-series-primary" /></div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">Target Achieved</p>
                <p className="mt-2 text-[34px] font-bold text-shared-title">N90.4M</p>
                <div className="mt-4 h-2 rounded-full bg-stone-200"><div className="h-2 w-[52%] rounded-full bg-amber-600" /></div>
              </div>
            </div>
          </ChartCard>
        </div>

        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-portal-text-strong">Recent Institutional Activity</p>
            <button
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-portal-brand-soft"
              onClick={() => setToastMessage("Ledger archive panel opened successfully.")}
            >
              View Ledger Archive
            </button>
          </div>
          <div className="mt-4">
            <ResponsiveTable
              headers={["Transaction / Action", "Update Unit", "Status", "Timestamp", "Reference"]}
              rows={adminActivityRows}
              renderRow={(row) => (
                <tr key={row.reference} className="bg-portal-surface text-sm text-portal-text">
                  <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4 font-semibold">{row.action}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row.department}</td>
                  <td className="border-y border-portal-border px-4 py-4"><StatusPill>{row.status}</StatusPill></td>
                  <td className="border-y border-portal-border px-4 py-4">{row.timestamp}</td>
                  <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">{row.reference}</td>
                </tr>
              )}
              mobileRender={(row) => (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-portal-text">{row.action}</p>
                  <p className="text-sm text-portal-text-muted">{row.department}</p>
                  <div className="flex items-center justify-between">
                    <StatusPill>{row.status}</StatusPill>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-portal-text-faded">{row.reference}</span>
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
        title="Export Institutional Report"
        description="Generate a PDF summary of the current dashboard metrics and ledger activity."
        confirmLabel="Export Report"
        onConfirm={() => {
          setModalOpen(false)
          setToastMessage("Dashboard PDF export queued successfully.")
        }}
      />
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}

