// AdminApplicationsPage.jsx
import { useEffect, useMemo, useState } from "react"
import { Download, Eye, Search, Settings2 } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalCardSkeleton, PortalSkeleton } from "../../components/portal/PortalSkeleton"
import { PortalToast } from "../../components/portal/PortalToast"
import { Input } from "../../components/ui/input"
import { ReviewSubmitStep } from "../../components/index/admissions/AdmissionsFormSections"
import {
  PageEyebrow,
  PageTitle,
  MetricCard,
  StatusPill,
} from "../../components/admin-shared/Shared"
import { getPortalSession } from "../../lib/portal-auth"
import { buildListKey, useAdmissionsStore } from "../../store/admin/admissionsStore"

const FILTER_OPTIONS = ["All Applications", "Pending", "Approved", "Rejected"]

function getStatusQueryValue(filter) {
  if (filter === "Pending") return "FORWARDED"
  if (filter === "Approved") return "ADMITTED"
  if (filter === "Rejected") return "REJECTED"
  return ""
}

function normalizeStatus(value) {
  const normalizedValue = String(value || "").trim().toLowerCase()

  if (!normalizedValue) return "Pending"
  if (normalizedValue.includes("approve")) return "Approved"
  if (normalizedValue.includes("admit")) return "Approved"
  if (normalizedValue.includes("reject")) return "Rejected"
  if (normalizedValue.includes("return")) return "Returned"
  if (normalizedValue.includes("review")) return "Reviewed"
  if (normalizedValue.includes("screen")) return "Screened"
  if (normalizedValue.includes("forward")) return "Pending"
  if (normalizedValue.includes("pending")) return "Pending"

  return String(value || "Pending")
}

function getEntityId(item) {
  return String(item?.id || item?._id || item?.applicationId || item?.uuid || "")
}

function getApplicantName(item) {
  const firstName = String(item?.firstName || item?.profile?.firstName || "").trim()
  const lastName = String(item?.lastName || item?.profile?.lastName || "").trim()
  const displayName = [firstName, lastName].filter(Boolean).join(" ")

  return displayName || item?.name || item?.fullName || "Unnamed Applicant"
}

function toTitleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getApplicantEmail(item) {
  return item?.email || item?.profile?.email || "-"
}

function getApplicantDepartment(item) {
  return (
    item?.departmentId ||
    "-"
  )
}

function getSubmissionDate(item) {
  const value = item?.createdAt || item?.submittedAt || item?.submissionDate || item?.dateCreated
  if (!value) return "-"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

function getJambTotal(item) {
  if (item?.jambTotal !== undefined && item?.jambTotal !== null && item?.jambTotal !== "") {
    return String(item.jambTotal)
  }

  const jambDetails = Array.isArray(item?.jambDetails) ? item.jambDetails : []
  if (!jambDetails.length) return "-"

  const total = jambDetails.reduce((sum, subject) => sum + (Number(subject?.score) || 0), 0)
  return String(total || "-")
}

function getSubmissionTimestamp(item) {
  const value = item?.createdAt || item?.submittedAt || item?.submissionDate || item?.dateCreated
  if (!value) return 0

  const timestamp = new Date(value).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function isDecisionLocked(status) {
  return ["Approved", "Rejected", "Returned"].includes(normalizeStatus(status))
}

function mapApplicationsToRows(applications) {
  return applications
    .map((application) => ({
      id: getEntityId(application),
      applicantName: getApplicantName(application),
      email: getApplicantEmail(application),
      jambTotal: getJambTotal(application),
      submissionDate: getSubmissionDate(application),
      submissionTimestamp: getSubmissionTimestamp(application),
      status: normalizeStatus(application?.status),
    }))
    .sort((left, right) => right.submissionTimestamp - left.submissionTimestamp)
}

function createReviewForm(application) {
  const oLevelSittings = Array.isArray(application?.oLevelSittings) ? application.oLevelSittings : []
  const jambDetails = Array.isArray(application?.jambDetails) ? application.jambDetails : []

  return {
    applicationId: application?.id || "",
    status: application?.status || "",
    createdAt: application?.createdAt || "",
    updatedAt: application?.updatedAt || "",
    userId: application?.userId || "",
    studentId: application?.student?.id || application?.studentId || "",
    stateOfResidence: application?.stateOfResidence || "",
    cityOfResidence: application?.cityOfResidence || "",
    firstName: application?.firstName || "",
    middleName: application?.middleName || "",
    lastName: application?.lastName || "",
    dateOfBirth: application?.dateOfBirth || "",
    gender: application?.gender || "",
    maritalStatus: application?.maritalStatus || "",
    email: application?.email || "",
    phone: application?.phoneNumber || application?.phone || "",
    residentialAddress: application?.residentialAddress || "",
    nationality: application?.nationality || "",
    stateOfOrigin: application?.stateOfOrigin || "",
    lga: application?.lga || "",
    lastSchool: application?.lastSchoolAttended || application?.lastSchool || "",
    yearOfGraduation: application?.yearOfGraduation || "",
    sponsorName: application?.sponsorName || "",
    sponsorPhone: application?.sponsorPhoneNumber || application?.sponsorPhone || "",
    emergencyContactName: application?.emergencyContactName || "",
    emergencyContactPhone: application?.emergencyContactPhoneNumber || application?.emergencyContactPhone || "",
    chosenDepartmentId: application?.departmentId || "",
    sittingCount: String(application?.numberOfSittings || oLevelSittings.length || 1),
    sittings: oLevelSittings.map((sitting) => ({
      examType: sitting?.examType || "",
      examYear: sitting?.examYear || "",
      serialNumber: sitting?.serialNumber || "",
      candidateNumber: sitting?.candidateNumber || "",
      subjects: Array.isArray(sitting?.subjects)
        ? sitting.subjects.map((subject) => ({
            subject: subject?.subject || subject?.name || "",
            grade: subject?.grade || subject?.score || "",
          }))
        : [],
    })),
    jambRegistrationNumber: application?.jambRegistrationNumber || "",
    jambYear: application?.jambYear || "",
    jambSubjects: jambDetails.map((subject) => ({
      subject: subject?.subject || "",
      score: subject?.score || "",
    })),
    documents: Array.isArray(application?.documents) ? application.documents : [],
    passport: null,
    waecResult: null,
    attestationAccepted: true,
    activationAccepted: true,
  }
}

export default function AdminApplicationsPage() {
  const session = getPortalSession()
  const isHod = session?.role === "hod"
  const [selectedApplicantId, setSelectedApplicantId] = useState("")
  const [toastMessage, setToastMessage] = useState("")
  const [activeFilter, setActiveFilter] = useState("All Applications")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDecidingIds, setIsDecidingIds] = useState([])
  const statusQueryValue = getStatusQueryValue(activeFilter)
  const listKey = buildListKey({ page: 1, limit: 100, status: statusQueryValue })

  const {
    applicationLists,
    applicationDetails,
    isLoadingLists,
    isLoadingDetails,
    listErrors,
    fetchApplications,
    fetchApplicationDetail,
    decideApplication,
  } = useAdmissionsStore()

  const applications = applicationLists[listKey]?.items || []
  const selectedApplicant = selectedApplicantId ? applicationDetails[selectedApplicantId] || null : null
  const isLoading = Boolean(isLoadingLists[listKey])
  const isLoadingApplicant = Boolean(selectedApplicantId && isLoadingDetails[selectedApplicantId])
  const loadError = listErrors[listKey] || ""

  useEffect(() => {
    let ignore = false

    fetchApplications({
      page: 1,
      limit: 100,
      status: statusQueryValue,
    }, { force: true }).catch((error) => {
      if (!ignore) {
        setToastMessage(error.message || "Unable to load applications right now.")
      }
    })

    return () => {
      ignore = true
    }
  }, [fetchApplications, statusQueryValue])

  useEffect(() => {
    if (!selectedApplicantId) return

    let ignore = false

    fetchApplicationDetail(selectedApplicantId, { force: true }).catch((error) => {
      if (!ignore) {
        setToastMessage(error.message || "Unable to load application details right now.")
      }
    })

    return () => {
      ignore = true
    }
  }, [fetchApplicationDetail, selectedApplicantId])

  const applicationRows = useMemo(
    () => mapApplicationsToRows(applications),
    [applications],
  )

  const filteredRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return applicationRows.filter((row) => {
      if (!normalizedQuery) return true

      return [
        row.applicantName,
        row.email,
        row.jambTotal,
        row.submissionDate,
        row.status,
      ].some((value) => String(value).toLowerCase().includes(normalizedQuery))
    })
  }, [applicationRows, searchQuery])

  const selectedApplicantReviewForm = useMemo(
    () => (selectedApplicant ? createReviewForm(selectedApplicant) : null),
    [selectedApplicant],
  )

  const pendingCount = useMemo(
    () => applicationRows.filter((row) => row.status === "Pending").length,
    [applicationRows],
  )

  const screenedCount = useMemo(
    () => applicationRows.filter((row) => ["Screened", "Reviewed"].includes(row.status)).length,
    [applicationRows],
  )

  const approvedCount = useMemo(
    () => applicationRows.filter((row) => row.status === "Approved").length,
    [applicationRows],
  )

  const rejectedCount = useMemo(
    () => applicationRows.filter((row) => ["Rejected", "Returned"].includes(row.status)).length,
    [applicationRows],
  )

  const selectedApplicantName = useMemo(
    () => (selectedApplicant ? getApplicantName(selectedApplicant) : ""),
    [selectedApplicant],
  )

  const selectedApplicantDepartment = useMemo(
    () => (selectedApplicant ? getApplicantDepartment(selectedApplicant) : ""),
    [selectedApplicant],
  )
  const selectedApplicantDecisionLocked = useMemo(
    () => isDecisionLocked(selectedApplicant?.status),
    [selectedApplicant],
  )

  const handleDecision = async ({ id, name, decision, closeModal = false }) => {
    if (!id) return
    if (isHod) {
      setToastMessage("HOD application review is view-only from this page.")
      return
    }

    const targetApplication =
      applications.find((application) => getEntityId(application) === String(id)) ||
      (selectedApplicantId === id ? selectedApplicant : null)

    if (targetApplication && isDecisionLocked(targetApplication?.status)) {
      return
    }

    setIsDecidingIds((current) => [...current, id])

    try {
      await decideApplication(id, decision)

      if (closeModal) {
        setSelectedApplicantId("")
      }

      setToastMessage(`${name} ${decision === "ADMITTED" ? "accepted" : "rejected"} successfully.`)
    } catch (error) {
      setToastMessage(error.message || "Unable to update application decision right now.")
    } finally {
      setIsDecidingIds((current) => current.filter((item) => item !== id))
    }
  }

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>The Prestigious Ledger</PageEyebrow>
        <PageTitle
          title={isHod ? "Department Applications" : "Manage Applications"}
          description={
            isHod
              ? "Review applications routed to your department and open full applicant records."
              : "Review and process student admission files for the 2025 academic session."
          }
          actions={
            <PortalButton onClick={() => setToastMessage("Application ledger export queued successfully.")}>
              <Download className="h-4 w-4" />Export Ledger
            </PortalButton>
          }
        />

        {isLoading && !applications.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <PortalCardSkeleton key={`metric-skeleton-${index}`} lines={2} showBadge={index > 0} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Pending Review" value={String(pendingCount)} note="Applications awaiting a decision" />
            <MetricCard label="Screened" value={String(screenedCount)} note="Applications already reviewed" accent="gold" />
            <MetricCard label="Approved Cases" value={String(approvedCount)} note="Applications accepted so far" accent="gold" />
            <MetricCard label="Rejected / Returned" value={String(rejectedCount)} note="Applications not approved" />
          </div>
        )}

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

          {loadError ? (
            <div className="mb-4 rounded-[10px] border border-admin-error-border bg-admin-error-bg px-4 py-3 text-sm text-admin-error-text">
              {loadError}
            </div>
          ) : null}

          <div className="hidden md:block">
            <table className="w-full table-fixed border-separate border-spacing-y-3">
              <colgroup>
                <col className="w-[21%]" />
                <col className="w-[17%]" />
                <col className="w-[16%]" />
                <col className="w-[13%]" />
                <col className="w-[25%]" />
                <col className="w-[8%]" />
              </colgroup>
              <thead>
                <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-shared-table-head">
                  <th className="px-4 pb-3">Applicant Name</th>
                  <th className="px-4 pb-3">Email</th>
                  <th className="px-4 pb-3">Submission Date</th>
                  <th className="px-4 pb-3">Status</th>
                  <th className="px-4 pb-3">Action</th>
                  <th className="px-4 pb-3 text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && !applications.length ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <tr key={`application-skeleton-${index}`} className="bg-portal-surface">
                      <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4"><PortalSkeleton className="h-5 w-28" /></td>
                      <td className="border-y border-portal-border px-4 py-4"><PortalSkeleton className="h-5 w-full" /></td>
                      <td className="border-y border-portal-border px-4 py-4"><PortalSkeleton className="h-5 w-24" /></td>
                      <td className="border-y border-portal-border px-4 py-4"><PortalSkeleton className="h-6 w-20 rounded-full" /></td>
                      <td className="border-y border-portal-border px-4 py-4"><PortalSkeleton className="h-8 w-32" /></td>
                      <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4"><div className="flex justify-end"><PortalSkeleton className="h-4 w-4 rounded-full" /></div></td>
                    </tr>
                  ))
                ) : (
                  filteredRows.map((row) => {
                    const isDeciding = isDecidingIds.includes(row.id)
                    const decisionLocked = isDecisionLocked(row.status)

                    return (
                      <tr key={row.id} className="bg-portal-surface text-sm text-portal-text">
                        <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4 align-middle font-semibold">
                          <span className="block whitespace-normal leading-5">
                            {toTitleCase(row.applicantName)}
                          </span>
                        </td>
                        <td className="border-y border-portal-border px-4 py-4 align-middle">
                          <span className="block truncate" title={row.email}>{row.email}</span>
                        </td>
                        <td className="border-y border-portal-border px-4 py-4 align-middle">
                          <span className="block whitespace-nowrap" title={row.submissionDate}>{row.submissionDate}</span>
                        </td>
                        <td className="border-y border-portal-border px-4 py-4 align-middle"><StatusPill>{row.status}</StatusPill></td>
                        <td className="border-y border-portal-border px-4 py-4 align-middle">
                          <div className="flex items-center gap-2">
                            {isHod ? (
                              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                                View only
                              </span>
                            ) : (
                              <>
                                <PortalButton
                                  size="sm"
                                  className={`h-8 min-w-[88px] px-4 text-[10px] ${decisionLocked ? "opacity-35 saturate-0 cursor-not-allowed" : ""}`}
                                  disabled={isDeciding || decisionLocked}
                                  onClick={() => handleDecision({
                                    id: row.id,
                                    name: row.applicantName,
                                    decision: "ADMITTED",
                                  })}
                                >
                                  {isDeciding ? "Saving..." : "Accept"}
                                </PortalButton>
                                <PortalButton
                                  variant="outline"
                                  size="sm"
                                  className={`h-8 min-w-[88px] px-4 text-[10px] text-portal-brand-soft ${decisionLocked ? "opacity-35 saturate-0 cursor-not-allowed" : ""}`}
                                  disabled={isDeciding || decisionLocked}
                                  onClick={() => handleDecision({
                                    id: row.id,
                                    name: row.applicantName,
                                    decision: "REJECTED",
                                  })}
                                >
                                  Reject
                                </PortalButton>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 align-middle">
                          <div className="flex justify-center text-portal-brand-soft">
                            <button
                              type="button"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-portal-border-soft bg-white shadow-sm transition-colors hover:bg-portal-surface-soft"
                              onClick={() => setSelectedApplicantId(row.id)}
                              aria-label={`View ${toTitleCase(row.applicantName)}`}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {isLoading && !applications.length ? (
              Array.from({ length: 3 }).map((_, index) => (
                <PortalCardSkeleton key={`mobile-application-skeleton-${index}`} lines={3} showBadge />
              ))
            ) : (
              filteredRows.map((row) => {
                const isDeciding = isDecidingIds.includes(row.id)
                const decisionLocked = isDecisionLocked(row.status)

                return (
                  <div key={row.id} className="rounded-[10px] border border-admin-registry-border bg-admin-registry-bg p-4">
                    <div className="space-y-2">
                      <p className="truncate whitespace-nowrap text-sm font-semibold text-portal-text">{row.applicantName}</p>
                      <p className="truncate text-sm text-portal-text-muted">{row.email}</p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] uppercase tracking-[0.12em] text-portal-text-faded">
                          {row.submissionDate}
                        </span>
                        <StatusPill>{row.status}</StatusPill>
                        <div className="flex items-center gap-2">
                          {isHod ? (
                            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                              View only
                            </span>
                          ) : (
                            <>
                              <PortalButton
                                size="sm"
                                className={`h-8 min-w-[88px] px-4 text-[10px] ${decisionLocked ? "opacity-35 saturate-0 cursor-not-allowed" : ""}`}
                                disabled={isDeciding || decisionLocked}
                                onClick={() => handleDecision({
                                  id: row.id,
                                  name: row.applicantName,
                                  decision: "ADMITTED",
                                })}
                              >
                                {isDeciding ? "Saving..." : "Accept"}
                              </PortalButton>
                              <PortalButton
                                variant="outline"
                                size="sm"
                                className={`h-8 min-w-[88px] px-4 text-[10px] text-portal-brand-soft ${decisionLocked ? "opacity-35 saturate-0 cursor-not-allowed" : ""}`}
                                disabled={isDeciding || decisionLocked}
                                onClick={() => handleDecision({
                                  id: row.id,
                                  name: row.applicantName,
                                  decision: "REJECTED",
                                })}
                              >
                                Reject
                              </PortalButton>
                            </>
                          )}
                          <button
                            className="text-portal-brand-soft"
                            onClick={() => setSelectedApplicantId(row.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {!isLoading && filteredRows.length === 0 ? (
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
        open={Boolean(selectedApplicantId)}
        onClose={() => setSelectedApplicantId("")}
        title="Application Review"
        description={selectedApplicant ? `${selectedApplicantName} · ${selectedApplicantDepartment}` : ""}
        className="m-8 max-w-4xl"
      >
        {isLoadingApplicant && !selectedApplicant ? (
          <div className="space-y-4 py-4">
            <PortalSkeleton className="h-6 w-48" />
            <PortalSkeleton className="h-[420px] w-full rounded-[8px]" />
          </div>
        ) : selectedApplicant && selectedApplicantReviewForm ? (
          <div className="flex h-[80vh] flex-col gap-5">
            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
              <ReviewSubmitStep
                form={selectedApplicantReviewForm}
                activeSittings={selectedApplicantReviewForm.sittings}
                totalJambScore={Number(getJambTotal(selectedApplicant)) || 0}
                handleToggleCheckbox={() => () => {}}
                errors={{}}
                showConfirmationSection={false}
              />
            </div>

            <div className={`grid gap-3 border-t border-portal-border bg-portal-surface pt-4 ${isHod ? "sm:grid-cols-1" : "sm:grid-cols-3"}`}>
              {isHod ? (
                <PortalButton variant="outline" onClick={() => setSelectedApplicantId("")}>Close</PortalButton>
              ) : (
                <>
                  <PortalButton
                    className={`min-w-[120px] px-4 ${selectedApplicantDecisionLocked ? "opacity-35 saturate-0 cursor-not-allowed" : ""}`}
                    disabled={isDecidingIds.includes(selectedApplicantId) || selectedApplicantDecisionLocked}
                    onClick={() => handleDecision({
                      id: selectedApplicantId,
                      name: selectedApplicantName,
                      decision: "ADMITTED",
                      closeModal: true,
                    })}
                  >
                    {isDecidingIds.includes(selectedApplicantId) ? "Saving..." : "Accept"}
                  </PortalButton>
                  <PortalButton
                    variant="outline"
                    className={`min-w-[120px] px-4 text-portal-brand-soft ${selectedApplicantDecisionLocked ? "opacity-35 saturate-0 cursor-not-allowed" : ""}`}
                    disabled={isDecidingIds.includes(selectedApplicantId) || selectedApplicantDecisionLocked}
                    onClick={() => handleDecision({
                      id: selectedApplicantId,
                      name: selectedApplicantName,
                      decision: "REJECTED",
                      closeModal: true,
                    })}
                  >
                    Reject
                  </PortalButton>
                  <PortalButton variant="outline" onClick={() => setSelectedApplicantId("")}>Close</PortalButton>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-portal-text-muted">
            Application details are unavailable right now.
          </div>
        )}
      </PortalModal>
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
