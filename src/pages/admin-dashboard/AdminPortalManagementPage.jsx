import { useEffect, useMemo, useState } from "react"
import { CalendarDays, Layers3, PlusCircle, RefreshCcw } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalCardSkeleton } from "../../components/portal/PortalSkeleton"
import { PortalToast } from "../../components/portal/PortalToast"
import { Input } from "../../components/ui/input"
import { PageEyebrow, PageTitle, StatusPill } from "../../components/admin-shared/Shared"
import { resolveArray } from "../../components/admin-shared/adminManagementUtils"
import { createSemester, createSession, getAllSessions } from "../../store/admin/adminApi"

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

function formatSessionDate(value) {
  if (!value) return "No date"
  if (typeof value === "string") return value.split("T")[0]
  return String(value)
}

export default function AdminPortalManagementPage() {
  const [sessionForm, setSessionForm] = useState(INITIAL_SESSION_FORM)
  const [semesterForm, setSemesterForm] = useState(INITIAL_SEMESTER_FORM)
  const [sessions, setSessions] = useState([])
  const [toastMessage, setToastMessage] = useState("")
  const [isLoadingSessions, setIsLoadingSessions] = useState(true)
  const [isCreatingSession, setIsCreatingSession] = useState(false)
  const [isCreatingSemester, setIsCreatingSemester] = useState(false)

  const sortedSessions = useMemo(
    () =>
      [...sessions].sort((a, b) =>
        String(getSessionStartDate(b)).localeCompare(String(getSessionStartDate(a))),
      ),
    [sessions],
  )

  const loadSessions = async () => {
    setIsLoadingSessions(true)

    try {
      const payload = await getAllSessions()
      const resolvedSessions = resolveArray(payload)
      setSessions(resolvedSessions)

      if (resolvedSessions.length && !semesterForm.sessionId) {
        setSemesterForm((current) => ({
          ...current,
          sessionId: getSessionId(resolvedSessions[0]),
        }))
      }
    } catch (error) {
      setToastMessage(error.message || "Unable to load sessions right now.")
      setSessions([])
    } finally {
      setIsLoadingSessions(false)
    }
  }

  useEffect(() => {
    loadSessions()
  }, [])

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
    } catch (error) {
      setToastMessage(error.message || "Unable to create semester.")
    } finally {
      setIsCreatingSemester(false)
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
            <PortalButton variant="outline" onClick={loadSessions}>
              <RefreshCcw className="h-4 w-4" />
              Refresh Sessions
            </PortalButton>
          }
        />

        <div className="grid gap-5 xl:grid-cols-2">
          <PortalCard>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[22px] font-bold text-portal-text-strong">Create Session</p>

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

        <PortalCard>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[22px] font-bold text-portal-text-strong">Created Sessions</p>
              <p className="mt-1 text-sm text-portal-text-muted">
                Review all sessions returned from `GET /api/v1/admin/sessions`.
              </p>
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
                  className="rounded-[10px] border border-portal-border bg-portal-surface px-4 py-4"
                >
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,220px)_1fr] lg:items-center">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-portal-text">{getSessionName(session)}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-portal-text-faded">
                        ID: {getSessionId(session) || "Unavailable"}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="px-1 py-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">Start Date</p>
                        <p className="mt-1 text-sm text-portal-text">{formatSessionDate(getSessionStartDate(session))}</p>
                      </div>
                      <div className="px-1 py-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">End Date</p>
                        <p className="mt-1 text-sm text-portal-text">{formatSessionDate(getSessionEndDate(session))}</p>
                      </div>
                      <div className="px-1 py-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-text-faded">Current Session</p>
                        <div className="mt-2 flex items-center justify-start">
                          {getSessionCurrentState(session) ? <StatusPill>Current</StatusPill> : <span className="text-sm text-portal-text-muted">No</span>}
                        </div>
                      </div>
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
    </>
  )
}
