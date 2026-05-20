import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import DP from '../assets/dp.png';

// ── Section title icons ──
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);
const ContactIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M7 8h.01M12 8h.01M7 12h10M7 16h6" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// ── Reusable Section wrapper ──
const Section = ({ icon, title, children }) => (
  <section className="mb-7">
    <h3 className="flex items-center gap-2.5 text-[18px] font-bold mb-2.5 text-[#1a1a1a]">
      {icon}
      {title}
    </h3>
    <div className="h-[1.5px] bg-[#E0E0E0] w-full mb-6" />
    {children}
  </section>
);

// ── Reusable field ──
const Field = ({ label, type = "text", defaultValue }) => (
  <div className="flex flex-col flex-1">
    <label className="text-sm font-semibold mb-2 text-[#444]">{label}</label>
    <input
      type={type}
      defaultValue={defaultValue}
      className="h-11.25 border border-[#dcdcdc] rounded-xl px-4 text-[15px] bg-white text-[#555] outline-none transition-colors duration-200 focus:border-[#1a4331]"
    />
  </div>
);

// ── Responsive grid ──
const Grid = ({ cols = 2, children, className = "" }) => (
  <div
    className={`grid w-full gap-6 ${className}`}
    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
  >
    {children}
  </div>
);

export default function DoctorProfile({ onNavigate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-[#FFFAFA] min-h-screen">
      <main className="bg-[#FFFAFA] px-7.5 py-1.25">

        {/* Page header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-[28px] font-bold text-[#1a1a1a]">My Profile</h1>
          <button
            onClick={() => onNavigate && onNavigate("Login")}
            className="border border-[#ff4d4d] text-[#ff4d4d] bg-transparent px-5 py-2 rounded-lg font-medium cursor-pointer hover:bg-[#ff4d4d] hover:text-white transition-colors duration-200"
          >
            Log Out
          </button>
        </div>

        {/* Info card */}
        <div className="bg-[#FFFAFA] px-5 max-w-[95%] mx-auto">

          {/* Profile card */}
          <div className="flex flex-row items-center justify-center gap-5 mb-2.5 flex-wrap sm:flex-nowrap text-center sm:text-left">
            <div className="w-22.5 h-22.5 rounded-full border-4 border-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] shrink-0 overflow-hidden">
              <img src={DP} alt="Dr. Ahmed Kareem" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[22px] font-bold text-[#1a1a1a] mb-1">Dr. Ahmed Kareem</h2>
              <p className="text-[15px] text-[#555]">Professor</p>
              <p className="text-[15px] text-[#555]">Artificial Intelligence</p>
              <p className="text-sm text-[#888] mt-1"><strong>Employee ID:</strong> EMP-2018CS-0042</p>
              <p className="text-sm text-[#888]">Joined: September 2018</p>
            </div>
          </div>

          {/* 1. Personal Info */}
          <Section icon={<UserIcon />} title="Personal Info">
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="First Name"    defaultValue="Mohammad" />
              <Field label="Last Name"     defaultValue="Ahmed" />
              <Field label="Date of Birth" type="date" defaultValue="1980-09-08" />
            </div>
          </Section>

          {/* 2. Academic Details */}
          <Section icon={<FileIcon />} title="Academic Details">
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2">
              <Field label="Department"    defaultValue="Computer Science" />
              <Field label="Academic Rank" defaultValue="Ph.D. in Computer Science" />
            </div>
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 mt-5">
              <Field label="University" defaultValue="Beni-Suef University" />
            </div>
          </Section>

          {/* 3. Contact Info */}
          <Section icon={<ContactIcon />} title="Contact Info">
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2">
              <Field label="Primary Email"    type="email" defaultValue="ahmedmohammad@university.edu" />
              <Field label="Office Location"  defaultValue="Building A, Room 301" />
            </div>
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 mt-5">
              <Field label="Phone Number"  defaultValue="+20 112 124 0126" />
              <Field label="Office Hours"  defaultValue="Monday & Wednesday, 2:00 PM - 4:00 PM" />
            </div>
          </Section>

          {/* 4. Security Settings */}
          <Section icon={<SettingsIcon />} title="Security Settings">
            <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-semibold mb-2 text-[#444]">Change Password</label>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-fit px-9 h-10.5 border border-[#1a4331] bg-transparent text-[#1a4331] rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:bg-[#1a4331] hover:text-white"
                >
                  Update Password
                </button>
              </div>
            </div>
          </Section>

        </div>
      </main>

      {showModal && <ChangePasswordModal onClose={() => setShowModal(false)} />}
    </div>
  );
}