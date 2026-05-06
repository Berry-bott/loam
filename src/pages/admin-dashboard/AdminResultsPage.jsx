import { useState } from "react"
import { AlertCircle, Download, UploadCloud } from "lucide-react"
import { PortalButton } from "../../components/portal/PortalButton"
import { PortalCard } from "../../components/portal/PortalCard"
import { PortalToast } from "../../components/portal/PortalToast"

const departmentOptions = [
  "Software and Web Development",
  "Computer Science",
  "Statistics",
  "Accountancy",
]

const courseOptions = [
  "General Courses - Semester 1",
  "Departmental Courses - Semester 1",
  "General Courses - Semester 2",
]

const levelOptions = ["ND1", "ND2", "HND1", "HND2"]
const semesterOptions = ["First Semester", "Second Semester"]
const gradeOptions = ["A", "B", "C", "D", "E", "F"]

const initialColumnHeaders = [
  "CSC101: Intro to Prog.",
  "SWD105: Web Tech I",
  "GNS101: English",
  "MTH111: Algebra",
  "STA121: Statistics I",
  "GST101: Use of English",
  "COM112: Digital Logic",
]

const studentNames = [
  "ADAMU IBRAHIM BELLO",
  "CHUKWUMA ADAOBI JOY",
  "OLUWASUN DAVID TANNOLA",
  "BASSEY GLORIA ETIM",
  "EMMANUEL EKANEM UDO",
  "VICTORY NWOSU CHIDINMA",
  "KELVIN ANIEKAN FRIDAY",
  "MARYAM ABDULKADIR USMAN",
  "FAVOUR IBEKWE CHIKA",
  "MICHAEL JOHNSON EDET",
  "DAVID ADEBAYO OLALEKAN",
  "PEACE OKON ENO",
  "ESTHER CHIAMAKA ANYA",
  "IBRAHIM YUSUF GARBA",
  "BLESSING OBIAGELI ONU",
  "SAMUEL PRECIOUS BASSEY",
  "GIDEON TOBI ADEYEMI",
  "RACHEL MARY NKIRU",
  "TOSIN DANIEL AKPAN",
  "HAPPINESS EDET EKONG",
]

const initialRows = studentNames.map((student, index) => ({
  sn: String(index + 1).padStart(2, "0"),
  student,
  regNo: `LP/SWD/24/${String(index + 12).padStart(4, "0")}`,
  scores: initialColumnHeaders.map((_, columnIndex) => {
    if (index === 0 && columnIndex === 0) return { score: "78", grade: "A" }
    if (index === 0 && columnIndex === 1) return { score: "82", grade: "A" }
    if (index === 0 && columnIndex === 2) return { score: "74", grade: "B" }
    return { score: "", grade: "" }
  }),
}))

function ResultSelect({ value, onChange, options, className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`h-10 w-full rounded-[4px] border border-admin-field-border bg-white px-3 text-[12px] text-admin-field-text outline-none focus:border-[#c7a98a] focus:ring-2 focus:ring-[#efe0c1] ${className}`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default function AdminResultsPage() {
  const [department, setDepartment] = useState(departmentOptions[0])
  const [courseGroup, setCourseGroup] = useState(courseOptions[0])
  const [level, setLevel] = useState(levelOptions[0])
  const [semester, setSemester] = useState(semesterOptions[0])
  const [columnHeaders, setColumnHeaders] = useState(initialColumnHeaders)
  const [rows, setRows] = useState(initialRows)
  const [toastMessage, setToastMessage] = useState("")

  const handleScoreChange = (rowIndex, columnIndex, key, value) => {
    setRows((current) =>
      current.map((row, currentRowIndex) =>
        currentRowIndex === rowIndex
          ? {
              ...row,
              scores: row.scores.map((entry, currentColumnIndex) =>
                currentColumnIndex === columnIndex
                  ? { ...entry, [key]: value }
                  : entry
              ),
            }
          : row
      )
    )
  }

  const totalRecords = rows.length

  return (
    <>
      <div className="space-y-5">
        <div className="rounded-[8px] border border-[#e5dccf] bg-[#fdfbf7] px-4 py-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-portal-brand-soft">
            Result Management & Upload
          </p>
        </div>

        <div className="space-y-5">
            <PortalCard className="p-0">
              <div className="rounded-[6px] border border-[#ede3d8] bg-portal-surface p-5">
                <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a58d78]">
                  <AlertCircle className="h-4 w-4 text-[#c7a146]" />
                  Academic Context
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a58d78]">
                      Department
                    </label>
                    <ResultSelect
                      value={department}
                      onChange={(event) => setDepartment(event.target.value)}
                      options={departmentOptions}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a58d78]">
                      Course Group
                    </label>
                    <ResultSelect
                      value={courseGroup}
                      onChange={(event) => setCourseGroup(event.target.value)}
                      options={courseOptions}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a58d78]">
                      Level
                    </label>
                    <ResultSelect
                      value={level}
                      onChange={(event) => setLevel(event.target.value)}
                      options={levelOptions}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a58d78]">
                      Semester
                    </label>
                    <ResultSelect
                      value={semester}
                      onChange={(event) => setSemester(event.target.value)}
                      options={semesterOptions}
                    />
                  </div>
                </div>
              </div>
            </PortalCard>

            <PortalCard accent="none" className="border-dashed bg-portal-surface p-0 shadow-none">
              <div className="rounded-[6px] border border-dashed border-[#eadfd2] bg-portal-surface px-5 py-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[10px] border border-[#efe4d8] bg-white shadow-[0_8px_18px_rgba(70,22,13,0.06)]">
                  <UploadCloud className="h-5 w-5 text-portal-brand-soft" />
                </div>
                <p className="mt-5 text-[20px] font-bold text-portal-text-strong">Bulk Upload Results</p>
                <p className="mx-auto mt-2 max-w-[440px] text-[12px] leading-5 text-[#9b8a7d]">
                  Drag and drop your Excel or CSV files here to process scores instantly.
                  Ensure student matric numbers match the ledger exactly.
                </p>
                <PortalButton
                  variant="outline"
                  className="mt-6 border-[#c78379] px-6 text-portal-brand-soft"
                  onClick={() => setToastMessage("File browser opened for bulk result upload.")}
                >
                  Browse Files
                </PortalButton>
              </div>
            </PortalCard>

            <section className="space-y-4">
              <div className="sticky top-[84px] z-40 md:top-[78px] lg:top-[72px]">
                <PortalCard className="relative isolate overflow-visible p-0">
                  <div className="border-b border-[#e7d7c9] bg-portal-surface px-5 pb-4 pt-5 shadow-[0_16px_28px_rgba(72,23,15,0.12)]">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-[18px] font-bold text-[#7c1610]">Manual Entry Ledger</p>
                        <p className="mt-1 text-[10px] italic tracking-[0.03em] text-[#9f8f80]">
                          Direct grid entry enabled. Scroll horizontally to view all courses.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-3 rounded-[6px] border border-[#ecdccf] bg-[#fff8f1] px-3 py-2">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a58d78]">
                            Total Entries
                          </p>
                          <p className="mt-1 text-[24px] font-bold leading-none text-primary">
                            {totalRecords}
                          </p>
                        </div>
                        <div className="h-9 w-px bg-[#eadbcd]" />
                        <PortalButton
                          variant="outline"
                          size="sm"
                          className="border-[#d6c6b3]"
                          onClick={() => setToastMessage("Bulk import action panel opened.")}
                        >
                          Bulk Import
                        </PortalButton>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 pb-4 pt-2">
                    <div className="relative isolate max-h-[560px] overflow-auto rounded-[8px] border border-[#dcc6b5] bg-portal-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_16px_36px_rgba(72,23,15,0.08)]">
                    <table className="min-w-[1540px] border-separate border-spacing-0 text-left">
                      <thead>
                        <tr className="text-[11px] font-semibold text-[#67180f]">
                          <th className="sticky left-0 top-0 z-20 w-[58px] border border-[#63110c] bg-[#7c1610] px-3 py-3 text-white shadow-[2px_0_0_rgba(90,13,8,1),0_1px_0_rgba(99,17,12,1)]">S/N</th>
                          <th className="sticky top-0 z-10 min-w-[232px] border border-[#d3bba8] bg-[#f6ede4] px-3 py-3 shadow-[0_1px_0_rgba(211,187,168,1)]">Student Name</th>
                          <th className="sticky left-[58px] top-0 z-20 min-w-[150px] border border-[#63110c] bg-[#65110c] px-3 py-3 text-white shadow-[3px_0_0_rgba(90,13,8,1),0_1px_0_rgba(99,17,12,1)]">Reg. No.</th>
                          {columnHeaders.map((header) => (
                            <th key={header} colSpan={2} className="sticky top-0 z-10 border border-[#d3bba8] bg-[#f6ede4] px-3 py-3 text-center shadow-[0_1px_0_rgba(211,187,168,1)]">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, rowIndex) => (
                          <tr key={row.regNo} className="text-[11px] text-[#5b2318]">
                            <td className="sticky left-0 z-[5] w-[58px] border border-[#caa693] bg-[#efd8cf] px-3 py-3 font-semibold text-[#67110d] shadow-[2px_0_0_rgba(223,193,179,1)]">
                              {row.sn}
                            </td>
                            <td className="min-w-[232px] border border-[#e8ddd0] bg-white px-3 py-3 font-semibold uppercase">
                              {row.student}
                            </td>
                            <td className="sticky left-[58px] z-[5] min-w-[150px] border border-[#d7baaa] bg-[#fae9e2] px-3 py-3 font-medium text-[#67110d] shadow-[3px_0_0_rgba(223,193,179,1)]">
                              {row.regNo}
                            </td>
                            {row.scores.map((entry, columnIndex) => (
                              <FragmentCell
                                key={`${row.regNo}-${columnIndex}`}
                                score={entry.score}
                                grade={entry.grade}
                                onScoreChange={(value) =>
                                  handleScoreChange(rowIndex, columnIndex, "score", value)
                                }
                                onGradeChange={(value) =>
                                  handleScoreChange(rowIndex, columnIndex, "grade", value)
                                }
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </PortalCard>
              </div>

              <div className="rounded-[10px] border border-[#d9c8bb] bg-portal-surface px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[#a08f80] shadow-[0_12px_32px_rgba(63,20,12,0.06)]">
                <span>Last Synchronized: Just now</span>
              </div>
            </section>
        </div>
      </div>

      <PortalToast
        open={Boolean(toastMessage)}
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />
    </>
  )
}

function FragmentCell({ score, grade, onScoreChange, onGradeChange }) {
  return (
    <>
      <td className="border border-[#e8ddd0] bg-white px-1 py-1.5">
        <input
          value={score}
          onChange={(event) => onScoreChange(event.target.value.replace(/[^\d]/g, ""))}
          placeholder="-"
          className="h-9 w-[56px] rounded-[4px] border border-admin-field-border bg-admin-field-bg px-2 text-[11px] text-admin-field-text outline-none focus:border-[#c7a98a] focus:ring-2 focus:ring-[#efe0c1]"
        />
      </td>
      <td className="border border-[#e8ddd0] bg-white px-1 py-1.5">
        <select
          value={grade}
          onChange={(event) => onGradeChange(event.target.value)}
          className="h-9 w-[54px] rounded-[4px] border border-admin-field-border bg-admin-field-bg px-1 text-[11px] text-admin-field-text outline-none focus:border-[#c7a98a] focus:ring-2 focus:ring-[#efe0c1]"
        >
          <option value="">-</option>
          {gradeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
    </>
  )
}

