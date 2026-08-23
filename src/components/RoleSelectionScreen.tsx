import React from 'react';
import { 
  User, 
  Stethoscope, 
  ArrowRight, 
  Shield, 
  Building2, 
  Sparkles,
  HeartHandshake,
  Globe2
} from 'lucide-react';
import { LanguageOption } from '../types';

interface RoleSelectionScreenProps {
  currentLanguage: LanguageOption;
  onSelectRole?: (role: 'patient' | 'doctor') => void;
  onSelectPatient?: () => void;
  onSelectDoctor?: () => void;
  onChangeLanguage?: () => void;
  onLanguageClick?: () => void;
  onStaffHelp?: () => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  currentLanguage,
  onSelectRole,
  onSelectPatient,
  onSelectDoctor,
  onChangeLanguage,
  onLanguageClick,
  onStaffHelp,
}) => {
  const handlePatientClick = () => {
    if (onSelectRole) onSelectRole('patient');
    if (onSelectPatient) onSelectPatient();
  };

  const handleDoctorClick = () => {
    if (onSelectRole) onSelectRole('doctor');
    if (onSelectDoctor) onSelectDoctor();
  };

  const handleLangClick = onLanguageClick || onChangeLanguage;
  return (
    <main 
      id="role-selection-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Top Bar with Language Indicator */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-black text-xl shadow-md">
            आ
          </div>
          <div>
            <div className="text-xl font-extrabold text-[#00535b] tracking-tight">AyushSetu</div>
            <div className="text-[10px] text-[#3e494a] font-semibold tracking-wider uppercase">आयुष सेतु • National Intake Platform</div>
          </div>
        </div>

        {handleLangClick && (
          <button
            onClick={handleLangClick}
            className="flex items-center gap-1.5 bg-white border border-[#bec8ca]/50 hover:border-[#00535b] text-[#00535b] px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>{currentLanguage.nativeName} ({currentLanguage.name})</span>
          </button>
        )}
      </header>

      {/* Main Center Content */}
      <div className="w-full max-w-4xl mx-auto my-auto py-6 sm:py-10 text-center">
        {/* Brand Tagline */}
        <div className="inline-flex items-center gap-2 bg-[#a9ece5]/40 text-[#00535b] px-4 py-1.5 rounded-full text-xs font-extrabold mb-4 border border-[#00535b]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#00535b]" />
          <span>National Ayush Digital Health Mission • ABDM Compliant</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141d1f] tracking-tight mb-3">
          Your health history, ready before you meet the doctor
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#3e494a] max-w-2xl mx-auto mb-8 sm:mb-12 font-medium">
          {currentLanguage.id === 'hi' 
            ? 'अपनी भाषा में बोलें। हम आपका स्वास्थ्य विवरण तैयार करते हैं। निर्णय आपके डॉक्टर का है।'
            : 'Speak in your language. We organize your health history. Your doctor decides.'}
        </p>

        {/* Question Heading */}
        <div className="text-left max-w-2xl mx-auto mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#141d1f]">
            Who are you?
          </h2>
          <p className="text-xs sm:text-sm text-[#6f797a]">
            Please select your portal to begin.
          </p>
        </div>

        {/* 2 Large Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-2xl mx-auto text-left">
          {/* Card 1: Patient */}
          <button
            id="role-btn-patient"
            onClick={handlePatientClick}
            className="group bg-white hover:bg-[#f8fdfe] border-2 border-[#00535b]/20 hover:border-[#00535b] p-6 sm:p-7 rounded-3xl shadow-[0px_6px_24px_rgba(0,109,119,0.06)] hover:shadow-[0px_10px_32px_rgba(0,109,119,0.15)] transition-all flex flex-col justify-between min-h-[220px] text-left relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#00535b]/20 active:scale-[0.99] cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a9ece5]/20 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#00535b] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <User className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#141d1f] mb-1.5 flex items-center gap-2">
                <span>🧑‍🦱 I am a Patient</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                Start or continue your health journey with voice, touch, or ABHA.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-[#bec8ca]/30 mt-4">
              <span className="text-sm font-extrabold text-[#00535b] group-hover:underline">
                Patient →
              </span>
              <div className="w-9 h-9 rounded-full bg-[#ecf5f8] text-[#00535b] flex items-center justify-center group-hover:bg-[#00535b] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Card 2: Doctor / Healthcare Staff */}
          <button
            id="role-btn-doctor"
            onClick={handleDoctorClick}
            className="group bg-white hover:bg-[#f8fdfe] border-2 border-[#00535b]/20 hover:border-[#00535b] p-6 sm:p-7 rounded-3xl shadow-[0px_6px_24px_rgba(0,109,119,0.06)] hover:shadow-[0px_10px_32px_rgba(0,109,119,0.15)] transition-all flex flex-col justify-between min-h-[220px] text-left relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#00535b]/20 active:scale-[0.99] cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#236863]/10 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform"></div>
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#236863] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#141d1f] mb-1.5 flex items-center gap-2">
                <span>👨‍⚕️ I am a Doctor / Staff</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                Access patient records, clinical summaries, and triage queue.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-[#bec8ca]/30 mt-4">
              <span className="text-sm font-extrabold text-[#236863] group-hover:underline">
                Doctor Login →
              </span>
              <div className="w-9 h-9 rounded-full bg-[#ecf5f8] text-[#236863] flex items-center justify-center group-hover:bg-[#236863] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Hospital Footer */}
      <footer className="w-full max-w-5xl mx-auto pt-6 border-t border-[#bec8ca]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#6f797a]">
        <div className="flex items-center gap-2 font-medium">
          <Building2 className="w-4 h-4 text-[#00535b]" />
          <span>For hospital use • Inclusive Multilingual Clinical Kiosk</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-[#236863] font-bold">
            <Shield className="w-3.5 h-3.5" /> ABDM / ABHA Ready
          </span>
          <span>•</span>
          <span>Ayurveda & Modern OPD</span>
        </div>
      </footer>
    </main>
  );
};
