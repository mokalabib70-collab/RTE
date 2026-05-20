import { useState } from "react";

const courses = [
  { id: 1, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
  { id: 2, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
  { id: 3, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
  { id: 4, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
  { id: 5, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
];

const allStudents = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  student: "Sara Ahmed Ali",
  email: "sara.a@university.edu",
  course: "Data Structures Final",
  examsTaken: 0,
  level: 3,
  actions: 0,
}));

const CARDS_PER_PAGE = 3;
const STUDENTS_PER_PAGE = 16;

export default function CoursesContent() {
  const [cardPage, setCardPage] = useState(0);
  const [studentPage, setStudentPage] = useState(0);
  const [search, setSearch] = useState("");

  const totalCardPages = Math.ceil(courses.length / CARDS_PER_PAGE);
  const visibleCourses = courses.slice(
    cardPage * CARDS_PER_PAGE,
    cardPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const filtered = allStudents.filter(
    (s) =>
      s.student.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );
  const totalStudentPages = Math.ceil(filtered.length / STUDENTS_PER_PAGE);
  const visibleStudents = filtered.slice(
    studentPage * STUDENTS_PER_PAGE,
    studentPage * STUDENTS_PER_PAGE + STUDENTS_PER_PAGE
  );

  const exportData = () => {
    const rows = filtered
      .map((s) => `${s.student} | ${s.email} | ${s.course} | ${s.examsTaken} | ${s.level}`)
      .join("\n");
    const content = `TRUTHEYE - COURSES REPORT\nGenerated: ${new Date().toLocaleDateString()}\n${"=".repeat(70)}\nStudent | Email | Course | Exams Taken | Level\n${"-".repeat(70)}\n${rows}\n${"=".repeat(70)}\nTotal: ${filtered.length}\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TruthEye_Courses_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="font-[Poppins] flex flex-col gap-5 w-full max-w-full overflow-x-hidden">

      {/* ---- Courses Cards Section ---- */}
      <div className="bg-[#fffafa] rounded-xl border border-[#e8e8e0] p-6 pb-4 relative">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
          {visibleCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-[#e0e0d8] rounded-[10px] p-5 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:text-center"
            >
              <h2 className="text-[26px] font-bold text-[#1a1a1a] mb-1">{course.code}</h2>
              <p className="text-sm text-[#888] mb-3">{course.name}</p>
              <p className="text-sm text-[#444] mb-1 max-sm:w-full max-sm:flex max-sm:justify-between max-sm:border-b max-sm:border-dashed max-sm:border-[#eee] max-sm:py-1">
                <span>Students:</span> <strong className="font-bold text-[#1a1a1a]">{course.students}</strong>
              </p>
              <p className="text-sm text-[#444] mb-1 max-sm:w-full max-sm:flex max-sm:justify-between max-sm:border-b max-sm:border-dashed max-sm:border-[#eee] max-sm:py-1">
                <span>Semester:</span> <strong className="font-bold text-[#1a1a1a]">{course.semester}</strong>
              </p>
            </div>
          ))}
        </div>

        {/* Cards Nav */}
        <div className="flex justify-between items-center">
          <button
            className="w-9 h-9 border border-[#d0d0c8] rounded-lg bg-white text-lg text-[#555] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f0f0e8] disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => setCardPage((p) => Math.max(0, p - 1))}
            disabled={cardPage === 0}
          >
            ‹
          </button>
          <button
            className="w-9 h-9 border border-[#d0d0c8] rounded-lg bg-white text-lg text-[#555] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f0f0e8] disabled:opacity-30 disabled:cursor-not-allowed ml-auto"
            onClick={() => setCardPage((p) => Math.min(totalCardPages - 1, p + 1))}
            disabled={cardPage >= totalCardPages - 1}
          >
            ›
          </button>
        </div>
      </div>

      {/* ---- Students Table Section ---- */}
      <div className="bg-[#fffafa] rounded-xl border border-[#e8e8e0] px-6 pt-5 pb-4">

        {/* Filters Row */}
        <div className="flex max-sm:flex-col items-center gap-2.5 mb-4">
          {/* Search */}
          <div className="flex-1 max-sm:w-full flex items-center gap-2.5 border border-[#d0d0c8] rounded-lg px-3.5 h-11 bg-[#fafaf8]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by student name, email, or exam title..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setStudentPage(0); }}
              className="border-none bg-transparent outline-none font-[Poppins] text-[13px] text-[#1a1a1a] w-full placeholder:text-[#aaa]"
            />
          </div>

          {/* Filter Button */}
          <button className="max-sm:w-full w-11 h-11 border border-[#d0d0c8] rounded-lg bg-[#fafaf8] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f0f0e8]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
          </button>

          {/* Export Button */}
          <button
            onClick={exportData}
            className="flex items-center gap-1.5 bg-[#1c5332] text-white border-none rounded-lg px-4.5 h-11 font-[Poppins] text-[13px] font-semibold cursor-pointer whitespace-nowrap transition-colors hover:bg-[#154026]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export As
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch] rounded-lg border border-[#e8e8e0]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {["Student", "Email", "Course", "Exams Taken", "Level", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-center px-3.5 py-2.75 font-semibold text-[#1a1a1a] border-b border-[#e8e8e0] whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleStudents.map((s) => (
                <tr key={s.id} className="last:[&>td]:border-b-0">
                  <td className="px-3.5 py-2.5 text-[#555] border-b border-[#f0f0e8] text-center">{s.student}</td>
                  <td className="px-3.5 py-2.5 text-[#555] border-b border-[#f0f0e8] text-center">{s.email}</td>
                  <td className="px-3.5 py-2.5 text-[#555] border-b border-[#f0f0e8] text-center">{s.course}</td>
                  <td className="px-3.5 py-2.5 text-[#555] border-b border-[#f0f0e8] text-center">{s.examsTaken}</td>
                  <td className="px-3.5 py-2.5 text-[#555] border-b border-[#f0f0e8] text-center">{s.level}</td>
                  <td className="px-3.5 py-2.5 text-[#555] border-b border-[#f0f0e8] text-center">{s.actions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Nav */}
        <div className="flex justify-between mt-3">
          <button
            className="w-9 h-9 border border-[#d0d0c8] rounded-lg bg-white text-lg text-[#555] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f0f0e8] disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => setStudentPage((p) => Math.max(0, p - 1))}
            disabled={studentPage === 0}
          >
            ‹
          </button>
          <button
            className="w-9 h-9 border border-[#d0d0c8] rounded-lg bg-white text-lg text-[#555] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f0f0e8] disabled:opacity-30 disabled:cursor-not-allowed ml-auto"
            onClick={() => setStudentPage((p) => Math.min(totalStudentPages - 1, p + 1))}
            disabled={studentPage >= totalStudentPages - 1}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}