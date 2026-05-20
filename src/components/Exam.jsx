import { useState } from "react";

// ── Icons ──
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C5332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const QuestionIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const StudentsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ── Shared input styles ──
const inputCls = "w-full border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-sm text-[#1a1a1a] bg-[#F7F7F5] outline-none focus:border-[#1C5332] focus:bg-white transition-colors placeholder:text-[#BBBBBB]";
const labelCls = "block text-[13px] font-semibold text-[#1a1a1a] mb-1.5";

// ── Question type options ──
const QUESTION_TYPES = ["Multiple Choice", "True or False", "Essay"];

// ── Empty question form default ──
const emptyQuestion = () => ({
  id: Date.now(),
  text: "",
  type: "",
  score: "",
  options: ["", "", "", ""],
  essayAnswer: "",
});

// ── Modal: Add / Edit Question ──
function QuestionModal({ initial, onSave, onClose }) {
  const [q, setQ] = useState(
    initial ?? { text: "", type: "Multiple Choice", score: "", options: ["", "", "", ""], essayAnswer: "" }
  );

  const setField = (k, v) => setQ((p) => ({ ...p, [k]: v }));
  const setOption = (i, v) =>
    setQ((p) => { const o = [...p.options]; o[i] = v; return { ...p, options: o }; });

  const canSave = q.text.trim() && q.type && q.score !== "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-7 relative">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-[#888] hover:text-[#1a1a1a] transition-colors">
          <CloseIcon />
        </button>

        {/* Question Text */}
        <div className="mb-5">
          <label className={labelCls}>Question Text</label>
          <textarea
            className={`${inputCls} resize-none h-28`}
            placeholder="Write Question Here..."
            value={q.text}
            onChange={(e) => setField("text", e.target.value)}
          />
        </div>

        {/* Type + Score */}
        <div className="flex gap-4 mb-5">
          <div className="flex-1">
            <label className={labelCls}>Question Type</label>
            <div className="relative">
              <select
                className={`${inputCls} appearance-none pr-10 cursor-pointer`}
                value={q.type}
                onChange={(e) => setField("type", e.target.value)}
              >
                <option value="">Select Question Type</option>
                {QUESTION_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><ChevronIcon /></span>
            </div>
          </div>
          <div className="w-36">
            <label className={labelCls}>Score</label>
            <input
              type="number"
              min="0"
              className={inputCls}
              value={q.score}
              onChange={(e) => setField("score", e.target.value)}
            />
          </div>
        </div>

        {/* Options — Multiple Choice */}
        {q.type === "Multiple Choice" && (
          <div className="mb-5">
            <label className={labelCls}>Options</label>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  className={inputCls}
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => setOption(i, e.target.value)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Options — True or False */}
        {q.type === "True or False" && (
          <div className="mb-5">
            <label className={labelCls}>Options</label>
            <div className="flex flex-col gap-2">
              {["True", "False"].map((opt) => (
                <div key={opt} className={`${inputCls} cursor-default`}>{opt}</div>
              ))}
            </div>
          </div>
        )}

        {/* Essay answer box */}
        {q.type === "Essay" && (
          <div className="mb-5">
            <textarea
              className={`${inputCls} resize-none h-32`}
              placeholder="Type your answer here..."
              value={q.essayAnswer}
              onChange={(e) => setField("essayAnswer", e.target.value)}
            />
          </div>
        )}

        {/* Save */}
        <div className="flex justify-end">
          <button
            disabled={!canSave}
            onClick={() => canSave && onSave(q)}
            className={`px-7 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${
              canSave ? "bg-[#1C5332] hover:bg-[#174428] cursor-pointer" : "bg-[#1C5332]/40 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Rendered question card (preview) ──
function QuestionCard({ index, question, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[17px] font-bold text-[#1a1a1a]">Question {index + 1}</h3>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#555] font-medium">{question.score} Points</span>
          <button onClick={onEdit} className="hover:opacity-70 transition-opacity"><EditIcon /></button>
          <button onClick={onDelete} className="hover:opacity-70 transition-opacity"><DeleteIcon /></button>
        </div>
      </div>

      {/* Question text */}
      <p className="text-[14px] text-[#1a1a1a] font-medium mb-4">{question.text}</p>

      {/* Multiple choice */}
      {question.type === "Multiple Choice" && (
        <div className="flex flex-col gap-2">
          {question.options.filter(Boolean).map((opt, i) => (
            <div key={i} className="flex items-center gap-3 border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-sm text-[#1a1a1a]">
              <span className="w-4 h-4 rounded-full border-2 border-[#888] shrink-0" />
              {opt}
            </div>
          ))}
        </div>
      )}

      {/* True or False */}
      {question.type === "True or False" && (
        <div className="flex flex-col gap-2">
          {["True", "False"].map((opt) => (
            <div key={opt} className="flex items-center gap-3 border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-sm text-[#1a1a1a]">
              <span className="w-4 h-4 rounded-full border-2 border-[#888] shrink-0" />
              {opt}
            </div>
          ))}
        </div>
      )}

      {/* Essay */}
      {question.type === "Essay" && (
        <div className="border border-[#E0E0E0] rounded-xl px-4 py-3 min-h-25 text-sm text-[#BBBBBB] bg-[#F7F7F5]">
          {question.essayAnswer || "Type your answer here..."}
        </div>
      )}
    </div>
  );
}

// ── Inline question form (shown under exam info when no questions yet, or via Add Question) ──
function InlineQuestionForm({ onAdd }) {
  const [q, setQ] = useState({ text: "", type: "", score: "", options: ["", "", "", ""], essayAnswer: "" });

  const setField = (k, v) => setQ((p) => ({ ...p, [k]: v }));
  const setOption = (i, v) =>
    setQ((p) => { const o = [...p.options]; o[i] = v; return { ...p, options: o }; });

  const handleAdd = () => {
    if (!q.text.trim() || !q.type || q.score === "") return;
    onAdd({ ...q, id: Date.now() });
    setQ({ text: "", type: "", score: "", options: ["", "", "", ""], essayAnswer: "" });
  };

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6">
      {/* Question Text */}
      <div className="mb-5">
        <label className={labelCls}>Question Text</label>
        <textarea
          className={`${inputCls} resize-none h-28`}
          placeholder="Write Question Here..."
          value={q.text}
          onChange={(e) => setField("text", e.target.value)}
        />
      </div>

      {/* Type + Score */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className={labelCls}>Question Type</label>
          <div className="relative">
            <select
              className={`${inputCls} appearance-none pr-10 cursor-pointer`}
              value={q.type}
              onChange={(e) => setField("type", e.target.value)}
            >
              <option value="">Select Question Type</option>
              {QUESTION_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><ChevronIcon /></span>
          </div>
        </div>
        <div className="w-36">
          <label className={labelCls}>Score</label>
          <input
            type="number"
            min="0"
            className={inputCls}
            value={q.score}
            onChange={(e) => setField("score", e.target.value)}
          />
        </div>
      </div>

      {/* Options — Multiple Choice */}
      {q.type === "Multiple Choice" && (
        <div className="mb-4">
          <label className={labelCls}>Options</label>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => (
              <input
                key={i}
                className={inputCls}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => setOption(i, e.target.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Options — True or False */}
      {q.type === "True or False" && (
        <div className="mb-4">
          <label className={labelCls}>Options</label>
          <div className="flex flex-col gap-2">
            {["True", "False"].map((opt) => (
              <div key={opt} className={`${inputCls} cursor-default`}>{opt}</div>
            ))}
          </div>
        </div>
      )}

      {/* Essay */}
      {q.type === "Essay" && (
        <div className="mb-4">
          <textarea
            className={`${inputCls} resize-none h-32`}
            placeholder="Write answer Here..."
            value={q.essayAnswer}
            onChange={(e) => setField("essayAnswer", e.target.value)}
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleAdd}
          className="px-7 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1C5332] hover:bg-[#174428] cursor-pointer transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// ── Exam list card ──
function ExamListCard({ exam, onEdit, onAddQuestion, onDelete }) {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl px-6 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-2">{exam.title}</h3>
          <div className="flex items-center gap-5 text-[12px] text-[#555]">
            <span className="flex items-center gap-1.5"><CalendarIcon />{exam.date || "—"}</span>
            <span className="flex items-center gap-1.5"><ClockIcon />{exam.duration ? `${exam.duration} minutes` : "—"}</span>
            <span className="flex items-center gap-1.5"><QuestionIcon />{exam.questions.length} questions</span>
            <span className="flex items-center gap-1.5"><StudentsIcon />80 Student</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onEdit} className="hover:opacity-70 transition-opacity"><EditIcon /></button>
          <button onClick={onAddQuestion} className="hover:opacity-70 transition-opacity">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C5332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
          <button onClick={onDelete} className="hover:opacity-70 transition-opacity"><DeleteIcon /></button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  MAIN EXAM PAGE
// ══════════════════════════════════════════════
export default function Exam() {
  // "list" | "create" | "edit"
  const [view, setView] = useState("list");

  // Exam list
  const [exams, setExams] = useState([
    {
      id: 1,
      title: "Computer Science Midterm Exam",
      date: "10/24/2025",
      duration: "90",
      start: "09:00 AM",
      end: "10:30 AM",
      numQuestions: "25",
      course: "",
      questions: [
        { id: 10, text: "Which of the following is a programming language?", type: "Multiple Choice", score: "5", options: ["HTML", "Python", "CSS", "JSON"], essayAnswer: "" },
      ],
    },
    {
      id: 2,
      title: "Computer Science Midterm Exam",
      date: "10/24/2025",
      duration: "90",
      start: "09:00 AM",
      end: "10:30 AM",
      numQuestions: "25",
      course: "",
      questions: [],
    },
    {
      id: 3,
      title: "Computer Science Midterm Exam",
      date: "10/24/2025",
      duration: "90",
      start: "09:00 AM",
      end: "10:30 AM",
      numQuestions: "25",
      course: "",
      questions: [],
    },
  ]);

  // Active exam being created/edited
  const [activeExam, setActiveExam] = useState(null);

  // Modal state
  const [modal, setModal] = useState(null); // null | { mode: "add" | "edit", questionIndex?: number }

  // ── Helpers ──
  const openCreate = () => {
    setActiveExam({ id: null, title: "", date: "", duration: "", start: "", end: "", numQuestions: "", course: "", questions: [] });
    setView("create");
  };

  const openEdit = (exam) => {
    setActiveExam({ ...exam, questions: [...exam.questions] });
    setView("edit");
  };

  const setExamField = (k, v) => setActiveExam((p) => ({ ...p, [k]: v }));

  const handleAddQuestion = (q) => {
    setActiveExam((p) => ({ ...p, questions: [...p.questions, { ...q, id: Date.now() }] }));
  };

  const handleSaveEditedQuestion = (q) => {
    setActiveExam((p) => ({
      ...p,
      questions: p.questions.map((old) => (old.id === q.id ? q : old)),
    }));
    setModal(null);
  };

  const handleDeleteQuestion = (id) => {
    setActiveExam((p) => ({ ...p, questions: p.questions.filter((q) => q.id !== id) }));
  };

  const handleSaveExam = () => {
    if (!activeExam.title.trim()) return;
    if (activeExam.id) {
      setExams((prev) => prev.map((e) => (e.id === activeExam.id ? activeExam : e)));
    } else {
      setExams((prev) => [...prev, { ...activeExam, id: Date.now() }]);
    }
    setView("list");
    setActiveExam(null);
  };

  const handleDeleteExam = (id) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  // ── LIST VIEW ──
  if (view === "list") {
    return (
      <div className="p-6 md:p-8 min-h-full bg-[#FFFAFA]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-bold text-[#1a1a1a]">Exam Management</h1>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1C5332] text-white text-sm font-semibold rounded-xl hover:bg-[#174428] transition-colors"
          >
            Create Exam
          </button>
        </div>

        {/* Exam cards */}
        {exams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#BBBBBB]">
            <p className="text-[15px]">No exams yet. Create your first exam.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {exams.map((exam) => (
              <ExamListCard
                key={exam.id}
                exam={exam}
                onEdit={() => openEdit(exam)}
                onAddQuestion={() => openEdit(exam)}
                onDelete={() => handleDeleteExam(exam.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── CREATE / EDIT VIEW ──
  const isEdit = view === "edit";

  return (
    <div className="p-6 md:p-8 min-h-full bg-[#FFFAFA]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[20px] font-bold text-[#1a1a1a]">Create Exam</h1>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1C5332] text-white text-sm font-semibold rounded-xl hover:bg-[#174428] transition-colors"
        >
          <PlusIcon /> Add Question
        </button>
      </div>

      {/* Exam Info Card */}
      <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 mb-5">
        {/* Title */}
        <div className="mb-4">
          <label className={labelCls}>Exam Title</label>
          <input
            className={inputCls}
            value={activeExam.title}
            onChange={(e) => setExamField("title", e.target.value)}
            placeholder=""
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className={labelCls}>Course</label>
          <div className="relative">
            <select
              className={`${inputCls} appearance-none pr-10 cursor-pointer`}
              value={activeExam.course}
              onChange={(e) => setExamField("course", e.target.value)}
            >
              <option value="">Select Course</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Physics</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><ChevronIcon /></span>
          </div>
        </div>

        {/* Date / Duration / Start / End / Num */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div>
            <label className={labelCls}>Date</label>
            <div className="relative">
              <input
                type="date"
                className={`${inputCls} pl-9`}
                value={activeExam.date}
                onChange={(e) => setExamField("date", e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BBBBBB]"><CalendarIcon /></span>
            </div>
          </div>
          <div>
            <label className={labelCls}>Duration <span className="font-normal text-[#888]">(min)</span></label>
            <input
              type="number"
              min="0"
              className={inputCls}
              value={activeExam.duration}
              onChange={(e) => setExamField("duration", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Start</label>
            <div className="relative">
              <input
                type="time"
                className={`${inputCls} pr-9`}
                value={activeExam.start}
                onChange={(e) => setExamField("start", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>End</label>
            <div className="relative">
              <input
                type="time"
                className={`${inputCls} pr-9`}
                value={activeExam.end}
                onChange={(e) => setExamField("end", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Number of questions</label>
            <input
              type="number"
              min="0"
              className={inputCls}
              value={activeExam.numQuestions}
              onChange={(e) => setExamField("numQuestions", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Inline form — shown when no questions yet */}
      {activeExam.questions.length === 0 && (
        <InlineQuestionForm onAdd={handleAddQuestion} />
      )}

      {/* Question cards */}
      {activeExam.questions.length > 0 && (
        <div className="flex flex-col gap-4 mb-6">
          {activeExam.questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              index={i}
              question={q}
              onEdit={() => setModal({ mode: "edit", question: q })}
              onDelete={() => handleDeleteQuestion(q.id)}
            />
          ))}
        </div>
      )}

      {/* Save exam button (when there are questions) */}
      {activeExam.questions.length > 0 && (
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSaveExam}
            className="px-8 py-2.5 bg-[#1C5332] text-white text-sm font-semibold rounded-xl hover:bg-[#174428] transition-colors"
          >
            {isEdit ? "Update Exam" : "Save Exam"}
          </button>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <QuestionModal
          initial={modal.mode === "edit" ? modal.question : null}
          onSave={modal.mode === "edit" ? handleSaveEditedQuestion : (q) => { handleAddQuestion(q); setModal(null); }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}