import { useState } from "react"
import { ChevronDown, Download, History, Wallet } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"

const sessionOptions = ["ND 1 ", "ND 2 ", "HND 1",  "HND 2"]
const paymentOptions = ["Full Session Payment", "First Semester Payment", "Second Semester Payment"]

const statutoryFees = [
  { title: "Acceptance Fee", amount: 25000 },
  { title: "Department Materials Fee", amount: 5000 },
  { title: "Registration Fee", amount: 3500 },
  { title: "Project Fee", amount: 10000 },
  { title: "Laboratory Fee", amount: 2500 },
  { title: "Examination Fee", amount: 15000 },
  { title: "Miscellaneous", amount: 5000 },
  { title: "ICT Fee", amount: 2500 },
]

function formatNaira(value) {
  return `N${value.toLocaleString("en-NG")}`
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block rounded-[6px] border border-[#eee3d7] bg-[#fcfaf7] px-4 py-3">
      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b7a391]">
        {label}
      </span>
      <div className="relative mt-3">
        <select
          value={value}
          onChange={onChange}
          className="h-10 w-full appearance-none rounded-[4px] border border-[#eadfce] bg-white px-3 pr-10 text-sm font-medium text-[#5f2419] outline-none transition-colors focus:border-[#c39d48]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a8878]" />
      </div>
    </label>
  )
}

export default function StudentApplicationPage() {
  const [sessionType, setSessionType] = useState(sessionOptions[0])
  const [paymentPlan, setPaymentPlan] = useState(paymentOptions[0])
  const [activeModal, setActiveModal] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  const calculatedFee = 120000
  const processingCharge = 250
  const acceptanceFee = 25000
  const totalPayable = calculatedFee + acceptanceFee + processingCharge

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">
              Academic Records & Payment Ledger
            </p>
            <h1 className="mt-2 text-[28px] font-bold tracking-tight text-[#531b14] sm:text-[40px]">
              Academic Fees
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 ">
            <PortalButton variant="outline" size="sm" onClick={() => setActiveModal("history")}>
              <History className="h-4 w-4" />
              Payment History
            </PortalButton>
            <div className="inline-flex h-9 items-center gap-2 rounded-[6px] border border-[#eadfce] bg-white px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f170f]">
              <Wallet className="h-4 w-4" />
              Wallet: N0.00
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_320px]">
          <div className="space-y-5">
            <PortalCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[22px] font-bold text-[#4f1d14]">School Fees Calculator</p>
                  <p className="mt-1 text-sm text-[#9f8d7d]">
                    Select your parameters to calculate session fees.
                  </p>
                </div>
                <span className="rounded-full bg-[#f9eee8] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9d3a22]">
                  Real-time
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <SelectField
                  label="Student Level"
                  value={sessionType}
                  onChange={(event) => setSessionType(event.target.value)}
                  options={sessionOptions}
                />
                <SelectField
                  label="Payment Type"
                  value={paymentPlan}
                  onChange={(event) => setPaymentPlan(event.target.value)}
                  options={paymentOptions}
                />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                <div className="rounded-[8px] border border-[#efe4d6] bg-[#fffdfa] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">
                    Calculated Fee
                  </p>
                  <div className="mt-3 flex flex-wrap items-end gap-3">
                    <p className="text-[40px] font-bold leading-none text-[#5a1c14]">
                      {formatNaira(calculatedFee)}.00
                    </p>
                    <span className="rounded-full bg-[#fde8e4] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b81d13]">
                      + {formatNaira(processingCharge)} processing
                    </span>
                  </div>
                </div>

                <div className="rounded-[8px] bg-[#7c130d] p-5 text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65">
                    Quick Action
                  </p>
                  <p className="mt-3 text-lg font-bold">Pay School Fees</p>
                  <p className="mt-2 text-sm text-white/75">
                    Continue directly to the bursary checkout flow.
                  </p>
                  <PortalButton
                    variant="gold"
                    className="mt-5 w-full"
                    onClick={() => setToastMessage("Bursary checkout session prepared successfully.")}
                  >
                    Pay School Fees
                  </PortalButton>
                </div>
              </div>
            </PortalCard>

            <PortalCard>
              <div className="flex items-center justify-between">
                <p className="text-[22px] font-bold text-[#4f1d14]">Statutory & Administrative Fees</p>
                <div className="rounded-[6px] border border-[#eadfce] bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b7765]">
                  All
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {statutoryFees.map((fee) => (
                  <div
                    key={fee.title}
                    className="flex items-center justify-between rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] px-4 py-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4f1d14]">
                      {fee.title}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="min-w-[92px] text-right text-[14px] font-bold text-[#5c2016]">
                        {formatNaira(fee.amount)}
                      </span>
                      <PortalButton
                        size="sm"
                        className="min-w-[102px]"
                        onClick={() => setToastMessage(`${fee.title} payment window opened.`)}
                      >
                        Pay Now
                      </PortalButton>
                    </div>
                  </div>
                ))}
              </div>
            </PortalCard>
          </div>

          <div className="space-y-5">
            <PortalCard accent="gold">
              <p className="text-[22px] font-bold text-[#4f1d14]">Cart Summary</p>

              <div className="mt-5 space-y-4 text-sm text-[#7f6d5f]">
                <div className="flex items-center justify-between">
                  <span>Session Fees (Full)</span>
                  <span className="font-semibold text-[#4f1d14]">{formatNaira(calculatedFee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Acceptance Fee</span>
                  <span className="font-semibold text-[#4f1d14]">{formatNaira(acceptanceFee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Processing Charge</span>
                  <span className="font-semibold text-[#4f1d14]">{formatNaira(processingCharge)}</span>
                </div>
              </div>

              <div className="mt-5 rounded-[8px] bg-[#faf3ea] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">
                  Total Payable
                </p>
                <p className="mt-2 text-[30px] font-bold text-[#8f120d]">{formatNaira(totalPayable)}</p>
              </div>

              <div className="mt-5 space-y-3">
                <PortalButton className="w-full" onClick={() => setToastMessage("Proceeding to bursary checkout.")}>
                  Proceed to Checkout
                </PortalButton>
                <PortalButton
                  variant="outline"
                  className="w-full"
                  onClick={() => setToastMessage("Invoice download prepared successfully.")}
                >
                  <Download className="h-4 w-4" />
                  Download Invoice
                </PortalButton>
              </div>

              <div className="mt-5 rounded-[8px] border border-[#efe4d6] bg-[#fffdfa] p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#ab987f]">
                  Payment status updates after successful verification.
                </p>
              </div>
            </PortalCard>

            <PortalCard className="bg-[#8f120d] text-white before:bg-[#8f120d]">
              <p className="text-[22px] font-bold">Need Help?</p>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Contact the bursary support desk for payment issues and invoice resolution.
              </p>
              <PortalButton
                variant="gold"
                className="mt-5"
                onClick={() => setActiveModal("support")}
              >
                Support Desk
              </PortalButton>
            </PortalCard>
          </div>
        </div>
      </div>

      <PortalModal
        open={activeModal === "history"}
        onClose={() => setActiveModal(null)}
        title="Payment History"
        description="Recent academic fee records attached to your student profile."
      >
        <div className="space-y-3">
          {[
            "Acceptance Fee - Verified - Oct 12, 2025",
            "Department Materials Fee - Verified - Oct 14, 2025",
            "ICT Fee - Pending Confirmation - Oct 20, 2025",
          ].map((item) => (
            <div key={item} className="rounded-[10px] border border-[#efe4d6] bg-[#fffdfa] p-4 text-sm text-[#6e5b4b]">
              {item}
            </div>
          ))}
        </div>
      </PortalModal>

      <PortalModal
        open={activeModal === "support"}
        onClose={() => setActiveModal(null)}
        title="Bursary Support Desk"
        description="Support tickets are routed to the finance office for billing or payment issues."
      >
        <div className="space-y-4">
          <div className="rounded-[12px] bg-[#faf3ea] p-4 text-sm leading-6 text-[#7f6d5f]">
            Office hours are Monday to Friday, 8:00 AM to 4:00 PM. Response time is usually within one business day.
          </div>
          <PortalButton
            className="w-full"
            onClick={() => {
              setActiveModal(null)
              setToastMessage("A bursary support ticket has been opened for your account.")
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
