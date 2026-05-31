import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  decideAdmissionsApplication,
  getAdmissionsApplicationById,
  getAdmissionsApplications,
} from "./admissionsApi"

const INITIAL_STATE = {
  applicationLists: {},
  applicationDetails: {},
  isLoadingLists: {},
  isLoadingDetails: {},
  listErrors: {},
  detailErrors: {},
}

function createStorage() {
  return {
    getItem: (key) => {
      const value = sessionStorage.getItem(key)
      return value ? JSON.parse(value) : null
    },
    setItem: (key, value) => {
      sessionStorage.setItem(key, JSON.stringify(value))
    },
    removeItem: (key) => {
      sessionStorage.removeItem(key)
    },
  }
}

function buildListKey({ page = 1, limit = 100, status = "" } = {}) {
  return `${page}:${limit}:${status || "ALL"}`
}

function resolveApplications(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.data)) return payload.data.data
  if (Array.isArray(payload?.data?.applications)) return payload.data.applications
  if (Array.isArray(payload?.applications)) return payload.applications
  return []
}

function getEntityId(item) {
  return String(item?.id || item?._id || item?.applicationId || item?.uuid || "")
}

export const useAdmissionsStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      fetchApplications: async (params = {}, options = {}) => {
        const key = buildListKey(params)
        const force = Boolean(options?.force)
        const cached = get().applicationLists[key]

        if (!force && cached?.items?.length) return cached.items

        set((state) => ({
          isLoadingLists: { ...state.isLoadingLists, [key]: true },
          listErrors: { ...state.listErrors, [key]: "" },
        }))

        try {
          const payload = await getAdmissionsApplications(params)
          const items = resolveApplications(payload)
          const meta = payload?.data?.meta || payload?.meta || null

          set((state) => ({
            applicationLists: {
              ...state.applicationLists,
              [key]: { items, meta },
            },
            isLoadingLists: { ...state.isLoadingLists, [key]: false },
            listErrors: { ...state.listErrors, [key]: "" },
          }))

          return items
        } catch (error) {
          set((state) => ({
            isLoadingLists: { ...state.isLoadingLists, [key]: false },
            listErrors: {
              ...state.listErrors,
              [key]: error.message || "Unable to load applications right now.",
            },
          }))
          throw error
        }
      },

      fetchApplicationDetail: async (id, options = {}) => {
        const force = Boolean(options?.force)
        if (!id) throw new Error("Application ID is required.")

        if (!force && get().applicationDetails[id]) return get().applicationDetails[id]

        set((state) => ({
          isLoadingDetails: { ...state.isLoadingDetails, [id]: true },
          detailErrors: { ...state.detailErrors, [id]: "" },
        }))

        try {
          const payload = await getAdmissionsApplicationById(id)
          const application =
            payload?.data?.application ||
            payload?.data ||
            payload?.application ||
            null

          set((state) => ({
            applicationDetails: {
              ...state.applicationDetails,
              [id]: application,
            },
            isLoadingDetails: { ...state.isLoadingDetails, [id]: false },
            detailErrors: { ...state.detailErrors, [id]: "" },
          }))

          return application
        } catch (error) {
          set((state) => ({
            isLoadingDetails: { ...state.isLoadingDetails, [id]: false },
            detailErrors: {
              ...state.detailErrors,
              [id]: error.message || "Unable to load application details right now.",
            },
          }))
          throw error
        }
      },

      decideApplication: async (id, decision) => {
        const payload = await decideAdmissionsApplication(id, decision)

        set((state) => {
          const nextLists = Object.fromEntries(
            Object.entries(state.applicationLists).map(([key, entry]) => [
              key,
              {
                ...entry,
                items: Array.isArray(entry?.items)
                  ? entry.items.map((item) =>
                      getEntityId(item) === String(id)
                        ? { ...item, status: decision }
                        : item,
                    )
                  : [],
              },
            ]),
          )

          const nextDetails = state.applicationDetails[id]
            ? {
                ...state.applicationDetails,
                [id]: {
                  ...state.applicationDetails[id],
                  status: decision,
                },
              }
            : state.applicationDetails

          return {
            applicationLists: nextLists,
            applicationDetails: nextDetails,
          }
        })

        return payload
      },
    }),
    {
      name: "admissions-data-storage",
      storage: createStorage(),
      partialize: (state) => ({
        applicationLists: state.applicationLists,
        applicationDetails: state.applicationDetails,
      }),
    },
  ),
)

export { buildListKey }
