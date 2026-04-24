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
    <section className={`rounded-[6px] border border-[#ebe1d5] bg-white shadow-[0_14px_30px_rgba(74,25,16,0.06)] ${className}`}>
      <div className="h-[3px] w-full bg-[#8f120d]" />
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b59a58]">
              Academic Session 2024-2025
            </p>
            <h1 className="mt-2 text-[30px] font-bold tracking-tight text-[#111f2f] sm:text-[44px]">
              Welcome back, <span className="text-[#7c160f]">{studentName}</span>.
            </h1>
            <p className="max-w-[760px] text-sm text-[#8b7969] sm:text-[15px]">
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
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#af9c89]">
                    {card.label}
                  </p>
                  <p className="mt-4 text-[34px] font-bold leading-none text-[#551c14]">{card.value}</p>
                  <p className="mt-3 text-[11px] text-[#8f7d6d]">{card.note}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#faf2ef] text-[#8f120d]">
                  <card.icon className="h-4 w-4" />
                </div>
              </div>
            </DashboardPanel>
          ))}
        </div>

        <DashboardPanel className="p-0">
          <div className="border-b border-[#efe4d6] px-5 pb-3 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex  gap-4">
                <img
                  src="/IMG_3175.jpeg"
                  alt={studentName}
                  className="h-[150px] w-[150px] rounded-[8px] object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-[#8f120d]" />
                    <p className="text-[24px] font-bold text-[#4f1d14]">Student Profile</p>
                  </div>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">
                    Official University Record
                  </p>
                </div>
              </div>

              <span className="inline-flex self-start rounded-full bg-[#f8eeea] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a03a25]">
                Active Student
              </span>
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-5 px-5 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
            {profileFields.map((field) => (
              <div key={field.label}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b19d89]">
                  {field.label}
                </p>
                <p className="mt-2 text-[13px] font-semibold uppercase leading-6 text-[#4f1d14]">
                  {field.value}
                </p>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5 text-right text-[10px] text-[#b09d88] sm:px-6">
            Profile details are synced. Contact the registrar for amendments.
          </div>
        </DashboardPanel>

        <DashboardPanel>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-[24px] font-bold text-[#4f1d14]">
              <CalendarDays className="h-5 w-5 text-[#8f120d]" />
              Academic Calendar Preview
            </p>
            <button
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9c1710]"
              onClick={() => setActiveModal("calendar")}
            >
              Full Calendar
            </button>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {studentCalendarItems.map((item) => (
              <div key={item.title} className="rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 rounded-[4px] bg-[#8f120d] px-2 py-2 text-center text-white">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.12em]">
                      {item.date.split(" ")[0]}
                    </p>
                    <p className="text-[18px] font-bold">{item.date.split(" ")[1]}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-[#4f1d14]">{item.title}</p>
                    <p className="mt-1 text-[11px] leading-5 text-[#9b8979]">{item.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <div className="flex flex-col gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b09f8f] sm:flex-row sm:items-center sm:justify-between">
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
          <div className="rounded-[12px] bg-[#faf3ea] p-4">
            <p className="text-sm leading-6 text-[#7f6d5f]">
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
            <div key={item.title} className="rounded-[10px] border border-[#efe4d6] bg-[#fffdfa] p-4">
              <p className="text-sm font-semibold text-[#4f1d14]">{item.title}</p>
              <p className="mt-1 text-sm text-[#8d7a68]">{item.date}</p>
              <p className="mt-2 text-sm text-[#8d7a68]">{item.meta}</p>
            </div>
          ))}
        </div>
      </PortalModal>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
