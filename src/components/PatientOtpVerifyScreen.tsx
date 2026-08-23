import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Volume2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { LanguageOption, PatientAuthData } from '../types';

interface PatientOtpVerifyScreenProps {
  currentLanguage: LanguageOption;
  patientAuth?: PatientAuthData;
  phoneNumber?: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

export const PatientOtpVerifyScreen: React.FC<PatientOtpVerifyScreenProps> = ({
  currentLanguage,
  patientAuth,
  phoneNumber,
  onVerifySuccess,
  onBack,
}) => {
  const displayPhone = phoneNumber || patientAuth?.phone || '98765 44582';
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleReadAloud = () => {
    setIsSpeaking(true);
    const msg = currentLanguage.id === 'hi'
      ? `हमने आपके मोबाइल नंबर ${displayPhone} पर 6 अंकों का ओटीपी भेजा है। कृपया इसे नीचे दर्ज करें।`
      : `We sent a 6-digit verification code to your mobile number ${displayPhone}. Please enter it below.`;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = currentLanguage.id === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  };

  const handleAutoFillDemo = () => {
    setOtp('445821');
    setError('');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(currentLanguage.id === 'hi' ? 'कृपया 6 अंकों का ओटीपी दर्ज करें' : 'Please enter 6-digit OTP');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerifySuccess();
    }, 600);
  };

  const handleResend = () => {
    setCountdown(30);
    setOtp('');
    setError('');
  };

  return (
    <main 
      id="patient-otp-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Header */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLanguage.id === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <span className="text-xs font-extrabold text-[#00535b] bg-[#a9ece5]/40 px-3 py-1 rounded-full">
          Step 3 of 4 • Verification
        </span>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-md mx-auto my-auto bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_6px_24px_rgba(0,109,119,0.06)] border border-[#bec8ca]/30">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#00535b] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Smartphone className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#141d1f] tracking-tight">
            {currentLanguage.id === 'hi' ? 'अपना मोबाइल नंबर सत्यापित करें' : 'Verify Your Mobile Number'}
          </h1>
          <p className="text-xs sm:text-sm text-[#3e494a] mt-1 font-medium">
            {currentLanguage.id === 'hi'
              ? `हमने आपके मोबाइल नंबर ${displayPhone} पर एक सत्यापन कोड भेजा है।`
              : `We sent a verification code to ${displayPhone}.`}
          </p>
        </div>

        {/* Read Aloud Button for Accessibility */}
        <div className="mb-6 flex justify-center">
          <button
            type="button"
            onClick={handleReadAloud}
            className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all border ${
              isSpeaking
                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                : 'bg-[#f2fbfe] text-[#00535b] border-[#bec8ca]/50 hover:bg-[#e6eff2]'
            }`}
          >
            <Volume2 className="w-4 h-4 text-[#00535b]" />
            <span>{isSpeaking ? 'बोल रहे हैं…' : '🔊 Read OTP instructions aloud'}</span>
          </button>
        </div>

        {/* Quick Fill Demo Chip */}
        <div className="mb-4 text-center">
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="inline-flex items-center gap-1.5 text-xs text-[#00535b] font-bold bg-[#a9ece5]/30 hover:bg-[#a9ece5]/60 px-3 py-1 rounded-lg transition-colors border border-[#00535b]/20"
          >
            <Sparkles className="w-3.5 h-3.5" /> Auto-fill Demo OTP (445821)
          </button>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label 
              htmlFor="otp-input"
              className="block text-center text-xs font-bold text-[#141d1f] uppercase tracking-wider mb-2"
            >
              {currentLanguage.id === 'hi' ? '6 अंकों का ओटीपी दर्ज करें' : 'Enter 6-Digit OTP'}
            </label>
            <input
              id="otp-input"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(val);
                if (error) setError('');
              }}
              placeholder="••••••"
              className="w-full text-center text-2xl tracking-[0.4em] font-black py-3 rounded-2xl border border-[#bec8ca]/70 bg-[#fbfdfd] focus:border-[#00535b] focus:ring-4 focus:ring-[#00535b]/20 focus:outline-none"
            />
            {error && (
              <p className="text-xs text-red-600 text-center mt-1.5 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {error}
              </p>
            )}
          </div>

          <button
            id="btn-verify-otp"
            type="submit"
            disabled={isVerifying}
            className="w-full min-h-[50px] bg-[#00535b] hover:bg-[#006d77] text-white py-3 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>{currentLanguage.id === 'hi' ? 'सत्यापित करें' : 'Verify & Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-center pt-2">
            {countdown > 0 ? (
              <p className="text-xs text-[#6f797a]">
                Didn't receive it? Resend in <strong className="text-[#00535b]">{countdown}s</strong>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-xs font-bold text-[#00535b] hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>

      <footer className="w-full max-w-md mx-auto text-center pt-2">
        <p className="text-xs text-[#6f797a]">
          AyushSetu • OTP verification via National Health Portal SMS gateway
        </p>
      </footer>
    </main>
  );
};
