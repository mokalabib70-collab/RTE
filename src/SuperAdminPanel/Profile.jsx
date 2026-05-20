import { useState } from "react";
import rectangle from '../assets/Rectangle (1).png';

// ── Change Password Modal ─────────────────────────────────────
function ChangePasswordModal({ onClose }) {
  const [oldPass,     setOldPass]     = useState("");
  const [newPass,     setNewPass]     = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [show,        setShow]        = useState({ old: false, nw: false, confirm: false });
  const [suggested,   setSuggested]   = useState("");

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
    let pwd = "";
    for (let i = 0; i < 12; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
    setSuggested(pwd);
    setNewPass(pwd);
    setConfirmPass(pwd);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) { alert("Passwords don't match!"); return; }
    alert("Password updated successfully!");
    onClose();
  };

  const EyeIcon = ({ on }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {on
        ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      }
    </svg>
  );

  return (
    <div
      className="fixed inset-0 bg-black/35 flex items-center justify-center z-1000 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#fffafa] rounded-2xl p-6 sm:p-8 md:p-9 w-full max-w-140 shadow-2xl animate-[cp-in_0.2s_ease]">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xl md:text-[22px] font-bold text-[#1c5332]">Change Password</h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-[#333] flex items-center p-1 hover:text-[#e05555] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form className="flex flex-col gap-3.5" onSubmit={handleUpdate}>
          {[
            { label: "Old Password",         val: oldPass,     set: setOldPass,     key: "old"     },
            { label: "New Password",         val: newPass,     set: setNewPass,     key: "nw"      },
            { label: "Confirm New Password", val: confirmPass, set: setConfirmPass, key: "confirm" },
          ].map(({ label, val, set, key }) => (
            <div key={key} className="relative flex items-center">
              <input
                type={show[key] ? "text" : "password"}
                placeholder={label}
                value={val}
                onChange={(e) => set(e.target.value)}
                className="w-full h-13 border border-[#d4d4cc] rounded-[10px] pr-12 pl-4 text-sm text-[#1a1a1a] bg-white outline-none focus:border-[#1c5332] transition-colors placeholder:text-[#b0b0a8]"
              />
              <button
                type="button"
                onClick={() => setShow(s => ({ ...s, [key]: !s[key] }))}
                className="absolute right-3.5 bg-transparent border-none cursor-pointer text-[#1c5332] flex items-center p-1 hover:opacity-70 transition-opacity"
              >
                <EyeIcon on={show[key]} />
              </button>
            </div>
          ))}

          {suggested && (
            <p className="text-xs text-[#666] bg-[#eef5f1] border border-[#c8ddd1] rounded-lg px-3 py-2">
              Suggested: <code className="font-semibold text-[#1c5332] tracking-wide">{suggested}</code>
            </p>
          )}

          <div className="flex gap-3 mt-1.5 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={generatePassword}
              className="flex-1 min-w-40 h-12 border-[1.5px] border-[#1a1a1a] rounded-[10px] bg-transparent text-sm font-semibold text-[#1a1a1a] cursor-pointer hover:bg-[#1a1a1a] hover:text-white transition-all whitespace-nowrap"
            >
              Suggest Strong Password
            </button>
            <button
              type="submit"
              className="flex-1 min-w-40 h-12 border-none rounded-[10px] bg-[#1c5332] text-sm font-semibold text-white cursor-pointer hover:bg-[#154026] transition-colors whitespace-nowrap"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Profile Page ─────────────────────────────────────────────
export default function Profilepage() {
  const [showModal,  setShowModal]  = useState(false);
  const [firstName,  setFirstName]  = useState("Ahmed");
  const [lastName,   setLastName]   = useState("Sayed");
  const [dob,        setDob]        = useState("1980-09-08");
  const [email,      setEmail]      = useState("ahmed.sayed@bsu.edu.eg");
  const [phone,      setPhone]      = useState("+20 112 124 0126");
  const [nationalId, setNationalId] = useState("50406981167792");

  const inputClass = "h-[46px] border border-[#d4d4cc] rounded-lg px-3.5 text-sm text-[#1a1a1a] bg-white outline-none focus:border-[#1c5332] transition-colors w-full";
  const labelClass = "text-[13px] font-medium text-[#444]";
  const fieldClass = "flex flex-col gap-1.5";

  return (
    <div className="bg-[#fffafa] min-h-screen px-4 sm:px-7 md:px-12 py-8 pb-16 max-w-275 mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">My Profile</h1>
        <button className="border-[1.5px] border-[#e05555] bg-transparent text-[#ff5656] rounded-lg px-5 py-2 text-sm font-semibold cursor-pointer hover:bg-[#e05555] hover:text-white transition-all">
          Log Out
        </button>
      </div>

      {/* Identity Card */}
      <div className="flex items-center gap-5 sm:gap-7 mb-9">
        <div className="w-19 h-19 sm:w-25 sm:h-25 rounded-full overflow-hidden shrink-0 border-[3px] border-white shadow-md">
          <img src={rectangle} alt="Ahmed Sayed" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-[18px] sm:text-[22px] font-bold text-[#1a1a1a] mb-1">Ahmed Sayed</h2>
          <p className="text-sm text-[#666] mb-1.5">System Management</p>
          <p className="text-[13px] text-[#555] mb-0.5"><strong className="text-[#1a1a1a] font-semibold">Employee ID:</strong> EMP-2062TE-1042</p>
          <p className="text-[13px] text-[#555]">Joined: September 2025</p>
        </div>
      </div>

      {/* Personal Info */}
      <section className="mb-8">
        <div className="flex items-center gap-2.5 mb-2.5 text-[#1a1a1a]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <h3 className="text-[17px] font-bold">Personal Info</h3>
        </div>
        <div className="h-px bg-[#d8d8cc] mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className={fieldClass}>
            <label className={labelClass}>First Name</label>
            <input className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Last Name</label>
            <input className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Date of Birth</label>
            <input type="date" className={inputClass} value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="mb-8">
        <div className="flex items-center gap-2.5 mb-2.5 text-[#1a1a1a]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M2 7l10 7 10-7"/>
          </svg>
          <h3 className="text-[17px] font-bold">Contact Info</h3>
        </div>
        <div className="h-px bg-[#d8d8cc] mb-5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={fieldClass}>
            <label className={labelClass}>Email</label>
            <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3.5">
          <div className={fieldClass}>
            <label className={labelClass}>National ID</label>
            <input className={inputClass} value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
          </div>
        </div>
      </section>

      {/* Security Settings */}
      <section className="mb-8">
        <div className="flex items-center gap-2.5 mb-2.5 text-[#1a1a1a]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <h3 className="text-[17px] font-bold">Security Settings</h3>
        </div>
        <div className="h-px bg-[#d8d8cc] mb-5" />
        <div className="flex flex-col gap-1.5 max-w-95">
          <label className={labelClass}>Change Password</label>
          <button
            onClick={() => setShowModal(true)}
            className="h-11.5 w-full border-[1.5px] border-[#1a1a1a] rounded-lg bg-transparent text-sm font-semibold text-[#1a1a1a] cursor-pointer hover:bg-[#1a1a1a] hover:text-white transition-all"
          >
            Update Password
          </button>
        </div>
      </section>

      {/* Save Changes */}
      <div className="flex justify-end mt-2">
        <button className="h-11.5 px-10 bg-[#1c5332] text-white border-none rounded-[10px] text-sm font-semibold cursor-pointer hover:bg-[#154026] transition-colors">
          Save Changes
        </button>
      </div>

      {/* Modal */}
      {showModal && <ChangePasswordModal onClose={() => setShowModal(false)} />}
    </div>
  );
}