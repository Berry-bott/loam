// // AdminCoursesPage.jsx
// import { useState } from "react"
// import { Plus } from "lucide-react"
// import { PortalButton } from "../../components/portal/PortalButton"
// import { PortalCard } from "../../components/portal/PortalCard"
// import { PortalDropdown } from "../../components/portal/PortalDropdown"
// import { PortalToast } from "../../components/portal/PortalToast"
// import { adminCourses } from "../../lib/portal-data"
// import {
//   PageEyebrow, PageTitle, ResponsiveTable, StatusPill,
// } from "../../components/admin-shared/Shared"
// import AcademicProgressionModal from "../../components/admin-shared/AcademicProgressionModal"



// export default function AdminCoursesPage() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>Curriculum Management</PageEyebrow>
//         <PageTitle
//           title="The Course Registry"
//           description="A centralized ledger of all academic offerings at LOAM POLYTECHNIC. Ensure alignment with institutional standards and accreditation."
//           actions={
//             <PortalButton onClick={() => setModalOpen(true)}>
//               <Plus className="h-4 w-4" />Add New Course
//             </PortalButton>
//           }
//         />

//         <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_320px]">
//           <PortalCard>
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">Active Enrollments</p>
//             <p className="mt-4 text-[48px] font-bold text-portal-text-strong">14,208</p>
//             <span className="mt-3 inline-flex rounded-full bg-[#f8f2e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-analytics-gold-value">
//               + 12% from last semester
//             </span>
//           </PortalCard>
//           <PortalCard className="bg-analytics-series-primary text-white before:bg-analytics-series-primary">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Total Faculties</p>
//             <p className="mt-4 text-[48px] font-bold">12</p>
//             <p className="mt-2 text-sm text-white/70">Accredited Departments</p>
//           </PortalCard>
//         </div>

//         <PortalCard>
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <p className="text-[22px] font-bold text-portal-text-strong">Department Course List</p>
//             <div className="flex gap-3">
//               <PortalDropdown
//                 label="Filter"
//                 items={[
//                   { label: "All departments", onClick: () => setToastMessage("Course table filtered by department.") },
//                   { label: "Accredited only", onClick: () => setToastMessage("Showing accredited courses only.") },
//                 ]}
//               />
//               <PortalDropdown
//                 label="Export"
//                 items={[
//                   { label: "CSV export", onClick: () => setToastMessage("Course registry CSV export queued.") },
//                   { label: "PDF snapshot", onClick: () => setToastMessage("Course registry PDF export queued.") },
//                 ]}
//               />
//             </div>
//           </div>
//           <div className="mt-4">
//             <ResponsiveTable
//               headers={["Course Code", "Title", "Department", "Credits", "Status", "Actions"]}
//               rows={adminCourses}
//               renderRow={(row) => (
//                 <tr key={row[0]} className="bg-portal-surface text-sm text-portal-text">
//                   <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4 font-semibold">{row[0]}</td>
//                   <td className="border-y border-portal-border px-4 py-4">{row[1]}</td>
//                   <td className="border-y border-portal-border px-4 py-4">{row[2]}</td>
//                   <td className="border-y border-portal-border px-4 py-4">{row[3]}</td>
//                   <td className="border-y border-portal-border px-4 py-4"><StatusPill>{row[4]}</StatusPill></td>
//                   <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft">
//                     <button onClick={() => setToastMessage(`Course ${row[0]} opened for review.`)}>View</button>
//                   </td>
//                 </tr>
//               )}
//               mobileRender={(row) => (
//                 <div className="space-y-2">
//                   <p className="text-sm font-semibold text-portal-text">{row[0]} · {row[1]}</p>
//                   <p className="text-sm text-portal-text-muted">{row[2]} · {row[3]} credits</p>
//                   <div className="flex items-center justify-between">
//                     <StatusPill>{row[4]}</StatusPill>
//                     <button
//                       className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft"
//                       onClick={() => setToastMessage(`Course ${row[0]} opened for review.`)}
//                     >
//                       View
//                     </button>
//                   </div>
//                 </div>
//               )}
//             />
//           </div>
//         </PortalCard>
//       </div>

//       <AcademicProgressionModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSave={(courses) => {
//           setToastMessage(`${courses.length} course(s) saved.`)
//         }}
//       />

//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }






// AdminCoursesPage.jsx
import { useState } from "react"
import { Plus } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalDropdown } from "../../components/portal/PortalDropdown"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminCourses } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, ResponsiveTable, StatusPill,
} from "../../components/admin-shared/Shared"
import AcademicProgressionModal from "../../components/admin-shared/AcademicProgressionModal"

export default function AdminCoursesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // Course list starts from the seed data; new entries are appended
  const [courses, setCourses] = useState(adminCourses)

  // Called when the modal saves. `data` = { department, level, courses[] }
  const handleSave = ({ department, level, courses: newCourses }) => {
    const rows = newCourses.map((c) => [
      c.code,
      c.name,
      `${department} · ${level}`,
      Number(c.units).toFixed(1),
      c.status,
    ])
    setCourses((prev) => [...prev, ...rows])
    setToastMessage(`${newCourses.length} course${newCourses.length > 1 ? "s" : ""} added to the registry.`)
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
              <Plus className="h-4 w-4" />Add New Course
            </PortalButton>
          }
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_320px]">
          <PortalCard>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-analytics-gold-label">Active Enrollments</p>
            <p className="mt-4 text-[48px] font-bold text-portal-text-strong">14,208</p>
            <span className="mt-3 inline-flex rounded-full bg-[#f8f2e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-analytics-gold-value">
              + 12% from last semester
            </span>
          </PortalCard>
          <PortalCard className="bg-analytics-series-primary text-white before:bg-analytics-series-primary">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Total Faculties</p>
            <p className="mt-4 text-[48px] font-bold">12</p>
            <p className="mt-2 text-sm text-white/70">Accredited Departments</p>
          </PortalCard>
        </div>

        <PortalCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[22px] font-bold text-portal-text-strong">Department Course List</p>
            <div className="flex gap-3">
              <PortalDropdown
                label="Filter"
                items={[
                  { label: "All departments", onClick: () => setToastMessage("Course table filtered by department.") },
                  { label: "Accredited only", onClick: () => setToastMessage("Showing accredited courses only.") },
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
                <tr key={row[0]} className="bg-portal-surface text-sm text-portal-text">
                  <td className="rounded-l-[6px] border-y border-l border-portal-border px-4 py-4 font-semibold">{row[0]}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row[1]}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row[2]}</td>
                  <td className="border-y border-portal-border px-4 py-4">{row[3]}</td>
                  <td className="border-y border-portal-border px-4 py-4"><StatusPill>{row[4]}</StatusPill></td>
                  <td className="rounded-r-[6px] border-y border-r border-portal-border px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft">
                    <button onClick={() => setToastMessage(`Course ${row[0]} opened for review.`)}>View</button>
                  </td>
                </tr>
              )}
              mobileRender={(row) => (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-portal-text">{row[0]} · {row[1]}</p>
                  <p className="text-sm text-portal-text-muted">{row[2]} · {row[3]} credits</p>
                  <div className="flex items-center justify-between">
                    <StatusPill>{row[4]}</StatusPill>
                    <button
                      className="text-[11px] font-semibold uppercase tracking-[0.12em] text-portal-brand-soft"
                      onClick={() => setToastMessage(`Course ${row[0]} opened for review.`)}
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
      />

      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}
