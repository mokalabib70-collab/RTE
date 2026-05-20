import { useState } from "react";

const UNIVERSITIES = [
  "Alexandria University",
  "Beni suef University",
  "Cairo University",
  "Fayoum University",
  "Ain Shams University",
];

const MOCK = [
  { id: "87525992",  name: "Faculty of Engineering",     university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "85692792",  name: "Faculty of computer and AI", university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "97625992",  name: "Faculty of science",         university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "35325992",  name: "Faculty of Law",             university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "75365992",  name: "Faculty of Medicine",        university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "143682792", name: "Faculty of pharmacy",        university: "Fayoum University",     createdAt: "12/17/2025" },
  { id: "87525993",  name: "Faculty of Engineering",     university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "85692793",  name: "Faculty of computer and AI", university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "97625993",  name: "Faculty of science",         university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "35325993",  name: "Faculty of Law",             university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "75365993",  name: "Faculty of Medicine",        university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "143682793", name: "Faculty of pharmacy",        university: "Fayoum University",     createdAt: "12/17/2025" },
  { id: "87525994",  name: "Faculty of Engineering",     university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "85692794",  name: "Faculty of computer and AI", university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "97625994",  name: "Faculty of science",         university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "35325994",  name: "Faculty of Law",             university: "Alexandria University", createdAt: "12/17/2025" },
  { id: "75365994",  name: "Faculty of Medicine",        university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "143682794", name: "Faculty of pharmacy",        university: "Fayoum University",     createdAt: "12/17/2025" },
  { id: "75365995",  name: "Faculty of Medicine",        university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "75365996",  name: "Faculty of Medicine",        university: "Beni suef University",  createdAt: "12/17/2025" },
  { id: "75365997",  name: "Faculty of Medicine",        university: "Beni suef University",  createdAt: "12/17/2025" },
];

const PER_PAGE = 10;

function UniDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-11 border border-[#d8d8d0] rounded-lg px-3.5 bg-white text-sm flex items-center justify-between gap-2 hover:border-[#1c5332] transition-colors cursor-pointer"
      >
        <span style={{ color: value ? "#1a1a1a" : "#bbb" }}>
          {value || "Select university"}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-[#d8d8d0] rounded-lg z-50 shadow-lg overflow-hidden">
          {UNIVERSITIES.map((u, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { onChange(u); setOpen(false); }}
              className={`w-full px-3.5 py-2.5 text-sm text-left border-b border-[#f0f0e8] last:border-0 hover:bg-[#f5f5f0] transition-colors cursor-pointer ${
                value === u ? "text-[#1c5332] font-semibold" : "text-[#1a1a1a]"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FacultyModal({ mode, faculty, onSave, onClose }) {
  const [name,       setName]       = useState(faculty?.name       || "");
  const [university, setUniversity] = useState(faculty?.university || "");
  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, university });
  };

  return (
    <div
      className="fixed inset-0 bg-black/35 z-100 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#fffafa] rounded-2xl p-6 sm:p-8 md:p-9 w-full max-w-175 max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-xl md:text-[22px] font-bold mb-6 md:mb-7 ${isEdit ? "text-[#2563eb]" : "text-[#1c5332]"}`}>
          {isEdit ? "Edit Faculty" : "Faculty University"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-7 md:mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#1a1a1a]">Faculty name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 border border-[#d8d8d0] rounded-lg px-3.5 text-sm text-[#1a1a1a] bg-white outline-none focus:border-[#1c5332] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#1a1a1a]">Select University</label>
              <UniDropdown value={university} onChange={setUniversity} />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              type="submit"
              className="h-12 px-8 bg-[#1c5332] text-[#fffafa] rounded-[10px] text-sm md:text-[15px] font-bold hover:opacity-90 transition-opacity cursor-pointer flex-1 sm:flex-none"
            >
              {isEdit ? "Save Edit" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-12 px-8 bg-[#8c8c8c] text-[#fffafa] rounded-[10px] text-sm md:text-[15px] font-bold hover:opacity-90 transition-opacity cursor-pointer flex-1 sm:flex-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function FacultiesPage() {
  const [data,   setData]   = useState(MOCK);
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);
  const [modal,  setModal]  = useState(null);

  const filtered = data.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.university.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (values) => {
    if (modal.mode === "create") {
      setData([{ id: Date.now().toString(), ...values, createdAt: new Date().toLocaleDateString() }, ...data]);
    } else {
      setData(data.map((f) => f.id === modal.faculty.id ? { ...f, ...values } : f));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this faculty?")) setData(data.filter((f) => f.id !== id));
  };

  return (
    <div className="grid gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] md:text-[26px] lg:text-[28px] font-bold text-[#1a1a1a]">
          Faculties
        </h1>
        <button
          onClick={() => setModal({ mode: "create" })}
          className="bg-[#1c5332] border border-[#1a1a1a] rounded-lg px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-[#fffafa] hover:bg-[#154026] transition-colors cursor-pointer whitespace-nowrap"
        >
          Create Faculty
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2.5 bg-white border border-[#e0e0d8] rounded-[10px] px-4 py-2.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          placeholder="Search by Faculty name or University"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 border-none outline-none text-sm text-[#1a1a1a] bg-transparent placeholder:text-[#bbb]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#e8e8e0] overflow-hidden mt-2.5 overflow-x-auto">
        <table className="w-full border-collapse text-[13px] lg:text-sm min-w-105">
          <thead>
            <tr className="border-b-[1.5px] border-[#e8e8e0]">
              {["ID", "Faculty", "University", "Created At", "Actions"].map((h) => (
                <th key={h} className="px-3 md:px-4 py-3 md:py-3.5 text-center font-semibold text-[#333] bg-[#fdfdfd] border border-[#e0e0d8] whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.id} className="hover:[&>td]:bg-[#fafaf5]">
                {[f.id, f.name, f.university, f.createdAt].map((val, i) => (
                  <td key={i} className="px-3 md:px-4 py-2.5 text-[#444] text-center border border-[#e0e0d8] text-[12.5px] lg:text-[13px]">
                    {val}
                  </td>
                ))}
                <td className="px-3 md:px-4 py-2.5 text-center border border-[#e0e0d8]">
                  <div className="flex gap-1.5 justify-center flex-wrap">
                    <button
                      onClick={() => setModal({ mode: "edit", faculty: f })}
                      className="px-3 py-1 bg-[#2563eb] text-white text-[11px] md:text-xs font-semibold rounded-[5px] hover:opacity-85 transition-opacity cursor-pointer whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="px-3 py-1 bg-[#ff5656] text-white text-[11px] md:text-xs font-semibold rounded-[5px] hover:opacity-85 transition-opacity cursor-pointer whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1.5 py-2 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="w-7.5 md:w-8.5 h-7.5 md:h-8.5 border border-[#e0e0d8] rounded-md bg-white flex items-center justify-center text-[#555] hover:border-[#1c5332] hover:text-[#1c5332] transition-all disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-7.5 md:w-8.5 h-7.5 md:h-8.5 border rounded-md text-xs md:text-sm flex items-center justify-center transition-all cursor-pointer ${
              page === i + 1
                ? "bg-[#1c5332] text-white border-[#1c5332]"
                : "bg-white border-[#e0e0d8] text-[#555] hover:border-[#1c5332] hover:text-[#1c5332]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="w-7.5 md:w-8.5 h-7.5 md:h-8.5 border border-[#e0e0d8] rounded-md bg-white flex items-center justify-center text-[#555] hover:border-[#1c5332] hover:text-[#1c5332] transition-all disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <FacultyModal
          mode={modal.mode}
          faculty={modal.faculty}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}