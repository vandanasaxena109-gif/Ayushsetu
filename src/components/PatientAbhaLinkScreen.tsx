import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Info,
  Link2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { LanguageOption, PatientAuthData } from '../types';

interface PatientAbhaLinkScreenProps {
  currentLanguage: LanguageOption;
  patientAuth: PatientAuthData;
  onUpdatePatientAuth: (data: PatientAuthData) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const PatientAbhaLinkScreen: React.FC<PatientAbhaLinkScreenProps> = ({
  currentLanguage,
  patientAuth,
  onUpdatePatientAuth,
  onContinue,
  onBack,
}) => {
  const [abhaInput, setAbhaInput] = useState(patientAuth.abhaId || '91-4523-8890-1234');
  const [isAbhaLinked, setIsAbhaLinked] = useState(!!patientAuth.abhaId);
  const [ayushmanInput, setAyushmanInput] = useState(patientAuth.ayushmanCard || '');
  const [isAyushmanVerified, setIsAyushmanVerified] = useState(!!patientAuth.ayushmanCard);
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  const sampleAbhaList = [
    { label: 'Sample ABHA #1', value: '91-4523-8890-1234' },
    { label: 'Sample ABHA #2', value: '91-8890-1234-5678' },
  ];

  const handleLinkAbha = () => {
    if (abhaInput.trim()) {
      setIsAbhaLinked(true);
      onUpdatePatientAuth({
        ...patientAuth,
        abhaId: abhaInput.trim(),
      });
    }
  };

  const handleUnlinkAbha = () => {
    setIsAbhaLinked(false);
    setAbhaInput('');
    onUpdatePatientAuth({
      ...patientAuth,
      abhaId: '',
    });
  };

  const handleVerifyAyushman = () => {
    if (ayushmanInput.trim()) {
      setIsAyushmanVerified(true);
      onUpdatePatientAuth({
        ...patientAuth,
        ayushmanCard: ayushmanInput.trim(),
      });
    }
  };

  const handleUnlinkAyushman = () => {
    setIsAyushmanVerified(false);
    setAyushmanInput('');
    onUpdatePatientAuth({
      ...patientAuth,
      ayushmanCard: '',
    });
  };

  const handleProceed = () => {
    // Save current states
    onUpdatePatientAuth({
      ...patientAuth,
      abhaId: isAbhaLinked ? abhaInput.trim() : '',
      ayushmanCard: isAyushmanVerified ? ayushmanInput.trim() : '',
    });
    onContinue();
  };

  return (
    <main 
      id="patient-abha-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Header */}
      <header className="w-full max-w-2xl mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLanguage.id === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <span className="text-xs font-extrabold text-[#00535b] bg-[#a9ece5]/40 px-3 py-1 rounded-full">
          Step 2 of 4 • Link Existing ID
        </span>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-2xl mx-auto my-auto space-y-5">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#00535b]/10 text-[#00535b] px-3 py-0.5 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ABDM Integration • Link Existing ID Only</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#141d1f] tracking-tight">
            {currentLanguage.id === 'hi' ? 'मौजूदा ABHA / आयुष्मान कार्ड लिंक करें' : 'Link Existing ABHA / Ayushman Card'}
          </h1>
          <p className="text-xs sm:text-sm text-[#3e494a] mt-1 font-medium">
            {currentLanguage.id === 'hi'
              ? 'यदि आपके पास पहले से ABHA या आयुष्मान कार्ड है, तो उसे यहाँ लिंक करें।'
              : 'If you have an existing government ABHA or Ayushman Bharat Card, link it here.'}
          </p>
        </div>

        {/* Notice Info Pill */}
        {showInfoBanner && (
          <div className="bg-[#f0f9fa] border border-[#00535b]/20 rounded-2xl p-3.5 text-xs text-[#00535b] flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#00535b] shrink-0 mt-0.5" />
              <p>
                <strong>Important:</strong> Card creation is managed by the National Health Authority (NHA). AyushSetu only links your existing credentials or allows you to proceed directly with your AyushSetu Digital ID.
              </p>
            </div>
            <button 
              onClick={() => setShowInfoBanner(false)}
              className="text-[#6f797a] hover:text-[#141d1f] text-xs font-bold p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Primary Card: ABHA Linking */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0px_6px_24px_rgba(0,109,119,0.06)] border-2 border-[#00535b]/20 relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#00535b] text-white flex items-center justify-center font-black text-lg shadow-sm">
                🪪
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#141d1f] flex items-center gap-2">
                  <span>Link Existing ABHA</span>
                  {isAbhaLinked ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Linked
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Not Linked
                    </span>
                  )}
                </h2>
                <p className="text-xs text-[#3e494a]">
                  {currentLanguage.id === 'hi'
                    ? '14 अंकों का ABHA नंबर दर्ज करके लिंक करें।'
                    : 'Enter your 14-digit ABHA number to link your health history.'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="input-abha-number"
                type="text"
                value={abhaInput}
                onChange={(e) => {
                  setAbhaInput(e.target.value);
                  setIsAbhaLinked(false);
                }}
                placeholder="Enter 14-digit ABHA (e.g. 91-4523-8890-1234)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#bec8ca]/60 bg-[#fbfdfd] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00535b]/20"
              />
              {isAbhaLinked ? (
                <button
                  id="btn-unlink-abha"
                  type="button"
                  onClick={handleUnlinkAbha}
                  className="bg-gray-100 hover:bg-gray-200 text-[#3e494a] px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Unlink</span>
                </button>
              ) : (
                <button
                  id="btn-link-abha"
                  type="button"
                  onClick={handleLinkAbha}
                  className="bg-[#00535b] hover:bg-[#006d77] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Link2 className="w-4 h-4" />
                  <span>Link ABHA</span>
                </button>
              )}
            </div>

            {/* Quick Demo Fill Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-[#6f797a] font-medium">Quick test presets:</span>
              {sampleAbhaList.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setAbhaInput(item.value);
                    setIsAbhaLinked(true);
                    onUpdatePatientAuth({
                      ...patientAuth,
                      abhaId: item.value,
                    });
                  }}
                  className="text-[11px] bg-[#ecf5f8] hover:bg-[#d8ebf0] text-[#00535b] font-bold px-2.5 py-1 rounded-lg border border-[#bec8ca]/40 transition-colors cursor-pointer"
                >
                  {item.value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Card: Ayushman Bharat PM-JAY Card Linking */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0px_6px_24px_rgba(0,109,119,0.06)] border border-[#bec8ca]/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#ecf5f8] text-[#00535b] flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#141d1f] flex items-center gap-2">
                <span>Link Ayushman Bharat PM-JAY Card (Optional)</span>
                {isAyushmanVerified ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Linked
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Optional
                  </span>
                )}
              </h2>
              <p className="text-xs text-[#3e494a]">
                {currentLanguage.id === 'hi'
                  ? 'यदि आपके पास आयुष्मान कार्ड संख्या है तो उसे यहाँ लिंक करें।'
                  : 'If you have an existing PM-JAY card ID, link it to verify coverage.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="input-ayushman-card"
                type="text"
                value={ayushmanInput}
                onChange={(e) => {
                  setAyushmanInput(e.target.value);
                  setIsAyushmanVerified(false);
                }}
                placeholder="Enter PM-JAY Card ID (e.g. PMJAY-MH-449102)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#bec8ca]/60 bg-[#fbfdfd] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00535b]/20"
              />
              {isAyushmanVerified ? (
                <button
                  id="btn-unlink-ayushman"
                  type="button"
                  onClick={handleUnlinkAyushman}
                  className="bg-gray-100 hover:bg-gray-200 text-[#3e494a] px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Unlink</span>
                </button>
              ) : (
                <button
                  id="btn-verify-ayushman"
                  type="button"
                  onClick={handleVerifyAyushman}
                  className="bg-[#236863] hover:bg-[#1a4f4b] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Link2 className="w-4 h-4" />
                  <span>Link Card</span>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#6f797a] pt-1">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-[#00535b]" />
                <span>Not compulsory — you can skip if you don't have one</span>
              </span>
              {ayushmanInput && !isAyushmanVerified && (
                <button
                  type="button"
                  onClick={handleUnlinkAyushman}
                  className="text-red-600 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 space-y-2">
          <button
            id="btn-abha-continue"
            type="button"
            onClick={handleProceed}
            className="w-full min-h-[50px] bg-[#00535b] hover:bg-[#006d77] text-white py-3 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <span>{currentLanguage.id === 'hi' ? 'सत्यापन के साथ आगे बढ़ें' : 'Proceed to Mobile Verification'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                handleUnlinkAbha();
                handleUnlinkAyushman();
                onContinue();
              }}
              className="text-xs text-[#3e494a] hover:text-[#00535b] font-bold underline cursor-pointer py-1"
            >
              {currentLanguage.id === 'hi' ? 'कार्ड लिंक किए बिना जारी रखें' : 'Skip and continue without linking ABHA / Ayushman Card'}
            </button>
          </div>
        </div>
      </div>

      <footer className="w-full max-w-2xl mx-auto text-center pt-2">
        <p className="text-xs text-[#6f797a]">
          AyushSetu guarantees data privacy under Ayushman Bharat Digital Mission (ABDM) standards.
        </p>
      </footer>
    </main>
  );
};
