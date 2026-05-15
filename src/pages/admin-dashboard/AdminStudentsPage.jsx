// AdminStudentsPage.jsx
import { useState } from "react"
import { Download, Eye, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminStudents } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, MetricCard, ResponsiveTable,
  StatusPill, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminStudentsPage() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>Manage Students</PageEyebrow>
        <PageTitle
          title="Registry Archives"
          description="The centralized view of all enrolled and archived student records. Manage student records, status, and year progression through the graduate ledger."
          actions={
            <>
              <PortalButton onClick={() => setModalOpen(true)}>
                <Plus className="h-4 w-4" />Enroll New Student
              </PortalButton>
              <PortalButton
                variant="gold"
                onClick={() => navigate("/admin-dashboard/students/manage")}
              >
                <Eye className="h-4 w-4" />Manage Students
              </PortalButton>
              <PortalButton
                variant="outline"
                onClick={() => setToastMessage("Student archive export queued.")}
              >
                <Download className="h-4 w-4" />Export Archive
              </PortalButton>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Student Population" value="12,482" note="Current active learners" />
          <MetricCard label="Graduates Archived" value="5,201" note="Records from previous sessions" accent="gold" />
          <PortalCard className="bg-admin-audit-card text-white before:bg-admin-audit-card">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Current Notice</p>
            <p className="mt-3 text-[24px] font-bold">Final Year Clearance Active</p>
            <p className="mt-2 text-sm text-white/75">
              Students are now submitting fee, hostel, and departmental clearance sheets.
            </p>
          </PortalCard>
        </div>

        <PortalCard>
          <ResponsiveTable
            headers={["Student Identity", "Matriculation", "Department", "Level", "Status", "Actions"]}
            rows={adminStudents}
            renderRow={(row) => (
              <tr key={row[1]} className="bg-portal-surface text-sm text-portal-text">
                <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4 font-semibold">{row[0]}</td>
                <td className="border-y border-portal-border px-4 py-4">{row[1]}</td>
                <td className="border-y border-portal-border px-4 py-4">{row[2]}</td>
                <td className="border-y border-portal-border px-4 py-4">{row[3]}</td>
                <td className="border-y border-portal-border px-4 py-4"><StatusPill>{row[4]}</StatusPill></td>
                <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 text-portal-brand-soft">
                  <button
                    onClick={() => navigate("/admin-dashboard/students/manage", { state: { regNumber: row[1] } })}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            )}
            mobileRender={(row) => (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-portal-text">{row[0]}</p>
                <p className="text-sm text-portal-text-muted">{row[2]} · {row[3]}</p>
                <div className="flex items-center justify-between">
                  <StatusPill>{row[4]}</StatusPill>
                  <button
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft"
                    onClick={() => navigate("/admin-dashboard/students/manage", { state: { regNumber: row[1] } })}
                  >
                    View
                  </button>
                </div>
              </div>
            )}
          />
        </PortalCard>
      </div>

      <StandardActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Enroll New Student"
        description="Initialize a new student profile and matriculation draft."
        confirmLabel="Create Record"
        onConfirm={() => {
          setModalOpen(false)
          setToastMessage("Student enrollment draft created successfully.")
        }}
      />
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}

