import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  PlusCircle, 
  Info,
  Sparkles,
  ExternalLink
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
  const [showAbhaModal, setShowAbhaModal] = useState(false);

  const handleLinkAbha = () => {
    setIsAbhaLinked(true);
    onUpdatePatientAuth({
      ...patientAuth,
      abhaId: abhaInput || '91-4523-8890-1234',
    });
  };

  const handleCreateMockAbha = () => {
    const generated = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAbhaInput(generated);
    setIsAbhaLinked(true);
    setShowAbhaModal(false);
    onUpdatePatientAuth({
      ...patientAuth,
      abhaId: generated,
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

  const handleSkipAyushman = () => {
    setIsAyushmanVerified(false);
    onUpdatePatientAuth({
      ...patientAuth,
      ayushmanCard: '',
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
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLanguage.id === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <span className="text-xs font-extrabold text-[#00535b] bg-[#a9ece5]/40 px-3 py-1 rounded-full">
          Step 2 of 4 • Health ID
        </span>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-2xl mx-auto my-auto space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#00535b]/10 text-[#00535b] px-3 py-0.5 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ABHA Integration • Ayushman Bharat Digital Mission</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#141d1f] tracking-tight">
            {currentLanguage.id === 'hi' ? 'अपना हेल्थ आईडी लिंक करें' : 'Link Your Health ID'}
          </h1>
          <p className="text-xs sm:text-sm text-[#3e494a] mt-1 font-medium">
            {currentLanguage.id === 'hi'
              ? 'भविष्य की देखभाल के लिए अपने स्वास्थ्य विवरण को व्यवस्थित रखने के लिए अपना ABHA कनेक्ट करें।'
              : 'Connect your ABHA to keep your health information organized for future care.'}
          </p>
        </div>

        {/* Primary Card: ABHA */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0px_6px_24px_rgba(0,109,119,0.06)] border-2 border-[#00535b]/20 relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00535b] text-white flex items-center justify-center font-black text-xl shadow-sm">
                🪪
              </div>
              <div>
                <h2 className="text-lg font-black text-[#141d1f] flex items-center gap-2">
                  <span>ABHA (Ayushman Bharat Health Account)</span>
                  {isAbhaLinked && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Linked
                    </span>
                  )}
                </h2>
                <p className="text-xs text-[#3e494a]">
                  {currentLanguage.id === 'hi'
                    ? 'अपने मौजूदा ABHA को अपने आयुष सेतु प्रोफ़ाइल से लिंक करें।'
                    : 'Link your existing ABHA to your AyushSetu profile.'}
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
                placeholder="Enter 14-digit ABHA (e.g., 91-4523-8890-1234)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#bec8ca]/60 bg-[#fbfdfd] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00535b]/20"
              />
              <button
                id="btn-link-abha"
                type="button"
                onClick={handleLinkAbha}
                className="bg-[#00535b] hover:bg-[#006d77] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAbhaLinked ? 'Linked ✓' : 'Link ABHA'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#bec8ca]/20 text-xs">
              <span className="text-[#6f797a]">Don't have an ABHA?</span>
              <button
                type="button"
                onClick={() => setShowAbhaModal(true)}
                className="text-[#00535b] font-bold hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create ABHA</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Card: Ayushman Bharat Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0px_6px_24px_rgba(0,109,119,0.06)] border border-[#bec8ca]/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#ecf5f8] text-[#00535b] flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#141d1f] flex items-center gap-2">
                <span>Ayushman Bharat Card (Optional)</span>
                {isAyushmanVerified && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
              </h2>
              <p className="text-xs text-[#3e494a]">
                {currentLanguage.id === 'hi'
                  ? 'यदि आपके पास आयुष्मान भारत स्वास्थ्य कार्ड है, तो इसे अपनी प्रोफ़ाइल में जोड़ें।'
                  : 'If you have an Ayushman Bharat health card, add it to your profile.'}
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
                placeholder="Enter Ayushman Card Number (e.g. PMJAY-MH-449102)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#bec8ca]/60 bg-[#fbfdfd] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00535b]/20"
              />
              <button
                id="btn-verify-ayushman"
                type="button"
                onClick={handleVerifyAyushman}
                className="bg-[#236863] hover:bg-[#1a4f4b] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>{isAyushmanVerified ? 'Verified ✓' : 'Verify Card'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6f797a] pt-1">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#00535b]" />
                <span>Not compulsory for receiving hospital care</span>
              </span>
              <button
                type="button"
                onClick={handleSkipAyushman}
                className="text-[#6f797a] hover:text-[#141d1f] underline"
              >
                I don't have an Ayushman card
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Continue */}
        <div className="pt-2">
          <button
            id="btn-abha-continue"
            type="button"
            onClick={onContinue}
            className="w-full min-h-[50px] bg-[#00535b] hover:bg-[#006d77] text-white py-3 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>{currentLanguage.id === 'hi' ? 'मोबाइल सत्यापन के लिए आगे बढ़ें' : 'Proceed to Mobile Verification'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal for Create ABHA (Prototype flow) */}
      {showAbhaModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#bec8ca]/30 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-[#a9ece5]/40 text-[#00535b] flex items-center justify-center font-bold mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-[#141d1f] mb-1">
              Create New ABHA
            </h2>
            <p className="text-xs text-[#3e494a] mb-4">
              Connect via Aadhaar / Mobile OTP to generate a 14-digit Ayushman Bharat Health Account.
            </p>
            <div className="bg-[#f2fbfe] p-3 rounded-xl border border-[#bec8ca]/40 text-xs text-[#00535b] font-medium mb-4">
              💡 <strong>Prototype Notice:</strong> Simulating ABHA instant Aadhaar verification for {patientAuth.name || 'Patient'}.
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAbhaModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#bec8ca] text-xs font-bold text-[#3e494a] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateMockAbha}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#00535b] text-white text-xs font-bold hover:bg-[#006d77]"
              >
                Generate & Link
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full max-w-2xl mx-auto text-center pt-2">
        <p className="text-xs text-[#6f797a]">
          AyushSetu guarantees data privacy under Ayushman Bharat Digital Mission (ABDM) standards.
        </p>
      </footer>
    </main>
  );
};
