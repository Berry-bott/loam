import { create } from "zustand"
import { API_CONFIG } from "../../config/api"

const APPLICATIONS_URL = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.applications}`

const INITIAL_STATE = {
  isSubmitting: false,
  submitError: null,
  submitResponse: null,
}

function appendIfPresent(formData, key, value) {
  if (value === undefined || value === null || value === "") return
  formData.append(key, value)
}

function parseJsonResponse(response) {
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) return null

  return response.json().catch(() => null)
}

function getErrorMessage(payload, fallbackMessage) {
  return (
    payload?.message ||
    payload?.error ||
    payload?.detail ||
    fallbackMessage
  )?.trim()
}

function buildOLevelSittings(sittings, sittingCount) {
  return sittings.slice(0, Number(sittingCount)).map((sitting) => ({
    examType: sitting.examType,
    examYear: sitting.examYear,
    serialNumber: sitting.serialNumber?.trim() || sitting.candidateNumber?.trim() || "",
    candidateNumber: sitting.candidateNumber?.trim() || "",
    subjects: sitting.subjects,
  }))
}

function buildJambDetails(jambSubjects) {
  return jambSubjects.map((subject, index) => ({
    subject: index === 0 && subject.subject === "English Language" ? "Use of English" : subject.subject,
    score: Number(subject.score) || 0,
  }))
}

function buildApplicationPayload(form) {
  const formData = new FormData()
  const oLevelSittings = buildOLevelSittings(form.sittings, form.sittingCount)
  const jambDetails = buildJambDetails(form.jambSubjects)
  const yearOfGraduation =
    form.yearOfGraduation?.trim() ||
    oLevelSittings.find((sitting) => sitting.examYear)?.examYear ||
    ""

  appendIfPresent(formData, "firstName", form.firstName?.trim())
  appendIfPresent(formData, "middleName", form.middleName?.trim())
  appendIfPresent(formData, "lastName", form.lastName?.trim())
  appendIfPresent(formData, "dateOfBirth", form.dateOfBirth)
  appendIfPresent(formData, "gender", form.gender)
  appendIfPresent(formData, "maritalStatus", form.maritalStatus)
  appendIfPresent(formData, "email", form.email?.trim())
  appendIfPresent(formData, "phoneNumber", form.phone?.trim())
  appendIfPresent(formData, "chosenCourse", form.chosenCourse?.trim())
  appendIfPresent(formData, "stateOfResidence", form.stateOfOrigin?.trim())
  appendIfPresent(formData, "cityOfResidence", form.lga?.trim())
  appendIfPresent(formData, "residentialAddress", form.residentialAddress?.trim())
  appendIfPresent(formData, "nationality", form.nationality)
  appendIfPresent(formData, "stateOfOrigin", form.stateOfOrigin?.trim())
  appendIfPresent(formData, "lga", form.lga?.trim())
  appendIfPresent(formData, "lastSchoolAttended", form.lastSchool?.trim())
  appendIfPresent(formData, "yearOfGraduation", yearOfGraduation)
  appendIfPresent(formData, "sponsorName", form.sponsorName?.trim())
  appendIfPresent(formData, "sponsorPhoneNumber", form.sponsorPhone?.trim())
  appendIfPresent(formData, "emergencyContactName", form.emergencyContactName?.trim())
  appendIfPresent(formData, "emergencyContactPhoneNumber", form.emergencyContactPhone?.trim())
  appendIfPresent(formData, "numberOfSittings", form.sittingCount)
  formData.append("oLevelSittings", JSON.stringify(oLevelSittings))
  formData.append("jambDetails", JSON.stringify(jambDetails))

  if (form.passport instanceof File) {
    formData.append("documents", form.passport)
  }

  if (form.waecResult instanceof File) {
    formData.append("documents", form.waecResult)
  }

  return formData
}

export const useAdmissionsStore = create((set) => ({
  ...INITIAL_STATE,

  clearSubmitError: () => set({ submitError: null }),

  resetSubmissionState: () =>
    set({
      isSubmitting: false,
      submitError: null,
      submitResponse: null,
    }),

  submitApplication: async (form) => {
    set({
      isSubmitting: true,
      submitError: null,
      submitResponse: null,
    })

    try {
      const payloadBody = buildApplicationPayload(form)
      const response = await fetch(`${APPLICATIONS_URL}/apply`, {
        method: "POST",
        body: payloadBody,
      })

      const payload = await parseJsonResponse(response)

      if (!response.ok) {
        if (import.meta.env.DEV) {
          console.error("Admissions submit failed", {
            status: response.status,
            payload,
            requestFields: Array.from(payloadBody.keys()),
          })
        }
        throw new Error(
          getErrorMessage(
            payload,
            "Unable to submit application. Please try again.",
          ),
        )
      }

      if (import.meta.env.DEV) {
        console.debug("Admissions submit success", {
          status: response.status,
          payload,
          requestFields: Array.from(payloadBody.keys()),
        })
      }

      set({
        isSubmitting: false,
        submitError: null,
        submitResponse: payload,
      })

      return payload
    } catch (error) {
      set({
        isSubmitting: false,
        submitError: error.message,
        submitResponse: null,
      })
      throw error
    }
  },
}))
