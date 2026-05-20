import { useState, useRef, useEffect } from "react";

// ─────────────── Mock Data ───────────────
const STUDENTS = [
  { id: 1, name: "Sara Ahmed Ali",       avatar: null, initials: "SA", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "13:00", unread: 1 },
  { id: 2, name: "Alaa Ali Sami",        avatar: null, initials: "AA", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "13:30", unread: 1 },
  { id: 3, name: "Mai Ahmed Ali",        avatar: null, initials: "MA", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "1 days ago", unread: 0 },
  { id: 4, name: "Ahmed Mohammad Ali",   avatar: null, initials: "AM", lastMsg: "I understand now, thank you!", time: "2 days ago", unread: 0 },
];

const GROUPS = [
  { id: 101, name: "Quiz OS Group1",  initials: "QO", lastMsg: "Results will be posted tomorrow", time: "1 days ago", unread: 0 },
  { id: 102, name: "MM 501 Group5",   initials: "MM", lastMsg: "Assignment is due Friday",         time: "2 days ago", unread: 0 },
];

const MOCK_MESSAGES = {
  1:   [
    { id: 1, from: "them", text: "Hello Dr. Ahmed, I didn't understand question 5 on the last exam. Could you please explain?" },
    { id: 2, from: "me",   text: "Sure! Question 5 was about recursion. The key idea is that the function calls itself with a smaller input." },
    { id: 3, from: "them", text: "Oh I see, so it keeps calling until a base case is met?" },
    { id: 4, from: "me",   text: "Exactly! You got it." },
    { id: 5, from: "me",   text: "Let me know if you need more examples." },
  ],
  2:   [
    { id: 1, from: "them", text: "Dr. Ahmed, I also had trouble with question 5." },
    { id: 2, from: "me",   text: "No problem! Let's walk through it together." },
    { id: 3, from: "them", text: "Thank you so much!" },
    { id: 4, from: "me",   text: "Of course, always happy to help." },
    { id: 5, from: "me",   text: "Check the lecture slides on Chapter 7 too." },
  ],
  101: [
    { id: 1, from: "them", text: "When will the quiz results be posted?" },
    { id: 2, from: "me",   text: "Results will be posted tomorrow morning." },
    { id: 3, from: "them", text: "Thank you!" },
  ],
  102: [
    { id: 1, from: "me",   text: "Reminder: Assignment is due this Friday at midnight." },
    { id: 2, from: "them", text: "Got it, thank you Dr. Ahmed!" },
  ],
};

const STUDENT_OPTIONS = ["Sara Ahmed Ali", "Alaa Ali Sami", "Mai Ahmed Ali", "Ahmed Mohammad Ali"];
const GROUP_OPTIONS   = ["Quiz OS Group1", "MM 501 Group5", "CS 301 Group2"];

// ─────────────── Icons ───────────────
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const AttachIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);
const ImageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const EmojiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F3B300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const ChatBubbleIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#1C5332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
  </svg>
);

// ─────────────── Avatar ───────────────
function Avatar({ initials, size = "md" }) {
  const sz = size === "sm" ? "w-8 h-8 text-[11px]" : size === "lg" ? "w-11 h-11 text-[15px]" : "w-10 h-10 text-[13px]";
  return (
    <div className={`${sz} rounded-full bg-[#B0BEC5] flex items-center justify-center font-semibold text-white shrink-0`}>
      {initials}
    </div>
  );
}

// ─────────────── New Message Panel ───────────────
function NewMessagePanel({ onClose, onStart }) {
  const [type, setType]     = useState(""); // "student" | "group" | "all"
  const [selected, setSelected] = useState("");

  const handleStart = () => {
    if (type === "all") { onStart("all", null); return; }
    if (!selected) return;
    onStart(type, selected);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#1C5332]">
        <span className="text-white font-semibold text-[15px]">New Message</span>
        <button onClick={onClose} className="text-white hover:opacity-70 transition-opacity"><CloseIcon /></button>
      </div>

      <div className="flex flex-col gap-3 p-5">
        {/* Options */}
        {[
          { val: "student", label: "Specific Student" },
          { val: "group",   label: "Student Group"    },
          { val: "all",     label: "All Students"     },
        ].map(({ val, label }) => (
          <button
            key={val}
            onClick={() => { setType(val); setSelected(""); }}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-[14px] font-medium transition-all duration-150 cursor-pointer
              ${type === val
                ? "border-[#1C5332] bg-[#f0f7f3] text-[#1C5332]"
                : "border-[#E0E0E0] bg-white text-[#1a1a1a] hover:border-[#1C5332]/40"}`}
          >
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
              ${type === val ? "border-[#1C5332]" : "border-[#888]"}`}>
              {type === val && <span className="w-2 h-2 rounded-full bg-[#1C5332]" />}
            </span>
            {label}
          </button>
        ))}

        {/* All Students warning */}
        {type === "all" && (
          <div className="flex items-start gap-3 border border-[#F3B300] rounded-xl px-4 py-3 bg-[#FFFBEE]">
            <BellIcon />
            <div>
              <p className="text-[13px] font-semibold text-[#F3B300]">General Announcement</p>
              <p className="text-[12px] text-[#888] mt-0.5">This message will be sent to all students in your database</p>
            </div>
          </div>
        )}

        {/* Select Student */}
        {type === "student" && (
          <div>
            <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Select Student</p>
            <div className="relative">
              <select
                className="w-full border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-[13px] bg-[#F7F7F5] appearance-none outline-none focus:border-[#1C5332] cursor-pointer"
                value={selected}
                onChange={e => setSelected(e.target.value)}
              >
                <option value="">Choose..</option>
                {STUDENT_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">▾</span>
            </div>
          </div>
        )}

        {/* Select Group */}
        {type === "group" && (
          <div>
            <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Select Group</p>
            <div className="relative">
              <select
                className="w-full border border-[#E0E0E0] rounded-xl px-4 py-2.5 text-[13px] bg-[#F7F7F5] appearance-none outline-none focus:border-[#1C5332] cursor-pointer"
                value={selected}
                onChange={e => setSelected(e.target.value)}
              >
                <option value="">Choose..</option>
                {GROUP_OPTIONS.map(g => <option key={g}>{g}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">▾</span>
            </div>
          </div>
        )}

        {/* Start button */}
        {type && (
          <button
            onClick={handleStart}
            disabled={type !== "all" && !selected}
            className={`mt-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-colors
              ${(type === "all" || selected) ? "bg-[#1C5332] hover:bg-[#174428] cursor-pointer" : "bg-[#1C5332]/40 cursor-not-allowed"}`}
          >
            Start Chat
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────── Chat Window ───────────────
function ChatWindow({ chat, messages, onSend, onBack, isMobile }) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white border border-[#E8E8E8] rounded-2xl gap-4">
        <div className="w-24 h-24 rounded-full bg-[#EAF2ED] flex items-center justify-center">
          <ChatBubbleIcon />
        </div>
        <p className="text-[15px] font-semibold text-[#1a1a1a]">Start typing your message</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden min-h-0">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F0F0F0] shrink-0">
        {isMobile && (
          <button onClick={onBack} className="text-[#1C5332] mr-1"><BackIcon /></button>
        )}
        <Avatar initials={chat.initials} size="sm" />
        <span className="font-semibold text-[15px] text-[#1a1a1a]">{chat.name}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed
              ${msg.from === "me"
                ? "bg-[#B0C4BA] text-[#1a1a1a] rounded-br-sm"
                : "bg-[#EBEBEB] text-[#1a1a1a] rounded-bl-sm"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="shrink-0 border-t border-[#F0F0F0] px-4 py-3 flex items-center gap-3 bg-white">
        <button className="text-[#888] hover:text-[#1C5332] transition-colors"><AttachIcon /></button>
        <button className="text-[#888] hover:text-[#1C5332] transition-colors"><ImageIcon /></button>
        <button className="text-[#888] hover:text-[#1C5332] transition-colors"><EmojiIcon /></button>

        <input
          type="text"
          className="flex-1 bg-[#F7F7F5] border border-[#E8E8E8] rounded-xl px-4 py-2 text-[13px] outline-none focus:border-[#1C5332] transition-colors placeholder:text-[#BBBBBB]"
          placeholder="Type your message here..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="w-10 h-10 rounded-xl bg-[#1C5332] flex items-center justify-center text-white hover:bg-[#174428] transition-colors shrink-0"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

// ─────────────── Main Chat Page ───────────────
export default function Chat() {
  const [tab, setTab]               = useState("Students"); // "Students" | "Group"
  const [search, setSearch]         = useState("");
  const [activeChat, setActiveChat] = useState(null);       // { id, name, initials }
  const [showNew, setShowNew]       = useState(false);
  const [messages, setMessages]     = useState(MOCK_MESSAGES);
  const [showChatMobile, setShowChatMobile] = useState(false); // mobile: show chat pane

  const currentList = tab === "Students" ? STUDENTS : GROUPS;
  const filtered    = currentList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalUnread = STUDENTS.reduce((s, c) => s + c.unread, 0);
  const currentMsgs = activeChat ? (messages[activeChat.id] || []) : [];

  const handleSend = (text) => {
    if (!activeChat) return;
    const newMsg = { id: Date.now(), from: "me", text };
    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));
  };

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    setShowNew(false);
    setShowChatMobile(true);
  };

  const handleNewStart = (type, selected) => {
    if (type === "all") {
      const fake = { id: 999, name: "All Students", initials: "AS" };
      setMessages(prev => ({ ...prev, 999: [] }));
      setActiveChat(fake);
      setShowNew(false);
      setShowChatMobile(true);
    } else {
      const name = selected;
      const initials = name.split(" ").slice(0,2).map(w => w[0]).join("");
      const fake = { id: Date.now(), name, initials };
      setMessages(prev => ({ ...prev, [fake.id]: [] }));
      setActiveChat(fake);
      setShowNew(false);
      setShowChatMobile(true);
    }
  };

  return (
    <div className="h-full flex gap-4 p-4 md:p-6 bg-[#FFFAFA]">

      {/* ── LEFT PANEL: conversation list ──
           On mobile: hidden when chat is open */}
      <div className={`
        flex flex-col w-full md:w-75 lg:w-85 shrink-0
        bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden
        ${showChatMobile ? "hidden md:flex" : "flex"}
      `}>
        {/* Header */}
        <div className="bg-[#1C5332] px-5 pt-5 pb-3 shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white font-bold text-[17px]">Messages</span>
            <button
              onClick={() => { setShowNew(v => !v); setShowChatMobile(false); }}
              className="w-7 h-7 rounded-lg border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <PlusIcon />
            </button>
          </div>
          <p className="text-white/70 text-[12px] mb-3">{totalUnread} unread Messages</p>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2">
            <span className="text-[#BBBBBB]"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 text-[13px] outline-none placeholder:text-[#BBBBBB] bg-transparent"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E8E8E8] shrink-0">
          {["Students", "Group"].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setSearch(""); }}
              className={`flex-1 py-3 text-[13px] font-medium transition-colors
                ${tab === t
                  ? "border-b-2 border-[#1C5332] text-[#1C5332]"
                  : "text-[#888] hover:text-[#1a1a1a]"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-full py-16">
              <p className="text-[13px] font-semibold text-[#1a1a1a] italic">You have no chats yet.</p>
            </div>
          ) : (
            filtered.map(chat => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 border-b border-[#F5F5F5] text-left transition-colors cursor-pointer
                  ${activeChat?.id === chat.id ? "bg-[#F0F7F3]" : "hover:bg-[#FAFAFA]"}`}
              >
                <Avatar initials={chat.initials} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[13px] text-[#1a1a1a] truncate">{chat.name}</span>
                    <span className="text-[11px] text-[#888] shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-[12px] text-[#888] truncate mt-0.5">{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#1C5332] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL: new message OR chat window ── */}
      <div className={`
        flex-1 min-w-0 min-h-0
        ${!showChatMobile && !showNew ? "hidden md:flex" : "flex"}
      `}>
        {showNew ? (
          <div className="w-full md:max-w-[320px]">
            <NewMessagePanel
              onClose={() => setShowNew(false)}
              onStart={handleNewStart}
            />
          </div>
        ) : (
          <ChatWindow
            chat={activeChat}
            messages={currentMsgs}
            onSend={handleSend}
            onBack={() => { setShowChatMobile(false); setActiveChat(null); }}
            isMobile={showChatMobile}
          />
        )}
      </div>

    </div>
  );
}