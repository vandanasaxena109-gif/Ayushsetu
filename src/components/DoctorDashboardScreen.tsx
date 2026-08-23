import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  BarChart3, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  FileText,
  Filter,
  Stethoscope,
  Globe
} from 'lucide-react';
import { PatientData, LanguageOption, LanguageId } from '../types';

interface DoctorDashboardScreenProps {
  patients: PatientData[];
  onSelectPatient: (patient: PatientData) => void;
  onNewIntake: () => void;
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  onSelectLanguage: (lang: LanguageId) => void;
}

export const DoctorDashboardScreen: React.FC<DoctorDashboardScreenProps> = ({
  patients,
  onSelectPatient,
  onNewIntake,
  currentLanguage,
  languages,
  onSelectLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'reviewed' | 'analytics' | 'settings'>('queue');
  const [filterType, setFilterType] = useState<'all' | 'urgent' | 'normal'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showLangMenu, setShowLangMenu] = useState<boolean>(false);

  const waitingPatients = patients.filter((p) => p.status === 'waiting' || p.status === 'in-review');
  const reviewedPatients = patients.filter((p) => p.status === 'reviewed');

  const filteredPatients = waitingPatients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === 'urgent') return p.isUrgent;
    if (filterType === 'normal') return !p.isUrgent;
    return true;
  });

  return (
    <div id="doctor-dashboard-screen" className="min-h-screen bg-[#f2fbfe] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#bec8ca]/30 sticky top-0 z-40 shadow-xs">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1400px] mx-auto h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-bold text-xl shadow-sm">
              A
            </div>
            <span className="text-2xl font-bold text-[#00535b] tracking-tight">AyushSetu</span>
            <span className="text-xs bg-[#006d77] text-white font-bold px-2 py-0.5 rounded-full ml-1 uppercase">
              Doctor Portal
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Search */}
            <div className="hidden md:flex items-center bg-[#e6eff2] rounded-full px-4 py-2 w-72 border border-[#bec8ca]/30">
              <Search className="w-4 h-4 text-[#3e494a] mr-2" />
              <input
                type="text"
                placeholder="Search patient name or token..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm text-[#141d1f] placeholder-[#3e494a]/70 w-full"
              />
            </div>

            {/* Language Switch */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 hover:bg-[#a9ece5]/20 transition-colors px-3 py-1.5 rounded-lg border border-[#bec8ca]/30 text-[#00535b] font-semibold text-sm"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage.nativeName}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#bec8ca]/30 py-2 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        onSelectLanguage(l.id);
                        setShowLangMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#a9ece5]/20"
                    >
                      <span>{l.nativeName}</span>
                      <span className="text-xs text-[#3e494a]">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications with badge */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-[#00535b] hover:bg-[#e6eff2] rounded-full transition-colors relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#ba1a1a] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white">
                  1
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#bec8ca]/40 p-4 z-50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-[#141d1f]">Emergency Alerts</span>
                    <span className="text-xs text-[#ba1a1a] font-bold">1 Active</span>
                  </div>
                  <div className="p-3 bg-[#ffdad6]/40 border-l-4 border-[#ba1a1a] rounded-r-xl">
                    <p className="text-xs font-bold text-[#ba1a1a]">URGENT: Shri. Ramswaroop Sharma</p>
                    <p className="text-[11px] text-[#3e494a] mt-0.5">Chest radiation alert from Kiosk #3</p>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#00535b] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                DS
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-[#141d1f]">Dr. Sharma</div>
                <div className="text-[10px] text-[#236863]">Ayurveda Lead</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-grow flex flex-col md:flex-row w-full max-w-[1400px] mx-auto p-4 md:p-6 gap-6">
        {/* Left Side Navigation Sidebar */}
        <aside className="w-full md:w-64 flex flex-col gap-6 shrink-0">
          {/* Doctor Profile Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#bec8ca]/30 shadow-sm flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#006d77] text-white flex items-center justify-center font-bold text-lg">
              DS
            </div>
            <div>
              <h3 className="font-bold text-[#141d1f] text-base">Dr. Sharma</h3>
              <p className="text-xs text-[#3e494a]">Ayurvedic Specialist</p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Active on OPD</span>
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="bg-white rounded-2xl p-3 border border-[#bec8ca]/30 shadow-sm flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab('queue')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'queue'
                  ? 'bg-[#00535b] text-white shadow-sm'
                  : 'text-[#141d1f] hover:bg-[#e6eff2]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Waiting Queue</span>
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'queue' ? 'bg-white/20 text-white' : 'bg-[#e6eff2] text-[#00535b]'
              }`}>
                {waitingPatients.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reviewed')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'reviewed'
                  ? 'bg-[#00535b] text-white shadow-sm'
                  : 'text-[#141d1f] hover:bg-[#e6eff2]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Reviewed</span>
              </span>
              <span className="text-xs bg-[#e6eff2] text-[#3e494a] px-2 py-0.5 rounded-full font-bold">
                {reviewedPatients.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className="w-full flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold text-[#141d1f] hover:bg-[#e6eff2] transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-[#3e494a]" />
              <span>Triage Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className="w-full flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold text-[#141d1f] hover:bg-[#e6eff2] transition-colors"
            >
              <Settings className="w-4 h-4 text-[#3e494a]" />
              <span>OPD Settings</span>
            </button>
          </nav>

          {/* New Assessment CTA */}
          <button
            onClick={onNewIntake}
            className="w-full bg-[#006d77] hover:bg-[#00535b] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Launch Patient Kiosk</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#141d1f]">
                Waiting for Review
              </h1>
              <p className="text-sm text-[#3e494a]">
                You have {waitingPatients.length} patients waiting and {reviewedPatients.length} reviewed today.
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterType === 'all'
                    ? 'bg-[#00535b] text-white shadow-xs'
                    : 'bg-white text-[#3e494a] border border-[#bec8ca]/40 hover:bg-[#e6eff2]'
                }`}
              >
                All ({waitingPatients.length})
              </button>
              <button
                onClick={() => setFilterType('urgent')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filterType === 'urgent'
                    ? 'bg-[#ba1a1a] text-white shadow-xs'
                    : 'bg-white text-[#ba1a1a] border border-[#ffdad6] hover:bg-[#ffdad6]/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                Urgent ({waitingPatients.filter(p => p.isUrgent).length})
              </button>
              <button
                onClick={() => setFilterType('normal')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filterType === 'normal'
                    ? 'bg-[#00535b] text-white shadow-xs'
                    : 'bg-white text-[#3e494a] border border-[#bec8ca]/40 hover:bg-[#e6eff2]'
                }`}
              >
                Routine
              </button>
            </div>
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredPatients.map((patient) => {
              const isUrgent = patient.isUrgent;
              return (
                <div
                  key={patient.id}
                  id={`patient-card-${patient.id}`}
                  className={`bg-white rounded-2xl p-6 border transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                    isUrgent
                      ? 'border-2 border-[#ba1a1a]/50 shadow-[0px_4px_16px_rgba(186,26,26,0.08)] bg-[#fff8f6]'
                      : 'border-[#bec8ca]/40 shadow-xs'
                  }`}
                >
                  {/* Left Patient Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      {isUrgent ? (
                        <span className="bg-[#ffdad6] text-[#ba1a1a] text-xs font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> URGENT
                        </span>
                      ) : (
                        <span className="bg-[#ffdea9] text-[#634500] text-xs font-bold uppercase px-2.5 py-0.5 rounded-full">
                          Waiting
                        </span>
                      )}

                      <span className="text-xs font-bold text-[#00535b] bg-[#a9ece5]/40 px-2 py-0.5 rounded-full">
                        Token: {patient.tokenNumber}
                      </span>

                      <span className="text-xs text-[#3e494a] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Wait: {patient.waitTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#141d1f]">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-[#3e494a] font-medium mb-3">
                      {patient.age}Y • {patient.gender} • Language: {patient.language}
                    </p>

                    {/* Chief Complaint Box */}
                    <div className="bg-white/80 border border-[#bec8ca]/30 rounded-xl p-3 max-w-xl">
                      <span className="text-[11px] font-bold text-[#3e494a] uppercase tracking-wider block mb-0.5">
                        Chief Complaint
                      </span>
                      <p className="text-sm font-semibold text-[#141d1f]">
                        {patient.chiefComplaint}
                      </p>
                      {patient.liveTranscript && (
                        <p className="text-xs italic text-[#3e494a] mt-1 line-clamp-1">
                          "{patient.liveTranscript}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Action Area */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-end justify-center gap-3 shrink-0">
                    <button
                      id={`review-btn-${patient.id}`}
                      onClick={() => onSelectPatient(patient)}
                      className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 ${
                        isUrgent
                          ? 'bg-[#ba1a1a] hover:bg-[#93000a] text-white shadow-[0px_4px_12px_rgba(186,26,26,0.2)]'
                          : 'bg-[#00535b] hover:bg-[#006d77] text-white'
                      }`}
                    >
                      <span>Review Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[#3e494a]">
                      {patient.documents.length} Docs • Ayurvedic Intake
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredPatients.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#bec8ca]/30">
                <Users className="w-12 h-12 text-[#bec8ca] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#141d1f]">No patients matching filter</h3>
                <p className="text-xs text-[#3e494a] mt-1">Try switching filters or clearing your search.</p>
              </div>
            )}
          </div>

          {/* Recently Reviewed Patients Section */}
          <div className="mt-4">
            <h2 className="text-lg font-bold text-[#141d1f] mb-3">
              Recently Completed Consultations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviewedPatients.map((rp) => (
                <div 
                  key={rp.id}
                  className="bg-white rounded-2xl p-5 border border-[#bec8ca]/30 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#a9ece5]/40 text-[#00535b] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
                      </span>
                      <span className="text-xs font-semibold text-[#3e494a]">Token: {rp.tokenNumber}</span>
                    </div>
                    <h4 className="font-bold text-base text-[#141d1f]">{rp.name}</h4>
                    <p className="text-xs text-[#3e494a]">{rp.age}Y {rp.gender} • {rp.chiefComplaint}</p>
                  </div>
                  <button
                    onClick={() => onSelectPatient(rp)}
                    className="text-xs font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-2 rounded-lg border border-[#00535b]/30 transition-colors"
                  >
                    View Summary
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
