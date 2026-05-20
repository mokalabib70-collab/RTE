import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Landing-Page/Landingpage.jsx";
import TruthEye from "./components/TruthEye.jsx";

import Layout from "./Layout.jsx";

import DoctorProfile from "./components/Doctorprofile.jsx";
import Exam from "./components/Exam.jsx";
import Reports from "./components/Reports.jsx";
import CoursesContent from "./components/Courses.jsx";
import Chat from "./components/Chat.jsx";
import StudentProfile from "./components/StudentProfile.jsx";
import AdminProfile from "./components/AdminProfile.jsx"
import AdminApp from "./SuperAdminPanel/AdminApp.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Login */}
        <Route path="/auth" element={<TruthEye />} />

        {/* ===== DOCTOR DASHBOARD ===== */}
        <Route path="/doctorprofile" element={<Layout />}>
          <Route index element={<DoctorProfile />} />
          <Route path="exams" element={<Exam />} />
          <Route path="reports" element={<Reports />} />
          <Route path="courses" element={<CoursesContent />} />
          <Route path="chats" element={<Chat />} />
        </Route>

        {/* ===== STUDENT ===== */}
        <Route path="/studentprofile" element={<StudentProfile />} />

        {/* ===== ADMIN ===== */}
        <Route path="/adminprofile" element={<AdminProfile />} />
        
         {/* ===== Super ADMIN ===== */}
        <Route path="/superadmin" element={<AdminApp />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;