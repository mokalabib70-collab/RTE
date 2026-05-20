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

const MOCK_ADMINS = [
  { id: 1, name: "Mona Said", phone: "01052006892", nationalId: "60709024401563" },
];

function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-11 border border-[#d8d8d0] rounded-lg px-3.5 bg-white text-sm flex items-center justify-between gap-2 hover:border-[#1c5332] transition-colors cursor-pointer"
      >
        <span style={{ color: value ? "#1a1a1a" : "#bbb" }}>
          {value || "Select an option"}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-[#d8d8d0] rounded-lg z-50 shadow-lg overflow-hidden">
          {options.map((o, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { onChange(o); setOpen(false); }}
              className={`w-full px-3.5 py-2.5 text-sm text-left border-b border-[#f0f0e8] last:border-0 hover:bg-[#f5f5f0] transition-colors cursor-pointer ${
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

export default function AdminsPage() {
  const [university, setUniversity] = useState("");
  const [faculty,    setFaculty]    = useState("");
  const [firstName,  setFirstName]  = useState("");
  const [lastName,   setLastName]   = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone,      setPhone]      = useState("");
  const [birthDay,   setBirthDay]   = useState("");
  const [admins,     setAdmins]     = useState(MOCK_ADMINS);

  const faculties = university ? (FACULTIES_MAP[university] || []) : [];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    setAdmins([...admins, {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      phone,
      nationalId,
    }]);
    setFirstName(""); setLastName(""); setNationalId(""); setPhone(""); setBirthDay("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this admin?")) setAdmins(admins.filter((a) => a.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 min-h-screen bg-[#f5f5f0]">

      {/* ── Left: Form ── */}
      <div className="flex-1 bg-[#fffafa] rounded-2xl border border-[#e8e8e0] p-6 md:p-8 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-6">
          Admin (per faculty)
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleCreate}>

          {/* University */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a1a1a]">Select University</label>
            <Dropdown
              value={university}
              onChange={(v) => { setUniversity(v); setFaculty(""); }}
              options={UNIVERSITIES}
            />
          </div>

          {/* Faculty */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a1a1a]">Select Faculty</label>
            <Dropdown
              value={faculty}
              onChange={setFaculty}
              options={faculties.length ? faculties : ["— Select University first —"]}
            />
          </div>

          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a1a1a]">First name</label>
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-11 border border-[#d8d8d0] rounded-lg px-3.5 text-sm text-[#1a1a1a] bg-white outline-none focus:border-[#1c5332] transition-colors placeholder:text-[#ccc]"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a1a1a]">Last name</label>
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-11 border border-[#d8d8d0] rounded-lg px-3.5 text-sm text-[#1a1a1a] bg-white outline-none focus:border-[#1c5332] transition-colors placeholder:text-[#ccc]"
            />
          </div>

          {/* National ID */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a1a1a]">National ID</label>
            <input
              placeholder="National ID"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="h-11 border border-[#d8d8d0] rounded-lg px-3.5 text-sm text-[#1a1a1a] bg-white outline-none focus:border-[#1c5332] transition-colors placeholder:text-[#ccc]"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a1a1a]">Phone</label>
            <input
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 border border-[#d8d8d0] rounded-lg px-3.5 text-sm text-[#1a1a1a] bg-white outline-none focus:border-[#1c5332] transition-colors placeholder:text-[#ccc]"
            />
          </div>

          {/* Birth Day */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#1a1a1a]">Birth Day</label>
            <input
              type="date"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className="h-11 border border-[#d8d8d0] rounded-lg px-3.5 text-sm text-[#1a1a1a] bg-white outline-none focus:border-[#1c5332] transition-colors"
            />
          </div>

          <p className="text-xs text-[#aaa] leading-relaxed -mt-1">
            Note: SuperAdmin creates accounts; faculty admins can change their own passwords after login.
          </p>

          <button
            type="submit"
            className="w-full h-12 bg-[#1c5332] text-white rounded-xl text-sm font-bold mt-1 hover:bg-[#154026] transition-colors cursor-pointer"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* ── Right: Existing admins ── */}
      <div className="w-full md:w-72 lg:w-80 shrink-0 bg-[#fffafa] rounded-2xl border border-[#e8e8e0] p-5 md:p-6 shadow-sm self-start">
        <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Existing Admin Accounts</h2>

        <div className="flex flex-col gap-3">
          {admins.length === 0 && (
            <p className="text-[#aaa] text-xs">No admins yet.</p>
          )}

          {admins.map((a) => (
            <div key={a.id} className="border border-[#e8e8e0] rounded-xl p-3.5 relative">
              <button
                onClick={() => handleDelete(a.id)}
                className="absolute top-2.5 right-2.5 bg-[#ff5656] text-white text-[11px] font-semibold rounded-md px-2.5 py-0.5 hover:bg-[#c94444] transition-colors cursor-pointer"
              >
                Delete
              </button>

              <p className="text-[17px] font-bold text-[#2563eb] mb-2 pr-12">{a.name}</p>

              <p className="text-sm font-bold text-[#1c5332] mt-1.5">Phone</p>
              <p className="text-[13px] text-[#444]">{a.phone}</p>

              <p className="text-sm font-bold text-[#1c5332] mt-1.5">National ID</p>
              <p className="text-[13px] text-[#444]">{a.nationalId}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}