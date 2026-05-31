import { useEffect, useState } from "react"
import { X, Save, CheckCircle, BookOpen, LoaderCircle } from "lucide-react"

const DEFAULT_FORM = {
  name: "",
  code: "",
  creditLoad: 3,
  lecturerId: "",
}

export default function AcademicProgressionModal({
  open,
  onClose,
  onSave,
  lecturers = [],
  isSubmitting = false,
}) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [toast, setToast] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!open) return

    setForm(DEFAULT_FORM)
    setErrors({})
    setToast(true)
  }, [open])

  useEffect(() => {
    if (!toast) return undefined

    const timeoutId = setTimeout(() => setToast(false), 4000)
    return () => clearTimeout(timeoutId)
  }, [toast])

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: false }))
  }

  const handleSave = async () => {
    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = true
    if (!form.code.trim()) nextErrors.code = true
    if (Number(form.creditLoad) < 1) nextErrors.creditLoad = true
    if (!form.lecturerId) nextErrors.lecturerId = true

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    await onSave?.({
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      creditLoad: Number(form.creditLoad),
      lecturerId: form.lecturerId,
    })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={isSubmitting ? undefined : onClose} />

      <div className="relative z-10 w-full max-w-[740px] overflow-hidden rounded-[16px] bg-white shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between bg-analytics-series-primary px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-[17px] font-bold text-white">Academic Progression Registry</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                Protocol: Department Course Assignment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-stone-50 px-6 pb-6 pt-5">
          {toast ? (
            <div className="mb-5 flex items-center justify-between rounded-[8px] border border-green-200 bg-portal-status-success-bg px-4 py-3 text-[12px] text-portal-status-success-text">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span className="font-medium">System ready. Enter the course details and assign a lecturer to continue.</span>
              </div>
              <button onClick={() => setToast(false)} className="ml-3 text-portal-status-success-text/60 hover:text-portal-status-success-text">
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
                Course Title
              </label>
              <div className={`flex items-center gap-2 rounded-[8px] border bg-white px-3 py-2 transition ${
                errors.name
                  ? "border-red-400 ring-1 ring-red-400/30"
                  : "border-stone-200 focus-within:border-admin-registry-chip-text focus-within:ring-1 focus-within:ring-admin-registry-chip-text/20"
              }`}>
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="e.g. Data Structures and Algorithms"
                  className="w-full bg-transparent text-[13px] font-semibold text-portal-text-strong placeholder:font-normal placeholder:text-stone-300 focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.name ? (
                <p className="mt-1 text-[10px] font-semibold text-portal-status-danger-text">Course title is required.</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
                Course Code
              </label>
              <div className={`flex items-center gap-2 rounded-[8px] border bg-white px-3 py-2 transition ${
                errors.code
                  ? "border-red-400 ring-1 ring-red-400/30"
                  : "border-stone-200 focus-within:border-admin-registry-chip-text focus-within:ring-1 focus-within:ring-admin-registry-chip-text/20"
              }`}>
                <input
                  value={form.code}
                  onChange={(event) => updateField("code", event.target.value)}
                  placeholder="e.g. CSC 121"
                  className="w-full bg-transparent text-[13px] font-semibold uppercase text-portal-text-strong placeholder:font-normal placeholder:text-stone-300 focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.code ? (
                <p className="mt-1 text-[10px] font-semibold text-portal-status-danger-text">Course code is required.</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
                Credit Load
              </label>
              <div className={`flex items-center gap-2 rounded-[8px] border bg-white px-3 py-2 transition ${
                errors.creditLoad
                  ? "border-red-400 ring-1 ring-red-400/30"
                  : "border-stone-200 focus-within:border-admin-registry-chip-text focus-within:ring-1 focus-within:ring-admin-registry-chip-text/20"
              }`}>
                <input
                  type="number"
                  min="1"
                  value={form.creditLoad}
                  onChange={(event) => updateField("creditLoad", event.target.value)}
                  className="w-full bg-transparent text-[13px] font-semibold text-portal-text-strong placeholder:font-normal placeholder:text-stone-300 focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.creditLoad ? (
                <p className="mt-1 text-[10px] font-semibold text-portal-status-danger-text">Credit load must be at least 1.</p>
              ) : null}
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-shared-eyebrow">
              Assigned Lecturer
            </label>
            <div className={`relative rounded-[8px] border bg-white transition ${
              errors.lecturerId
                ? "border-red-400 ring-1 ring-red-400/30"
                : "border-stone-200 focus-within:border-admin-registry-chip-text focus-within:ring-1 focus-within:ring-admin-registry-chip-text/20"
            }`}>
              <select
                value={form.lecturerId}
                onChange={(event) => updateField("lecturerId", event.target.value)}
                className="w-full appearance-none bg-transparent px-3 py-[11px] text-[13px] font-semibold text-portal-text-strong focus:outline-none"
                disabled={isSubmitting}
              >
                <option value="">Select a lecturer</option>
                {lecturers.map((lecturer) => (
                  <option key={lecturer.id} value={lecturer.id}>
                    {lecturer.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-amber-700">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            {errors.lecturerId ? (
              <p className="mt-1 text-[10px] font-semibold text-portal-status-danger-text">Select a lecturer before saving.</p>
            ) : null}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-[8px] border border-stone-200 bg-white px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-portal-text-muted transition hover:border-stone-300 hover:text-portal-text disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-[8px] bg-analytics-series-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-admin-registry-chip-text active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              {isSubmitting ? "Saving Course" : "Save Course"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
