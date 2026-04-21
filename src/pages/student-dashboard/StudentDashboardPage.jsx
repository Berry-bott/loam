import { useState } from "react"
import { ArrowRight, CheckCircle2, CreditCard, MessageSquareText } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import { studentAlerts, studentCalendarItems } from "../../lib/portal-data"

export default function StudentDashboardPage() {
  const [activeModal, setActiveModal] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">
            Academic Session 2024 / 2025
          </p>
          <h1 className="mt-2 text-[28px] font-bold tracking-tight text-[#531b14] sm:text-[42px]">
            Welcome back, Adewale.
          </h1>
          <p className="max-w-[700px] text-sm text-[#8b7969] sm:text-[15px]">
            Your semester progress is currently at 65%. Ensure all pending fees are settled before the
            examination window begins.
          </p>
        </div>
        <PortalButton className="self-start lg:self-auto" onClick={() => setActiveModal("id-card")}>
          <CreditCard className="h-4 w-4" />
          Get ID Card
        </PortalButton>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.8fr)_340px]">
        <div className="space-y-5">
          <PortalCard>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[22px] font-bold text-[#4f1d14]">Application Overview</p>
                  <p className="text-sm text-[#a08d7b]">Bachelor of Science in Computer Engineering</p>
                </div>
                <span className="inline-flex h-7 items-center rounded-full bg-[#8f120d] px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                  Accredited
                </span>
              </div>

              <div className="grid gap-4 border-y border-[#efe3d6] py-5 text-[#4f1d14] sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Status</p>
                  <div className="mt-2 flex items-center gap-2 text-[24px] font-bold text-[#3a8a46]">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Approved</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Student ID</p>
                  <p className="mt-2 text-[26px] font-bold">HP24/ENG/0492</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Level</p>
                  <p className="mt-2 text-[26px] font-bold">300 Level</p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">
                  <span>Registration Completeness</span>
                  <span>92%</span>
                </div>
                <div className="h-2 rounded-full bg-[#eadfce]">
                  <div className="h-2 w-[92%] rounded-full bg-[#c6a13f]" />
                </div>
              </div>
            </div>
          </PortalCard>

          <PortalCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[24px] font-bold text-[#4f1d14]">Academic Calendar Preview</p>
              </div>
              <button
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9c1710]"
                onClick={() => setActiveModal("calendar")}
              >
                Full Calendar
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {studentCalendarItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-[6px] border border-[#efe4d6] bg-[#fffcf9] px-4 py-4"
                >
                  <div className="w-14 rounded-[4px] border border-[#efe4d6] bg-[#faf5ed] px-2 py-2 text-center">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a58f78]">
                      {item.date.split(" ")[0]}
                    </p>
                    <p className="text-[20px] font-bold text-[#5c1a12]">{item.date.split(" ")[1]}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-[#4f1d14]">{item.title}</p>
                    <p className="text-sm text-[#a18f7d]">{item.meta}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#b9a894]" />
                </div>
              ))}
            </div>
          </PortalCard>
        </div>

        <div className="space-y-5">
          <PortalCard>
            <p className="text-[24px] font-bold text-[#4f1d14]">Financial Status</p>
            <p className="mt-1 text-sm text-[#a08d7b]">Second Semester 2024</p>
            <div className="mt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Pending Balance</p>
              <p className="mt-2 text-[36px] font-bold text-[#8f120d]">N124,500.00</p>
            </div>
            <PortalButton variant="gold" className="mt-5 w-full" onClick={() => setActiveModal("payment")}>
              <CreditCard className="h-4 w-4" />
              Pay Now
            </PortalButton>
          </PortalCard>

          <PortalCard>
            <div className="flex items-center justify-between">
              <p className="text-[24px] font-bold text-[#4f1d14]">Recent Alerts</p>
              <span className="h-2 w-2 rounded-full bg-[#d0b450]" />
            </div>
            <div className="mt-4 space-y-3">
              {studentAlerts.map((alert) => (
                <div key={alert.title} className="rounded-[5px] border border-[#f1e8dc] bg-[#fffcf9] p-3">
                  <p className="text-[13px] font-semibold text-[#5b2117]">{alert.title}</p>
                  <p className="mt-1 text-[11px] text-[#a59483]">{alert.time}</p>
                </div>
              ))}
            </div>
          </PortalCard>

          <PortalCard className="bg-[#2f445b] text-white before:bg-[#2f445b]">
            <p className="text-[22px] font-bold">Need Assistance?</p>
            <p className="mt-2 text-sm text-white/70">
              Chat with a support officer to resolve portal or registration questions.
            </p>
            <PortalButton
              variant="soft"
              className="mt-5 bg-white/10 text-white hover:bg-white/15"
              onClick={() => setActiveModal("chat")}
            >
              <MessageSquareText className="h-4 w-4" />
              Start Chat
            </PortalButton>
          </PortalCard>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#ece2d6] pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b09f8f] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-6">
          <span>Current GPA 4.28 / 5.0</span>
          <span>Credits Earned 92</span>
        </div>
        <span>Loam Poly Student Access Only</span>
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
              Your current registration status allows a digital ID card to be issued immediately. Printed cards
              are available within 3 working days after approval.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PortalButton
              className="w-full"
              onClick={() => {
                setActiveModal(null)
                setToastMessage("Digital student ID request submitted successfully.")
              }}
            >
              Generate Digital Card
            </PortalButton>
            <PortalButton variant="outline" className="w-full" onClick={() => setActiveModal(null)}>
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

      <PortalModal
        open={activeModal === "payment"}
        onClose={() => setActiveModal(null)}
        title="Settle Outstanding Balance"
        description="Choose a preferred settlement option for your pending fees."
      >
        <div className="space-y-4">
          <div className="rounded-[12px] border border-[#efe4d6] bg-[#fffdfa] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Pending Balance</p>
            <p className="mt-2 text-[32px] font-bold text-[#8f120d]">N124,500.00</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <PortalButton
              variant="gold"
              onClick={() => {
                setActiveModal(null)
                setToastMessage("Payment window prepared. Continue from the bursary confirmation panel.")
              }}
            >
              Continue to Payment
            </PortalButton>
            <PortalButton variant="outline" onClick={() => setActiveModal(null)}>
              View Breakdown
            </PortalButton>
          </div>
        </div>
      </PortalModal>

      <PortalModal
        open={activeModal === "chat"}
        onClose={() => setActiveModal(null)}
        title="Student Support Desk"
        description="A support ticket will be opened and routed to the appropriate office."
      >
        <div className="space-y-4">
          <div className="rounded-[12px] bg-[#eef4fb] p-4 text-sm leading-6 text-[#5d6670]">
            Typical response time is between 10 and 20 minutes during official working hours.
          </div>
          <PortalButton
            className="w-full"
            onClick={() => {
              setActiveModal(null)
              setToastMessage("Support conversation started. A portal officer will contact you shortly.")
            }}
          >
            Open Support Ticket
          </PortalButton>
        </div>
      </PortalModal>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
