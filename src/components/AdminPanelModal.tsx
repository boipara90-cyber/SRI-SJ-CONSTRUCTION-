import React, { useState, useEffect } from 'react';
import { 
  fetchAllBookings, 
  fetchAllQuoteRequests, 
  fetchAllCareerApplications,
  fetchAllContactSubmissions,
  updateBookingStatus, 
  AdminBookingRecord, 
  AdminQuoteRecord, 
  AdminCareerRecord,
  AdminContactRecord
} from '../services/adminService';
import { 
  isSingleAdminSlotOccupied,
  registerSingleAdminAccount,
  verifyAdminLogin,
  checkAdminSession,
  terminateAdminSession,
  getAdminProfile,
  updateAdminPassword
} from '../services/adminAuthService';
import { 
  Lock, 
  User, 
  Key, 
  LogOut, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Filter, 
  RefreshCw, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  FileText, 
  Briefcase, 
  ChevronRight, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  HardHat,
  X,
  AlertCircle,
  UserPlus,
  ShieldAlert,
  Eye,
  EyeOff,
  Printer,
  Sparkles,
  Layers,
  Settings,
  MessageSquare
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'bookings' | 'quotes' | 'contacts' | 'careers' | 'account';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  // Authentication & Single Slot State
  const [isSlotTaken, setIsSlotTaken] = useState<boolean>(isSingleAdminSlotOccupied());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAdminSession());
  const [authMode, setAuthMode] = useState<'login' | 'register'>(() => {
    return isSingleAdminSlotOccupied() ? 'login' : 'register';
  });

  // Login Form
  const [loginUserOrEmail, setLoginUserOrEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Single Slot Registration Form
  const [regUsername, setRegUsername] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regSecurityPin, setRegSecurityPin] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccessMsg, setRegSuccessMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Admin Profile
  const [adminProfile, setAdminProfile] = useState<{ username: string; fullName: string; email: string } | null>(() => getAdminProfile());

  // Password Change in Account tab
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdUpdateMsg, setPwdUpdateMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<TabType>('bookings');
  const [bookings, setBookings] = useState<AdminBookingRecord[]>([]);
  const [quotes, setQuotes] = useState<AdminQuoteRecord[]>([]);
  const [contacts, setContacts] = useState<AdminContactRecord[]>([]);
  const [careers, setCareers] = useState<AdminCareerRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<{
    type: 'booking' | 'quote' | 'contact' | 'career';
    data: any;
  } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Check state whenever opened
  useEffect(() => {
    if (isOpen) {
      const slotOccupied = isSingleAdminSlotOccupied();
      setIsSlotTaken(slotOccupied);
      const isAuthed = checkAdminSession();
      setIsAuthenticated(isAuthed);
      if (isAuthed) {
        setAdminProfile(getAdminProfile());
        loadDashboardData();
      } else {
        setAuthMode(slotOccupied ? 'login' : 'register');
      }
    }
  }, [isOpen]);

  // Load all user submissions & appointments
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [bData, qData, cData, cntData] = await Promise.all([
        fetchAllBookings(),
        fetchAllQuoteRequests(),
        fetchAllCareerApplications(),
        fetchAllContactSubmissions()
      ]);
      setBookings(bData);
      setQuotes(qData);
      setCareers(cData);
      setContacts(cntData);
    } catch (err) {
      console.error('Error loading admin records:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Handle Login Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      const res = verifyAdminLogin(loginUserOrEmail, loginPassword);
      if (res.success) {
        setIsAuthenticated(true);
        setAdminProfile(res.profile || getAdminProfile());
        loadDashboardData();
        showToast('Welcome back! Logged into Sri SJ Admin Portal.');
      } else {
        setLoginError(res.message);
      }
      setIsLoggingIn(false);
    }, 300);
  };

  // Handle Single-Slot Registration Submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccessMsg('');

    if (isSlotTaken) {
      setRegError('Registration is permanently closed. The single authorized Administrator slot has already been claimed.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsRegistering(true);
    setTimeout(() => {
      const res = registerSingleAdminAccount({
        username: regUsername,
        fullName: regFullName,
        email: regEmail,
        password: regPassword,
        securityPin: regSecurityPin
      });

      if (res.success) {
        setIsSlotTaken(true);
        setIsAuthenticated(true);
        setAdminProfile(getAdminProfile());
        setRegSuccessMsg(res.message);
        loadDashboardData();
        showToast('Admin Account Created! Registration slot is now permanently locked.');
      } else {
        setRegError(res.message);
      }
      setIsRegistering(false);
    }, 400);
  };

  // Handle Logout
  const handleLogout = () => {
    terminateAdminSession();
    setIsAuthenticated(false);
    setLoginUserOrEmail('');
    setLoginPassword('');
    setSelectedRecord(null);
    setIsSlotTaken(isSingleAdminSlotOccupied());
    setAuthMode('login');
    showToast('Logged out of Admin Portal.');
  };

  // Handle Status Change for Booking
  const handleStatusChange = async (refId: string, newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    setUpdatingId(refId);
    try {
      await updateBookingStatus(refId, newStatus);
      setBookings(prev => prev.map(b => b.referenceId === refId ? { ...b, status: newStatus } : b));
      if (selectedRecord && selectedRecord.type === 'booking' && selectedRecord.data.referenceId === refId) {
        setSelectedRecord({
          type: 'booking',
          data: { ...selectedRecord.data, status: newStatus }
        });
      }
      showToast(`Appointment status updated to ${newStatus.toUpperCase()}`);
    } catch (e) {
      console.error('Failed to update status', e);
    } finally {
      setUpdatingId(null);
    }
  };

  // Handle Password Update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdUpdateMsg(null);
    const res = updateAdminPassword(currPassword, newPassword);
    if (res.success) {
      setPwdUpdateMsg({ type: 'success', text: res.message });
      setCurrPassword('');
      setNewPassword('');
    } else {
      setPwdUpdateMsg({ type: 'error', text: res.message });
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (activeTab === 'bookings') {
      csvContent += "Reference ID,Name,Phone,Email,Company,Date,Time Slot,Appointment Type,Location,Status,Notes,Created At\n";
      bookings.forEach(b => {
        csvContent += `"${b.referenceId}","${b.name}","${b.phone}","${b.email}","${b.companyName || ''}","${b.appointmentDate}","${b.timeSlot}","${b.appointmentType}","${b.projectLocation}","${b.status}","${(b.notes || '').replace(/"/g, '""')}","${b.createdAt}"\n`;
      });
    } else if (activeTab === 'quotes') {
      csvContent += "Reference ID,Name,Company,Phone,Email,Service,Location,Timeline,Message,Created At\n";
      quotes.forEach(q => {
        csvContent += `"${q.referenceId}","${q.name}","${q.companyName || ''}","${q.phone}","${q.email}","${q.serviceRequired}","${q.projectLocation}","${q.estimatedTimeline || ''}","${(q.message || '').replace(/"/g, '""')}","${q.createdAt}"\n`;
      });
    } else if (activeTab === 'contacts') {
      csvContent += "Reference ID,Name,Company,Phone,Email,Service,Location,Message,Created At\n";
      contacts.forEach(c => {
        csvContent += `"${c.referenceId}","${c.name}","${c.companyName || ''}","${c.phone}","${c.email}","${c.serviceRequired || ''}","${c.projectLocation || ''}","${(c.message || '').replace(/"/g, '""')}","${c.createdAt}"\n`;
      });
    } else if (activeTab === 'careers') {
      csvContent += "Reference ID,Full Name,Father Name,Phone,Email,Position,Experience,CV File,Address,Created At\n";
      careers.forEach(car => {
        csvContent += `"${car.referenceId}","${car.fullName}","${car.fatherName || ''}","${car.phone}","${car.email}","${car.positionAppliedFor}","${car.experienceYears || ''}","${car.cvFileName || ''}","${(car.address || '').replace(/"/g, '""')}","${car.createdAt}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sri_sj_${activeTab}_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${activeTab} to CSV file.`);
  };

  if (!isOpen) return null;

  // Filter items
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.companyName && b.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.projectLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredQuotes = quotes.filter(q => {
    return (
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.phone.includes(searchQuery) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.companyName && q.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.serviceRequired.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.projectLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredContacts = contacts.filter(c => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.companyName && c.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredCareers = careers.filter(c => {
    return (
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.positionAppliedFor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 font-sans">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white font-['Space_Grotesk'] tracking-wide">
                  Sri SJ Construction — Master Admin Portal
                </h2>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-amber-400 font-bold">
                  v2.5 Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Site Bookings, Quote Inquiries, Client Communications &amp; Application Records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Logged in:</span>
                <span className="text-amber-400 font-bold">{adminProfile?.username || 'Admin'}</span>
              </div>
            )}
            <button
              onClick={onClose}
              id="admin-modal-close-btn"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: AUTHENTICATION SCREEN (LOGIN OR SINGLE-SLOT REGISTRATION) */}
        {/* ========================================================================= */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-slate-900/60">
            <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Single Slot Allocation Banner */}
              <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                isSlotTaken 
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className={`w-4 h-4 ${isSlotTaken ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span>Single-Slot Admin System</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isSlotTaken 
                      ? 'bg-emerald-950 border border-emerald-700/50 text-emerald-300' 
                      : 'bg-amber-500/20 border border-amber-500/30 text-amber-300 animate-pulse'
                  }`}>
                    {isSlotTaken ? 'Slot Claimed (1/1)' : 'Slot Available (0/1 Registered)'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {isSlotTaken
                    ? 'The single authorized master administrator account is registered and locked. Log in below to access the management portal.'
                    : 'No administrator account has been set up yet. Use the single registration slot below to configure your master admin credentials.'}
                </p>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'login'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (isSlotTaken) {
                      setLoginError('Registration is disabled. The single admin account has already been registered.');
                    } else {
                      setAuthMode('register');
                    }
                  }}
                  disabled={isSlotTaken}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    authMode === 'register'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : isSlotTaken
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={isSlotTaken ? 'Registration slot already claimed' : 'Claim the single admin slot'}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Single-Slot Sign Up {isSlotTaken ? '(Locked)' : ''}</span>
                </button>
              </div>

              {/* FORM A: ADMIN LOGIN */}
              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Username or Admin Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={loginUserOrEmail}
                        onChange={(e) => setLoginUserOrEmail(e.target.value)}
                        placeholder="e.g. boipara90@gmail.com or admin"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Key className="w-4 h-4" />
                      </div>
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter master password"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    id="admin-login-submit-btn"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoggingIn ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Sign In to Admin Dashboard</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2 text-[11px] text-slate-500">
                    Protected geotechnical database for Sri SJ Construction Private Limited.
                  </div>
                </form>
              )}

              {/* FORM B: SINGLE-SLOT ADMIN REGISTRATION */}
              {authMode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>You are configuring the <strong>1 and only</strong> master admin account.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="e.g. srisj_admin or boipara"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="e.g. Master Administrator"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="boipara90@gmail.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Master Password
                      </label>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="At least 6 chars"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Confirm Password
                      </label>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Re-type password"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Security PIN / Recovery Code
                    </label>
                    <input
                      type="text"
                      required
                      value={regSecurityPin}
                      onChange={(e) => setRegSecurityPin(e.target.value)}
                      placeholder="e.g. 2013 or your secret 4-digit PIN"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {regError && (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                      <span>{regError}</span>
                    </div>
                  )}

                  {regSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                      <span>{regSuccessMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isRegistering || isSlotTaken}
                    id="admin-register-submit-btn"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isRegistering ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Registering &amp; Locking Slot...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Create Single Master Admin Account</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: AUTHENTICATED ADMIN DASHBOARD */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Toolbar: Tabs, Search, Stats & Actions */}
            <div className="p-4 sm:p-6 bg-slate-950/60 border-b border-slate-800 space-y-4 shrink-0">
              
              {/* Stat Counters & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-400">Bookings:</span>
                    <strong className="text-white font-mono">{bookings.length}</strong>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400">Quotes:</span>
                    <strong className="text-white font-mono">{quotes.length}</strong>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-400">Messages:</span>
                    <strong className="text-white font-mono">{contacts.length}</strong>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-400">Applicants:</span>
                    <strong className="text-white font-mono">{careers.length}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadDashboardData}
                    disabled={isLoading}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 text-xs flex items-center gap-1.5"
                    title="Refresh Data from Supabase"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 text-xs flex items-center gap-1.5"
                    title="Export current tab data to CSV spreadsheet"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => { setActiveTab('bookings'); setSelectedRecord(null); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === 'bookings'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Site Bookings ({bookings.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('quotes'); setSelectedRecord(null); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === 'quotes'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Quote Requests ({quotes.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('contacts'); setSelectedRecord(null); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === 'contacts'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contact Inquiries ({contacts.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('careers'); setSelectedRecord(null); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === 'careers'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Job Applications ({careers.length})</span>
                  </button>

                  <button
                    onClick={() => { setActiveTab('account'); setSelectedRecord(null); }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === 'account'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Admin Security</span>
                  </button>
                </div>

                {/* Search & Status Filter (if not in Account tab) */}
                {activeTab !== 'account' && (
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${activeTab} by name, phone, ref...`}
                        className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
                        >
                          ×
                        </button>
                      )}
                    </div>

                    {activeTab === 'bookings' && (
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content View with Split Detail Drawer */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Table / List View */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">

                {/* ========================================================================= */}
                {/* TAB 1: SITE BOOKINGS & APPOINTMENTS */}
                {/* ========================================================================= */}
                {activeTab === 'bookings' && (
                  <>
                    {filteredBookings.length === 0 ? (
                      <div className="p-12 text-center text-slate-500 space-y-3 bg-slate-950/40 rounded-2xl border border-slate-800">
                        <Calendar className="w-10 h-10 mx-auto text-slate-600" />
                        <h4 className="text-base font-bold text-slate-400">No Bookings Found</h4>
                        <p className="text-xs max-w-sm mx-auto">
                          {searchQuery || statusFilter !== 'all' 
                            ? 'No appointments matched your search or status filter.' 
                            : 'Client appointment bookings made via the website will show up here.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {filteredBookings.map((b) => (
                          <div
                            key={b.referenceId}
                            onClick={() => setSelectedRecord({ type: 'booking', data: b })}
                            className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-amber-500/50 ${
                              selectedRecord?.data?.referenceId === b.referenceId
                                ? 'bg-slate-800/90 border-amber-500 ring-1 ring-amber-500/50'
                                : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/80'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                              
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono text-xs font-black text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                    {b.referenceId}
                                  </span>
                                  <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                                    {b.name}
                                  </h4>
                                  {b.companyName && (
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                      <Building2 className="w-3 h-3 text-slate-500" />
                                      {b.companyName}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                                  <span className="flex items-center gap-1 text-slate-400">
                                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                    <strong className="text-white">{b.appointmentDate}</strong>
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-slate-400">
                                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                                    {b.timeSlot}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-slate-400">
                                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                                    {b.projectLocation}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-start sm:self-center">
                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                                  b.status === 'confirmed'
                                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                                    : b.status === 'completed'
                                    ? 'bg-blue-950/80 border-blue-600 text-blue-300'
                                    : b.status === 'cancelled'
                                    ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                                    : 'bg-amber-950/80 border-amber-600 text-amber-300'
                                }`}>
                                  {b.status}
                                </span>
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* ========================================================================= */}
                {/* TAB 2: QUOTE REQUESTS */}
                {/* ========================================================================= */}
                {activeTab === 'quotes' && (
                  <>
                    {filteredQuotes.length === 0 ? (
                      <div className="p-12 text-center text-slate-500 space-y-3 bg-slate-950/40 rounded-2xl border border-slate-800">
                        <FileText className="w-10 h-10 mx-auto text-slate-600" />
                        <h4 className="text-base font-bold text-slate-400">No Quotes Found</h4>
                        <p className="text-xs">Client quote requests submitted on the site will appear here.</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {filteredQuotes.map((q) => (
                          <div
                            key={q.referenceId}
                            onClick={() => setSelectedRecord({ type: 'quote', data: q })}
                            className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-blue-500/50 ${
                              selectedRecord?.data?.referenceId === q.referenceId
                                ? 'bg-slate-800/90 border-blue-500'
                                : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/80'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-black text-blue-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                    {q.referenceId}
                                  </span>
                                  <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">{q.name}</h4>
                                  {q.companyName && <span className="text-xs text-slate-400">({q.companyName})</span>}
                                </div>
                                <div className="text-xs text-slate-300 flex items-center gap-2 flex-wrap">
                                  <span className="text-amber-400 font-semibold">{q.serviceRequired}</span>
                                  <span>•</span>
                                  <span className="text-slate-400">{q.projectLocation}</span>
                                  <span>•</span>
                                  <span className="text-slate-400">{q.phone}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-600" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* ========================================================================= */}
                {/* TAB 3: CONTACT INQUIRIES */}
                {/* ========================================================================= */}
                {activeTab === 'contacts' && (
                  <>
                    {filteredContacts.length === 0 ? (
                      <div className="p-12 text-center text-slate-500 space-y-3 bg-slate-950/40 rounded-2xl border border-slate-800">
                        <MessageSquare className="w-10 h-10 mx-auto text-slate-600" />
                        <h4 className="text-base font-bold text-slate-400">No Contact Messages</h4>
                        <p className="text-xs">Direct inquiries from the contact form will be listed here.</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {filteredContacts.map((c) => (
                          <div
                            key={c.referenceId}
                            onClick={() => setSelectedRecord({ type: 'contact', data: c })}
                            className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-emerald-500/50 ${
                              selectedRecord?.data?.referenceId === c.referenceId
                                ? 'bg-slate-800/90 border-emerald-500'
                                : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/80'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-black text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                    {c.referenceId}
                                  </span>
                                  <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">{c.name}</h4>
                                </div>
                                <p className="text-xs text-slate-300 line-clamp-1">{c.message}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-600" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* ========================================================================= */}
                {/* TAB 4: CAREER CANDIDATES */}
                {/* ========================================================================= */}
                {activeTab === 'careers' && (
                  <>
                    {filteredCareers.length === 0 ? (
                      <div className="p-12 text-center text-slate-500 space-y-3 bg-slate-950/40 rounded-2xl border border-slate-800">
                        <Briefcase className="w-10 h-10 mx-auto text-slate-600" />
                        <h4 className="text-base font-bold text-slate-400">No Job Applicants</h4>
                        <p className="text-xs">Job and internship applications will appear here.</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {filteredCareers.map((car) => (
                          <div
                            key={car.referenceId}
                            onClick={() => setSelectedRecord({ type: 'career', data: car })}
                            className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-purple-500/50 ${
                              selectedRecord?.data?.referenceId === car.referenceId
                                ? 'bg-slate-800/90 border-purple-500'
                                : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/80'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-black text-purple-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                    {car.referenceId}
                                  </span>
                                  <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">{car.fullName}</h4>
                                  <span className="text-xs text-amber-400 font-semibold">• {car.positionAppliedFor}</span>
                                </div>
                                <div className="text-xs text-slate-400 flex items-center gap-3">
                                  <span>{car.phone}</span>
                                  <span>•</span>
                                  <span>{car.email}</span>
                                  <span>•</span>
                                  <span>Exp: {car.experienceYears || '0'} Years</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-600" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* ========================================================================= */}
                {/* TAB 5: ADMIN ACCOUNT & SECURITY SETTINGS */}
                {/* ========================================================================= */}
                {activeTab === 'account' && (
                  <div className="max-w-xl mx-auto space-y-6 py-4">
                    
                    {/* Admin Profile Details */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                            Master Admin Account Info
                          </h4>
                          <span className="text-xs text-emerald-400 font-mono">Single Slot Claimed &amp; Secured</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Admin Username</span>
                          <strong className="text-white font-mono text-sm">{adminProfile?.username || 'admin'}</strong>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Display Name</span>
                          <strong className="text-white text-sm">{adminProfile?.fullName || 'Master Administrator'}</strong>
                        </div>
                        <div className="col-span-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Registered Admin Email</span>
                          <strong className="text-amber-400 font-mono text-sm">{adminProfile?.email || 'boipara90@gmail.com'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Change Password Form */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                      <h4 className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                        <Key className="w-4 h-4 text-amber-400" />
                        <span>Update Admin Password</span>
                      </h4>

                      <form onSubmit={handlePasswordUpdate} className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            required
                            value={currPassword}
                            onChange={(e) => setCurrPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        {pwdUpdateMsg && (
                          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                            pwdUpdateMsg.type === 'success'
                              ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                              : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                          }`}>
                            {pwdUpdateMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            <span>{pwdUpdateMsg.text}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer border border-slate-700"
                        >
                          Save New Password
                        </button>
                      </form>
                    </div>

                  </div>
                )}

              </div>

              {/* Detail Drawer (Right Side on Wide Screens) */}
              {selectedRecord && (
                <div className="w-full max-w-sm md:max-w-md bg-slate-950 border-l border-slate-800 p-5 overflow-y-auto space-y-4 shrink-0 animate-in slide-in-from-right-4 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {selectedRecord.data.referenceId}
                      </span>
                      <span className="text-xs text-slate-400 capitalize">
                        {selectedRecord.type} Details
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedRecord(null)}
                      className="p-1 rounded-lg text-slate-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Detail Body based on Type */}
                  {selectedRecord.type === 'booking' && (
                    <div className="space-y-4 text-xs">
                      
                      {/* Client Info */}
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Client &amp; Contact</span>
                        <h3 className="text-base font-black text-white">{selectedRecord.data.name}</h3>
                        {selectedRecord.data.companyName && (
                          <p className="text-slate-300 font-medium">{selectedRecord.data.companyName}</p>
                        )}
                        <div className="pt-2 flex flex-col gap-1 text-slate-300">
                          <a href={`tel:${selectedRecord.data.phone}`} className="flex items-center gap-2 text-amber-400 hover:underline">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{selectedRecord.data.phone}</span>
                          </a>
                          <a href={`mailto:${selectedRecord.data.email}`} className="flex items-center gap-2 text-amber-400 hover:underline">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{selectedRecord.data.email}</span>
                          </a>
                        </div>
                      </div>

                      {/* Appointment Schedule & Type */}
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Schedule &amp; Site</span>
                        <div className="grid grid-cols-2 gap-2 text-slate-300">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Date:</span>
                            <strong className="text-white">{selectedRecord.data.appointmentDate}</strong>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Slot:</span>
                            <strong className="text-white">{selectedRecord.data.timeSlot}</strong>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-500 block text-[10px]">Type:</span>
                            <strong className="text-amber-400">{selectedRecord.data.appointmentType}</strong>
                          </div>
                          <div className="col-span-2">
                            <span className="text-slate-500 block text-[10px]">Location:</span>
                            <strong className="text-white">{selectedRecord.data.projectLocation}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Requirements / Notes */}
                      {selectedRecord.data.notes && (
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Requirements / Soil Scope</span>
                          <p className="text-slate-200 leading-relaxed">{selectedRecord.data.notes}</p>
                        </div>
                      )}

                      {/* Status Actions */}
                      <div className="space-y-2 pt-2">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Update Appointment Status</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleStatusChange(selectedRecord.data.referenceId, 'confirmed')}
                            disabled={updatingId === selectedRecord.data.referenceId}
                            className="py-2 px-3 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Confirm</span>
                          </button>

                          <button
                            onClick={() => handleStatusChange(selectedRecord.data.referenceId, 'completed')}
                            disabled={updatingId === selectedRecord.data.referenceId}
                            className="py-2 px-3 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-700 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Complete</span>
                          </button>

                          <button
                            onClick={() => handleStatusChange(selectedRecord.data.referenceId, 'pending')}
                            disabled={updatingId === selectedRecord.data.referenceId}
                            className="py-2 px-3 rounded-lg bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-700 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Set Pending</span>
                          </button>

                          <button
                            onClick={() => handleStatusChange(selectedRecord.data.referenceId, 'cancelled')}
                            disabled={updatingId === selectedRecord.data.referenceId}
                            className="py-2 px-3 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Detail Body: Quote */}
                  {selectedRecord.type === 'quote' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Client</span>
                        <h3 className="text-base font-black text-white">{selectedRecord.data.name}</h3>
                        {selectedRecord.data.companyName && <p className="text-slate-300">{selectedRecord.data.companyName}</p>}
                        <div className="text-slate-300 space-y-1 pt-1">
                          <p>Phone: <a href={`tel:${selectedRecord.data.phone}`} className="text-amber-400">{selectedRecord.data.phone}</a></p>
                          <p>Email: <a href={`mailto:${selectedRecord.data.email}`} className="text-amber-400">{selectedRecord.data.email}</a></p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Service &amp; Location</span>
                        <p className="text-amber-400 font-bold">{selectedRecord.data.serviceRequired}</p>
                        <p className="text-slate-300">Site: {selectedRecord.data.projectLocation}</p>
                        {selectedRecord.data.estimatedTimeline && <p className="text-slate-300">Timeline: {selectedRecord.data.estimatedTimeline}</p>}
                      </div>

                      {selectedRecord.data.message && (
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Client Notes</span>
                          <p className="text-slate-200">{selectedRecord.data.message}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Detail Body: Contact */}
                  {selectedRecord.type === 'contact' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Sender</span>
                        <h3 className="text-base font-black text-white">{selectedRecord.data.name}</h3>
                        {selectedRecord.data.companyName && <p className="text-slate-300">{selectedRecord.data.companyName}</p>}
                        <div className="text-slate-300 space-y-1 pt-1">
                          <p>Phone: <a href={`tel:${selectedRecord.data.phone}`} className="text-amber-400">{selectedRecord.data.phone}</a></p>
                          <p>Email: <a href={`mailto:${selectedRecord.data.email}`} className="text-amber-400">{selectedRecord.data.email}</a></p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Inquiry Message</span>
                        <p className="text-slate-200 leading-relaxed">{selectedRecord.data.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Detail Body: Career */}
                  {selectedRecord.type === 'career' && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Applicant</span>
                        <h3 className="text-base font-black text-white">{selectedRecord.data.fullName}</h3>
                        {selectedRecord.data.fatherName && <p className="text-slate-400">Father's Name: {selectedRecord.data.fatherName}</p>}
                        <div className="text-slate-300 space-y-1 pt-1">
                          <p>Phone: <a href={`tel:${selectedRecord.data.phone}`} className="text-amber-400">{selectedRecord.data.phone}</a></p>
                          <p>Email: <a href={`mailto:${selectedRecord.data.email}`} className="text-amber-400">{selectedRecord.data.email}</a></p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Applied Position</span>
                        <p className="text-amber-400 font-bold">{selectedRecord.data.positionAppliedFor}</p>
                        <p className="text-slate-300">Experience: {selectedRecord.data.experienceYears || '0'} Years</p>
                        <p className="text-slate-300">CV / Resume: <strong className="text-emerald-400">{selectedRecord.data.cvFileName}</strong></p>
                        {selectedRecord.data.address && <p className="text-slate-300 pt-1">Address: {selectedRecord.data.address}</p>}
                      </div>

                      {selectedRecord.data.coverLetter && (
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Cover Letter</span>
                          <p className="text-slate-200">{selectedRecord.data.coverLetter}</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
