import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getAllDepartments, getAllFaculties, getAllStaff, getOverview } from "./adminApi"
import { resolveArray } from "../../components/admin-shared/adminManagementUtils"

const INITIAL_STATE = {
  overview: null,
  overviewError: "",
  isLoadingOverview: false,
  departments: [],
  departmentError: "",
  isLoadingDepartments: false,
  faculties: [],
  facultyError: "",
  isLoadingFaculties: false,
  staff: [],
  staffError: "",
  isLoadingStaff: false,
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

export const useAdminDataStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      fetchOverview: async (options = {}) => {
        const force = Boolean(options?.force)
        if (!force && get().overview) return get().overview

        set({ isLoadingOverview: true, overviewError: "" })

        try {
          const payload = await getOverview()
          set({
            overview: payload,
            isLoadingOverview: false,
            overviewError: "",
          })
          return payload
        } catch (error) {
          set({
            isLoadingOverview: false,
            overviewError: error.message || "Unable to load dashboard overview right now.",
          })
          throw error
        }
      },

      fetchDepartments: async (options = {}) => {
        const force = Boolean(options?.force)
        if (!force && get().departments.length) return get().departments

        set({ isLoadingDepartments: true, departmentError: "" })

        try {
          const payload = await getAllDepartments()
          const departments = resolveArray(payload)
          set({
            departments,
            isLoadingDepartments: false,
            departmentError: "",
          })
          return departments
        } catch (error) {
          set({
            isLoadingDepartments: false,
            departmentError: error.message || "Unable to load departments right now.",
          })
          throw error
        }
      },

      fetchFaculties: async (options = {}) => {
        const force = Boolean(options?.force)
        if (!force && get().faculties.length) return get().faculties

        set({ isLoadingFaculties: true, facultyError: "" })

        try {
          const payload = await getAllFaculties()
          const faculties = resolveArray(payload)
          set({
            faculties,
            isLoadingFaculties: false,
            facultyError: "",
          })
          return faculties
        } catch (error) {
          set({
            isLoadingFaculties: false,
            facultyError: error.message || "Unable to load faculties right now.",
          })
          throw error
        }
      },

      fetchStaff: async (options = {}) => {
        const force = Boolean(options?.force)
        if (!force && get().staff.length) return get().staff

        set({ isLoadingStaff: true, staffError: "" })

        try {
          const payload = await getAllStaff()
          const staff = resolveArray(payload)
          set({
            staff,
            isLoadingStaff: false,
            staffError: "",
          })
          return staff
        } catch (error) {
          set({
            isLoadingStaff: false,
            staffError: error.message || "Unable to load staff records right now.",
          })
          throw error
        }
      },

      refreshAllAdminData: async () => {
        const results = await Promise.allSettled([
          get().fetchOverview({ force: true }),
          get().fetchDepartments({ force: true }),
          get().fetchFaculties({ force: true }),
          get().fetchStaff({ force: true }),
        ])

        return results
      },

      upsertStaffRecord: (staffRecord) =>
        set((state) => {
          const nextStaff = [...state.staff]
          const id = String(
            staffRecord?.id || staffRecord?._id || staffRecord?.userId || "",
          )
          const index = nextStaff.findIndex((item) => String(item?.id || item?._id || item?.userId || "") === id)

          if (index >= 0) {
            nextStaff[index] = staffRecord
          } else if (staffRecord) {
            nextStaff.unshift(staffRecord)
          }

          return { staff: nextStaff }
        }),

      updateStaffRecord: (staffId, updates) =>
        set((state) => ({
          staff: state.staff.map((item) =>
            String(item?.id || item?._id || item?.userId || "") === String(staffId)
              ? { ...item, ...updates }
              : item,
          ),
        })),

      replaceDepartments: (departments) => set({ departments }),
      replaceFaculties: (faculties) => set({ faculties }),
    }),
    {
      name: "admin-data-storage",
      storage: createStorage(),
      partialize: (state) => ({
        overview: state.overview,
        departments: state.departments,
        faculties: state.faculties,
        staff: state.staff,
      }),
    },
  ),
)
