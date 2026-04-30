

import { useState, useRef, useEffect } from "react"
import { Upload, ChevronDown } from "lucide-react";
import { Input } from "../../ui/input"
import { examTypeOptions, gradeOptions, jambYearOptions } from "./admissionsData"

// ─── Shared Helpers ────────────────────────────────────────────────────────

function SectionHeading({ title }) {
  return (
    <div className="mb-6 flex items-center gap-2 rounded-r-xl border-l-4 border-accent bg-accent/5 px-3 py-2">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
    </div>
  )
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

function errBorder(hasError) {
  return hasError ? "border-red-400 focus:ring-red-300" : ""
}

// ─── Custom Dropdown ───────────────────────────────────────────────────────

// function CustomSelect({ value, onChange, options, placeholder = "Select", error, disabled = false }) {
//   const [open, setOpen] = useState(false)

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => !disabled && setOpen((prev) => !prev)}
//         className={`flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${
//           error ? "border-red-400 focus:ring-red-300" : "border-input"
//         } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
//       >
//         <span className={value ? "text-foreground" : "text-muted-foreground"}>
//           {value || placeholder}
//         </span>
//         <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
//       </button>

//       {open && !disabled && (
//         <>
//           <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
//           <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-input bg-background shadow-lg">
//             <li
//               onClick={() => { onChange(""); setOpen(false) }}
//               className="cursor-pointer px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
//             >
//               {placeholder}
//             </li>
//             {options.map((option) => (
//               <li
//                 key={option}
//                 onClick={() => { onChange(option); setOpen(false) }}
//                 className={`cursor-pointer px-3 py-2 text-sm hover:bg-muted ${
//                   value === String(option) ? "bg-accent/10 font-medium text-accent" : ""
//                 }`}
//               >
//                 {option}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   )
// }
function CustomSelect({ value, onChange, options, placeholder = "Select", error, disabled = false }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring ${
          error ? "border-red-400 focus:ring-red-300" : "border-input"
        } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {open && !disabled && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-input bg-background shadow-lg">
          <li
            onClick={() => { onChange(""); setOpen(false) }}
            className="cursor-pointer px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            {placeholder}
          </li>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => { onChange(option); setOpen(false) }}
              className={`cursor-pointer px-3 py-2 text-sm hover:bg-muted ${
                value === String(option) ? "bg-accent/10 font-medium text-accent" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Step 1: Personal Information ─────────────────────────────────────────

export function PersonalInformationStep({
  form,
  handleChange,
  handleStateChange,
  stateOptions,
  lgaOptions,
  errors = {},
}) {
  return (
    <div>
      <SectionHeading title="Personal Details" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">First Name</label>
          <Input placeholder="e.g Esther" value={form.firstName} onChange={handleChange("firstName")} className={`rounded-lg ${errBorder(errors.firstName)}`} />
          <FieldError message={errors.firstName} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Middle Name</label>
          <Input placeholder="e.g Thomas" value={form.middleName} onChange={handleChange("middleName")} className="rounded-lg" />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Last Name</label>
          <Input placeholder="e.g Udo" value={form.lastName} onChange={handleChange("lastName")} className={`rounded-lg ${errBorder(errors.lastName)}`} />
          <FieldError message={errors.lastName} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Date of Birth (Optional)</label>
          <Input type="date" value={form.dateOfBirth} onChange={handleChange("dateOfBirth")} className="rounded-lg" />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Gender</label>
          <CustomSelect
            value={form.gender}
            onChange={(val) => handleChange("gender")({ target: { value: val } })}
            options={["Male", "Female", "Others"]}
            placeholder="Select"
            error={errors.gender}
          />
          <FieldError message={errors.gender} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Marital Status</label>
          <CustomSelect
            value={form.maritalStatus}
            onChange={(val) => handleChange("maritalStatus")({ target: { value: val } })}
            options={["Single", "Married", "Divorced", "Widowed"]}
            placeholder="Select"
            error={errors.maritalStatus}
          />
          <FieldError message={errors.maritalStatus} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Email Address</label>
          <Input type="email" placeholder="example@domain.com" value={form.email} onChange={handleChange("email")} className={`rounded-lg ${errBorder(errors.email)}`} />
          <FieldError message={errors.email} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Phone Number</label>
          <Input placeholder="08000000000" value={form.phone} onChange={handleChange("phone")} className={`rounded-lg ${errBorder(errors.phone)}`} />
          <FieldError message={errors.phone} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Nationality</label>
          <CustomSelect
            value={form.nationality}
            onChange={(val) => handleChange("nationality")({ target: { value: val } })}
            options={["Nigeria", "Ghana", "Other"]}
            placeholder="Select nationality"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">State of Origin</label>
          <CustomSelect
            value={form.stateOfOrigin}
            onChange={(val) => handleStateChange({ target: { value: val } })}
            options={stateOptions}
            placeholder="Select state"
            error={errors.stateOfOrigin}
          />
          <FieldError message={errors.stateOfOrigin} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">LGA</label>
          <CustomSelect
            value={form.lga}
            onChange={(val) => handleChange("lga")({ target: { value: val } })}
            options={lgaOptions}
            placeholder={form.stateOfOrigin ? "Select LGA" : "Select state first"}
            error={errors.lga}
            disabled={!form.stateOfOrigin}
          />
          <FieldError message={errors.lga} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Residential Address</label>
          <Input placeholder="No. 1, Example Street, City" value={form.residentialAddress} onChange={handleChange("residentialAddress")} className={`rounded-lg ${errBorder(errors.residentialAddress)}`} />
          <FieldError message={errors.residentialAddress} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Sponsor Name</label>
          <Input placeholder="Full name of sponsor" value={form.sponsorName} onChange={handleChange("sponsorName")} className={`rounded-lg ${errBorder(errors.sponsorName)}`} />
          <FieldError message={errors.sponsorName} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Sponsor Phone</label>
          <Input placeholder="08000000000" value={form.sponsorPhone} onChange={handleChange("sponsorPhone")} className={`rounded-lg ${errBorder(errors.sponsorPhone)}`} />
          <FieldError message={errors.sponsorPhone} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Emergency Contact Name</label>
          <Input placeholder="Full name of emergency contact" value={form.emergencyContactName} onChange={handleChange("emergencyContactName")} className={`rounded-lg ${errBorder(errors.emergencyContactName)}`} />
          <FieldError message={errors.emergencyContactName} />
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Emergency Contact Phone</label>
          <Input placeholder="08000000000" value={form.emergencyContactPhone} onChange={handleChange("emergencyContactPhone")} className={`rounded-lg ${errBorder(errors.emergencyContactPhone)}`} />
          <FieldError message={errors.emergencyContactPhone} />
        </div>

      </div>
    </div>
  )
}

// ─── Step 2: Academic History ──────────────────────────────────────────────

export function AcademicHistoryStep({
  form,
  activeSittings,
  handleChange,
  handleSittingFieldChange,
  handleSittingSubjectChange,
  handleJambChange,
  getAvailableSubjectOptions,
  totalJambScore,
  errors = {},
}) {
  return (
    <div>
      <SectionHeading title="Academic History" />

      <div className="rounded-2xl border border-border bg-accent/5 p-4 md:p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Last School Attended</label>
            <Input placeholder="Name of your secondary school" value={form.lastSchool} onChange={handleChange("lastSchool")} className={`rounded-lg ${errBorder(errors.lastSchool)}`} />
            <FieldError message={errors.lastSchool} />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Number of Sittings</label>
            <CustomSelect
              value={form.sittingCount}
              onChange={(val) => handleChange("sittingCount")({ target: { value: val } })}
              options={["1", "2"]}
              placeholder="Select"
            />
          </div>
        </div>
      </div>

      <div className={`mt-8 grid grid-cols-1 gap-6 ${Number(form.sittingCount) === 2 ? "lg:grid-cols-2" : ""}`}>
        {activeSittings.map((sitting, sittingIndex) => (
          <div
            key={`sitting-${sittingIndex}`}
            className={`rounded-2xl border p-5 lg:p-6 ${sittingIndex === 0 ? "border-accent/30 bg-gradient-to-b from-accent/10 to-background" : "border-emerald-200 bg-gradient-to-b from-emerald-50 to-background"}`}
          >
            <div className="mb-5">
              <h4 className="font-serif text-lg font-semibold">Sitting {sittingIndex === 0 ? "A" : "B"}</h4>
              <p className="text-xs text-muted-foreground">Add exam type, candidate number, and 9 subjects with grades.</p>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Exam Type</label>
                <CustomSelect
                  value={sitting.examType}
                  onChange={(val) => handleSittingFieldChange(sittingIndex, "examType")({ target: { value: val } })}
                  options={examTypeOptions}
                  placeholder="Select exam"
                  error={errors[`sitting_${sittingIndex}_examType`]}
                />
                <FieldError message={errors[`sitting_${sittingIndex}_examType`]} />
              </div>

              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Exams Year</label>
                <CustomSelect
                  value={sitting.examYear}
                  onChange={(val) => handleSittingFieldChange(sittingIndex, "examYear")({ target: { value: val } })}
                  options={jambYearOptions.map(String)}
                  placeholder="Select year"
                  error={errors[`sitting_${sittingIndex}_examYear`]}
                />
                <FieldError message={errors[`sitting_${sittingIndex}_examYear`]} />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Candidate Number</label>
                <Input placeholder="Exams Registration Number" value={sitting.candidateNumber} onChange={handleSittingFieldChange(sittingIndex, "candidateNumber")} className={`rounded-lg ${errBorder(errors[`sitting_${sittingIndex}_candidateNumber`])}`} />
                <FieldError message={errors[`sitting_${sittingIndex}_candidateNumber`]} />
              </div>
            </div>

            <div className="space-y-3">
              {sitting.subjects.map((subject, subjectIndex) => (
                <div key={`sitting-${sittingIndex}-subject-${subjectIndex}`} className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_160px]">
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Subject {subjectIndex + 1}</label>
                    <CustomSelect
                      value={subject.subject}
                      onChange={(val) => handleSittingSubjectChange(sittingIndex, subjectIndex, "subject")({ target: { value: val } })}
                      options={getAvailableSubjectOptions(sitting.subjects, subjectIndex)}
                      placeholder="Select subject"
                      error={errors[`sitting_${sittingIndex}_subject_${subjectIndex}`]}
                    />
                    <FieldError message={errors[`sitting_${sittingIndex}_subject_${subjectIndex}`]} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Grade</label>
                    <CustomSelect
                      value={subject.grade}
                      onChange={(val) => handleSittingSubjectChange(sittingIndex, subjectIndex, "grade")({ target: { value: val } })}
                      options={gradeOptions}
                      placeholder="Select grade"
                      error={errors[`sitting_${sittingIndex}_grade_${subjectIndex}`]}
                    />
                    <FieldError message={errors[`sitting_${sittingIndex}_grade_${subjectIndex}`]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* JAMB Details */}
      <div className="mt-8 rounded-2xl border border-accent/20 bg-gradient-to-b from-secondary/30 to-background p-5">
        <div className="mb-5">
          <h4 className="font-serif text-lg font-semibold">JAMB Details</h4>
          <p className="text-xs text-muted-foreground">Add registration number, exam year, and 4 subjects. English Language is fixed as the first subject.</p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Registration Number</label>
            <Input placeholder="Enter JAMB registration number" value={form.jambRegistrationNumber} onChange={handleChange("jambRegistrationNumber")} className={`rounded-lg ${errBorder(errors.jambRegistrationNumber)}`} />
            <FieldError message={errors.jambRegistrationNumber} />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">JAMB Year</label>
            <CustomSelect
              value={form.jambYear}
              onChange={(val) => handleChange("jambYear")({ target: { value: val } })}
              options={jambYearOptions.map(String)}
              placeholder="Select year"
              error={errors.jambYear}
            />
            <FieldError message={errors.jambYear} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {form.jambSubjects.map((subject, subjectIndex) => (
            <div key={`jamb-${subjectIndex}`} className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Subject {subjectIndex + 1}</label>
                <CustomSelect
                  value={subject.subject}
                  onChange={(val) => handleJambChange(subjectIndex, "subject")({ target: { value: val } })}
                  options={getAvailableSubjectOptions(form.jambSubjects, subjectIndex)}
                  placeholder="Select subject"
                  error={errors[`jambSubject_${subjectIndex}`]}
                  disabled={subjectIndex === 0}
                />
                <FieldError message={errors[`jambSubject_${subjectIndex}`]} />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Score</label>
                <Input type="number" min="0" placeholder="0" value={subject.score} onChange={handleJambChange(subjectIndex, "score")} className={`rounded-lg ${errBorder(errors[`jambScore_${subjectIndex}`])}`} />
                <FieldError message={errors[`jambScore_${subjectIndex}`]} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">Total JAMB Score</span>
            <span className="text-lg font-semibold text-foreground">{totalJambScore}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Document Upload ───────────────────────────────────────────────

export function DocumentUploadStep({ form, handleFile, errors = {} }) {
  return (
    <div>
      <SectionHeading title="Document Upload" />
      <p className="mb-6 text-sm text-muted-foreground">Upload clear scans or photos. Accepted formats: PDF, JPG, PNG (max 5MB each).</p>

      <div className="flex flex-col gap-5">
        {[
          { label: "Passport Photograph", key: "passport", desc: "Recent white-background passport photo" },
          { label: "WAEC Result (Optional)", key: "waecResult", desc: "Upload WAEC result slip or certificate if available" },
        ].map(({ label, key, desc }) => (
          <div key={key}>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
            <p className="mb-2 text-xs text-muted-foreground">{desc}</p>
            <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed p-4 transition-colors ${
              form[key] ? "border-accent bg-accent/10" : errors[key] ? "border-red-400 bg-red-50" : "border-border bg-secondary/10 hover:border-accent/50"
            }`}>
              <Upload className={`h-5 w-5 shrink-0 ${form[key] ? "text-accent" : errors[key] ? "text-red-400" : "text-muted-foreground"}`} />
              <div className="min-w-0 flex-1">
                {form[key] ? (
                  <span className="block truncate text-sm font-medium text-accent">{form[key].name}</span>
                ) : (
                  <span className={`text-sm ${errors[key] ? "text-red-400" : "text-muted-foreground"}`}>
                    Click to upload or drag and drop
                  </span>
                )}
              </div>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFile(key)} />
            </label>
            <FieldError message={errors[key]} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Step 4: Review & Submit ───────────────────────────────────────────────

export function ReviewSubmitStep({ form, activeSittings, totalJambScore, handleToggleCheckbox, errors = {} }) {
  return (
    <div>
      <SectionHeading title="Review & Submit" />
      <p className="mb-6 text-sm text-muted-foreground">Please review your information carefully before submitting.</p>

      {[
        {
          title: "Personal Information",
          rows: [
            ["Full Name", [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ")],
            ["Date of Birth", form.dateOfBirth || "Optional"],
            ["Gender", form.gender],
            ["Email", form.email],
            ["Phone", form.phone],
            ["Nationality", form.nationality],
            ["State / LGA", `${form.stateOfOrigin} / ${form.lga}`],
            ["Sponsor", form.sponsorName],
            ["Sponsor Phone", form.sponsorPhone],
            ["Emergency Contact", form.emergencyContactName],
            ["Emergency Phone", form.emergencyContactPhone],
          ],
        },
        {
          title: "Academic History",
          rows: [
            ["Last School", form.lastSchool],
            ["Number of Sittings", form.sittingCount],
            ["JAMB Registration Number", form.jambRegistrationNumber],
            ["JAMB Year", form.jambYear],
            ["JAMB Total Score", String(totalJambScore)],
          ],
        },
        {
          title: "Documents",
          rows: [
            ["Passport", form.passport?.name ?? "Not uploaded"],
            ["WAEC Result", form.waecResult?.name ?? "Optional"],
          ],
        },
      ].map((section) => (
        <div key={section.title} className="mb-6 overflow-hidden rounded-xl border border-border bg-background/70">
          <div className="bg-gradient-to-r from-accent/10 to-secondary/40 px-4 py-2 text-sm font-semibold">{section.title}</div>
          {section.rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-2 border-t border-border px-4 py-2 text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="truncate font-medium">{value || <span className="italic text-muted-foreground">-</span>}</span>
            </div>
          ))}
        </div>
      ))}

      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-background/70">
        <div className="bg-gradient-to-r from-accent/10 to-secondary/40 px-4 py-2 text-sm font-semibold">O&apos;Level Sittings</div>
        <div className={`grid grid-cols-1 gap-4 p-4 ${Number(form.sittingCount) === 2 ? "lg:grid-cols-2" : ""}`}>
          {activeSittings.map((sitting, sittingIndex) => (
            <div key={`review-sitting-${sittingIndex}`} className={`rounded-xl border p-4 ${sittingIndex === 0 ? "border-accent/30 bg-accent/5" : "border-emerald-200 bg-emerald-50/60"}`}>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold">Sitting {sittingIndex === 0 ? "A" : "B"}</h4>
                <span className="text-xs text-muted-foreground">{sitting.examType || "Exam type not set"}</span>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Candidate Number</p>
                  <p className="font-medium">{sitting.candidateNumber || "Not provided"}</p>
                </div>
              </div>
              <div className="space-y-2">
                {sitting.subjects.map((subject, subjectIndex) => (
                  <div key={`review-sitting-${sittingIndex}-subject-${subjectIndex}`} className="grid grid-cols-[minmax(0,1fr)_80px] gap-3 text-sm">
                    <span className="truncate">{subject.subject || `Subject ${subjectIndex + 1}`}</span>
                    <span className="font-medium">{subject.grade || "-"}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-background/70">
        <div className="bg-gradient-to-r from-accent/10 to-secondary/40 px-4 py-2 text-sm font-semibold">JAMB Details</div>
        <div className="space-y-2 p-4">
          <div className="grid grid-cols-2 gap-3 border-b border-border pb-3 text-sm">
            <span className="text-muted-foreground">Registration Number</span>
            <span className="font-medium">{form.jambRegistrationNumber || "Not provided"}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 border-b border-border pb-3 text-sm">
            <span className="text-muted-foreground">Year</span>
            <span className="font-medium">{form.jambYear || "Not provided"}</span>
          </div>
          {form.jambSubjects.map((subject, subjectIndex) => (
            <div key={`review-jamb-${subjectIndex}`} className="grid grid-cols-[minmax(0,1fr)_80px] gap-3 text-sm">
              <span className="truncate">{subject.subject || `Subject ${subjectIndex + 1}`}</span>
              <span className="font-medium">{subject.score || "-"}</span>
            </div>
          ))}
          <div className="grid grid-cols-[minmax(0,1fr)_80px] gap-3 border-t border-border pt-3 text-sm">
            <span className="font-semibold">Total Score</span>
            <span className="font-semibold">{totalJambScore}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <div>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={form.attestationAccepted} onChange={handleToggleCheckbox("attestationAccepted")} className="mt-1 h-4 w-4 rounded border-amber-300 text-amber-700 focus:ring-amber-500" />
            <span>I attest that all the information provided in this application is accurate and complete.</span>
          </label>
          <FieldError message={errors.attestationAccepted} />
        </div>
        <div>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={form.activationAccepted} onChange={handleToggleCheckbox("activationAccepted")} className="mt-1 h-4 w-4 rounded border-amber-300 text-amber-700 focus:ring-amber-500" />
            <span>I authorize the school to process this application and contact my sponsor or emergency contact if needed.</span>
          </label>
          <FieldError message={errors.activationAccepted} />
        </div>
      </div>
    </div>
  )
}