import React, { useState } from 'react';
import { AlertOctagon, Bell, CheckCircle2, ShieldAlert, X } from 'lucide-react';

interface UrgentAlertModalProps {
  reason: string;
  onCallStaff: () => void;
  onDismiss: () => void;
  onStaffConfirmed: () => void;
}

export const UrgentAlertModal: React.FC<UrgentAlertModalProps> = ({
  reason,
  onCallStaff,
  onDismiss,
  onStaffConfirmed,
}) => {
  const [isCalling, setIsCalling] = useState(false);
  const [calledSuccess, setCalledSuccess] = useState(false);

  const handleTriggerCall = () => {
    setIsCalling(true);
    onCallStaff();

    // Trigger audio beep or synthetic tone
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}

    setTimeout(() => {
      setIsCalling(false);
      setCalledSuccess(true);
    }, 1200);
  };

  return (
    <div 
      id="urgent-alert-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div 
        id="urgent-alert-modal"
        className="w-full max-w-lg bg-[#fff8f6] border-2 border-[#ba1a1a]/40 rounded-3xl p-6 md:p-8 shadow-[0px_16px_36px_rgba(186,26,26,0.2)] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Warning Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 shadow-inner">
            <AlertOctagon className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs font-black tracking-widest text-[#ba1a1a] uppercase bg-[#ffdad6] px-2.5 py-1 rounded-full inline-block mb-1">
              Priority Clinical Flag
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#ba1a1a] leading-tight">
              URGENT ATTENTION MAY BE NEEDED
            </h2>
          </div>
        </div>

        {/* Description Body */}
        <div className="bg-white rounded-2xl p-4 border border-[#ffdad6] mb-6 space-y-2">
          <p className="text-base text-[#141d1f] font-medium leading-relaxed">
            Potential warning signs were detected:
          </p>
          <p className="text-sm font-bold text-[#ba1a1a] bg-[#ffdad6]/40 p-2.5 rounded-lg border-l-4 border-[#ba1a1a]">
            {reason || 'Chest pain with radiating symptoms detected during intake.'}
          </p>
          <p className="text-xs text-[#3e494a] leading-relaxed pt-1">
            Please notify nursing or emergency OPD staff immediately. Do not wait for the kiosk interview to finish.
          </p>
        </div>

        {/* Live Call Confirmation status */}
        {calledSuccess && (
          <div className="bg-[#a9ece5]/30 border border-[#236863] rounded-xl p-3 mb-4 flex items-center gap-2.5 text-[#00535b]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-xs font-bold">
              Emergency Station Notified! Attendant Nurse Preeti has been paged to Kiosk #3.
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            id="btn-call-staff-now"
            onClick={handleTriggerCall}
            disabled={isCalling}
            className="w-full bg-[#ffba27] hover:bg-[#ffdea9] text-[#634500] border-2 border-[#825b00]/30 py-4 px-6 rounded-2xl font-extrabold text-lg shadow-[0px_4px_16px_rgba(130,91,0,0.2)] flex items-center justify-center gap-3 transition-all transform active:scale-98"
          >
            <Bell className={`w-6 h-6 ${isCalling ? 'animate-bounce' : 'animate-pulse'}`} />
            <span>{isCalling ? 'Calling Emergency Station...' : calledSuccess ? 'Emergency Desk Paged ✓' : 'Call Staff Now'}</span>
          </button>

          <button
            id="btn-continue-after-staff"
            onClick={onStaffConfirmed}
            className="w-full bg-white hover:bg-[#e6eff2] text-[#141d1f] border border-[#bec8ca] py-3.5 px-6 rounded-2xl font-semibold text-sm transition-colors text-center"
          >
            Continue after staff confirms
          </button>
        </div>
      </div>
    </div>
  );
};
