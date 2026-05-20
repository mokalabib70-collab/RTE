import { useState, useEffect, useRef } from "react";
import logoImg from '../assets/Logo (2).png';
// ── Chevron Right ──
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Chevron Down ──
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function AdminLayout({ children, activePage, onNavigate, onLogout }) {
  const [academicOpen, setAcademicOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const subItems = ["Universities", "Faculties", "Admins", "AI Settings"];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const handleNavigate = (page) => {
    onNavigate(page);
    setSidebarOpen(false);
  };

  // ── Nav item style ──
  const navItemBase =
    "flex items-center gap-[10px] w-full px-[14px] py-[11px] rounded-[8px] text-[14px] font-medium font-poppins cursor-pointer text-left transition-all duration-150 border border-transparent";

  const navItemActive =
    "text-[#FFFAFA] shadow-[0_0_4px_#f3b20070]";
    // gradient border trick via outline + bg
  const navItemInactive =
    "text-white/75 bg-transparent hover:bg-white/[0.08] hover:text-white";

  const subItemBase =
    "flex items-center justify-between w-full px-3 py-2 rounded-[6px] text-[13px] cursor-pointer text-left transition-all duration-150 bg-transparent border-none";

  return (
    <div
      className="flex h-screen w-full overflow-hidden relative"
      style={{ fontFamily: "'Poppins', sans-serif", background: "#fffafa" }}
    >

      {/* ── Overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-199 block sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ════════════════════
          SIDEBAR
      ════════════════════ */}
      <aside
        ref={sidebarRef}
        className={[
          // desktop: always visible, fixed width
          "shrink-0 flex flex-col overflow-y-auto overflow-x-hidden z-200 transition-transform duration-300",
          // mobile: off-canvas drawer
          "fixed sm:relative top-0 left-0 h-screen w-65 sm:w-57.5 lg:w-57.5",
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0",
          // scrollbar styles via global or inline
        ].join(" ")}
        style={{ background: "#1c5332" }}
      >
        {/* Header */}
        <div className="px-5 pt-6 pb-4 shrink-0">
          <p className="text-[15px] font-bold text-white mb-0.75">Super Admin Panel</p>
          <p className="text-[12px] text-white/60">System Management</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/15 mx-4 mb-4 shrink-0" />

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 px-2 pb-6 flex-1">

          {/* Profile */}
          <NavItem
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
            label="Profile"
            active={activePage === "Profile"}
            onClick={() => handleNavigate("Profile")}
          />

          {/* Dashboard */}
          <NavItem
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
            }
            label="Dashboard"
            active={activePage === "Dashboard"}
            onClick={() => handleNavigate("Dashboard")}
          />

          {/* Academic dropdown */}
          <NavItem
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            }
            label="Academic"
            active={subItems.includes(activePage)}
            onClick={() => setAcademicOpen((o) => !o)}
            chevron={academicOpen ? <ChevronDown /> : <ChevronRight />}
          />

          {/* Sub-items */}
          {academicOpen && (
            <div className="flex flex-col pl-7 gap-px py-0.5">
              {subItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigate(item)}
                  className={[
                    subItemBase,
                    activePage === item
                      ? "text-[#fffafa] font-semibold"
                      : "text-white/65 hover:text-white hover:bg-white/[0.07]",
                  ].join(" ")}
                >
                  <span>{item}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Chat */}
          <NavItem
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
            label="Chat"
            active={activePage === "Chat"}
            onClick={() => handleNavigate("Chat")}
          />

          {/* Logs */}
          <NavItem
            icon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            }
            label="Logs"
            active={activePage === "Logs"}
            onClick={() => handleNavigate("Logs")}
          />

          {/* Logout */}
          {onLogout && (
            <>
              <div className="h-px bg-white/15 mx-2 my-3" />
              <button
                onClick={onLogout}
                className="flex items-center gap-2.5 w-full px-3.5 py-2.75 rounded-lg text-[14px] font-medium cursor-pointer text-left transition-all duration-150 bg-transparent border-none text-red-300/85 hover:bg-red-500/12 hover:text-red-300"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Logout</span>
              </button>
            </>
          )}
        </nav>
      </aside>

      {/* ════════════════════
          MAIN
      ════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header
          className="h-16 sm:h-16 flex items-center justify-center border-b border-[#e0e0d8] shrink-0 px-4 relative"
          style={{ background: "#fffafa" }}
        >
          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden absolute left-4 flex flex-col justify-center gap-1.25 border-none cursor-pointer p-1.5 rounded-md transition-colors"
            style={{ background: "#1c5332" }}
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-[#fffafa] rounded-sm" />
            <span className="block w-5 h-0.5 bg-[#fffafa] rounded-sm" />
            <span className="block w-5 h-0.5 bg-[#fffafa] rounded-sm" />
          </button>

          {logoImg && (
            <img src={logoImg} alt="TruthEye" className="h-11 sm:h-11 w-auto object-contain" />
          )}

          {/* Spacer to balance on mobile */}
          <div className="sm:hidden w-8.5 absolute right-4" />
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-7 sm:px-8 sm:py-7 max-sm:px-3 max-sm:py-3">
          {children}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════
// NavItem component
// ════════════════════════════════
function NavItem({ icon, label, active, onClick, chevron }) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-2.5 w-full px-3.5 py-2.75 rounded-lg",
        "text-[14px] font-medium cursor-pointer text-left transition-all duration-150",
        "border border-transparent",
        active
          ? "text-[#FFFAFA] shadow-[0_0_4px_#f3b20070]"
          : "text-white/75 bg-transparent hover:bg-white/8 hover:text-white",
      ].join(" ")}
      style={
        active
          ? {
              background: "#1C5332",
              borderImage: "linear-gradient(135deg, #F3B300, #1C5332) 1",
              borderWidth: "1px",
              borderStyle: "solid",
            }
          : {}
      }
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
      <span className="ml-auto shrink-0">
        {chevron ?? <ChevronRight />}
      </span>
    </button>
  );
}

// ════════════════════════════════
// Page wrapper helper (optional export)
// ════════════════════════════════
export function AdminPageWrap({ title, children }) {
  return (
    <div
      className="bg-white rounded-2xl px-8 py-7 border border-[#e8e8e0] min-h-[calc(100vh-120px)] max-sm:px-4 max-sm:py-4 max-sm:rounded-xl"
    >
      {title && (
        <h1 className="text-[22px] font-bold text-[#1a1a1a] mb-5 max-sm:text-[17px]">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}