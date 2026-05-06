import { useMemo, useState } from "react"
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Printer,
  Trash2,
} from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalModal } from "../../components/portal/PortalModal"
import { PortalToast } from "../../components/portal/PortalToast"
import CourseRegistrationPrintPreview from "../../components/student-shared/CourseRegistrationPrintPreview"
import { getPortalSession } from "../../lib/portal-auth"

const departmentOptions = ["Computer Science", "Computer Engineering", "Statistics"]
const levelOptions = ["ND 1", "ND 2", "HND 1", "HND 2"]
const maxUnits = 24

const availableCourseSeed = [
  {
    code: "CSC 401",
    title: "Advanced Algorithm Design",
    track: "Core",
    category: "Recommended for ND2 curriculum",
    units: 4,
    sessions: "3 Units",
    schedule: "1st Sem",
  },
  {
    code: "CSC 411",
    title: "Network Security & Cryptography",
    track: "Elective",
    category: "Recommended for ND2 curriculum",
    units: 3,
    sessions: "3 Units",
    schedule: "1st Sem",
  },
  {
    code: "CSC 418",
    title: "Mobile Application Development",
    track: "Core",
    category: "Recommended for ND2 curriculum",
    units: 4,
    sessions: "4 Units",
    schedule: "1st Sem",
  },
  {
    code: "CSC 410",
    title: "Web Application Packages",
    track: "Core",
    category: "Recommended for ND1 curriculum",
    units: 4,
    sessions: "4 Units",
    schedule: "1st Sem",
  },
]

const currentCourseSeed = [
  {
    code: "CSC 401",
    title: "Advanced Algorithm Design",
    lecturer: "Course Tutor: Mr. Samuel Jonah",
    units: 4,
  },
  {
    code: "CSC 405",
    title: "Artificial Intelligence Fundamentals",
    lecturer: "Course Tutor: Mrs. Temitayo Adeniji",
    units: 4,
  },
]

const repeatCourseSeed = [
  {
    code: "CSC 213",
    title: "System Analysis",
    level: "ND 2",
    status: "Matured",
    action: "Add to Repeat",
  },
  {
    code: "GNS 202",
    title: "Communication in English",
    level: "ND 1",
    status: "Pending",
    action: "Add to Repeat",
  },
]

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
          className="h-10 w-full appearance-none rounded-[4px] border border-portal-border-soft bg-white px-3 pr-10 text-sm font-medium text-[#5f2419] outline-none transition-colors focus:border-[#c39d48]"
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

function SectionTitle({ title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-[24px] font-bold tracking-tight text-student-title">{title}</h2>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c5b19d]">
          {subtitle}
        </p>
      </div>
      {right}
    </div>
  )
}

export default function CourseRegistrationPage() {
  const session = getPortalSession()
  const [department, setDepartment] = useState(departmentOptions[0])
  const [level, setLevel] = useState(levelOptions[1])
  const [availableCourses, setAvailableCourses] = useState(availableCourseSeed)
  const [selectedCourses, setSelectedCourses] = useState(currentCourseSeed)
  const [printPreviewOpen, setPrintPreviewOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const studentName = session?.name || "Adewale Samuel Kolawole"

  const currentUnits = useMemo(
    () => selectedCourses.reduce((total, course) => total + course.units, 0),
    [selectedCourses],
  )

  const handleAcceptCourse = (course) => {
    const alreadySelected = selectedCourses.some((item) => item.code === course.code)

    if (alreadySelected) {
      setToastMessage(`${course.code} is already on your course ledger.`)
      return
    }

    if (currentUnits + course.units > maxUnits) {
      setToastMessage(`Adding ${course.code} exceeds the ${maxUnits.toFixed(1)} unit limit.`)
      return
    }

    setSelectedCourses((prev) => [
      ...prev,
      {
        code: course.code,
        title: course.title,
        lecturer: "Course Tutor: Department Assignment Pending",
        units: course.units,
      },
    ])
    setAvailableCourses((prev) => prev.filter((item) => item.code !== course.code))
    setToastMessage(`${course.code} added to your course registration ledger.`)
  }

  const handleRemoveCourse = (course) => {
    setSelectedCourses((prev) => prev.filter((item) => item.code !== course.code))

    const existsInAvailableSeed = availableCourseSeed.find((item) => item.code === course.code)
    if (existsInAvailableSeed) {
      setAvailableCourses((prev) =>
        [...prev, existsInAvailableSeed].sort((a, b) => a.code.localeCompare(b.code)),
      )
    }

    setToastMessage(`${course.code} removed from your active session ledger.`)
  }

  const handlePrintDocument = () => {
    setPrintPreviewOpen(false)
    window.setTimeout(() => {
      window.print()
    }, 150)
  }

  return (
    <>
      <div className="course-registration-screen space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c5a552]">
              Academic Portal
            </p>
            <h1 className="mt-2 text-[30px] font-bold tracking-tight text-[#0f2235] sm:text-[44px]">
              Course Registration
            </h1>
            <p className="mt-3 max-w-[760px] text-sm leading-6 text-[#8f8173] sm:text-[15px]">
              Select your mandatory and elective modules for the current semester. Please
              ensure all previous carry-over courses are accounted for before finalizing your
              ledger.
            </p>
          </div>

          <PortalButton size="sm" className="self-start" onClick={() => setPrintPreviewOpen(true)}>
            <Printer className="h-4 w-4" />
            Print Course Form
          </PortalButton>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_220px]">
          <SelectField
            label="Department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            options={departmentOptions}
          />
          <SelectField
            label="Section / Level"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            options={levelOptions}
          />
          <PortalCard accent="gold" padding="sm" className="flex h-full flex-col justify-center bg-[#f8f5ef]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b7a391]">
              Maximum Allowed
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-[40px] font-bold leading-none text-[#5c2016]">
                {currentUnits.toFixed(1)}
              </p>
              <span className="rounded-full bg-[#f3e8cd] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9a7a1d]">
                {maxUnits.toFixed(1)}
              </span>
            </div>
          </PortalCard>
        </div>

        <section className="space-y-5">
          <SectionTitle
            title="Available Courses"
            subtitle="Recommended for ND2 curriculum"
            right={
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c1ad99]">
                {availableCourses.length} Total
              </span>
            }
          />

          <div className="grid gap-4 xl:grid-cols-4">
            {availableCourses.map((course) => (
              <PortalCard key={course.code} padding="sm" className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b7a391]">
                      {course.code}
                    </p>
                    <h3 className="mt-3 text-[13px] font-bold leading-tight text-[#4d1b14]">
                      {course.title}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] ${
                      course.track === "Core"
                        ? "bg-[#fce8e6] text-portal-brand-soft"
                        : "bg-[#f1f4fb] text-[#52719c]"
                    }`}
                  >
                    {course.track}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3 text-[11px] font-medium text-[#a39184]">
                  <span>{course.sessions}</span>
                  <span>{course.schedule}</span>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <PortalButton className="min-w-[100px]" onClick={() => handleAcceptCourse(course)}>
                    Accept Now
                  </PortalButton>
                  <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-[6px] border border-portal-border-soft bg-[#fcfaf7] px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8c7768]">
                    {course.units.toFixed(1)}
                  </span>
                </div>
              </PortalCard>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <SectionTitle
            title="Courses to Take"
            subtitle="Active selection for this session"
            right={
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4d1b14]">
                Current Units: {currentUnits.toFixed(1)}
              </span>
            }
          />

          <PortalCard padding="sm" className="overflow-hidden">
            <div className="hidden md:block">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b7a391]">
                    <th className="pb-1">Course</th>
                    <th className="pb-1">Lecturer</th>
                    <th className="pb-1 text-right">Units</th>
                    <th className="pb-1 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCourses.map((course) => (
                    <tr key={course.code} className="bg-portal-surface text-sm text-portal-text">
                      <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft">
                          {course.code}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-portal-text-strong">{course.title}</p>
                      </td>
                      <td className="border-y border-portal-border px-4 py-4 text-[#a18e7f]">
                        {course.lecturer}
                      </td>
                      <td className="border-y border-portal-border px-4 py-4 text-right text-[20px] font-bold text-[#163049]">
                        {course.units.toFixed(1)}
                      </td>
                      <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 text-right">
                        <button
                          className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-portal-border-soft text-[#bca897] transition-colors hover:bg-[#faf5ef] hover:text-primary"
                          onClick={() => handleRemoveCourse(course)}
                          aria-label={`Remove ${course.code}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {selectedCourses.map((course) => (
                <div key={course.code} className="rounded-[8px] border border-portal-border bg-portal-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft">
                        {course.code}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-portal-text-strong">{course.title}</p>
                      <p className="mt-1 text-sm text-[#a18e7f]">{course.lecturer}</p>
                    </div>
                    <span className="text-lg font-bold text-[#163049]">{course.units.toFixed(1)}</span>
                  </div>
                  <button
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft"
                    onClick={() => handleRemoveCourse(course)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </PortalCard>
        </section>

        <section className="space-y-5">
          <SectionTitle
            title="Courses to Repeat"
            subtitle="Pending modules from previous levels"
            right={
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fbe8e8] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b33a34]">
                <AlertTriangle className="h-3.5 w-3.5" />
                2 Carry-Overs
              </span>
            }
          />

          <PortalCard padding="sm" className="overflow-hidden">
            <div className="hidden md:block">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b7a391]">
                    <th className="pb-1">Course Detail</th>
                    <th className="pb-1">Level Failed</th>
                    <th className="pb-1">Status</th>
                    <th className="pb-1 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {repeatCourseSeed.map((course) => (
                    <tr key={course.code} className="bg-portal-surface text-sm text-portal-text">
                      <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b7a391]">
                          {course.code}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-portal-text-strong">{course.title}</p>
                      </td>
                      <td className="border-y border-portal-border px-4 py-4 font-semibold text-portal-text-strong">
                        {course.level}
                      </td>
                      <td className="border-y border-portal-border px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                            course.status === "Matured"
                              ? "bg-[#fde8e4] text-[#b81d13]"
                              : "bg-portal-status-warning-bg text-portal-status-warning-text"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 text-right">
                        <PortalButton
                          size="sm"
                          className="min-w-[126px]"
                          onClick={() => setToastMessage(`${course.code} added to repeat-course review.`)}
                        >
                          {course.action}
                        </PortalButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {repeatCourseSeed.map((course) => (
                <div key={course.code} className="rounded-[8px] border border-portal-border bg-portal-surface p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b7a391]">
                    {course.code}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-portal-text-strong">{course.title}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8f8173]">
                      {course.level}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        course.status === "Matured"
                          ? "bg-[#fde8e4] text-[#b81d13]"
                          : "bg-portal-status-warning-bg text-portal-status-warning-text"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                  <PortalButton
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => setToastMessage(`${course.code} added to repeat-course review.`)}
                  >
                    {course.action}
                  </PortalButton>
                </div>
              ))}
            </div>
          </PortalCard>
        </section>

        <div className="flex justify-end">
          <PortalButton
            size="lg"
            className="min-w-[220px]"
            onClick={() => setToastMessage("Course registration ledger finalized successfully.")}
          >
            <Check className="h-4 w-4" />
            Finalize Ledger
          </PortalButton>
        </div>
      </div>

      <PortalModal
        open={printPreviewOpen}
        onClose={() => setPrintPreviewOpen(false)}
        title="Course Form Preview"
        description="Review the registration form below before printing. In the print dialog, choose Save as PDF if you want a PDF copy."
        className="max-w-[1080px]"
      >
        <div className="space-y-5">
          <div className="max-h-[72vh] overflow-y-auto rounded-[14px] border border-portal-border-soft bg-[#f6f1e8] p-4 sm:p-6">
            <CourseRegistrationPrintPreview
              studentName={studentName}
              department={department}
              level={level}
              selectedCourses={selectedCourses}
              availableCourses={availableCourses}
              repeatCourses={repeatCourseSeed}
              currentUnits={currentUnits}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <PortalButton variant="outline" onClick={() => setPrintPreviewOpen(false)}>
              Close Preview
            </PortalButton>
            <PortalButton onClick={handlePrintDocument}>
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </PortalButton>
          </div>
        </div>
      </PortalModal>

      <div id="course-registration-print-root" className="hidden">
        <CourseRegistrationPrintPreview
          studentName={studentName}
          department={department}
          level={level}
          selectedCourses={selectedCourses}
          availableCourses={availableCourses}
          repeatCourses={repeatCourseSeed}
          currentUnits={currentUnits}
        />
      </div>

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}

