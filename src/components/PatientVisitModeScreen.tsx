import React from 'react';
import { 
  Mic, 
  Hand, 
  Headphones, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles
} from 'lucide-react';
import { LanguageOption } from '../types';
import { getTranslation } from '../data/translations';

interface PatientVisitModeScreenProps {
  currentLanguage: LanguageOption;
  onSelectMode: (mode: 'voice' | 'touch' | 'staff') => void;
  onBack: () => void;
}

export const PatientVisitModeScreen: React.FC<PatientVisitModeScreenProps> = ({
  currentLanguage,
  onSelectMode,
  onBack,
}) => {
  const t = getTranslation(currentLanguage.id);

  return (
    <main 
      id="patient-visit-mode-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        <span className="text-xs font-extrabold text-[#00535b] bg-[#a9ece5]/40 px-3 py-1 rounded-full">
          Intake Method
        </span>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto my-auto py-6 text-center space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#00535b]/10 text-[#00535b] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inclusive Multilingual Case-Taking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#141d1f] tracking-tight">
            {t.voiceIntakeTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#3e494a] max-w-xl mx-auto mt-2 font-medium">
            {t.voiceIntakeSubtitle}
          </p>
        </div>

        {/* 3 Interaction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {/* Card 1: Speak */}
          <button
            id="mode-btn-speak"
            onClick={() => onSelectMode('voice')}
            className="group bg-white hover:bg-[#f8fdfe] border-2 border-[#00535b] p-6 sm:p-7 rounded-3xl shadow-[0px_8px_28px_rgba(0,109,119,0.12)] hover:shadow-[0px_12px_36px_rgba(0,109,119,0.2)] transition-all flex flex-col justify-between min-h-[240px] text-left relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#00535b]/20 active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#a9ece5]/40 rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-125 transition-transform"></div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#00535b] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Mic className="w-7 h-7" />
              </div>
              <div className="bg-[#a9ece5]/60 text-[#00535b] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                Recommended • {t.speakPrompt}
              </div>
              <h2 className="text-xl font-black text-[#141d1f] mb-1">
                🎙️ {t.speakPrompt}
              </h2>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                {t.voiceIntakeSubtitle}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#bec8ca]/30 mt-4">
              <span className="text-xs sm:text-sm font-extrabold text-[#00535b]">
                {t.tapToSpeak} →
              </span>
              <div className="w-8 h-8 rounded-full bg-[#ecf5f8] text-[#00535b] flex items-center justify-center group-hover:bg-[#00535b] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Card 2: Tap Answers */}
          <button
            id="mode-btn-tap"
            onClick={() => onSelectMode('touch')}
            className="group bg-white hover:bg-[#f8fdfe] border-2 border-[#bec8ca]/40 hover:border-[#00535b] p-6 sm:p-7 rounded-3xl shadow-[0px_6px_24px_rgba(0,109,119,0.06)] hover:shadow-[0px_10px_32px_rgba(0,109,119,0.14)] transition-all flex flex-col justify-between min-h-[240px] text-left relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#00535b]/20 active:scale-[0.98] cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#236863] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Hand className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-[#141d1f] mb-1">
                👆 {t.symptomsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                {t.symptomsSubtitle}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#bec8ca]/30 mt-4">
              <span className="text-xs sm:text-sm font-extrabold text-[#236863]">
                {t.continueBtn} →
              </span>
              <div className="w-8 h-8 rounded-full bg-[#ecf5f8] text-[#236863] flex items-center justify-center group-hover:bg-[#236863] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Card 3: Staff Assisted */}
          <button
            id="mode-btn-staff"
            onClick={() => onSelectMode('staff')}
            className="group bg-white hover:bg-[#f8fdfe] border-2 border-[#bec8ca]/40 hover:border-[#00535b] p-6 sm:p-7 rounded-3xl shadow-[0px_6px_24px_rgba(0,109,119,0.06)] hover:shadow-[0px_10px_32px_rgba(0,109,119,0.14)] transition-all flex flex-col justify-between min-h-[240px] text-left relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#00535b]/20 active:scale-[0.98] cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#525e75] text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Headphones className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-[#141d1f] mb-1">
                👨‍⚕️ {t.staffHelp}
              </h2>
              <p className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                Get assistance directly from hospital reception staff
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#bec8ca]/30 mt-4">
              <span className="text-xs sm:text-sm font-extrabold text-[#525e75]">
                {t.staffHelp} →
              </span>
              <div className="w-8 h-8 rounded-full bg-[#ecf5f8] text-[#525e75] flex items-center justify-center group-hover:bg-[#525e75] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center pt-2 text-xs text-[#6f797a]">
        AyushSetu • Voice-first accessibility with real-time speech translation across 12 Indian languages
      </footer>
    </main>
  );
};
