import { useEffect, useMemo, useState } from "react"
import { CalendarDays, Layers3, Pencil, PlusCircle, RefreshCcw, Wifi, WifiOff } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalCardSkeleton } from "../../components/portal/PortalSkeleton"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import { Input } from "../../components/ui/input"
import { PageEyebrow, PageTitle, StatusPill } from "../../components/admin-shared/Shared"
import { resolveArray } from "../../components/admin-shared/adminManagementUtils"
import {
  closePortal,
  createSemester,
  createSession,
  getAllSessions,
  getPortalStatus,
  getSessionById,
  openPortal,
  updateSemester,
  updateSession,
} from "../../store/admin/adminApi"

const INITIAL_SESSION_FORM = {
  name: "",
  startDate: "",
  endDate: "",
}

const INITIAL_SEMESTER_FORM = {
  sessionId: "",
  type: "FIRST",
  startDate: "",
  endDate: "",
}

const INITIAL_EDIT_SESSION_FORM = {
  id: "",
  name: "",
  startDate: "",
  endDate: "",
}

const INITIAL_EDIT_SEMESTER_FORM = {
  id: "",
  name: "",
  startDate: "",
  endDate: "",
}

const PORTAL_TYPE_OPTIONS = [
  { label: "Course Reg.", value: "COURSE_REGISTRATION" },
  { label: "Fee Payment", value: "FEE_PAYMENT" },
]

function getSessionId(session) {
  return session?.id || session?._id || session?.sessionId || ""
}

function getSessionName(session) {
  return session?.name || session?.sessionName || "Unnamed Session"
}

function getSessionStartDate(session) {
  return session?.startDate || session?.startsAt || session?.start || ""
}

function getSessionEndDate(session) {
  return session?.endDate || session?.endsAt || session?.end || ""
}

function getSessionCurrentState(session) {
  return Boolean(session?.isCurrent || session?.current)
}

function getSessionSemesters(session) {
  return (
    session?.semesters ||
    session?.data?.semesters ||
    session?.session?.semesters ||
    []
  )
}

function getSemesterId(semester) {
  return semester?.id || semester?._id || semester?.semesterId || ""
}

function getSemesterType(semester) {
  return semester?.type || semester?.name || semester?.semesterType || "Unknown"
}

function getSemesterStartDate(semester) {
  return semester?.startDate || semester?.startsAt || semester?.start || ""
}

function getSemesterEndDate(semester) {
  return semester?.endDate || semester?.endsAt || semester?.end || ""
}

function formatSessionDate(value) {
  if (!value) return "No date"
  if (typeof value === "string") return value.split("T")[0]
  return String(value)
}

function resolvePortalOpenState(payload, selectedPortalType) {
  const directPortalMappings = {
    COURSE_REGISTRATION: payload?.data?.courseRegistration,
    FEE_PAYMENT: payload?.data?.feePayment,
  }

  const directPortalState = directPortalMappings[selectedPortalType]

  if (directPortalState && typeof directPortalState?.isOpen === "boolean") {
    return directPortalState.isOpen
  }

  const portalEntries = [
    payload?.data?.portalStatuses,
    payload?.data?.portals,
    payload?.data?.statuses,
    payload?.portalStatuses,
    payload?.portals,
    payload?.statuses,
  ]

  for (const entryCollection of portalEntries) {
    if (Array.isArray(entryCollection)) {
      const matchedEntry = entryCollection.find((entry) => {
        const entryType = entry?.portalType || entry?.type || entry?.name
        return String(entryType || "").toUpperCase() === selectedPortalType
      })

      if (matchedEntry) {
        const entryCandidates = [
          matchedEntry?.isOpen,
          matchedEntry?.portalOpen,
          matchedEntry?.status,
          matchedEntry?.portalStatus,
        ]

        for (const candidate of entryCandidates) {
          if (typeof candidate === "boolean") return candidate
          if (typeof candidate === "string") {
            const normalized = candidate.trim().toLowerCase()
            if (["open", "opened", "active", "live", "true"].includes(normalized)) return true
            if (["closed", "inactive", "false"].includes(normalized)) return false
          }
        }
      }
    }
  }

  const candidates = [
    payload?.data?.isOpen,
    payload?.data?.portalOpen,
    payload?.data?.status,
    payload?.data?.portalStatus,
    payload?.isOpen,
    payload?.portalOpen,
    payload?.status,
    payload?.portalStatus,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === "boolean") return candidate
    if (typeof candidate === "string") {
      const normalized = candidate.trim().toLowerCase()
      if (["open", "opened", "active", "live", "true"].includes(normalized)) return true
      if (["closed", "inactive", "false"].includes(normalized)) return false
    }
  }

  return false
}

function createPortalStatusMap(payload) {
  const statusMap = {
    COURSE_REGISTRATION: false,
    FEE_PAYMENT: false,
  }

  for (const option of PORTAL_TYPE_OPTIONS) {
    statusMap[option.value] = resolvePortalOpenState(payload, option.value)
  }

  return statusMap
}

export default function AdminPortalManagementPage() {
  const [sessionForm, setSessionForm] = useState(INITIAL_SESSION_FORM)
  const [semesterForm, setSemesterForm] = useState(INITIAL_SEMESTER_FORM)
  const [sessions, setSessions] = useState([])
  const [toastMessage, setToastMessage] = useState("")
  const [isLoadingSessions, setIsLoadingSessions] = useState(true)
  const [isCreatingSession, setIsCreatingSession] = useState(false)
  const [isCreatingSemester, setIsCreatingSemester] = useState(false)
  const [editingSession, setEditingSession] = useState(INITIAL_EDIT_SESSION_FORM)
  const [editingSemester, setEditingSemester] = useState(INITIAL_EDIT_SEMESTER_FORM)
  const [isUpdatingSession, setIsUpdatingSession] = useState(false)
  const [isUpdatingSemester, setIsUpdatingSemester] = useState(false)
  const [isPortalOpen, setIsPortalOpen] = useState(false)
  const [portalStatuses, setPortalStatuses] = useState({
    COURSE_REGISTRATION: false,
    FEE_PAYMENT: false,
  })
  const [isLoadingPortalStatus, setIsLoadingPortalStatus] = useState(true)
  const [isUpdatingPortalStatus, setIsUpdatingPortalStatus] = useState(false)
  const [selectedPortalType, setSelectedPortalType] = useState(PORTAL_TYPE_OPTIONS[0].value)

  const sortedSessions = useMemo(
    () =>
      [...sessions].sort((a, b) =>
        String(getSessionStartDate(b)).localeCompare(String(getSessionStartDate(a))),
      ),
    [sessions],
  )

  const refreshPortalManagementData = async () => {
    await Promise.all([loadSessions(), loadPortalStatus()])
  }

  const loadSessions = async () => {
    setIsLoadingSessions(true)

    try {
      const payload = await getAllSessions()
      const resolvedSessions = resolveArray(payload)
      const detailedSessionResults = await Promise.allSettled(
        resolvedSessions.map((session) => {
          const sessionId = getSessionId(session)
          return sessionId ? getSessionById(sessionId) : Promise.resolve(session)
        }),
      )

      const hydratedSessions = resolvedSessions.map((session, index) => {
        const detailedResult = detailedSessionResults[index]

        if (detailedResult?.status === "fulfilled") {
          const detailedPayload = detailedResult.value
          const detailedSession =
            detailedPayload?.data?.session ||
            detailedPayload?.data ||
            detailedPayload?.session ||
            null

          return detailedSession ? { ...session, ...detailedSession } : session
        }

        return session
      })
      setSessions(hydratedSessions)

      if (hydratedSessions.length && !semesterForm.sessionId) {
        setSemesterForm((current) => ({
          ...current,
          sessionId: getSessionId(hydratedSessions[0]),
        }))
      }
    } catch (error) {
      setToastMessage(error.message || "Unable to load sessions right now.")
      setSessions([])
    } finally {
      setIsLoadingSessions(false)
    }
  }

  const loadPortalStatus = async () => {
    setIsLoadingPortalStatus(true)

    try {
      const payload = await getPortalStatus()
      const resolvedStatuses = createPortalStatusMap(payload)
      setPortalStatuses(resolvedStatuses)
      setIsPortalOpen(resolvedStatuses[selectedPortalType])
    } catch (error) {
      setToastMessage(error.message || "Unable to load portal status right now.")
    } finally {
      setIsLoadingPortalStatus(false)
    }
  }

  useEffect(() => {
    loadSessions()
    loadPortalStatus()
  }, [])

  useEffect(() => {
    setIsPortalOpen(portalStatuses[selectedPortalType])
  }, [selectedPortalType])

  const handleSessionFieldChange = (key) => (event) => {
    setSessionForm((current) => ({ ...current, [key]: event.target.value }))
  }

  const handleSemesterFieldChange = (key) => (event) => {
    setSemesterForm((current) => ({ ...current, [key]: event.target.value }))
  }

  const handleCreateSession = async (event) => {
    event.preventDefault()
    setIsCreatingSession(true)

    try {
      await createSession({
        name: sessionForm.name,
        startDate: sessionForm.startDate,
        endDate: sessionForm.endDate,
      })

      setToastMessage("Academic session created successfully.")
      setSessionForm(INITIAL_SESSION_FORM)
      await loadSessions()
    } catch (error) {
      setToastMessage(error.message || "Unable to create session.")
    } finally {
      setIsCreatingSession(false)
    }
  }

  const handleCreateSemester = async (event) => {
    event.preventDefault()
    setIsCreatingSemester(true)

    try {
      await createSemester(semesterForm)
      setToastMessage("Semester created successfully.")
      setSemesterForm((current) => ({
        ...INITIAL_SEMESTER_FORM,
        sessionId: current.sessionId,
      }))
      await loadSessions()
    } catch (error) {
      setToastMessage(error.message || "Unable to create semester.")
    } finally {
      setIsCreatingSemester(false)
    }
  }

  const handleOpenEditSession = (session) => {
    setEditingSession({
      id: getSessionId(session),
      name: getSessionName(session),
      startDate: formatSessionDate(getSessionStartDate(session)),
      endDate: formatSessionDate(getSessionEndDate(session)),
    })
  }

  const handleEditSessionFieldChange = (key) => (event) => {
    setEditingSession((current) => ({ ...current, [key]: event.target.value }))
  }

  const handleCloseEditSession = () => {
    setEditingSession(INITIAL_EDIT_SESSION_FORM)
  }

  const handleUpdateSession = async (event) => {
    event.preventDefault()
    setIsUpdatingSession(true)

    try {
      await updateSession(editingSession.id, {
        startDate: editingSession.startDate,
        endDate: editingSession.endDate,
      })
      setToastMessage("Session dates updated successfully.")
      handleCloseEditSession()
      await loadSessions()
    } catch (error) {
      setToastMessage(error.message || "Unable to update session.")
    } finally {
      setIsUpdatingSession(false)
    }
  }

  const handleOpenEditSemester = (semester) => {
    setEditingSemester({
      id: getSemesterId(semester),
      name: getSemesterType(semester),
      startDate: formatSessionDate(getSemesterStartDate(semester)),
      endDate: formatSessionDate(getSemesterEndDate(semester)),
    })
  }

  const handleEditSemesterFieldChange = (key) => (event) => {
    setEditingSemester((current) => ({ ...current, [key]: event.target.value }))
  }

  const handleCloseEditSemester = () => {
    setEditingSemester(INITIAL_EDIT_SEMESTER_FORM)
  }

  const handleUpdateSemester = async (event) => {
    event.preventDefault()
    setIsUpdatingSemester(true)

    try {
      await updateSemester(editingSemester.id, {
        startDate: editingSemester.startDate,
        endDate: editingSemester.endDate,
      })
      setToastMessage("Semester dates updated successfully.")
      handleCloseEditSemester()
      await loadSessions()
    } catch (error) {
      setToastMessage(error.message || "Unable to update semester.")
    } finally {
      setIsUpdatingSemester(false)
    }
  }

  const updatePortalStatus = async (nextOpenState) => {
    if (isUpdatingPortalStatus || isLoadingPortalStatus) return
    setIsUpdatingPortalStatus(true)

    try {
      if (nextOpenState) {
        await openPortal(selectedPortalType)
        setPortalStatuses((current) => ({ ...current, [selectedPortalType]: true }))
        setIsPortalOpen(true)
        setToastMessage("Portal opened successfully.")
      } else {
        await closePortal(selectedPortalType)
        setPortalStatuses((current) => ({ ...current, [selectedPortalType]: false }))
        setIsPortalOpen(false)
        setToastMessage("Portal closed successfully.")
      }
    } catch (error) {
      setToastMessage(error.message || "Unable to update portal status.")
    } finally {
      setIsUpdatingPortalStatus(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>Registry Configuration</PageEyebrow>
        <PageTitle
          title="Portal Management"
          description="Create academic sessions, review existing sessions, and attach semesters to the right academic cycle."
          actions={
            <PortalButton variant="outline" onClick={refreshPortalManagementData}>
              <RefreshCcw className="h-4 w-4" />
              Refresh Portal Management
            </PortalButton>
          }
        />

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="space-y-5">
            <PortalCard>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[22px] font-bold text-portal-text-strong">Create Session</p>
                  <p className="mt-1 text-sm text-portal-text-muted">
                    Set up a new academic session before attaching semesters below.
                  </p>
                </div>
                <StatusPill>{`${sessions.length} Sessions`}</StatusPill>
              </div>

              <form className="mt-5 space-y-4" onSubmit={handleCreateSession}>
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                    Session Name
                  </label>
                  <Input
                    value={sessionForm.name}
                    onChange={handleSessionFieldChange("name")}
                    placeholder="e.g. 2024/2025"
                    className="h-11 border-portal-border bg-white text-sm"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={sessionForm.startDate}
                      onChange={handleSessionFieldChange("startDate")}
                      className="h-11 border-portal-border bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={sessionForm.endDate}
                      onChange={handleSessionFieldChange("endDate")}
                      className="h-11 border-portal-border bg-white text-sm"
                    />
                  </div>
                </div>

                <PortalButton type="submit" disabled={isCreatingSession}>
                  <PlusCircle className="h-4 w-4" />
                  {isCreatingSession ? "Creating Session..." : "Create Session"}
                </PortalButton>
              </form>
            </PortalCard>

            <PortalCard accent="gold">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[22px] font-bold text-portal-text-strong">Create Semester</p>
                  <p className="mt-1 text-sm text-portal-text-muted">
                    Link a semester to one of the sessions already created from the portal.
                  </p>
                </div>
                <Layers3 className="h-5 w-5 text-portal-brand-soft" />
              </div>

              <form className="mt-5 space-y-4" onSubmit={handleCreateSemester}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                      Session
                    </label>
                    <select
                      value={semesterForm.sessionId}
                      onChange={handleSemesterFieldChange("sessionId")}
                      className="h-11 w-full rounded-[6px] border border-portal-border bg-white px-4 text-sm text-portal-text outline-none"
                    >
                      <option value="">Select session</option>
                      {sortedSessions.map((session) => (
                        <option key={getSessionId(session)} value={getSessionId(session)}>
                          {getSessionName(session)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                      Semester Type
                    </label>
                    <select
                      value={semesterForm.type}
                      onChange={handleSemesterFieldChange("type")}
                      className="h-11 w-full rounded-[6px] border border-portal-border bg-white px-4 text-sm text-portal-text outline-none"
                    >
                      <option value="FIRST">FIRST</option>
                      <option value="SECOND">SECOND</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={semesterForm.startDate}
                      onChange={handleSemesterFieldChange("startDate")}
                      className="h-11 border-portal-border bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={semesterForm.endDate}
                      onChange={handleSemesterFieldChange("endDate")}
                      className="h-11 border-portal-border bg-white text-sm"
                    />
                  </div>
                </div>

                <PortalButton type="submit" variant="gold" disabled={isCreatingSemester}>
                  <CalendarDays className="h-4 w-4" />
                  {isCreatingSemester ? "Creating Semester..." : "Create Semester"}
                </PortalButton>
              </form>
            </PortalCard>
          </div>

          <PortalCard accent="gold">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[22px] font-bold text-portal-text-strong">Portal</p>
                <p className="mt-1 text-sm text-portal-text-muted">
                  View current portal status and open or close access for users.
                </p>
              </div>
              {isPortalOpen ? (
                <Wifi className="h-5 w-5 text-portal-status-success-text" />
              ) : (
                <WifiOff className="h-5 w-5 text-portal-status-danger-text" />
              )}
            </div>

            <div className="mt-6 rounded-[12px] border border-portal-border bg-white p-5">
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[10px] border border-portal-border bg-portal-surface px-3 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                      Payment Portal
                    </p>
                    <span
                      aria-hidden="true"
                      className={`relative inline-flex h-5 w-10 shrink-0 items-center rounded-full border ${
                        isLoadingPortalStatus
                          ? "border-stone-300 bg-stone-100"
                          : portalStatuses.FEE_PAYMENT
                            ? "border-green-700 bg-green-100"
                            : "border-red-700 bg-red-100"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                          !isLoadingPortalStatus && portalStatuses.FEE_PAYMENT
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      />
                    </span>
                  </div>
                  <p
                    className={`mt-1 text-sm font-bold ${
                      isLoadingPortalStatus
                        ? "text-portal-text-muted"
                        : portalStatuses.FEE_PAYMENT
                          ? "text-portal-status-success-text"
                          : "text-portal-status-danger-text"
                    }`}
                  >
                    {isLoadingPortalStatus
                      ? "Loading"
                      : portalStatuses.FEE_PAYMENT ? "Open" : "Closed"}
                  </p>
                </div>

                <div className="rounded-[10px] border border-portal-border bg-portal-surface px-3 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                      Course Registration
                    </p>
                    <span
                      aria-hidden="true"
                      className={`relative inline-flex h-5 w-10 shrink-0 items-center rounded-full border ${
                        isLoadingPortalStatus
                          ? "border-stone-300 bg-stone-100"
                          : portalStatuses.COURSE_REGISTRATION
                            ? "border-green-700 bg-green-100"
                            : "border-red-700 bg-red-100"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                          !isLoadingPortalStatus && portalStatuses.COURSE_REGISTRATION
                            ? "translate-x-5"
                            : "translate-x-1"
                        }`}
                      />
                    </span>
                  </div>

                  <p
                    className={`mt-1 text-sm font-bold ${
                      isLoadingPortalStatus
                        ? "text-portal-text-muted"
                        : portalStatuses.COURSE_REGISTRATION
                          ? "text-portal-status-success-text"
                          : "text-portal-status-danger-text"
                    }`}
                  >
                    {isLoadingPortalStatus
                      ? "Loading"
                      : portalStatuses.COURSE_REGISTRATION ? "Open" : "Closed"}
                  </p>
                </div>
              </div>
              <hr className="border-portal-border" />
              <div className="pt-4">
                <label className="mb-2 mt-24 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                  Portal Type
                </label>
                <select
                  value={selectedPortalType}
                  onChange={(event) => setSelectedPortalType(event.target.value)}
                  className="h-11 w-full max-w-full appearance-none overflow-hidden rounded-[6px] border border-portal-border bg-white px-3 pr-10 text-[13px] leading-tight text-portal-text text-ellipsis whitespace-nowrap outline-none"
                >
                  {PORTAL_TYPE_OPTIONS.map((option) => ( 
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
                    Portal Status
                  </p>
                  <div className="mt-2">
                    {isLoadingPortalStatus ? (
                      <StatusPill>Loading</StatusPill>
                    ) : (
                      <StatusPill>{isPortalOpen ? "Open" : "Closed"}</StatusPill>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isPortalOpen}
                  aria-label="Toggle portal status"
                  disabled={isLoadingPortalStatus || isUpdatingPortalStatus}
                  onClick={() => updatePortalStatus(!isPortalOpen)}
                  className={`relative inline-flex h-8 w-16 shrink-0 items-center rounded-full border transition-colors ${
                    isPortalOpen
                      ? "border-portal-status-success-text bg-green-700"
                      : "border-portal-status-danger-text bg-red-500"
                  } ${
                    isLoadingPortalStatus || isUpdatingPortalStatus
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                      isPortalOpen ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <PortalButton
                  type="button"
                  variant={isPortalOpen ? "primary" : "outline"}
                  onClick={() => updatePortalStatus(true)}
                  disabled={isPortalOpen || isLoadingPortalStatus || isUpdatingPortalStatus}
                >
                  Open Portal
                </PortalButton>
                <PortalButton
                  type="button"
                  variant={!isPortalOpen ? "outline" : "soft"}
                  onClick={() => updatePortalStatus(false)}
                  disabled={!isPortalOpen || isLoadingPortalStatus || isUpdatingPortalStatus}
                >
                  Close Portal
                </PortalButton>
              </div>

              <p className="mt-4 text-sm text-portal-text-muted">
                {isLoadingPortalStatus
                  ? "Checking current portal availability."
                  : isPortalOpen
                    ? "Students and staff can currently access the portal."
                    : "Portal access is currently restricted until it is opened again."}
              </p>
            </div>
          </PortalCard>
        </div>

        <PortalCard>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[22px] font-bold text-portal-text-strong">Created Sessions</p>
            </div>
            <StatusPill>{isLoadingSessions ? "Loading" : `${sortedSessions.length} Loaded`}</StatusPill>
          </div>

          <div className="mt-5 space-y-3">
            {isLoadingSessions ? (
              Array.from({ length: 3 }).map((_, index) => (
                <PortalCardSkeleton key={index} lines={2} showBadge />
              ))
            ) : sortedSessions.length ? (
              sortedSessions.map((session) => (
                <div
                  key={getSessionId(session) || getSessionName(session)}
                  className="group rounded-[12px] border border-portal-border bg-portal-surface px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4 border-b border-portal-border pb-3">
                    <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[minmax(0,1.6fr)_140px_140px_120px]">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-portal-text-faded">
                          Session
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold text-portal-text">{getSessionName(session)}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-portal-text-faded">
                          Start Date
                        </p>
                        <p className="mt-1 text-sm text-portal-text">{formatSessionDate(getSessionStartDate(session))}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-portal-text-faded">
                          End Date
                        </p>
                        <p className="mt-1 text-sm text-portal-text">{formatSessionDate(getSessionEndDate(session))}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-portal-text-faded">
                          Status
                        </p>
                        <div className="mt-1">
                          {getSessionCurrentState(session) ? <StatusPill>Current</StatusPill> : <span className="text-sm text-portal-text-muted">No</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenEditSession(session)}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-portal-border bg-white text-portal-text-muted opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-portal-brand hover:text-portal-brand"
                      aria-label={`Edit ${getSessionName(session)}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 border-t border-portal-border pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-portal-text-faded">
                      Attached Semesters
                    </p>

                    <div className="mt-3 space-y-3 sm:pl-0">
                      {getSessionSemesters(session).length ? (
                        getSessionSemesters(session).map((semester) => (
                          <div
                            key={getSemesterId(semester) || `${getSessionId(session)}-${getSemesterType(semester)}`}
                            className="group/semester rounded-[10px] border border-portal-border bg-white px-3 py-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[minmax(0,1.6fr)_140px_140px_120px]">
                                <div className="min-w-0">
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-portal-text-faded">
                                    Semester
                                  </p>
                                  <p className="mt-1 truncate text-sm font-semibold text-portal-text">{getSemesterType(semester)}</p>
                                </div>

                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-portal-text-faded">
                                    Start Date
                                  </p>
                                  <p className="mt-1 text-sm text-portal-text">{formatSessionDate(getSemesterStartDate(semester))}</p>
                                </div>

                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-portal-text-faded">
                                    End Date
                                  </p>
                                  <p className="mt-1 text-sm text-portal-text">{formatSessionDate(getSemesterEndDate(semester))}</p>
                                </div>

                                <div className="hidden sm:block" />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleOpenEditSemester(semester)}
                                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-portal-border bg-white text-portal-text-muted opacity-0 transition-all duration-200 group-hover/semester:opacity-100 hover:border-portal-brand hover:text-portal-brand"
                                aria-label={`Edit ${getSemesterType(semester)}`}
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-[8px] border border-dashed border-portal-border-muted bg-white px-3 py-3 text-sm text-portal-text-muted">
                          No semester has been added to this session yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[10px] border border-dashed border-portal-border-muted bg-portal-surface px-6 py-10 text-center text-sm text-portal-text-muted">
                No sessions have been created yet.
              </div>
            )}
          </div>
        </PortalCard>
      </div>

      <PortalToast
        open={Boolean(toastMessage)}
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <PortalModal
        open={Boolean(editingSession.id)}
        onClose={handleCloseEditSession}
        title={editingSession.name ? `Edit ${editingSession.name}` : "Edit Session"}
        description="Update the start date and end date for this academic session."
        className="max-w-xl"
      >
        <form className="space-y-4" onSubmit={handleUpdateSession}>
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
              Start Date
            </label>
            <Input
              type="date"
              value={editingSession.startDate}
              onChange={handleEditSessionFieldChange("startDate")}
              className="h-11 border-portal-border bg-white text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
              End Date
            </label>
            <Input
              type="date"
              value={editingSession.endDate}
              onChange={handleEditSessionFieldChange("endDate")}
              className="h-11 border-portal-border bg-white text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <PortalButton type="submit" disabled={isUpdatingSession}>
              {isUpdatingSession ? "Updating..." : "Update Session"}
            </PortalButton>
            <PortalButton type="button" variant="outline" onClick={handleCloseEditSession}>
              Cancel
            </PortalButton>
          </div>
        </form>
      </PortalModal>

      <PortalModal
        open={Boolean(editingSemester.id)}
        onClose={handleCloseEditSemester}
        title={editingSemester.name ? `Edit ${editingSemester.name}` : "Edit Semester"}
        description="Update the start date and end date for this semester."
        className="max-w-xl"
      >
        <form className="space-y-4" onSubmit={handleUpdateSemester}>
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
              Start Date
            </label>
            <Input
              type="date"
              value={editingSemester.startDate}
              onChange={handleEditSemesterFieldChange("startDate")}
              className="h-11 border-portal-border bg-white text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">
              End Date
            </label>
            <Input
              type="date"
              value={editingSemester.endDate}
              onChange={handleEditSemesterFieldChange("endDate")}
              className="h-11 border-portal-border bg-white text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <PortalButton type="submit" disabled={isUpdatingSemester}>
              {isUpdatingSemester ? "Updating..." : "Update Semester"}
            </PortalButton>
            <PortalButton type="button" variant="outline" onClick={handleCloseEditSemester}>
              Cancel
            </PortalButton>
          </div>
        </form>
      </PortalModal>
    </>
  )
}
