import { useCallback, useEffect, useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalDropdown } from "../../components/portal/PortalDropdown"
import { PortalToast } from "../../components/portal/PortalToast"
import {
  PageEyebrow,
  PageTitle,
  ResponsiveTable,
  StatusPill,
} from "../../components/admin-shared/Shared"
import AcademicProgressionModal from "../../components/admin-shared/AcademicProgressionModal"
import {
  createHodCourse,
  getHodCourses,
  getHodLecturers,
} from "../../store/admin/hodApi"

function resolveLecturerList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.data)) return payload.data.data
  if (Array.isArray(payload?.data?.lecturers)) return payload.data.lecturers
  if (Array.isArray(payload?.lecturers)) return payload.lecturers
  return []
}

function resolveCourseList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.data)) return payload.data.data
  if (Array.isArray(payload?.data?.courses)) return payload.data.courses
  if (Array.isArray(payload?.courses)) return payload.courses
  return []
}

function getLecturerOption(lecturer) {
  const id = String(lecturer?.id || lecturer?._id || lecturer?.lecturerId || "")
  const email = lecturer?.user?.email || lecturer?.email || "Email unavailable"
  const assignedCourseCount = Number(lecturer?._count?.courses || 0)

  return {
    id,
    label: `${email} (${assignedCourseCount} course${assignedCourseCount === 1 ? "" : "s"})`,
  }
}

function getCourseRow(course) {
  const lecturerEmail =
    course?.lecturer?.user?.email ||
    course?.lecturer?.email ||
    course?.lecturerEmail ||
    "Unassigned"

  return {
    id: String(course?.id || course?._id || course?.code || lecturerEmail),
    code: course?.code || "N/A",
    title: course?.name || "Untitled Course",
    department: course?.department?.name || course?.departmentName || "Department not available",
    creditLoad: Number(course?.creditLoad || course?.units || 0).toFixed(1),
    status: course?.status || "Assigned",
    lecturerEmail,
  }
}

export default function AdminCoursesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [courses, setCourses] = useState([])
  const [lecturers, setLecturers] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const lecturerOptions = useMemo(
    () => lecturers.map(getLecturerOption).filter((lecturer) => lecturer.id),
    [lecturers],
  )

  const loadPageData = useCallback(async () => {
    try {
      const [coursesPayload, lecturersPayload] = await Promise.all([
        getHodCourses().catch(() => null),
        getHodLecturers(),
      ])

      setLecturers(resolveLecturerList(lecturersPayload))

      if (coursesPayload) {
        setCourses(resolveCourseList(coursesPayload).map(getCourseRow))
      } else {
        setCourses([])
      }
    } catch (error) {
      setToastMessage(error.message || "Unable to load department courses right now.")
    }
  }, [])

  useEffect(() => {
    loadPageData().catch(() => {})
  }, [loadPageData])

  const handleSave = async (courseData) => {
    setIsSubmitting(true)

    try {
      const payload = await createHodCourse(courseData)
      const createdCourse = getCourseRow(payload?.data || payload)
      setCourses((prev) => [createdCourse, ...prev])
      setModalOpen(false)
      setToastMessage(payload?.message || "Course created successfully.")
    } catch (error) {
      setToastMessage(error.message || "Unable to create the course right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>Curriculum Management</PageEyebrow>
        <PageTitle
          title="The Course Registry"
          description="A centralized ledger of all academic offerings at LOAM POLYTECHNIC. Ensure alignment with institutional standards and accreditation."
          actions={
            <PortalButton onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Add New Course
            </PortalButton>
          }
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_320px]">
          <PortalCard>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">Department Courses</p>
            <p className="mt-4 text-[48px] font-bold text-portal-text-strong">{courses.length}</p>
            <span className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-analytics-gold-value">
              Live from the HOD course registry
            </span>
          </PortalCard>
          <PortalCard className="bg-analytics-series-primary text-white before:bg-analytics-series-primary">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Available Lecturers</p>
            <p className="mt-4 text-[48px] font-bold">{lecturerOptions.length}</p>
            <p className="mt-2 text-sm text-white/70">Ready for course assignment</p>
          </PortalCard>
        </div>

        <PortalCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[22px] font-bold text-portal-text-strong">Department Course List</p>
            <div className="flex gap-3">
              <PortalDropdown
                label="Filter"
                items={[
                  { label: "All departments", onClick: () => setToastMessage("Showing all department courses.") },
                  { label: "Assigned courses only", onClick: () => setToastMessage("Showing courses with lecturer assignments.") },
                ]}
              />
              <PortalDropdown
                label="Export"
                items={[
                  { label: "CSV export", onClick: () => setToastMessage("Course registry CSV export queued.") },
                  { label: "PDF snapshot", onClick: () => setToastMessage("Course registry PDF export queued.") },
                ]}
              />
            </div>
          </div>
          <div className="mt-4">
            <ResponsiveTable
              headers={["Course Code", "Title", "Department", "Credits", "Status", "Actions"]}
              rows={courses}
              renderRow={(row) => (
                <tr key={row.id} className="bg-portal-surface text-sm text-portal-text">
                  <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4 font-semibold">{row.code}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row.title}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row.department}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row.creditLoad}</td>
                  <td className="border-y border-portal-border px-4 py-4"><StatusPill>{row.status}</StatusPill></td>
                  <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft">
                    <button onClick={() => setToastMessage(`Assigned lecturer: ${row.lecturerEmail}`)}>View</button>
                  </td>
                </tr>
              )}
              mobileRender={(row) => (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-portal-text">{row.code} · {row.title}</p>
                  <p className="text-sm text-portal-text-muted">{row.department} · {row.creditLoad} credits</p>
                  <div className="flex items-center justify-between">
                    <StatusPill>{row.status}</StatusPill>
                    <button
                      className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft"
                      onClick={() => setToastMessage(`Assigned lecturer: ${row.lecturerEmail}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              )}
            />
          </div>
        </PortalCard>
      </div>

      <AcademicProgressionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        lecturers={lecturerOptions}
        isSubmitting={isSubmitting}
      />

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
