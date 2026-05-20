import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Logo from './assets/Logo.png';
import DP   from './assets/dp.png';

// ─────────────────────────── Icons ───────────────────────────
const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3"  y="3"  width="7" height="7"/>
    <rect x="14" y="3"  width="7" height="7"/>
    <rect x="3"  y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);
const ExamsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const ReportsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6"  y1="20" x2="6"  y2="14"/>
    <line x1="2"  y1="20" x2="22" y2="20"/>
  </svg>
);
const CoursesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const SecurityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>
);

// ─────────────────────────── Nav items ───────────────────────────
const NAV_ITEMS = [
  { path: "/doctorprofile",                label: "Dashboard",      icon: <DashboardIcon /> },
  { path: "/doctorprofile/exams",          label: "Exams",          icon: <ExamsIcon />     },
  { path: "/doctorprofile/reports",        label: "Reports",        icon: <ReportsIcon />   },
  { path: "/doctorprofile/courses",        label: "Courses",        icon: <CoursesIcon />   },
  { path: "/doctorprofile/chats",          label: "Chat",           icon: <ChatIcon />      },
]

// ─────────────────────────── Component ───────────────────────────
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const isActive = (path) =>
    path === "/doctorprofile"
      ? location.pathname === "/doctorprofile"
      : location.pathname.startsWith(path);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFAFA]">

      {/* ══════════ TOPBAR ══════════ */}
      <header className="
        fixed top-0 left-0 right-0 z-1100
        h-20
        bg-[#FFFAFA] border-b border-[#D8D8D0]
        flex items-center justify-between
        px-5 md:px-9
        shadow-[0_2px_10px_rgba(0,0,0,0.08)]
      ">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger: mobile only */}
          <button
            className="md:hidden p-1 bg-[#1C5332] text-white rounded"
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <img
            src={Logo}
            alt="TruthEye"
            className="h-13 w-auto object-contain cursor-pointer"
            onClick={() => handleNav("/doctorprofile")}
          />
        </div>

        {/* Right: name + avatar */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleNav("/doctorprofile")}
        >
          <span className="hidden sm:block font-semibold text-[#1a4331] text-[16px]">
            Dr. Ahmed
          </span>
          <div className="w-10.5 h-10.5 rounded-full overflow-hidden border-[1.5px] border-[#1a4331] shrink-0">
            <img src={DP} alt="Dr. Ahmed" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* ══════════ BODY ══════════ */}
      <div className="flex flex-1 mt-20 h-[calc(100vh-80px)]">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-9998 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ══════════ SIDEBAR ══════════ */}
        <aside className={`
          fixed top-20 bottom-0 left-0 z-9999
          bg-[#1C5332] text-white
          flex flex-col pt-7.5
          overflow-y-auto
          transition-[transform,width] duration-300 ease-in-out

          /* mobile: full 210px drawer, slides in/out */
          w-52.5
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          /* tablet md (768px+): always visible, icon-only 70px */
          md:translate-x-0 md:w-17.5

          /* desktop lg (1024px+): always visible, full 210px */
          lg:w-52.5
        `}>
          <nav className="flex flex-col w-full mt-2.5">
            {NAV_ITEMS.map(({ path, label, icon }) => {
              const active = isActive(path);
              return (
                <button
                  key={path}
                  onClick={() => handleNav(path)}
                  title={label}
                  className={`
                    flex items-center w-[90%] mx-auto my-1
                    px-3.75 py-3 rounded-lg
                    text-[14px] font-medium text-left
                    border border-transparent
                    transition-all duration-200 cursor-pointer
                    ${active
                      ? "text-[#FFFAFA] shadow-[0_0_4px_rgba(243,179,0,0.44)]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"}
                  `}
                  style={active ? {
                    background: "linear-gradient(#1C5332,#1C5332) padding-box, linear-gradient(135deg,#F3B300,#1C5332) border-box",
                    borderColor: "transparent",
                  } : {}}
                >
                  {/* Icon — always visible */}
                  <span className="flex items-center justify-center w-5.5 shrink-0">
                    {icon}
                  </span>

                  {/* Label — visible on mobile drawer + desktop, hidden on tablet */}
                  <span className="flex-1 ml-3 md:hidden lg:block">
                    {label}
                  </span>

                  {/* Arrow — same visibility */}
                  <span className="opacity-60 md:hidden lg:block">
                    <ChevronRight />
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ══════════ MAIN CONTENT ══════════ */}
        {/*
          ml offsets match the sidebar width at each breakpoint:
          mobile  → 0      (sidebar is a drawer, not in flow)
          tablet  → 70px
          desktop → 210px
        */}
        <main className="
          flex-1 overflow-y-auto bg-[#FFFAFA] min-w-0
          ml-0 md:ml-17.5 lg:ml-52.5
          p-5 md:p-6 lg:p-8
        ">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
