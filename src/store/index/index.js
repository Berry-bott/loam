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

function buildApplicationPayload(form) {
  const formData = new FormData()

  appendIfPresent(formData, "firstName", form.firstName?.trim())
  appendIfPresent(formData, "middleName", form.middleName?.trim())
  appendIfPresent(formData, "lastName", form.lastName?.trim())
  appendIfPresent(formData, "dateOfBirth", form.dateOfBirth)
  appendIfPresent(formData, "gender", form.gender)
  appendIfPresent(formData, "maritalStatus", form.maritalStatus)
  appendIfPresent(formData, "email", form.email?.trim())
  appendIfPresent(formData, "phone", form.phone?.trim())
  appendIfPresent(formData, "residentialAddress", form.residentialAddress?.trim())
  appendIfPresent(formData, "nationality", form.nationality)
  appendIfPresent(formData, "stateOfOrigin", form.stateOfOrigin?.trim())
  appendIfPresent(formData, "lga", form.lga?.trim())
  appendIfPresent(formData, "lastSchool", form.lastSchool?.trim())
  appendIfPresent(formData, "sponsorName", form.sponsorName?.trim())
  appendIfPresent(formData, "sponsorPhone", form.sponsorPhone?.trim())
  appendIfPresent(formData, "emergencyContactName", form.emergencyContactName?.trim())
  appendIfPresent(formData, "emergencyContactPhone", form.emergencyContactPhone?.trim())
  appendIfPresent(formData, "sittingCount", form.sittingCount)
  appendIfPresent(formData, "jambRegistrationNumber", form.jambRegistrationNumber?.trim())
  appendIfPresent(formData, "jambYear", form.jambYear)
  formData.append("attestationAccepted", String(Boolean(form.attestationAccepted)))
  formData.append("activationAccepted", String(Boolean(form.activationAccepted)))

  formData.append("sittings", JSON.stringify(form.sittings))
  formData.append("jambSubjects", JSON.stringify(form.jambSubjects))

  if (form.passport instanceof File) {
    formData.append("passport", form.passport)
  }

  if (form.waecResult instanceof File) {
    formData.append("waecResult", form.waecResult)
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
      const response = await fetch(`${APPLICATIONS_URL}/apply`, {
        method: "POST",
        body: buildApplicationPayload(form),
      })

      const payload = await parseJsonResponse(response)

      if (!response.ok) {
        throw new Error(
          getErrorMessage(
            payload,
            "Unable to submit application. Please try again.",
          ),
        )
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
