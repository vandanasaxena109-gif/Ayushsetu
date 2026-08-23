import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Download, 
  Share2, 
  Sparkles,
  Info
} from 'lucide-react';
import { LanguageOption, PatientAuthData } from '../types';

interface PatientIdCardScreenProps {
  currentLanguage: LanguageOption;
  patientAuth: PatientAuthData;
  patientId: string;
  onContinue: () => void;
}

export const PatientIdCardScreen: React.FC<PatientIdCardScreenProps> = ({
  currentLanguage,
  patientAuth,
  patientId,
  onContinue,
}) => {
  const maskedPhone = patientAuth.phone 
    ? patientAuth.phone.replace(/(\+?\d{2}\s?\d{2})(\d{4})(\d{4})/, '$1 •••• $3')
    : '••••••4582';

  return (
    <main 
      id="patient-id-card-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Header */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00535b] text-white flex items-center justify-center font-black text-sm">
            आ
          </div>
          <span className="font-extrabold text-sm text-[#00535b]">AyushSetu Health Profile</span>
        </div>

        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Active Profile
        </span>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-xl mx-auto my-auto space-y-6 text-center">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#a9ece5]/40 text-[#00535b] px-3.5 py-1 rounded-full text-xs font-extrabold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Registration Complete</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#141d1f] tracking-tight">
            {currentLanguage.id === 'hi' ? 'आपकी स्वास्थ्य प्रोफ़ाइल तैयार है' : 'Your Health Profile is Ready'}
          </h1>
          <p className="text-xs sm:text-sm text-[#3e494a] mt-1 font-medium">
            {currentLanguage.id === 'hi'
              ? 'भविष्य के दौरों के लिए अपना आयुष सेतु पेशेंट आईडी सुरक्षित रखें।'
              : 'Keep your AyushSetu Patient ID for future hospital visits.'}
          </p>
        </div>

        {/* Large Identity Card */}
        <div className="bg-gradient-to-br from-[#00535b] via-[#006d77] to-[#236863] text-white rounded-3xl p-6 sm:p-8 shadow-[0px_16px_40px_rgba(0,109,119,0.25)] text-left relative overflow-hidden border border-teal-400/30">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#9ff0fb]/10 rounded-full mr-8 -mb-8 pointer-events-none"></div>

          <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
            <div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9ff0fb] font-extrabold mb-1">
                AYUSHSETU PATIENT IDENTITY
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-wider text-white font-mono">
                {patientId || 'AS-2026-001846'}
              </div>
            </div>
            <div className="bg-white p-2 rounded-2xl shadow-inner">
              <QrCode className="w-10 h-10 text-[#00535b]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm border-t border-white/15 pt-5 relative z-10">
            <div>
              <div className="text-[11px] text-[#9ff0fb]/80 font-medium">Patient Name</div>
              <div className="font-extrabold text-white text-base truncate">
                {patientAuth.name || 'Riya Sharma'}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#9ff0fb]/80 font-medium">Age / Sex</div>
              <div className="font-extrabold text-white text-base">
                {patientAuth.age || '42'}Y • {patientAuth.gender || 'Female'}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#9ff0fb]/80 font-medium">Registered Mobile</div>
              <div className="font-extrabold text-white">
                {maskedPhone}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#9ff0fb]/80 font-medium">ABHA Status</div>
              <div className="font-extrabold text-[#9ff0fb] flex items-center gap-1">
                {patientAuth.abhaId ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Linked ✓</span>
                  </>
                ) : (
                  <span className="text-white/70">Not Linked</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/80">
            <span>Ayushman Bharat: {patientAuth.ayushmanCard ? 'Linked ✓' : 'Not Linked'}</span>
            <span className="text-[10px] text-[#9ff0fb]">Valid Across Ayush OPDs</span>
          </div>
        </div>

        {/* Disclaimer / Guidance Note */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#bec8ca]/40 text-left text-xs text-[#3e494a] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#00535b] shrink-0 mt-0.5" />
          <p>
            <strong>Note:</strong> Your AyushSetu Patient ID is an application-level health identifier to recall your clinical case notes across hospital visits, seamlessly linked with ABHA.
          </p>
        </div>

        {/* Primary CTA */}
        <div>
          <button
            id="btn-id-card-continue"
            type="button"
            onClick={onContinue}
            className="w-full min-h-[50px] bg-[#00535b] hover:bg-[#006d77] text-white py-3 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>{currentLanguage.id === 'hi' ? 'स्वास्थ्य डैशबोर्ड पर जारी रखें' : 'Continue to Health Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <footer className="w-full max-w-xl mx-auto text-center pt-2">
        <p className="text-xs text-[#6f797a]">
          AyushSetu • National Digital Ayush Case-Taking Platform
        </p>
      </footer>
    </main>
  );
};
