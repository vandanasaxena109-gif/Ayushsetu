import React from 'react';
import { 
  Stethoscope, 
  ClipboardList, 
  UserCircle2, 
  ArrowRight, 
  Headphones, 
  CheckCircle2, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import { LanguageOption, PatientAuthData } from '../types';
import { getTranslation } from '../data/translations';

interface PatientHomeScreenProps {
  currentLanguage: LanguageOption;
  patientAuth: PatientAuthData;
  patientId: string;
  onStartVisit: () => void;
  onViewHistory: () => void;
  onViewProfile: () => void;
  onStaffHelp: () => void;
  onLogout: () => void;
}

export const PatientHomeScreen: React.FC<PatientHomeScreenProps> = ({
  currentLanguage,
  patientAuth,
  patientId,
  onStartVisit,
  onViewHistory,
  onViewProfile,
  onStaffHelp,
  onLogout,
}) => {
  const t = getTranslation(currentLanguage.id);
  const displayName = patientAuth.name || 'Riya Sharma';

  return (
    <main 
      id="patient-home-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Top Bar / Profile Quick Glance */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2 border-b border-[#bec8ca]/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#00535b] text-white flex items-center justify-center font-black text-xl shadow-md">
            {displayName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#141d1f]">
                {t.greeting}, {displayName} 👋
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#3e494a] mt-0.5">
              <span className="bg-[#ecf5f8] text-[#00535b] px-2.5 py-0.5 rounded-md font-mono font-extrabold">
                {patientId || 'AS-2026-001846'}
              </span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> ABHA Linked
              </span>
              {patientAuth.ayushmanCard && (
                <span className="text-[#236863] bg-[#a9ece5]/40 px-2 py-0.5 rounded-md">
                  Ayushman Verified
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          title="End Session"
          className="flex items-center gap-1.5 text-xs font-bold text-[#6f797a] hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors border border-[#bec8ca]/30 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.logoutBtn}</span>
        </button>
      </header>

      {/* Main Grid: 3 Large Cards */}
      <div className="w-full max-w-4xl mx-auto my-auto py-6 sm:py-8 space-y-6">
        <div className="text-left">
          <h2 className="text-2xl font-black text-[#141d1f]">
            How can AyushSetu assist you today?
          </h2>
          <p className="text-xs sm:text-sm text-[#3e494a]">
            Start a voice or touch health intake, or review your linked health records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Start New Health Visit */}
          <div className="bg-white border-2 border-[#00535b] p-6 sm:p-7 rounded-3xl shadow-[0px_8px_30px_rgba(0,109,119,0.12)] hover:shadow-[0px_12px_36px_rgba(0,109,119,0.18)] transition-all flex flex-col justify-between min-h-[260px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#a9ece5]/30 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-125 transition-transform"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#00535b] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div className="inline-block bg-[#a9ece5]/50 text-[#00535b] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                Voice • Touch • Scan
              </div>
              <h3 className="text-xl font-black text-[#141d1f] mb-1.5">
                🩺 {t.startNewIntake}
              </h3>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                {t.voiceIntakeSubtitle}
              </p>
            </div>

            <button
              id="btn-start-visit"
              onClick={onStartVisit}
              className="mt-6 w-full min-h-[48px] bg-[#00535b] hover:bg-[#006d77] text-white py-2.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <span>{t.startNewIntake} →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: My Health History */}
          <div className="bg-white border-2 border-[#bec8ca]/40 hover:border-[#236863] p-6 sm:p-7 rounded-3xl shadow-[0px_6px_24px_rgba(0,109,119,0.06)] hover:shadow-[0px_10px_32px_rgba(0,109,119,0.12)] transition-all flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#236863] text-white flex items-center justify-center mb-4 shadow-md">
                <ClipboardList className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-[#141d1f] mb-1.5">
                📋 {t.patientHistory}
              </h3>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                View your previous visits, past prescriptions, and scanned lab reports.
              </p>
            </div>

            <button
              id="btn-view-history"
              onClick={onViewHistory}
              className="mt-6 w-full min-h-[48px] bg-[#ecf5f8] hover:bg-[#a9ece5]/40 text-[#00535b] py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-[#00535b]/20 cursor-pointer"
            >
              <span>{t.patientHistory}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: My Profile */}
          <div className="bg-white border-2 border-[#bec8ca]/40 hover:border-[#236863] p-6 sm:p-7 rounded-3xl shadow-[0px_6px_24px_rgba(0,109,119,0.06)] hover:shadow-[0px_10px_32px_rgba(0,109,119,0.12)] transition-all flex flex-col justify-between min-h-[260px]">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#525e75] text-white flex items-center justify-center mb-4 shadow-md">
                <UserCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-[#141d1f] mb-1.5">
                👤 {t.profile}
              </h3>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                Personal information, ABHA and Ayushman Bharat details.
              </p>
            </div>

            <button
              id="btn-view-profile"
              onClick={onViewProfile}
              className="mt-6 w-full min-h-[48px] bg-[#ecf5f8] hover:bg-[#a9ece5]/40 text-[#00535b] py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-[#00535b]/20 cursor-pointer"
            >
              <span>{t.profile}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Need Help Button */}
      <footer className="w-full max-w-4xl mx-auto flex items-center justify-between pt-4 border-t border-[#bec8ca]/30 text-xs text-[#6f797a]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00535b]" />
          <span>AyushSetu • Persistent Longitudinal Health Record</span>
        </div>
        <button
          onClick={onStaffHelp}
          className="flex items-center gap-1.5 font-bold text-[#00535b] hover:bg-[#e6eff2] px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <Headphones className="w-4 h-4" />
          <span>{t.staffHelp} 👨‍⚕️</span>
        </button>
      </footer>
    </main>
  );
};
