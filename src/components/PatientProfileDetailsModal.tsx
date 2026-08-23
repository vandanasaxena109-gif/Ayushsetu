import React from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  CreditCard, 
  Phone, 
  Calendar, 
  Lock, 
  CheckCircle2,
  QrCode,
  Share2
} from 'lucide-react';
import { PatientAuthData, LanguageOption } from '../types';

interface PatientProfileDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageOption;
  patientAuth: PatientAuthData;
  patientId: string;
}

export const PatientProfileDetailsModal: React.FC<PatientProfileDetailsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  patientAuth,
  patientId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#bec8ca]/40 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#bec8ca]/30 flex items-center justify-between bg-[#f2fbfe]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#141d1f]">
                {currentLanguage.id === 'hi' ? 'मेरी प्रोफ़ाइल और स्वास्थ्य पहचान' : 'My Profile & Health Identity'}
              </h2>
              <p className="text-xs text-[#3e494a] font-medium">
                Personal Information, ABHA & Ayushman Details
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
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-left text-xs sm:text-sm">
          {/* Section 1: Personal Information */}
          <div>
            <h3 className="font-extrabold text-[#141d1f] uppercase tracking-wider text-xs text-[#00535b] mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4" /> Personal Information
            </h3>
            <div className="bg-[#fbfdfd] p-4 rounded-2xl border border-[#bec8ca]/40 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-[#6f797a]">Full Name</div>
                <div className="font-bold text-[#141d1f] text-sm">{patientAuth.name || 'Riya Sharma'}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6f797a]">AyushSetu ID</div>
                <div className="font-mono font-bold text-[#00535b] text-sm">{patientId}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6f797a]">Age / Sex</div>
                <div className="font-bold text-[#141d1f]">{patientAuth.age || 42} Years • {patientAuth.gender || 'Female'}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6f797a]">Registered Mobile</div>
                <div className="font-bold text-[#141d1f]">{patientAuth.phone || '+91 98765 44582'}</div>
              </div>
            </div>
          </div>

          {/* Section 2: Health Identity */}
          <div>
            <h3 className="font-extrabold text-[#141d1f] uppercase tracking-wider text-xs text-[#00535b] mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> ABDM & Ayushman Bharat Identity
            </h3>
            <div className="bg-[#fbfdfd] p-4 rounded-2xl border border-[#bec8ca]/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#bec8ca]/20">
                <div>
                  <div className="text-[11px] text-[#6f797a]">ABHA ID Number</div>
                  <div className="font-mono font-bold text-[#141d1f] text-sm">{patientAuth.abhaId || '91-4523-8890-1234'}</div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Linked ✓
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#6f797a]">Ayushman Bharat Card</div>
                  <div className="font-mono font-bold text-[#141d1f] text-sm">
                    {patientAuth.ayushmanCard || 'PMJAY-MH-449102'}
                  </div>
                </div>
                <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified ✓
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Privacy & Data Sharing */}
          <div>
            <h3 className="font-extrabold text-[#141d1f] uppercase tracking-wider text-xs text-[#00535b] mb-3 flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> Privacy & Consent
            </h3>
            <div className="bg-[#fbfdfd] p-4 rounded-2xl border border-[#bec8ca]/40 space-y-2 text-xs text-[#3e494a]">
              <div className="flex items-center justify-between">
                <span>Clinical Triage Data Sharing:</span>
                <strong className="text-emerald-700">Authorized by Patient</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Longitudinal Health Continuity:</span>
                <strong className="text-[#00535b]">Active</strong>
              </div>
              <p className="text-[11px] text-[#6f797a] pt-1">
                Your medical data is encrypted and only accessible by consulting physicians with your active OTP or biometric authorization.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#bec8ca]/30 flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#00535b] text-white text-xs sm:text-sm font-bold hover:bg-[#006d77] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
