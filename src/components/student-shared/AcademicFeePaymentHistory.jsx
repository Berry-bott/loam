import { CalendarDays, Download, ReceiptText, ScrollText, ShieldCheck } from "lucide-react"
import { PortalButton } from "../portal/PortalButton"

function formatNaira(value) {
  return `N${value.toLocaleString("en-NG")}.00`
}

function KeyValueRow({ label, value, emphasized = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#f2e9df] py-3 last:border-b-0 last:pb-0 first:pt-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">{label}</p>
      <p
        className={`max-w-[60%] text-right text-sm leading-6 ${
          emphasized ? "font-bold text-student-title" : "font-semibold text-[#6c5848]"
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function SummaryCard({ label, value, note }) {
  return (
    <div className="rounded-[10px] border border-portal-border-soft bg-white px-4 py-4 shadow-[0_10px_20px_rgba(74,25,16,0.04)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">{label}</p>
      <p className="mt-3 text-[28px] font-bold text-student-title">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#8a7767]">{note}</p>
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <section className="rounded-[10px] border border-portal-border bg-portal-surface p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{title}</p>
      <div className="mt-3">{children}</div>
    </section>
  )
}

const statusClasses = {
  Verified: "bg-portal-status-success-soft-bg text-portal-status-success-soft-text",
  "Pending Confirmation": "bg-[#fff1d3] text-portal-status-warning-text",
}

export function AcademicFeePaymentHistory({
  records = [],
  studentProfile,
  onDownloadReceipt,
  onDownloadSlip,
  scrollable = false,
}) {
  const profile = {
    school: "Loam Polytechnic",
    studentName: "Student Record",
    matricNumber: "Not assigned",
    faculty: "Academic Unit",
    department: "Department not available",
    programme: "Programme not available",
    currentLevel: "Level not available",
    academicSession: "Session not available",
    ...studentProfile,
  }

  const totalPaid = records.reduce((sum, record) => sum + record.amount, 0)
  const verifiedCount = records.filter((record) => record.status === "Verified").length
  const pendingCount = records.filter((record) => record.status !== "Verified").length
  const lastPaymentDate = records[records.length - 1]?.paidOn || "No records"

  return (
    <div className="space-y-5">
      <section className="rounded-[14px] border border-[#e7d8cb] bg-[linear-gradient(135deg,#fffdfa_0%,#f8efe7_100%)] p-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-[520px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-shared-eyebrow">
              Academic Payment File
            </p>
            <h2 className="mt-2 text-[26px] font-bold tracking-tight text-student-title">
              {profile.school} Fee History Ledger
            </h2>

          </div>

        </div>

        <div className="mt-5 rounded-[12px] border border-portal-border-soft bg-white p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
              Student Payment Identity
            </p>
          </div>

          <div className="mt-4 grid gap-x-6 gap-y-2 md:grid-cols-2 xl:grid-cols-3">
            <div>
            <KeyValueRow label="Student Name" value="" emphasized />
            <p>{profile.studentName}</p>
            </div>

            <div>
            <KeyValueRow label="Matric Number" value="" emphasized />
              <p>{profile.matricNumber}</p>
            </div>

            <div>
            <KeyValueRow label="Faculty / School" value=""/>
              <p>{profile.faculty}</p>
            </div>

            <div>
            <KeyValueRow label="Department" value="" />
              <p>{profile.department}</p>
            </div>

            <div>
            <KeyValueRow label="Programme" value="" />
            <p>{profile.programme}</p>
            </div>

            <div>
            <KeyValueRow label="Current Level" value="" />
            <p>{profile.currentLevel}</p>
            </div>

            <div>
            <KeyValueRow label="Academic Session" value="" />
            <p>{profile.academicSession}</p>
            </div>
            
          </div>
        </div>
      </section>

      <div className={scrollable ? "max-h-[58vh] space-y-4 overflow-y-auto pr-1" : "space-y-4"}>
        {records.length === 0 ? (
          <div className="rounded-[12px] border border-dashed border-[#ddcdb8] bg-portal-surface px-6 py-10 text-center">
            <p className="text-lg font-bold text-student-title">No payment history found</p>
            <p className="mt-2 text-sm text-portal-text-muted">
              Academic fee receipts will appear here once the bursary posts them to the portal.
            </p>
          </div>
        ) : null}

        {records.map((record) => (
          <article
            key={record.id}
            className="rounded-[12px] border border-portal-border-soft bg-white p-5 shadow-[0_12px_24px_rgba(74,25,16,0.05)]"
          >
            <div className="flex flex-col gap-4 border-b border-portal-border pb-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[22px] font-bold text-portal-text-strong">{record.feeTitle}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      statusClasses[record.status] || "bg-[#f4f0eb] text-[#866f5d]"
                    }`}
                  >
                    {record.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#7e6b5b]">
                  <span className="inline-flex items-center gap-2">
                    <ReceiptText className="h-4 w-4 text-portal-brand-soft" />
                    Amount: <strong className="text-student-title">{formatNaira(record.amount)}</strong>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-portal-brand-soft" />
                    Paid on {record.paidOn}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#8d7a68]">{record.purpose}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <PortalButton size="sm" variant="outline" onClick={() => onDownloadReceipt?.(record)}>
                  <Download className="h-4 w-4" />
                  Receipt
                </PortalButton>
                <PortalButton size="sm" variant="soft" onClick={() => onDownloadSlip?.(record)}>
                  <ScrollText className="h-4 w-4" />
                  Payment Slip
                </PortalButton>
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              <SectionCard title="Receipt Details">
                <KeyValueRow label="Receipt Number" value={record.receiptNumber} emphasized />
                <KeyValueRow label="RRR" value={record.rrr} emphasized />
                <KeyValueRow label="Invoice Number" value={record.invoiceNumber} />
                <KeyValueRow label="Transaction Ref." value={record.transactionReference} />
                <KeyValueRow label="Payment Channel" value={record.paymentChannel} />
              </SectionCard>

              <SectionCard title="Academic Filing Details">
                <KeyValueRow label="Payment Type" value={record.paymentType} />
                <KeyValueRow label="Session" value={record.session} />
                <KeyValueRow label="Semester" value={record.semester} />
                <KeyValueRow label="Level" value={record.level} />
                <KeyValueRow label="Verified By" value={record.verifiedBy} />
              </SectionCard>
            </div>

            <div className="mt-4 rounded-[10px] bg-[#faf3ea] p-4 text-sm leading-6 text-[#6f5c4c]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">
                Clearance Note
              </p>
              <p className="mt-2">
                This payment record is attached to the student academic body file and can be referenced for bursary
                clearance, departmental screening, and session documentation.
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

