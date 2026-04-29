import { Upload } from "lucide-react"
import { Input } from "../../ui/input"
import { examTypeOptions, gradeOptions, jambYearOptions, subjectOptions } from "./admissionsData"

function SectionHeading({ title }) {
  return (
    <div className="mb-6 flex items-center gap-2 rounded-r-xl border-l-4 border-accent bg-accent/5 px-3 py-2">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
    </div>
  )
}

export function PersonalInformationStep({
  form,
  handleChange,
  handleStateChange,
  stateOptions,
  lgaOptions,
}) {
  return (
    <div>
      <SectionHeading title="Personal Details" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">First Name</label>
          <Input
            placeholder="Adebayo"
            value={form.firstName}
            onChange={handleChange("firstName")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Middle Name</label>
          <Input
            placeholder="Oluwaseun"
            value={form.middleName}
            onChange={handleChange("middleName")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Last Name</label>
          <Input
            placeholder="Adeyemi"
            value={form.lastName}
            onChange={handleChange("lastName")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
            Date of Birth (Optional)
          </label>
          <Input type="date" value={form.dateOfBirth} onChange={handleChange("dateOfBirth")} className="rounded-lg" />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Gender</label>
          <select
            value={form.gender}
            onChange={handleChange("gender")}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Email Address</label>
          <Input
            type="email"
            placeholder="example@domain.com"
            value={form.email}
            onChange={handleChange("email")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Phone Number</label>
          <Input
            placeholder="+234 800 000 0000"
            value={form.phone}
            onChange={handleChange("phone")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Nationality</label>
          <select
            value={form.nationality}
            onChange={handleChange("nationality")}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option>Nigeria</option>
            <option>Ghana</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">State of Origin</label>
          <select
            value={form.stateOfOrigin}
            onChange={handleStateChange}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select state</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">LGA</label>
          <select
            value={form.lga}
            onChange={handleChange("lga")}
            disabled={!form.stateOfOrigin}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">{form.stateOfOrigin ? "Select LGA" : "Select state first"}</option>
            {lgaOptions.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Residential Address</label>
          <Input
            placeholder="No. 1, Example Street, City"
            value={form.residentialAddress}
            onChange={handleChange("residentialAddress")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Sponsor Name</label>
          <Input
            placeholder="Full name of sponsor"
            value={form.sponsorName}
            onChange={handleChange("sponsorName")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Sponsor Phone</label>
          <Input
            placeholder="+234 800 000 0000"
            value={form.sponsorPhone}
            onChange={handleChange("sponsorPhone")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Emergency Contact Name</label>
          <Input
            placeholder="Full name of emergency contact"
            value={form.emergencyContactName}
            onChange={handleChange("emergencyContactName")}
            className="rounded-lg"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Emergency Contact Phone</label>
          <Input
            placeholder="+234 800 000 0000"
            value={form.emergencyContactPhone}
            onChange={handleChange("emergencyContactPhone")}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export function AcademicHistoryStep({
  form,
  activeSittings,
  handleChange,
  handleSittingFieldChange,
  handleSittingSubjectChange,
  handleJambChange,
  getAvailableSubjectOptions,
  totalJambScore,
}) {
  return (
    <div>
      <SectionHeading title="Academic History" />

      <div className="rounded-2xl border border-border bg-accent/5 p-4 md:p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
          <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Last School Attended</label>
          <Input
            placeholder="Name of your secondary school"
            value={form.lastSchool}
            onChange={handleChange("lastSchool")}
            className="rounded-lg"
          />
          </div>

          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Number of Sittings</label>
            <select
              value={form.sittingCount}
              onChange={handleChange("sittingCount")}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="1">1 Sitting</option>
              <option value="2">2 Sittings</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`mt-8 grid grid-cols-1 gap-6 ${Number(form.sittingCount) === 2 ? "lg:grid-cols-2" : ""}`}>
        {activeSittings.map((sitting, sittingIndex) => (
          <div
            key={`sitting-${sittingIndex}`}
            className={`rounded-2xl border p-5 lg:p-6 ${
              sittingIndex === 0
                ? "border-accent/30 bg-gradient-to-b from-accent/10 to-background"
                : "border-emerald-200 bg-gradient-to-b from-emerald-50 to-background"
            }`}
          >
            <div className="mb-5">
              <h4 className="font-serif text-lg font-semibold">Sitting {sittingIndex === 0 ? "A" : "B"}</h4>
              <p className="text-xs text-muted-foreground">
                Add exam type, serial number, candidate number, and 9 subjects with grades.
              </p>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Exam Type</label>
                <select
                  value={sitting.examType}
                  onChange={handleSittingFieldChange(sittingIndex, "examType")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select exam</option>
                  {examTypeOptions.map((examType) => (
                    <option key={examType} value={examType}>
                      {examType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Serial Number</label>
                <Input
                  placeholder="Enter serial number"
                  value={sitting.serialNumber}
                  onChange={handleSittingFieldChange(sittingIndex, "serialNumber")}
                  className="rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Candidate Number</label>
                <Input
                  placeholder="Enter candidate number"
                  value={sitting.candidateNumber}
                  onChange={handleSittingFieldChange(sittingIndex, "candidateNumber")}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-3">
              {sitting.subjects.map((subject, subjectIndex) => (
                <div
                  key={`sitting-${sittingIndex}-subject-${subjectIndex}`}
                  className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_160px]"
                >
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                      Subject {subjectIndex + 1}
                    </label>
                    <select
                      value={subject.subject}
                      onChange={handleSittingSubjectChange(sittingIndex, subjectIndex, "subject")}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select subject</option>
                      {getAvailableSubjectOptions(sitting.subjects, subjectIndex).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Grade</label>
                    <select
                      value={subject.grade}
                      onChange={handleSittingSubjectChange(sittingIndex, subjectIndex, "grade")}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select grade</option>
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-accent/20 bg-gradient-to-b from-secondary/30 to-background p-5">
        <div className="mb-5">
          <h4 className="font-serif text-lg font-semibold">JAMB Details</h4>
          <p className="text-xs text-muted-foreground">
            Add registration number, exam year, and 4 subjects. English Language is fixed as the first subject.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Registration Number</label>
            <Input
              placeholder="Enter JAMB registration number"
              value={form.jambRegistrationNumber}
              onChange={handleChange("jambRegistrationNumber")}
              className="rounded-lg"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">JAMB Year</label>
            <select
              value={form.jambYear}
              onChange={handleChange("jambYear")}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select year</option>
              {jambYearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {form.jambSubjects.map((subject, subjectIndex) => (
            <div key={`jamb-${subjectIndex}`} className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                  Subject {subjectIndex + 1}
                </label>
                <select
                  value={subject.subject}
                  onChange={handleJambChange(subjectIndex, "subject")}
                  disabled={subjectIndex === 0}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <option value="">Select subject</option>
                  {getAvailableSubjectOptions(form.jambSubjects, subjectIndex).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Score</label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={subject.score}
                  onChange={handleJambChange(subjectIndex, "score")}
                  className="rounded-lg"
                />
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

export function DocumentUploadStep({ form, handleFile }) {
  return (
    <div>
      <SectionHeading title="Document Upload" />
      <p className="mb-6 text-sm text-muted-foreground">
        Upload clear scans or photos. Accepted formats: PDF, JPG, PNG (max 5MB each).
      </p>

      <div className="flex flex-col gap-5">
        {[
          { label: "Passport Photograph", key: "passport", desc: "Recent white-background passport photo" },
          { label: "WAEC Result (Optional)", key: "waecResult", desc: "Upload WAEC result slip or certificate if available" },
        ].map(({ label, key, desc }) => (
          <div key={key}>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
            <p className="mb-2 text-xs text-muted-foreground">{desc}</p>
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed p-4 transition-colors ${
                form[key] ? "border-accent bg-accent/10" : "border-border bg-secondary/10 hover:border-accent/50"
              }`}
            >
              <Upload className={`h-5 w-5 flex-shrink-0 ${form[key] ? "text-accent" : "text-muted-foreground"}`} />
              <div className="min-w-0 flex-1">
                {form[key] ? (
                  <span className="block truncate text-sm font-medium text-accent">{form[key].name}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                )}
              </div>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFile(key)} />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReviewSubmitStep({
  form,
  activeSittings,
  totalJambScore,
  handleToggleCheckbox,
}) {
  return (
    <div>
      <SectionHeading title="Review & Submit" />
      <p className="mb-6 text-sm text-muted-foreground">
        Please review your information carefully before submitting.
      </p>

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
              <span className="font-medium truncate">{value || <span className="italic text-muted-foreground">-</span>}</span>
            </div>
          ))}
        </div>
      ))}

      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-background/70">
        <div className="bg-gradient-to-r from-accent/10 to-secondary/40 px-4 py-2 text-sm font-semibold">O&apos;Level Sittings</div>
        <div className={`grid grid-cols-1 gap-4 p-4 ${Number(form.sittingCount) === 2 ? "lg:grid-cols-2" : ""}`}>
          {activeSittings.map((sitting, sittingIndex) => (
            <div
              key={`review-sitting-${sittingIndex}`}
              className={`rounded-xl border p-4 ${
                sittingIndex === 0
                  ? "border-accent/30 bg-accent/5"
                  : "border-emerald-200 bg-emerald-50/60"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold">Sitting {sittingIndex === 0 ? "A" : "B"}</h4>
                <span className="text-xs text-muted-foreground">{sitting.examType || "Exam type not set"}</span>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Serial Number</p>
                  <p className="font-medium">{sitting.serialNumber || "Not provided"}</p>
                </div>
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
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={form.attestationAccepted}
            onChange={handleToggleCheckbox("attestationAccepted")}
            className="mt-1 h-4 w-4 rounded border-amber-300 text-amber-700 focus:ring-amber-500"
          />
          <span>I attest that all the information provided in this application is accurate and complete.</span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={form.activationAccepted}
            onChange={handleToggleCheckbox("activationAccepted")}
            className="mt-1 h-4 w-4 rounded border-amber-300 text-amber-700 focus:ring-amber-500"
          />
          <span>I authorize the school to process this application and contact my sponsor or emergency contact if needed.</span>
        </label>
      </div>
    </div>
  )
}
