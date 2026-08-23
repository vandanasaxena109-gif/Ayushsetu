import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  Pill, 
  AlertCircle, 
  FileText, 
  Clock, 
  Share2, 
  Edit3, 
  Check, 
  ExternalLink,
  Volume2,
  Calendar,
  Sparkles,
  Download,
  CheckCircle2,
  Printer,
  X
} from 'lucide-react';
import { PatientData } from '../types';

interface DoctorSummaryScreenProps {
  patient: PatientData;
  onBack: () => void;
  onUpdatePatient: (updated: PatientData) => void;
}

export const DoctorSummaryScreen: React.FC<DoctorSummaryScreenProps> = ({
  patient,
  onBack,
  onUpdatePatient,
}) => {
  const [showAmendModal, setShowAmendModal] = useState<boolean>(false);
  const [showAbdmModal, setShowAbdmModal] = useState<boolean>(false);
  const [showFinalizeModal, setShowFinalizeModal] = useState<boolean>(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [abdmExported, setAbdmExported] = useState<boolean>(false);

  // Edit fields
  const [editableComplaint, setEditableComplaint] = useState(patient.chiefComplaint);
  const [editableSeverity, setEditableSeverity] = useState(patient.severity);
  const [editableNotes, setEditableNotes] = useState(patient.doctorNotes || '');
  const [prescriptionInput, setPrescriptionInput] = useState('');
  const [rxList, setRxList] = useState<string[]>(patient.prescriptionAdded || [
    'Avipattikar Churna 3g BD with lukewarm water',
    'Sutshekhar Ras 1 tab twice daily before meals',
    'Emergency ECG & Troponin-T advised for chest evaluation'
  ]);

  const handlePlayVoice = () => {
    if (patient.liveTranscript && 'speechSynthesis' in window) {
      setIsPlayingVoice(true);
      const utterance = new SpeechSynthesisUtterance(patient.liveTranscript);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSaveAmendments = () => {
    const updated: PatientData = {
      ...patient,
      chiefComplaint: editableComplaint,
      severity: editableSeverity,
      doctorNotes: editableNotes,
      prescriptionAdded: rxList,
    };
    onUpdatePatient(updated);
    setShowAmendModal(false);
  };

  const handleFinalize = () => {
    const updated: PatientData = {
      ...patient,
      status: 'reviewed',
      waitTime: 'Completed',
      doctorNotes: editableNotes || 'Consultation finalized. Dietary and Ayurvedic regimen explained.',
      prescriptionAdded: rxList,
    };
    onUpdatePatient(updated);
    setShowFinalizeModal(false);
    onBack();
  };

  const handleExportAbdm = () => {
    setAbdmExported(true);
    const fhirBundle = {
      resourceType: 'Bundle',
      id: `ABDM-${patient.id}`,
      type: 'document',
      timestamp: new Date().toISOString(),
      entry: [
        {
          resource: {
            resourceType: 'Patient',
            id: patient.id,
            name: [{ text: patient.name }],
            gender: patient.gender.toLowerCase(),
            telecom: [{ value: patient.phone }]
          }
        },
        {
          resource: {
            resourceType: 'Condition',
            code: { text: patient.chiefComplaint },
            clinicalStatus: { coding: [{ code: 'active' }] }
          }
        },
        {
          resource: {
            resourceType: 'Observation',
            code: { text: 'Ayurvedic Prakriti & Agni Assessment' },
            valueString: `Agni: ${patient.ayurvedicAssessment.agniDigestion}, Appetite: ${patient.ayurvedicAssessment.aharaShakti}`
          }
        }
      ]
    };

    const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ABDM_HealthRecord_${patient.tokenNumber}_${patient.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="doctor-summary-screen" className="min-h-screen bg-[#f2fbfe] flex flex-col font-sans pb-32">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#bec8ca]/30 sticky top-0 z-40 shadow-xs">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1200px] mx-auto h-20">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full border border-[#bec8ca]/50 flex items-center justify-center text-[#00535b] hover:bg-[#e6eff2] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-bold text-xl shadow-sm">
              A
            </div>
            <div>
              <span className="text-xl font-bold text-[#00535b] tracking-tight block">AyushSetu</span>
              <span className="text-[10px] text-[#3e494a] font-medium">Clinical Decision Support & Intake Summary</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 bg-[#e6eff2] hover:bg-[#bec8ca]/40 text-[#00535b] text-xs font-bold px-3 py-2 rounded-xl transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Dossier</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-[#00535b] text-white flex items-center justify-center font-bold text-sm">
              DS
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1200px] mx-auto w-full p-4 md:p-8 flex flex-col gap-6">
        {/* Patient Header Banner */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#bec8ca]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="bg-[#00535b] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                Token {patient.tokenNumber}
              </span>
              <span className="text-xs font-bold text-[#3e494a] bg-[#e6eff2] px-2.5 py-1 rounded-full">
                ID: {patient.id}
              </span>
              <span className="bg-[#a9ece5]/50 text-[#00535b] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#006d77]" />
                Consent Verified
              </span>
              <span className="text-xs text-[#3e494a] bg-[#ecf5f8] px-2.5 py-1 rounded-full font-medium">
                Language: {patient.language}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-[#141d1f]">
              {patient.name}
            </h1>
            <p className="text-sm text-[#3e494a] font-medium mt-0.5">
              {patient.age} Years Old • {patient.gender} • Phone: {patient.phone}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
              patient.status === 'reviewed' 
                ? 'bg-emerald-100 text-emerald-800' 
                : patient.isUrgent 
                ? 'bg-[#ffdad6] text-[#ba1a1a]' 
                : 'bg-[#ffdea9] text-[#634500]'
            }`}>
              {patient.status === 'reviewed' ? 'Consultation Finalized' : patient.isUrgent ? 'Urgent Review' : 'In Queue'}
            </span>
          </div>
        </section>

        {/* Urgent Warning Banner if Red Flag */}
        {patient.isUrgent && (
          <section 
            id="summary-urgent-banner"
            className="bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-2xl p-5 flex items-start gap-4 shadow-sm animate-pulse"
          >
            <AlertTriangle className="w-7 h-7 text-[#ba1a1a] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-extrabold text-[#ba1a1a] uppercase tracking-wide">
                URGENT — Potential Red Flag Detected
              </h3>
              <p className="text-sm font-bold text-[#93000a] mt-0.5">
                {patient.urgentReason || 'Chest pain with pain radiating to the left arm reported during voice intake.'}
              </p>
              <p className="text-xs text-[#ba1a1a] mt-1">
                Recommendation: Perform baseline ECG and vital monitoring alongside gastrointestinal evaluation.
              </p>
            </div>
          </section>
        )}

        {/* Bento Grid Layout for Clinical Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Chief Complaint (Col 1-7) */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-[#bec8ca]/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-[#3e494a] uppercase tracking-wider">
                  Chief Complaint
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  patient.severity === 'Severe' 
                    ? 'bg-[#ffdad6] text-[#ba1a1a]' 
                    : 'bg-[#a9ece5]/40 text-[#00535b]'
                }`}>
                  Severity: {patient.severity}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#141d1f] mb-2">
                {patient.chiefComplaint}
              </h2>
              <p className="text-sm text-[#3e494a] mb-4">
                Duration: <strong className="text-[#141d1f]">{patient.duration}</strong>
              </p>

              {/* Spoken Voice Transcript Block */}
              {patient.liveTranscript && (
                <div className="bg-[#f2fbfe] border border-[#bec8ca]/30 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#006d77] uppercase flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Spoken Patient Audio Transcript
                    </span>
                    <button
                      onClick={handlePlayVoice}
                      className="text-xs font-bold text-[#00535b] hover:underline flex items-center gap-1"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isPlayingVoice ? 'animate-pulse text-emerald-600' : ''}`} />
                      {isPlayingVoice ? 'Playing...' : 'Listen'}
                    </button>
                  </div>
                  <p className="text-xs text-[#141d1f] italic">
                    "{patient.liveTranscript}"
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#bec8ca]/30 flex justify-between items-center text-xs text-[#3e494a]">
              <span>Reported Symptoms: {patient.symptoms.join(', ')}</span>
            </div>
          </div>

          {/* Card 2: Medications & Allergies (Col 8-12) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Medications */}
            <div className="bg-white rounded-2xl p-6 border border-[#bec8ca]/30 shadow-sm flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#3e494a] uppercase tracking-wider flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-[#00535b]" /> Current Medications
                </span>
                <span className="text-xs text-[#00535b] font-bold">
                  {patient.medications.length} Active
                </span>
              </div>

              <div className="space-y-2">
                {patient.medications.map((med, idx) => (
                  <div key={idx} className="bg-[#ecf5f8] rounded-xl p-2.5 text-xs font-bold text-[#141d1f] flex items-center justify-between">
                    <span>{med}</span>
                    <span className="text-[10px] text-[#236863] bg-white px-2 py-0.5 rounded-md font-medium">Daily</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="bg-white rounded-2xl p-6 border border-[#bec8ca]/30 shadow-sm flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#ba1a1a]" /> Known Allergies
                </span>
              </div>

              <div className="space-y-2">
                {patient.allergies.map((alg, idx) => (
                  <div key={idx} className="bg-[#ffdad6]/40 border border-[#ffdad6] rounded-xl p-2.5 text-xs font-bold text-[#ba1a1a] flex items-center justify-between">
                    <span>{alg}</span>
                    <span className="text-[10px] bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded font-bold">Severe Reaction</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Medical History Overview (Col 1-12) */}
          <div className="md:col-span-12 bg-white rounded-2xl p-6 border border-[#bec8ca]/30 shadow-sm">
            <h3 className="text-xs font-bold text-[#3e494a] uppercase tracking-wider mb-2">
              Medical History Overview
            </h3>
            <p className="text-sm text-[#141d1f] leading-relaxed">
              {patient.medicalHistory}
            </p>
          </div>

          {/* Card 4: Ayurvedic Health Assessment & Prakriti (Col 1-6) */}
          <div className="md:col-span-6 bg-white rounded-2xl p-6 border border-[#bec8ca]/30 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-[#00535b] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#006d77]" /> Ayurvedic Assessment (Prakriti & Agni)
              </h3>
              <span className="text-xs bg-[#a9ece5]/30 text-[#00535b] font-bold px-2 py-0.5 rounded-full">
                Standard AYUSH Intake
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-[#f2fbfe] p-3 rounded-xl border border-[#bec8ca]/30 flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#3e494a] font-medium block">Ahara Shakti (Appetite):</span>
                  <span className="text-sm font-bold text-[#141d1f]">{patient.ayurvedicAssessment.aharaShakti || 'Variable'}</span>
                </div>
                <span className="text-xs font-semibold text-[#006d77] bg-white px-2.5 py-1 rounded-lg border border-[#bec8ca]/40">
                  Agni Sluggish
                </span>
              </div>

              <div className="bg-[#f2fbfe] p-3 rounded-xl border border-[#bec8ca]/30 flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#3e494a] font-medium block">Agni & Digestion:</span>
                  <span className="text-sm font-bold text-[#141d1f]">{patient.ayurvedicAssessment.agniDigestion || 'Visham Agni'}</span>
                </div>
                <span className="text-xs font-semibold text-[#006d77] bg-white px-2.5 py-1 rounded-lg border border-[#bec8ca]/40">
                  Vata-Pitta
                </span>
              </div>

              <div className="bg-[#f2fbfe] p-3 rounded-xl border border-[#bec8ca]/30 flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#3e494a] font-medium block">Nidra (Sleep Quality):</span>
                  <span className="text-sm font-bold text-[#141d1f]">{patient.ayurvedicAssessment.sleepQuality || 'Light / Disturbed'}</span>
                </div>
              </div>

              <div className="bg-[#f2fbfe] p-3 rounded-xl border border-[#bec8ca]/30 flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#3e494a] font-medium block">Koshtha (Bowel Habit):</span>
                  <span className="text-sm font-bold text-[#141d1f]">{patient.ayurvedicAssessment.bowelMovement || 'Hard / Irregular'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Documents & Timeline (Col 7-12) */}
          <div className="md:col-span-6 bg-white rounded-2xl p-6 border border-[#bec8ca]/30 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-[#3e494a] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#00535b]" /> Event Timeline & Scanned Documents
              </h3>
              <span className="text-xs text-[#00535b] font-bold">
                {patient.documents.length} Files Attached
              </span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-4 flex-grow">
              {patient.timeline.map((item, idx) => (
                <div key={item.id || idx} className="flex gap-3 relative">
                  {idx !== patient.timeline.length - 1 && (
                    <div className="absolute top-6 left-2.5 w-0.5 h-full bg-[#bec8ca]/40 -z-0"></div>
                  )}
                  <div className="w-6 h-6 rounded-full bg-[#006d77] text-white flex items-center justify-center shrink-0 text-xs font-bold z-10">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-[#ecf5f8] rounded-xl p-3 border border-[#bec8ca]/30">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-[#141d1f]">{item.title}</h4>
                      <span className="text-[10px] text-[#3e494a] font-medium">{item.time}</span>
                    </div>
                    <p className="text-xs text-[#3e494a] mt-0.5">{item.subtitle}</p>
                    {item.linkText && (
                      <span className="text-[11px] font-bold text-[#00535b] hover:underline cursor-pointer inline-flex items-center gap-0.5 mt-1">
                        {item.linkText} <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Prescribed / Plan Summary if reviewed */}
        {patient.prescriptionAdded && patient.prescriptionAdded.length > 0 && (
          <section className="bg-white rounded-2xl p-6 border border-[#bec8ca]/30 shadow-sm">
            <h3 className="text-xs font-bold text-[#00535b] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4" /> Finalized Treatment Regimen & Advice
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {patient.prescriptionAdded.map((rx, idx) => (
                <div key={idx} className="bg-[#f2fbfe] border border-[#bec8ca]/40 p-3 rounded-xl text-xs font-bold text-[#141d1f] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00535b]"></span>
                  <span>{rx}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer 
        id="doctor-summary-action-bar"
        className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#bec8ca]/40 py-4 px-6 z-40 shadow-[0px_-4px_20px_rgba(0,109,119,0.08)]"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="export-abdm-btn"
              onClick={handleExportAbdm}
              className="bg-[#ecf5f8] hover:bg-[#bec8ca]/40 text-[#00535b] px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border border-[#bec8ca]/40"
            >
              <Download className="w-4 h-4" />
              <span>{abdmExported ? 'ABDM FHIR Exported ✓' : 'Export to ABDM'}</span>
            </button>

            <button
              id="amend-data-btn"
              onClick={() => setShowAmendModal(true)}
              className="bg-white hover:bg-[#e6eff2] text-[#3e494a] px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border border-[#bec8ca]"
            >
              <Edit3 className="w-4 h-4" />
              <span>Amend Data</span>
            </button>
          </div>

          <button
            id="accept-finalize-btn"
            onClick={() => setShowFinalizeModal(true)}
            className="w-full sm:w-auto bg-[#00535b] hover:bg-[#006d77] text-white px-8 py-3.5 rounded-xl font-extrabold text-base shadow-[0px_4px_16px_rgba(0,109,119,0.2)] transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>Accept & Finalize Consultation</span>
          </button>
        </div>
      </footer>

      {/* Amend Data Modal */}
      {showAmendModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-[#bec8ca]/40">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#141d1f]">Amend Clinical Information</h2>
              <button onClick={() => setShowAmendModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#3e494a] uppercase mb-1">Chief Complaint</label>
                <input
                  type="text"
                  value={editableComplaint}
                  onChange={(e) => setEditableComplaint(e.target.value)}
                  className="w-full bg-[#f2fbfe] border border-[#bec8ca] rounded-xl p-3 text-sm text-[#141d1f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3e494a] uppercase mb-1">Severity Level</label>
                <select
                  value={editableSeverity}
                  onChange={(e: any) => setEditableSeverity(e.target.value)}
                  className="w-full bg-[#f2fbfe] border border-[#bec8ca] rounded-xl p-3 text-sm text-[#141d1f]"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3e494a] uppercase mb-1">Clinical Notes</label>
                <textarea
                  rows={3}
                  value={editableNotes}
                  onChange={(e) => setEditableNotes(e.target.value)}
                  className="w-full bg-[#f2fbfe] border border-[#bec8ca] rounded-xl p-3 text-sm text-[#141d1f]"
                  placeholder="Add physician notes and observations..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAmendModal(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAmendments}
                className="px-6 py-2.5 rounded-xl bg-[#00535b] text-white text-sm font-bold hover:bg-[#006d77]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finalize Consultation Modal */}
      {showFinalizeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-[#bec8ca]/40">
            <div className="w-12 h-12 rounded-full bg-[#a9ece5] text-[#00535b] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-[#141d1f] mb-1">
              Finalize Consultation for {patient.name}
            </h2>
            <p className="text-xs text-[#3e494a] mb-4">
              Review and confirm the prescription advice before sending to pharmacy and generating digital Ayushman discharge card.
            </p>

            <div className="space-y-3 mb-6">
              <label className="block text-xs font-bold text-[#3e494a] uppercase">Prescription Regimen</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {rxList.map((item, idx) => (
                  <div key={idx} className="bg-[#f2fbfe] p-2.5 rounded-xl text-xs font-medium flex items-center justify-between">
                    <span>{item}</span>
                    <button 
                      onClick={() => setRxList(rxList.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 text-xs ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add another Ayurvedic formulation / instruction..."
                  value={prescriptionInput}
                  onChange={(e) => setPrescriptionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && prescriptionInput.trim()) {
                      setRxList([...rxList, prescriptionInput.trim()]);
                      setPrescriptionInput('');
                    }
                  }}
                  className="flex-1 bg-[#ecf5f8] border border-[#bec8ca] rounded-xl px-3 py-2 text-xs"
                />
                <button
                  onClick={() => {
                    if (prescriptionInput.trim()) {
                      setRxList([...rxList, prescriptionInput.trim()]);
                      setPrescriptionInput('');
                    }
                  }}
                  className="bg-[#00535b] text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowFinalizeModal(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-50"
              >
                Go Back
              </button>
              <button
                id="confirm-finalize-btn"
                onClick={handleFinalize}
                className="px-6 py-2.5 rounded-xl bg-[#00535b] text-white text-sm font-bold hover:bg-[#006d77]"
              >
                Confirm & Discharge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
