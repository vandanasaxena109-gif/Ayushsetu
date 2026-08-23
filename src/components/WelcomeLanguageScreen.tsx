import React from 'react';
import { LanguageOption, LanguageId } from '../types';
import { ArrowRight, Headphones, Check } from 'lucide-react';

interface WelcomeLanguageScreenProps {
  languages: LanguageOption[];
  selectedLanguage: LanguageId;
  onSelectLanguage: (lang: LanguageId) => void;
  onContinue: () => void;
  onStaffAssistance: () => void;
}

export const WelcomeLanguageScreen: React.FC<WelcomeLanguageScreenProps> = ({
  languages,
  selectedLanguage,
  onSelectLanguage,
  onContinue,
  onStaffAssistance,
}) => {
  return (
    <main 
      id="welcome-language-screen"
      className="flex-grow flex flex-col items-center justify-center py-4 sm:py-8 md:py-12 pb-24 sm:pb-8 px-3 sm:px-6 md:px-8 w-full max-w-[1200px] mx-auto min-h-screen"
    >
      {/* Header Section */}
      <header className="text-center w-full max-w-3xl mb-4 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00535b] tracking-tight mb-1 sm:mb-2">
          AyushSetu
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-[#3e494a] font-normal px-2">
          Your health history, ready before you meet the doctor.
        </p>
      </header>

      {/* Main Card */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl items-center bg-white rounded-2xl shadow-[0px_4px_20px_rgba(0,109,119,0.06)] border border-[#bec8ca]/30 p-4 sm:p-6 md:p-8">
        {/* Illustration Column */}
        <div className="w-full md:w-1/2 flex items-center justify-center h-44 sm:h-56 md:h-[440px] rounded-xl overflow-hidden bg-[#ecf5f8] shadow-[0px_4px_12px_rgba(0,109,119,0.08)] relative">
          <img
            id="welcome-illustration-image"
            alt="Patient and Doctor Interaction"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFwN6qpWbGoRBbsnZCKS1AE_vqFKeUcVtj5Pf09pYIw1OIaWPKiB9evIJgvi4GnAHvImRGa1A0prv6lz_8KT-hU-UYMk6SSp1FvVTuoNP0pYFl2Jxbw7lXsnjI98QQN4m9N86aLFutDmd3zG489ImHW4uyWJrMjTRqA1Q-zwNG4DLjRCrsBiIwGFjLWKtiltCZEiY8owSvxHi4N2MeJWASvXZxTeuVM1Yp1Ql-rQuk5CH7R-8cqW70"
          />
          {/* Subtle overlay badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-[#bec8ca]/40 flex items-center gap-1.5 shadow-sm text-[11px] sm:text-xs font-semibold text-[#00535b]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Ayurveda Pre-Intake Kiosk
          </div>
        </div>

        {/* Language Selection Column */}
        <div className="w-full md:w-1/2 flex flex-col h-full justify-between mt-2 md:mt-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#141d1f] mb-3 sm:mb-4 flex items-center justify-between">
              <span>Select Language</span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#00535b] bg-[#e6eff2] px-2.5 py-1 rounded-full">
                12 Indian Languages
              </span>
            </h2>

            {/* Bento Grid for Languages */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 max-h-[260px] sm:max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              {languages.map((lang) => {
                const isSelected = selectedLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    id={`lang-btn-${lang.id}`}
                    onClick={() => onSelectLanguage(lang.id)}
                    className={`rounded-xl p-2.5 sm:p-3.5 flex flex-col items-center justify-center transition-all h-[72px] sm:h-20 text-center relative border focus:outline-none focus:ring-2 focus:ring-[#00535b] focus:ring-offset-2 ${
                      isSelected
                        ? 'bg-[#006d77] text-white border-[#00535b] shadow-[0px_4px_12px_rgba(0,109,119,0.2)] font-semibold'
                        : 'bg-[#e6eff2] text-[#141d1f] border-[#bec8ca]/40 hover:bg-[#a9ece5]/30 hover:border-[#236863] hover:text-[#236863]'
                    }`}
                  >
                    <span className="text-base sm:text-lg font-medium tracking-wide">
                      {lang.nativeName}
                    </span>
                    {lang.id !== 'en' && (
                      <span className={`text-[11px] sm:text-xs mt-0.5 ${isSelected ? 'text-[#9becf7]' : 'text-[#3e494a]'}`}>
                        {lang.name}
                      </span>
                    )}
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions & Footer */}
          <div className="mt-4 sm:mt-6 flex flex-col gap-2.5 sm:gap-3">
            <button
              id="welcome-continue-btn"
              onClick={onContinue}
              className="w-full bg-[#00535b] hover:bg-[#006d77] text-white h-12 sm:h-14 rounded-xl text-base sm:text-lg font-semibold shadow-[0px_4px_12px_rgba(0,109,119,0.15)] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00535b] focus:ring-offset-2 active:scale-[0.99]"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="welcome-staff-btn"
              onClick={onStaffAssistance}
              className="w-full bg-[#f2fbfe] text-[#00535b] border-2 border-[#00535b] h-12 sm:h-14 rounded-xl text-base sm:text-lg font-semibold hover:bg-[#a9ece5]/20 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00535b] focus:ring-offset-2"
            >
              <Headphones className="w-5 h-5" />
              <span>Staff Assistance</span>
            </button>

            <p className="text-[11px] sm:text-xs text-[#3e494a] text-center mt-0.5 sm:mt-1">
              Select once. Your entire session will use this language.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
