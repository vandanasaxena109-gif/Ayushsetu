import React from 'react';
import { 
  X, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Pill, 
  Building2, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { DEMO_RETURNING_PROFILE } from '../data/mockData';
import { LanguageOption } from '../types';

interface PatientHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageOption;
  patientName?: string;
  patientId?: string;
}

export const PatientHistoryModal: React.FC<PatientHistoryModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  patientName = 'Riya Sharma',
  patientId = 'AS-2026-001846',
}) => {
  if (!isOpen) return null;

  const pastVisits = DEMO_RETURNING_PROFILE.pastVisits || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#bec8ca]/40 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#bec8ca]/30 flex items-center justify-between bg-[#f2fbfe]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#141d1f]">
                {currentLanguage.id === 'hi' ? 'मेरा स्वास्थ्य इतिहास' : 'My Health History & Past Records'}
              </h2>
              <p className="text-xs text-[#3e494a] font-medium">
                {patientName} • Patient ID: <span className="font-mono font-bold text-[#00535b]">{patientId}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white text-[#3e494a] hover:text-[#141d1f] hover:bg-gray-100 flex items-center justify-center transition-colors border border-[#bec8ca]/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          <div className="bg-[#a9ece5]/30 p-3.5 rounded-2xl border border-[#00535b]/20 flex items-center justify-between text-xs text-[#00535b]">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> ABHA Longitudinal Health Records Synced
            </span>
            <span className="bg-white px-2 py-0.5 rounded-md font-extrabold text-[10px]">
              2 Past Encounters
            </span>
          </div>

          <div className="space-y-4">
            {pastVisits.map((visit) => (
              <div 
                key={visit.id}
                className="bg-[#fbfdfd] rounded-2xl p-4 sm:p-5 border border-[#bec8ca]/40 hover:border-[#00535b]/40 transition-all shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-[#bec8ca]/20">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#00535b]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{visit.date}</span>
                  </div>
                  <div className="text-[11px] text-[#6f797a] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{visit.facility}</span>
                  </div>
                </div>

                <h3 className="text-base font-black text-[#141d1f] mb-1">
                  {visit.chiefComplaint}
                </h3>
                <p className="text-xs text-[#3e494a] mb-3">
                  <strong>Consultant:</strong> {visit.doctor} • <strong>Ayush Diagnosis:</strong> <span className="text-[#236863] font-bold">{visit.diagnosis}</span>
                </p>

                {/* Prescriptions */}
                <div className="bg-white p-3 rounded-xl border border-[#bec8ca]/30 text-xs">
                  <div className="font-bold text-[#141d1f] flex items-center gap-1.5 mb-1.5">
                    <Pill className="w-3.5 h-3.5 text-[#00535b]" /> Prescribed Formulations:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[#3e494a] text-[11px]">
                    {visit.prescriptions.map((rx, idx) => (
                      <li key={idx} className="font-medium">{rx}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#bec8ca]/30 flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#00535b] text-white text-xs sm:text-sm font-bold hover:bg-[#006d77] transition-all"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
