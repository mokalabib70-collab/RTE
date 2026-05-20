import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Logo from "../assets/Logo.png";
import profile from "../assets/profile (2).png";
import { 
  Bell, 
  User, 
  BookOpen, 
  Clock, 
  Lock, 
  X, 
  EyeOff, 
  Eye, 
  ChevronRight, 
  ChevronDown,
  MessageSquare, 
  Calendar, 
  AlertTriangle,
  Mail,
  FileText,
  Hourglass,
  Settings,
  PlusCircle,
  UserCog,
  UserPlus,
  BarChart2,
  Upload,
  Search
} from 'lucide-react';

// ===================== //
// NAV ITEM COMPONENT
// ===================== //
const NavItem = ({ icon, label, active = false, onClick }) => (
  <div
    className={active ? "nav-item-active" : "nav-item"}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <div className="nav-item-content">
      <span className={active ? "nav-icon-active" : "nav-icon"}>{icon}</span>
      <span className="nav-text">{label}</span>
    </div>
    <ChevronRight size={18} className={active ? "nav-arrow-active" : "nav-arrow"} />
  </div>
);

// ===================== //
// PROFILE PAGE COMPONENTS
// ===================== //
const PasswordInput = ({ placeholder, value, onChange, showPassword, togglePasswordVisibility }) => (
  <div className="password-input-container">
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="password-input"
    />
    <button type="button" onClick={togglePasswordVisibility} className="password-toggle-btn">
      {showPassword ? <Eye size={20} className="eye-icon-gray" /> : <EyeOff size={20} className="eye-icon-gray" />}
    </button>
  </div>
);

const InputField = ({ label, value, isDate = false }) => (
  <div className="input-field-container">
    <label className="input-label-profile">{label}</label>
    <div className="input-wrapper" style={{ position: 'relative' }}>
      <input type="text" defaultValue={value} readOnly className="input-base input-readonly" />
      {isDate && <Calendar className="date-icon" />}
    </div>
  </div>
);

const ChangePasswordModal = ({ onClose }) => {
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [visibility, setVisibility] = useState({ old: false, new: false, confirm: false });
  const [statusMessage, setStatusMessage] = useState(null);
  const [suggestedInfo, setSuggestedInfo] = useState(false);

  const handleUpdate = useCallback(() => {
    if (!passwords.old || !passwords.new || !passwords.confirm) {
      setStatusMessage({ type: 'error', text: 'Please fill in all fields.' });
      setSuggestedInfo(false);
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setStatusMessage({ type: 'error', text: 'New passwords do not match.' });
      setSuggestedInfo(false);
      return;
    }
    setStatusMessage({ type: 'success', text: 'Password updated successfully!' });
    setSuggestedInfo(false);
  }, [passwords]);

  const handleSuggest = () => {
    const strongPass = 'P@ssw0rd2026!';
    setPasswords({ ...passwords, new: strongPass, confirm: strongPass });
    setSuggestedInfo(true);
    setStatusMessage(null);
  };

  const toggleVisibility = (field) => setVisibility(prev => ({ ...prev, [field]: !prev[field] }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Change Password</h2>
          {statusMessage?.type !== 'success' && (
            <button onClick={onClose} className="modal-close-btn"><X size={24} /></button>
          )}
        </div>
        {statusMessage?.type === 'success' ? (
          <div className="success-ui-container">
            <p className="success-ui-text">{statusMessage.text}</p>
            <div className="success-ui-actions">
              <button onClick={onClose} className="btn-ok-success">OK</button>
            </div>
          </div>
        ) : (
          <div className="modal-body">
            {suggestedInfo && <p className="suggested-info-text">A strong password was suggested and filled in.</p>}
            {statusMessage?.type === 'error' && <p className="error-message-text">{statusMessage.text}</p>}
            <div className="password-fields">
              <PasswordInput placeholder="Old Password" value={passwords.old} onChange={(e) => setPasswords({...passwords, old: e.target.value})} showPassword={visibility.old} togglePasswordVisibility={() => toggleVisibility('old')} />
              <PasswordInput placeholder="New Password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} showPassword={visibility.new} togglePasswordVisibility={() => toggleVisibility('new')} />
              <PasswordInput placeholder="Confirm Password" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} showPassword={visibility.confirm} togglePasswordVisibility={() => toggleVisibility('confirm')} />
            </div>
            <div className="modal-footer-actions">
              <button className="btn-suggest-outlined" onClick={handleSuggest}>Suggest Strong Password</button>
              <button className="btn-update-solid" onClick={handleUpdate}>Update Password</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===================== //
// PROFILE PAGE
// ===================== //
const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const adminData = {
    firstName: 'Mona',
    lastName: 'Sayed',
    name: 'Mona Sayed',
    role: 'Administrator',
    employeeId: 'EMP-2025CS-0042',
    joinedDate: 'September 2025',
    dob: '9/8/1980',
    university: 'Beni-Suef University',
    faculty: 'Faculty of computer and AI',
    email: 'mona.sayed@bsu.edu.eg',
    phone: '+20 112 124 0126',
    img: profile
  };

  return (
    <main className="main-content">
      <div className="profile-container">
        <div className="profile-title-row">
          <h1 className="profile-title">My Profile</h1>
          <button className="btn-logout">Log Out</button>
        </div>

        <div className="profile-header-orig">
          <img src={adminData.img} alt="Profile" className="profile-img" />
          <div className="profile-info-orig">
            <h2 className="profile-name">{adminData.name}</h2>
            <p className="profile-role">{adminData.role}</p>
            <p className="profile-employee-id"><strong>Employee ID:</strong> {adminData.employeeId}</p>
            <p className="profile-joined">Joined: {adminData.joinedDate}</p>
          </div>
        </div>

        <section className="form-section">
          <div className="section-title-line">
            <div className="section-header"><User size={24} /> Personal Info</div>
          </div>
          <div className="form-grid-3">
            <InputField label="First Name" value={adminData.firstName} />
            <InputField label="Last Name" value={adminData.lastName} />
            <InputField label="Date of Birth" value={adminData.dob} isDate />
          </div>
        </section>
        <section className="form-section">
          <div className="section-title-line">
            <div className="section-header"><FileText size={24} /> Academic Details</div>
          </div>
          <div className="form-grid-2">
            <InputField label="University" value={adminData.university} />
            <InputField label="Faculty" value={adminData.faculty} />
          </div>
        </section>
        <section className="form-section">
          <div className="section-title-line">
            <div className="section-header"><Mail size={24} /> Contact Info</div>
          </div>
          <div className="form-grid-2">
            <InputField label="Email" value={adminData.email} />
            <InputField label="Phone Number" value={adminData.phone} />
          </div>
        </section>
        <section className="form-section">
          <div className="section-title-line">
            <div className="section-header"><Settings size={24} /> Security Settings</div>
          </div>
          <div className="security-container">
            <label className="input-label-profile">Change Password</label>
            <button className="btn-change-password-orig" onClick={() => setIsModalOpen(true)}>Update Password</button>
          </div>
        </section>
      </div>
      {isModalOpen && <ChangePasswordModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
};

// ===================== //
// MANAGE COURSES PAGE
// ===================== //
const ManageCoursesPage = ({ courses, setCourses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [method, setMethod] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  React.useEffect(() => {
    if (!window.XLSX) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleFileChange = (e) => { if (e.target.files?.[0]) setSelectedFile(e.target.files[0]); };

  const handleUploadExcel = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        if (window.XLSX) {
          const wb = window.XLSX.read(new Uint8Array(evt.target.result), { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const json = window.XLSX.utils.sheet_to_json(ws, { header: 1 });
          const newCourses = [];
          for (let i = 1; i < json.length; i++) {
            const row = json[i];
            if (row?.[0]) {
              const name = String(row[0]).trim();
              const code = row[1] ? String(row[1]).trim() : '';
              if (name) newCourses.push({ id: Date.now() + i, name: code ? name + ' (' + code + ')' : name });
            }
          }
          resolve({ success: true, courses: newCourses });
        } else resolve({ success: false, error: 'SheetJS not loaded.' });
      } catch { resolve({ success: false, error: 'Failed to parse file.' }); }
    };
    reader.onerror = () => resolve({ success: false, error: 'Failed to read file.' });
    reader.readAsArrayBuffer(file);
  });

  const handleUpload = async () => {
    if (!selectedFile) { showToast('error', 'Please choose an Excel file before uploading.'); return; }
    const result = await handleUploadExcel(selectedFile);
    if (result.success) {
      if (!result.courses.length) { showToast('error', 'No courses found. Check columns: CourseName, CoursesCode.'); }
      else { setCourses(prev => [...prev, ...result.courses]); showToast('success', result.courses.length + ' course(s) added from "' + selectedFile.name + '"!'); setSelectedFile(null); }
    } else showToast('error', result.error || 'Upload failed.');
  };

  const handleAddCourse = () => {
    if (!courseName.trim() && !courseCode.trim()) { showToast('error', 'Course name and Course Code cannot be empty.'); return; }
    if (!courseName.trim()) { showToast('error', 'Course name cannot be empty.'); return; }
    if (!courseCode.trim()) { showToast('error', 'Course Code cannot be empty.'); return; }
    setCourses(prev => [...prev, { id: Date.now(), name: courseName.trim() + ' (' + courseCode.trim() + ')' }]);
    showToast('success', 'Course "' + courseName.trim() + '" added successfully!');
    setCourseName(''); setCourseCode('');
  };

  const filtered = courses.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="main-content">
      <div className="mc-container">
        {toast && (
          <div className={`mc-toast mc-toast-${toast.type}`}>
            <span className="mc-toast-icon">{toast.type === 'success' ? '✓' : '✕'}</span>
            <span>{toast.msg}</span>
          </div>
        )}
        <div className="mc-card">
          <h2 className="mc-card-title">Create New Courses</h2>
          <div className="mc-select-wrapper">
            <select className="mc-select" value={method} onChange={e => { setMethod(e.target.value); setSelectedFile(null); }}>
              <option value="" disabled>Choose method</option>
              <option value="manual">Fill Form</option>
              <option value="excel">Upload Excel Sheet</option>
            </select>
            <span className="mc-select-arrow">▼</span>
          </div>
          {method === 'manual' && (
            <div className="mc-manual-row">
              <input type="text" className="mc-form-input" placeholder="Course name" value={courseName} onChange={e => setCourseName(e.target.value)} />
              <input type="text" className="mc-form-input" placeholder="Course Code" value={courseCode} onChange={e => setCourseCode(e.target.value)} />
              <button className="mc-btn-add" onClick={handleAddCourse}>Add</button>
            </div>
          )}
          {method === 'excel' && (
            <div className="mc-excel-section">
              <h3 className="mc-excel-title">Upload Courses (Excel)</h3>
              <label className="mc-file-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span>{selectedFile ? selectedFile.name : 'Choose Excel File (.xlsx, .xls)'}</span>
                <input type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={handleFileChange} />
              </label>
              <p className="mc-file-hint">Expected Courses columns: CourseName, CoursesCode</p>
              <button className="mc-btn-upload" onClick={handleUpload}>Upload</button>
            </div>
          )}
        </div>
        <div className="mc-card">
          <h2 className="mc-card-title">All Courses</h2>
          <div className="mc-search-wrapper">
            <svg className="mc-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" className="mc-search-input" placeholder="Search by Course name" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="mc-courses-list">
            {filtered.map(course => (
              <div key={course.id} className={`mc-course-row ${editingId === course.id ? 'mc-course-row-editing' : ''}`}>
                {editingId === course.id
                  ? <input className="mc-edit-input" value={editName} onChange={e => setEditName(e.target.value)} autoFocus />
                  : <span className="mc-course-name">{course.name}</span>
                }
                <div className="mc-course-actions">
                  {editingId === course.id
                    ? <button className="mc-btn-save" onClick={() => { setCourses(p => p.map(c => c.id === course.id ? {...c, name: editName} : c)); setEditingId(null); showToast('success', 'Course updated!'); }}>Save</button>
                    : <button className="mc-btn-edit" onClick={() => { setEditingId(course.id); setEditName(course.name); }}>Edit</button>
                  }
                  <button className="mc-btn-delete" onClick={() => setCourses(p => p.filter(c => c.id !== course.id))}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

// ===================== //
// ADD DEPARTMENTS PAGE
// ===================== //
const AddDepartmentsPage = ({ departments, setDepartments }) => {
  const [deptName, setDeptName] = useState('');
  const [deptDesc, setDeptDesc] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };
  const filtered = departments.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main className="main-content">
      <div className="mc-container">
        {toast && (
          <div className={`mc-toast mc-toast-${toast.type}`}>
            <span className="mc-toast-icon">{toast.type === 'success' ? '\u2713' : '\u2715'}</span>
            <span>{toast.msg}</span>
          </div>
        )}
        <div className="mc-card">
          <h2 className="mc-card-title">Create New Departments</h2>
          <div className="mc-manual-row">
            <input type="text" className="mc-form-input" placeholder="Department name" value={deptName} onChange={e => setDeptName(e.target.value)} />
            <input type="text" className="mc-form-input" placeholder="Department Description (Optional)" value={deptDesc} onChange={e => setDeptDesc(e.target.value)} />
            <button className="mc-btn-add" onClick={() => {
              if (!deptName.trim()) { showToast('error', 'Department name cannot be empty.'); return; }
              setDepartments(prev => [...prev, { id: Date.now(), name: deptName.trim(), desc: deptDesc.trim() }]);
              showToast('success', 'Department "' + deptName.trim() + '" added successfully!');
              setDeptName(''); setDeptDesc('');
            }}>Add</button>
          </div>
        </div>
        <div className="mc-card">
          <h2 className="mc-card-title">All Departments</h2>
          <div className="mc-search-wrapper">
            <svg className="mc-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" className="mc-search-input" placeholder="Search by Department name" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="mc-courses-list">
            {filtered.map(dept => (
              <div key={dept.id} className={`mc-course-row mc-dept-row ${editingId === dept.id ? 'mc-course-row-editing' : ''}`}>
                {editingId === dept.id ? (
                  <div className="mc-dept-edit-fields">
                    <input className="mc-edit-input" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Department name" autoFocus />
                    <input className="mc-edit-input mc-edit-desc" value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Description (Optional)" />
                  </div>
                ) : (
                  <div className="mc-dept-info">
                    <span className="mc-course-name">{dept.name}</span>
                    {dept.desc && <p className="mc-dept-desc">{dept.desc}</p>}
                  </div>
                )}
                <div className="mc-course-actions">
                  {editingId === dept.id ? (
                    <button className="mc-btn-save" onClick={() => {
                      if (!editName.trim()) { showToast('error', 'Department name cannot be empty.'); return; }
                      setDepartments(prev => prev.map(d => d.id === dept.id ? { ...d, name: editName.trim(), desc: editDesc.trim() } : d));
                      setEditingId(null); showToast('success', 'Department updated successfully!');
                    }}>Save</button>
                  ) : (
                    <button className="mc-btn-edit" onClick={() => { setEditingId(dept.id); setEditName(dept.name); setEditDesc(dept.desc); }}>Edit</button>
                  )}
                  <button className="mc-btn-delete" onClick={() => setDepartments(prev => prev.filter(d => d.id !== dept.id))}>Delete</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p style={{ color: '#9CA3AF', padding: '1rem 0', textAlign: 'center' }}>No departments found.</p>}
          </div>
        </div>
      </div>
    </main>
  );
};

// ===================== //
// ADD NEW DOCTORS PAGE
// ===================== //
const AddNewDoctorsPage = ({ departments, courses, onAddDoctor }) => {
  const [method, setMethod] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [toast, setToast] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [errorsD, setErrorsD] = useState({});
  const [touchedD, setTouchedD] = useState({});

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  const validateD = (name, value) => {
    switch(name) {
      case 'firstName':  return !value.trim() ? 'First name is required' : !/^[a-zA-Z\u00C0-\u024F\u0600-\u06FF\s]+$/.test(value.trim()) ? 'First name must contain letters only' : '';
      case 'lastName':   return !value.trim() ? 'Last name is required' : !/^[a-zA-Z\u00C0-\u024F\u0600-\u06FF\s]+$/.test(value.trim()) ? 'Last name must contain letters only' : '';
      case 'email':      return !value.trim() ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? 'Enter a valid email (e.g. name@university.edu)' : '';
      case 'nationalId': return !value.trim() ? 'National ID is required' : !/^\d+$/.test(value.trim()) ? 'National ID must contain digits only' : value.trim().length < 14 ? 'National ID must be at least 14 digits' : '';
      case 'phone':      return !value.trim() ? 'Phone is required' : !/^\d+$/.test(value.trim()) ? 'Phone must contain digits only' : value.trim().length < 10 ? 'Phone must be at least 10 digits' : '';
      case 'password':   return !value.trim() ? 'Password is required' : value.trim().length < 6 ? 'Password must be at least 6 characters' : '';
      default: return '';
    }
  };
  const touchD = (name) => setTouchedD(prev => ({ ...prev, [name]: true }));
  const handleChangeD = (name, value) => { setErrorsD(prev => ({ ...prev, [name]: validateD(name, value) })); return value; };

  const handleAddDoctor = () => {
    const fields = { firstName, lastName, email, nationalId, phone, password };
    const newErrors = {};
    Object.entries(fields).forEach(([k, v]) => { newErrors[k] = validateD(k, v); });
    setErrorsD(newErrors);
    setTouchedD({ firstName:true, lastName:true, email:true, nationalId:true, phone:true, password:true });
    if (Object.values(newErrors).some(e => e)) { showToast('error', 'Please fix the errors before submitting.'); return; }
    const newDoctor = {
      uid: Date.now(), id: String(Date.now()),
      name: firstName.trim() + ' ' + lastName.trim(),
      email: email.trim(), nationalId: nationalId.trim(), phone: phone.trim(),
      dept: departmentId, courses: [],
    };
    onAddDoctor(newDoctor);
    showToast('success', 'Doctor "' + newDoctor.name + '" added successfully!');
    setFirstName(''); setLastName(''); setNationalId(''); setEmail(''); setPhone(''); setPassword(''); setDepartmentId('');
    setErrorsD({}); setTouchedD({});
  };

  const FieldErrorD = ({ name }) => errorsD[name] && touchedD[name]
    ? <p style={{margin:'4px 0 0 2px',fontSize:11.5,color:'#dc2626',fontWeight:600,display:'flex',alignItems:'center',gap:4}}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {errorsD[name]}
      </p>
    : null;
  const inputStyleD = (name) => ({ outline:'none', border: errorsD[name] && touchedD[name] ? '1.5px solid #dc2626' : undefined, backgroundColor: errorsD[name] && touchedD[name] ? '#fff8f8' : undefined });

  return (
    <main className="main-content">
      <div className="mc-container">
        {toast && (
          <div className={`mc-toast mc-toast-${toast.type}`}>
            <span className="mc-toast-icon">{toast.type === 'success' ? '\u2713' : '\u2715'}</span>
            <span>{toast.msg}</span>
          </div>
        )}
        <div className="mc-card">
          <h2 className="mc-card-title">Create Doctor Accounts</h2>
          <div className="mc-select-wrapper">
            <select className="mc-select" value={method} onChange={e => { setMethod(e.target.value); setSelectedFile(null); }}>
              <option value="" disabled>Choose method</option>
              <option value="manual">Fill Form</option>
              <option value="excel">Upload Excel Sheet</option>
            </select>
            <span className="mc-select-arrow">▼</span>
          </div>
          {method === 'excel' && (
            <div className="mc-excel-section">
              <h3 className="mc-excel-title">Upload Doctors (Excel)</h3>
              <label className="mc-file-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span>{selectedFile ? selectedFile.name : 'Choose Excel File (.xlsx, .xls)'}</span>
                <input type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && setSelectedFile(e.target.files[0])} />
              </label>
              <p className="mc-file-hint">Expected student columns: Doctor ID, Name, Email, National ID, Department ID, CoursesCode</p>
              <button className="mc-btn-upload" onClick={() => {
                if (!selectedFile) { showToast('error', 'Please choose an Excel file before uploading.'); return; }
                showToast('success', 'File "' + selectedFile.name + '" uploaded successfully!'); setSelectedFile(null);
              }}>Upload</button>
            </div>
          )}
          {method === 'manual' && (
            <div className="mc-manual-section">
              <div className="mc-doctor-form-grid">
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">First name <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="text" className="mc-form-input" value={firstName} style={inputStyleD('firstName')}
                    onChange={e => { const v = e.target.value.replace(/[^a-zA-Z\u00C0-\u024F\u0600-\u06FF\s]/g,''); setFirstName(handleChangeD('firstName', v)); }} onBlur={() => touchD('firstName')} />
                  <FieldErrorD name="firstName" />
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Last name <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="text" className="mc-form-input" value={lastName} style={inputStyleD('lastName')}
                    onChange={e => { const v = e.target.value.replace(/[^a-zA-Z\u00C0-\u024F\u0600-\u06FF\s]/g,''); setLastName(handleChangeD('lastName', v)); }} onBlur={() => touchD('lastName')} />
                  <FieldErrorD name="lastName" />
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">National ID <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="text" className="mc-form-input" value={nationalId} style={inputStyleD('nationalId')}
                    onChange={e => { const v = e.target.value.replace(/\D/g,''); setNationalId(handleChangeD('nationalId', v)); }}
                    onBlur={() => touchD('nationalId')} placeholder="14-digit national ID" maxLength={14} />
                  <FieldErrorD name="nationalId" />
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Email <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="email" className="mc-form-input" value={email} style={inputStyleD('email')}
                    onChange={e => setEmail(handleChangeD('email', e.target.value))} onBlur={() => touchD('email')}
                    placeholder="name@university.edu" />
                  <FieldErrorD name="email" />
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Phone <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="text" className="mc-form-input" value={phone} style={inputStyleD('phone')}
                    onChange={e => { const v = e.target.value.replace(/\D/g,''); setPhone(handleChangeD('phone', v)); }}
                    onBlur={() => touchD('phone')} placeholder="01XXXXXXXXX" maxLength={11} />
                  <FieldErrorD name="phone" />
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Password <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="password" className="mc-form-input" value={password} style={inputStyleD('password')}
                    onChange={e => setPassword(handleChangeD('password', e.target.value))} onBlur={() => touchD('password')}
                    placeholder="Min. 6 characters" />
                  <FieldErrorD name="password" />
                </div>
              </div>
              <div className="mc-doctor-field" style={{marginTop: '0.85rem', maxWidth: '50%'}}>
                <label className="mc-doctor-label">Department</label>
                <div className="mc-select-wrapper">
                  <select className="mc-select" value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
                    <option value="" disabled>Select Department</option>
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                  <span className="mc-select-arrow">▼</span>
                </div>
              </div>
              <button className="mc-btn-doctor-add" onClick={handleAddDoctor}>Add Doctor</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// ===================== //
// ASSIGN COURSES PAGE
// ===================== //
const AssignCoursesPage = ({ doctors, courses, setDoctors }) => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [toast, setToast] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const selectedDoc = doctors.find(d => d.uid === Number(selectedDoctor) || d.id === selectedDoctor);
  const filteredCourses = courses.filter(c => c.name.toLowerCase().includes(courseSearch.toLowerCase()));
  const toggleCourse = (id) => setSelectedCourses(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  return (
    <main className="main-content">
      <div className="mc-container">
        {toast && (
          <div className={`mc-toast mc-toast-${toast.type}`}>
            <span className="mc-toast-icon">{toast.type === 'success' ? '\u2713' : '\u2715'}</span>
            <span>{toast.msg}</span>
          </div>
        )}
        {showResetModal && (
          <div className="confirm-modal-overlay" onClick={() => setShowResetModal(false)}>
            <div className="confirm-modal-box" onClick={e => e.stopPropagation()}>
              <h2 className="confirm-modal-title">Confirmation Required</h2>
              <p className="confirm-modal-text">
                Are you ABSOLUTELY sure you want to delete ALL assigned courses for EVERY doctor?
                This action is typically done at the beginning of a new Semester
              </p>
              <div className="confirm-modal-actions">
                <button className="confirm-modal-btn-confirm" onClick={() => {
                  setDoctors(prev => prev.map(d => ({ ...d, courses: [] })));
                  setShowResetModal(false);
                  showToast('success', 'All doctor course assignments have been reset!');
                }}>Confirm</button>
                <button className="confirm-modal-btn-cancel" onClick={() => setShowResetModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div className="mc-card">
          <h2 className="mc-card-title">Select Doctor &amp; Assign Courses</h2>
          <div className="ac-section-label">Select Doctor</div>
          <div className="mc-select-wrapper">
            <select className="mc-select" value={selectedDoctor} onChange={e => { setSelectedDoctor(e.target.value); setSelectedCourses([]); setCourseSearch(''); }}>
              <option value="" disabled>Select Doctor</option>
              {doctors.map(d => <option key={d.uid} value={d.uid}>{d.name} ({d.dept})</option>)}
            </select>
            <span className="mc-select-arrow">▼</span>
          </div>
        </div>
        {selectedDoc && (
          <div className="mc-card">
            <h2 className="ac-assign-title">Assign Courses for Dr. {selectedDoc.name}</h2>
            <div className="mc-search-wrapper">
              <svg className="mc-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" className="mc-search-input" placeholder="Search by Course name" value={courseSearch} onChange={e => setCourseSearch(e.target.value)} />
            </div>
            <div className="ac-courses-grid">
              {filteredCourses.map(course => (
                <label key={course.id} className={`ac-course-checkbox ${selectedCourses.includes(course.id) ? 'ac-course-checked' : ''}`}>
                  <input type="checkbox" checked={selectedCourses.includes(course.id)} onChange={() => toggleCourse(course.id)} style={{ display: 'none' }} />
                  <span className={`ac-checkbox-box ${selectedCourses.includes(course.id) ? 'ac-checkbox-checked' : ''}`}></span>
                  <span className="ac-course-label">{course.name}</span>
                </label>
              ))}
            </div>
            <button className="mc-btn-doctor-add" onClick={() => {
              if (!selectedCourses.length) { showToast('error', 'Please select at least one course.'); return; }
              const courseNames = courses.filter(c => selectedCourses.includes(c.id)).map(c => c.name);
              setDoctors(prev => prev.map(d =>
                (d.uid === Number(selectedDoctor) || d.id === selectedDoctor)
                  ? { ...d, courses: [...new Set([...d.courses, ...courseNames])] }
                  : d
              ));
              showToast('success', courseNames.length + ' course(s) assigned to Dr. ' + selectedDoc.name + '!');
              setSelectedCourses([]);
            }}>Save Assignments</button>
          </div>
        )}
        <div className="ac-danger-card">
          <h2 className="ac-danger-title">
            <AlertTriangle size={26} className="ac-danger-icon" />
            Semester Course Management (Reset)
          </h2>
          <p className="ac-danger-desc">Use this button only at the beginning of the Semester to clear all existing course assignments for ALL doctors.</p>
          <button className="ac-btn-reset" onClick={() => setShowResetModal(true)}>Reset ALL Doctor Course Assignments</button>
        </div>
      </div>
    </main>
  );
};

// ===================== //
// ADD NEW STUDENTS PAGE
// ===================== //
const AddNewStudentsPage = ({ departments, courses, onAddStudent }) => {
  const [method, setMethod] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [toast, setToast] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const filteredCourses = courses.filter(c => c.name.toLowerCase().includes(courseSearch.toLowerCase()));
  const toggleCourse = (id) => setSelectedCourses(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  const validateField = (name, value) => {
    switch(name) {
      case 'firstName':  return !value.trim() ? 'First name is required' : !/^[a-zA-Z\u00C0-\u024F\u0600-\u06FF\s]+$/.test(value.trim()) ? 'First name must contain letters only' : '';
      case 'lastName':   return !value.trim() ? 'Last name is required' : !/^[a-zA-Z\u00C0-\u024F\u0600-\u06FF\s]+$/.test(value.trim()) ? 'Last name must contain letters only' : '';
      case 'email':      return !value.trim() ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? 'Enter a valid email (e.g. name@university.edu)' : '';
      case 'nationalId': return !value.trim() ? 'National ID is required' : !/^\d+$/.test(value.trim()) ? 'National ID must contain digits only' : value.trim().length < 14 ? 'National ID must be at least 14 digits' : '';
      case 'phone':      return !value.trim() ? 'Phone is required' : !/^\d+$/.test(value.trim()) ? 'Phone must contain digits only' : value.trim().length < 10 ? 'Phone must be at least 10 digits' : '';
      case 'password':   return !value.trim() ? 'Password is required' : value.trim().length < 6 ? 'Password must be at least 6 characters' : '';
      default: return '';
    }
  };

  const touch = (name) => setTouched(prev => ({ ...prev, [name]: true }));

  const handleChange = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    return value;
  };

  const handleAddStudent = () => {
    const fields = { firstName, lastName, email, nationalId, phone, password };
    const newErrors = {};
    Object.entries(fields).forEach(([k, v]) => { newErrors[k] = validateField(k, v); });
    setErrors(newErrors);
    setTouched({ firstName:true, lastName:true, email:true, nationalId:true, phone:true, password:true });
    if (Object.values(newErrors).some(e => e)) {
      showToast('error', 'Please fix the errors before submitting.'); return;
    }
    const newStudent = {
      uid: Date.now(),
      id: String(Date.now()),
      name: firstName.trim() + ' ' + lastName.trim(),
      email: email.trim(),
      nationalId: nationalId.trim(),
      phone: phone.trim(),
      dob: dob || '',
      dept: departmentId,
      level: Number(academicYear) || 1,
      courses: courses.filter(c => selectedCourses.includes(c.id)).map(c => c.name),
    };
    onAddStudent(newStudent);
    showToast('success', 'Student "' + newStudent.name + '" added successfully!');
    setFirstName(''); setLastName(''); setNationalId(''); setEmail('');
    setPhone(''); setPassword(''); setDob(''); setDepartmentId(''); setAcademicYear('');
    setCourseSearch(''); setSelectedCourses(''); setErrors({}); setTouched({});
  };

  const FieldError = ({ name }) => errors[name] && touched[name]
    ? <p style={{margin:'4px 0 0 2px',fontSize:11.5,color:'#dc2626',fontWeight:600,display:'flex',alignItems:'center',gap:4}}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {errors[name]}
      </p>
    : null;

  const inputStyle = (name) => ({
    ...{},
    outline: 'none',
    border: errors[name] && touched[name] ? '1.5px solid #dc2626' : undefined,
    backgroundColor: errors[name] && touched[name] ? '#fff8f8' : undefined,
  });

  return (
    <main className="main-content">
      <div className="mc-container">
        {toast && (
          <div className={`mc-toast mc-toast-${toast.type}`}>
            <span className="mc-toast-icon">{toast.type === 'success' ? '\u2713' : '\u2715'}</span>
            <span>{toast.msg}</span>
          </div>
        )}
        <div className="mc-card">
          <h2 className="mc-card-title">Create Student Accounts</h2>
          <div className="mc-select-wrapper">
            <select className="mc-select" value={method} onChange={e => { setMethod(e.target.value); setSelectedFile(null); }}>
              <option value="" disabled>Choose method</option>
              <option value="manual">Fill Form</option>
              <option value="excel">Upload Excel Sheet</option>
            </select>
            <span className="mc-select-arrow">▼</span>
          </div>
          {method === 'excel' && (
            <div className="mc-excel-section">
              <h3 className="mc-excel-title">Upload Students (Excel)</h3>
              <label className="mc-file-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span>{selectedFile ? selectedFile.name : 'Choose Excel File (.xlsx, .xls)'}</span>
                <input type="file" accept=".xlsx,.xls" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && setSelectedFile(e.target.files[0])} />
              </label>
              <p className="mc-file-hint">Expected student columns: StudentID, Name, Email, National ID, Department ID, Academic Year, CoursesCode/Name</p>
              <button className="mc-btn-upload" onClick={() => {
                if (!selectedFile) { showToast('error', 'Please choose an Excel file before uploading.'); return; }
                showToast('success', 'File "' + selectedFile.name + '" uploaded successfully!'); setSelectedFile(null);
              }}>Upload</button>
            </div>
          )}
          {method === 'manual' && (
            <div className="mc-manual-section">
              <div className="mc-doctor-form-grid">
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">First name <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="text" className="mc-form-input" value={firstName} style={inputStyle('firstName')}
                    onChange={e => { const v = e.target.value.replace(/[^a-zA-Z\u00C0-\u024F\u0600-\u06FF\s]/g,''); setFirstName(handleChange('firstName', v)); }}
                    onBlur={() => touch('firstName')} />
                  <FieldError name="firstName" />
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Last name <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="text" className="mc-form-input" value={lastName} style={inputStyle('lastName')}
                    onChange={e => { const v = e.target.value.replace(/[^a-zA-Z\u00C0-\u024F\u0600-\u06FF\s]/g,''); setLastName(handleChange('lastName', v)); }}
                    onBlur={() => touch('lastName')} />
                  <FieldError name="lastName" />
                </div>
              </div>
              <div className="mc-doctor-form-grid" style={{marginTop:'0.85rem'}}>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">National ID <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="text" className="mc-form-input" value={nationalId} style={inputStyle('nationalId')}
                    onChange={e => { const v = e.target.value.replace(/\D/g,''); setNationalId(handleChange('nationalId', v)); }}
                    onBlur={() => touch('nationalId')} placeholder="14-digit national ID" maxLength={14} />
                  <FieldError name="nationalId" />
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Email <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="email" className="mc-form-input" value={email} style={inputStyle('email')}
                    onChange={e => setEmail(handleChange('email', e.target.value))}
                    onBlur={() => touch('email')} placeholder="name@university.edu" />
                  <FieldError name="email" />
                </div>
              </div>
              <div className="mc-doctor-form-grid" style={{marginTop:'0.85rem'}}>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Phone <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="text" className="mc-form-input" value={phone} style={inputStyle('phone')}
                    onChange={e => { const v = e.target.value.replace(/\D/g,''); setPhone(handleChange('phone', v)); }}
                    onBlur={() => touch('phone')} placeholder="01XXXXXXXXX" maxLength={11} />
                  <FieldError name="phone" />
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Password <span style={{color:'#dc2626'}}>*</span></label>
                  <input type="password" className="mc-form-input" value={password} style={inputStyle('password')}
                    onChange={e => setPassword(handleChange('password', e.target.value))}
                    onBlur={() => touch('password')} placeholder="Min. 6 characters" />
                  <FieldError name="password" />
                </div>
              </div>
              <div className="mc-doctor-form-grid" style={{marginTop:'0.85rem'}}>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Department</label>
                  <div className="mc-select-wrapper">
                    <select className="mc-select" value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
                      <option value="" disabled>Select Department</option>
                      {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                    <span className="mc-select-arrow">▼</span>
                  </div>
                </div>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Academic Year</label>
                  <div className="mc-select-wrapper">
                    <select className="mc-select" value={academicYear} onChange={e => setAcademicYear(e.target.value)}>
                      <option value="" disabled>Select Year</option>
                      <option value="1">1st Year</option><option value="2">2nd Year</option>
                      <option value="3">3rd Year</option><option value="4">4th Year</option>
                    </select>
                    <span className="mc-select-arrow">▼</span>
                  </div>
                </div>
              </div>
              <div className="mc-doctor-form-grid" style={{marginTop:'0.85rem'}}>
                <div className="mc-doctor-field">
                  <label className="mc-doctor-label">Date of Birth <span style={{color:'#aaa',fontWeight:400,fontSize:'0.85em'}}>(optional)</span></label>
                  <input type="date" className="mc-form-input" value={dob}
                    onChange={e => setDob(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    style={{cursor:'pointer'}} />
                </div>
              </div>
              <div style={{marginTop:'1.25rem'}}>
                <h3 className="ac-assign-title" style={{fontSize:'1.1rem', marginBottom:'0.75rem'}}>
                  Assign Courses<span style={{fontWeight:400, fontSize:'0.9rem', color:'#6B7280'}}> (search to filter)</span>
                </h3>
                <div className="mc-search-wrapper" style={{marginBottom:'0.75rem'}}>
                  <svg className="mc-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input type="text" className="mc-search-input" placeholder="Search by Course name" value={courseSearch} onChange={e => setCourseSearch(e.target.value)} />
                </div>
                <div className="ac-courses-grid">
                  {filteredCourses.map(course => (
                    <label key={course.id} className={`ac-course-checkbox ${selectedCourses.includes(course.id) ? 'ac-course-checked' : ''}`}>
                      <input type="checkbox" checked={selectedCourses.includes(course.id)} onChange={() => toggleCourse(course.id)} style={{ display: 'none' }} />
                      <span className={`ac-checkbox-box ${selectedCourses.includes(course.id) ? 'ac-checkbox-checked' : ''}`}></span>
                      <span className="ac-course-label">{course.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="mc-btn-doctor-add" onClick={handleAddStudent}>Add Student</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// ===================== //
// REPORTS PAGE
// ===================== //
const ReportsPage = ({ students, setStudents, doctors, setDoctors, courses, departments }) => {
  const [activeTab, setActiveTab] = useState('default');
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [studentPage, setStudentPage] = useState(0);
  const [doctorPage, setDoctorPage] = useState(0);
  const [editingUid, setEditingUid] = useState(null);
  const [editType, setEditType] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [toast, setToast] = useState(null);
  const [showDeleteAllStudentsModal, setShowDeleteAllStudentsModal] = useState(false);
  const [showDeleteAllDoctorsModal, setShowDeleteAllDoctorsModal] = useState(false);
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState(null);

  const PAGE_SIZE = 4;
  const AVAILABLE_COURSES = [...new Set([
    ...courses.map(c => c.name),
    ...students.flatMap(s => s.courses),
    ...doctors.flatMap(d => d.courses),
  ])].filter(Boolean).sort();

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  const startEdit = (type, record) => { setEditType(type); setEditingUid(record.uid); setEditForm({ ...record, coursesStr: record.courses.join(', ') }); };
  const cancelEdit = () => { setEditingUid(null); setEditType(null); setEditForm({}); };

  const saveEdit = () => {
    const uniqueCourses = [...new Set(editForm.courses.filter(c => c && c.trim()))];
    const updated = { ...editForm, courses: uniqueCourses };
    if (editType === 'student') setStudents(prev => prev.map(s => s.uid === editingUid ? { ...s, ...updated } : s));
    else setDoctors(prev => prev.map(d => d.uid === editingUid ? { ...d, ...updated } : d));
    cancelEdit();
    showToast('success', 'Record updated successfully!');
  };

  const handleDeleteStudent = (uid, name) => { setDeleteConfirmTarget({ uid, name, type: 'student' }); };
  const handleDeleteDoctor  = (uid, name) => { setDeleteConfirmTarget({ uid, name, type: 'doctor' }); };

  const confirmSingleDelete = () => {
    if (!deleteConfirmTarget) return;
    if (deleteConfirmTarget.type === 'student') {
      setStudents(prev => prev.filter(s => s.uid !== deleteConfirmTarget.uid));
      showToast('success', 'Student deleted successfully!');
    } else {
      setDoctors(prev => prev.filter(d => d.uid !== deleteConfirmTarget.uid));
      showToast('success', 'Doctor deleted successfully!');
    }
    setDeleteConfirmTarget(null);
  };

  const ef = (k, v) => setEditForm(prev => ({ ...prev, [k]: v }));

  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );

  const StudentCard = ({ s }) => {
    const isEditing = editingUid === s.uid && editType === 'student';
    return (
      <div className={`rp-card ${isEditing ? 'rp-card-editing' : ''}`}>
        <div className="rp-card-header">
          <div><span className="rp-label">ID:</span> {s.id}</div>
          {!isEditing && <button className="rp-edit-btn" onClick={() => startEdit('student', s)}><EditIcon /></button>}
        </div>
        {isEditing ? (
          <>
            <div className="rp-edit-field"><span className="rp-label">Name</span><input className="rp-inline-input" value={editForm.name} onChange={e => ef('name', e.target.value)} /></div>
            <div className="rp-edit-field"><span className="rp-label">Email</span><input className="rp-inline-input" value={editForm.email} onChange={e => ef('email', e.target.value)} /></div>
            <div className="rp-edit-field"><span className="rp-label">National ID</span><input className="rp-inline-input" value={editForm.nationalId} onChange={e => ef('nationalId', e.target.value)} /></div>
            <div className="rp-edit-field"><span className="rp-label">Phone</span><input className="rp-inline-input" value={editForm.phone} onChange={e => ef('phone', e.target.value)} /></div>
            <div className="rp-edit-field"><span className="rp-label">Date of Birth</span><input className="rp-inline-input" value={editForm.dob} onChange={e => ef('dob', e.target.value)} /></div>
            <div className="rp-edit-field">
              <span className="rp-label">Department ID</span>
              <select className="rp-inline-input" value={editForm.dept} onChange={e => ef('dept', e.target.value)}>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div className="rp-edit-field">
              <span className="rp-label">Academic Year</span>
              <select className="rp-inline-input" value={editForm.level} onChange={e => ef('level', e.target.value)}>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="rp-edit-field">
              <span className="rp-label">Assigned Courses</span>
              <ul className="rp-courses-edit-list">
                {editForm.courses.map((c, i) => (
                  <li key={i} className="rp-courses-edit-item">
                    <span className="rp-courses-edit-bullet">•</span>
                    <select className="rp-inline-input rp-course-input" value={c}
                      onChange={e => { const u=[...editForm.courses]; u[i]=e.target.value; ef('courses',u); }}>
                      <option value="">— Select course —</option>
                      {AVAILABLE_COURSES.filter(ac => !editForm.courses.includes(ac) || ac === c).map(ac => <option key={ac} value={ac}>{ac}</option>)}
                    </select>
                    <button className="rp-course-remove-btn" onClick={() => ef('courses', editForm.courses.filter((_,j) => j !== i))}>✕</button>
                  </li>
                ))}
              </ul>
              <button className="rp-course-add-btn" onClick={() => ef('courses', [...editForm.courses, ''])}>+ Add Course</button>
            </div>
            <button className="rp-save-btn" onClick={saveEdit}>Save Changes</button>
          </>
        ) : (
          <>
            <p className="rp-row"><span className="rp-label">Name:</span> {s.name}</p>
            <p className="rp-row"><span className="rp-label">Email:</span> {s.email}</p>
            <p className="rp-row"><span className="rp-label">National ID:</span> {s.nationalId}</p>
            <p className="rp-row"><span className="rp-label">Phone:</span> {s.phone}</p>
            <p className="rp-row"><span className="rp-label">Date of Birth:</span> {s.dob}</p>
            <p className="rp-row"><span className="rp-label">Department ID:</span> {s.dept}</p>
            <p className="rp-row"><span className="rp-label">Academic Year:</span> {s.level}</p>
            <p className="rp-label" style={{marginBottom:'4px'}}>Assigned Courses</p>
            <ul className="rp-courses">{s.courses.map((c,i) => <li key={i}>{c}</li>)}</ul>
            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'0.5rem'}}>
              <button className="rp-delete-btn" onClick={() => handleDeleteStudent(s.uid, s.name)}>Delete</button>
            </div>
          </>
        )}
      </div>
    );
  };

  const DoctorCard = ({ d }) => {
    const isEditing = editingUid === d.uid && editType === 'doctor';
    return (
      <div className={`rp-card ${isEditing ? 'rp-card-editing' : ''}`}>
        <div className="rp-card-header">
          <div><span className="rp-label">ID:</span> {d.id}</div>
          {!isEditing && <button className="rp-edit-btn" onClick={() => startEdit('doctor', d)}><EditIcon /></button>}
        </div>
        {isEditing ? (
          <>
            <div className="rp-edit-field"><span className="rp-label">Name</span><input className="rp-inline-input" value={editForm.name} onChange={e => ef('name', e.target.value)} /></div>
            <div className="rp-edit-field"><span className="rp-label">Email</span><input className="rp-inline-input" value={editForm.email} onChange={e => ef('email', e.target.value)} /></div>
            <div className="rp-edit-field">
              <span className="rp-label">Department</span>
              <select className="rp-inline-input" value={editForm.dept} onChange={e => ef('dept', e.target.value)}>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div className="rp-edit-field">
              <span className="rp-label">Assigned Courses</span>
              <ul className="rp-courses-edit-list">
                {editForm.courses.map((c, i) => (
                  <li key={i} className="rp-courses-edit-item">
                    <span className="rp-courses-edit-bullet">•</span>
                    <select className="rp-inline-input rp-course-input" value={c}
                      onChange={e => { const u=[...editForm.courses]; u[i]=e.target.value; ef('courses',u); }}>
                      <option value="">— Select course —</option>
                      {AVAILABLE_COURSES.filter(ac => !editForm.courses.includes(ac) || ac === c).map(ac => <option key={ac} value={ac}>{ac}</option>)}
                    </select>
                    <button className="rp-course-remove-btn" onClick={() => ef('courses', editForm.courses.filter((_,j) => j !== i))}>✕</button>
                  </li>
                ))}
              </ul>
              <button className="rp-course-add-btn" onClick={() => ef('courses', [...editForm.courses, ''])}>+ Add Course</button>
            </div>
            <button className="rp-save-btn" onClick={saveEdit}>Save Changes</button>
          </>
        ) : (
          <>
            <p className="rp-row"><span className="rp-label">Name:</span> {d.name}</p>
            <p className="rp-row"><span className="rp-label">Email:</span> {d.email}</p>
            <p className="rp-row"><span className="rp-label">Department:</span> {d.dept}</p>
            <p className="rp-label" style={{marginBottom:'4px'}}>Assigned Courses</p>
            <ul className="rp-courses">{d.courses.map((c,i) => <li key={i}>{c}</li>)}</ul>
            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'0.5rem'}}>
              <button className="rp-delete-btn" onClick={() => handleDeleteDoctor(d.uid, d.name)}>Delete</button>
            </div>
          </>
        )}
      </div>
    );
  };

  const filterStudents = () => {
    let list = students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.id.includes(search)
    );
    if (levelFilter) list = list.filter(s => String(s.level) === levelFilter);
    return list;
  };
  const filterDoctors = () => doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    d.id.includes(search)
  );

  const filteredStudents = filterStudents();
  const filteredDoctors  = filterDoctors();
  const studentPages = Math.ceil(filteredStudents.length / PAGE_SIZE) || 1;
  const doctorPages  = Math.ceil(filteredDoctors.length  / PAGE_SIZE) || 1;
  const visibleStudents = filteredStudents.slice(studentPage * PAGE_SIZE, (studentPage + 1) * PAGE_SIZE);
  const visibleDoctors  = filteredDoctors.slice(doctorPage  * PAGE_SIZE, (doctorPage  + 1) * PAGE_SIZE);

  const PaginationBar = ({ current, total, count, onPage, onPrev, onNext }) => {
    const pageInputRef = React.useRef(null);
    const maxShow = 8;
    const pages = Array.from({ length: Math.min(total, maxShow) }, (_, i) => i);
    const goToPage = () => {
      const v = parseInt(pageInputRef.current?.value) - 1;
      if (!isNaN(v) && v >= 0 && v < total) onPage(v);
    };
    return (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem', marginTop:'1.25rem'}}>
        <div style={{display:'flex', alignItems:'center', gap:'0.3rem', flexWrap:'wrap', justifyContent:'center'}}>
          <button className="rp-pag-btn" onClick={onPrev} disabled={current===0}>‹ Back</button>
          {pages.map(i => (
            <button key={i} className={`rp-pag-num${current===i?' rp-pag-active':''}`} onClick={() => onPage(i)}>{i+1}</button>
          ))}
          {total > maxShow && <span style={{color:'#9CA3AF',fontSize:'16px',padding:'0 4px'}}>...</span>}
          <button className="rp-pag-btn" onClick={onNext} disabled={current>=total-1}>Next ›</button>
          <span style={{marginLeft:'0.5rem',color:'#6B7280',fontSize:'13px'}}>Page</span>
          <input ref={pageInputRef} className="rp-pag-input" type="number" min={1} max={total} defaultValue={current+1}
            onKeyDown={e => { if(e.key==='Enter') goToPage(); }} />
          <button className="rp-pag-btn" onClick={goToPage}>Go</button>
        </div>
        <div style={{fontSize:'13px',color:'#6B7280'}}>{current*PAGE_SIZE+1}–{Math.min((current+1)*PAGE_SIZE,count)} of {count}</div>
      </div>
    );
  };

  const ConfirmDeleteModal = ({ title, message, onConfirm, onCancel }) => (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal-box" onClick={e => e.stopPropagation()}>
        <h2 className="confirm-modal-title">{title}</h2>
        <p className="confirm-modal-text">{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-modal-btn-confirm" onClick={onConfirm}>Confirm Deletion</button>
          <button className="confirm-modal-btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );

  const SingleDeleteModal = () => {
    if (!deleteConfirmTarget) return null;
    const isDoctor = deleteConfirmTarget.type === 'doctor';
    return (
      <div className="confirm-modal-overlay" onClick={() => setDeleteConfirmTarget(null)}>
        <div className="confirm-modal-box" onClick={e => e.stopPropagation()}>
          <h2 className="confirm-modal-title">Confirm {isDoctor ? 'Doctor' : 'Student'} Account Deletion</h2>
          <p className="confirm-modal-text">
            Are you sure you want to delete {deleteConfirmTarget.name}'s account?
            This action is final and cannot be undone.
          </p>
          <div className="confirm-modal-actions">
            <button className="confirm-modal-btn-confirm" onClick={confirmSingleDelete}>Confirm Deletion</button>
            <button className="confirm-modal-btn-cancel" onClick={() => setDeleteConfirmTarget(null)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  if (activeTab === 'default') {
    const defFilteredStudents = students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.id.includes(search)
    );
    const defFilteredDoctors = doctors.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.id.includes(search)
    );
    const defStudentPages = Math.ceil(defFilteredStudents.length / PAGE_SIZE) || 1;
    const defDoctorPages  = Math.ceil(defFilteredDoctors.length  / PAGE_SIZE) || 1;
    const defVisibleStudents = defFilteredStudents.slice(studentPage * PAGE_SIZE, (studentPage+1) * PAGE_SIZE);
    const defVisibleDoctors  = defFilteredDoctors.slice(doctorPage   * PAGE_SIZE, (doctorPage+1)  * PAGE_SIZE);

    return (
      <main className="main-content">
        <div className="mc-container" style={{maxWidth:'100%'}}>
          {toast && <div className={`mc-toast mc-toast-${toast.type}`} style={{zIndex:9998}}><span className="mc-toast-icon">{toast.type==='success'?'\u2713':'\u2715'}</span><span>{toast.msg}</span></div>}
          <SingleDeleteModal />
          <div className="rp-top-card">
            <h1 className="rp-main-title">Reports</h1>
            <div className="rp-search-row">
              <div className="mc-search-wrapper" style={{flex:1, marginBottom:0}}>
                <svg className="mc-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" className="mc-search-input" placeholder="Search by name, email, or ID" value={search} onChange={e => { setSearch(e.target.value); setStudentPage(0); setDoctorPage(0); }} />
              </div>
              <button className="rp-tab-btn" onClick={() => { setActiveTab('students'); setSearch(''); setLevelFilter(''); setStudentPage(0); cancelEdit(); }}>Students Reports</button>
              <button className="rp-tab-btn" onClick={() => { setActiveTab('doctors'); setSearch(''); setDoctorPage(0); cancelEdit(); }}>Doctors Reports</button>
            </div>
          </div>
          <div className="rp-section">
            <h2 className="rp-section-title">Students</h2>
            <div className="rp-cards-grid">
              {defVisibleStudents.map(s => <StudentCard key={s.uid} s={s} />)}
              {!defVisibleStudents.length && <p style={{color:'#9CA3AF'}}>No students found.</p>}
            </div>
            <div className="rp-pagination">
              <button className="rp-page-btn" onClick={() => { setStudentPage(p => Math.max(0,p-1)); cancelEdit(); }} disabled={studentPage===0}>&#8249;</button>
              <button className="rp-page-btn" onClick={() => { setStudentPage(p => Math.min(defStudentPages-1,p+1)); cancelEdit(); }} disabled={studentPage>=defStudentPages-1}>&#8250;</button>
            </div>
          </div>
          <div className="rp-section">
            <h2 className="rp-section-title">Doctors</h2>
            <div className="rp-cards-grid">
              {defVisibleDoctors.map(d => <DoctorCard key={d.uid} d={d} />)}
              {!defVisibleDoctors.length && <p style={{color:'#9CA3AF'}}>No doctors found.</p>}
            </div>
            <div className="rp-pagination">
              <button className="rp-page-btn" onClick={() => { setDoctorPage(p => Math.max(0,p-1)); cancelEdit(); }} disabled={doctorPage===0}>&#8249;</button>
              <button className="rp-page-btn" onClick={() => { setDoctorPage(p => Math.min(defDoctorPages-1,p+1)); cancelEdit(); }} disabled={doctorPage>=defDoctorPages-1}>&#8250;</button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (activeTab === 'students') {
    return (
      <main className="main-content">
        {toast && <div className={`mc-toast mc-toast-${toast.type}`} style={{zIndex:9998}}><span className="mc-toast-icon">{toast.type==='success'?'\u2713':'\u2715'}</span><span>{toast.msg}</span></div>}
        {showDeleteAllStudentsModal && (
          <ConfirmDeleteModal
            title="Confirm Deletion of All Students"
            message="Are you absolutely sure you want to delete all students accounts? This action is irreversible."
            onConfirm={() => { setStudents([]); setShowDeleteAllStudentsModal(false); showToast('success', 'All student accounts deleted!'); }}
            onCancel={() => setShowDeleteAllStudentsModal(false)}
          />
        )}
        <SingleDeleteModal />
        <div style={{background:'#FFFAFA',boxShadow:'0 0 10px rgba(0,0,0,0.25)', borderRadius:'12px', padding:'1.5rem 2rem'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem', flexWrap:'wrap', gap:'0.75rem'}}>
            <h1 className="rp-main-title" style={{margin:0}}>Students Reports</h1>
            <button className="rp-delete-all-btn" onClick={() => setShowDeleteAllStudentsModal(true)}>Delete All Students Accounts</button>
          </div>
          <div style={{display:'flex', gap:'0.75rem', marginBottom:'1.25rem', flexWrap:'wrap', alignItems:'center'}}>
            <div className="mc-search-wrapper" style={{flex:2, minWidth:'200px', marginBottom:0}}>
              <svg className="mc-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" className="mc-search-input" placeholder="Search by name, email, or ID" value={search} onChange={e => { setSearch(e.target.value); setStudentPage(0); }} />
            </div>
            <div className="mc-select-wrapper" style={{flex:1, minWidth:'150px'}}>
              <select className="mc-select" value={levelFilter} onChange={e => { setLevelFilter(e.target.value); setStudentPage(0); }}>
                <option value="">Select Level</option>
                <option value="1">1st Year</option><option value="2">2nd Year</option>
                <option value="3">3rd Year</option><option value="4">4th Year</option>
              </select>
              <span className="mc-select-arrow">▼</span>
            </div>
            <button className="rp-tab-btn rp-tab-active-outline">Students Reports</button>
            <button className="rp-tab-btn" onClick={() => { setActiveTab('doctors'); setSearch(''); setDoctorPage(0); cancelEdit(); }}>Doctors Reports</button>
          </div>
          <div className="rp-cards-grid">
            {visibleStudents.map(s => <StudentCard key={s.uid} s={s} />)}
            {!visibleStudents.length && <p style={{color:'#9CA3AF', gridColumn:'1/-1'}}>No students found.</p>}
          </div>
          <PaginationBar
            current={studentPage} total={studentPages} count={filteredStudents.length}
            onPage={p => { setStudentPage(p); cancelEdit(); }}
            onPrev={() => { setStudentPage(p => Math.max(0,p-1)); cancelEdit(); }}
            onNext={() => { setStudentPage(p => Math.min(studentPages-1,p+1)); cancelEdit(); }}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      {toast && <div className={`mc-toast mc-toast-${toast.type}`} style={{zIndex:9998}}><span className="mc-toast-icon">{toast.type==='success'?'\u2713':'\u2715'}</span><span>{toast.msg}</span></div>}
      {showDeleteAllDoctorsModal && (
        <ConfirmDeleteModal
          title="Confirm Deletion of All Doctors"
          message="Are you absolutely sure you want to delete all doctors accounts? This action is irreversible."
          onConfirm={() => { setDoctors([]); setShowDeleteAllDoctorsModal(false); showToast('success', 'All doctor accounts deleted!'); }}
          onCancel={() => setShowDeleteAllDoctorsModal(false)}
        />
      )}
      <SingleDeleteModal />
      <div style={{background:'#FFFAFA',boxShadow:'0 0 10px rgba(0,0,0,0.25)', borderRadius:'12px', padding:'1.5rem 2rem'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem', flexWrap:'wrap', gap:'0.75rem'}}>
          <h1 className="rp-main-title" style={{margin:0}}>Doctors Reports</h1>
          <button className="rp-delete-all-btn" onClick={() => setShowDeleteAllDoctorsModal(true)}>Delete All Doctors Accounts</button>
        </div>
        <div style={{display:'flex', gap:'0.75rem', marginBottom:'1.25rem', flexWrap:'wrap', alignItems:'center'}}>
          <div className="mc-search-wrapper" style={{flex:2, minWidth:'200px', marginBottom:0}}>
            <svg className="mc-search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" className="mc-search-input" placeholder="Search by name, email, or ID" value={search} onChange={e => { setSearch(e.target.value); setDoctorPage(0); }} />
          </div>
          <button className="rp-tab-btn" onClick={() => { setActiveTab('students'); setSearch(''); setLevelFilter(''); setStudentPage(0); cancelEdit(); }}>Students Reports</button>
          <button className="rp-tab-btn rp-tab-active-outline">Doctors Reports</button>
        </div>
        <div className="rp-cards-grid">
          {visibleDoctors.map(d => <DoctorCard key={d.uid} d={d} />)}
          {!visibleDoctors.length && <p style={{color:'#9CA3AF', gridColumn:'1/-1'}}>No doctors found.</p>}
        </div>
        <PaginationBar
          current={doctorPage} total={doctorPages} count={filteredDoctors.length}
          onPage={p => { setDoctorPage(p); cancelEdit(); }}
          onPrev={() => { setDoctorPage(p => Math.max(0,p-1)); cancelEdit(); }}
          onNext={() => { setDoctorPage(p => Math.min(doctorPages-1,p+1)); cancelEdit(); }}
        />
      </div>
    </main>
  );
};

// ===================== //
// CHAT PAGE (NEW - TruthEye Chat)
// ===================== //

const STUDENT_DB = {
  "ST001": { name: "Sara Ahmed Ali",     avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  "ST002": { name: "Alaa Ali Sami",      avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  "ST003": { name: "Mai Ahmed Ali",      avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  "ST004": { name: "Ahmed Mohammad Ali", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
};

const DOCTOR_DB = {
  "DR001": { name: "Dr. Hossam Kamal",  avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
  "DR002": { name: "Dr. Amira Nour",    avatar: "https://randomuser.me/api/portraits/women/55.jpg" },
};

const CHAT_EMOJIS = ["😀","😂","😍","🥰","😎","🤔","😢","😡","👍","👎","❤️","🔥","🎉","✅","⭐","🙏","💪","👀","🤣","😅","😊","🥳","😴","🤯","💯","🚀","✨","🌟","💬","📎"];

const CHAT_AUTO_REPLIES = [
  "Thank you for the clarification!",
  "Got it, I understand now.",
  "Could you please elaborate more?",
  "I'll check and get back to you.",
  "That makes sense, thanks!",
  "👍",
  "Okay, understood!",
  "I see, so what's the next step?",
];

const chatInitialContacts = {
  Students: [
    {
      id: 1, name: "Sara Ahmed Ali", studentId: "ST001",
      message: "I didn't understand question 5. Could you explain the q...",
      time: "13:00", unread: 1,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      chatType: "private",
      messages: [
        { id: 1, from: "them", type: "text", text: "I didn't understand question 5. Could you explain the question again?", time: "13:00" },
        { id: 2, from: "me",   type: "text", text: "Sure! Question 5 is asking about the time complexity of a binary search algorithm.", time: "13:02" },
        { id: 3, from: "them", type: "text", text: "Oh I see, so it's O(log n) right?", time: "13:04" },
        { id: 4, from: "me",   type: "text", text: "Exactly! You got it.", time: "13:05" },
        { id: 5, from: "me",   type: "text", text: "👍", time: "14:27" },
        { id: 6, from: "them", type: "text", text: "Thank you.", time: "14:27" },
        { id: 7, from: "me",   type: "text", text: "👍", time: "14:27" },
        { id: 8, from: "them", type: "text", text: "Understood! I'll get back to you shortly.", time: "14:27" },
      ],
    },
    {
      id: 2, name: "Alaa Ali Sami", studentId: "ST002",
      message: "I didn't understand question 5. Could you explain the q...",
      time: "13:30", unread: 1,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      chatType: "private",
      messages: [
        { id: 1, from: "them", type: "text", text: "I didn't understand question 5. Could you explain the question again?", time: "13:30" },
      ],
    },
    {
      id: 3, name: "Mai Ahmed Ali", studentId: "ST003",
      message: "I didn't understand question 5. Could you explain the q...",
      time: "1 days ago", unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      chatType: "private",
      messages: [
        { id: 1, from: "them", type: "text", text: "I didn't understand question 5. Could you explain the question again?", time: "Yesterday" },
      ],
    },
    {
      id: 4, name: "Ahmed Mohammad Ali", studentId: "ST004",
      message: "I understand now, thank you!",
      time: "2 days ago", unread: 0,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      chatType: "private",
      messages: [
        { id: 1, from: "them", type: "text", text: "I understand now, thank you!", time: "2 days ago" },
      ],
    },
  ],
  Doctors: [],
  "Super Admin": [],
  Groups: [],
};

const getChatTime = () => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
};

const formatBytes = (bytes) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;

function ChatTypeBadge({ contact }) {
  if (!contact.chatType) return null;
  if (contact.chatType === "private") {
    return (
      <span style={{ display:'inline-flex', alignItems:'center', gap:3, fontSize:10, fontWeight:700, padding:'1px 7px', borderRadius:20, backgroundColor:'#e8f0fe', color:'#2563eb', flexShrink:0 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Private
      </span>
    );
  }
  if (contact.chatType === "broadcast") {
    return (
      <span style={{ display:'inline-flex', alignItems:'center', gap:3, fontSize:10, fontWeight:700, padding:'1px 7px', borderRadius:20, backgroundColor:'#fef3c7', color:'#b45309', flexShrink:0 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>
        Broadcast
      </span>
    );
  }
  return null;
}

function ChatMessageBubble({ msg, avatar }) {
  const isMe = msg.from === "me";
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:8, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
      {!isMe && <img src={avatar} alt="" style={{ width:28, height:28, borderRadius:'50%', objectFit:'cover', flexShrink:0, marginBottom:4 }} />}
      <div style={{ maxWidth:'75%' }}>
        {msg.type === "image" && (
          <div style={{ borderRadius: isMe ? '12px 12px 2px 12px' : '2px 12px 12px 12px', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.12)' }}>
            <img src={msg.url} alt="img" style={{ maxWidth:'100%', maxHeight:200, display:'block', objectFit:'cover' }} />
            <div style={{ padding:'4px 12px', fontSize:10, textAlign:'right', backgroundColor: isMe ? '#1e4d35' : '#f0f0ea', color: isMe ? 'rgba(255,255,255,0.6)' : '#aaa' }}>{msg.time}</div>
          </div>
        )}
        {msg.type === "file" && (
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius: isMe ? '12px 12px 2px 12px' : '2px 12px 12px 12px', backgroundColor: isMe ? '#1e4d35' : '#fff', boxShadow: !isMe ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
            <div style={{ width:32, height:32, borderRadius:10, backgroundColor: isMe ? 'rgba(255,255,255,0.15)' : '#e8f5ee', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isMe ? "#fff" : "#1e4d35"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:12, fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color: isMe ? '#fff' : '#222', margin:0 }}>{msg.fileName}</p>
              <p style={{ fontSize:11, color: isMe ? 'rgba(255,255,255,0.6)' : '#aaa', margin:0 }}>{msg.fileSize} · {msg.time}</p>
            </div>
            <a href={msg.url} download={msg.fileName} style={{ flexShrink:0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isMe ? "#fff" : "#1e4d35"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>
        )}
        {(!msg.type || msg.type === "text") && (
          <div style={{ padding:'8px 12px', borderRadius: isMe ? '12px 12px 2px 12px' : '2px 12px 12px 12px', backgroundColor: isMe ? '#1e4d35' : '#fff', boxShadow: !isMe ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
            <p style={{ fontSize:14, lineHeight:1.55, whiteSpace:'pre-wrap', wordBreak:'break-word', color: isMe ? '#fff' : '#222', margin:0 }}>{msg.text}</p>
            <p style={{ fontSize:10, marginTop:3, textAlign:'right', color: isMe ? 'rgba(255,255,255,0.55)' : '#bbb', margin:'4px 0 0 0' }}>{msg.time}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatInputBar({ onSend, disabled, bgColor='#FCFCFC' }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const fileRef = useRef(null);
  const imageRef = useRef(null);
  const emojiRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (emojiRef.current && !emojiRef.current.contains(e.target)) setShowEmoji(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const send = () => {
    if (!text.trim() || disabled) return;
    onSend({ type: "text", text: text.trim(), time: getChatTime() });
    setText(""); setShowEmoji(false);
  };

  return (
    <div style={{ padding:'10px 12px', flexShrink:0, position:'relative', backgroundColor:bgColor, borderTop:'1px solid #efefea' }}>
      {showEmoji && (
        <div ref={emojiRef} style={{ position:'absolute', bottom:'100%', marginBottom:8, left:12, right:12, backgroundColor:'#fff', border:'1.5px solid #e5e5e0', borderRadius:16, boxShadow:'0 8px 24px rgba(0,0,0,0.12)', padding:10, display:'grid', gridTemplateColumns:'repeat(10,1fr)', gap:3, zIndex:100 }}>
          {CHAT_EMOJIS.map(e => (
            <button key={e} onClick={() => { setText(t => t + e); textareaRef.current?.focus(); }}
              style={{ width:28, height:28, fontSize:17, border:'none', background:'none', cursor:'pointer', borderRadius:6 }}>{e}</button>
          ))}
        </div>
      )}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <button onClick={() => fileRef.current?.click()} style={{ color:'#b0b8b0', background:'none', border:'none', cursor:'pointer', flexShrink:0, padding:0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
        </button>
        <button onClick={() => imageRef.current?.click()} style={{ color:'#b0b8b0', background:'none', border:'none', cursor:'pointer', flexShrink:0, padding:0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </button>
        <button onClick={() => setShowEmoji(s => !s)} style={{ color: showEmoji ? '#1e4d35' : '#b0b8b0', background:'none', border:'none', cursor:'pointer', flexShrink:0, padding:0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3"/><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3"/></svg>
        </button>
        <div style={{ flex:1, borderRadius:20, padding:'8px 14px', backgroundColor:bgColor, border:'1px solid #e8e8e2', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
          <textarea ref={textareaRef} rows={1}
            placeholder={disabled ? "Fill in the options first..." : "Type your message... (Enter to send, Shift+Enter for new line)"}
            value={text} onChange={e => setText(e.target.value)}
            disabled={disabled}
            onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
            style={{ width:'100%', background:'transparent', outline:'none', fontSize:14, resize:'none', color: disabled ? '#ccc' : '#333', maxHeight:100, lineHeight:1.6, border:'none', fontFamily:'inherit' }} />
        </div>
        <button onClick={send} style={{ width:40, height:40, borderRadius:12, border:'none', cursor: (text.trim() && !disabled) ? 'pointer' : 'not-allowed', backgroundColor: (text.trim() && !disabled) ? '#1e4d35' : '#d0d8d0', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
      <input ref={imageRef} type="file" accept="image/*" style={{ display:'none' }}
        onChange={e => { const f=e.target.files[0]; if(!f)return; onSend({type:"image",url:URL.createObjectURL(f),time:getChatTime()}); e.target.value=""; }} />
      <input ref={fileRef} type="file" style={{ display:'none' }}
        onChange={e => { const f=e.target.files[0]; if(!f)return; onSend({type:"file",url:URL.createObjectURL(f),fileName:f.name,fileSize:formatBytes(f.size),time:getChatTime()}); e.target.value=""; }} />
    </div>
  );
}

function ChatAreaView({ contact, contacts, activeTab, setContacts, messagesEndRef, onBack }) {
  const current = (contacts[activeTab] || []).find(c => c.id === contact.id) || contact;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [current.messages?.length]);

  const handleSend = (msgData) => {
    const newMsg = { id: Date.now(), from: "me", ...msgData };
    const preview = msgData.type === "text" ? msgData.text : msgData.type === "image" ? "📷 Image" : `📎 ${msgData.fileName}`;
    setContacts(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(c =>
        c.id === current.id
          ? { ...c, messages: [...c.messages, newMsg], message: preview, time: msgData.time }
          : c
      ),
    }));
    if (current.chatType === "private") {
      setTimeout(() => {
        const reply = { id: Date.now()+1, from: "them", type: "text",
          text: CHAT_AUTO_REPLIES[Math.floor(Math.random()*CHAT_AUTO_REPLIES.length)], time: getChatTime() };
        setContacts(prev => ({
          ...prev,
          [activeTab]: prev[activeTab].map(c =>
            c.id === current.id
              ? { ...c, messages: [...c.messages, reply], message: reply.text, time: reply.time }
              : c
          ),
        }));
      }, 1500);
    }
  };

  const getSubtitle = () => {
    if (current.chatType === "broadcast") return current.broadcastLabel || "Broadcast";
    if (current.chatType === "private" && current.studentId) return `ID: ${current.studentId}`;
    if (current.chatType === "private" && current.doctorId) return `ID: ${current.doctorId}`;
    return "Online";
  };

  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 20px', flexShrink:0, backgroundColor:'#FCFCFC', borderBottom:'1px solid #efefea' }}>
        {onBack && (
          <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:'#1e4d35', padding:'0 8px 0 0', flexShrink:0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        )}
        <div style={{ position:'relative', flexShrink:0 }}>
          {current.isGroup ? (
            <div style={{ width:40, height:40, borderRadius:'50%', backgroundColor:'#e8f5ee', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e4d35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          ) : (
            <>
              <img src={current.avatar} alt="" style={{ width:40, height:40, borderRadius:'50%', objectFit:'cover' }} />
              {current.chatType === "private" && (
                <span style={{ position:'absolute', bottom:0, right:0, width:10, height:10, borderRadius:'50%', border:'2px solid #fff', backgroundColor:'#22c55e' }} />
              )}
            </>
          )}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
            <p style={{ fontWeight:800, fontSize:14, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color:'#1a1a1a', margin:0 }}>{current.name}</p>
            <ChatTypeBadge contact={current} />
          </div>
          <p style={{ fontSize:12, fontWeight:600, margin:0, color: current.chatType === "broadcast" ? '#b45309' : '#22c55e' }}>{getSubtitle()}</p>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'16px 20px 8px', display:'flex', flexDirection:'column', gap:10, backgroundColor:'#FFFAFA' }}>
        {current.messages.map(msg => (
          <ChatMessageBubble key={msg.id} msg={msg} avatar={current.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInputBar onSend={handleSend} />
    </>
  );
}

function ChatCustomSelect({ value, onChange, options, placeholder, colored }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const iconMap = {
    broadcast: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
    private:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    students:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    doctors:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>,
    superadmin:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    all:       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  };

  return (
    <div ref={ref} style={{ position:'relative', width:'100%' }}>
      <style>{`@keyframes chatSelectIn{from{opacity:0;transform:translateY(-6px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{
          width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
          borderRadius:14, padding:'11px 14px', fontSize:13.5, fontWeight:600,
          backgroundColor: open ? '#f0faf5' : '#fff',
          outline:'none', cursor:'pointer', textAlign:'left',
          border: open ? '2px solid #1e4d35' : '1.5px solid #e0e0da',
          color: selected ? (colored ? '#1e4d35' : '#1a1a1a') : '#b0b0a8',
          transition:'all 0.18s ease',
          boxShadow: open ? '0 0 0 3px rgba(30,77,53,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
        }}>
        <span style={{ display:'flex', alignItems:'center', gap:8, overflow:'hidden' }}>
          {selected && iconMap[selected.value] && (
            <span style={{ display:'flex', alignItems:'center', color: colored ? '#1e4d35' : '#666', flexShrink:0 }}>
              {iconMap[selected.value]}
            </span>
          )}
          <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1e4d35" strokeWidth="2.8"
          strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginLeft:6, transition:'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position:'absolute', left:0, right:0, top:'calc(100% + 6px)',
          borderRadius:14, zIndex:50, backgroundColor:'#fff',
          border:'1.5px solid #e0e0da',
          boxShadow:'0 12px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)',
          overflow:'hidden',
          animation:'chatSelectIn 0.15s ease',
        }}>
          {options.map((opt, i) => {
            const isSel = value === opt.value;
            return (
              <button key={opt.value} type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  width:'100%', display:'flex', alignItems:'center', gap:10,
                  padding:'10px 14px', fontSize:13.5, fontWeight:600,
                  border:'none', cursor:'pointer', textAlign:'left',
                  color: isSel ? '#1e4d35' : '#2a2a2a',
                  backgroundColor: isSel ? '#edf7f2' : 'transparent',
                  borderBottom: i < options.length-1 ? '1px solid #f4f4f0' : 'none',
                  transition:'background 0.1s',
                }}
                onMouseEnter={e => { if (!isSel) e.currentTarget.style.backgroundColor='#f7fdf9'; }}
                onMouseLeave={e => { if (!isSel) e.currentTarget.style.backgroundColor='transparent'; }}>
                {iconMap[opt.value] && (
                  <span style={{
                    width:28, height:28, borderRadius:8, flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    backgroundColor: isSel ? '#c8e8d5' : '#f0f0ea',
                    color: isSel ? '#1e4d35' : '#888',
                    transition:'all 0.1s',
                  }}>
                    {iconMap[opt.value]}
                  </span>
                )}
                <span style={{ flex:1 }}>{opt.label}</span>
                {isSel && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e4d35" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NewMessagePanel({ onClose, onCreateConversation, isMobile, globalStudents = [], globalDoctors = [], globalCourses = [] }) {
  const [sendType, setSendType] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [filterId, setFilterId] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const previewTextRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [doctorSearchMode, setDoctorSearchMode] = useState("id"); // "id" | "course"
  const [doctorCourse, setDoctorCourse] = useState("");

  // Reset selectedPerson when targetRole changes
  React.useEffect(() => { setSelectedPerson(null); setFilterId(""); setShowSuggestions(false); setDoctorSearchMode("id"); setDoctorCourse(""); }, [targetRole]);

  // Build suggestions from STUDENT_DB + globalStudents / DOCTOR_DB + globalDoctors
  const suggestions = (() => {
    if (sendType !== "private" || !filterId.trim()) return [];
    const q = filterId.trim().toLowerCase();
    if (targetRole === "students") {
      const dbItems = Object.entries(STUDENT_DB).map(([id, v]) => ({ id, name: v.name, avatar: v.avatar }));
      const globalItems = globalStudents.map(s => ({ id: s.id, name: s.name, avatar: s.avatar || null }));
      // Merge, prefer global, deduplicate by id
      const merged = [...globalItems];
      dbItems.forEach(d => { if (!merged.find(m => m.id.toUpperCase() === d.id)) merged.push(d); });
      return merged.filter(s => s.id.toLowerCase().startsWith(q) || s.name.toLowerCase().startsWith(q)).slice(0, 6);
    }
    if (targetRole === "doctors") {
      const dbItems = Object.entries(DOCTOR_DB).map(([id, v]) => ({ id, name: v.name, avatar: v.avatar }));
      const globalItems = globalDoctors.map(d => ({ id: d.id, name: d.name, avatar: d.avatar || null }));
      const merged = [...globalItems];
      dbItems.forEach(d => { if (!merged.find(m => m.id.toUpperCase() === d.id)) merged.push(d); });
      return merged.filter(d => d.id.toLowerCase().startsWith(q) || d.name.toLowerCase().startsWith(q)).slice(0, 6);
    }
    return [];
  })();

  const resolvedStudent = sendType==="private" && targetRole==="students"
    ? (selectedPerson || (filterId.trim() ? (STUDENT_DB[filterId.trim().toUpperCase()] || globalStudents.find(s => s.id === filterId.trim() || s.name.toLowerCase().includes(filterId.trim().toLowerCase())) || null) : null))
    : null;

  // Doctors matched by course
  const doctorsByCourse = sendType==="private" && targetRole==="doctors" && doctorSearchMode==="course" && doctorCourse
    ? (() => {
        const q = doctorCourse.toLowerCase();
        const fromGlobal = globalDoctors.filter(d => (d.courses||[]).some(c => c.toLowerCase().includes(q)));
        const fromDB = Object.entries(DOCTOR_DB)
          .filter(([,v]) => !fromGlobal.find(g => g.name === v.name))
          .map(([id,v]) => ({ id, name: v.name, avatar: v.avatar }));
        return [...fromGlobal.map(d => ({ id: d.id, name: d.name, avatar: d.avatar||null })), ...fromDB];
      })()
    : [];

  const resolvedDoctor = sendType==="private" && targetRole==="doctors" && doctorSearchMode==="id"
    ? (selectedPerson || (filterId.trim() ? (DOCTOR_DB[filterId.trim().toUpperCase()] || globalDoctors.find(d => d.id === filterId.trim() || d.name.toLowerCase().includes(filterId.trim().toLowerCase())) || null) : null))
    : null;

  const isReady = (() => {
    if (sendType==="broadcast" && targetRole) return true;
    if (sendType==="private" && targetRole==="superadmin") return true;
    if (sendType==="private" && targetRole==="students" && resolvedStudent) return true;
    if (sendType==="private" && targetRole==="doctors" && doctorSearchMode==="id" && resolvedDoctor) return true;
    if (sendType==="private" && targetRole==="doctors" && doctorSearchMode==="course" && doctorCourse) return true;
    return false;
  })();

  const buildBroadcastLabel = () => {
    const role = targetRole==="students"?"Students":targetRole==="doctors"?"Doctors":"All [Students - Doctors]";
    const parts = [];
    if (targetRole==="students") {
      if (course) parts.push(course);
      if (year) parts.push(`Year ${year}`);
    } else if (targetRole==="doctors") {
      if (course) parts.push(course);
    }
    return parts.length ? `${role} · ${parts.join(" · ")}` : `All ${role}`;
  };

  const handleStart = (firstMessage = null) => {
    if (!isReady) return;
    let newContact = null;
    let tab = "";
    if (sendType==="broadcast") {
      tab = "Groups";
      newContact = {
        id: Date.now(), isGroup: true, chatType: "broadcast",
        name: buildBroadcastLabel(),
        broadcastLabel: `Broadcast to: ${buildBroadcastLabel()}`,
        avatar: null,
        message: firstMessage || "Broadcast conversation started",
        time: getChatTime(), unread: 0,
        messages: firstMessage ? [{ id: 1, from: "me", type: "text", text: firstMessage, time: getChatTime() }] : [],
      };
    } else if (sendType==="private" && targetRole==="superadmin") {
      tab = "Super Admin";
      newContact = {
        id: Date.now(), chatType: "private",
        name: "Super Admin",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        message: firstMessage || "Private conversation started",
        time: getChatTime(), unread: 0,
        messages: firstMessage ? [{ id: 1, from: "me", type: "text", text: firstMessage, time: getChatTime() }] : [],
      };
    } else if (sendType==="private" && targetRole==="students" && resolvedStudent) {
      tab = "Students";
      newContact = {
        id: Date.now(), chatType: "private",
        name: resolvedStudent.name, studentId: filterId.trim().toUpperCase(),
        avatar: resolvedStudent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedStudent.name)}&background=1e4d35&color=fff`,
        message: firstMessage || "Private conversation started",
        time: getChatTime(), unread: 0,
        messages: firstMessage ? [{ id: 1, from: "me", type: "text", text: firstMessage, time: getChatTime() }] : [],
      };
    } else if (sendType==="private" && targetRole==="doctors" && doctorSearchMode==="id" && resolvedDoctor) {
      tab = "Doctors";
      newContact = {
        id: Date.now(), chatType: "private",
        name: resolvedDoctor.name, doctorId: filterId.trim().toUpperCase(),
        avatar: resolvedDoctor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedDoctor.name)}&background=1e4d35&color=fff`,
        message: firstMessage || "Private conversation started",
        time: getChatTime(), unread: 0,
        messages: firstMessage ? [{ id: 1, from: "me", type: "text", text: firstMessage, time: getChatTime() }] : [],
      };
    } else if (sendType==="private" && targetRole==="doctors" && doctorSearchMode==="course" && doctorCourse) {
      // Create one private conversation per doctor teaching this course
      if (doctorsByCourse.length > 0) {
        const firstDoctor = doctorsByCourse[0];
        tab = "Doctors";
        newContact = {
          id: Date.now(), chatType: "private",
          name: firstDoctor.name,
          doctorId: firstDoctor.id ? firstDoctor.id.toUpperCase() : "",
          courseFilter: doctorCourse,
          avatar: firstDoctor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(firstDoctor.name)}&background=1e4d35&color=fff`,
          message: firstMessage || "Private conversation started",
          time: getChatTime(), unread: 0,
          messages: firstMessage ? [{ id: 1, from: "me", type: "text", text: firstMessage, time: getChatTime() }] : [],
        };
        // Also create conversations for the remaining doctors
        doctorsByCourse.slice(1).forEach((d, i) => {
          const extraContact = {
            id: Date.now() + i + 1, chatType: "private",
            name: d.name,
            doctorId: d.id ? d.id.toUpperCase() : "",
            courseFilter: doctorCourse,
            avatar: d.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=1e4d35&color=fff`,
            message: firstMessage || "Private conversation started",
            time: getChatTime(), unread: 0,
            messages: firstMessage ? [{ id: 1, from: "me", type: "text", text: firstMessage, time: getChatTime() }] : [],
          };
          onCreateConversation({ tab: "Doctors", contact: extraContact });
        });
      }
    }
    if (newContact && tab) onCreateConversation({ tab, contact: newContact });
  };

  const previewTitle = (() => {
    if (!sendType) return "New Message";
    if (sendType==="broadcast" && targetRole) return buildBroadcastLabel();
    if (sendType==="private" && targetRole==="superadmin") return "Super Admin";
    if (resolvedStudent) return resolvedStudent.name;
    if (resolvedDoctor) return resolvedDoctor.name;
    if (sendType==="private" && targetRole==="doctors" && doctorSearchMode==="course" && doctorCourse) {
      return doctorsByCourse.length > 0 ? `${doctorsByCourse.length} Doctor${doctorsByCourse.length > 1 ? 's' : ''} · ${doctorCourse}` : `No doctors · ${doctorCourse}`;
    }
    return "New Message";
  })();

  const isBroadcast = sendType==="broadcast";
  const courseOptions = globalCourses.length > 0
    ? globalCourses.map(c => ({ value: c.name, label: c.name }))
    : [{ value:"AI", label:"AI" }, { value:"Operating Systems", label:"Operating Systems" }, { value:"Data Structures", label:"Data Structures" }, { value:"Networks", label:"Networks" }];

  const FormContent = () => (
    <div style={{ flex:1, padding:16, overflowY:'auto', display:'flex', flexDirection:'column', gap:16, backgroundColor:'#FFFAFA' }}>
      <div>
        <label style={{ display:'block', fontSize:14, fontWeight:700, marginBottom:8, color:'#2a2a2a' }}>Send type</label>
        <ChatCustomSelect value={sendType} onChange={v=>{setSendType(v);setTargetRole("");setFilterId("");setCourse("");setYear("");setShowMobilePreview(false);setSelectedPerson(null);}}
          options={[{value:"broadcast",label:"Broadcast to role"},{value:"private",label:"Private to user"}]}
          placeholder="Choose Type" colored />
      </div>
      {sendType==="broadcast" && (
        <>
          <div>
            <label style={{ display:'block', fontSize:14, fontWeight:700, marginBottom:8, color:'#2a2a2a' }}>Target Role</label>
            <ChatCustomSelect value={targetRole} onChange={v=>{setTargetRole(v);setCourse("");setYear("");}}
              options={[{value:"students",label:"Students"},{value:"doctors",label:"Doctors"},{value:"all",label:"All [Students - Doctors]"}]}
              placeholder="Choose role" />
          </div>
          {targetRole==="students" && (
            <>
              <p style={{ fontWeight:800, fontSize:14, color:'#1e4d35', margin:0 }}>Filter Broadcast by</p>
              <div>
                <label style={{ display:'block', fontSize:14, fontWeight:700, marginBottom:8, color:'#2a2a2a' }}>Course <span style={{color:'#aaa',fontWeight:400}}>(optional)</span></label>
                <ChatCustomSelect value={course} onChange={setCourse} options={courseOptions} placeholder="Any Course" />
              </div>
              <div>
                <label style={{ display:'block', fontSize:14, fontWeight:700, marginBottom:8, color:'#2a2a2a' }}>Academic Year <span style={{color:'#aaa',fontWeight:400}}>(optional)</span></label>
                <ChatCustomSelect value={year} onChange={setYear}
                  options={[{value:"1",label:"Year 1"},{value:"2",label:"Year 2"},{value:"3",label:"Year 3"},{value:"4",label:"Year 4"}]}
                  placeholder="Any Year" />
              </div>
            </>
          )}
          {targetRole==="doctors" && (
            <>
              <p style={{ fontWeight:800, fontSize:14, color:'#1e4d35', margin:0 }}>Filter Broadcast by</p>
              <div>
                <label style={{ display:'block', fontSize:14, fontWeight:700, marginBottom:8, color:'#2a2a2a' }}>Department <span style={{color:'#aaa',fontWeight:400}}>(optional)</span></label>
                <ChatCustomSelect value={course} onChange={setCourse}
                  options={[{value:"CS",label:"Computer Science"},{value:"IT",label:"Information Technology"},{value:"SE",label:"Software Engineering"},{value:"AI",label:"Artificial Intelligence"},{value:"IS",label:"Information Systems"}]}
                  placeholder="Any Department" />
              </div>
            </>
          )}
        </>
      )}
      {sendType==="private" && (
        <>
          <div>
            <label style={{ display:'block', fontSize:14, fontWeight:700, marginBottom:8, color:'#2a2a2a' }}>Target User</label>
            <ChatCustomSelect value={targetRole} onChange={v=>{setTargetRole(v);setFilterId("");}}
              options={[{value:"students",label:"Student"},{value:"doctors",label:"Doctor"},{value:"superadmin",label:"Super Admin"}]}
              placeholder="Choose User Type" />
          </div>
          {(targetRole==="students"||targetRole==="doctors") && (
            <>
              <p style={{ fontWeight:800, fontSize:14, color:'#1e4d35', margin:0 }}>Filter by</p>

              {/* Doctor search mode toggle */}
              {targetRole==="doctors" && (
                <div style={{ display:'flex', gap:8 }}>
                  <button type="button" onClick={() => { setDoctorSearchMode("id"); setDoctorCourse(""); setSelectedPerson(null); setFilterId(""); }}
                    style={{ flex:1, padding:'8px 12px', borderRadius:10, fontSize:12.5, fontWeight:700, border:'none', cursor:'pointer', transition:'all 0.15s',
                      backgroundColor: doctorSearchMode==="id" ? '#1e4d35' : '#f0f0ea',
                      color: doctorSearchMode==="id" ? '#fff' : '#666' }}>
                    ID or Name
                  </button>
                  <button type="button" onClick={() => { setDoctorSearchMode("course"); setSelectedPerson(null); setFilterId(""); }}
                    style={{ flex:1, padding:'8px 12px', borderRadius:10, fontSize:12.5, fontWeight:700, border:'none', cursor:'pointer', transition:'all 0.15s',
                      backgroundColor: doctorSearchMode==="course" ? '#1e4d35' : '#f0f0ea',
                      color: doctorSearchMode==="course" ? '#fff' : '#666' }}>
                    Course Name
                  </button>
                </div>
              )}

              {/* ID or Name search — students always, doctors only in "id" mode */}
              {(targetRole==="students" || (targetRole==="doctors" && doctorSearchMode==="id")) && (
                <div style={{ position:'relative' }}>
                  <label style={{ display:'block', fontSize:14, fontWeight:700, marginBottom:8, color:'#2a2a2a' }}>ID or Name</label>
                  {selectedPerson ? (
                    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:12, border:'2px solid #1e4d35', backgroundColor:'#e8f5ee', boxSizing:'border-box' }}>
                      <img src={selectedPerson.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedPerson.name)}&background=1e4d35&color=fff`} alt=""
                        style={{ width:34, height:34, borderRadius:'50%', objectFit:'cover', flexShrink:0 }} />
                      <div style={{ flex:1, overflow:'hidden' }}>
                        <div style={{ fontSize:13, fontWeight:700, color:'#1e4d35', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{selectedPerson.name}</div>
                        <div style={{ fontSize:11, color:'#3d8b64', fontWeight:500 }}>{selectedPerson.id.toUpperCase()}</div>
                      </div>
                      <button type="button" onClick={() => { setSelectedPerson(null); setFilterId(""); setShowSuggestions(false); }}
                        style={{ background:'none', border:'none', cursor:'pointer', color:'#1e4d35', padding:4, borderRadius:6, display:'flex', alignItems:'center', flexShrink:0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <input type="text"
                        placeholder={targetRole==="students"?"e.g. ST001 or student name":"e.g. DR001 or doctor name"}
                        value={filterId}
                        onChange={e => { setFilterId(e.target.value); setShowSuggestions(true); }}
                        onFocus={() => { if (filterId.trim()) setShowSuggestions(true); }}
                        style={{ width:'100%', borderRadius:12, padding:'10px 12px', fontSize:14, outline:'none', backgroundColor:'#fff', boxSizing:'border-box', border:'1.5px solid #d8d8d2', color:'#333' }} />
                      {showSuggestions && suggestions.length > 0 && (
                        <div style={{ position:'absolute', left:0, right:0, top:'calc(100% + 4px)', zIndex:100, backgroundColor:'#fff', border:'1.5px solid #d8d8d2', borderRadius:12, boxShadow:'0 8px 24px rgba(0,0,0,0.12)', overflow:'hidden' }}>
                          {suggestions.map(s => (
                            <button key={s.id} type="button"
                              onMouseDown={e => { e.preventDefault(); setSelectedPerson(s); setFilterId(s.id); setShowSuggestions(false); }}
                              style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 12px', border:'none', background:'transparent', cursor:'pointer', textAlign:'left' }}
                              onMouseEnter={e => e.currentTarget.style.backgroundColor='#f0faf5'}
                              onMouseLeave={e => e.currentTarget.style.backgroundColor='transparent'}>
                              <img src={s.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=1e4d35&color=fff`} alt=""
                                style={{ width:30, height:30, borderRadius:'50%', objectFit:'cover', flexShrink:0 }} />
                              <div style={{ flex:1, overflow:'hidden' }}>
                                <div style={{ fontSize:13, fontWeight:700, color:'#1a1a1a', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.name}</div>
                                <div style={{ fontSize:11, color:'#888', fontWeight:500 }}>{s.id.toUpperCase()}</div>
                              </div>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e4d35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,opacity:0.6}}><polyline points="9 18 15 12 9 6"/></svg>
                            </button>
                          ))}
                        </div>
                      )}
                      {filterId.trim() && suggestions.length === 0 && (
                        <div style={{ marginTop:8, padding:'8px 12px', borderRadius:10, fontSize:12, fontWeight:600, display:'flex', alignItems:'center', gap:8, backgroundColor:'#fee2e2', color:'#dc2626' }}>
                          Person not found — try a different ID or name
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Course Name search — doctors only */}
              {targetRole==="doctors" && doctorSearchMode==="course" && (
                <div>
                  <label style={{ display:'block', fontSize:14, fontWeight:700, marginBottom:8, color:'#2a2a2a' }}>Course Name</label>
                  <ChatCustomSelect value={doctorCourse} onChange={setDoctorCourse} options={courseOptions} placeholder="Choose a course" />
                  {doctorCourse && (
                    <div style={{ marginTop:8, padding:'8px 12px', borderRadius:10, fontSize:12, fontWeight:600, backgroundColor:'#e8f5ee', color:'#1e4d35' }}>
                      {doctorsByCourse.length > 0
                        ? `${doctorsByCourse.length} doctor${doctorsByCourse.length > 1 ? 's' : ''} teach "${doctorCourse}"`
                        : `No doctors found for "${doctorCourse}"`}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {targetRole==="superadmin" && (
            <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', borderRadius:10, fontSize:12, fontWeight:600, backgroundColor:'#e8f5ee', color:'#1e4d35' }}>
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="" style={{ width:20, height:20, borderRadius:'50%' }} />
              Super Admin (1 user)
            </div>
          )}
        </>
      )}
      {isMobile && isReady && (
        <button onClick={() => setShowMobilePreview(true)}
          style={{ width:'100%', padding:'12px', borderRadius:16, fontSize:14, fontWeight:700, color:'#fff', border:'none', cursor:'pointer', backgroundColor:'#1e4d35' }}>
          Continue →
        </button>
      )}
    </div>
  );

  // Mobile preview/send
  if (isMobile && showMobilePreview && isReady) {
    return (
      <div style={{ display:'flex', flexDirection:'column', flex:1, borderRadius:16, overflow:'hidden', backgroundColor:'#fff', border:'1px solid #e8e8e4' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 20px', flexShrink:0, backgroundColor:'#FCFCFC', borderBottom:'1px solid #efefea' }}>
          <button onClick={() => setShowMobilePreview(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#1e4d35' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div>
            <p style={{ fontWeight:800, fontSize:14, color:'#1a1a1a', margin:0 }}>{previewTitle}</p>
            <p style={{ fontSize:12, fontWeight:600, color:'#22c55e', margin:0 }}>Ready — type your message</p>
          </div>
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, backgroundColor:'#FFFAFA' }}>
          <div style={{ width:64, height:64, borderRadius:'50%', backgroundColor:'#e8f5ee', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {isBroadcast
              ? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" stroke="#1e4d35" fill="rgba(30,77,53,0.12)"/></svg>
              : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e4d35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            }
          </div>
          <p style={{ fontSize:14, fontWeight:600, textAlign:'center', padding:'0 24px', color:'#555' }}>
            {isBroadcast ? `Ready to broadcast to ${buildBroadcastLabel()}` : `Type your first message`}
          </p>
        </div>
        <ChatInputBar onSend={(msgData) => handleStart(msgData.text)} disabled={false} bgColor='#FCFCFC' />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div style={{ display:'flex', flexDirection:'column', flex:1, borderRadius:16, overflow:'hidden', backgroundColor:'#fff', border:'1px solid #e8e8e4' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px', flexShrink:0, backgroundColor:'#1e4d35' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.7)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <h2 style={{ color:'#fff', fontWeight:800, fontSize:16, margin:0 }}>New Message</h2>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.15)', border:'none', cursor:'pointer', color:'#fff', fontSize:18, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>
        <FormContent />
      </div>
    );
  }

  // Desktop: side-by-side
  const [formWidth, setFormWidth] = useState(260);
  const isFormDragging = useRef(false);
  const formDragStartX = useRef(0);
  const formDragStartW = useRef(0);
  const startFormDrag = (e) => {
    isFormDragging.current = true;
    formDragStartX.current = e.clientX;
    formDragStartW.current = formWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const onMove = (ev) => {
      if (!isFormDragging.current) return;
      const delta = ev.clientX - formDragStartX.current;
      setFormWidth(Math.min(420, Math.max(200, formDragStartW.current + delta)));
    };
    const onUp = () => {
      isFormDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <>
      <div style={{ width: formWidth, display:'flex', flexDirection:'column', borderRadius:16, overflow:'hidden', flexShrink:0, backgroundColor:'#fff', border:'1.5px solid #d0d5d0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 20px', flexShrink:0, backgroundColor:'#1e4d35' }}>
          <h2 style={{ color:'#fff', fontWeight:800, fontSize:16, margin:0 }}>New Message</h2>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.15)', border:'none', cursor:'pointer', color:'#fff', fontSize:18, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>
        <FormContent />
      </div>
      <div onMouseDown={startFormDrag} style={{ width:6, cursor:'col-resize', flexShrink:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:3, height:40, borderRadius:4, backgroundColor:'#c8c8c0', opacity:0.8 }} />
      </div>
      <div style={{ flex:1, minWidth:0, borderRadius:16, display:'flex', flexDirection:'column', overflow:'hidden', backgroundColor:'#FCFCFC', border:'1px solid #e8e8e4' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 20px', flexShrink:0, backgroundColor:'#FCFCFC', borderBottom:'1px solid #efefea' }}>
          <div style={{ width:40, height:40, borderRadius:'50%', backgroundColor:'#e8e8e2', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <p style={{ fontWeight:800, fontSize:14, color:'#1a1a1a', margin:0 }}>{previewTitle}</p>
            <p style={{ fontSize:12, fontWeight:600, margin:0, color: isReady?'#22c55e':'#aaa' }}>{isReady ? "Ready — type your message" : "Complete the options to start"}</p>
          </div>
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, backgroundColor:'#FFFAFA' }}>
          <div style={{ width:64, height:64, borderRadius:'50%', backgroundColor: isReady?'#e8f5ee':'#eef3ee', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {isBroadcast
              ? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z" stroke={isReady?"#1e4d35":"#c8d5c8"} fill={isReady?"rgba(30,77,53,0.12)":"rgba(200,213,200,0.3)"}/></svg>
              : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isReady?"#1e4d35":"#c8d5c8"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            }
          </div>
          <p style={{ fontSize:14, fontWeight:600, textAlign:'center', padding:'0 24px', color: isReady?'#555':'#bbb' }}>
            {isReady ? (isBroadcast ? `Ready to broadcast to ${buildBroadcastLabel()}` : `Type your first message`) : "Complete the options on the left"}
          </p>
        </div>
        <ChatInputBar onSend={(msgData) => handleStart(msgData.text)} disabled={!isReady} bgColor='#FCFCFC' />
      </div>
    </>
  );
}

function ChatContactItem({ contact, isSelected, onClick }) {
  const isGroup = contact.isGroup;
  return (
    <div onClick={onClick}
      style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', cursor:'pointer', borderBottom:'1px solid #ebebeb', backgroundColor: isSelected?'#e8f5ee':'transparent' }}>
      <div style={{ position:'relative', flexShrink:0 }}>
        {isGroup ? (
          <div style={{ width:44, height:44, borderRadius:'50%', backgroundColor:'#e8f5ee', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e4d35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        ) : (
          <img src={contact.avatar} alt="" style={{ width:44, height:44, borderRadius:'50%', objectFit:'cover' }}
            onError={e=>{e.target.onerror=null;e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=1e4d35&color=fff`;}} />
        )}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:3 }}>
          <div style={{ display:'flex', alignItems:'center', gap:4, minWidth:0 }}>
            <span style={{ fontWeight:700, fontSize:13, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color:'#1a1a1a' }}>{contact.name}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4, flexShrink:0, marginLeft:8 }}>
            <span style={{ fontSize:10, color:'#999' }}>{contact.time}</span>
            {contact.unread>0 && (
              <span style={{ width:20, height:20, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', backgroundColor:'#1e4d35' }}>{contact.unread}</span>
            )}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <ChatTypeBadge contact={contact} />
          <p style={{ fontSize:11.5, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', color:'#888', margin:0 }}>{contact.message}</p>
        </div>
      </div>
    </div>
  );
}

function useIsMobileChat() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

const ChatPage = ({ globalStudents = [], globalDoctors = [], globalCourses = [] }) => {
  const [activeTab, setActiveTab] = useState("Students");
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContactsRaw] = usePersistedState('trutheye_chatContacts', chatInitialContacts);
  const setContacts = React.useCallback((value) => {
    setContactsRaw(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      // Strip large base64 images before persisting to avoid exceeding localStorage
      const stripped = {};
      for (const tab in next) {
        stripped[tab] = (next[tab] || []).map(c => ({
          ...c,
          messages: (c.messages || []).map(m => m.type === 'image' ? { ...m, url: '[image]' } : m)
        }));
      }
      try { localStorage.setItem('trutheye_chatContacts', JSON.stringify(stripped)); } catch {}
      return next;
    });
  }, [setContactsRaw]);
  const [showNewMsg, setShowNewMsg] = useState(false);
  const messagesEndRef = useRef(null);
  const isMobile = useIsMobileChat();
  const [mobileView, setMobileView] = useState("list");
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  const tabs = ["Students", "Doctors", "Super Admin", "Groups"];
  const unreadCount = Object.values(contacts).flat().filter(c => c.unread > 0).length;
  const filteredContacts = (contacts[activeTab] || []).filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const selectedContact = (contacts[activeTab] || []).find(c => c.id === selectedId) || null;

  const handleSelectContact = (contact) => {
    setSelectedId(contact.id);
    setShowNewMsg(false);
    setContacts(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(c => c.id===contact.id ? {...c, unread:0} : c),
    }));
    if (isMobile) setMobileView("chat");
  };

  const handleCreateConversation = ({ tab, contact }) => {
    setContacts(prev => {
      const list = prev[tab] || [];
      const existing = list.find(c => {
        if (contact.studentId && c.studentId === contact.studentId) return true;
        if (contact.doctorId  && c.doctorId  === contact.doctorId)  return true;
        if (contact.chatType === "private" && !contact.studentId && !contact.doctorId && c.name === contact.name) return true;
        if (contact.chatType === "broadcast" && c.chatType === "broadcast" && c.name === contact.name) return true;
        return false;
      });
      if (existing) {
        const firstMsg = contact.messages?.[0];
        const updatedList = list.map(c => {
          if (c.id !== existing.id) return c;
          if (!firstMsg) return c;
          return { ...c, messages: [...c.messages, { ...firstMsg, id: Date.now() }], message: firstMsg.text, time: firstMsg.time };
        });
        const idx = updatedList.findIndex(c => c.id === existing.id);
        const reordered = [updatedList[idx], ...updatedList.slice(0, idx), ...updatedList.slice(idx + 1)];
        setActiveTab(tab);
        setSelectedId(existing.id);
        setShowNewMsg(false);
        if (isMobile) setMobileView("chat");
        return { ...prev, [tab]: reordered };
      }
      setActiveTab(tab);
      setSelectedId(contact.id);
      setShowNewMsg(false);
      if (isMobile) setMobileView("chat");
      return { ...prev, [tab]: [contact, ...list] };
    });
  };

  const startDrag = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartWidth.current = sidebarWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const onMove = (ev) => {
      if (!isDragging.current) return;
      const delta = ev.clientX - dragStartX.current;
      setSidebarWidth(Math.min(520, Math.max(220, dragStartWidth.current + delta)));
    };
    const onUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const chatContainerStyle = {
    height: 'calc(100vh - 140px)',
    minHeight: 500,
    display: 'flex',
    gap: 0,
    backgroundColor: '#FFFAFA',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid #e8e8e4',
    boxShadow: '0 0px 10px rgba(0, 0, 0, 0.25)'
  };

  // Mobile views
  if (isMobile) {
    if (mobileView === "chat" && selectedContact && !showNewMsg) {
      return (
        <main className="main-content" style={{ padding: 0 }}>
          <div style={{ ...chatContainerStyle, height: 'calc(100vh - 70px)', flexDirection:'column' }}>
            <ChatAreaView
              contact={selectedContact} contacts={contacts} activeTab={activeTab}
              setContacts={setContacts} messagesEndRef={messagesEndRef}
              onBack={() => setMobileView("list")}
            />
          </div>
        </main>
      );
    }
    if (showNewMsg) {
      return (
        <main className="main-content" style={{ padding: 8 }}>
          <div style={{ ...chatContainerStyle, height: 'calc(100vh - 86px)', flexDirection:'column' }}>
            <NewMessagePanel
              onClose={() => { setShowNewMsg(false); setMobileView("list"); }}
              onCreateConversation={handleCreateConversation}
              isMobile={true}
              globalStudents={globalStudents}
              globalDoctors={globalDoctors}
              globalCourses={globalCourses}
            />
          </div>
        </main>
      );
    }
    return (
      <main className="main-content" style={{ padding: 0 }}>
        <div style={{ ...chatContainerStyle, height: 'calc(100vh - 70px)', flexDirection:'column', backgroundColor:'#fff' }}>
          <div style={{ backgroundColor:'#1e4d35', paddingTop:'env(safe-area-inset-top, 0px)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px' }}>
              <div>
                <h1 style={{ color:'#fff', fontWeight:800, fontSize:18, margin:0 }}>Messages</h1>
                <p style={{ fontSize:12, color:'rgba(255,255,255,0.6)', margin:0 }}>{unreadCount} unread</p>
              </div>
              <button onClick={() => setShowNewMsg(true)}
                style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.15)', border:'none', cursor:'pointer', color:'#fff', fontSize:20, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
            </div>
            <div style={{ padding:'0 16px 12px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, backgroundColor:'#fff', borderRadius:10, padding:'8px 12px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                  style={{ background:'transparent', outline:'none', fontSize:14, width:'100%', color:'#333', border:'none' }} />
              </div>
            </div>
            <div style={{ display:'flex', overflowX:'auto', padding:'0 8px', borderBottom:'1px solid rgba(255,255,255,0.15)', backgroundColor:'#FFFAFA', scrollbarWidth:'none' }}>
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ padding:'10px 12px', fontSize:13, fontWeight:700, whiteSpace:'nowrap', flexShrink:0, position:'relative', color: activeTab===tab?'#1a3d2b':'#777', background:'transparent', border:'none', cursor:'pointer' }}>
                  {tab}
                  {activeTab===tab && <span style={{ position:'absolute', bottom:0, left:0, right:0, height:2, borderRadius:2, backgroundColor:'#1a3d2b', display:'block' }} />}
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex:1, overflowY:'auto', backgroundColor:'#FFFAFA' }}>
            {filteredContacts.length===0
              ? <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:128, color:'#9ca3af', fontSize:14 }}>No conversations</div>
              : filteredContacts.map(contact => (
                <ChatContactItem key={contact.id} contact={contact} isSelected={false} onClick={() => handleSelectContact(contact)} />
              ))
            }
          </div>
        </div>
      </main>
    );
  }

  // Desktop
  return (
    <main className="main-content">
      <div style={chatContainerStyle}>
        {/* Sidebar */}
        <div style={{ width: sidebarWidth, display:'flex', flexDirection:'row', flexShrink:0, height:'100%' }}>
          <div style={{ display:'flex', flexDirection:'column', flex:1, backgroundColor:'#1e4d35', overflow:'hidden' }}>
            <div style={{ padding:'16px 16px 8px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                <div>
                  <h2 style={{ color:'#fff', fontSize:18, fontWeight:800, margin:0 }}>Messages</h2>
                  <p style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.6)', margin:0 }}>{unreadCount} unread</p>
                </div>
                <button onClick={() => { setShowNewMsg(true); setSelectedId(null); }}
                  style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.12)', border:'none', cursor:'pointer', color:'#fff', fontSize:20, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
              </div>
            </div>
            <div style={{ padding:'0 16px 12px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, backgroundColor:'#fff', borderRadius:10, padding:'8px 12px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                  style={{ background:'transparent', outline:'none', fontSize:14, width:'100%', color:'#333', border:'none' }} />
              </div>
            </div>
            <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.15)', backgroundColor:'#FFFAFA' }}>
              {tabs.map(tab => {
                const label = sidebarWidth < 280 ? { Students:'Stud.', Doctors:'Docs.', 'Super Admin':'Admin', Groups:'Groups' }[tab] : tab;
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    style={{ flex:1, paddingTop:10, paddingBottom:10, fontWeight:700, position:'relative', overflow:'hidden', fontSize: sidebarWidth < 260 ? 10 : 12, minWidth:0, paddingLeft:4, paddingRight:4, color: activeTab===tab?'#1a3d2b':'#777', background:'transparent', border:'none', cursor:'pointer' }}>
                    <span style={{ display:'block', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', textAlign:'center' }}>{label}</span>
                    {activeTab===tab && <span style={{ position:'absolute', bottom:0, left:0, right:0, height:2, borderRadius:2, backgroundColor:'#1a3d2b', display:'block' }} />}
                  </button>
                );
              })}
            </div>
            <div style={{ flex:1, overflowY:'auto', backgroundColor:'#FFFAFA' }}>
              {filteredContacts.length===0
                ? <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:128, color:'#9ca3af', fontSize:14 }}>No conversations</div>
                : filteredContacts.map(contact => (
                  <ChatContactItem key={contact.id} contact={contact} isSelected={selectedContact?.id===contact.id} onClick={() => handleSelectContact(contact)} />
                ))
              }
            </div>
          </div>
          {/* Drag handle */}
          <div onMouseDown={startDrag} style={{ width:10, cursor:'col-resize', zIndex:10, display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#FFFAFA' }}>
            <div style={{ width:4, height:40, borderRadius:4, backgroundColor:'#c8c8c0', opacity:0.8 }} />
          </div>
        </div>

        {/* Main area */}
        <div style={{ flex:1, minWidth:0, display:'flex', overflow:'hidden', height:'100%' }}>
          {showNewMsg ? (
            <NewMessagePanel
              onClose={() => setShowNewMsg(false)}
              onCreateConversation={handleCreateConversation}
              isMobile={false}
              globalStudents={globalStudents}
              globalDoctors={globalDoctors}
              globalCourses={globalCourses}
            />
          ) : (
            <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', overflow:'hidden', backgroundColor:'#FFFAFA' }}>
              {selectedContact ? (
                <ChatAreaView
                  contact={selectedContact} contacts={contacts} activeTab={activeTab}
                  setContacts={setContacts} messagesEndRef={messagesEndRef}
                />
              ) : (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:16 }}>
                  <div style={{ width:80, height:80, borderRadius:'50%', backgroundColor:'#e8f5ee', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="#1e4d35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="8" y1="10" x2="16" y2="10" stroke="#1e4d35" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="8" y1="13" x2="13" y2="13" stroke="#1e4d35" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <p style={{ fontWeight:700, fontSize:16, color:'#1a1a1a', margin:0 }}>Select a conversation</p>
                    <p style={{ fontSize:14, marginTop:4, color:'#aaa', margin:'4px 0 0 0' }}>or start a new one with +</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const PlaceholderPage = ({ title, message }) => (
  <main className="main-content">
    <div className="exams-container">
      <h1 className="page-title">{title}</h1>
      <p style={{ color: '#6B7280' }}>{message || 'No data available yet.'}</p>
    </div>
  </main>
);

// ── helpers for persisted state ──────────────────────────────────────────────
function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch { return defaultValue; }
  });
  const setPersisted = React.useCallback((value) => {
    setState(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [state, setPersisted];
}

const DEFAULT_COURSES = [{ id:1, name:'AI' },{ id:2, name:'Operating Systems' },{ id:3, name:'Data Structures' },{ id:4, name:'Networks' }];
const DEFAULT_DEPARTMENTS = [
  { id:1, name:'CS',      desc:'Computer Science (CS) is the study of computation, algorithms, and information processing, focusing on the theoretical foundations and practical development of software and hardware systems.' },
  { id:2, name:'IT',      desc:'Information Technology (IT) focuses on the application and management of computing technologies to support business, infrastructure, and user needs, often dealing with networks, databases, and system administration.' },
  { id:3, name:'IS',      desc:'Information Systems (IS) bridges the gap between technology and business, focusing on how organizations can use information systems and data to solve business problems and achieve strategic goals.' },
  { id:4, name:'MM',      desc:'Multimedia (MM) involves the integration of various media types such as text, graphics, audio, video, and animation to communicate information, focusing on content creation, design, and digital production.' },
  { id:5, name:'Medical', desc:'Medicine (Medical) is the science and practice of the diagnosis, treatment, and prevention of disease, and the promotion of health, requiring deep knowledge of the human body and clinical skills.' },
];
const DEFAULT_DOCTORS = [
  { uid:1, id:'1763550435497', name:'Mohamed Ahmed', email:'mohamed.a@university.edu', dept:'CS',  courses:['Operating Systems','Network'] },
  { uid:2, id:'1763550435497', name:'Malak Ahmed',   email:'malak.a@university.edu',   dept:'IT',  courses:['Operating Systems','Network'] },
  { uid:3, id:'1763550435497', name:'Mohamed Ahmed', email:'mohamed.a@university.edu', dept:'CS',  courses:['AI','Computer Vision','Neural Network'] },
  { uid:4, id:'1763550435497', name:'Ali Hani',      email:'ali.h@university.edu',     dept:'IS',  courses:['AI','Computer Vision','Neural Network'] },
  { uid:5, id:'1763550435498', name:'Khaled Omar',   email:'khaled.o@university.edu',  dept:'MM',  courses:['Data Structures'] },
];
const DEFAULT_STUDENTS = [
  { uid:1, id:'1763550435497', name:'Mohamed Ahmed', email:'mohamed.a@university.edu', nationalId:'90486571134482', phone:'01046238164', dob:'2004-06-08', dept:'CS', level:4, courses:['AI','Computer Vision','Neural Network'] },
  { uid:2, id:'1763550435497', name:'Malak Ahmed',   email:'malak.a@university.edu',   nationalId:'90486571134482', phone:'01046238164', dob:'2004-06-08', dept:'CS', level:4, courses:['AI','Computer Vision','Neural Network'] },
  { uid:3, id:'1763550435497', name:'Mohamed Ahmed', email:'mohamed.a@university.edu', nationalId:'90486571134482', phone:'01046238164', dob:'2004-06-08', dept:'CS', level:4, courses:['AI','Computer Vision','Neural Network'] },
  { uid:4, id:'1763550435497', name:'Ali Hani',      email:'ali.h@university.edu',     nationalId:'90486571134482', phone:'01046238164', dob:'2004-06-08', dept:'CS', level:4, courses:['Computer Vision','Neural Network'] },
  { uid:5, id:'1763550435498', name:'Sara Mohamed',  email:'sara.m@university.edu',    nationalId:'90486571134483', phone:'01046238165', dob:'2003-03-15', dept:'IT', level:3, courses:['Networks','OS'] },
  { uid:6, id:'1763550435499', name:'Ahmed Ali',     email:'ahmed.a@university.edu',   nationalId:'90486571134484', phone:'01046238166', dob:'2002-07-20', dept:'IS', level:2, courses:['Data Structures','AI'] },
];
// ─────────────────────────────────────────────────────────────────────────────

// ===================== //
// APP ROOT
// ===================== //
export default function App() {
  const [activePage, setActivePageRaw]  = usePersistedState('trutheye_activePage', 'profile');
  const [doctorsOpen, setDoctorsOpen]   = usePersistedState('trutheye_doctorsOpen', false);
  const setActivePage = React.useCallback((page) => {
    setActivePageRaw(page);
    if (page === 'addDoctors' || page === 'assignCourses') setDoctorsOpen(true);
  }, [setActivePageRaw, setDoctorsOpen]);

  const [showSidebarResetDoctorsModal,  setShowSidebarResetDoctorsModal]  = useState(false);
  const [showSidebarResetStudentsModal, setShowSidebarResetStudentsModal] = useState(false);
  const [showGlobalWipeModal,           setShowGlobalWipeModal]           = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [globalCourses,     setGlobalCourses]     = usePersistedState('trutheye_courses',     DEFAULT_COURSES);
  const [globalDepartments, setGlobalDepartments] = usePersistedState('trutheye_departments', DEFAULT_DEPARTMENTS);
  const [globalDoctors,     setGlobalDoctors]     = usePersistedState('trutheye_doctors',     DEFAULT_DOCTORS);
  const [globalStudents,    setGlobalStudents]    = usePersistedState('trutheye_students',    DEFAULT_STUDENTS);

  const adminData = useMemo(() => ({
    name: 'Mona Sayed', firstName: 'Mona', lastName: 'Sayed',
    role: 'Administrator', employeeId: 'EMP-2025CS-0042', joined: 'September 2025',
    university: 'Al Beni Suef University',
    faculty: 'Faculty of computer and Al Beni suef University',
    email: 'mona.sayed@university.edu', phone: '+20 100 000 0000',
  }), []);

  return (
    <div className="app-container" dir="ltr">
      <style>{`
        *{box-sizing:border-box}
        body{margin:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#FFFAFA}
        .app-container{display:flex;flex-direction:column;min-height:100vh;background-color:#FFFAFA}
        .sidebar{width:230px;background-color:#1C5332;position:fixed;top:0;left:0;bottom:0;display:flex;flex-direction:column;z-index:100;overflow-y:auto}
        .sidebar-top{padding:24px 16px;border-bottom:1px solid #FFFAFA}
        .sidebar-title{font-size:16px;font-weight:700;color:#FFFAFA;margin:0 0 8px 0}
        .sidebar-welcome{font-size:13px;color:#FFFAFA;margin:0 0 8px 0}
        .sidebar-faculty{font-size:11px;color:#FFFAFA;margin:0;line-height:1.4}
        .sidebar-nav{display:flex;flex-direction:column;gap:8px;padding:0.75rem;flex:1;padding-top:32px}
        .nav-item{padding:0.6rem 0.75rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;color:#FFFAFA;border-radius:0.5rem;transition:background 0.2s}
        .nav-item:hover{background-color:#286B43}
        .nav-item-active{padding:0.6rem 0.75rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;border-radius:0.5rem;background:linear-gradient(#1C5332,#1C5332) padding-box,linear-gradient(135deg,#F3B300,#1C5332) border-box;border:1px solid transparent;color:#FFFAFA;box-shadow:0 0 4px #f3b20070}
        .nav-item-content{display:flex;align-items:center;gap:0.6rem}
        .nav-icon{color:#FFFAFA;display:flex;align-items:center}
        .nav-icon-active{color:#F3B300;display:flex;align-items:center}
        .nav-text{font-size:14px;font-weight:500}
        .nav-arrow{color:#FFFAFA}
        .nav-arrow-active{color:#F3B300}
        .nav-submenu{display:flex;flex-direction:column;gap:10px;margin:10px 0 4px 0;padding:0 0.5rem}
        .nav-sub-item{padding:0.65rem 1rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;color:rgba(255,255,255,0.85);border-radius:0.5rem;font-size:14px;font-weight:500;transition:all 0.2s}
        .nav-sub-item:hover{background-color:rgba(255,255,255,0.12)}
        .nav-sub-item-active:hover{background-color:rgba(255,255,255,0.12); color:#FFFAFA!important}
        .nav-sub-item-active{background-color:#FFFAFA;color:#1C5332!important;font-weight:700}color:#FFFAFA;background-color:#286B43
        .nav-sub-item-active .nav-arrow{color:#1C5332!important}
        .sidebar-danger-zone{padding:1rem 0.75rem;display:flex;flex-direction:column;gap:0.5rem;margin-top:auto}
        .btn-danger{border:none;border-radius:8px;padding:0.6rem 1rem;font-size:13px;font-weight:700;cursor:pointer;width:100%;transition:opacity 0.2s}
        .btn-danger-red{background-color:#EF4444;color:white}
        .btn-danger-red:hover{background-color:#DC2626}
        .btn-danger-dark{background-color:#7F1D1D;color:white}
        .btn-danger-dark:hover{background-color:#6B1010}
        .app-header{position:fixed;top:0;left:230px;right:0;height:100px;background:#FFFAFA;z-index:99;display:flex;align-items:center;justify-content:center}
        .header-logo{display:flex;align-items:center;gap:0.6rem}
        .header-logo-img{width:75px;height:74px;border-radius:0.5rem;margin-right:12px;transition:all 0.3s}
        .header-logo-text{font-size:2.4rem;font-weight:900;letter-spacing:-0.5px;transition:font-size 0.3s}
        .header-logo-text span:first-child{color:#1C5332;font-weight:900}
        .header-logo-text span:last-child{color:#F3B300;font-weight:900}
        .main-content{margin-left:230px;margin-top:100px;padding:2rem;min-height:calc(100vh - 100px);flex:1;background-color:#FFFAFA}
        .exams-container{max-width:900px;margin:0 auto}
        .page-title{font-size:1.5rem;font-weight:700;color:#1C5332;margin-bottom:1.5rem}
        /* PROFILE */
        .profile-container{padding:2.5rem;max-width:80rem;margin:0 auto}
        .profile-title-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5rem;gap:1rem;flex-wrap:wrap}
        .profile-title{font-size:1.875rem;font-weight:bold;color:#1C2933}
        .btn-logout{padding:0.375rem 1.25rem;border:2px solid #EF4444;color:#EF4444;border-radius:0.75rem;font-size:0.875rem;font-weight:600;background-color:#FFFAFA;cursor:pointer;transition:all 0.2s;width:100px;height:40px}
        .btn-logout:hover{background-color:#EF4444;color:#fff}
        .profile-header-orig{display:flex;align-items:center;justify-content:center;gap:1.5rem;margin-bottom:2.5rem;padding-bottom:2rem}
        .profile-img{width:115px;height:115px;border-radius:50%;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);flex-shrink:0;object-fit:cover}
        .profile-info-orig{display:flex;flex-direction:column;gap:0.2rem}
        .profile-name{font-size:24px;font-weight:bold;color:#1C2933;margin:0}
        .profile-role{color:#4B5563;font-size:16px;margin:0}
        .profile-employee-id{color:#1C2933;font-size:15px;margin:0}
        .profile-joined{color:#6B7280;font-size:15px;margin:0}
        .form-section{margin-bottom:40px}
        .section-header{font-size:22px;font-weight:bold;color:#1C2933;margin-bottom:20px;display:flex;align-items:center;gap:0.75rem}
        .section-title-line{position:relative;padding-bottom:8px;margin-bottom:16px;border-bottom:1px solid #DEDEDE}
        .form-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
        .form-grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem}
        .input-field-container{display:flex;flex-direction:column}
        .input-label-profile{color:#616161;font-size:15px;font-weight:500;margin-bottom:0.35rem}
        .input-wrapper{position:relative}
        .input-base{width:100%;padding:0.6rem 0.75rem;border:1px solid #9E9E9E;border-radius:0.375rem;font-size:15px;box-sizing:border-box}
        .input-readonly{background-color:#FFFAFA;color:#1C2933;cursor:not-allowed}
        .date-icon{position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);width:16px;height:16px;color:#9CA3AF}
        .security-container{display:flex;flex-direction:column;gap:0.75rem}
        .btn-change-password-orig{width:100%;max-width:28rem;padding:0.6rem 1rem;border:1.5px solid #1C5332;color:#1C5332;border-radius:0.375rem;background-color:#FFFAFA;cursor:pointer;font-weight:600;font-size:0.875rem;transition:all 0.2s}
        .btn-change-password-orig:hover{background-color:#1C5332;color:#FFFAFA}
        .modal-body{display:flex;flex-direction:column}
        .suggested-info-text{color:#2563EB;font-size:14px;margin-bottom:1.25rem;font-weight:500}
        .error-message-text{color:#EF4444;font-size:14px;margin-bottom:1.25rem;font-weight:500}
        .password-fields{display:flex;flex-direction:column;gap:1rem}
        .password-input-container{display:flex;align-items:center;background-color:#FFFFFF;border:1px solid #D1D5DB;border-radius:0.5rem;overflow:hidden}
        .password-input{flex:1;padding:0.875rem 1.25rem;border:none;outline:none;font-size:1rem;color:#374151;min-width:0}
        .password-toggle-btn{background:transparent;border:none;cursor:pointer;padding:0.5rem 1rem;display:flex;align-items:center;flex-shrink:0}
        .eye-icon-gray{color:#9CA3AF}
        .modal-footer-actions{display:flex;justify-content:space-between;align-items:center;margin-top:2rem;gap:1rem;flex-wrap:wrap}
        .success-ui-container{padding:1rem 0}
        .success-ui-text{color:#1C5332;font-size:1.5rem;font-weight:500;margin:2rem 0 3.5rem 0}
        .success-ui-actions{display:flex;justify-content:flex-end;width:100%}
        .btn-ok-success{background-color:#1C5332;color:white;padding:0.75rem 3.5rem;border:none;border-radius:0.625rem;font-weight:bold;cursor:pointer;font-size:1.125rem}
        .btn-ok-success:hover{background-color:#164228}
        .btn-suggest-outlined{padding:0.75rem 1.5rem;border:1.5px solid #1C5332;color:#1C5332;background-color:transparent;border-radius:0.625rem;cursor:pointer;font-weight:600;font-size:1rem;transition:all 0.2s;white-space:nowrap}
        .btn-suggest-outlined:hover{background-color:#F0FDF4}
        .btn-update-solid{padding:0.75rem 2.75rem;background-color:#1C5332;color:#FFFFFF;border:none;border-radius:0.625rem;cursor:pointer;font-weight:bold;font-size:1rem;transition:background-color 0.2s;white-space:nowrap}
        .btn-update-solid:hover{background-color:#164228}
        .modal-overlay{position:fixed;inset:0;background-color:rgba(0,0,0,0.3);z-index:1000;display:flex;align-items:center;justify-content:center;padding:1.5rem}
        .modal-content{background-color:#FFFAFA;border-radius:0.75rem;width:100%;max-width:800px;padding:2rem 2.5rem;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);border:1px solid #E5E7EB;max-height:90vh;overflow-y:auto}
        .modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}
        .modal-title{font-size:1.75rem;font-weight:bold;color:#1C5332;letter-spacing:-0.01em;margin:0}
        .modal-close-btn{background:transparent;border:none;cursor:pointer;color:#6B7280;padding:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        /* MANAGE COURSES / SHARED */
        .mc-container{max-width:960px;margin:0 auto;display:flex;flex-direction:column;gap:1.5rem}
        .mc-card{background:#FFFAFA;border-radius:12px;padding:1.5rem 2rem;box-shadow:0 0px 10px rgba(0, 0, 0, 0.25)}
        .mc-card-title{font-size:1.2rem;font-weight:700;color:#111827;margin:0 0 1.25rem 0}
        .mc-select-wrapper{position:relative}
        .mc-select{width:100%;padding:0.7rem 2.5rem 0.7rem 1rem;border:1px solid #D1D5DB;border-radius:8px;background:#FFFFFF;font-size:15px;color:#374151;appearance:none;cursor:pointer;outline:none}
        .mc-select:focus{border-color:#1C5332}
        .mc-select-arrow{position:absolute;right:1rem;top:50%;transform:translateY(-50%);pointer-events:none;color:#6B7280;font-size:12px}
        .mc-manual-row{display:flex;gap:0.75rem;margin-top:1rem;align-items:center}
        .mc-form-input{flex:1;padding:0.65rem 0.9rem;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;outline:none;background:#FFFFFF;color:#111827}
        .mc-form-input:focus{border-color:#1C5332}
        .mc-btn-add{padding:0.65rem 1.5rem;background:#1C5332;color:white;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;white-space:nowrap}
        .mc-btn-add:hover{background:#164228}
        .mc-excel-section{margin-top:1.25rem}
        .mc-excel-title{font-size:15px;font-weight:700;color:#111827;margin:0 0 0.75rem 0}
        .mc-file-label{display:flex;align-items:center;gap:0.6rem;border:1.5px dashed #D1D5DB;border-radius:8px;padding:0.8rem 1rem;cursor:pointer;color:#6B7280;font-size:14px;transition:border-color 0.2s}
        .mc-file-label:hover{border-color:#1C5332;color:#1C5332}
        .mc-file-hint{font-size:12px;color:#9CA3AF;margin:0.5rem 0 0.75rem 0}
        .mc-btn-upload{width:100%;padding:0.7rem;background:#1C5332;color:white;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer}
        .mc-btn-upload:hover{background:#164228}
        .mc-search-wrapper{position:relative;margin-bottom:0.75rem}
        .mc-search-icon{position:absolute;left:0.85rem;top:50%;transform:translateY(-50%);color:#9CA3AF}
        .mc-search-input{width:100%;padding:0.65rem 0.9rem 0.65rem 2.5rem;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;outline:none;background:#FFFFFF}
        .mc-search-input:focus{border-color:#1C5332}
        .mc-courses-list{max-height:380px;overflow-y:auto;display:flex;flex-direction:column;gap:0.5rem}
        .mc-course-row{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;border:1px solid #E5E7EB;border-radius:8px;background:#FAFAFA;gap:0.75rem}
        .mc-course-row-editing{background:#F0FDF4;border-color:#1C5332}
        .mc-course-name{font-size:14px;font-weight:600;color:#111827;flex:1}
        .mc-course-actions{display:flex;gap:0.5rem;flex-shrink:0}
        .mc-btn-edit{padding:0.35rem 0.85rem;background:#3B82F6;color:white;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
        .mc-btn-save{padding:0.35rem 0.85rem;background:#1C5332;color:white;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
        .mc-btn-delete{padding:0.35rem 0.85rem;background:#EF4444;color:white;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
        .mc-edit-input{flex:1;min-width:0;padding:0.4rem 0.7rem;border:1px solid #1C5332;border-radius:6px;font-size:14px;outline:none;width:100%}
        .mc-toast{position:fixed;top:1.25rem;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:0.6rem;padding:0.75rem 1.5rem;border-radius:8px;font-size:14px;font-weight:600;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.15);animation:toastIn 0.3s ease;white-space:nowrap}
        .mc-toast-success{background:#1C5332;color:white}
        .mc-toast-error{background:#EF4444;color:white}
        .mc-toast-icon{font-size:16px}
        @keyframes toastIn{from{opacity:0;top:0}to{opacity:1;top:1.25rem}}
        .mc-dept-row{align-items:flex-start;padding:1rem 1.25rem}
        .mc-dept-info{display:flex;flex-direction:column;gap:0.3rem;flex:1}
        .mc-dept-desc{font-size:13.5px;color:#6B7280;margin:0;line-height:1.5;max-width:85%}
        .mc-dept-edit-fields{display:flex;flex-direction:column;gap:0.5rem;flex:1;margin-right:0.75rem}
        .mc-edit-desc{font-size:14px;color:#374151}
        .mc-manual-section{margin-top:1.1rem}
        .mc-doctor-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem 1.5rem}
        .mc-doctor-field{display:flex;flex-direction:column;gap:0.4rem}
        .mc-doctor-label{font-size:15px;font-weight:700;color:#111827}
        .mc-btn-doctor-add{width:100%;margin-top:1.5rem;padding:0.85rem;background-color:#1C5332;color:white;border:none;border-radius:8px;font-size:17px;font-weight:700;cursor:pointer}
        .mc-btn-doctor-add:hover{background-color:#164228}
        /* ASSIGN COURSES */
        .ac-section-label{font-size:15px;font-weight:700;color:#111827;margin-bottom:0.5rem;margin-top:0.25rem}
        .ac-assign-title{font-size:1.35rem;font-weight:700;color:#1C5332;margin:0 0 1rem 0}
        .ac-courses-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;margin:1rem 0 1.5rem 0}
        .ac-course-checkbox{display:flex;align-items:center;gap:0.6rem;border:1.5px solid #D1D5DB;border-radius:8px;padding:0.75rem 1rem;cursor:pointer;transition:border-color 0.2s;background:#FFFFFF}
        .ac-course-checkbox:hover{border-color:#3B82F6}
        .ac-course-checked{border-color:#3B82F6}
        .ac-checkbox-box{width:18px;height:18px;border:2px solid #3B82F6;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#FFFFFF}
        .ac-checkbox-checked{background-color:#3B82F6}
        .ac-checkbox-checked::after{content:"\u2713";color:white;font-size:12px;font-weight:700}
        .ac-course-label{font-size:15px;font-weight:600;color:#111827}
        .ac-danger-card{background-color:#FEE2E2;border:1.5px solid #EF4444;border-radius:12px;padding:1.75rem 2rem}
        .ac-danger-title{font-size:1.5rem;font-weight:700;color:#DC2626;margin:0 0 1rem 0;display:flex;align-items:center;gap:0.6rem}
        .ac-danger-icon{color:#DC2626;flex-shrink:0}
        .ac-danger-desc{font-size:15px;color:#374151;margin:0 0 1.5rem 0;line-height:1.6}
        .ac-btn-reset{width:100%;padding:0.85rem;background-color:#DC2626;color:white;border:none;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer}
        .ac-btn-reset:hover{background-color:#B91C1C}
        /* REPORTS */
        .rp-top-card{background:#FFFAFA;border:1px solid #E5E7EB;border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:1.25rem;box-shadow:0 0 10px rgba(0,0,0,0.25);}
        .rp-main-title{font-size:1.75rem;font-weight:800;color:#111827;margin:0 0 1rem 0}
        .rp-search-row{display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap}
        .rp-search-row .mc-search-wrapper{margin-bottom:0}
        .rp-tab-btn{padding:0.65rem 1.4rem;border-radius:8px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.2s;white-space:nowrap;background-color:#1C5332;color:#FFFFFF}
        .rp-tab-btn:hover{background-color:#164228}
        .rp-section{background:#FCFCFC;border:1px solid #E5E7EB;border-radius:12px;padding:1.5rem;margin-bottom:1.25rem;box-shadow:0 0 10px rgba(0,0,0,0.25);}
        .rp-section-title{font-size:1.35rem;font-weight:800;color:#1C5332;margin:0 0 1rem 0}
        .rp-cards-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.85rem;}
        .rp-card{box-shadow:0 0 10px rgba(0,0,0,0.25);background:#FCFCFC;border-radius:10px;padding:0.9rem 1rem;font-size:13.5px;display:flex;flex-direction:column;}
        .rp-card-editing{border-color:#1C5332;background:#F0FDF4;box-shadow:0 0 0 2px #1C533220}
        .rp-card-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.4rem}
        .rp-label{font-weight:700;color:#111827}
        .rp-row{margin:0 0 0.2rem 0;color:#374151;font-size:13.5px}
        .rp-courses{margin:0.1rem 0 0.5rem 0;padding-left:1rem;color:#374151;font-size:13.5px}
        .rp-courses li{margin-bottom:2px;list-style:disc}
        .rp-courses-edit-list{list-style:none;margin:0.3rem 0 0.4rem 0;padding:0;display:flex;flex-direction:column;gap:0.4rem}
        .rp-courses-edit-item{display:flex;align-items:center;gap:0.4rem}
        .rp-courses-edit-bullet{color:#374151;font-size:14px;flex-shrink:0}
        .rp-course-input{flex:1;margin:0}
        .rp-course-remove-btn{background:transparent;border:none;color:#EF4444;cursor:pointer;font-size:12px;padding:0 2px;flex-shrink:0;line-height:1}
        .rp-course-remove-btn:hover{color:#DC2626}
        .rp-course-add-btn{background:transparent;border:1px dashed #9CA3AF;color:#6B7280;border-radius:6px;padding:0.25rem 0.6rem;font-size:12px;cursor:pointer;margin-top:0.2rem;width:100%}
        .rp-course-add-btn:hover{border-color:#1C5332;color:#1C5332}
        .rp-edit-btn{background:transparent;border:none;cursor:pointer;padding:2px;display:flex;align-items:center;flex-shrink:0}
        .rp-delete-btn{background-color:#EF4444;color:white;border:none;border-radius:6px;padding:0.3rem 0.85rem;font-size:12px;font-weight:600;cursor:pointer}
        .rp-delete-btn:hover{background-color:#DC2626}
        .rp-save-btn{width:100%;margin-top:0.85rem;padding:0.6rem;background:#1C5332;color:white;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer}
        .rp-save-btn:hover{background:#164228}
        .rp-edit-field{display:flex;flex-direction:column;gap:0.2rem;margin-bottom:0.5rem}
        .rp-inline-input{padding:0.35rem 0.6rem;border:1px solid #D1D5DB;border-radius:6px;font-size:13px;outline:none;width:100%}
        .rp-inline-input:focus{border-color:#1C5332}
        .rp-pagination{display:flex;justify-content:space-between;align-items:center;margin-top:1rem}
        .rp-page-btn{background:#FFFFFF;border:1px solid #D1D5DB;border-radius:8px;width:38px;height:38px;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#374151}
        .rp-page-btn:hover:not(:disabled){background:#F3F4F6}
        .rp-page-btn:disabled{opacity:0.35;cursor:not-allowed}
        .rp-delete-all-btn{padding:0.6rem 1.25rem;background-color:#EF4444;color:white;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}
        .rp-delete-all-btn:hover{background-color:#DC2626}
        .rp-tab-active-outline{background-color:#F0FDF4!important;color:#1C5332!important;border:2px solid #1C5332!important}
        .rp-page-btn{background:#FCFCFC;border:1.5px solid #1C5332;border-radius:8px;width:38px;height:38px;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#374151}
        .rp-page-btn:hover:not(:disabled){background:#F3F4F6}
        .rp-page-btn:disabled{background:#BEBEBE;opacity:0.4;cursor:not-allowed;border-color:#616161}
        .rp-pag-num{width:34px;height:34px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #D1D5DB;border-radius:6px;font-size:14px;cursor:pointer;background:#FFFFFF;color:#374151}
        .rp-pag-num:hover{background:#F3F4F6}
        .rp-pag-active{background:#1C5332!important;color:white!important;border-color:#1C5332!important}
        .rp-pag-input{width:50px;padding:0.3rem 0.4rem;border:1px solid #D1D5DB;border-radius:6px;font-size:13px;text-align:center;outline:none}
        /* CONFIRM MODALS */
        .confirm-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1.5rem}
        .confirm-modal-box{background:#FFFFFF;border-radius:16px;padding:2.5rem 3rem;max-width:500px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.25);border:2px solid #EF4444;animation:modalPop 0.2s ease}
        @keyframes modalPop{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:scale(1)}}
        .confirm-modal-title{font-size:1.45rem;font-weight:800;color:#EF4444;margin:0 0 1.25rem 0}
        .confirm-modal-text{font-size:1rem;color:#374151;line-height:1.8;margin:0 0 2rem 0}
        .confirm-modal-actions{display:flex;gap:1rem;justify-content:center}
        .confirm-modal-btn-confirm{padding:0.75rem 2rem;background:#EF4444;color:white;border:none;border-radius:10px;font-size:1rem;font-weight:700;cursor:pointer;transition:background 0.2s}
        .confirm-modal-btn-confirm:hover{background:#DC2626}
        .confirm-modal-btn-cancel{padding:0.75rem 2rem;background:transparent;color:#374151;border:2px solid #D1D5DB;border-radius:10px;font-size:1rem;font-weight:700;cursor:pointer;transition:all 0.2s}
        .confirm-modal-btn-cancel:hover{border-color:#9CA3AF;background:#F9FAFB}
        /* HAMBURGER / RESPONSIVE */
        .hamburger-btn{display:none;position:fixed;top:1rem;left:1rem;z-index:200;background:#1C5332;border:none;border-radius:8px;padding:0.5rem 0.65rem;cursor:pointer;flex-direction:column;gap:5px}
        .hamburger-btn span{display:block;width:22px;height:2.5px;background:#FFFAFA;border-radius:2px;transition:all 0.3s}
        .sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:149}
        @media(max-width:1200px){.rp-cards-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:900px){.rp-cards-grid{grid-template-columns:repeat(2,1fr)}.ac-courses-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:1024px){
          .sidebar{width:210px}.app-header{left:210px}.main-content{margin-left:210px}
          .header-logo-img{width:60px;height:60px}.header-logo-text{font-size:2rem}
        }
        @media(max-width:768px){
          .hamburger-btn{display:flex}
          .sidebar{transform:translateX(-100%);transition:transform 0.3s ease;width:250px;z-index:150}
          .sidebar.sidebar-open{transform:translateX(0)}
          .sidebar-overlay{display:block}
          .app-header{left:0;height:70px;justify-content:center}
          .header-logo-img{width:44px;height:44px;margin-right:8px}
          .header-logo-text{font-size:1.6rem}
          .main-content{margin-left:0;margin-top:70px;padding:1rem}
          .form-grid-3{grid-template-columns:1fr}
          .form-grid-2{grid-template-columns:1fr}
          .mc-doctor-form-grid{grid-template-columns:1fr}
          .rp-cards-grid{grid-template-columns:1fr}
          .ac-courses-grid{grid-template-columns:repeat(2,1fr)}
          .mc-manual-row{flex-direction:column;align-items:stretch}
          .mc-btn-add{width:100%}
          .mc-btn-save,.mc-btn-edit,.mc-btn-delete{flex:1;padding:0.5rem;font-size:14px}
          .profile-header-orig{flex-direction:column;text-align:center}
          .profile-title-row{flex-direction:column;align-items:flex-start;gap:0.75rem;margin-bottom:1.5rem}
          .profile-title{font-size:1.5rem}
          .btn-logout{width:100%;height:48px;font-size:1rem;border-radius:0.75rem;border-width:2px}
          .modal-content{padding:1.25rem 1rem}
          .confirm-modal-box{padding:1.5rem 1.25rem}
          .confirm-modal-actions{flex-direction:column}
          .confirm-modal-btn-confirm,.confirm-modal-btn-cancel{width:100%}
          .rp-search-row{flex-direction:column;align-items:stretch}
          .rp-tab-btn{width:100%;text-align:center}
          .mc-card{padding:1rem}
          .mc-container{gap:1rem}
          .mc-select{font-size:14px}
          .rp-main-title{font-size:1.3rem}
          .page-title{font-size:1.2rem}
        }
        @media(max-width:354px){
          .mc-course-row{flex-direction:column;align-items:stretch}
          .mc-course-actions{justify-content:flex-end}
          .mc-edit-input{width:100%;box-sizing:border-box}
          .mc-btn-save,.mc-btn-edit,.mc-btn-delete{flex:1;padding:0.5rem;font-size:14px}
        }
        @media(max-width:480px){
          .rp-cards-grid{grid-template-columns:1fr}
          .ac-courses-grid{grid-template-columns:1fr}
          .header-logo-img{width:36px;height:36px;margin-right:6px}
          .header-logo-text{font-size:1.35rem}
          .confirm-modal-box{padding:1.25rem 1rem}
          .mc-excel-section{padding:0}
          .rp-pag-btn{padding:0.35rem 0.6rem;font-size:13px}
          .rp-pag-num{width:28px;height:28px;font-size:12px}
        }
      `}</style>

      {/* Global Data Wipe Modal */}
      {showGlobalWipeModal && (
        <div className="confirm-modal-overlay" onClick={() => setShowGlobalWipeModal(false)}>
          <div className="confirm-modal-box" style={{maxWidth:'480px'}} onClick={e => e.stopPropagation()}>
            <h2 style={{fontSize:'1.4rem', fontWeight:800, color:'#EF4444', margin:'0 0 1.25rem 0'}}>Warning: Delete All Data!</h2>
            <p style={{fontSize:'1rem', color:'#374151', lineHeight:1.8, margin:'0 0 2rem 0'}}>
              Are you absolutely sure you want to delete all data (students, professors, courses, departments)? This deletion is complete and permanent.
            </p>
            <div style={{display:'flex', gap:'1rem', justifyContent:'center'}}>
              <button style={{flex:1, padding:'0.85rem', background:'#EF4444', color:'white', border:'none', borderRadius:'10px', fontSize:'1rem', fontWeight:700, cursor:'pointer'}}
                onClick={() => { setGlobalStudents([]); setGlobalDoctors([]); setGlobalCourses([]); setGlobalDepartments([]); setShowGlobalWipeModal(false); }}>
                Delete All Data
              </button>
              <button style={{flex:1, padding:'0.85rem', background:'transparent', color:'#EF4444', border:'2px solid #EF4444', borderRadius:'10px', fontSize:'1rem', fontWeight:700, cursor:'pointer'}}
                onClick={() => setShowGlobalWipeModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Reset Students Courses Modal */}
      {showSidebarResetStudentsModal && (
        <div className="confirm-modal-overlay" onClick={() => setShowSidebarResetStudentsModal(false)}>
          <div className="confirm-modal-box" style={{maxWidth:'600px', position:'relative'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowSidebarResetStudentsModal(false)} style={{position:'absolute', top:'1rem', right:'1rem', background:'transparent', border:'none', cursor:'pointer', fontSize:'1.4rem', color:'#374151', lineHeight:1}}>✕</button>
            <h2 style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', fontSize:'1.5rem', fontWeight:800, color:'#EF4444', margin:'0 0 1.25rem 0'}}>
              <AlertTriangle size={28} color="#EF4444" /> Semester Course Management (Reset)
            </h2>
            <p style={{fontSize:'1rem', color:'#374151', lineHeight:1.8, margin:'0 0 2rem 0'}}>
              Use this button only at the beginning of the Semester to clear all existing course assignments for ALL students.
            </p>
            <button style={{width:'100%', padding:'0.9rem', background:'#EF4444', color:'white', border:'none', borderRadius:'12px', fontSize:'1rem', fontWeight:700, cursor:'pointer'}}
              onClick={() => { setGlobalStudents(prev => prev.map(s => ({ ...s, courses: [] }))); setShowSidebarResetStudentsModal(false); }}>
              Reset ALL Student Course Assignments
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Reset Doctors Courses Modal */}
      {showSidebarResetDoctorsModal && (
        <div className="confirm-modal-overlay" onClick={() => setShowSidebarResetDoctorsModal(false)}>
          <div className="confirm-modal-box" style={{maxWidth:'600px', position:'relative'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowSidebarResetDoctorsModal(false)} style={{position:'absolute', top:'1rem', right:'1rem', background:'transparent', border:'none', cursor:'pointer', fontSize:'1.4rem', color:'#374151', lineHeight:1}}>✕</button>
            <h2 style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', fontSize:'1.5rem', fontWeight:800, color:'#EF4444', margin:'0 0 1.25rem 0'}}>
              <AlertTriangle size={28} color="#EF4444" /> Semester Course Management (Reset)
            </h2>
            <p style={{fontSize:'1rem', color:'#374151', lineHeight:1.8, margin:'0 0 2rem 0'}}>
              Use this button only at the beginning of the Semester to clear all existing course assignments for ALL doctors.
            </p>
            <button style={{width:'100%', padding:'0.9rem', background:'#EF4444', color:'white', border:'none', borderRadius:'12px', fontSize:'1rem', fontWeight:700, cursor:'pointer'}}
              onClick={() => { setGlobalDoctors(prev => prev.map(d => ({ ...d, courses: [] }))); setShowSidebarResetDoctorsModal(false); }}>
              Reset ALL Doctor Course Assignments
            </button>
          </div>
        </div>
      )}

      {/* Hamburger - mobile only */}
      {!sidebarOpen && (
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Toggle menu">
          <span/><span/><span/>
        </button>
      )}

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <p className="sidebar-title">Admin Panel</p>
          <p className="sidebar-welcome">Welcome, Mona Sayed</p>
          <p className="sidebar-faculty">{adminData.faculty}</p>
        </div>
        <nav className="sidebar-nav">
          <NavItem icon={<User size={18}/>} label="Profile" active={activePage === 'profile'} onClick={() => { setActivePage('profile'); setSidebarOpen(false); }} />
          <NavItem icon={<BookOpen size={18}/>} label="Manage Courses" active={activePage === 'courses'} onClick={() => { setActivePage('courses'); setSidebarOpen(false); }} />
          <NavItem icon={<PlusCircle size={18}/>} label="Add Departments" active={activePage === 'departments'} onClick={() => { setActivePage('departments'); setSidebarOpen(false); }} />
          <div>
            <div className={doctorsOpen || activePage === 'addDoctors' || activePage === 'assignCourses' ? "nav-item-active" : "nav-item"} onClick={() => setDoctorsOpen(prev => !prev)} style={{cursor:'pointer'}}>
              <div className="nav-item-content">
                <span className={doctorsOpen || activePage === 'addDoctors' || activePage === 'assignCourses' ? "nav-icon-active" : "nav-icon"}><UserCog size={18}/></span>
                <span className="nav-text">Manage Doctors</span>
              </div>
              {doctorsOpen ? <ChevronDown size={18} className="nav-arrow-active" /> : <ChevronRight size={18} className="nav-arrow" />}
            </div>
            {doctorsOpen && (
              <div className="nav-submenu">
                <div className={`nav-sub-item ${activePage === 'addDoctors' ? 'nav-sub-item-active' : ''}`} style={activePage === 'addDoctors' ? {color:'#1C5332'} : {}} onClick={() => { setActivePage('addDoctors'); setSidebarOpen(false); }}>
                  <span className="nav-text">Add New Doctors</span>
                  <ChevronRight size={16} className={activePage === 'addDoctors' ? "nav-arrow-active" : "nav-arrow"} />
                </div>
                <div className={`nav-sub-item ${activePage === 'assignCourses' ? 'nav-sub-item-active' : ''}`} style={activePage === 'assignCourses' ? {color:'#1C5332'} : {}} onClick={() => { setActivePage('assignCourses'); setSidebarOpen(false); }}>
                  <span className="nav-text">Assign Courses</span>
                  <ChevronRight size={16} className={activePage === 'assignCourses' ? "nav-arrow-active" : "nav-arrow"} />
                </div>
              </div>
            )}
          </div>
          <NavItem icon={<UserPlus size={18}/>} label="Add New Students" active={activePage === 'students'} onClick={() => { setActivePage('students'); setSidebarOpen(false); }} />
          <NavItem icon={<BarChart2 size={18}/>} label="Reports" active={activePage === 'reports'} onClick={() => { setActivePage('reports'); setSidebarOpen(false); }} />
          <NavItem icon={<MessageSquare size={18}/>} label="Chat" active={activePage === 'chat'} onClick={() => { setActivePage('chat'); setSidebarOpen(false); }} />
        </nav>
        <div className="sidebar-danger-zone">
          <button className="btn-danger btn-danger-red" onClick={() => setShowSidebarResetDoctorsModal(true)} style={{display:'flex', alignItems:'center', gap:'6px', justifyContent:'center'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            Reset ALL Doctors Courses
          </button>
          <button className="btn-danger btn-danger-red" onClick={() => setShowSidebarResetStudentsModal(true)} style={{display:'flex', alignItems:'center', gap:'6px', justifyContent:'center'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            Reset ALL Students Courses
          </button>
          <button className="btn-danger btn-danger-dark" onClick={() => setShowGlobalWipeModal(true)} style={{display:'flex', alignItems:'center', gap:'6px', justifyContent:'center'}}>
            <AlertTriangle size={14} /> Global Data Wipe
          </button>
        </div>
      </aside>

      {/* Header */}
      <header className="app-header">
        <div className="header-logo">
          <img src={Logo} alt="Logo" className="header-logo-img" onError={e => e.target.style.display='none'} />
          <div className="header-logo-text"><span>Truth</span><span>Eye</span></div>
        </div>
      </header>

      {/* Pages */}
      {activePage === 'profile'       && <ProfilePage />}
      {activePage === 'courses'       && <ManageCoursesPage courses={globalCourses} setCourses={setGlobalCourses} />}
      {activePage === 'departments'   && <AddDepartmentsPage departments={globalDepartments} setDepartments={setGlobalDepartments} />}
      {activePage === 'addDoctors'    && <AddNewDoctorsPage departments={globalDepartments} courses={globalCourses} onAddDoctor={d => setGlobalDoctors(prev => [...prev, d])} />}
      {activePage === 'assignCourses' && <AssignCoursesPage doctors={globalDoctors} courses={globalCourses} setDoctors={setGlobalDoctors} />}
      {activePage === 'students'      && <AddNewStudentsPage departments={globalDepartments} courses={globalCourses} onAddStudent={s => setGlobalStudents(prev => [...prev, s])} />}
      {activePage === 'reports'       && <ReportsPage students={globalStudents} setStudents={setGlobalStudents} doctors={globalDoctors} setDoctors={setGlobalDoctors} courses={globalCourses} departments={globalDepartments} />}
      {activePage === 'chat'          && <ChatPage globalStudents={globalStudents} globalDoctors={globalDoctors} globalCourses={globalCourses} />}
    </div>
  );
}