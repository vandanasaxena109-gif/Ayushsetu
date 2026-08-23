import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Edit3, 
  User, 
  Activity, 
  FileText, 
  Pill, 
  AlertTriangle, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { 
  LanguageOption, 
  PatientAuthData, 
  AyurvedicAssessmentState, 
  DocumentScanRecord 
} from '../types';

interface PatientFinalReviewScreenProps {
  currentLanguage: LanguageOption;
  patientAuth: PatientAuthData;
  patientId: string;
  symptoms: string[];
  duration: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  transcript: string;
  medications: string[];
  allergies: string[];
  ayurvedicAssessment: AyurvedicAssessmentState;
  documents: DocumentScanRecord[];
  onEditSection: (section: 'identity' | 'voice' | 'documents' | 'ayurveda') => void;
  onSendToDoctor: () => void;
  onBack: () => void;
}

export const PatientFinalReviewScreen: React.FC<PatientFinalReviewScreenProps> = ({
  currentLanguage,
  patientAuth,
  patientId,
  symptoms,
  duration,
  severity,
  transcript,
  medications,
  allergies,
  ayurvedicAssessment,
  documents,
  onEditSection,
  onSendToDoctor,
  onBack,
}) => {
  return (
    <main 
      id="patient-final-review-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Header */}
      <header className="w-full max-w-3xl mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLanguage.id === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <span className="text-xs font-extrabold text-[#00535b] bg-[#a9ece5]/40 px-3 py-1 rounded-full">
          Pre-Consultation Review
        </span>
      </header>

      {/* Main Review Container */}
      <div className="w-full max-w-3xl mx-auto my-auto space-y-5">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#a9ece5]/40 text-[#00535b] px-3.5 py-1 rounded-full text-xs font-extrabold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Clinical Case Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#141d1f] tracking-tight">
            {currentLanguage.id === 'hi' ? 'आपका स्वास्थ्य विवरण तैयार है' : 'Your Health History is Ready'}
          </h1>
          <p className="text-xs sm:text-sm text-[#3e494a] mt-1 font-medium">
            {currentLanguage.id === 'hi'
              ? 'कृपया परामर्श से पहले अपने विवरण की समीक्षा करें।'
              : 'Please review your structured details before sending to the physician.'}
          </p>
        </div>

        {/* Section 1: Identity & ABHA */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#bec8ca]/40 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-[#141d1f]">
                {patientAuth.name || 'Riya Sharma'} ({patientAuth.age || 42}Y, {patientAuth.gender || 'Female'})
              </div>
              <div className="text-xs text-[#3e494a] flex items-center gap-2 mt-0.5">
                <span className="font-mono font-bold text-[#00535b]">ID: {patientId}</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ABHA Linked
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onEditSection('identity')}
            className="text-xs font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* Section 2: Chief Complaint & Symptoms */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#bec8ca]/40 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#bec8ca]/20">
            <div className="font-bold text-xs uppercase tracking-wider text-[#00535b] flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Chief Concern & Symptoms
            </div>
            <button
              onClick={() => onEditSection('voice')}
              className="text-xs font-bold text-[#00535b] hover:bg-[#e6eff2] px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[#6f797a]">Reported Symptoms:</span>
              <div className="font-extrabold text-[#141d1f] mt-0.5">
                {symptoms.join(', ') || 'Stomach pain'}
              </div>
            </div>
            <div>
              <span className="text-[#6f797a]">Duration:</span>
              <div className="font-extrabold text-[#141d1f] mt-0.5">{duration || '3 days'}</div>
            </div>
            <div>
              <span className="text-[#6f797a]">Severity:</span>
              <div className="font-extrabold text-amber-700 mt-0.5">{severity || 'Moderate'}</div>
            </div>
          </div>

          {transcript && (
            <div className="bg-[#f2fbfe] p-3 rounded-xl border border-[#bec8ca]/30 text-xs text-[#3e494a] italic">
              "{transcript}"
            </div>
          )}
        </div>

        {/* Section 3: Medications & Allergies */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#bec8ca]/40 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#bec8ca]/20">
            <div className="font-bold text-xs uppercase tracking-wider text-[#00535b] flex items-center gap-1.5">
              <Pill className="w-4 h-4" /> Current Medications & Allergies
            </div>
            <button
              onClick={() => onEditSection('documents')}
              className="text-xs font-bold text-[#00535b] hover:bg-[#e6eff2] px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#6f797a]">Medications:</span>
              <div className="font-bold text-[#141d1f] mt-1">
                {medications.length > 0 ? medications.join(', ') : 'Metformin 500mg, Amlodipine 5mg'}
              </div>
            </div>
            <div>
              <span className="text-[#6f797a]">Known Allergies:</span>
              <div className="font-bold text-red-700 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>{allergies.length > 0 ? allergies.join(', ') : 'Penicillin'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Ayurvedic & Scanned Documents */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#bec8ca]/40 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#bec8ca]/20">
            <div className="font-bold text-xs uppercase tracking-wider text-[#00535b] flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Ayurvedic Pariksha & Documents
            </div>
            <button
              onClick={() => onEditSection('ayurveda')}
              className="text-xs font-bold text-[#00535b] hover:bg-[#e6eff2] px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-[#fbfdfd] p-2.5 rounded-xl border border-[#bec8ca]/30">
              <span className="text-[11px] text-[#6f797a]">Ahara Shakti</span>
              <div className="font-bold text-[#141d1f] text-xs mt-0.5">{ayurvedicAssessment.aharaShakti || 'Low/Sluggish'}</div>
            </div>
            <div className="bg-[#fbfdfd] p-2.5 rounded-xl border border-[#bec8ca]/30">
              <span className="text-[11px] text-[#6f797a]">Agni (Digestion)</span>
              <div className="font-bold text-[#141d1f] text-xs mt-0.5">{ayurvedicAssessment.agniDigestion || 'Visham Agni'}</div>
            </div>
            <div className="bg-[#fbfdfd] p-2.5 rounded-xl border border-[#bec8ca]/30">
              <span className="text-[11px] text-[#6f797a]">Nidra (Sleep)</span>
              <div className="font-bold text-[#141d1f] text-xs mt-0.5">{ayurvedicAssessment.sleepQuality || 'Disturbed'}</div>
            </div>
            <div className="bg-[#fbfdfd] p-2.5 rounded-xl border border-[#bec8ca]/30">
              <span className="text-[11px] text-[#6f797a]">Documents</span>
              <div className="font-bold text-[#00535b] text-xs mt-0.5">
                {documents.length > 0 ? `${documents.length} Attached` : '1 Clinical Slip'}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <div className="pt-3">
          <button
            id="btn-send-to-doctor"
            onClick={onSendToDoctor}
            className="w-full min-h-[52px] bg-[#00535b] hover:bg-[#006d77] text-white py-3.5 px-6 rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>{currentLanguage.id === 'hi' ? 'डॉक्टर को भेजें →' : 'Send to Doctor →'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-xs text-[#6f797a] mt-2">
            Your doctor will review this information before your consultation.
          </p>
        </div>
      </div>

      <footer className="w-full max-w-3xl mx-auto text-center pt-2">
        <p className="text-xs text-[#6f797a]">
          AyushSetu • Physician-Supervised Clinical Pre-Intake
        </p>
      </footer>
    </main>
  );
};
