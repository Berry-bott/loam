// AdminFacultyPage.jsx
import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminFacultyCards } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, MetricCard, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminFacultyPage() {
  const [activeModal, setActiveModal] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title="Faculty & Department Registry"
          description="Track the structural composition of every faculty, department, and accredited teaching unit in the institution."
          actions={
            <>
              <PortalButton variant="gold" onClick={() => setActiveModal("faculty")}>New Faculty</PortalButton>
              <PortalButton onClick={() => setActiveModal("department")}>
                <Plus className="h-4 w-4" />Add Department
              </PortalButton>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Current Faculties" value="08" note="Institution-wide overview" />
          <MetricCard label="Registered Departments" value="34" note="Active across faculties" accent="gold" />
          <MetricCard label="Teaching Staff" value="142" note="Current payroll link" />
          <MetricCard label="Interim Deans" value="#12" note="Current session appointments" accent="gold" />
        </div>

        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#4f1d14]">Current Faculties</p>
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]">
              Faculty - Departmental View
            </div>
          </div>
          <div className="mt-5 grid gap-5 xl:grid-cols-2">
            {adminFacultyCards.map((faculty) => (
              <div key={faculty.name} className="rounded-[8px] border border-[#efe4d6] bg-[#fffdfa] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className={`inline-flex rounded-[8px] px-3 py-2 text-sm font-semibold ${
                        faculty.accent === "gold"
                          ? "bg-[#f7efdc] text-[#a77710]"
                          : "bg-[#fbebe7] text-[#9b1810]"
                      }`}
                    >
                      {faculty.name}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#7f6d5f]">{faculty.summary}</p>
                  </div>
                  <button
                    className="text-[#9b1810]"
                    onClick={() => setToastMessage(`${faculty.name} details opened.`)}
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {faculty.departments.map((department) => (
                    <div
                      key={department}
                      className="rounded-[6px] border border-[#f0e5d8] bg-[#fff] px-3 py-3 text-sm font-medium text-[#551f16]"
                    >
                      {department}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PortalCard>
      </div>

      <StandardActionModal
        open={activeModal === "faculty"}
        onClose={() => setActiveModal(null)}
        title="Create Faculty"
        description="Open a new faculty registry entry and assign departments."
        confirmLabel="Create Faculty"
        onConfirm={() => {
          setActiveModal(null)
          setToastMessage("Faculty draft created successfully.")
        }}
      />
      <StandardActionModal
        open={activeModal === "department"}
        onClose={() => setActiveModal(null)}
        title="Add Department"
        description="Register a new department under an existing faculty."
        confirmLabel="Add Department"
        onConfirm={() => {
          setActiveModal(null)
          setToastMessage("Department draft added successfully.")
        }}
      />
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}