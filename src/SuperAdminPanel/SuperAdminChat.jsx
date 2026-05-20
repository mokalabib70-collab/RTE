import { useState, useRef, useEffect } from "react";

const TABS = ["Broadcast Admins", "Admins", "Broadcast All Users"];

const SEND_TYPES = {
  "Broadcast Admins":    ["Broadcast to All Admins"],
  "Admins":              ["Choose Type", "Private to Admin", "Broadcast to All Admins"],
  "Broadcast All Users": ["Broadcast to All Users"],
};

const UNIVERSITIES = [
  "Alexandria University", "Beni Suef University", "Cairo University",
  "Fayoum University", "Ain Shams University",
];

const FACULTIES = [
  "Faculty of Engineering", "Faculty of Computer and AI", "Faculty of Science",
  "Faculty of Law", "Faculty of Medicine", "Faculty of Pharmacy",
];

const ADMINS_CHATS = [
  { id: 1, name: "Admin FCAI BSU Mai Ahmed Ali",       avatar: "https://i.pravatar.cc/150?img=47", preview: "I didn't understand question 5. Could you explain the q...", time: "1 days ago", unread: 0,
    messages: [
      { id: 1, from: "them", text: "I didn't understand question 5. Could you explain the question better?", time: "10:00" },
      { id: 2, from: "me",   text: "Sure! Question 5 is about the normalization process in databases.",       time: "10:05" },
      { id: 3, from: "them", text: "Ah I see, thank you for clarifying!",                                    time: "10:06" },
      { id: 4, from: "me",   text: "You're welcome! Let me know if you need anything else.",                 time: "10:07" },
      { id: 5, from: "them", text: "I understand now, thank you!",                                          time: "10:08" },
    ],
  },
  { id: 2, name: "Admin Law FU Mona Said",             avatar: "https://i.pravatar.cc/150?img=48", preview: "I didn't understand question 5. Could you explain the q...", time: "13:00", unread: 1,
    messages: [{ id: 1, from: "them", text: "I didn't understand question 5. Could you explain the question better?", time: "13:00" }],
  },
  { id: 3, name: "Admin Engineer ASU Mohammad Ali",    avatar: "https://i.pravatar.cc/150?img=12", preview: "I understand now, thank you!", time: "2 days ago", unread: 0,
    messages: [
      { id: 1, from: "me",   text: "Here is the explanation for question 5.", time: "09:00" },
      { id: 2, from: "them", text: "I understand now, thank you!",            time: "09:05" },
    ],
  },
];

const BROADCAST_ADMINS_CHATS = [
  { id: 101, name: "Broadcast Admins", avatar: null, preview: "Please review the updated exam instructions.", time: "1 days ago", unread: 0,
    messages: [
      { id: 1, from: "me", text: "I didn't understand question 5. Could you explain the question better?", time: "10:00" },
      { id: 2, from: "me", text: "Please review the updated exam instructions.",                           time: "10:30" },
      { id: 3, from: "me", text: "Thank you all for your cooperation.",                                   time: "11:00" },
    ],
  },
];

const BROADCAST_ALL_USERS_CHATS = [
  { id: 201, name: "Broadcast All Users", avatar: null, preview: "System maintenance scheduled for tonight at 10PM.", time: "1 days ago", unread: 0,
    messages: [
      { id: 1, from: "me", text: "System maintenance scheduled for tonight at 10PM.", time: "14:00" },
      { id: 2, from: "me", text: "The platform will be back online by midnight.",     time: "14:01" },
    ],
  },
];

const getChatsForTab = (tab) => {
  if (tab === "Broadcast Admins")    return BROADCAST_ADMINS_CHATS;
  if (tab === "Admins")              return ADMINS_CHATS;
  if (tab === "Broadcast All Users") return BROADCAST_ALL_USERS_CHATS;
  return [];
};

/* ── Icons ── */
const SearchIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const PlusIcon     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const CloseIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SendIcon     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"/></svg>;
const AttachIcon   = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
const ImageIcon    = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const EmojiIcon    = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const ChevronIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>;
const BackIcon     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const BroadcastIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4a20" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

/* ── Reusable Dropdown ── */
function ChatDropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const isSelected = value && value !== "Choose Type";
  return (
    <div className="relative mb-3.5">
      <button
        onClick={() => setOpen(p => !p)}
        className={`w-full px-3 py-2 border rounded-lg bg-white flex items-center justify-between gap-1.5 text-[12.5px] transition-colors hover:border-[#1a4a20] ${
          isSelected ? "bg-[#eaf2ea] text-[#1a4a20] font-semibold border-[#1a4a20]" : "border-[#d1d5db] text-[#6B7280]"
        }`}
      >
        <span>{value || placeholder || ""}</span>
        <ChevronIcon />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+3px)] left-0 right-0 bg-[#fffafa] border border-[#d1d5db] rounded-lg z-50 shadow-lg overflow-hidden max-h-50 overflow-y-auto">
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`px-3 py-2.5 text-[12.5px] text-[#374151] cursor-pointer transition-colors hover:bg-[#f0f5ef] ${value === opt ? "bg-[#f0f5ef]" : ""}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SuperAdminChat() {
  const [activeTab,          setActiveTab]          = useState("Admins");
  const [selectedChat,       setSelectedChat]       = useState(null);
  const [showNewMessage,     setShowNewMessage]     = useState(false);
  const [inputText,          setInputText]          = useState("");
  const [searchText,         setSearchText]         = useState("");
  const [sendType,           setSendType]           = useState("Choose Type");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedFaculty,    setSelectedFaculty]    = useState("");
  const [isMobile,           setIsMobile]           = useState(window.innerWidth < 640);

  const [allMessages, setAllMessages] = useState(() => {
    const init = {};
    [...ADMINS_CHATS, ...BROADCAST_ADMINS_CHATS, ...BROADCAST_ALL_USERS_CHATS].forEach(
      c => { init[c.id] = c.messages; }
    );
    return init;
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const chats         = getChatsForTab(activeTab);
  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat, allMessages]);

  const handleTabChange = (tab) => {
    setActiveTab(tab); setSelectedChat(null); setShowNewMessage(false);
    setSendType(SEND_TYPES[tab][0]); setSelectedUniversity(""); setSelectedFaculty("");
  };
  const handleNewMessage = () => {
    setShowNewMessage(true); setSelectedChat(null);
    setSendType(SEND_TYPES[activeTab][0]); setSelectedUniversity(""); setSelectedFaculty("");
  };
  const handleSelectChat = (chat) => { setSelectedChat(chat); setShowNewMessage(false); };
  const handleBack = () => { setSelectedChat(null); setShowNewMessage(false); };
  const handleSend = () => {
    if (!inputText.trim()) return;
    const msg = {
      id: Date.now(), from: "me", text: inputText.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    };
    if (selectedChat) {
      setAllMessages(prev => ({ ...prev, [selectedChat.id]: [...(prev[selectedChat.id] || []), msg] }));
    }
    setInputText("");
  };

  const currentMessages = selectedChat ? (allMessages[selectedChat.id] || []) : [];
  const showFilters     = sendType === "Private to Admin";
  const chatPaneActive  = isMobile && selectedChat !== null;
  const newMsgActive    = isMobile && showNewMessage;
  const listPushed      = isMobile && (chatPaneActive || newMsgActive);

  // Shared header style
  const paneHeaderCls = "bg-[#1c5332] text-white px-4 py-3 flex items-center justify-between flex-shrink-0 rounded-t-xl";
  const backBtnCls    = "bg-transparent border-none text-white flex items-center p-1 rounded hover:bg-white/15 transition-colors cursor-pointer";
  const iconBtnCls    = "bg-transparent border-none p-1 flex items-center rounded hover:bg-[#ebebdf] transition-colors flex-shrink-0 cursor-pointer";

  return (
    <div className="flex h-full w-full gap-1 bg-[#fffafa] text-sm p-2.5 min-h-0 relative overflow-hidden">

      {/* ════ Pane 1: Chat List ════ */}
      <div className={`bg-[#fffafa] rounded-xl flex flex-col overflow-hidden shadow-sm min-h-0 shrink-0
        ${isMobile
          ? `absolute inset-0 z-1 transition-transform duration-300 ease-in-out rounded-none ${listPushed ? "-translate-x-18" : "translate-x-0"}`
          : "w-65 lg:w-75 xl:w-[320px]"
        }`}
      >
        {/* Header */}
        <div className={paneHeaderCls}>
          <div>
            <div className="font-bold text-[15px]">Messages</div>
            <div className="text-[11px] text-[#9dc49d] mt-px">2 unread Messages</div>
          </div>
          <button onClick={handleNewMessage} className="w-6.5 h-6.5 bg-white/20 border border-white/25 rounded-md text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer shrink-0">
            <PlusIcon />
          </button>
        </div>

        {/* Search */}
        <div className="px-2.5 pt-2.5 pb-1.5 shrink-0">
          <div className="flex items-center gap-1.5 bg-[#f8f8f4] border border-[#ebebdf] rounded-lg px-3 py-1.5">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="border-none bg-transparent outline-none text-[13px] text-[#374151] flex-1 min-w-0 placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-2.5 border-b border-[#ebebdf] shrink-0 overflow-x-auto scrollbar-none">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-1.5 py-2 mr-0.5 border-none bg-transparent text-[11px] border-b-2 -mb-px whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === tab
                  ? "font-bold text-[#1a4a20] border-[#1a4a20]"
                  : "font-normal text-[#6B7280] border-transparent hover:text-[#1a4a20]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#ebebdf]">
          {filteredChats.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[#9CA3AF] text-[13px] italic px-6 text-center">You have no chats yet.</div>
          ) : filteredChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`flex items-center gap-2.5 px-3.5 py-3 cursor-pointer border-b border-[#f5f5f0] transition-colors ${
                selectedChat?.id === chat.id ? "bg-[#f0f5ef]" : "hover:bg-[#fffafa]"
              }`}
            >
              {chat.avatar
                ? <img className="w-10.5 h-10.5 rounded-full object-cover shrink-0" src={chat.avatar} alt={chat.name} />
                : <div className="w-10.5 h-10.5 rounded-full bg-[#e6f0e6] border border-[#c5d8c5] flex items-center justify-center shrink-0"><BroadcastIcon /></div>
              }
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-1.5">
                  <span className="font-semibold text-[13px] text-[#111827] overflow-hidden text-ellipsis whitespace-nowrap">{chat.name}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[11px] text-[#9CA3AF] whitespace-nowrap">{chat.time}</span>
                    {chat.unread > 0 && (
                      <span className="bg-[#1a4a20] text-white rounded-full w-4.25 h-4.25 text-[10px] font-bold flex items-center justify-center shrink-0">{chat.unread}</span>
                    )}
                  </div>
                </div>
                <div className="text-[11.5px] text-[#6B7280] mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">{chat.preview}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════ Pane 2: New Message ════ */}
      {showNewMessage && (
        <div className={`bg-[#fffafa] rounded-xl flex flex-col overflow-hidden shadow-sm min-h-0 shrink-0
          ${isMobile
            ? `absolute inset-0 z-3 transition-transform duration-300 ease-in-out rounded-none ${newMsgActive ? "translate-x-0" : "translate-x-full"}`
            : "w-55 md:w-60 xl:w-65"
          }`}
        >
          <div className={paneHeaderCls}>
            <div className="flex items-center gap-2">
              <button className={backBtnCls} onClick={handleBack}><BackIcon /></button>
              <span className="font-bold text-[15px]">New Message</span>
            </div>
            <button className={`${backBtnCls} text-white`} onClick={() => setShowNewMessage(false)}><CloseIcon /></button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            <label className="block text-[12.5px] font-semibold text-[#111827] mb-2">Send type</label>
            <ChatDropdown
              value={sendType}
              onChange={setSendType}
              options={SEND_TYPES[activeTab]}
              placeholder="Choose Type"
            />

            {showFilters && (
              <div className="mt-0.5">
                <label className="block text-[12.5px] font-semibold text-[#111827] mb-2">Filter by</label>
                <div className="mb-3">
                  <label className="block text-[11.5px] text-[#374151] mb-1.5">Select University</label>
                  <ChatDropdown value={selectedUniversity} onChange={setSelectedUniversity} options={UNIVERSITIES} placeholder="Select University" />
                </div>
                <div className="mb-3">
                  <label className="block text-[11.5px] text-[#374151] mb-1.5">Select Faculty</label>
                  <ChatDropdown value={selectedFaculty} onChange={setSelectedFaculty} options={FACULTIES} placeholder="Select Faculty" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════ Pane 3: Chat Window ════ */}
      <div className={`bg-[#fffafa] rounded-xl flex flex-col overflow-hidden shadow-sm min-h-0 flex-1
        ${isMobile
          ? `absolute inset-0 z-2 transition-transform duration-300 ease-in-out rounded-none shadow-[-6px_0_24px_rgba(0,0,0,0.18)] ${chatPaneActive ? "translate-x-0" : "translate-x-full"}`
          : ""
        }`}
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="px-4 py-3 bg-[#1c5332] flex items-center gap-3 shrink-0 rounded-t-xl">
              <button className={backBtnCls} onClick={handleBack}><BackIcon /></button>
              {selectedChat.avatar
                ? <img className="w-9.5 h-9.5 rounded-full object-cover shrink-0 border-2 border-white/25" src={selectedChat.avatar} alt="" />
                : <div className="w-9.5 h-9.5 rounded-full bg-white/15 border-2 border-white/20 flex items-center justify-center shrink-0"><BroadcastIcon /></div>
              }
              <span className="font-semibold text-[15px] text-white flex-1">
                {selectedChat.avatar
                  ? `Dr. ${selectedChat.name.replace(/^Admin\s+\w+\s+\w+\s+/, "")}`
                  : selectedChat.name
                }
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 md:px-4.5 py-4 flex flex-col bg-[#fffafa] scrollbar-thin scrollbar-thumb-[#ebebdf]">
              {currentMessages.map(msg => (
                <div key={msg.id} className={`flex mb-2.5 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[72%] px-3.5 py-2.5 text-[13px] text-[#111827] leading-snug wrap-break-word ${
                    msg.from === "me"
                      ? "bg-[#c5d9bc] rounded-[16px_16px_3px_16px]"
                      : "bg-[#e8e8e0] rounded-[16px_16px_16px_3px]"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className={`${paneHeaderCls} rounded-t-xl`}>
              <span className="font-bold text-[15px]">Chat</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-2.5 bg-[#fffafa]">
              <div className="w-19 h-19 rounded-full bg-[#e8f5ec] flex items-center justify-center">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#1e6b3c"/>
                  <line x1="8" y1="10" x2="16" y2="10" stroke="#1e6b3c"/>
                  <line x1="8" y1="14" x2="13" y2="14" stroke="#1e6b3c"/>
                </svg>
              </div>
              <p className="text-[#374151] text-sm font-medium">Start typing your message</p>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="px-3.5 py-2.5 border-t border-[#f0f0e8] flex items-center gap-2 bg-[#fafaf8] shrink-0">
          <button className={`${iconBtnCls} hidden sm:flex`}><AttachIcon /></button>
          <button className={`${iconBtnCls} hidden sm:flex`}><ImageIcon /></button>
          <button className={`${iconBtnCls} hidden sm:flex`}><EmojiIcon /></button>
          <input
            type="text"
            placeholder="Type your message here..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            className="flex-1 border border-[#ebebdf] rounded-full px-4 py-2 text-[12.5px] outline-none bg-white text-[#374151] transition-colors focus:border-[#1a4a20] placeholder:text-[#9CA3AF] min-w-0"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-8.5 h-8.5 bg-[#1a4a20] border-none rounded-full flex items-center justify-center shrink-0 transition-all hover:bg-[#22632a] active:scale-95 disabled:bg-[#a0bea4] disabled:cursor-not-allowed cursor-pointer"
          >
            <SendIcon />
          </button>
        </div>
      </div>

    </div>
  );
}