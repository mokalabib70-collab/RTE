import { useState } from "react";

const UNIVERSITIES = [
  "Alexandria University",
  "Beni suef University",
  "Cairo University",
  "Fayoum University",
  "Ain Shams University",
];

const FACULTIES_MAP = {
  "Alexandria University": ["Faculty of Engineering", "Faculty of science", "Faculty of Law"],
  "Beni suef University":  ["Faculty of computer and AI", "Faculty of Medicine"],
  "Cairo University":      ["Faculty of Law", "Faculty of Engineering"],
  "Fayoum University":     ["Faculty of pharmacy"],
  "Ain Shams University":  ["Faculty of Medicine", "Faculty of science"],
};

const MODULES = [
  "Face Recognition",
  "Liveness Detection",
  "Multiple Faces Detection",
  "Eye Tracking & Head Pose",
  "Audio Classification",
];

function Dropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-12.5 border border-[#d8d8d0] rounded-[10px] px-4 bg-white text-sm flex items-center justify-between gap-2 hover:border-[#1c5332] transition-colors cursor-pointer"
      >
        <span style={{ color: value ? "#1a1a1a" : "#bbb" }}>
          {value || placeholder || ""}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-[#d8d8d0] rounded-[10px] z-50 shadow-lg overflow-hidden">
          {options.map((o, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { onChange(o); setOpen(false); }}
              className={`w-full px-4 py-2.75 text-sm text-left border-b border-[#f0f0e8] last:border-0 hover:bg-[#f5f5f0] transition-colors cursor-pointer ${
                value === o ? "text-[#1c5332] font-semibold" : "text-[#1a1a1a]"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
        on
          ? "bg-[#09a945] text-white flex-row px-2.5 py-1.5 pl-3.5"
          : "bg-[#e0e0d8] text-[#888] flex-row-reverse px-2.5 py-1.5 pr-3.5"
      }`}
    >
      <span className="text-xs font-bold tracking-wide">{on ? "ON" : "OFF"}</span>
      <span
        className={`w-5.5 h-5.5 rounded-full shadow shrink-0 ${
          on ? "bg-white" : "bg-[#bbb]"
        }`}
      />
    </button>
  );
}

export default function AISettingsPage() {
  const [university, setUniversity] = useState("");
  const [faculty,    setFaculty]    = useState("");
  const [modules,    setModules]    = useState(
    Object.fromEntries(MODULES.map((m) => [m, true]))
  );
  const [saved, setSaved] = useState(false);

  const handleUniChange = (val) => { setUniversity(val); setFaculty(""); };

  const faculties = university ? (FACULTIES_MAP[university] || []) : [];

  const toggleModule = (m) => setModules((prev) => ({ ...prev, [m]: !prev[m] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#fffafa] rounded-2xl border border-[#e8e8e0] p-6 md:p-9 lg:p-12 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-start gap-3 flex-col sm:flex-row">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-0.5">
              AI Detection Settings
            </h1>
            <p className="text-[13px] text-[#888]">Enable / Disable Detection Modules</p>
          </div>
        </div>

        {/* Select University */}
        <div>
          <h2 className="text-base md:text-[17px] font-bold text-[#1a1a1a] mb-2.5">
            Select University
          </h2>
          <Dropdown
            value={university}
            onChange={handleUniChange}
            options={UNIVERSITIES}
            placeholder="Select university"
          />
        </div>

        {/* Select Faculty */}
        <div>
          <h2 className="text-base md:text-[17px] font-bold text-[#1a1a1a] mb-2.5">
            Select Faculty
          </h2>
          <Dropdown
            value={faculty}
            onChange={setFaculty}
            options={faculties.length ? faculties : ["— Select University first —"]}
            placeholder="Select faculty"
          />
        </div>

        {/* Modules */}
        <div className="flex flex-col border border-[#e8e8e0] rounded-[10px] overflow-hidden">
          {MODULES.map((m) => (
            <div
              key={m}
              className="flex items-center justify-between px-4 md:px-5 py-4.5 border-b border-[#f0f0e8] last:border-0 gap-3"
            >
              <span className="text-sm md:text-base text-[#1c5332] flex-1">{m}</span>
              <Toggle on={modules[m]} onToggle={() => toggleModule(m)} />
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full h-13 text-white rounded-[10px] text-base font-bold transition-all cursor-pointer ${
            saved ? "bg-[#2d8a50]" : "bg-[#1c5332] hover:bg-[#154026]"
          }`}
        >
          {saved ? "✓ Saved!" : "Save AI Settings"}
        </button>

      </div>
    </div>
  );
}