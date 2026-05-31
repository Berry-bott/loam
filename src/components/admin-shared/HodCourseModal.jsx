import { useState } from "react"
import { BookOpen, LoaderCircle } from "lucide-react"
import { PortalButton } from "../portal/PortalButton"
import { PortalInput } from "../portal/PortalInput"
import { PortalModal } from "../portal/PortalModal"

const DEFAULT_FORM = {
  name: "",
  code: "",
  creditLoad: 3,
  lecturerId: "",
}

function FieldError({ message }) {
  if (!message) return null

  return (
    <p className="mt-1 text-xs font-semibold text-portal-status-danger-text">
      {message}
    </p>
  )
}

export default function HodCourseModal({
  open,
  onClose,
  onSubmit,
  lecturers,
  isSubmitting = false,
}) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = "Course title is required."
    if (!form.code.trim()) nextErrors.code = "Course code is required."
    if (Number(form.creditLoad) < 1) nextErrors.creditLoad = "Credit load must be at least 1."
    if (!form.lecturerId) nextErrors.lecturerId = "Select a lecturer for this course."

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    await onSubmit?.({
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      creditLoad: Number(form.creditLoad) || 3,
      lecturerId: form.lecturerId,
    })
  }

  return (
    <PortalModal
      open={open}
      onClose={isSubmitting ? () => {} : onClose}
      title="Create Department Course"
      description="Register a new course and assign it to one of the lecturers currently available in your department."
      className="max-w-[680px]"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="rounded-[12px] border border-portal-border bg-portal-surface-soft p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-[10px] bg-white p-3 text-portal-brand-soft">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-portal-text-strong">
                Course payload
              </p>
              <p className="mt-1 text-sm leading-6 text-portal-text-muted">
                This form sends `name`, `code`, `creditLoad`, and `lecturerId` to the HOD course endpoint.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <PortalInput
              label="Course Title"
              placeholder="Data Structures and Algorithms"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              disabled={isSubmitting}
            />
            <FieldError message={errors.name} />
          </div>

          <div>
            <PortalInput
              label="Course Code"
              placeholder="CSC 121"
              value={form.code}
              onChange={(event) => updateField("code", event.target.value)}
              disabled={isSubmitting}
            />
            <FieldError message={errors.code} />
          </div>

          <div>
            <PortalInput
              label="Credit Load"
              type="number"
              min="1"
              value={form.creditLoad}
              onChange={(event) => updateField("creditLoad", event.target.value)}
              disabled={isSubmitting}
            />
            <FieldError message={errors.creditLoad} />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-admin-field-label">
            Assigned Lecturer
          </label>
          <select
            className="h-12 w-full rounded-[3px] border border-admin-field-border bg-admin-field-bg px-4 text-sm text-admin-field-text outline-none transition focus:border-admin-field-focus-border focus:ring-2 focus:ring-admin-field-focus-ring"
            value={form.lecturerId}
            onChange={(event) => updateField("lecturerId", event.target.value)}
            disabled={isSubmitting}
          >
            <option value="">Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.lecturerId} />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <PortalButton
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </PortalButton>
          <PortalButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? "Saving" : "Create Course"}
          </PortalButton>
        </div>
      </form>
    </PortalModal>
  )
}
