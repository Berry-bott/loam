import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/index/HomePage"
import AboutPage from "./pages/index/AboutPage"
import AcademicsPage from "./pages/index/AcademicsPage"
import AdmissionsPage from "./pages/index/AdmissionsPage"
import StudentLifePage from "./pages/index/StudentLifePage"
import GalleryPage from "./pages/index/GalleryPage"
import EventsPage from "./pages/index/EventsPage"
import ContactPage from "./pages/index/ContactPage"
import LoginPage from "./auth/login/LoginPage"
import StudentPortalLayout from "./pages/student-dashboard/StudentPortalLayout"
import StudentDashboardPage from "./pages/student-dashboard/StudentDashboardPage"
import StudentApplicationPage from "./pages/student-dashboard/StudentApplicationPage"
import StudentFinancialPage from "./pages/student-dashboard/StudentFinancialPage"
import StudentDocumentsPage from "./pages/student-dashboard/StudentDocumentsPage"
import StudentProfilePage from "./pages/student-dashboard/StudentProfilePage"
import AdminPortalLayout from "./pages/admin-dashboard/AdminPortalLayout"
import AdminAnalyticsPage from "./pages/admin-dashboard/AdminAnalyticsPage"
import AdminApplicationsPage from "./pages/admin-dashboard/AdminApplicationsPage"
import AdminCoursesPage from "./pages/admin-dashboard/AdminCoursesPage"
import AdminDashboardPage  from "./pages/admin-dashboard/AdminDashboardPage"
import AdminFacultyPage from "./pages/admin-dashboard/AdminFacultyPage"
import AdminNewsPage from "./pages/admin-dashboard/AdminNewsPage"
import AdminPaymentsPage from "./pages/admin-dashboard/AdminPaymentsPage"
import AdminSettingsPage from "./pages/admin-dashboard/AdminSettingsPage"
import AdminStudentsPage from "./pages/admin-dashboard/AdminStudentsPage"
import { RequirePortalRole } from "./app/RequirePortalRole"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/academics" element={<AcademicsPage />} />
      <Route path="/admissions" element={<AdmissionsPage />} />
      <Route path="/student-life" element={<StudentLifePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/auth/login" element={<LoginPage />} />

      <Route
        path="/student-dashboard"
        element={
          <RequirePortalRole allowedRoles={["student"]}>
            <StudentPortalLayout />
          </RequirePortalRole>
        }
      >
        <Route index element={<StudentDashboardPage />} />
        <Route path="my-application" element={<StudentApplicationPage />} />
        <Route path="financial-statement" element={<StudentFinancialPage />} />
        <Route path="documents" element={<StudentDocumentsPage />} />
        <Route path="profile-settings" element={<StudentProfilePage />} />
      </Route>

      <Route
        path="/admin-dashboard"
        element={
          <RequirePortalRole allowedRoles={["admin"]}>
            <AdminPortalLayout />
          </RequirePortalRole>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="courses" element={<AdminCoursesPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
        <Route path="students" element={<AdminStudentsPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="news" element={<AdminNewsPage />} />
        <Route path="faculty" element={<AdminFacultyPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
