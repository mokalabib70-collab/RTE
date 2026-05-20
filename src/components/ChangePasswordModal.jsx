import { useState } from "react";

const EyeIcon = ({ visible }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

export default function ChangePasswordModal({ onClose }) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const generateStrongPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 14; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
    setConfirmPassword(password);
  };

  const inputFields = [
    { show: showOld,     setShow: setShowOld,     value: oldPassword,     setValue: setOldPassword,     placeholder: "Old Password" },
    { show: showNew,     setShow: setShowNew,     value: newPassword,     setValue: setNewPassword,     placeholder: "New Password" },
    { show: showConfirm, setShow: setShowConfirm, value: confirmPassword, setValue: setConfirmPassword, placeholder: "Confirm New Password" },
  ];

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/35 px-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal box */}
      <div
        className="bg-[#fffafa] rounded-2xl w-full max-w-140 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
        style={{ animation: "cpm-slide-in 0.2s ease", padding: "clamp(20px,4vw,32px) clamp(16px,5vw,32px) clamp(16px,4vw,28px)" }}
      >
        {/* Keyframe via style tag */}
        <style>{`@keyframes cpm-slide-in { from { transform: translateY(-16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-bold text-[#1c5332]">Change Password</h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-[20px] text-[#1c5332] cursor-pointer leading-none p-1 hover:opacity-60 transition-opacity duration-150"
          >
            ✕
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3.5 mb-7">
          {inputFields.map(({ show, setShow, value, setValue, placeholder }) => (
            <div key={placeholder} className="relative flex items-center">
              <input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-13 border border-[#d0d0c8] rounded-[10px] pl-4 pr-12 text-sm text-[#1a1a1a] bg-white outline-none transition-colors duration-200 focus:border-[#1c5332] placeholder-[#aaa]"
              />
              <button
                onClick={() => setShow((v) => !v)}
                className="absolute right-3.5 bg-transparent border-none cursor-pointer flex items-center p-0 opacity-75 hover:opacity-100 transition-opacity duration-150"
              >
                <EyeIcon visible={show} />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3.5 flex-wrap sm:flex-nowrap">
          <button
            onClick={generateStrongPassword}
            className="flex-1 h-12 bg-transparent border-[1.5px] border-[#1a1a1a] rounded-[10px] text-sm font-semibold text-[#1a1a1a] cursor-pointer transition-all duration-150 hover:bg-[#1a1a1a] hover:text-white w-full"
          >
            Suggest Strong Password
          </button>
          <button
            className="flex-1 h-12 bg-[#1c5332] border-none rounded-[10px] text-sm font-semibold text-white cursor-pointer transition-colors duration-150 hover:bg-[#154026] w-full"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}