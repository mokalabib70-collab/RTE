import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import logo from '../assets/Logo.png';
import heroImage from '../assets/hero-image.png';
import { 
  ShieldCheck, 
  Bell, 
  Mic, 
  Cloud, 
  UserRoundX, 
  ClipboardCheck, 
  UserCheck, 
  Eye, 
  Monitor, 
  Users, 
  Maximize,
  Search,
  Menu,
  X,
  ChevronUp 
} from 'lucide-react';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // مراقبة التمرير لإظهار زر العودة للأعلى
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen font-sans bg-[#FFFAFA] text-[#333] dir-ltr relative">
      
      {/* Navigation - Static Navbar (Not Fixed) */}
      <nav className="relative w-full bg-[#FFFAFA] shadow-sm z-1000 border-b border-gray-100">
        {/* Main Navbar Container */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
          
          {/* Logo Section */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-10 h-10 sm:w-12 md:w-15 md:h-15 lg:w-18 lg:h-18 object-contain" 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=TE'; }}
            />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-[#1B4332] whitespace-nowrap">
              Truth<span className="text-[#F3B300]">Eye</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 font-medium text-[#1C5332]">
            {["Our Solutions", "AI Core", "How It Works", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Our Solutions" ? "#trust-gap" :
                      item === "AI Core" ? "#security-features" :
                      item === "How It Works" ? "#how-it-works" :
                      "#contact"}
                className="relative pb-1 text-sm lg:text-base whitespace-nowrap after:absolute after:bottom-0 after:left-0 'after:h-0.5' after:w-0 after:bg-[#1C5332] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
            <Link to="/auth" state={{ page: "login" }}>
  <button className="px-3 lg:px-5 py-2 text-sm font-semibold border border-[#1C5332] text-[#1C5332] rounded-md hover:bg-gray-50 transition-colors">
    Login
  </button>
</Link>
           <Link to="/auth" state={{ page: "signup" }}>
  <button className="px-3 lg:px-5 py-2 text-sm font-semibold bg-[#1C5332] text-white rounded-md hover:bg-[#2d5a45] transition-colors">
    Sign Up
  </button>
</Link>
</div>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#1C5332] p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#FFFAFA] border-b border-gray-100 z-100 md:hidden shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col p-6 gap-4">
              {["Our Solutions", "AI Core", "How It Works", "Contact"].map((item) => (
                <a key={item} href={item === "Our Solutions" ? "#trust-gap" :
                      item === "AI Core" ? "#security-features" :
                      item === "How It Works" ? "#how-it-works" :
                      item === "Contact" ? "#contact" : "#faq"} className="text-lg font-medium text-[#1C5332] hover:pl-2 transition-all" onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <hr className="border-gray-100" />
              <div className="flex flex-col gap-3">
                <button className="w-full py-3 text-sm font-semibold border border-[#1C5332] text-[#1C5332] rounded-md">
                  Login
                </button>
                <button className="w-full py-3 text-sm font-semibold bg-[#1C5332] text-white rounded-md">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-[#FFFAFA] w-full"> 
        <header className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          
          <div className="relative order-1"> 
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Online Exams Mockup"
                className="w-full h-auto max-w-112.5 md:max-w-full mx-auto md:mx-0" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Proctoring+Dashboard'; }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-200/50 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="order-2 space-y-6 text-left md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1C2933] leading-tight">
              The Best Online Exams For Education
            </h1>
            <p className="text-lg text-gray-700 max-w-lg font-medium">
              <span className="font-extrabold text-[#1C5332]">Truth<span className="text-[#F3B300] font-extrabold">Eye</span></span> delivers a cutting-edge, fully automated proctoring platform leveraging multi-layered AI to ensure fairness and credibility in every digital assessment.
            </p>
            <div className="space-y-1">
              <p className="text-sm text-[#1C2933] font-medium">Unwavering trust for online exams with AI.</p>
              <p className="text-sm text-[#616161]">Revolutionizing Academic Integrity.</p>
            </div>
            <button className="px-8 py-4 text-[#FFFAFA] bg-[#1C5332] rounded-lg font-bold text-lg shadow-lg hover:bg-[#2d5a45] hover:-translate-y-1 transition-all">
              Start Free Trial
            </button>
          </div>
        </header>
      </section>

      {/* Trust Gap Section */}
      <section id="trust-gap" className="bg-[#1C5332] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFAFA]">Bridging the Trust Gap in Digital Education</h2>
            <p className="text-[#FFFAFA] text-sm opacity-90">
              With the surge in online learning, traditional proctoring falls short.
            </p>
            <p className='text-medium text-[#FFFAFA]'>
              <span className="font-bold text-2xl text-[#F3B300]">TruthEye</span> AI steps in with sophisticated deep learning models to detect and prevent cheating, 
              ensuring uncompromised integrity and seamless scalability for all digital examinations.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: <UserCheck size={40} />, label: 'Identity Verification' },
              { icon: <Bell size={40} />, label: 'Real-time Alerts' },
              { icon: <Mic size={40} />, label: 'Audio Classification' },
              { icon: <Cloud size={40} />, label: 'Scalability & Low Latency' },
              { icon: <UserRoundX size={40} />, label: 'Anti-Spoofing' },
              { icon: <ClipboardCheck size={40} />, label: 'Automated Reports' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#FFFAFA] p-6 rounded-xl flex flex-col items-center justify-center gap-4 shadow-sm hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-[#2486CB]">
                  {item.icon}
                </div>
                <span className="text-[#1C5332] text-xs sm:text-sm font-semibold text-center leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section id="security-features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-[#1C2933]">
            <span className='text-4xl font-bold text-[#1C5332]'>Truth</span><span className="font-bold text-4xl text-[#F3B300]">Eye</span> Monitor Built-in, AI-Driven Security for Your Exams.
          </h2>
          <p className="text-[#1C2933] max-w-2xl mx-auto font-medium text-lg">
            Our proprietary AI models Computer Vision to create a strong proctoring shield.
            <br />
            <span className="font-medium text-[#1C2933] text-sm opacity-75">Ultra-fast images real-time results, hands-off proctoring—no software downloads needed.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {[
            { 
              title: "Face Recognition", 
              desc: "Before Exam: To conduct initial identity verification of the test-taker.\n\nDuring exam: To continuously confirm the presence of the verified person.",
              icon: <UserCheck className="text-[#1C2933]" />
            },
            { 
              title: "Liveness Detection", 
              desc: "Before exam: To ensure facial identity verification process is performed by a real, live human. Aiming to guard against the use of a recording or mask.",
              icon: <Maximize className="text-[#1C2933]" />
            },
            { 
              title: "Screen Monitoring", 
              desc: "During Exam: To track and prevent user from switching to prohibited software or browser tabs for answers.",
              icon: <Monitor className="text-[#1C2933]" />
            },
            { 
              title: "Eye Tracking & Head Pose", 
              desc: "During Exam: To determine if the test-taker is potentially looking at an external source for help.",
              icon: <Eye className="text-[#1C2933]" />
            },
            { 
              title: "Audio Analysis", 
              desc: "During exam: To detect suspicious sounds like whispering or communicating with a third party.",
              icon: <Mic className="text-[#1C2933]" />
            },
            { 
              title: "Object Detection", 
              desc: "During Exam: To identify prohibited objects such as phones, cheating devices, or other unauthorized items.",
              icon: <Search className="text-[#1C2933]" />
            },
            { 
              title: " Multiple Face Detection", 
              desc: "During Exam: To ensure that no other person is present in the room assisting the test-taker.",
              icon: <Users className="text-[#1C2933]" />
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-[#FFFAFA] shadow-lg hover:shadow-xl transition-shadow border border-gray-50">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-gray-100 rounded-lg">{feature.icon}</div>
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-[#1C2933]">{feature.title}</h3>
                  <p className="text-sm text-[#212121] leading-relaxed whitespace-pre-line">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-[#1C5332] text-[#FFFAFA] py-20 px-6 font-sans">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              How <span className="text-[#F3B300]">TruthEye</span> AI Ensures Integrity
            </h2>
            <p className="text-lg text-[#FFFAFA] opacity-90">
              From pre-exam setup to final reporting, our automated workflow is designed for efficiency, accuracy, and scalability.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Registration & Identity Setup",
                desc: "Students Log in the secure platform and complete initial identity verification using face recognition with liveness detection."
              },
              {
                step: "2",
                title: "Pre-Exam Verification",
                desc: "Before starting the exam, students undergo identity verification with anti-spoofing checks by using face recognition with liveness detection."
              },
              {
                step: "3",
                title: "Real-Time AI Monitoring",
                desc: "During the exam, multiple AI models work simultaneously: face recognition tracks identity, eye tracking monitors gaze direction, audio analysis detects suspicious sounds, and object detection identifies unauthorized items."
              },
              {
                step: "4",
                title: "Smart Warning & Termination System",
                desc: "When suspicious activity is detected, the student receives an instant in-exam warning. If violations continue, the exam is automatically terminated."
              },
              {
                step: "5",
                title: "Instant Results & Reporting",
                desc: "Results are automatically displayed immediately. Comprehensive AI-generated reports are created with detailed analytics and video timestamps."
              }
            ].map((step, idx, array) => (
              <div key={idx} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#FFFAFA] text-[#1C5332] flex items-center justify-center font-bold text-2xl shrink-0 z-10 border-4 border-transparent shadow-lg">
                    {step.step}
                  </div>
                  {idx !== array.length - 1 && (
                    <div className="w-0.75 h-full relative">
                      <div className="absolute inset-0 bg-[#FFFAFA] blur-[2px] opacity-30"></div>
                      <div className="absolute inset-0 bg-linear-to-b from-white via-white/50 to-transparent"></div>
                    </div>
                  )}
                </div>

                <div className="pb-12 mt-2">
                  <h4 className="text-[#F3B300] font-bold text-xl mb-3">{step.title}</h4>
                  <p className="text-base text-gray-100 leading-relaxed font-medium opacity-90">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer  id="contact" className="bg-[#FFFAFA] py-16 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1C5332]/15 flex items-center justify-center text-[#1C5332] hover:bg-[#1C5332] hover:text-[#FFFAFA] cursor-pointer transition-colors"><FaFacebook size={16}/></div>
                <div className="w-8 h-8 rounded-full bg-[#1C5332]/15 flex items-center justify-center text-[#1C5332] hover:bg-[#1C5332] hover:text-[#FFFAFA] cursor-pointer transition-colors"><FaTwitter size={16}/></div>
                <div className="w-8 h-8 rounded-full bg-[#1C5332]/15 flex items-center justify-center text-[#1C5332] hover:bg-[#1C5332] hover:text-[#FFFAFA] cursor-pointer transition-colors"><FaInstagram size={16}/></div>
                <div className="w-8 h-8 rounded-full bg-[#1C5332]/15 flex items-center justify-center text-[#1C5332] hover:bg-[#1C5332] hover:text-[#FFFAFA] cursor-pointer transition-colors"><FaLinkedin size={16}/></div>
            </div>
            
            <div className="flex items-center gap-2">
              <img 
                src={logo}
                alt="Logo" 
                className="w-10 h-10" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=TE'; }}
              />
              <span className="text-xl font-bold text-[#1C5332]">
                Truth<span className="text-[#F3B300]">Eye</span>
              </span>
            </div>
            
            <p className="text-xs text-gray-400">© 2024 TruthEye Inc. All rights reserved.</p>
          </div>

          <div>
            <h5 className="font-bold text-[#1C2933] mb-6">Support</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">AI Support</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">Scalability</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">API Integration</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1C2933] mb-6">Company</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">Security & Privacy</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">Our Journey</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-[#1C2933] mb-6">Legal</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">Pricing Policy</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">GDPR Compliance</a></li>
              <li><a href="#" className="hover:text-[#1B4332] transition-colors">System Status</a></li>
            </ul>
          </div>
        </div>
      </footer>
      
      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#F3B300] text-white shadow-2xl transition-all duration-500 z-999 hover:bg-[#F3B300] hover:scale-110 active:scale-95 ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-16 scale-0 pointer-events-none'
        }`}
      >
        <ChevronUp size={24} strokeWidth={3} />
      </button>

    </div>
  );
  
};


export default App;