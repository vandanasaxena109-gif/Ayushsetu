import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Mic, 
  ScanLine, 
  Activity, 
  Ticket, 
  Stethoscope, 
  FileText, 
  AlertTriangle, 
  Menu, 
  X, 
  Headphones,
  CheckCircle2,
  Sparkles,
  Wifi,
  WifiOff,
  User,
  CreditCard,
  Phone,
  Video,
  UserPlus,
  ArrowRight,
  LogOut,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ActiveScreen, LanguageId, LanguageOption, PatientData, UserRole } from '../types';

interface NavbarProps {
  activeScreen: ActiveScreen;
  userRole: UserRole;
  onChangeScreen: (screen: ActiveScreen) => void;
  onSwitchRole: (role: UserRole) => void;
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  onSelectLanguage: (lang: LanguageId) => void;
  onTriggerUrgentAlert: () => void;
  onOpenStaffHelp: () => void;
  activePatient?: PatientData;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  onEndSession?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  userRole,
  onChangeScreen,
  onSwitchRole,
  currentLanguage,
  languages,
  onSelectLanguage,
  onTriggerUrgentAlert,
  onOpenStaffHelp,
  activePatient,
  isOfflineMode,
  onToggleOfflineMode,
  onEndSession,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Screen title mappings for badge
  const screenTitleMap: Record<ActiveScreen, { title: string; category: string; badgeColor: string }> = {
    'role-selection': { title: 'Role Selection', category: 'Gateway', badgeColor: 'bg-[#a9ece5]/40 text-[#00535b] border-[#00535b]/20' },
    'patient-welcome': { title: 'Patient Onboarding', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-identity': { title: 'Patient Registration', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-abha': { title: 'ABHA & Health ID', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-otp': { title: 'Mobile OTP Verification', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-id-card': { title: 'AyushSetu Health ID Card', category: 'Patient Portal', badgeColor: 'bg-emerald-500/20 text-emerald-800 border-emerald-400/30' },
    'patient-home': { title: 'Patient Profile Dashboard', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-history': { title: 'Health History', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-profile-details': { title: 'Profile Details', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-language': { title: 'Language Selection', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-visit-mode': { title: 'Intake Method', category: 'Patient Portal', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'privacy-consent': { title: 'Privacy & Consent', category: 'Patient Kiosk', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'voice-intake': { title: 'Voice Pre-Intake', category: 'Patient Kiosk', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'document-scanner': { title: 'Document & Rx Scanner', category: 'Patient Kiosk', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'ayurvedic-assessment': { title: 'Ayurvedic Assessment', category: 'Patient Kiosk', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'patient-final-review': { title: 'Pre-Consult Dossier', category: 'Patient Kiosk', badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30' },
    'intake-completed': { title: 'Token Ticket & Summary', category: 'Patient Kiosk', badgeColor: 'bg-emerald-500/20 text-emerald-800 border-emerald-400/30' },
    'patient-consultation': { title: 'Consult with Doctor', category: 'Teleconsult OPD', badgeColor: 'bg-purple-500/20 text-purple-900 border-purple-400/30' },
    'doctor-login': { title: 'Doctor Portal Login', category: 'Clinical Portal', badgeColor: 'bg-amber-500/20 text-amber-900 border-amber-400/30' },
    'doctor-verify': { title: 'Doctor 2FA Verification', category: 'Clinical Portal', badgeColor: 'bg-amber-500/20 text-amber-900 border-amber-400/30' },
    'doctor-dashboard': { title: 'Doctor Triage Queue', category: 'Clinical Portal', badgeColor: 'bg-amber-500/20 text-amber-900 border-amber-400/30' },
    'doctor-summary': { title: 'Patient Clinical Dossier', category: 'Clinical Portal', badgeColor: 'bg-cyan-500/20 text-cyan-900 border-cyan-400/30' },
    'doctor-consultation': { title: 'Doctor Consultation Mode', category: 'Clinical Portal', badgeColor: 'bg-purple-500/20 text-purple-900 border-purple-400/30' },
    'urgent-alert': { title: 'Urgent Clinical Alert', category: 'Emergency', badgeColor: 'bg-red-500/20 text-red-900 border-red-400/30' },
    'staff-help-modal': { title: 'Staff Assistance', category: 'Support', badgeColor: 'bg-blue-500/20 text-blue-900 border-blue-400/30' },
  };

  const currentInfo = screenTitleMap[activeScreen] || {
    title: 'AyushSetu',
    category: 'Healthcare',
    badgeColor: 'bg-teal-500/20 text-[#00535b] border-teal-400/30',
  };

  const handleNavClick = (screen: ActiveScreen) => {
    onChangeScreen(screen);
    setDrawerOpen(false);
  };

  return (
    <>
      <nav 
        id="main-app-navbar"
        aria-label="Main Navigation"
        className="fixed top-0 left-0 right-0 z-40 bg-[#00535b] text-white shadow-md border-b border-teal-600/30"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Left: Brand Logo & Screen Status */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Button */}
            <button
              id="hamburger-menu-btn"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#9ff0fb]"
              title="Open Navigation Menu"
            >
              {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <button
              onClick={() => onChangeScreen('role-selection')}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-white text-[#00535b] flex items-center justify-center font-black text-base shadow-xs group-hover:scale-105 transition-transform">
                आ
              </div>
              <div className="hidden sm:block">
                <div className="text-base font-extrabold tracking-tight text-white leading-none">
                  AyushSetu
                </div>
                <div className="text-[9px] text-[#9ff0fb] font-semibold uppercase tracking-wider">
                  आयुष सेतु • Digital Health Platform
                </div>
              </div>
            </button>

            {/* Current Active Screen Badge */}
            <div className="hidden md:flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-xs border border-white/15">
              <span className="text-[10px] uppercase font-bold text-[#9ff0fb]">{currentInfo.category}:</span>
              <span className="font-extrabold text-white truncate max-w-[180px]">{currentInfo.title}</span>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Offline Mode Indicator / Toggle */}
            <button
              id="offline-mode-toggle"
              onClick={onToggleOfflineMode}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                isOfflineMode
                  ? 'bg-amber-400/20 text-amber-200 border-amber-300/40'
                  : 'bg-white/10 text-emerald-300 border-emerald-400/30 hover:bg-white/15'
              }`}
              title={isOfflineMode ? 'Operating Offline (Sync Pending)' : 'Cloud Synchronized'}
            >
              {isOfflineMode ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">🟡 Offline Mode</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">🟢 Connected</span>
                </>
              )}
            </button>

            {/* Urgent Red-Flag Test Trigger */}
            <button
              id="nav-btn-urgent-alert"
              onClick={onTriggerUrgentAlert}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/40 px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
              title="Simulate Immediate Red Flag Alert"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-300" />
              <span className="hidden md:inline">Red Flag Alert</span>
            </button>

            {/* Staff Assistance Button */}
            <button
              id="nav-btn-staff-help"
              onClick={onOpenStaffHelp}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
            >
              <Headphones className="w-3.5 h-3.5 text-[#9ff0fb]" />
              <span className="hidden sm:inline">Need Help? 👨‍⚕️</span>
            </button>

            {/* Language Quick Dropdown */}
            <div className="relative">
              <button
                id="nav-lang-picker"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="bg-white text-[#00535b] font-bold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 hover:bg-[#a9ece5] transition-all shadow-xs"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLanguage.nativeName}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-[#141d1f] rounded-2xl shadow-2xl border border-[#bec8ca]/40 py-2 z-50 animate-in fade-in">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#6f797a] border-b border-gray-100">
                    Select Language (12 Indian Langs)
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {languages.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          onSelectLanguage(l.id);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-bold flex items-center justify-between hover:bg-[#ecf5f8] ${
                          currentLanguage.id === l.id ? 'text-[#00535b] bg-[#e6eff2]' : 'text-[#3e494a]'
                        }`}
                      >
                        <span>{l.nativeName} ({l.name})</span>
                        {currentLanguage.id === l.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#00535b]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hamburger Slide-Out Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-[#141d1f] text-white shadow-2xl z-10 flex flex-col h-full overflow-y-auto border-r border-white/10">
            {/* Drawer Header */}
            <div className="p-5 bg-[#1e292b] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-black text-lg">
                  आ
                </div>
                <div>
                  <h2 className="text-base font-black text-white">AyushSetu Navigator</h2>
                  <p className="text-[10px] text-[#9ff0fb] font-semibold">Ayush Case-Taking Platform</p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Role Switcher in Drawer */}
            <div className="p-4 bg-[#141d1f] border-b border-white/10">
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-[#9aa8ab] mb-2">
                Active Portal View
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onSwitchRole('patient');
                    onChangeScreen('patient-welcome');
                    setDrawerOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    userRole === 'patient'
                      ? 'bg-[#00535b] text-white border border-teal-400/40 shadow-sm'
                      : 'bg-[#1e292b] text-[#9aa8ab] hover:bg-white/5 border border-white/10'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Patient Flow</span>
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('doctor');
                    onChangeScreen('doctor-dashboard');
                    setDrawerOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    userRole === 'doctor'
                      ? 'bg-[#236863] text-white border border-teal-400/40 shadow-sm'
                      : 'bg-[#1e292b] text-[#9aa8ab] hover:bg-white/5 border border-white/10'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Doctor Flow</span>
                </button>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="p-4 space-y-5 flex-1 overflow-y-auto text-xs">
              {/* Role Selection Landing */}
              <div>
                <button
                  onClick={() => handleNavClick('role-selection')}
                  className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left font-bold flex items-center justify-between border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#9ff0fb]" />
                    <span>Role Selection Landing</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#9aa8ab]" />
                </button>
              </div>

              {/* Patient Flow Screens */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-extrabold tracking-wider text-[#9ff0fb] px-1">
                  Patient Intake Journey
                </div>

                {[
                  { id: 'patient-welcome' as ActiveScreen, label: '1. Welcome & Onboarding', icon: Sparkles },
                  { id: 'patient-identity' as ActiveScreen, label: '2. Identity & Demographics', icon: UserPlus },
                  { id: 'patient-abha' as ActiveScreen, label: '3. ABHA & Ayushman Link', icon: CreditCard },
                  { id: 'patient-otp' as ActiveScreen, label: '4. Mobile OTP Verification', icon: Phone },
                  { id: 'patient-id-card' as ActiveScreen, label: '5. AyushSetu ID Card', icon: ShieldCheck },
                  { id: 'patient-home' as ActiveScreen, label: '6. Patient Profile Dashboard', icon: User },
                  { id: 'patient-visit-mode' as ActiveScreen, label: '7. Interaction Selector', icon: Mic },
                  { id: 'privacy-consent' as ActiveScreen, label: '8. Privacy & Consent', icon: ShieldCheck },
                  { id: 'voice-intake' as ActiveScreen, label: '9. Voice Pre-Intake (Symptom Map)', icon: Mic },
                  { id: 'document-scanner' as ActiveScreen, label: '10. Document & Camera Scanner', icon: ScanLine },
                  { id: 'ayurvedic-assessment' as ActiveScreen, label: '11. Ayurvedic Pariksha', icon: Activity },
                  { id: 'patient-final-review' as ActiveScreen, label: '12. Pre-Consult Dossier Review', icon: FileText },
                  { id: 'intake-completed' as ActiveScreen, label: '13. Token Ticket & Summary', icon: Ticket },
                  { id: 'patient-consultation' as ActiveScreen, label: '14. Consult with Doctor (Live OPD)', icon: Video },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl font-medium flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#00535b] text-white font-bold border border-teal-400/40'
                          : 'text-[#9aa8ab] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <Icon className="w-3.5 h-3.5 text-[#9ff0fb]" />
                        <span className="truncate">{item.label}</span>
                      </span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#9ff0fb]" />}
                    </button>
                  );
                })}
              </div>

              {/* Doctor Flow Screens */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="text-[10px] uppercase font-extrabold tracking-wider text-amber-300 px-1">
                  Doctor Clinical Portal
                </div>

                {[
                  { id: 'doctor-login' as ActiveScreen, label: 'Doctor Login & SSO', icon: Stethoscope },
                  { id: 'doctor-dashboard' as ActiveScreen, label: 'Doctor Triage Queue', icon: Layers },
                  { id: 'doctor-summary' as ActiveScreen, label: '10-Second Patient Dossier', icon: FileText },
                  { id: 'doctor-consultation' as ActiveScreen, label: 'Doctor Consultation Room', icon: Video },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl font-medium flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#236863] text-white font-bold border border-teal-400/40'
                          : 'text-[#9aa8ab] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <Icon className="w-3.5 h-3.5 text-amber-300" />
                        <span className="truncate">{item.label}</span>
                      </span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#1e292b] border-t border-white/10 flex items-center justify-between text-xs">
              {onEndSession ? (
                <button
                  onClick={() => {
                    onEndSession();
                    setDrawerOpen(false);
                  }}
                  className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Reset & End Session</span>
                </button>
              ) : (
                <span className="text-[#9aa8ab]">AyushSetu v2026.1</span>
              )}
              <span className="text-[10px] text-[#9aa8ab]">ABDM Integrated</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
