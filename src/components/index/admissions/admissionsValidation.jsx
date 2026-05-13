export function validateStep1(form) {
  const errors = {}
  const isNigerian = form.nationality === "Nigerian"
  if (!form.firstName?.trim()) errors.firstName = "First name is required"
  if (!form.lastName?.trim()) errors.lastName = "Last name is required"
  if (!form.dateOfBirth) errors.dateOfBirth = "Date of birth is required"
  if (!form.gender) errors.gender = "Gender is required"
  if (!form.maritalStatus) errors.maritalStatus = "Marital status is required"
  if (!form.email?.trim()) errors.email = "Email address is required"
  if (!form.phone?.trim()) errors.phone = "Phone number is required"
  if (!form.stateOfOrigin?.trim()) errors.stateOfOrigin = isNigerian ? "State of origin is required" : "State / province is required"
  if (!form.lga?.trim()) errors.lga = isNigerian ? "LGA is required" : "City / region is required"
  if (!form.residentialAddress?.trim()) errors.residentialAddress = "Residential address is required"
  if (!form.sponsorName?.trim()) errors.sponsorName = "Sponsor name is required"
  if (!form.sponsorPhone?.trim()) errors.sponsorPhone = "Sponsor phone is required"
  if (!form.emergencyContactName?.trim()) errors.emergencyContactName = "Emergency contact name is required"
  if (!form.emergencyContactPhone?.trim()) errors.emergencyContactPhone = "Emergency contact phone is required"
  return errors
}

export function validateStep2(form, activeSittings) {
  const errors = {}
  if (!form.lastSchool?.trim()) errors.lastSchool = "Last school attended is required"
  if (!form.yearOfGraduation?.trim()) errors.yearOfGraduation = "Year of graduation is required"
  if (!form.chosenCourse?.trim()) errors.chosenCourse = "Chosen course is required"

  activeSittings.forEach((sitting, sittingIndex) => {
    const label = sittingIndex === 0 ? "A" : "B"
    if (!sitting.examType) errors[`sitting_${sittingIndex}_examType`] = `Sitting ${label} exam type is required`
    if (!sitting.examYear) errors[`sitting_${sittingIndex}_examYear`] = `Sitting ${label} exam year is required`
    if (!sitting.candidateNumber?.trim()) errors[`sitting_${sittingIndex}_candidateNumber`] = `Sitting ${label} candidate number is required`

    const completedSubjects = sitting.subjects.filter(
      (subject) => subject.subject?.trim() && subject.grade
    ).length

    if (completedSubjects < 5) {
      errors[`sitting_${sittingIndex}_minimumSubjects`] = `Sitting ${label} requires at least 5 subjects with grades`
    }

    sitting.subjects.forEach((subject, subjectIndex) => {
      const hasSubject = Boolean(subject.subject?.trim())
      const hasGrade = Boolean(subject.grade)

      if (hasSubject && !hasGrade) {
        errors[`sitting_${sittingIndex}_grade_${subjectIndex}`] = `Sitting ${label} grade ${subjectIndex + 1} is required`
      }

      if (!hasSubject && hasGrade) {
        errors[`sitting_${sittingIndex}_subject_${subjectIndex}`] = `Sitting ${label} subject ${subjectIndex + 1} is required`
      }
    })
  })

  return errors
}

export function validateStep3(form) {
  const errors = {}
  if (!form.passport) errors.passport = "Passport photograph is required"
  return errors
}

export function validateStep4(form) {
  const errors = {}
  if (!form.attestationAccepted) errors.attestationAccepted = "You must confirm that information is accurate"
  if (!form.activationAccepted) errors.activationAccepted = "You must authorize the school to process this application"
  return errors
}

export function getStepErrors(step, form, activeSittings) {
  switch (step) {
    case 1: return validateStep1(form)
    case 2: return validateStep2(form, activeSittings)
    case 3: return validateStep3(form)
    case 4: return validateStep4(form)
    default: return {}
  }
}
