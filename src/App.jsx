import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import AcademicsPage from "./pages/AcademicsPage"
import AdmissionsPage from "./pages/AdmissionsPage"
import StudentLifePage from "./pages/StudentLifePage"
import GalleryPage from "./pages/GalleryPage"
import EventsPage from "./pages/EventsPage"
// import AdvertsPage from "./pages/AdvertsPage"
import ContactPage from "./pages/ContactPage"

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
      {/* <Route path="/adverts" element={<AdvertsPage />} /> */}
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App
