import { School, ShieldCheck } from "lucide-react"

function PreviewTable({ title, rows, emptyMessage }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="rounded-[2px] bg-primary px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white">
          Section
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4e1c13]">
          {title}
        </span>
      </div>

      <div className="overflow-hidden rounded-[6px] border border-[#ece1d4]">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#faf5ed] text-left text-[8px] font-semibold uppercase tracking-[0.14em] text-[#a58f78]">
              <th className="border-b border-[#ece1d4] px-3 py-2">Code</th>
              <th className="border-b border-[#ece1d4] px-3 py-2">Title</th>
              <th className="border-b border-[#ece1d4] px-3 py-2">Unit</th>
              <th className="border-b border-[#ece1d4] px-3 py-2">Semester</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((course) => (
                <tr key={`${title}-${course.code}`} className="text-[11px] text-[#4b2419]">
                  <td className="border-b border-portal-border-soft px-3 py-2">{course.code}</td>
                  <td className="border-b border-portal-border-soft px-3 py-2">{course.title}</td>
                  <td className="border-b border-portal-border-soft px-3 py-2">
                    {"units" in course ? course.units.toFixed(1) : "2.0"}
                  </td>
                  <td className="border-b border-portal-border-soft px-3 py-2">1st Semester</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-[11px] italic text-[#b9a899]">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function CourseRegistrationPrintPreview({
  studentName,
  department,
  level,
  selectedCourses,
  availableCourses,
  repeatCourses,
  currentUnits,
}) {
  const registrationDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date())

  const previewSections = [
    {
      title: "Available Courses",
      rows: [...selectedCourses, ...availableCourses],
      emptyMessage: "No courses available for this student profile.",
    },
    {
      title: "Courses To Take",
      rows: selectedCourses,
      emptyMessage: "No active course selections recorded yet.",
    },
    {
      title: "Courses To Repeat (Carry-Over)",
      rows: repeatCourses,
      emptyMessage: "No repeat courses recorded for this student profile.",
    },
  ]

  return (
    <div className="course-registration-print-sheet relative mx-auto w-full max-w-[820px] overflow-hidden rounded-[8px] bg-portal-surface p-5 shadow-[0_24px_50px_rgba(50,16,10,0.08)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="rotate-[-33deg] text-[70px] font-bold tracking-[0.2em] text-[#7a1d14]/[0.06] sm:text-[110px]">
          LOAMPOLY
        </span>
      </div>

      <div className="relative space-y-6 text-[#3c1e16]">
        <div className="flex flex-col gap-4 border-b-2 border-[#91130d] pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#91130d] text-white">
              <School className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[26px] font-bold tracking-tight text-primary">LOAMPOLY</p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#b99855]">
                Official Course Registration Form
              </p>
            </div>
          </div>
          <div className="rounded-[4px] border border-[#e0d1bf] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8d7a68]">
            Session: 2023/2024
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-shared-table-head">
              Department
            </p>
            <p className="mt-1 text-[15px] font-bold text-[#3c1e16]">{department}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-shared-table-head">
              Student Name
            </p>
            <p className="mt-1 text-[15px] font-bold uppercase text-[#3c1e16]">{studentName}</p>
          </div>
        </div>

        <div className="grid gap-4 border-b border-[#ebdfd2] pb-4 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-shared-table-head">
              Programme / Level
            </p>
            <p className="mt-1 text-[14px] font-semibold text-[#3c1e16]">
              {department} · {level}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-shared-table-head">
              Matric / Reg No.
            </p>
            <p className="mt-1 text-[14px] font-semibold text-[#3c1e16]">
              LP/REG/2024/{level.replace(/\s+/g, "")}-STU
            </p>
          </div>
        </div>

        {previewSections.map((section) => (
          <PreviewTable
            key={section.title}
            title={section.title}
            rows={section.rows}
            emptyMessage={section.emptyMessage}
          />
        ))}

        <div className="grid gap-4 pt-4 sm:grid-cols-3 sm:items-end">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-shared-table-head">
              Total Credit Units
            </p>
            <p className="mt-1 text-[30px] font-bold leading-none text-primary">
              {currentUnits.toFixed(1)} Units
            </p>
          </div>
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-shared-table-head">
              Date Of Registration
            </p>
            <p className="mt-1 text-[14px] font-bold text-[#3c1e16]">{registrationDate}</p>
          </div>
          <div className="justify-self-start rounded-[8px] border border-dashed border-[#e3d3c4] px-5 py-4 text-center sm:justify-self-end">
            <ShieldCheck className="mx-auto h-6 w-6 text-[#b99855]" />
            <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b99855]">
              Validated
            </p>
          </div>
        </div>

        <div className="grid gap-6 pt-6 sm:grid-cols-3">
          {[
            "Student Signature",
            "Course Adviser Signature",
            "Head Of Department (HOD)",
          ].map((label) => (
            <div
              key={label}
              className="border-t border-[#cdb9a7] pt-2 text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-[#9b8774]"
            >
              {label}
            </div>
          ))}
        </div>

        <p className="pt-2 text-center text-[7px] uppercase tracking-[0.12em] text-[#b9a899]">
          This form remains valid only after official review and signature clearance.
        </p>
      </div>
    </div>
  )
}

