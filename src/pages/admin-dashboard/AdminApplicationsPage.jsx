// AdminApplicationsPage.jsx
import { useMemo, useState } from "react"
import { Download, Eye, Search, Settings2 } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import { Input } from "../../components/ui/input"
import { ReviewSubmitStep } from "../../components/index/admissions/AdmissionsFormSections"
import { adminApplicationProfiles, adminApplicationRows } from "../../lib/portal-data"
import {
  PageEyebrow,
  PageTitle,
  MetricCard,
  StatusPill,
} from "../../components/admin-shared/Shared"

const FILTER_OPTIONS = ["All Applications", "Pending", "Approved", "Rejected"]

function createReviewForm(profile) {
  return {
    firstName: profile.name.split(" ")[0] || "",
    middleName: profile.name.split(" ").slice(1, -1).join(" "),
    lastName: profile.name.split(" ").slice(-1)[0] || "",
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender,
    maritalStatus: profile.maritalStatus,
    email: profile.email,
    phone: profile.phone,
    residentialAddress: profile.residentialAddress,
    nationality: profile.nationality,
    stateOfOrigin: profile.stateOfOrigin,
    lga: profile.lga,
    lastSchool: profile.lastSchool,
    sponsorName: profile.sponsorName,
    sponsorPhone: profile.sponsorPhone,
    emergencyContactName: profile.emergencyContactName,
    emergencyContactPhone: profile.emergencyContactPhone,
    sittingCount: String(profile.sittings.length),
    sittings: profile.sittings.map((sitting) => ({
      examType: sitting.examType,
      examYear: sitting.examYear,
      candidateNumber: sitting.candidateNumber,
      subjects: sitting.subjects.map(([subject, grade]) => ({ subject, grade })),
    })),
    jambRegistrationNumber: profile.jambRegistrationNumber,
    jambYear: profile.jambYear,
    jambSubjects: profile.jambSubjects.map(([subject, score]) => ({ subject, score })),
    passport: null,
    waecResult: null,
    attestationAccepted: true,
    activationAccepted: true,
  }
}

export default function AdminApplicationsPage() {
  const [selectedApplicantId, setSelectedApplicantId] = useState(null)
  const [toastMessage, setToastMessage] = useState("")
  const [activeFilter, setActiveFilter] = useState("All Applications")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return adminApplicationRows.filter((row) => {
      const matchesFilter =
        activeFilter === "All Applications" ||
        row[5].toLowerCase() === activeFilter.toLowerCase()

      const matchesSearch =
        !normalizedQuery ||
        row.some((value) => String(value).toLowerCase().includes(normalizedQuery))

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, searchQuery])

  const selectedApplicant = useMemo(
    () => adminApplicationProfiles.find((profile) => profile.id === selectedApplicantId) || null,
    [selectedApplicantId],
  )

  const selectedApplicantReviewForm = useMemo(
    () => (selectedApplicant ? createReviewForm(selectedApplicant) : null),
    [selectedApplicant],
  )

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
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((filter) => {
                const isActive = activeFilter === filter

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-[6px] border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-portal-border bg-white text-portal-text-muted hover:bg-portal-surface-soft"
                    }`}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-portal-text-faded" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search applications"
                className="h-10 border-portal-border bg-white pl-10 text-sm"
              />
            </div>
          </div>

          <div className="hidden md:block">
            <table className="w-full table-fixed border-separate border-spacing-y-3">
              <colgroup>
                <col className="w-[14%]" />
                <col className="w-[15%]" />
                <col className="w-[16%]" />
                <col className="w-[8%]" />
                <col className="w-[11%]" />
                <col className="w-[9%]" />
                <col className="w-[13%]" />
                <col className="w-[6%]" />
              </colgroup>
              <thead>
                <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-shared-table-head">
                  <th className="px-3 pb-3">Application ID</th>
                  <th className="px-3 pb-3">Applicant Name</th>
                  <th className="px-3 pb-3">Email</th>
                  <th className="px-3 pb-3 text-center">JAMB Total</th>
                  <th className="px-3 pb-3">Submission Date</th>
                  <th className="px-2 pb-3">Status</th>
                  <th className="px-2 pb-3">Action</th>
                  <th className="px-0 pb-3 text-right">View</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row[0]} className="bg-portal-surface text-sm text-portal-text">
                    <td className="rounded-l-[6px] border-y border-l border-portal-border px-3 py-4 font-semibold align-middle">{row[0]}</td>
                    <td className="border-y border-portal-border px-3 py-4 align-middle font-semibold whitespace-nowrap">{row[1]}</td>
                    <td className="border-y border-portal-border px-3 py-4 align-middle">
                      <span className="block truncate" title={row[2]}>{row[2]}</span>
                    </td>
                    <td className="border-y border-portal-border px-3 py-4 text-center align-middle">{row[3]}</td>
                    <td className="border-y border-portal-border px-3 py-4 align-middle">
                      <span className="block truncate" title={row[4]}>{row[4]}</span>
                    </td>
                    <td className="border-y border-portal-border px-2 py-4 align-middle"><StatusPill>{row[5]}</StatusPill></td>
                    <td className="border-y border-portal-border px-2 py-4 align-middle">
                      <div className="flex items-center gap-1">
                        <PortalButton
                          size="sm"
                          className="h-8 px-3 text-[10px]"
                          onClick={() => setToastMessage(`${row[1]} accepted successfully.`)}
                        >
                          Accept
                        </PortalButton>
                        <PortalButton
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-[10px] text-portal-brand-soft"
                          onClick={() => setToastMessage(`${row[1]} rejected successfully.`)}
                        >
                          Reject
                        </PortalButton>
                      </div>
                    </td>
                    <td className="rounded-r-[6px] border-y border-r border-portal-border px-0 py-4 align-middle">
                      <div className="flex justify-end pr-2 text-portal-brand-soft">
                        <button onClick={() => setSelectedApplicantId(row[0])}><Eye className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {filteredRows.map((row) => (
              <div key={row[0]} className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-portal-text">{row[0]}</p>
                  <p className="truncate whitespace-nowrap text-sm font-semibold text-portal-text">{row[1]}</p>
                  <p className="truncate text-sm text-portal-text-muted">{row[2]}</p>
                  <div className="flex items-center justify-between gap-2  text-[11px] uppercase tracking-[0.12em] text-portal-text-faded">
                    <span>JAMB: {row[3]}</span>
                    <span className="truncate">{row[4]}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <StatusPill>{row[5]}</StatusPill>
                    <div className="flex items-center gap-2">
                      <PortalButton
                        size="sm"
                        className="h-8 px-3 text-[10px]"
                        onClick={() => setToastMessage(`${row[1]} accepted successfully.`)}
                      >
                        Accept
                      </PortalButton>
                      <PortalButton
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-[10px] text-portal-brand-soft"
                        onClick={() => setToastMessage(`${row[1]} rejected successfully.`)}
                      >
                        Reject
                      </PortalButton>
                      <button
                        className="text-portal-brand-soft"
                        onClick={() => setSelectedApplicantId(row[0])}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRows.length === 0 ? (
            <div className="mt-4 rounded-[10px] border border-dashed border-portal-border bg-white px-4 py-8 text-center text-sm text-portal-text-muted">
              No applications match the selected filter and search.
            </div>
          ) : null}
        </PortalCard>

        <div className="grid gap-5 lg:grid-cols-2">
          <PortalCard className="bg-admin-audit-card text-white before:bg-admin-audit-card">
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
            <p className="text-[22px] font-bold text-shared-title">Automated Ledger Reports</p>
            <p className="mt-3 text-sm leading-6 text-portal-text-muted">
              Trigger archival exports and year-end printable assets for academic accountability.
            </p>
            <div className="mt-5 flex gap-3 text-portal-brand-soft">
              <button
                className="rounded-md border border-portal-border-soft p-3"
                onClick={() => setToastMessage("Download center opened successfully.")}
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                className="rounded-md border border-portal-border-soft p-3"
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
        onClose={() => setSelectedApplicantId(null)}
        title={selectedApplicant ? `Application Review: ${selectedApplicant.id}` : "Application Review"}
        description={selectedApplicant ? `${selectedApplicant.name} · ${selectedApplicant.department}` : ""}
        className="m-8 max-w-4xl"
      >
        {selectedApplicant && selectedApplicantReviewForm ? (
          <div className="flex h-[80vh] flex-col gap-5">
            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
              <ReviewSubmitStep
                form={selectedApplicantReviewForm}
                activeSittings={selectedApplicantReviewForm.sittings}
                totalJambScore={Number(selectedApplicant.jambTotal) || 0}
                handleToggleCheckbox={() => () => {}}
                errors={{}}
                showConfirmationSection={false}
              />
            </div>

            <div className="grid gap-3 border-t border-portal-border bg-portal-surface pt-4 sm:grid-cols-3">
              <PortalButton
                onClick={() => {
                  setSelectedApplicantId(null)
                  setToastMessage(`${selectedApplicant.name} accepted successfully.`)
                }}
              >
                Accept
              </PortalButton>
              <PortalButton
                variant="outline"
                className="text-portal-brand-soft"
                onClick={() => {
                  setSelectedApplicantId(null)
                  setToastMessage(`${selectedApplicant.name} rejected successfully.`)
                }}
              >
                Reject
              </PortalButton>
              <PortalButton variant="outline" onClick={() => setSelectedApplicantId(null)}>Close</PortalButton>
            </div>
          </div>
        ) : null}
      </PortalModal>
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
