// import { useState } from "react"
// import {
//   Download,
//   Eye,
//   Plus,
//   Search,
//   Settings2,
// } from "lucide-react"
// import { PortalButton } from "../../components/portal/PortalButton"
// import { PortalCard } from "../../components/portal/PortalCard"
// import { PortalDropdown } from "../../components/portal/PortalDropdown"
// import { PortalModal } from "../../components/portal/PortalModal"
// import { PortalToast } from "../../components/portal/PortalToast"
// import {
//   adminActivityRows,
//   adminAnalyticsRows,
//   adminApplicationRows,
//   adminCourses,
//   adminFacultyCards,
//   adminNewsItems,
//   adminOverviewStats,
//   adminPaymentRows,
//   adminSettingsUsers,
//   adminStudents,
// } from "../../lib/portal-data"

// function toneClass(tone) {
//   if (tone === "green") return "text-[#2f8a44]"
//   if (tone === "red") return "text-[#b81d13]"
//   return "text-[#b18a1d]"
// }

// function statusClass(status) {
//   const value = status.toLowerCase()
//   if (value.includes("approved") || value.includes("success") || value.includes("verified") || value.includes("cleared") || value.includes("strong")) {
//     return "bg-[#eaf7ec] text-[#2f8a44]"
//   }
//   if (value.includes("rejected") || value.includes("failed") || value.includes("urgent")) {
//     return "bg-[#fde8e4] text-[#b81d13]"
//   }
//   if (value.includes("official") || value.includes("live") || value.includes("reviewed") || value.includes("stable")) {
//     return "bg-[#ebf3fe] text-[#3c78b4]"
//   }
//   return "bg-[#fff3d8] text-[#aa7b11]"
// }

// function PageEyebrow({ children }) {
//   return <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b59a58]">{children}</p>
// }

// function PageTitle({ title, description, actions }) {
//   return (
//     <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
//       <div>
//         <h1 className="text-[30px] font-bold tracking-tight text-[#651d13] sm:text-[44px]">{title}</h1>
//         <p className="mt-2 max-w-[720px] text-sm leading-6 text-[#8d7a68] sm:text-[15px]">{description}</p>
//       </div>
//       {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
//     </div>
//   )
// }

// function StatusPill({ children }) {
//   return (
//     <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClass(children)}`}>
//       {children}
//     </span>
//   )
// }

// function MetricCard({ label, value, note, accent = "red" }) {
//   return (
//     <PortalCard accent={accent} className="p-5">
//       <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a88f7d]">{label}</p>
//       <p className="mt-4 text-[37px] font-bold text-[#541b13]">{value}</p>
//       <p className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${toneClass(note?.toLowerCase().includes("priority") || note?.toLowerCase().includes("needs") ? "red" : "green")}`}>
//         {note}
//       </p>
//     </PortalCard>
//   )
// }

// function ChartCard({ title, children, accent = "red", right }) {
//   return (
//     <PortalCard accent={accent}>
//       <div className="flex items-center justify-between">
//         <p className="text-[22px] font-bold text-[#4f1d14]">{title}</p>
//         {right}
//       </div>
//       {children}
//     </PortalCard>
//   )
// }

// function ResponsiveTable({ headers, rows, renderRow, mobileRender }) {
//   return (
//     <>
//       <div className="hidden overflow-x-auto md:block">
//         <table className="min-w-full border-separate border-spacing-y-3">
//           <thead>
//             <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b09d88]">
//               {headers.map((header) => (
//                 <th key={header} className="pb-1">{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>{rows.map(renderRow)}</tbody>
//         </table>
//       </div>
//       <div className="space-y-3 md:hidden">
//         {rows.map((row, index) => (
//           <div key={index} className="rounded-[10px] border border-[#efe4d6] bg-[#fffdfa] p-4">
//             {mobileRender(row)}
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }

// function FilterBar({ filters, onAction, onSelect }) {
//   return (
//     <div className="grid gap-3 md:grid-cols-[repeat(3,minmax(0,1fr))_160px]">
//       {filters.map((filter) => (
//         <PortalDropdown
//           key={filter}
//           label={filter}
//           align="left"
//           className="w-full"
//           triggerClassName="w-full justify-between text-sm normal-case tracking-normal font-medium"
//           items={[
//             { label: `${filter} option 1`, onClick: () => onSelect?.(`${filter} option 1`) },
//             { label: `${filter} option 2`, onClick: () => onSelect?.(`${filter} option 2`) },
//             { label: `${filter} option 3`, onClick: () => onSelect?.(`${filter} option 3`) },
//           ]}
//         />
//       ))}
//       <PortalButton variant="gold" className="w-full" onClick={onAction}>
//         Apply Filter
//       </PortalButton>
//     </div>
//   )
// }

// function StandardActionModal({ open, onClose, title, description, confirmLabel = "Continue", onConfirm }) {
//   return (
//     <PortalModal open={open} onClose={onClose} title={title} description={description}>
//       <div className="space-y-4">
//         <div className="rounded-[12px] bg-[#faf3ea] p-4 text-sm leading-6 text-[#7f6d5f]">
//           This interaction is working as a frontend flow and is ready to be connected to your backend process.
//         </div>
//         <div className="grid gap-3 sm:grid-cols-2">
//           <PortalButton onClick={onConfirm}>{confirmLabel}</PortalButton>
//           <PortalButton variant="outline" onClick={onClose}>Cancel</PortalButton>
//         </div>
//       </div>
//     </PortalModal>
//   )
// }

// export function AdminDashboardPage() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>LOAM POLY</PageEyebrow>
//         <PageTitle
//           title="Dashboard Overview"
//           description="Institutional performance and application pipeline"
//           actions={
//             <>
//               <PortalButton variant="outline" onClick={() => setModalOpen(true)}>
//                 <Download className="h-4 w-4" />
//                 Export PDF
//               </PortalButton>
//               <PortalButton onClick={() => setToastMessage("New record workspace opened from the dashboard overview.")}>
//                 <Plus className="h-4 w-4" />
//                 New Record
//               </PortalButton>
//             </>
//           }
//         />

//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//           {adminOverviewStats.map((item, index) => (
//             <MetricCard key={item.label} label={item.label} value={item.value} note={item.note} accent={index === 1 ? "gold" : "red"} />
//           ))}
//         </div>

//         <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]">
//           <ChartCard
//             title="Application Trends"
//             right={
//               <div className="flex gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a68e7c]">
//                 <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#75110d]" />Current</span>
//                 <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#d4c7b8]" />Previous</span>
//               </div>
//             }
//           >
//             <div className="mt-6 flex h-[220px] items-end gap-3 rounded-[8px] bg-[#fffdfa] p-4">
//               {[42, 54, 87, 110, 94, 128].map((bar, index) => (
//                 <div key={bar} className="flex flex-1 flex-col items-center justify-end gap-2">
//                   <div className="relative flex h-full w-full items-end justify-center rounded-[4px] bg-[#f4eee6]">
//                     <div className={`w-full rounded-[4px] ${index % 2 === 0 ? "bg-[#e6deda]" : "bg-[#75110d]"}`} style={{ height: `${bar}px` }} />
//                   </div>
//                   <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ad9a86]">{`Q${index + 1}`}</span>
//                 </div>
//               ))}
//             </div>
//           </ChartCard>

//           <ChartCard
//             title="Revenue Summary"
//             accent="gold"
//             right={<span className="rounded-full bg-[#f8f2e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b08a2b]">Current Year</span>}
//           >
//             <div className="mt-8 grid gap-6 sm:grid-cols-2">
//               <div>
//                 <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Tuition Revenue</p>
//                 <p className="mt-2 text-[34px] font-bold text-[#651d13]">N214.8M</p>
//                 <div className="mt-4 h-2 rounded-full bg-[#eee2d7]"><div className="h-2 w-[68%] rounded-full bg-[#75110d]" /></div>
//               </div>
//               <div>
//                 <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Target Achieved</p>
//                 <p className="mt-2 text-[34px] font-bold text-[#651d13]">N90.4M</p>
//                 <div className="mt-4 h-2 rounded-full bg-[#eee2d7]"><div className="h-2 w-[52%] rounded-full bg-[#c7a146]" /></div>
//               </div>
//             </div>
//           </ChartCard>
//         </div>

//         <PortalCard>
//           <div className="flex items-center justify-between">
//             <p className="text-[22px] font-bold text-[#4f1d14]">Recent Institutional Activity</p>
//             <button className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9b1810]" onClick={() => setToastMessage("Ledger archive panel opened successfully.")}>
//               View Ledger Archive
//             </button>
//           </div>
//           <div className="mt-4">
//             <ResponsiveTable
//               headers={["Transaction / Action", "Update Unit", "Status", "Timestamp", "Reference"]}
//               rows={adminActivityRows}
//               renderRow={(row) => (
//                 <tr key={row.reference} className="bg-[#fffdfa] text-sm text-[#5c2418]">
//                   <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row.action}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row.department}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4"><StatusPill>{row.status}</StatusPill></td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row.timestamp}</td>
//                   <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a38e7c]">{row.reference}</td>
//                 </tr>
//               )}
//               mobileRender={(row) => (
//                 <div className="space-y-2">
//                   <p className="text-sm font-semibold text-[#5c2418]">{row.action}</p>
//                   <p className="text-sm text-[#8b7969]">{row.department}</p>
//                   <div className="flex items-center justify-between">
//                     <StatusPill>{row.status}</StatusPill>
//                     <span className="text-[11px] uppercase tracking-[0.12em] text-[#a38e7c]">{row.reference}</span>
//                   </div>
//                 </div>
//               )}
//             />
//           </div>
//         </PortalCard>
//       </div>

//       <StandardActionModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Export Institutional Report"
//         description="Generate a PDF summary of the current dashboard metrics and ledger activity."
//         confirmLabel="Export Report"
//         onConfirm={() => {
//           setModalOpen(false)
//           setToastMessage("Dashboard PDF export queued successfully.")
//         }}
//       />

//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }

// export function AdminCoursesPage() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>Curriculum Management</PageEyebrow>
//         <PageTitle
//           title="The Course Registry"
//           description="A centralized ledger of all academic offerings at LOAMPOLY. Ensure alignment with institutional standards and accreditation."
//           actions={<PortalButton onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" />Add New Course</PortalButton>}
//         />

//         <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_320px]">
//           <PortalCard>
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Active Enrollments</p>
//             <p className="mt-4 text-[48px] font-bold text-[#4f1d14]">14,208</p>
//             <span className="mt-3 inline-flex rounded-full bg-[#f8f2e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b08a2b]">
//               + 12% from last semester
//             </span>
//           </PortalCard>
//           <PortalCard className="bg-[#75110d] text-white before:bg-[#75110d]">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Total Faculties</p>
//             <p className="mt-4 text-[48px] font-bold">12</p>
//             <p className="mt-2 text-sm text-white/70">Accredited Departments</p>
//           </PortalCard>
//         </div>

//         <PortalCard>
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <p className="text-[22px] font-bold text-[#4f1d14]">Department Course List</p>
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
//                 <tr key={row[0]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
//                   <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row[3]}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4"><StatusPill>{row[4]}</StatusPill></td>
//                   <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]">
//                     <button onClick={() => setToastMessage(`Course ${row[0]} opened for review.`)}>View</button>
//                   </td>
//                 </tr>
//               )}
//               mobileRender={(row) => (
//                 <div className="space-y-2">
//                   <p className="text-sm font-semibold text-[#5c2418]">{row[0]} · {row[1]}</p>
//                   <p className="text-sm text-[#8b7969]">{row[2]} · {row[3]} credits</p>
//                   <div className="flex items-center justify-between">
//                     <StatusPill>{row[4]}</StatusPill>
//                     <button className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]" onClick={() => setToastMessage(`Course ${row[0]} opened for review.`)}>View</button>
//                   </div>
//                 </div>
//               )}
//             />
//           </div>
//         </PortalCard>
//       </div>

//       <StandardActionModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Add New Course"
//         description="Create a new academic offering and assign it to the appropriate department."
//         confirmLabel="Create Course"
//         onConfirm={() => {
//           setModalOpen(false)
//           setToastMessage("New course record created in draft mode.")
//         }}
//       />
//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }

// export function AdminApplicationsPage() {
//   const [selectedApplicant, setSelectedApplicant] = useState(null)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>The Prestigious Ledger</PageEyebrow>
//         <PageTitle
//           title="Manage Applications"
//           description="Review and process student admission files for the 2025 academic session."
//           actions={<PortalButton onClick={() => setToastMessage("Application ledger export queued successfully.")}><Download className="h-4 w-4" />Export Ledger</PortalButton>}
//         />

//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//           <MetricCard label="Pending Review" value="1,482" note="+16% increase from last week" />
//           <MetricCard label="Screened" value="342" note="Avg. wait time 4.2 days" accent="gold" />
//           <MetricCard label="Approved Cases" value="891" note="81% acceptance rate" accent="gold" />
//           <MetricCard label="Rejected / Returned" value="249" note="Needs final sorting" />
//         </div>

//         <PortalCard>
//           <div className="mb-4">
//             <FilterBar
//               filters={["All Departments", "All Statuses", "Select Period"]}
//               onAction={() => setToastMessage("Application filters applied to the current queue.")}
//               onSelect={(value) => setToastMessage(`${value} selected.`)}
//             />
//           </div>
//           <ResponsiveTable
//             headers={["Applicant Name", "Application ID", "Department", "Submission Date", "Status", "Actions"]}
//             rows={adminApplicationRows}
//             renderRow={(row) => (
//               <tr key={row[1]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
//                 <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4">{row[3]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4"><StatusPill>{row[4]}</StatusPill></td>
//                 <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4">
//                   <div className="flex gap-2 text-[#9b1810]">
//                     <button onClick={() => setSelectedApplicant(row)}><Eye className="h-4 w-4" /></button>
//                     <button onClick={() => setToastMessage(`Applicant ${row[0]} queued for extended review.`)}><Search className="h-4 w-4" /></button>
//                   </div>
//                 </td>
//               </tr>
//             )}
//             mobileRender={(row) => (
//               <div className="space-y-2">
//                 <p className="text-sm font-semibold text-[#5c2418]">{row[0]}</p>
//                 <p className="text-sm text-[#8b7969]">{row[2]}</p>
//                 <p className="text-[11px] uppercase tracking-[0.12em] text-[#a38e7c]">{row[1]}</p>
//                 <div className="flex items-center justify-between">
//                   <StatusPill>{row[4]}</StatusPill>
//                   <button className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]" onClick={() => setSelectedApplicant(row)}>Review</button>
//                 </div>
//               </div>
//             )}
//           />
//         </PortalCard>

//         <div className="grid gap-5 lg:grid-cols-2">
//           <PortalCard className="bg-[#2e4357] text-white before:bg-[#2e4357]">
//             <p className="text-[22px] font-bold">Institutional Audit</p>
//             <p className="mt-3 text-sm leading-6 text-white/75">
//               System logs indicate high traffic from the computer science department. Review all suspense queue documents before processing is closed.
//             </p>
//             <PortalButton variant="gold" className="mt-5" onClick={() => setToastMessage("Audit logs opened for institutional review.")}>View Audit Logs</PortalButton>
//           </PortalCard>
//           <PortalCard accent="gold">
//             <p className="text-[22px] font-bold text-[#651d13]">Automated Ledger Reports</p>
//             <p className="mt-3 text-sm leading-6 text-[#8b7969]">
//               Trigger archival exports and year-end printable assets for academic accountability.
//             </p>
//             <div className="mt-5 flex gap-3 text-[#9b1810]">
//               <button className="rounded-md border border-[#eadfce] p-3" onClick={() => setToastMessage("Download center opened successfully.")}><Download className="h-4 w-4" /></button>
//               <button className="rounded-md border border-[#eadfce] p-3" onClick={() => setToastMessage("Automation settings opened successfully.")}><Settings2 className="h-4 w-4" /></button>
//             </div>
//           </PortalCard>
//         </div>
//       </div>

//       <PortalModal
//         open={Boolean(selectedApplicant)}
//         onClose={() => setSelectedApplicant(null)}
//         title={selectedApplicant ? `Application Review: ${selectedApplicant[0]}` : "Application Review"}
//         description={selectedApplicant ? `${selectedApplicant[1]} · ${selectedApplicant[2]}` : ""}
//       >
//         <div className="space-y-4">
//           <div className="rounded-[12px] bg-[#faf3ea] p-4 text-sm leading-6 text-[#7f6d5f]">
//             Submission date: {selectedApplicant?.[3]}. Current status: {selectedApplicant?.[4]}.
//           </div>
//           <div className="grid gap-3 sm:grid-cols-2">
//             <PortalButton
//               onClick={() => {
//                 setSelectedApplicant(null)
//                 setToastMessage("Applicant review updated successfully.")
//               }}
//             >
//               Approve Review
//             </PortalButton>
//             <PortalButton variant="outline" onClick={() => setSelectedApplicant(null)}>Close</PortalButton>
//           </div>
//         </div>
//       </PortalModal>
//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }

// export function AdminFacultyPage() {
//   const [activeModal, setActiveModal] = useState(null)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>The Prestigious Ledger</PageEyebrow>
//         <PageTitle
//           title="Faculty & Department Registry"
//           description="Track the structural composition of every faculty, department, and accredited teaching unit in the institution."
//           actions={
//             <>
//               <PortalButton variant="gold" onClick={() => setActiveModal("faculty")}>New Faculty</PortalButton>
//               <PortalButton onClick={() => setActiveModal("department")}><Plus className="h-4 w-4" />Add Department</PortalButton>
//             </>
//           }
//         />

//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//           <MetricCard label="Current Faculties" value="08" note="Institution-wide overview" />
//           <MetricCard label="Registered Departments" value="34" note="Active across faculties" accent="gold" />
//           <MetricCard label="Teaching Staff" value="142" note="Current payroll link" />
//           <MetricCard label="Interim Deans" value="#12" note="Current session appointments" accent="gold" />
//         </div>

//         <PortalCard>
//           <div className="flex items-center justify-between">
//             <p className="text-[22px] font-bold text-[#4f1d14]">Current Faculties</p>
//             <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]">Faculty - Departmental View</div>
//           </div>
//           <div className="mt-5 grid gap-5 xl:grid-cols-2">
//             {adminFacultyCards.map((faculty) => (
//               <div key={faculty.name} className="rounded-[8px] border border-[#efe4d6] bg-[#fffdfa] p-5">
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <div className={`inline-flex rounded-[8px] px-3 py-2 text-sm font-semibold ${faculty.accent === "gold" ? "bg-[#f7efdc] text-[#a77710]" : "bg-[#fbebe7] text-[#9b1810]"}`}>
//                       {faculty.name}
//                     </div>
//                     <p className="mt-4 text-sm leading-6 text-[#7f6d5f]">{faculty.summary}</p>
//                   </div>
//                   <button className="text-[#9b1810]" onClick={() => setToastMessage(`${faculty.name} details opened.`)}><Search className="h-4 w-4" /></button>
//                 </div>
//                 <div className="mt-5 grid gap-3 sm:grid-cols-2">
//                   {faculty.departments.map((department) => (
//                     <div key={department} className="rounded-[6px] border border-[#f0e5d8] bg-[#fff] px-3 py-3 text-sm font-medium text-[#551f16]">
//                       {department}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </PortalCard>
//       </div>

//       <StandardActionModal
//         open={activeModal === "faculty"}
//         onClose={() => setActiveModal(null)}
//         title="Create Faculty"
//         description="Open a new faculty registry entry and assign departments."
//         confirmLabel="Create Faculty"
//         onConfirm={() => {
//           setActiveModal(null)
//           setToastMessage("Faculty draft created successfully.")
//         }}
//       />
//       <StandardActionModal
//         open={activeModal === "department"}
//         onClose={() => setActiveModal(null)}
//         title="Add Department"
//         description="Register a new department under an existing faculty."
//         confirmLabel="Add Department"
//         onConfirm={() => {
//           setActiveModal(null)
//           setToastMessage("Department draft added successfully.")
//         }}
//       />
//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }

// export function AdminStudentsPage() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>Manage Students</PageEyebrow>
//         <PageTitle
//           title="Registry Archives"
//           description="The centralized view of all enrolled and archived student records. Manage student records, status, and year progression through the graduate ledger."
//           actions={
//             <>
//               <PortalButton onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" />Enroll New Student</PortalButton>
//               <PortalButton variant="outline" onClick={() => setToastMessage("Student archive export queued.")}><Download className="h-4 w-4" />Export Archive</PortalButton>
//             </>
//           }
//         />

//         <div className="grid gap-4 md:grid-cols-3">
//           <MetricCard label="Student Population" value="12,482" note="Current active learners" />
//           <MetricCard label="Graduates Archived" value="5,201" note="Records from previous sessions" accent="gold" />
//           <PortalCard className="bg-[#324758] text-white before:bg-[#324758]">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Current Notice</p>
//             <p className="mt-3 text-[24px] font-bold">Final Year Clearance Active</p>
//             <p className="mt-2 text-sm text-white/75">Students are now submitting fee, hostel, and departmental clearance sheets.</p>
//           </PortalCard>
//         </div>

//         <PortalCard>
//           <ResponsiveTable
//             headers={["Student Identity", "Matriculation", "Department", "Level", "Status", "Actions"]}
//             rows={adminStudents}
//             renderRow={(row) => (
//               <tr key={row[1]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
//                 <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4">{row[3]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4"><StatusPill>{row[4]}</StatusPill></td>
//                 <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4 text-[#9b1810]">
//                   <button onClick={() => setToastMessage(`Student record ${row[1]} opened successfully.`)}><Eye className="h-4 w-4" /></button>
//                 </td>
//               </tr>
//             )}
//             mobileRender={(row) => (
//               <div className="space-y-2">
//                 <p className="text-sm font-semibold text-[#5c2418]">{row[0]}</p>
//                 <p className="text-sm text-[#8b7969]">{row[2]} · {row[3]}</p>
//                 <div className="flex items-center justify-between">
//                   <StatusPill>{row[4]}</StatusPill>
//                   <button className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]" onClick={() => setToastMessage(`Student record ${row[1]} opened successfully.`)}>View</button>
//                 </div>
//               </div>
//             )}
//           />
//         </PortalCard>
//       </div>

//       <StandardActionModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Enroll New Student"
//         description="Initialize a new student profile and matriculation draft."
//         confirmLabel="Create Record"
//         onConfirm={() => {
//           setModalOpen(false)
//           setToastMessage("Student enrollment draft created successfully.")
//         }}
//       />
//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }

// export function AdminNewsPage() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>Institutional Communications</PageEyebrow>
//         <PageTitle
//           title="News Management"
//           description="Track and schedule all institutional bulletins, news items, announcements, and faculty notices."
//           actions={<PortalButton onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" />Create News Bulletin</PortalButton>}
//         />

//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.35fr]">
//           <MetricCard label="Published Stories" value="1,284" note="+ 12% this month" />
//           <MetricCard label="Active Announcers" value="14" note="Across all faculties" accent="gold" />
//           <PortalCard className="bg-[linear-gradient(135deg,#7b0f0d,#b32a1d)] text-white before:bg-transparent">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Priority Alert</p>
//             <p className="mt-3 text-[26px] font-bold leading-tight">Emergency Protocol Update: Faculty of Engineering</p>
//           </PortalCard>
//         </div>

//         <PortalCard>
//           <div className="flex items-center justify-between">
//             <p className="text-[22px] font-bold text-[#4f1d14]">Recent Uploads / News</p>
//             <div className="flex gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9b1810]">
//               <button onClick={() => setToastMessage("Faculty filter options opened.")}>Filter by Faculty</button>
//               <button onClick={() => setToastMessage("News list sorted by date.")}>Sort by Date</button>
//             </div>
//           </div>
//           <div className="mt-4 space-y-3">
//             {adminNewsItems.map((item) => (
//               <div key={item[1]} className="flex flex-col gap-4 rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] px-4 py-4 sm:flex-row sm:items-center">
//                 <div className="w-14 rounded-[4px] border border-[#efe4d6] bg-[#faf5ed] px-2 py-2 text-center">
//                   <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ab987f]">{item[0].split(" ")[1]}</p>
//                   <p className="text-[20px] font-bold text-[#5c1a12]">{item[0].split(" ")[0]}</p>
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="text-[15px] font-semibold text-[#4f1d14]">{item[1]}</p>
//                   <p className="text-sm text-[#a18f7d]">{item[2]}</p>
//                 </div>
//                 <div className="flex gap-3 text-[#9b1810]">
//                   <button onClick={() => setToastMessage(`Preview opened for "${item[1]}".`)}><Eye className="h-4 w-4" /></button>
//                   <button onClick={() => setToastMessage(`Editing tools opened for "${item[1]}".`)}><Settings2 className="h-4 w-4" /></button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </PortalCard>
//       </div>

//       <StandardActionModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Create News Bulletin"
//         description="Draft a new institutional update for publication."
//         confirmLabel="Create Bulletin"
//         onConfirm={() => {
//           setModalOpen(false)
//           setToastMessage("News bulletin draft created successfully.")
//         }}
//       />
//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }

// export function AdminPaymentsPage() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>LOAM POLY</PageEyebrow>
//         <PageTitle
//           title="Payment Monitoring"
//           description="Observe live institutional collections, trace failed transactions, and reconcile pending student obligations."
//           actions={
//             <>
//               <PortalButton variant="outline" onClick={() => setToastMessage("Printable ledger copy opened.")}>Print Ledger Copy</PortalButton>
//               <PortalButton onClick={() => setModalOpen(true)}><Download className="h-4 w-4" />Export Ledger</PortalButton>
//             </>
//           }
//         />

//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//           <MetricCard label="Institution Revenue" value="N42.8M" note="Running collection" />
//           <MetricCard label="Receipts Today" value="146" note="At 3 pm" accent="gold" />
//           <MetricCard label="Billed Users" value="12" note="Awaiting action" accent="gold" />
//           <MetricCard label="Disputed Payments" value="03" note="Needs manual review" />
//         </div>

//         <PortalCard>
//           <div className="mb-4">
//             <FilterBar
//               filters={["By Department", "Receipt Type", "Date Range"]}
//               onAction={() => setToastMessage("Payment filters applied successfully.")}
//               onSelect={(value) => setToastMessage(`${value} selected.`)}
//             />
//           </div>
//           <ResponsiveTable
//             headers={["ID", "Student / Payer", "Description", "Amount", "Status"]}
//             rows={adminPaymentRows}
//             renderRow={(row) => (
//               <tr key={row[0]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
//                 <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
//                 <td className="border-y border-[#efe4d6] px-4 py-4 font-semibold">{row[3]}</td>
//                 <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4"><StatusPill>{row[4]}</StatusPill></td>
//               </tr>
//             )}
//             mobileRender={(row) => (
//               <div className="space-y-2">
//                 <p className="text-sm font-semibold text-[#5c2418]">{row[1]}</p>
//                 <p className="text-sm text-[#8b7969]">{row[2]}</p>
//                 <p className="text-lg font-bold text-[#5c2418]">{row[3]}</p>
//                 <StatusPill>{row[4]}</StatusPill>
//               </div>
//             )}
//           />
//         </PortalCard>

//         <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_320px]">
//           <ChartCard title="Revenue Trend" accent="gold">
//             <div className="mt-6 flex h-[220px] items-end gap-4 rounded-[8px] bg-[#fffdfa] p-4">
//               {[70, 95, 88, 120, 104, 138].map((bar, index) => (
//                 <div key={bar} className="flex flex-1 flex-col items-center gap-2">
//                   <div className="relative flex h-full w-full items-end rounded-[4px] bg-[#f4eee6]">
//                     <div className={`w-full rounded-[4px] ${index === 5 ? "bg-[#75110d]" : "bg-[#ebe1d6]"}`} style={{ height: `${bar}px` }} />
//                   </div>
//                   <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ad9a86]">{`M${index + 1}`}</span>
//                 </div>
//               ))}
//             </div>
//           </ChartCard>

//           <PortalCard className="bg-[#283f53] text-white before:bg-[#283f53]">
//             <p className="text-[22px] font-bold">Exception Monitor</p>
//             <ul className="mt-4 space-y-3 text-sm text-white/80">
//               <li>Duplicate transaction flagged in faculty services.</li>
//               <li>Pending verification for receipt batch #9034.</li>
//               <li>Cashless kiosk sync delayed in satellite campus.</li>
//             </ul>
//           </PortalCard>
//         </div>
//       </div>

//       <StandardActionModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Export Payment Ledger"
//         description="Download a ledger report for finance reconciliation and reporting."
//         confirmLabel="Export Ledger"
//         onConfirm={() => {
//           setModalOpen(false)
//           setToastMessage("Payment ledger export queued successfully.")
//         }}
//       />
//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }

// export function AdminAnalyticsPage() {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>The Prestigious Ledger</PageEyebrow>
//         <PageTitle
//           title="The Analytics Ledger"
//           description="Get a visual understanding of institutional trends, revenue health, and campaign performance from the registry intelligence layer."
//           actions={
//             <>
//               <PortalButton onClick={() => setModalOpen(true)}><Download className="h-4 w-4" />Export Report</PortalButton>
//               <PortalButton variant="outline" onClick={() => setToastMessage("Analytics print view opened successfully.")}>FYA Print View</PortalButton>
//             </>
//           }
//         />

//         <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_330px]">
//           <ChartCard
//             title="Enrollment Projections"
//             right={
//               <div className="flex gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a68e7c]">
//                 <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#75110d]" />Undergraduate</span>
//                 <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#d4c7b8]" />Postgraduate</span>
//               </div>
//             }
//           >
//             <div className="mt-6 h-[220px] rounded-[8px] bg-[#fffdfa] p-4">
//               <div className="flex h-full items-end gap-4">
//                 {[45, 56, 72, 90, 104].map((bar) => (
//                   <div key={bar} className="flex flex-1 items-end rounded-[4px] bg-[#f3ede4]">
//                     <div className="w-full rounded-[4px] bg-[#75110d]" style={{ height: `${bar}%` }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </ChartCard>
//           <div className="space-y-5">
//             <PortalCard className="bg-[#8f120d] text-white before:bg-[#8f120d]">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Revenue Delta</p>
//               <p className="mt-3 text-[42px] font-bold">$2.84M</p>
//               <p className="mt-2 text-sm text-white/80">+32.4% above last quarter benchmark</p>
//             </PortalCard>
//             <PortalCard accent="gold">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Internet Uptime</p>
//               <p className="mt-3 text-[44px] font-bold text-[#b08a2b]">92.4%</p>
//               <p className="mt-2 text-sm text-[#8b7969]">Current infrastructure health</p>
//             </PortalCard>
//           </div>
//         </div>

//         <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_280px_280px]">
//           <PortalCard accent="gold">
//             <p className="text-[22px] font-bold text-[#4f1d14]">Faculty Performance Forecast</p>
//             <div className="mt-5 space-y-3">
//               {[
//                 ["Faculty of Engineering", "Strong"],
//                 ["Pure & Applied Sciences", "Stable"],
//                 ["Management Sciences", "Stable"],
//                 ["General Studies", "Watch"],
//               ].map((item) => (
//                 <div key={item[0]} className="flex items-center justify-between rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] px-4 py-3">
//                   <span className="text-sm font-semibold text-[#541b13]">{item[0]}</span>
//                   <StatusPill>{item[1]}</StatusPill>
//                 </div>
//               ))}
//             </div>
//           </PortalCard>

//           <PortalCard accent="gold">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Enrollment Split</p>
//             <div className="mt-8 flex h-[180px] items-center justify-center">
//               <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[16px] border-[#75110d] border-r-[#d9c4b2] border-b-[#d9c4b2]">
//                 <span className="text-[28px] font-bold text-[#651d13]">62%</span>
//               </div>
//             </div>
//           </PortalCard>

//           <PortalCard accent="gold">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Internet Uptime</p>
//             <p className="mt-6 text-[48px] font-bold text-[#b08a2b]">92.4%</p>
//           </PortalCard>
//         </div>

//         <PortalCard>
//           <div className="flex items-center justify-between">
//             <p className="text-[22px] font-bold text-[#4f1d14]">Recent Financials</p>
//             <button className="rounded-full bg-[#fff3d8] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#aa7b11]">
//               Certified
//             </button>
//           </div>
//           <div className="mt-4">
//             <ResponsiveTable
//               headers={["Transaction ID", "Activity / Narration", "Faculty", "Amount"]}
//               rows={adminAnalyticsRows}
//               renderRow={(row) => (
//                 <tr key={row[0]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
//                   <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
//                   <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4 font-semibold">{row[3]}</td>
//                 </tr>
//               )}
//               mobileRender={(row) => (
//                 <div className="space-y-2">
//                   <p className="text-sm font-semibold text-[#5c2418]">{row[0]}</p>
//                   <p className="text-sm text-[#8b7969]">{row[1]}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-[11px] uppercase tracking-[0.12em] text-[#a38e7c]">{row[2]}</span>
//                     <span className="text-sm font-semibold text-[#5c2418]">{row[3]}</span>
//                   </div>
//                 </div>
//               )}
//             />
//           </div>
//         </PortalCard>
//       </div>

//       <StandardActionModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Export Analytics Report"
//         description="Prepare an export of the current analytics ledger view."
//         confirmLabel="Queue Export"
//         onConfirm={() => {
//           setModalOpen(false)
//           setToastMessage("Analytics report export queued successfully.")
//         }}
//       />
//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }

// export function AdminSettingsPage() {
//   const [accessModalOpen, setAccessModalOpen] = useState(false)
//   const [toastMessage, setToastMessage] = useState("")

//   return (
//     <>
//       <div className="space-y-6">
//         <PageEyebrow>The Prestigious Ledger</PageEyebrow>
//         <PageTitle
//           title="System Configurations"
//           description="A supervisory layer of administrative controls, portal readiness, and institutional hierarchy for the current academic cycle."
//           actions={
//             <>
//               <PortalButton variant="gold" onClick={() => setToastMessage("System log export queued successfully.")}>Export System Log</PortalButton>
//               <PortalButton onClick={() => setToastMessage("General settings panel opened successfully.")}>General Settings</PortalButton>
//             </>
//           }
//         />

//         <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_320px]">
//           <PortalCard>
//             <div className="flex items-center justify-between">
//               <p className="text-[22px] font-bold text-[#4f1d14]">Security & Authentication Protocols</p>
//               <PortalButton size="sm" onClick={() => setAccessModalOpen(true)}>Update Access</PortalButton>
//             </div>
//             <div className="mt-5 grid gap-5 md:grid-cols-2">
//               <div className="rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] p-4">
//                 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Current Password Rotation</p>
//                 <p className="mt-3 text-[24px] font-bold text-[#651d13]">14 days</p>
//               </div>
//               <div className="rounded-[6px] border border-[#efe4d6] bg-[#fffdfa] p-4">
//                 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Multi-Factor Protocol</p>
//                 <p className="mt-3 text-[24px] font-bold text-[#651d13]">65%</p>
//                 <div className="mt-4 h-2 rounded-full bg-[#eee2d7]"><div className="h-2 w-[65%] rounded-full bg-[#75110d]" /></div>
//               </div>
//             </div>
//           </PortalCard>

//           <PortalCard accent="gold">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Academic Cycle Management</p>
//             <div className="mt-5 space-y-4">
//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Fall 2024</p>
//                 <p className="mt-2 text-[22px] font-bold text-[#651d13]">Q3</p>
//               </div>
//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Next Review</p>
//                 <p className="mt-2 text-[22px] font-bold text-[#651d13]">January 15, 2026</p>
//               </div>
//             </div>
//           </PortalCard>
//         </div>

//         <PortalCard>
//           <div className="flex items-center justify-between">
//             <p className="text-[22px] font-bold text-[#4f1d14]">Administrative User Hierarchy</p>
//             <button className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9b1810]" onClick={() => setToastMessage("Role matrix opened successfully.")}>
//               Role Matrix
//             </button>
//           </div>
//           <div className="mt-4">
//             <ResponsiveTable
//               headers={["User", "Role", "Location", "Privileges"]}
//               rows={adminSettingsUsers}
//               renderRow={(row) => (
//                 <tr key={row[0]} className="bg-[#fffdfa] text-sm text-[#5c2418]">
//                   <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row[0]}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row[1]}</td>
//                   <td className="border-y border-[#efe4d6] px-4 py-4">{row[2]}</td>
//                   <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4"><StatusPill>{row[3]}</StatusPill></td>
//                 </tr>
//               )}
//               mobileRender={(row) => (
//                 <div className="space-y-2">
//                   <p className="text-sm font-semibold text-[#5c2418]">{row[0]}</p>
//                   <p className="text-sm text-[#8b7969]">{row[1]} · {row[2]}</p>
//                   <StatusPill>{row[3]}</StatusPill>
//                 </div>
//               )}
//             />
//           </div>
//         </PortalCard>

//         <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
//           <PortalCard accent="gold">
//             <p className="text-[22px] font-bold text-[#651d13]">Portal Identity</p>
//             <div className="mt-5 space-y-3 text-sm text-[#7d6b5e]">
//               <p>Brand primary: Maroon</p>
//               <p>Logo status: Active</p>
//               <p>Ledger mode: Institutional</p>
//             </div>
//           </PortalCard>
//           <PortalCard className="bg-[#283f53] text-white before:bg-[#283f53]">
//             <p className="text-[24px] font-bold">Infrastructure Health</p>
//             <p className="mt-3 text-sm leading-6 text-white/75">
//               Monitoring indicates stable performance across core services. Storage and nightly backups are operating within standard safety margins.
//             </p>
//             <div className="mt-5 grid gap-4 sm:grid-cols-3">
//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">CPU</p>
//                 <p className="mt-2 text-[24px] font-bold">17%</p>
//               </div>
//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">Memory</p>
//                 <p className="mt-2 text-[24px] font-bold">39%</p>
//               </div>
//               <div>
//                 <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">Storage</p>
//                 <p className="mt-2 text-[24px] font-bold">84%</p>
//               </div>
//             </div>
//           </PortalCard>
//         </div>
//       </div>

//       <StandardActionModal
//         open={accessModalOpen}
//         onClose={() => setAccessModalOpen(false)}
//         title="Update Access Protocol"
//         description="Adjust administrative permissions and role-linked access policies."
//         confirmLabel="Apply Changes"
//         onConfirm={() => {
//           setAccessModalOpen(false)
//           setToastMessage("Access protocol update queued successfully.")
//         }}
//       />
//       <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
//     </>
//   )
// }
















// AdminDashboardPage.jsx
import { useState } from "react"
import { Download, Plus } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"
import { adminActivityRows, adminOverviewStats } from "../../lib/portal-data"
import {
  PageEyebrow, PageTitle, MetricCard, ChartCard,
  ResponsiveTable, StatusPill, StandardActionModal,
} from "../../components/admin-shared/Shared"

export default function AdminDashboardPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  return (
    <>
      <div className="space-y-6">
        <PageEyebrow>LOAM POLY</PageEyebrow>
        <PageTitle
          title="Dashboard Overview"
          description="Institutional performance and application pipeline"
          actions={
            <>
              <PortalButton variant="outline" onClick={() => setModalOpen(true)}>
                <Download className="h-4 w-4" />
                Export PDF
              </PortalButton>
              <PortalButton onClick={() => setToastMessage("New record workspace opened from the dashboard overview.")}>
                <Plus className="h-4 w-4" />
                New Record
              </PortalButton>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminOverviewStats.map((item, index) => (
            <MetricCard
              key={item.label}
              label={item.label}
              value={item.value}
              note={item.note}
              accent={index === 1 ? "gold" : "red"}
            />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]">
          <ChartCard
            title="Application Trends"
            right={
              <div className="flex gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a68e7c]">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#75110d]" />Current</span>
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#d4c7b8]" />Previous</span>
              </div>
            }
          >
            <div className="mt-6 flex h-[220px] items-end gap-3 rounded-[8px] bg-[#fffdfa] p-4">
              {[42, 54, 87, 110, 94, 128].map((bar, index) => (
                <div key={bar} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div className="relative flex h-full w-full items-end justify-center rounded-[4px] bg-[#f4eee6]">
                    <div
                      className={`w-full rounded-[4px] ${index % 2 === 0 ? "bg-[#e6deda]" : "bg-[#75110d]"}`}
                      style={{ height: `${bar}px` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ad9a86]">{`Q${index + 1}`}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard
            title="Revenue Summary"
            accent="gold"
            right={
              <span className="rounded-full bg-[#f8f2e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b08a2b]">
                Current Year
              </span>
            }
          >
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Tuition Revenue</p>
                <p className="mt-2 text-[34px] font-bold text-[#651d13]">N214.8M</p>
                <div className="mt-4 h-2 rounded-full bg-[#eee2d7]"><div className="h-2 w-[68%] rounded-full bg-[#75110d]" /></div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ab987f]">Target Achieved</p>
                <p className="mt-2 text-[34px] font-bold text-[#651d13]">N90.4M</p>
                <div className="mt-4 h-2 rounded-full bg-[#eee2d7]"><div className="h-2 w-[52%] rounded-full bg-[#c7a146]" /></div>
              </div>
            </div>
          </ChartCard>
        </div>

        <PortalCard>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#4f1d14]">Recent Institutional Activity</p>
            <button
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9b1810]"
              onClick={() => setToastMessage("Ledger archive panel opened successfully.")}
            >
              View Ledger Archive
            </button>
          </div>
          <div className="mt-4">
            <ResponsiveTable
              headers={["Transaction / Action", "Update Unit", "Status", "Timestamp", "Reference"]}
              rows={adminActivityRows}
              renderRow={(row) => (
                <tr key={row.reference} className="bg-[#fffdfa] text-sm text-[#5c2418]">
                  <td className="rounded-l-[6px] border-y border-l border-[#efe4d6] px-4 py-4 font-semibold">{row.action}</td>
                  <td className="border-y border-[#efe4d6] px-4 py-4">{row.department}</td>
                  <td className="border-y border-[#efe4d6] px-4 py-4"><StatusPill>{row.status}</StatusPill></td>
                  <td className="border-y border-[#efe4d6] px-4 py-4">{row.timestamp}</td>
                  <td className="rounded-r-[6px] border-y border-r border-[#efe4d6] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a38e7c]">{row.reference}</td>
                </tr>
              )}
              mobileRender={(row) => (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#5c2418]">{row.action}</p>
                  <p className="text-sm text-[#8b7969]">{row.department}</p>
                  <div className="flex items-center justify-between">
                    <StatusPill>{row.status}</StatusPill>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#a38e7c]">{row.reference}</span>
                  </div>
                </div>
              )}
            />
          </div>
        </PortalCard>
      </div>

      <StandardActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Export Institutional Report"
        description="Generate a PDF summary of the current dashboard metrics and ledger activity."
        confirmLabel="Export Report"
        onConfirm={() => {
          setModalOpen(false)
          setToastMessage("Dashboard PDF export queued successfully.")
        }}
      />
      <PortalToast open={Boolean(toastMessage)} message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  )
}