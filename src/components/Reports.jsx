import { useState, useMemo } from "react";

// ─────────────── Mock Data ───────────────
const ALL_REPORTS = Array.from({ length: 50 }, (_, i) => {
  const students = [
    { name: "Sara Ahmed Ali",  email: "sara.a@university.edu",  violations: 0,  score: "45/50", status: "Passed",    vList: [] },
    { name: "Ali Ahmed Ali",   email: "ali.a@university.edu",   violations: 4,  score: "26/50", status: "Suspected", vList: ["Tab Switch","Multiple Faces","Object Detection","Face Not Detected"] },
    { name: "Alaa Ali Sami",   email: "alaa.a@university.edu",  violations: 3,  score: "30/50", status: "Suspected", vList: ["Tab Switch","Multiple Faces","Object Detection"] },
    { name: "Mai Ali Alaa",    email: "mai.a@university.edu",   violations: 1,  score: "35/50", status: "Suspected", vList: ["Face Not Detected"] },
  ];
  const s = students[i % students.length];
  return {
    id: i + 1,
    student: s.name,
    email: s.email,
    exam: "Data Structures Final",
    date: "10/24/2025",
    violations: s.violations,
    score: s.score,
    status: s.status,
    vList: s.vList,
    duration: "120 min",
  };
});

const VIOLATION_TIMES = {
  "Tab Switch":        "Detected at 30 min",
  "Multiple Faces":    "Detected at 90 min",
  "Object Detection":  "Detected at 50 min",
  "Face Not Detected": "Detected at 105 min",
};

const PAGE_SIZE = 10;

// ─────────────── Icons ───────────────
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const WarnIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C5332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

// ─────────────── Status Badge ───────────────
function StatusBadge({ status }) {
  const styles = {
    Passed:    "text-[#1C5332] bg-[#EAF5EE]",
    Suspected: "text-[#e53e3e] bg-[#FFF0F0]",
    Failed:    "text-[#888]    bg-[#F5F5F5]",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${styles[status] || styles.Failed}`}>
      {status}
    </span>
  );
}

// ─────────────── Details Modal ───────────────
function DetailsModal({ report, onClose }) {
  if (!report) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#FFFAFA] rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 relative">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-[#888] hover:text-[#1a1a1a]">
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="text-[16px] font-bold text-[#1a1a1a]">Reports Details</h2>
        <p className="text-[12px] text-[#888] mt-0.5 mb-5">{report.student} – {report.exam}</p>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-y-4 mb-5">
          <div>
            <p className="text-[12px] font-bold text-[#1a1a1a] mb-1">Student</p>
            <p className="text-[13px] text-[#1a1a1a]">{report.student}</p>
            <p className="text-[12px] text-[#888]">{report.email}</p>
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#1a1a1a] mb-1">Exam</p>
            <p className="text-[13px] text-[#1a1a1a]">{report.exam}</p>
            <p className="text-[12px] text-[#888]">{report.duration}</p>
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#1a1a1a] mb-1">Date</p>
            <p className="text-[13px] text-[#1a1a1a]">{report.date}</p>
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#1a1a1a] mb-1">Score</p>
            <p className="text-[13px] text-[#1a1a1a]">{report.score}</p>
          </div>
        </div>

        {/* Violations */}
        <p className="text-[14px] font-bold text-[#1a1a1a] mb-3">
          Violations ({report.violations})
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {report.violations === 0 ? (
            <div className="flex items-center gap-2 bg-[#EAF5EE] border border-[#C3E6D0] rounded-xl px-4 py-3">
              <CheckCircleIcon />
              <span className="text-[13px] font-semibold text-[#1C5332]">No violation detection</span>
            </div>
          ) : (
            report.vList.map((v, i) => (
              <div key={i} className="bg-[#FFF0F0] border border-[#FFCCCC] rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <WarnIcon />
                  <span className="text-[13px] font-semibold text-[#e53e3e]">{v}</span>
                </div>
                <p className="text-[11px] text-[#888] mt-0.5 ml-5">{VIOLATION_TIMES[v] || ""}</p>
              </div>
            ))
          )}
        </div>

        {/* Download */}
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#1C5332] hover:bg-[#174428] text-white text-[13px] font-semibold rounded-xl transition-colors cursor-pointer">
          <DownloadIcon /> Download Report
        </button>
      </div>
    </div>
  );
}

// ─────────────── Main Reports Page ───────────────
export default function Reports() {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("All Status");
  const [page, setPage]           = useState(1);
  const [jumpPage, setJumpPage]   = useState("");
  const [selected, setSelected]   = useState(null);

  // Filter
  const filtered = useMemo(() => {
    return ALL_REPORTS.filter(r => {
      const matchSearch =
        r.student.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.exam.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All Status" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goTo = (p) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    setPage(clamped);
  };

  // Pagination numbers
  const pageNums = () => {
    const nums = [];
    for (let i = 1; i <= Math.min(totalPages, 8); i++) nums.push(i);
    return nums;
  };

  return (
    <div className="p-5 md:p-8 bg-[#FFFAFA] min-h-full">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a1a]">Exam Reports</h1>
          <p className="text-[13px] text-[#888] mt-0.5">View and analyze exam session and violations and Cheating reports</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1C5332] hover:bg-[#174428] text-white text-[13px] font-semibold rounded-xl transition-colors shrink-0 cursor-pointer">
          <ExportIcon /> Export All Reports
        </button>
      </div>

      {/* ── Session Reports card ── */}
      <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden">
        {/* Card header */}
        <div className="px-6 pt-5 pb-4">
          <h2 className="text-[16px] font-bold text-[#1a1a1a] mb-4">Session Reports</h2>

          {/* Search + filter row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 flex items-center gap-2 border border-[#E0E0E0] rounded-xl px-3 py-2.5 bg-[#F7F7F5] focus-within:border-[#1C5332] transition-colors">
              <span className="text-[#BBBBBB] shrink-0"><SearchIcon /></span>
              <input
                type="text"
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#BBBBBB]"
                placeholder="Search by student name, email, or exam title..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <div className="flex items-center gap-2 border border-[#E0E0E0] rounded-xl px-3 py-2.5 bg-white min-w-37.5">
                <FilterIcon />
                <select
                  className="flex-1 bg-transparent text-[13px] outline-none cursor-pointer appearance-none pr-5"
                  value={statusFilter}
                  onChange={e => { setStatus(e.target.value); setPage(1); }}
                >
                  {["All Status", "Passed", "Suspected", "Failed"].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888] text-[11px]">▾</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="border-y border-[#F0F0F0] bg-[#FAFAFA]">
                {["Student","Email","Exam","Date","Violations","Score","Status","Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-[#1a1a1a] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-[#888]">No results found.</td>
                </tr>
              ) : (
                paginated.map((r, i) => (
                  <tr key={r.id} className={`border-b border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors ${i % 2 === 0 ? "" : ""}`}>
                    <td className="px-4 py-3 font-medium text-[#1a1a1a] whitespace-nowrap">{r.student}</td>
                    <td className="px-4 py-3 text-[#555] whitespace-nowrap">{r.email}</td>
                    <td className="px-4 py-3 text-[#555] whitespace-nowrap">{r.exam}</td>
                    <td className="px-4 py-3 text-[#555] whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon />{r.date}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.violations === 0 ? (
                        <span className="text-[#888]">0</span>
                      ) : (
                        <span className="flex items-center gap-1 text-[#e53e3e] font-semibold">
                          <WarnIcon />{r.violations}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#555]">{r.score}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(r)}
                        className="flex items-center gap-1.5 text-[#1C5332] font-semibold hover:underline cursor-pointer whitespace-nowrap"
                      >
                        <EyeIcon /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#F0F0F0]">
          {/* Count */}
          <span className="text-[12px] text-[#888]">
            {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()}
          </span>

          {/* Page buttons */}
          <div className="flex items-center gap-1 flex-wrap justify-center">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium border border-[#E0E0E0] disabled:opacity-40 hover:bg-[#F0F0F0] transition-colors cursor-pointer"
            >
              ‹ Back
            </button>

            {pageNums().map((n, idx) => {
              if (n > 5 && idx === 5) return <span key="dots" className="px-1 text-[#888]">···</span>;
              if (n > 5 && idx > 5)   return null;
              return (
                <button
                  key={n}
                  onClick={() => goTo(n)}
                  className={`w-8 h-8 rounded-lg text-[12px] font-medium transition-colors cursor-pointer
                    ${page === n ? "bg-[#1C5332] text-white" : "border border-[#E0E0E0] hover:bg-[#F0F0F0] text-[#1a1a1a]"}`}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium border border-[#E0E0E0] disabled:opacity-40 hover:bg-[#F0F0F0] transition-colors cursor-pointer"
            >
              Next ›
            </button>
          </div>

          {/* Jump to page */}
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[#888]">Page</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              className="w-14 border border-[#E0E0E0] rounded-lg px-2 py-1.5 text-center text-[12px] outline-none focus:border-[#1C5332]"
              value={jumpPage}
              onChange={e => setJumpPage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && goTo(Number(jumpPage))}
            />
            <button
              onClick={() => goTo(Number(jumpPage))}
              className="px-3 py-1.5 bg-[#1C5332] text-white rounded-lg font-semibold hover:bg-[#174428] transition-colors cursor-pointer"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* ── Details Modal ── */}
      <DetailsModal report={selected} onClose={() => setSelected(null)} />
    </div>
  );
}