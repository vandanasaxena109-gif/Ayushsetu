import React, { useState } from 'react';
import { Headphones, CheckCircle2, UserCheck, PhoneCall, X, MessageSquare, Clock } from 'lucide-react';

interface StaffHelpModalProps {
  onClose: () => void;
}

export const StaffHelpModal: React.FC<StaffHelpModalProps> = ({ onClose }) => {
  const [requested, setRequested] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Language translation difficulty');

  const topics = [
    'Language translation difficulty',
    'Document scanner assistance',
    'Voice recording / mic issue',
    'Wheelchair / physical assistance',
    'Other question about OPD token'
  ];

  const handleRequestStaff = () => {
    setRequested(true);
  };

  return (
    <div 
      id="staff-help-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div 
        id="staff-help-modal"
        className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-[#bec8ca]/40 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#a9ece5] text-[#00535b] flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#141d1f]">Staff Assistance</h2>
              <p className="text-xs text-[#3e494a]">Kiosk Attendant & Nursing Desk</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!requested ? (
          <div>
            <p className="text-sm text-[#3e494a] mb-4">
              Need help completing your intake? Choose a topic and a hospital assistant will arrive at your kiosk station in under 2 minutes.
            </p>

            <div className="space-y-2 mb-6">
              {topics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTopic(t)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all ${
                    selectedTopic === t
                      ? 'border-[#00535b] bg-[#f2fbfe] text-[#00535b] font-bold shadow-xs'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              id="call-attendant-btn"
              onClick={handleRequestStaff}
              className="w-full bg-[#00535b] hover:bg-[#006d77] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Attendant to Kiosk</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-[#141d1f]">Attendant Dispatched!</h3>
            <div className="bg-[#f2fbfe] border border-[#bec8ca]/40 rounded-xl p-3.5 text-left text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#00535b] font-bold">
                <UserCheck className="w-4 h-4" />
                <span>Nurse Preeti (Floor Incharge)</span>
              </div>
              <div className="flex items-center gap-2 text-[#3e494a]">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated arrival: ~1 minute (Kiosk #3)</span>
              </div>
              <p className="text-[11px] text-gray-500 pt-1">
                Reason: {selectedTopic}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#00535b] text-white py-3 rounded-xl font-bold text-sm"
            >
              Got it, continue intake
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
