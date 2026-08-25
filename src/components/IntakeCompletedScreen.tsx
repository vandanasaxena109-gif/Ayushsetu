import React from 'react';
import { 
  CheckCircle, 
  QrCode, 
  Clock, 
  Stethoscope, 
  FileCheck, 
  LogOut,
  Video,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { PatientData, LanguageOption } from '../types';
import { getTranslation } from '../data/translations';

interface IntakeCompletedScreenProps {
  patient: PatientData;
  currentLanguage?: LanguageOption;
  onConsultDoctor: () => void;
  onViewDoctorPortal: () => void;
  onEndSession: () => void;
}

export const IntakeCompletedScreen: React.FC<IntakeCompletedScreenProps> = ({
  patient,
  currentLanguage,
  onConsultDoctor,
  onViewDoctorPortal,
  onEndSession,
}) => {
  const langId = currentLanguage?.id || 'en';
  const t = getTranslation(langId);

  return (
    <main 
      id="intake-completed-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 pb-28 sm:pb-12 text-center select-none"
    >
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0px_8px_32px_rgba(0,109,119,0.08)] border border-[#bec8ca]/30 flex flex-col items-center">
        {/* Animated Check Header */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#006d77] text-white flex items-center justify-center mb-4 sm:mb-6 shadow-md">
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
        </div>

        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#006d77] bg-[#a9ece5]/40 px-3 py-1 rounded-full mb-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Clinical Case Ready
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-[#141d1f] mb-1.5 sm:mb-2">
          {t.intakeCompleteTitle}
        </h1>
        <p className="text-xs sm:text-sm text-[#3e494a] mb-5 sm:mb-6 max-w-md font-medium">
          {t.intakeCompleteSubtitle}
        </p>

        {/* Identity & Health Identifier Badge */}
        <div className="w-full bg-[#ecf5f8] rounded-2xl p-3.5 border border-[#bec8ca]/40 mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div>
            <span className="text-[#6f797a]">Patient ID: </span>
            <strong className="font-mono text-[#00535b]">{patient.patientId || 'AS-2026-001846'}</strong>
          </div>
          <div className="flex items-center gap-1 text-emerald-800 font-extrabold bg-emerald-100 px-2.5 py-0.5 rounded-full text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>ABHA: Linked ✓</span>
          </div>
        </div>

        {/* Token Card */}
        <div className="w-full bg-[#f2fbfe] border-2 border-[#00535b]/20 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-bold text-[#3e494a] uppercase">{t.queueToken}</span>
            <div className="text-3xl sm:text-4xl font-black text-[#00535b] tracking-tight">{patient.tokenNumber}</div>
            <div className="text-xs text-[#236863] mt-0.5 sm:mt-1 font-bold flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Room #4 • Ground Floor Ayush OPD</span>
            </div>
          </div>

          <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-[#bec8ca]/40 shadow-xs flex flex-col items-center shrink-0">
            <QrCode className="w-11 h-11 sm:w-14 sm:h-14 text-[#00535b]" />
            <span className="text-[9px] sm:text-[10px] font-bold text-[#3e494a] mt-0.5 sm:mt-1">ABDM / Scan</span>
          </div>
        </div>

        {/* Info Highlights */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full mb-6 text-left">
          <div className="bg-[#ecf5f8] rounded-xl p-3 border border-[#bec8ca]/30">
            <div className="flex items-center gap-1.5 text-xs text-[#3e494a] font-semibold mb-0.5">
              <Clock className="w-3.5 h-3.5 text-[#00535b]" /> {t.waitTime}
            </div>
            <div className="text-sm font-bold text-[#141d1f]">{patient.waitTime || '5 mins'}</div>
          </div>
          <div className="bg-[#ecf5f8] rounded-xl p-3 border border-[#bec8ca]/30">
            <div className="flex items-center gap-1.5 text-xs text-[#3e494a] font-semibold mb-0.5">
              <FileCheck className="w-3.5 h-3.5 text-[#00535b]" /> Documents Attached
            </div>
            <div className="text-sm font-bold text-[#141d1f]">{patient.documents.length} Records</div>
          </div>
        </div>

        {/* Action Buttons: Consult with Doctor + End Session */}
        <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
          <button
            id="btn-consult-with-doctor"
            onClick={onConsultDoctor}
            className="w-full bg-[#00535b] hover:bg-[#006d77] text-white py-3.5 px-6 rounded-xl font-black text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <Video className="w-5 h-5" />
            <span>{t.consultDoctorBtn} →</span>
          </button>

          <div className="flex gap-2">
            <button
              id="view-doctor-portal-btn"
              onClick={onViewDoctorPortal}
              className="flex-1 bg-[#ecf5f8] hover:bg-[#a9ece5]/40 text-[#00535b] border border-[#00535b]/20 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t.doctorDashboard}</span>
            </button>

            <button
              id="btn-end-patient-session"
              onClick={onEndSession}
              className="flex-1 bg-white border border-[#bec8ca] text-[#3e494a] hover:text-red-700 hover:bg-red-50 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.logoutBtn}</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#6f797a] mt-4">
          Tapping "{t.logoutBtn}" clears temporary patient session state for the next user.
        </p>
      </div>
    </main>
  );
};
