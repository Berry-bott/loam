import { useState } from "react"
import {
  BookOpenCheck,
  CalendarDays,
  CreditCard,
  FileText,
  IdCard,
  UserRound,
} from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import { getPortalSession } from "../../lib/portal-auth"
import { studentCalendarItems } from "../../lib/portal-data"

const summaryCards = [
  {
    label: "Courses Registered",
    value: "12",
    note: "All courses approved",
    icon: BookOpenCheck,
  },
  {
    label: "Results Published",
    value: "08",
    note: "Last updated 3 days ago",
    icon: FileText,
  },
  {
    label: "Fees Paid",
    value: "N245,000",
    note: "Payment confirmed",
    icon: CreditCard,
  },
]

const profileFields = [
  { label: "Matric No", value: "AKP/SWD/2025/00019" },
  { label: "Department", value: "Software and Web Development" },
  { label: "Student Type", value: "Higher National Diploma" },
  { label: "Mobile Phone", value: "09027855092" },
  { label: "Email Address", value: "udothompson81@gmail.com" },
  { label: "Permanent Address", value: "54 Odoro Enen Inidung Inang Eket." },
]

function DashboardPanel({ children, className = "" }) {
  return (
    <section className={`rounded-[6px] border border-stone-200 bg-white shadow-[0_14px_30px_rgba(74,25,16,0.06)] ${className}`}>
      <div className="h-[3px] w-full bg-primary" />
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  )
}

export default function StudentDashboardPage() {
  const session = getPortalSession()
  const [activeModal, setActiveModal] = useState(null)
  const [toastMessage, setToastMessage] = useState("")
  const studentName = session?.names || "Udo Thompson"

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-shared-eyebrow">
              Academic Session 2024-2025
            </p>
            <h1 className="mt-2 text-[30px] font-bold tracking-tight text-slate-900 sm:text-[44px]">
              Welcome back, <span className="text-red-900">{studentName}</span>.
            </h1>
            <p className="max-w-[760px] text-sm text-portal-text-muted sm:text-[15px]">
              Ensure all portal registration requirements are met for the current semester.
            </p>
          </div>

          <PortalButton size="sm" className="self-start lg:self-auto" onClick={() => setActiveModal("id-card")}>
            <IdCard className="h-4 w-4" />
            Get ID Card
          </PortalButton>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {summaryCards.map((card) => (
            <DashboardPanel key={card.label}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                    {card.label}
                  </p>
                  <p className="mt-4 text-[34px] font-bold leading-none text-red-950">{card.value}</p>
                  <p className="mt-3 text-[11px] text-stone-500">{card.note}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-rose-50 text-primary">
                  <card.icon className="h-4 w-4" />
                </div>
              </div>
            </DashboardPanel>
          ))}
        </div>

        <DashboardPanel className="p-0">
          <div className="border-b border-portal-border px-5 pb-3 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex  gap-4">
                <img
                  src="/student-avatar.jpeg"
                  alt={studentName}
                  className="h-[150px] w-[150px] rounded-[8px] object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-primary" />
                    <p className="text-[24px] font-bold text-portal-text-strong">Student Profile</p>
                  </div>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-shared-eyebrow">
                    Official University Record
                  </p>
                </div>
              </div>

              <span className="inline-flex self-start rounded-full bg-rose-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-red-700">
                Active Student
              </span>
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-5 px-5 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
            {profileFields.map((field) => (
              <div key={field.label}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  {field.label}
                </p>
                <p className="mt-2 text-[13px] font-semibold uppercase leading-6 text-portal-text-strong">
                  {field.value}
                </p>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5 text-right text-[10px] text-shared-table-head sm:px-6">
            Profile details are synced. Contact the registrar for amendments.
          </div>
        </DashboardPanel>

        <DashboardPanel>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-[24px] font-bold text-portal-text-strong">
              <CalendarDays className="h-5 w-5 text-primary" />
              Academic Calendar Preview
            </p>
            <button
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-red-900"
              onClick={() => setActiveModal("calendar")}
            >
              Full Calendar
            </button>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {studentCalendarItems.map((item) => (
              <div key={item.title} className="rounded-[6px] border border-portal-border bg-portal-surface p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 rounded-[4px] bg-primary px-2 py-2 text-center text-white">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em]">
                      {item.date.split(" ")[0]}
                    </p>
                    <p className="text-[18px] font-bold">{item.date.split(" ")[1]}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-portal-text-strong">{item.title}</p>
                    <p className="mt-1 text-[11px] leading-5 text-stone-400">{item.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <div className="flex flex-col gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <span>Current GPA 4.28 / 5.0</span>
            <span>Credits Earned 92</span>
          </div>
          <span>© 2025 Loam Polytechnic. Authorized User Access Only.</span>
        </div>
      </div>

      <PortalModal
        open={activeModal === "id-card"}
        onClose={() => setActiveModal(null)}
        title="Student ID Card Request"
        description="Generate a temporary digital identification card and request a printed pickup slip."
      >
        <div className="space-y-4">
          <div className="rounded-[12px] bg-shared-helper-bg p-4">
            <p className="text-sm leading-6 text-shared-helper-text">
              Your active profile is eligible for a digital ID card. Printed card requests can be routed to the registry after validation.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <PortalButton
              onClick={() => {
                setActiveModal(null)
                setToastMessage("Digital student ID request submitted successfully.")
              }}
            >
              Generate Digital Card
            </PortalButton>
            <PortalButton variant="outline" onClick={() => setActiveModal(null)}>
              Maybe Later
            </PortalButton>
          </div>
        </div>
      </PortalModal>

      <PortalModal
        open={activeModal === "calendar"}
        onClose={() => setActiveModal(null)}
        title="Academic Calendar"
        description="Important milestones for the ongoing session."
      >
        <div className="space-y-3">
          {studentCalendarItems.map((item) => (
            <div key={item.title} className="rounded-[10px] border border-portal-border bg-portal-surface p-4">
              <p className="text-sm font-semibold text-portal-text-strong">{item.title}</p>
              <p className="mt-1 text-sm text-shared-description">{item.date}</p>
              <p className="mt-2 text-sm text-shared-description">{item.meta}</p>
            </div>
          ))}
        </div>
      </PortalModal>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}

