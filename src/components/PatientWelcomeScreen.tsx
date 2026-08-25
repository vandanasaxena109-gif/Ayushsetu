import React from 'react';
import { 
  UserPlus, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft, 
  Headphones, 
  ShieldCheck, 
} from 'lucide-react';
import { LanguageOption, LanguageId } from '../types';
import { LANGUAGES } from '../data/mockData';
import { getTranslation } from '../data/translations';

interface PatientWelcomeScreenProps {
  currentLanguage: LanguageOption;
  languages?: LanguageOption[];
  onSelectLanguage?: (lang: LanguageId) => void;
  onNewPatient?: () => void;
  onSelectNewPatient?: () => void;
  onReturningPatient?: () => void;
  onSelectReturningPatient?: () => void;
  onBackToRole: () => void;
  onStaffHelp: () => void;
}

export const PatientWelcomeScreen: React.FC<PatientWelcomeScreenProps> = ({
  currentLanguage,
  languages = LANGUAGES,
  onSelectLanguage,
  onNewPatient,
  onSelectNewPatient,
  onReturningPatient,
  onSelectReturningPatient,
  onBackToRole,
  onStaffHelp,
}) => {
  const t = getTranslation(currentLanguage.id);

  const handleNewClick = () => {
    if (onSelectNewPatient) onSelectNewPatient();
    else if (onNewPatient) onNewPatient();
  };

  const handleReturningClick = () => {
    if (onSelectReturningPatient) onSelectReturningPatient();
    else if (onReturningPatient) onReturningPatient();
  };

  return (
    <main 
      id="patient-welcome-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Header Bar */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBackToRole}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        {onSelectLanguage && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#3e494a] hidden sm:inline">{t.selectLanguage}:</span>
            <select
              value={currentLanguage.id}
              onChange={(e) => onSelectLanguage(e.target.value as LanguageId)}
              className="bg-white border border-[#bec8ca]/50 text-[#00535b] font-bold text-xs sm:text-sm rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-[#00535b] cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className="w-full max-w-3xl mx-auto my-auto py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#a9ece5]/40 text-[#00535b] px-3.5 py-1 rounded-full text-xs font-extrabold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.kioskBadge}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#141d1f] tracking-tight mb-2">
          {t.appName}
        </h1>
        <p className="text-sm sm:text-base text-[#3e494a] max-w-xl mx-auto mb-8 font-medium">
          {t.tagline}
        </p>

        {/* 2 Large Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-left">
          {/* Card 1: New Patient */}
          <div className="bg-white border-2 border-[#00535b]/20 hover:border-[#00535b] p-6 sm:p-7 rounded-3xl shadow-[0px_6px_24px_rgba(0,109,119,0.06)] hover:shadow-[0px_10px_32px_rgba(0,109,119,0.15)] transition-all flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00535b] text-white flex items-center justify-center mb-4 shadow-sm">
                <UserPlus className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#141d1f] mb-1">
                {t.newPatient}
              </h2>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                {t.newPatientDesc}
              </p>
            </div>

            <button
              id="btn-create-profile"
              onClick={handleNewClick}
              className="mt-6 w-full min-h-[48px] bg-[#00535b] hover:bg-[#006d77] text-white py-2.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <span>{t.createProfile}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Returning Patient */}
          <div className="bg-white border-2 border-[#236863]/20 hover:border-[#236863] p-6 sm:p-7 rounded-3xl shadow-[0px_6px_24px_rgba(0,109,119,0.06)] hover:shadow-[0px_10px_32px_rgba(0,109,119,0.15)] transition-all flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#236863] text-white flex items-center justify-center mb-4 shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#141d1f] mb-1">
                {t.returningPatient}
              </h2>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                {t.returningPatientDesc}
              </p>
            </div>

            <button
              id="btn-continue-abha"
              onClick={handleReturningClick}
              className="mt-6 w-full min-h-[48px] bg-[#236863] hover:bg-[#1a4f4b] text-white py-2.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <span>{t.continueWithAbha}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Staff Help */}
      <footer className="w-full max-w-3xl mx-auto flex items-center justify-center pt-4">
        <button
          onClick={onStaffHelp}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00535b] hover:bg-[#e6eff2] px-4 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <Headphones className="w-4 h-4 text-[#00535b]" />
          <span>{t.staffHelp} 👨‍⚕️</span>
        </button>
      </footer>
    </main>
  );
};
