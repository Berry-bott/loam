



import { useState, useRef, useEffect } from "react"
import { X, Plus, Trash2, Save, CheckCircle, BookOpen } from "lucide-react"

// ─── Constants ────────────────────────────────────────────────────────────────
const LEVEL_OPTIONS = ["ND1", "ND2", "HND1", "HND2"]
const SEMESTER_OPTIONS = ["FIRST SEMESTER", "SECOND SEMESTER", "THIRD SEMESTER"]
const STATUS_OPTIONS = ["CURRENT", "ELECTIVE", "COMPULSORY", "ARCHIVED"]

// ─── Inline Select ────────────────────────────────────────────────────────────
function InlineSelect({ value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[6px] border border-[#e8d9c8] bg-[#fdfaf6] px-3 py-2 pr-7 text-[11px] font-semibold uppercase tracking-[0.1em] text-portal-text focus:border-[#9b1810] focus:outline-none focus:ring-1 focus:ring-[#9b1810]/30 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="#9b7a5a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

// ─── Single course row ────────────────────────────────────────────────────────
function CourseRow({ row, onChange, onDelete }) {
  const isNew = !row.code.trim() && !row.name.trim()

  return (
    <tr className={`group ${isNew ? "opacity-50" : ""}`}>
      <td className="py-2 pr-3">
        <input
          value={row.code}
          onChange={(e) => onChange({ ...row, code: e.target.value.toUpperCase() })}
          placeholder={isNew ? "NEW CODE..." : ""}
          className={`w-full rounded-[6px] border bg-[#fdfaf6] px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-portal-text-strong placeholder:text-[#c5b09a] focus:outline-none focus:ring-1 focus:ring-[#9b1810]/40 ${
            isNew ? "border-dashed border-[#d4bc9a]" : "border-[#e8d9c8] focus:border-[#9b1810]"
          }`}
        />
      </td>
      <td className="py-2 pr-3">
        <input
          value={row.name}
          onChange={(e) => onChange({ ...row, name: e.target.value })}
          placeholder={isNew ? "ENTER NEW COURSE NAME..." : ""}
          className={`w-full rounded-[6px] border bg-[#fdfaf6] px-3 py-2 text-[12px] text-portal-text placeholder:text-[#c5b09a] focus:outline-none focus:ring-1 focus:ring-[#9b1810]/40 ${
            isNew ? "border-dashed border-[#d4bc9a]" : "border-[#e8d9c8] focus:border-[#9b1810]"
          }`}
        />
      </td>
      <td className="py-2 pr-3">
        {isNew ? (
          <div className="rounded-[6px] border border-dashed border-[#d4bc9a] px-3 py-2 text-[11px] text-[#c5b09a]">—</div>
        ) : (
          <InlineSelect value={row.semester} onChange={(v) => onChange({ ...row, semester: v })} options={SEMESTER_OPTIONS} />
        )}
      </td>
      <td className="py-2 pr-3 w-[70px]">
        {isNew ? (
          <div className="rounded-[6px] border border-dashed border-[#d4bc9a] px-3 py-2 text-[11px] text-[#c5b09a]">—</div>
        ) : (
           <input
            type="text"
            inputMode="decimal"
            value={Number(row.units || 0).toFixed(1)}
            onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.]/g, "")
                onChange({
                ...row,
                units: val === "" ? "" : parseFloat(val) || 0,
                })
            }}
            placeholder="3.0"
            className="w-full rounded-[6px] border border-[#e8d9c8] bg-[#fdfaf6] px-3 py-2 text-center text-[12px] font-semibold text-portal-text focus:border-[#9b1810] focus:outline-none focus:ring-1 focus:ring-[#9b1810]/30"
            />
        )}
      </td>
      <td className="py-2 pr-3">
        {isNew ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c5b09a]">INCOMPLETE RECORD</span>
        ) : (
          <InlineSelect value={row.status} onChange={(v) => onChange({ ...row, status: v })} options={STATUS_OPTIONS} />
        )}
      </td>
      <td className="py-2 pl-1">
        {!isNew && (
          <button
            onClick={onDelete}
            className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[#d4bc9a] transition-colors hover:bg-[#fde8e4] hover:text-portal-brand-soft"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </td>
    </tr>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function AcademicProgressionModal({ open, onClose, onSave }) {
  const [department, setDepartment] = useState("")
  const [level, setLevel] = useState("ND2")
  const [courses, setCourses] = useState([
    { id: 1, code: "", name: "", semester: "FIRST SEMESTER", units: 3.0, status: "CURRENT" },
  ])
  const [toast, setToast] = useState(true)
  const [errors, setErrors] = useState({})
  const nextId = useRef(10)

  // Reset state whenever modal opens
  useEffect(() => {
    if (open) {
      setDepartment("")
      setLevel("ND2")
      setCourses([{ id: 1, code: "", name: "", semester: "FIRST SEMESTER", units: 3.0, status: "CURRENT" }])
      setErrors({})
      setToast(true)
    }
  }, [open])

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(false), 4000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const addCourse = () => {
    const id = nextId.current++
    setCourses((prev) => [
      ...prev,
      { id, code: "", name: "", semester: "FIRST SEMESTER", units: 3.0, status: "CURRENT" },
    ])
  }

  const updateCourse = (id, updated) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)))
  }

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id))
  }

  const handleSave = () => {
    const newErrors = {}
    if (!department.trim()) newErrors.department = true
    const validCourses = courses.filter((c) => c.code.trim() && c.name.trim())
    if (validCourses.length === 0) newErrors.courses = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave?.({ department: department.trim(), level, courses: validCourses })
    onClose?.()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[740px] overflow-hidden rounded-[16px] bg-white shadow-2xl shadow-black/30">

        {/* Header */}
        <div className="flex items-center justify-between bg-analytics-series-primary px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-[17px] font-bold text-white">Academic Progression Registry</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                Protocol: Batch Course Curriculum Entry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="bg-[#fdfaf6] px-6 pb-6 pt-5">

          {/* Toast */}
          {toast && (
            <div className="mb-5 flex items-center justify-between rounded-[8px] border border-[#b7e5c0] bg-[#eaf7ec] px-4 py-3 text-[12px] text-[#2f8a44]">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span className="font-medium">System ready. Enter department and select level to begin curriculum entry.</span>
              </div>
              <button onClick={() => setToast(false)} className="ml-3 text-[#2f8a44]/60 hover:text-[#2f8a44]">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Department + Level */}
          <div className="grid grid-cols-2 gap-4">

            {/* Department input */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
                Institutional Department
              </label>
              <div className={`flex items-center gap-2 rounded-[8px] border bg-white px-3 py-2 transition ${
                errors.department
                  ? "border-[#e05a50] ring-1 ring-[#e05a50]/30"
                  : "border-[#e8d9c8] focus-within:border-[#9b1810] focus-within:ring-1 focus-within:ring-[#9b1810]/20"
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5b09a" strokeWidth="1.5" className="shrink-0">
                  <path d="M3 21h18M9 21V7l3-4 3 4v14M9 12h6" />
                </svg>
                <input
                  value={department}
                  onChange={(e) => { setDepartment(e.target.value); setErrors((p) => ({ ...p, department: false })) }}
                  placeholder="e.g. Computer Science"
                  className="w-full bg-transparent text-[13px] font-semibold text-portal-text-strong placeholder:font-normal placeholder:text-[#c5b09a] focus:outline-none"
                />
              </div>
              {errors.department && (
                <p className="mt-1 text-[10px] font-semibold text-[#b81d13]">Department name is required.</p>
              )}
            </div>

            {/* Level dropdown */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
                Academic Level / Section
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5b09a" strokeWidth="1.5">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full appearance-none rounded-[8px] border border-[#e8d9c8] bg-white py-[10px] pl-9 pr-8 text-[13px] font-bold uppercase tracking-[0.1em] text-portal-text-strong focus:border-[#9b1810] focus:outline-none focus:ring-1 focus:ring-[#9b1810]/20 cursor-pointer"
                >
                  {LEVEL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="#9b7a5a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Course entries */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
                Course Entries for {level}
              </p>
              <button
                onClick={addCourse}
                className="flex items-center gap-1.5 rounded-[6px] border border-[#e8d9c8] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#75110d] transition hover:bg-[#fde8e4] hover:border-[#d4a090]"
              >
                <Plus className="h-3 w-3" />
                Add Another Course
              </button>
            </div>

            {errors.courses && (
              <p className="mt-2 text-[11px] font-semibold text-[#b81d13]">At least one complete course entry (code + name) is required.</p>
            )}

            <div className="mt-3 overflow-x-auto">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[110px]" />
                  <col />
                  <col className="w-[160px]" />
                  <col className="w-[70px]" />
                  <col className="w-[130px]" />
                  <col className="w-[36px]" />
                </colgroup>
                <thead>
                  <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-table-head">
                    <th className="pb-2 pr-3">Course Code</th>
                    <th className="pb-2 pr-3">Course Name</th>
                    <th className="pb-2 pr-3">Semester</th>
                    <th className="pb-2 pr-3">Units</th>
                    <th className="pb-2 pr-3">Status</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody>
                  {courses.map((row) => (
                    <CourseRow
                      key={row.id}
                      row={row}
                      onChange={(updated) => updateCourse(row.id, updated)}
                      onDelete={() => deleteCourse(row.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-[8px] border border-[#e8d9c8] bg-white px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-portal-text-muted transition hover:border-[#c9b49a] hover:text-portal-text"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-[8px] bg-analytics-series-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#9b1810] active:scale-[0.98]"
            >
              <Save className="h-3.5 w-3.5" />
              Save Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
