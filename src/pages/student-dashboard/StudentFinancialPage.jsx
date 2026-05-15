import { useState } from "react"
import { Download, ReceiptText } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalDropdown } from "../../components/portal/PortalDropdown"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import { transactions } from "../../lib/portal-data"

export default function StudentFinancialPage() {
  const [activeModal, setActiveModal] = useState(null)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-shared-eyebrow">
          Academic Session 2024 / 2025
        </p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-student-title sm:text-[40px]">
          Financial Statement
        </h1>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.8fr)_280px]">
        <PortalCard>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-analytics-gold-label">
                Account Balance
              </p>
              <p className="mt-3 text-[38px] font-bold text-slate-950">N1,450,200.00</p>
              <span className="mt-3 inline-flex rounded-full bg-admin-registry-chip-text px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                Outstanding
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <PortalButton onClick={() => setActiveModal("pay")}>
                <ReceiptText className="h-4 w-4" />
                Pay Now
              </PortalButton>
              <PortalButton variant="outline" onClick={() => setToastMessage("Invoice download prepared successfully.")}>
                <Download className="h-4 w-4" />
                Download Invoice
              </PortalButton>
            </div>
          </div>
        </PortalCard>

        <PortalCard accent="gold">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-shared-eyebrow">Payment Schedule</p>
          <div className="mt-4 space-y-4">
            <div className="rounded-[6px] border border-portal-border px-4 py-3">
              <p className="text-sm font-semibold text-red-950">Division Exam Fee</p>
              <p className="mt-1 text-[24px] font-bold text-primary">N750,000</p>
            </div>
            <div className="rounded-[6px] border border-portal-border px-4 py-3">
              <p className="text-sm font-semibold text-red-950">Examination Fee</p>
              <p className="mt-1 text-[24px] font-bold text-primary">N25,000</p>
            </div>
          </div>
        </PortalCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_300px]">
        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[24px] font-bold text-portal-text-strong">Transaction History</p>
            <PortalDropdown
              label="Filter Records"
              items={[
                { label: "All transactions" },
                { label: "Successful payments" },
                { label: "Pending balances" },
              ]}
            />
          </div>

          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-shared-table-head">
                  <th className="pb-1">Date</th>
                  <th className="pb-1">Description</th>
                  <th className="pb-1">Amount</th>
                  <th className="pb-1">Status</th>
                  <th className="pb-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={`${transaction.date}-${transaction.description}`} className="bg-portal-surface-warm text-sm text-portal-text">
                    <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4">{transaction.date}</td>
                    <td className="border-y border-portal-border px-4 py-4">{transaction.description}</td>
                    <td className="border-y border-portal-border px-4 py-4 font-semibold">{transaction.amount}</td>
                    <td className="border-y border-portal-border px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                          transaction.status === "Success"
                            ? "bg-portal-status-success-soft-bg text-portal-status-success-soft-text"
                            : "bg-amber-100 text-portal-status-warning-text"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft">
                      {transaction.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 space-y-3 md:hidden">
            {transactions.map((transaction) => (
              <div key={`${transaction.date}-${transaction.description}`} className="rounded-[8px] border border-portal-border bg-portal-surface-warm p-4">
                <p className="text-sm font-semibold text-portal-text">{transaction.description}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-shared-table-head">{transaction.date}</p>
                <p className="mt-3 text-lg font-bold text-portal-text">{transaction.amount}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      transaction.status === "Success"
                        ? "bg-portal-status-success-soft-bg text-portal-status-success-soft-text"
                        : "bg-amber-100 text-portal-status-warning-text"
                    }`}
                  >
                    {transaction.status}
                  </span>
                  <button className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft">
                    {transaction.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </PortalCard>

        <div className="space-y-5">
          <PortalCard className="bg-primary text-white before:bg-primary">
            <p className="text-[24px] font-bold">Financial Eligibility</p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Students must clear all semester-based obligations to access examinations and library services.
              Maintain timely payments to avoid registration holds.
            </p>
            <PortalButton variant="gold" className="mt-5 w-full" onClick={() => setActiveModal("policy")}>
              Policy Details
            </PortalButton>
          </PortalCard>

          <PortalCard accent="gold">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-shared-eyebrow">Need Assistance?</p>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              The bursary office is open Monday to Friday, 8:00 AM - 4:00 PM for all financial inquiries.
            </p>
            <p className="mt-4 text-sm font-semibold text-staff-payload-heading">bursar@loampolytechnic.edu</p>
          </PortalCard>
        </div>
      </div>

      <PortalModal
        open={activeModal === "pay"}
        onClose={() => setActiveModal(null)}
        title="Payment Confirmation"
        description="Choose how you want to continue this transaction."
      >
        <div className="space-y-4">
          <div className="rounded-[12px] border border-portal-border bg-portal-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">Current Payable</p>
            <p className="mt-2 text-[32px] font-bold text-primary">N1,450,200.00</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <PortalButton
              onClick={() => {
                setActiveModal(null)
                setToastMessage("Payment session initiated. Redirect can be connected to the real gateway later.")
              }}
            >
              Continue
            </PortalButton>
            <PortalButton variant="outline" onClick={() => setActiveModal(null)}>
              Cancel
            </PortalButton>
          </div>
        </div>
      </PortalModal>

      <PortalModal
        open={activeModal === "policy"}
        onClose={() => setActiveModal(null)}
        title="Financial Eligibility Policy"
        description="Summary of payment rules and clearance expectations."
      >
        <ul className="space-y-3 text-sm leading-6 text-shared-helper-text">
          <li>All institutional charges must be reconciled before exams are unlocked.</li>
          <li>Late payments may attract temporary registration restrictions.</li>
          <li>Approved installment plans remain subject to bursary validation.</li>
        </ul>
      </PortalModal>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
      </div>
    </>
  )
}

