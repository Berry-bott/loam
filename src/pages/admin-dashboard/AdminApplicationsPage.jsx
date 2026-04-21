// AdminApplicationsPage.jsx
import { useState } from "react"
import { Download, Eye, Search, Settings2 } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminApplicationRows } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, MetricCard, ResponsiveTable,
  StatusPill, FilterBar, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminApplicationsPage() {
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="Manage Applications"
          description="Review and process student admission files for the 2025 academic session."
          actions={
            <PortalButton onClick={() => setToastMessage("Application ledger export queued successfully.")}>
              <Download className="h-4 w-4" />Export Ledger
            </PortalButton>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Pending Review" value="1,482" note="+16% increase from last week" />
          <MetricCard label="Screened" value="342" note="Avg. wait time 4.2 days" accent="gold" />
          <MetricCard label="Approved Cases" value="891" note="81% acceptance rate" accent="gold" />
          <MetricCard label="Rejected / Returned" value="249" note="Needs final sorting" />
        </div>

        <PortalCard>
          <div className="mb-4">
            <FilterBar
              filters={["All Departments", "All Statuses", "Select Period"]}
              onAction={() => setToastMessage("Application filters applied to the current queue.")}
              onSelect={(value) => setToastMessage(`${value} selected.`)}
            />
          </div>
          <ResponsiveTable
            headers={["Applicant Name", "Application ID", "Department", "Submission Date", "Status", "Actions"]}
            rows={adminApplicationRows}
            renderRow={(row) => (
              <tr key={row[1]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
                <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
                <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
                <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
                <td className="border-y border-[#efe4d6] px-4 py-4">{row[3]}</td>
                <td className="border-y border-[#efe4d6] px-4 py-4"><StatusPill>{row[4]}</StatusPill></td>
                <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4">
                  <div className="flex gap-2 text-[#9b1810]">
                    <button onClick={() => setSelectedApplicant(row)}><Eye className="h-4 w-4" /></button>
                    <button onClick={() => setToastMessage(`Applicant ${row[0]} queued for extended review.`)}><Search className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            )}
            mobileRender={(row) => (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#5c2418]">{row[0]}</p>
                <p className="text-sm text-[#8b7969]">{row[2]}</p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#a38e7c]">{row[1]}</p>
                <div className="flex items-center justify-between">
                  <StatusPill>{row[4]}</StatusPill>
                  <button
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]"
                    onClick={() => setSelectedApplicant(row)}
                  >
                    Review
                  </button>
                </div>
              </div>
            )}
          />
        </PortalCard>

        <div className="grid gap-5 lg:grid-cols-2">
          <PortalCard className="bg-[#2e4357] text-white before:bg-[#2e4357]">
            <p className="text-[22px] font-bold">Institutional Audit</p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              System logs indicate high traffic from the computer science department. Review all suspense queue documents before processing is closed.
            </p>
            <PortalButton
              variant="gold"
              className="mt-5"
              onClick={() => setToastMessage("Audit logs opened for institutional review.")}
            >
              View Audit Logs
            </PortalButton>
          </PortalCard>
          <PortalCard accent="gold">
            <p className="text-[22px] font-bold text-[#651d13]">Automated Ledger Reports</p>
            <p className="mt-3 text-sm leading-6 text-[#8b7969]">
              Trigger archival exports and year-end printable assets for academic accountability.
            </p>
            <div className="mt-5 flex gap-3 text-[#9b1810]">
              <button
                className="rounded-md border border-[#eadfce] p-3"
                onClick={() => setToastMessage("Download center opened successfully.")}
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                className="rounded-md border border-[#eadfce] p-3"
                onClick={() => setToastMessage("Automation settings opened successfully.")}
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </div>
          </PortalCard>
        </div>
      </div>

      <PortalModal
        open={Boolean(selectedApplicant)}
        onClose={() => setSelectedApplicant(null)}
        title={selectedApplicant ? `Application Review: ${selectedApplicant[0]}` : "Application Review"}
        description={selectedApplicant ? `${selectedApplicant[1]} · ${selectedApplicant[2]}` : ""}
      >
        <div className="space-y-4">
          <div className="rounded-[12px] bg-[#faf3ea] p-4 text-sm leading-6 text-[#7f6d5f]">
            Submission date: {selectedApplicant?.[3]}. Current status: {selectedApplicant?.[4]}.
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <PortalButton
              onClick={() => {
                setSelectedApplicant(null)
                setToastMessage("Applicant review updated successfully.")
              }}
            >
              Approve Review
            </PortalButton>
            <PortalButton variant="outline" onClick={() => setSelectedApplicant(null)}>Close</PortalButton>
          </div>
        </div>
      </PortalModal>
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}