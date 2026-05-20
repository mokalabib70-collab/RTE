import { useState } from "react";
import Adminlayout from "./AdminLayout";
import UniversitiesPage from "./UniversitiesPage";
import FacultiesPage from "./Faculties";
import AdminsPage from "./AdminsPage";
import AiSettingsPage from "./AiSettingsPage";
import ProfilePage from "./Profile";
import SuperAdminChat from "./SuperAdminChat"; 

export default function AdminApp({ onNavigate }) {
  const [activePage, setActivePage] = useState("Profile");

  const renderPage = () => {
    switch (activePage) {
      case "Universities": return <UniversitiesPage />;
      case "Faculties":    return <FacultiesPage />;
      case "Admins":       return <AdminsPage />;
      case "AI Settings":  return <AiSettingsPage />;
      case "Profile":      return <ProfilePage />;
      case "Chat":         return <SuperAdminChat />;
      case "Dashboard": 
      default:
        return (
          <div className="bg-[#fffafa] rounded-2xl px-9 py-8 min-h-125 border border-[#e8e8e0]">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Dashboard</h1>
          </div>
        );
    }
  };

  return (
    <Adminlayout
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={() => onNavigate && onNavigate("Login")}
    >
      {renderPage()}
    </Adminlayout>
  );
}