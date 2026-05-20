import { useState } from "react";

const MOCK = [
  { id: "1763387525992", name: "Alexandria University",  location: "Alexandria", city: "Alexandria", country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1863389525992", name: "Beni suef University",   location: "Beni suef",  city: "Beni suef",  country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "3363387525992", name: "Cairo University",       location: "Giza",       city: "Giza",       country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "2763387525992", name: "Fayoum University",      location: "Fayoum",     city: "Fayoum",     country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1763387525993", name: "Ain Shams University",   location: "Cairo",      city: "Cairo",      country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1863389525993", name: "Beni suef University",   location: "Beni suef",  city: "Beni suef",  country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "3363387525993", name: "Cairo University",       location: "Giza",       city: "Giza",       country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "2763387525993", name: "Fayoum University",      location: "Fayoum",     city: "Fayoum",     country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1763387525994", name: "Alexandria University",  location: "Alexandria", city: "Alexandria", country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "1863389525994", name: "Beni suef University",   location: "Beni suef",  city: "Beni suef",  country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "3363387525994", name: "Cairo University",       location: "Giza",       city: "Giza",       country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
  { id: "2763387525994", name: "Fayoum University",      location: "Fayoum",     city: "Fayoum",     country: "Egypt", faculties: 0, createdAt: "11/17/2025" },
];

const PER_PAGE = 10;

function UniversityModal({ mode, uni, onSave, onClose }) {
  const [name,     setName]     = useState(uni?.name     || "");
  const [location, setLocation] = useState(uni?.location || "");
  const [city,     setCity]     = useState(uni?.city     || "");
  const [country,  setCountry]  = useState(uni?.country  || "");

  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, location, city, country });
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#fffafa] rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-2xl font-bold mb-7 ${isEdit ? "text-blue-600" : "text-[#1c5332]"}`}>
          {isEdit ? "Edit University" : "Create University"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {[
              { label: "University name", value: name,     setter: setName },
              { label: "Location",        value: location, setter: setLocation },
              { label: "City",            value: city,     setter: setCity },
              { label: "Country",         value: country,  setter: setCountry },
            ].map(({ label, value, setter }) => (
              <div key={label} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-800">{label}</label>
                <input
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-800 bg-white outline-none focus:border-[#1c5332] transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              type="submit"
              className="h-12 px-8 bg-[#1c5332] hover:bg-[#154026] text-white text-sm font-bold rounded-xl transition-opacity"
            >
              {isEdit ? "Save Edits" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-12 px-8 bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold rounded-xl transition-opacity"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UniversitiesPage() {
  const [data,   setData]   = useState(MOCK);
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);
  const [modal,  setModal]  = useState(null);

  const filtered = data.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.city.toLowerCase().includes(search.toLowerCase()) ||
    u.country.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (values) => {
    if (modal.mode === "create") {
      setData([{ id: Date.now().toString(), ...values, faculties: 0, createdAt: new Date().toLocaleDateString() }, ...data]);
    } else {
      setData(data.map((u) => u.id === modal.uni.id ? { ...u, ...values } : u));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this university?")) setData(data.filter((u) => u.id !== id));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Universities</h1>
        <button
          onClick={() => setModal({ mode: "create" })}
          className="bg-[#1c5332] hover:bg-[#154026] text-white text-sm font-semibold px-5 py-2.5 rounded-lg border border-gray-900 transition-colors whitespace-nowrap cursor-pointer"
        >
          Create University
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="flex-1 border-none outline-none text-sm text-gray-800 bg-transparent placeholder-gray-400"
          placeholder="Search by University name, City or Country"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-sm min-w-125">
          <thead>
            <tr className="border-b-2 border-gray-200">
              {["ID", "University", "Location", "City", "Country", "Faculties", "Created At", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-center font-semibold text-gray-700 bg-gray-50 border border-gray-200 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-center text-xs text-gray-600 border border-gray-200">{u.id}</td>
                <td className="px-4 py-2.5 text-center text-xs text-gray-600 border border-gray-200">{u.name}</td>
                <td className="px-4 py-2.5 text-center text-xs text-gray-600 border border-gray-200">{u.location}</td>
                <td className="px-4 py-2.5 text-center text-xs text-gray-600 border border-gray-200">{u.city}</td>
                <td className="px-4 py-2.5 text-center text-xs text-gray-600 border border-gray-200">{u.country}</td>
                <td className="px-4 py-2.5 text-center text-xs text-gray-600 border border-gray-200">{u.faculties}</td>
                <td className="px-4 py-2.5 text-center text-xs text-gray-600 border border-gray-200">{u.createdAt}</td>
                <td className="px-4 py-2.5 text-center border border-gray-200">
                  <div className="flex gap-1.5 justify-center flex-wrap">
                    <button
                      onClick={() => setModal({ mode: "edit", uni: u })}
                      className="px-3 py-1 bg-blue-600 hover:opacity-85 text-white text-xs font-semibold rounded cursor-pointer transition-opacity whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="px-3 py-1 bg-red-500 hover:opacity-85 text-white text-xs font-semibold rounded cursor-pointer transition-opacity whitespace-nowrap"
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
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md bg-white text-gray-600 hover:border-[#1c5332] hover:text-[#1c5332] disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 flex items-center justify-center border rounded-md text-sm font-medium transition-all cursor-pointer
              ${page === i + 1
                ? "bg-[#1c5332] text-white border-[#1c5332]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#1c5332] hover:text-[#1c5332]"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md bg-white text-gray-600 hover:border-[#1c5332] hover:text-[#1c5332] disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <UniversityModal
          mode={modal.mode}
          uni={modal.uni}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}