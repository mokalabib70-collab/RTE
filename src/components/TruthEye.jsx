import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.png';
import Logo1 from '../assets/Logo_1.png';

// ── Tailwind custom values via inline styles for non-standard values ──
const css = {
  green: "#1C5332",
  gold: "#F3B300",
  cream: "#FFFAFA",
  dark: "#1a1a1a",
  gray: "#9E9E9E",
  red: "#e53e3e",
  borderDark: "#212121",
};

const STEPS = [
  { label: "STEP 1",     desc: "Enter your first and last name to get started." },
  { label: "STEP 2",     desc: "Add your phone number for account verification." },
  { label: "STEP 3",     desc: "Provide your university email address." },
  { label: "STEP 4",     desc: "Create a strong password to secure your account." },
  { label: "FINAL STEP", desc: "Review your info and confirm to create your account." },
];

const COUNTRY_CODES = [
  { flag: "🇪🇬", code: "+20" },
  { flag: "🇸🇦", code: "+966" },
  { flag: "🇦🇪", code: "+971" },
  { flag: "🇺🇸", code: "+1" },
  { flag: "🇬🇧", code: "+44" },
];

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth={2}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth={2}>
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckIcon = ({ size = 12, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <line x1="2" y1="2" x2="10" y2="10" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="2" x2="2" y2="10" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Reusable input class builder
const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-lg border text-sm text-gray-700 outline-none transition-colors duration-200 bg-[#FFFAFA] ${
    hasError ? "border-red-500" : "border-gray-400 focus:border-[#1C5332]"
  }`;

 
export default function TruthEye({ onNavigate }) {

     const location = useLocation();
     const navigate = useNavigate();
     const handleLogin = () => {
  setLoginSubmitted(true);

  if (!loginValid) return;

  const email = loginEmail.toLowerCase();

  // Doctor
  if (
    email === "doctor@gmail.com" &&
    loginStudentId === "220423"&&
   loginPassword === "123456"
  ) {
    navigate("/doctorprofile");
    return;
  }

  //student profile
  if (
    email === "student@gmail.com" &&
    loginStudentId === "220423"&&
   loginPassword === "123456"
  ) {
    navigate("/studentprofile");
    return;
  }

  // Admin
  if (
    email === "admin@gmail.com" &&
    loginStudentId === "220423"&&
    loginPassword === "123456"
  ) {
    navigate("/adminprofile");
    return;
  }


   //Super Admin
  if (
    email === "sa@gmail.com" &&
    loginStudentId === "220423"&&
    loginPassword === "123456"
  ) {
    navigate("/superadmin");
    return;
  }

  // Student (default)
  navigate("/dashboard");
};


const [page, setPage] = useState(
  location.state?.page || "login"
);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createPasswordSubmitted, setCreatePasswordSubmitted] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [rememberMe, setRememberMe] = useState(true);
  const [receiveEmails, setReceiveEmails] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [identityVerified, setIdentityVerified] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(72);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", password: "" });
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginStudentId, setLoginStudentId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [signupSubmitted, setSignupSubmitted] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => { setWindowWidth(window.innerWidth); setWindowHeight(window.innerHeight); };
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("resize", handleResize); window.removeEventListener("scroll", handleScroll); };
  }, []);

  useEffect(() => {
    const measure = () => { if (navRef.current) setNavHeight(navRef.current.offsetHeight); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => { if (!showIdentityModal) stopCamera(); }, [showIdentityModal]);

  const passwordChecks = {
    length:    signupPassword.length >= 8,
    lowercase: /[a-z]/.test(signupPassword),
    uppercase: /[A-Z]/.test(signupPassword),
    number:    /[0-9]/.test(signupPassword),
    special:   /[^a-zA-Z0-9]/.test(signupPassword),
  };
  const allPasswordChecksPassed = Object.values(passwordChecks).every(Boolean);

  const SUPER_ADMIN_EMAIL = "superadmin@trutheye.com";

  const loginValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail) &&
    loginStudentId.trim().length > 0 &&
    loginPassword.length > 0;

  const signupValid =
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    allPasswordChecksPassed;

  const updateField = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    const stepReady = [
      newForm.firstName.trim() && newForm.lastName.trim(),
      newForm.phone.trim(),
      newForm.email.trim(),
      newForm.password.length >= 8,
      true,
    ];
    if (stepReady[currentStep] && currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(s => Math.min(s + 1, STEPS.length - 1)), 300);
    }
  };

  const goToSignup = () => { setPage("signup"); setCurrentStep(0); setForm({ firstName: "", lastName: "", phone: "", email: "", password: "" }); setSignupPassword(""); setSignupSubmitted(false); setBottomSheetOpen(false); };
  const goToLogin  = () => { setPage("login");  setCurrentStep(0); setLoginEmail(""); setLoginStudentId(""); setLoginPassword(""); setLoginSubmitted(false); };
  const goToForgot = () => { setPage("forgot"); setForgotSubmitted(false); };

  const stopCamera = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
  };

  const handleAllow = async () => {
    setScanning(true);
    setScanProgress(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    } catch (err) { console.error("Camera error:", err); }
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      if (progress >= 100) { clearInterval(interval); setScanning("done"); setIdentityVerified(true); }
    }, 80);
  };

  // ── Responsive ──
  const isDesktop = windowWidth >= 1080;
  const rightGap   = isDesktop ? Math.max(0, (windowWidth - 800) / 2) : 0;
  const stepsWidth = Math.min(240, Math.max(120, rightGap * 0.80));
  const stepsLeft  = `calc(50% + 400px + ${(rightGap - stepsWidth) / 2}px)`;

  const tri_scaleX = windowWidth  / 1290;
  const tri_scaleY = windowHeight / 910;
  const p1x = 1300 * tri_scaleX,  p1y = (80   - 90) * tri_scaleY;
  const p2x = 1600 * tri_scaleX,  p2y = (700  - 90) * tri_scaleY;
  const p3x = -6   * tri_scaleX,  p3y = (1001 - 90) * tri_scaleY;
  const stepsXCenter = windowWidth / 2 + 400 + rightGap / 2;
  const t13 = (stepsXCenter - p1x) / (p3x - p1x);
  const greenTopRaw = p1y + t13 * (p3y - p1y);
  const t23 = (stepsXCenter - p2x) / (p3x - p2x);
  const greenBottomRaw = p2y + t23 * (p3y - p2y);
  const greenTop    = Math.max(navHeight + 16, greenTopRaw + 16);
  const greenBottom = Math.min(windowHeight - 16, greenBottomRaw - 16);
  const greenAreaHeight = Math.max(180, greenBottom - greenTop);
  const greenCenterY = greenTop + greenAreaHeight / 2;

  const stepsCount = STEPS.length;
  const circleSize    = Math.round(Math.min(38, Math.max(14, greenAreaHeight / (stepsCount * 2.6))));
  const stepsGap      = Math.round(Math.min(16, Math.max(3,  (greenAreaHeight * 0.78 - stepsCount * circleSize) / (stepsCount - 1))));
  const stepLabelSize = Math.min(13, Math.max(7,   circleSize * 0.35));
  const stepDescSize  = Math.min(11, Math.max(6,   circleSize * 0.27));
  const rowTextHeight = stepLabelSize * 1.2 + stepDescSize * 1.4 * 2 + circleSize * 0.1;
  const rowHeight     = Math.max(circleSize, rowTextHeight);
  const stepsContentHeight = stepsCount * rowHeight + (stepsCount - 1) * stepsGap;
  const stepsPanelTop = Math.round(greenCenterY - stepsContentHeight / 2);

  const logoSize = Math.round(Math.min(264, Math.max(80, Math.min(rightGap * 0.75, greenAreaHeight * 0.75))));
  const logoLeft = `calc(50% + 400px + ${(rightGap - logoSize) / 2}px)`;

  const bottomSheetPeekHeight = 28;
  const mainPaddingTop    = `${navHeight + 16}px`;
  const mainPaddingBottom = page === "signup" && !isDesktop
    ? `${bottomSheetPeekHeight + 24}px`
    : `${navHeight + 16}px`;

  // ── Shared field error text ──
  const FieldError = ({ msg }) => <p className="text-red-500 text-xs mt-1">{msg}</p>;

  // ── Custom Checkbox ──
  const Checkbox = ({ checked, onToggle, size = "md" }) => {
    const dim = size === "sm" ? "w-[18px] h-[18px] min-w-[18px]" : "w-5 h-5 min-w-[20px]";
    return (
      <div
        onClick={onToggle}
        className={`${dim} flex items-center justify-center rounded border-2 cursor-pointer transition-colors duration-150 ${
          checked ? "border-[#1C5332] bg-[#1C5332]" : "border-gray-300 bg-white"
        }`}
      >
        {checked && <CheckIcon size={size === "sm" ? 10 : 12} />}
      </div>
    );
  };

  return (
    <div className="relative w-full flex flex-col min-h-screen overflow-x-hidden overflow-y-auto" style={{ backgroundColor: css.cream, color: css.dark }}>

      {/* ── Triangle BG ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <svg viewBox="0 90 1290 910" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="1300,80 1600,700 -6,1001" fill="#1C5332" />
        </svg>
      </div>

      {/* ── Navbar ── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{
          paddingLeft: "clamp(16px, 5vw, 32px)",
          paddingRight: "clamp(16px, 5vw, 32px)",
          paddingTop: "clamp(6px, 1.5vh, 16px)",
          paddingBottom: "clamp(6px, 1.5vh, 16px)",
          backgroundColor: scrolled ? css.cream : "transparent",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0 min-w-0" style={{ gap: "clamp(6px,1vw,12px)" }}>
          <div
            className="overflow-hidden flex items-center justify-center"
            style={{ width: "clamp(36px,5vw,72px)", height: "clamp(36px,5vw,72px)" }}
          >
            <img src={Logo} alt="TruthEye Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold tracking-tight" style={{ fontSize: "clamp(18px,3.5vw,36px)" }}>
            <span style={{ color: css.green }}>Truth</span>
            <span style={{ color: css.gold }}>Eye</span>
          </span>
        </div>

        {/* Actions */}
        <div className="relative z-20 flex items-center shrink-0" style={{ gap: "clamp(8px,1.5vw,16px)" }}>
          <span className="text-gray-600 whitespace-nowrap" style={{ fontSize: "clamp(11px,1.4vw,14px)" }}>
            {page === "login" ? "No Account yet?" : "Already a Member?"}
          </span>
          <button
            onClick={page === "login" ? goToSignup : goToLogin}
            className="font-bold rounded-xl cursor-pointer transition-transform duration-200 hover:scale-105 whitespace-nowrap"
            style={{
              border: `2px solid ${css.borderDark}`,
              color: css.borderDark,
              backgroundColor: "#FCFCFC",
              fontSize: "clamp(11px,1.4vw,14px)",
              padding: `6px clamp(10px,1.8vw,24px)`,
              height: "clamp(34px,4.5vw,48px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            {page === "login" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </nav>

      {/* ── Main content ── */}
      <div
        className={`relative z-10 flex justify-center flex-1 ${page === "signup" ? "items-start" : "items-center"}`}
        style={{
          paddingTop: mainPaddingTop,
          paddingBottom: mainPaddingBottom,
          paddingLeft: "clamp(16px,3vw,24px)",
          paddingRight: "clamp(16px,3vw,24px)",
          minHeight: "100vh",
        }}
      >
        <div className={`relative w-full ${isDesktop ? "max-w-200" : "max-w-140"}`}>

          {/* ════ LOGIN ════ */}
          {page === "login" && (
            <div
              className="w-full rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: css.cream, padding: "clamp(20px,4vh,40px) clamp(16px,6vw,80px)" }}
            >
              <div className="text-center mb-6" style={{ marginBottom: "clamp(12px,2.5vh,28px)" }}>
                <h1 className="font-extrabold" style={{ fontSize: "clamp(18px,3.5vh,34px)", color: css.dark }}>
                  Welcome to{" "}
                  <span className="font-bold" style={{ color: css.green }}>Truth</span>
                  <span className="font-bold" style={{ color: css.gold }}>Eye</span>
                  <span className="font-bold" style={{ color: "#1C2933" }}>!</span>
                </h1>
                <p style={{ fontSize: "clamp(13px,2.2vh,24px)", color: css.dark }}>Log in into your account</p>
              </div>

              <div className="flex flex-col" style={{ gap: "clamp(8px,1.5vh,14px)" }}>
                {/* Email */}
                <div className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Enter your university email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className={inputCls(loginSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail))}
                  />
                  {loginSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail) && (
                    <FieldError msg={loginEmail.trim() === "" ? "Email is required" : "Please enter a valid email address"} />
                  )}
                </div>

                {/* Student ID */}
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Enter your student ID"
                    value={loginStudentId}
                    onChange={e => setLoginStudentId(e.target.value)}
                    className={inputCls(loginSubmitted && loginStudentId.trim() === "")}
                  />
                  {loginSubmitted && loginStudentId.trim() === "" && <FieldError msg="Student ID is required" />}
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      className={`${inputCls(loginSubmitted && loginPassword === "")} pr-12`}
                    />
                    <button
                      onClick={() => setShowPassword(v => !v)}
                      className={`absolute right-3 flex items-center border-none bg-transparent cursor-pointer transition-colors duration-200 ${showPassword ? "text-[#1C5332]" : "text-gray-300"}`}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                  {loginSubmitted && loginPassword === "" && <FieldError msg="Password is required" />}
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between flex-wrap gap-2" style={{ marginTop: "clamp(2px,0.4vh,6px)" }}>
                  <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700">
                    <Checkbox checked={rememberMe} onToggle={() => setRememberMe(v => !v)} />
                    Remember Me
                  </label>
                  <button onClick={goToForgot} className="bg-transparent border-none cursor-pointer text-gray-700 text-sm hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <p className="text-gray-500" style={{ fontSize: "clamp(10px,1.2vh,12px)", marginTop: "clamp(2px,0.4vh,6px)" }}>
                  By Creating an Account, it means you agree to our{" "}
                  <span className="text-[#1C5332] underline cursor-pointer">Privacy Policy</span> and{" "}
                  <span className="text-[#1C5332] underline cursor-pointer">Terms of Service</span>
                </p>

                <div className="flex justify-center mt-2">
                 <button
  onClick={handleLogin}
  className="text-[#FFFAFA] font-bold rounded-xl cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.01] border-none"
  style={{
    backgroundColor: css.green,
    width: "min(100%, 400px)",
    height: "clamp(40px,6vh,48px)",
    fontSize: 16,
  }}
>
  Log in
</button>
                </div>
              </div>
            </div>
          )}

          {/* ════ FORGOT PASSWORD ════ */}
          {page === "forgot" && (
            <div
              className="w-full rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: css.cream, padding: "clamp(32px,5vw,56px) clamp(20px,8vw,80px)" }}
            >
              <div className="text-center mb-6">
                <h1 className="font-bold text-2xl" style={{ color: css.dark }}>Reset Password</h1>
                <p className="mt-3 leading-relaxed" style={{ color: "#666", fontSize: "clamp(13px,1.8vw,16px)" }}>
                  Type your authorised email to receive reset password link.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Enter your university email"
                    value={form.email}
                    onChange={e => updateField("email", e.target.value)}
                    className={inputCls(forgotSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))}
                  />
                  {forgotSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                    <FieldError msg={form.email.trim() === "" ? "Email is required" : "Please enter a valid email address"} />
                  )}
                </div>
                <button
                  onClick={() => { setForgotSubmitted(true); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) setPage("verify"); }}
                  className="w-full h-12 font-bold text-[#FFFAFA] rounded-xl border-none cursor-pointer transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: css.green, fontSize: 15 }}
                >
                  Send Reset Password Link
                </button>
              </div>
            </div>
          )}

          {/* ════ VERIFY CODE ════ */}
          {page === "verify" && (
            <div
              className="w-full rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: css.cream, padding: "clamp(32px,5vw,56px) clamp(20px,8vw,80px)" }}
            >
              <div className="text-center mb-8">
                <h1 className="font-bold text-2xl" style={{ color: css.dark }}>Verify Your Code</h1>
                <p className="mt-3 leading-relaxed" style={{ color: "#666", fontSize: "clamp(13px,1.8vw,16px)" }}>
                  Enter the passcode you just received on your email address ending with *******in@gmail.com
                </p>
              </div>

              {/* OTP row */}
              <div className="flex justify-center mb-8" style={{ gap: "clamp(6px,2vw,12px)" }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      maxWidth: 56,
                      height: "clamp(40px,10vw,56px)",
                      fontSize: "clamp(16px,3vw,24px)",
                      textAlign: "center",
                      fontWeight: 700,
                      borderRadius: 8,
                      outline: "none",
                      color: css.dark,
                      background: digit
                        ? `linear-gradient(#FFFAFA,#FFFAFA) padding-box, linear-gradient(135deg,${css.gold},${css.green}) border-box`
                        : `linear-gradient(#FFFAFA,#FFFAFA) padding-box, linear-gradient(135deg,#9E9E9E,#9E9E9E) border-box`,
                      border: "2px solid transparent",
                      caretColor: "transparent",
                    }}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/, "");
                      const newOtp = [...otp]; newOtp[i] = val; setOtp(newOtp);
                      if (val && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
                    }}
                    onKeyDown={e => { if (e.key === "Backspace" && !otp[i] && i > 0) document.getElementById(`otp-${i - 1}`)?.focus(); }}
                  />
                ))}
              </div>

              <button
                onClick={() => { if (otp.every(d => d !== "")) { setPage("create_password"); setOtp(["", "", "", "", "", ""]); } }}
                className={`w-full h-12 font-bold text-[#FFFAFA] rounded-xl border-none cursor-pointer transition-opacity duration-200 ${otp.every(d => d !== "") ? "hover:opacity-90" : "opacity-60 cursor-not-allowed"}`}
                style={{ backgroundColor: otp.every(d => d !== "") ? css.green : "#aaa", fontSize: 15 }}
              >
                Verify
              </button>
            </div>
          )}

          {/* ════ CREATE NEW PASSWORD ════ */}
          {page === "create_password" && (
            <div
              className="w-full rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: css.cream, padding: "clamp(32px,5vw,56px) clamp(20px,8vw,80px)" }}
            >
              <div className="text-center mb-6">
                <h1 className="font-bold text-2xl" style={{ color: css.dark }}>Create New Password</h1>
                <p className="mt-3 leading-relaxed" style={{ color: "#666", fontSize: "clamp(13px,1.8vw,16px)" }}>
                  Type your new strong password. Your password must include: One capital letter &amp; one small letter at least, One special character &amp; Minimum 8 digits long.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {/* New password */}
                <div className="flex flex-col">
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className={`${inputCls(createPasswordSubmitted && newPassword.length < 8)} pr-12`}
                    />
                    <button onClick={() => setShowPassword(v => !v)} className={`absolute right-3 flex items-center bg-transparent border-none cursor-pointer transition-colors duration-200 ${showPassword ? "text-[#1C5332]" : "text-gray-300"}`}>
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                  {createPasswordSubmitted && newPassword.trim() === "" && <FieldError msg="Password is required" />}
                  {createPasswordSubmitted && newPassword.trim() !== "" && newPassword.length < 8 && <FieldError msg="Password must be at least 8 characters" />}
                </div>

                {/* Confirm password */}
                <div className="flex flex-col">
                  <div className="relative flex items-center">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className={`${inputCls(createPasswordSubmitted && (confirmPassword === "" || confirmPassword !== newPassword))} pr-12`}
                    />
                    <button onClick={() => setShowConfirmPassword(v => !v)} className={`absolute right-3 flex items-center bg-transparent border-none cursor-pointer transition-colors duration-200 ${showConfirmPassword ? "text-[#1C5332]" : "text-gray-300"}`}>
                      {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                  {createPasswordSubmitted && confirmPassword.trim() === "" && <FieldError msg="Please confirm your password" />}
                  {createPasswordSubmitted && confirmPassword.trim() !== "" && confirmPassword !== newPassword && <FieldError msg="Passwords do not match" />}
                </div>

                <button
                  onClick={() => { setCreatePasswordSubmitted(true); if (newPassword.length >= 8 && confirmPassword === newPassword) goToLogin(); }}
                  className="w-full h-12 font-bold text-[#FFFAFA] rounded-xl border-none cursor-pointer mt-2 hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: css.green, fontSize: 15 }}
                >
                  Confirm Changes
                </button>
              </div>
            </div>
          )}

          {/* ════ SIGN UP ════ */}
          {page === "signup" && (
            <div
              className="w-full rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]"
              style={{ backgroundColor: css.cream, padding: "clamp(16px,3vh,32px) clamp(16px,5vw,60px)" }}
            >
              {/* Signup header */}
              <div className="text-center" style={{ marginBottom: "clamp(8px,1.5vh,14px)" }}>
                <p style={{ color: css.dark, fontSize: "clamp(15px,2.8vh,34px)" }}>
                  Welcome to{" "}
                  <span className="font-bold" style={{ color: css.green }}>Truth</span>
                  <span className="font-bold" style={{ color: css.gold }}>Eye</span>
                  <span className="font-bold" style={{ color: "#1C2933" }}>!</span>
                  {" "}Please log in or create a new account.
                </p>
                <p className="font-bold" style={{ color: css.dark, fontSize: "clamp(12px,2vh,20px)", marginTop: "clamp(2px,0.4vh,6px)" }}>
                  Start Your 14-Day Free Trial Today.
                </p>
                <p className="text-gray-400 tracking-widest" style={{ fontSize: "clamp(9px,1vh,11px)", marginTop: 1 }}>
                  NO CREDIT CARD REQUIRED!
                </p>
              </div>

              <div className="flex flex-col" style={{ gap: "clamp(6px,1.2vh,12px)" }}>
                {/* First Name */}
                <div className="flex flex-col">
                  <input type="text" placeholder="Enter your first name" value={form.firstName}
                    onChange={e => updateField("firstName", e.target.value)}
                    className={inputCls(signupSubmitted && form.firstName.trim() === "")} />
                  {signupSubmitted && form.firstName.trim() === "" && <FieldError msg="First name is required" />}
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <input type="text" placeholder="Enter your last name" value={form.lastName}
                    onChange={e => updateField("lastName", e.target.value)}
                    className={inputCls(signupSubmitted && form.lastName.trim() === "")} />
                  {signupSubmitted && form.lastName.trim() === "" && <FieldError msg="Last name is required" />}
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <div
                    className={`flex items-center h-12 px-3 gap-2 rounded-lg border transition-colors duration-200 focus-within:border-[#1C5332] ${signupSubmitted && form.phone.trim() === "" ? "border-red-500" : "border-gray-400"}`}
                    style={{ backgroundColor: css.cream }}
                  >
                    <select
                      className="outline-none bg-transparent text-sm text-gray-700 cursor-pointer max-w-22.5 border-none"
                      value={selectedCountry.code}
                      onChange={e => setSelectedCountry(COUNTRY_CODES.find(c => c.code === e.target.value))}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={e => updateField("phone", e.target.value)}
                      className="flex-1 min-w-0 outline-none bg-transparent text-sm text-gray-700 border-none"
                    />
                  </div>
                  {signupSubmitted && form.phone.trim() === "" && <FieldError msg="Phone number is required" />}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <input type="email" placeholder="Enter your university email" value={form.email}
                    onChange={e => updateField("email", e.target.value)}
                    className={inputCls(signupSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))} />
                  {signupSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                    <FieldError msg={form.email.trim() === "" ? "Email is required" : "Please enter a valid email address"} />
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col">
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={signupPassword}
                      onChange={e => { setSignupPassword(e.target.value); updateField("password", e.target.value); }}
                      className={`${inputCls(false)} pr-12`}
                    />
                    <button onClick={() => setShowPassword(v => !v)} className={`absolute right-3 flex items-center bg-transparent border-none cursor-pointer transition-colors duration-200 ${showPassword ? "text-[#1C5332]" : "text-gray-300"}`}>
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                  </div>
                </div>

                {/* Password checklist */}
                <div className="grid grid-cols-2 gap-x-4" style={{ rowGap: "clamp(2px,0.4vh,4px)" }}>
                  {[
                    { key: "length",    label: "Use 8 or more characters" },
                    { key: "lowercase", label: "One lowercase character" },
                    { key: "special",   label: "One special character" },
                    { key: "number",    label: "One number" },
                    { key: "uppercase", label: "One Uppercase character" },
                  ].map(({ key, label }) => {
                    const passed    = passwordChecks[key];
                    const showError = signupSubmitted && !passed;
                    return (
                      <span
                        key={key}
                        className="flex items-center gap-1 transition-colors duration-200"
                        style={{
                          fontSize: "clamp(10px,1.3vh,12px)",
                          color: passed ? css.green : showError ? css.red : "#999",
                        }}
                      >
                        {passed
                          ? <CheckIcon />
                          : showError
                            ? <CrossIcon />
                            : <span className="inline-block w-3 text-center">•</span>}
                        {label}
                      </span>
                    );
                  })}
                </div>

                {/* Receive emails */}
                <label
                  className="flex items-start gap-2 cursor-pointer select-none text-gray-700"
                  style={{ fontSize: "clamp(11px,1.3vh,13px)", marginTop: "clamp(2px,0.4vh,6px)" }}
                >
                  <Checkbox checked={receiveEmails} onToggle={() => setReceiveEmails(v => !v)} size="sm" />
                  I want to receive emails about the product, feature updates, events, and marketing promotions.
                </label>

                <p className="text-gray-500 text-xs">
                  By Creating an Account, it means you agree to our{" "}
                  <span className="text-[#1C5332] underline cursor-pointer">Privacy Policy</span> and{" "}
                  <span className="text-[#1C5332] underline cursor-pointer">Terms of Service</span>
                </p>

                <div className="flex justify-center" style={{ marginTop: "clamp(4px,1vh,8px)", marginBottom: 8 }}>
                  <button
                    onClick={() => { setSignupSubmitted(true); if (signupValid) { setIdentityVerified(false); setShowIdentityModal(true); } }}
                    className="font-bold text-[#FFFAFA] rounded-xl border-none cursor-pointer hover:opacity-90 hover:scale-[1.01] transition-all duration-200"
                    style={{
                      backgroundColor: css.green,
                      width: "min(100%, 400px)",
                      height: "clamp(40px,6vh,48px)",
                      fontSize: 16,
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════ RIGHT SIDE — Logo (login/forgot/verify/create_password) ════ */}
          {isDesktop && ["login", "forgot", "verify", "create_password"].includes(page) && (
            <div
              className="fixed z-10 flex items-center justify-center pointer-events-none transition-all duration-200"
              style={{ left: logoLeft, top: `${Math.round(greenCenterY - logoSize / 2)}px`, width: logoSize, height: logoSize }}
            >
              <img src={Logo1} alt="AI" style={{ width: logoSize, height: logoSize, objectFit: "contain" }} />
            </div>
          )}

          {/* ════ RIGHT SIDE — Steps (signup, desktop) ════ */}
          {isDesktop && page === "signup" && (
            <div className="fixed z-10 transition-all duration-200" style={{ left: stepsLeft, top: `${stepsPanelTop}px`, width: stepsWidth }}>
              <div className="relative w-full overflow-visible">
                {/* Vertical line */}
                <div
                  className="absolute w-[1.5px]"
                  style={{
                    left: circleSize / 2 - 0.75,
                    top: circleSize / 2,
                    bottom: circleSize / 2,
                    background: "rgba(255,255,255,0.3)",
                  }}
                />
                <div className="flex flex-col relative" style={{ gap: stepsGap }}>
                  {STEPS.map((step, i) => {
                    const done   = i < currentStep;
                    const active = i === currentStep;
                    return (
                      <div key={step.label} className="flex items-start gap-3 relative z-10 cursor-pointer" onClick={() => setCurrentStep(i)}>
                        <div
                          className="shrink-0 rounded-full flex items-center justify-center transition-all duration-200"
                          style={{
                            width: circleSize, height: circleSize,
                            background: done ? css.gold : "transparent",
                            border: done ? "none" : active ? "2px solid white" : "2px solid rgba(255,255,255,0.45)",
                          }}
                        >
                          {done   && <CheckIcon size={circleSize * 0.42} color={css.green} />}
                          {active && <div className="rounded-full bg-white" style={{ width: circleSize * 0.32, height: circleSize * 0.32 }} />}
                        </div>
                        <div className="flex flex-col" style={{ paddingTop: circleSize * 0.1 }}>
                          <p className="font-bold text-white tracking-wide leading-tight" style={{ fontSize: stepLabelSize }}>{step.label}</p>
                          <p className="leading-snug mt-0.5" style={{ fontSize: stepDescSize, color: "rgba(255,255,255,0.6)" }}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ════ IDENTITY MODAL ════ */}
      {showIdentityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
          <div
            className="bg-white rounded-2xl flex flex-col items-center w-full overflow-y-auto"
            style={{
              maxWidth: 480,
              maxHeight: "90vh",
              padding: "clamp(20px,5vw,36px) clamp(16px,5vw,32px) clamp(16px,4vw,32px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
            }}
          >
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shrink-0 transition-colors duration-300"
              style={{ backgroundColor: identityVerified ? css.green : "#e0e0e0" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" stroke="white" fill="none" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p className="font-bold tracking-wider mb-5" style={{ color: css.dark, fontSize: "clamp(14px,4vw,18px)" }}>
              IDENTITY VERIFICATION
            </p>

            {/* State 1: initial */}
            {!scanning && (
              <>
                <div
                  className="shrink-0 rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center mb-5"
                  style={{ width: "clamp(140px,45vw,220px)", height: "clamp(140px,45vw,220px)" }}
                >
                  <svg width="56" height="56" viewBox="0 0 24 24" stroke="#ccc" fill="none" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <div className="w-full h-1.25 rounded-full bg-gray-200 mb-2">
                  <div className="h-full rounded-full bg-gray-400" style={{ width: "0%" }} />
                </div>
                <p className="font-bold text-base mb-4 mt-3" style={{ color: css.dark }}>Use Camera</p>
                <button
                  onClick={handleAllow}
                  className="w-full h-12 font-bold text-white rounded-xl border-none cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: "#2563eb", fontSize: 16 }}
                >
                  Allow
                </button>
              </>
            )}

            {/* State 2: scanning */}
            {scanning === true && (
              <>
                <div className="relative w-full rounded-xl overflow-hidden shrink-0 mb-4" style={{ background: "#111", aspectRatio: "4/3" }}>
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ width: "55%", paddingBottom: "55%", position: "relative" }}>
                      <div className="absolute inset-0 rounded-full" style={{ border: `3px solid ${css.gold}`, boxShadow: `0 0 12px rgba(243,179,0,0.5)` }} />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/75 px-3 py-1 rounded-lg text-white text-sm">Scanning...</div>
                </div>
                <div className="w-full h-1.25 rounded-full bg-gray-200 mb-2">
                  <div className="h-full rounded-full transition-all duration-75" style={{ width: `${scanProgress}%`, backgroundColor: css.gold }} />
                </div>
                <p className="font-bold text-lg mt-2" style={{ color: css.dark }}>Scanning your face...</p>
              </>
            )}

            {/* State 3: done */}
            {scanning === "done" && (
              <>
                <div className="relative w-full rounded-xl overflow-hidden shrink-0 mb-4" style={{ background: "#111", aspectRatio: "4/3" }}>
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ width: "55%", paddingBottom: "55%", position: "relative" }}>
                      <div className="absolute inset-0 rounded-full" style={{ border: "3px solid #22c55e", boxShadow: "0 0 16px rgba(34,197,94,0.5)" }} />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/75 px-3 py-1 rounded-lg text-white text-sm">Done ✓</div>
                </div>
                <div className="w-full h-1.25 rounded-full bg-gray-200 mb-2">
                  <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: "#22c55e" }} />
                </div>
                <p className="font-bold mb-4" style={{ color: css.dark, fontSize: 17 }}>Identity Verified Successfully!</p>
                <button
                  onClick={() => { setIdentityVerified(false); setScanning(false); setScanProgress(0); setShowIdentityModal(false); if (onNavigate) onNavigate("Dashboard"); }}
                  className="w-full h-12 font-bold text-white rounded-xl border-none cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: "#2563eb", fontSize: 16 }}
                >
                  Continue →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ════ MOBILE BOTTOM SHEET ════ */}
      {page === "signup" && !isDesktop && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 rounded-t-[20px] overflow-y-auto transition-transform duration-300"
          style={{
            backgroundColor: css.cream,
            boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
            maxHeight: "70vh",
            transform: bottomSheetOpen ? "translateY(0)" : "translateY(calc(100% - 28px))",
          }}
        >
          <div
            className="flex justify-center items-center h-7 pt-2 cursor-pointer sticky top-0 z-10"
            style={{ backgroundColor: css.cream }}
            onClick={() => setBottomSheetOpen(o => !o)}
          >
            <div className="w-12 h-1.25 rounded-full" style={{ backgroundColor: css.dark }} />
          </div>
          <div className="px-6 pb-10 pt-4">
            <div className="relative">
              <div className="absolute left-4.75 top-7 bottom-7 w-[1.5px]" style={{ background: "rgba(28,83,50,0.2)" }} />
              <div className="flex flex-col gap-5">
                {STEPS.map((step, i) => {
                  const done   = i < currentStep;
                  const active = i === currentStep;
                  return (
                    <div key={step.label} className="flex items-start gap-3 relative z-10">
                      <div
                        className="shrink-0 w-9.5 h-9.5 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{
                          background: done ? css.green : "transparent",
                          border: done ? "none" : active ? `2px solid ${css.green}` : "2px solid rgba(28,83,50,0.35)",
                        }}
                      >
                        {done   && <CheckIcon size={16} color="white" />}
                        {active && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: css.green }} />}
                      </div>
                      <div className="pt-1.5">
                        <p className="font-bold text-[13px] tracking-wide" style={{ color: css.dark }}>{step.label}</p>
                        <p className="text-xs leading-snug mt-0.5 text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}