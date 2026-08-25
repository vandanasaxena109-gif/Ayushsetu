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
  Smartphone,
  Send,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { LanguageOption, PatientAuthData } from '../types';
import { getTranslation } from '../data/translations';

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
  const t = getTranslation(currentLanguage.id);
  const displayPhone = phoneNumber || patientAuth?.phone || '98765 44582';
  
  const [generatedOtp, setGeneratedOtp] = useState<string>('445821');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [showSentNotification, setShowSentNotification] = useState(true);
  const [copied, setCopied] = useState(false);

  // Function to generate a new 6-digit OTP
  const createNewOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  };

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Handle Send / Trigger OTP Button
  const handleTriggerSendOtp = () => {
    setIsSendingOtp(true);
    setError('');
    const newCode = createNewOtp();
    
    setTimeout(() => {
      setGeneratedOtp(newCode);
      setIsSendingOtp(false);
      setShowSentNotification(true);
      setCountdown(30);
      setOtp('');
    }, 500);
  };

  const handleReadAloud = () => {
    setIsSpeaking(true);
    const spokenCode = generatedOtp.split('').join(' ');
    const msg = currentLanguage.id === 'hi'
      ? `${t.otpTitle}. मोबाइल ${displayPhone} पर ओटीपी भेजा गया है। आपका सत्यापन कोड है ${spokenCode}।`
      : `${t.otpTitle}. OTP sent to ${displayPhone}. Your verification code is ${spokenCode}.`;
    
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

  const handleAutoFill = () => {
    setOtp(generatedOtp);
    setError('');
  };

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText(generatedOtp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(currentLanguage.id === 'hi' ? 'कृपया 6 अंकों का पूरा ओटीपी दर्ज करें' : 'Please enter the complete 6-digit OTP');
      return;
    }

    // Accept generated OTP or fallback 445821
    if (otp !== generatedOtp && otp !== '445821' && otp !== '123456') {
      setError(currentLanguage.id === 'hi' ? `गलत ओटीपी दर्ज किया गया। सक्रिय कोड ${generatedOtp} है।` : `Invalid OTP. The active code is ${generatedOtp}.`);
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerifySuccess();
    }, 600);
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
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        <span className="text-xs font-extrabold text-[#00535b] bg-[#a9ece5]/40 px-3 py-1 rounded-full">
          Step 3 of 4 • Verification
        </span>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-md mx-auto my-auto bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_6px_24px_rgba(0,109,119,0.06)] border border-[#bec8ca]/30">
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#00535b] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Smartphone className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#141d1f] tracking-tight">
            {t.otpTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#3e494a] mt-1 font-medium">
            {t.otpSubtitle} <strong className="text-[#141d1f] font-bold">+{displayPhone}</strong>
          </p>
        </div>

        {/* Dynamic 'OTP Sent' Notification Banner */}
        {showSentNotification && (
          <div 
            id="otp-sent-notification-banner"
            className="mb-5 bg-[#00535b]/10 border border-[#00535b]/25 rounded-2xl p-3.5 transition-all animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#00535b] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#00535b] tracking-wide uppercase">
                    {t.otpSentNotification}
                  </span>
                  <span className="text-[10px] font-bold text-[#00535b]/70 bg-white px-2 py-0.5 rounded-md border border-[#00535b]/20">
                    SMS Gateway
                  </span>
                </div>
                <div className="mt-2 bg-white/90 p-2.5 rounded-xl border border-[#bec8ca]/40">
                  <div className="flex items-center justify-between text-[11px] text-[#3e494a] mb-1">
                    <span className="font-semibold flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#00535b]" />
                      [AyushSetu SMS]
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">Just now</span>
                  </div>
                  <p className="text-xs text-[#141d1f] font-medium leading-tight">
                    {t.otpReceivedMsg} <strong className="font-mono text-sm tracking-widest text-[#00535b] bg-[#a9ece5]/30 px-2 py-0.5 rounded ml-1">{generatedOtp}</strong>
                  </p>
                  
                  {/* Quick Action in Notification */}
                  <div className="mt-2 flex items-center gap-2 pt-1 border-t border-[#bec8ca]/30">
                    <button
                      type="button"
                      onClick={handleAutoFill}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2.5 bg-[#00535b] hover:bg-[#006d77] text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                    >
                      <Sparkles className="w-3 h-3 text-[#a9ece5]" />
                      Auto-fill ({generatedOtp})
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyOtp}
                      title="Copy OTP"
                      className="flex items-center justify-center py-1 px-2.5 bg-[#f2fbfe] hover:bg-[#e6eff2] text-[#00535b] border border-[#00535b]/20 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar: Trigger Send OTP Button & Voice readout */}
        <div className="mb-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            id="btn-trigger-send-otp"
            onClick={handleTriggerSendOtp}
            disabled={isSendingOtp}
            className="flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl border border-[#00535b]/30 bg-[#f2fbfe] hover:bg-[#a9ece5]/30 text-[#00535b] transition-all cursor-pointer disabled:opacity-50"
          >
            {isSendingOtp ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5 text-[#00535b]" />
            )}
            <span>{isSendingOtp ? 'Sending...' : t.sendOtpBtn || 'Send OTP SMS'}</span>
          </button>

          <button
            type="button"
            onClick={handleReadAloud}
            className={`flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl transition-all border cursor-pointer ${
              isSpeaking
                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                : 'bg-[#f2fbfe] text-[#00535b] border-[#00535b]/30 hover:bg-[#e6eff2]'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-[#00535b]" />
            <span>{isSpeaking ? 'Reading...' : '🔊 Read OTP'}</span>
          </button>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label 
              htmlFor="otp-input"
              className="block text-center text-xs font-bold text-[#141d1f] uppercase tracking-wider mb-2"
            >
              {t.enterOtp}
            </label>
            <input
              id="otp-input"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(val);
                if (error) setError('');
              }}
              placeholder="••••••"
              className="w-full text-center text-2xl tracking-[0.4em] font-black py-3 rounded-2xl border border-[#bec8ca]/70 bg-[#fbfdfd] focus:border-[#00535b] focus:ring-4 focus:ring-[#00535b]/20 focus:outline-none transition-all"
            />
            {error && (
              <p className="text-xs text-red-600 text-center mt-2 flex items-center justify-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
              </p>
            )}
          </div>

          <button
            id="btn-verify-otp"
            type="submit"
            disabled={isVerifying || otp.length === 0}
            className="w-full min-h-[50px] bg-[#00535b] hover:bg-[#006d77] text-white py-3 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>{t.verifyOtpBtn}</span>
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
                onClick={handleTriggerSendOtp}
                className="text-xs font-bold text-[#00535b] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> {t.resendOtp}
              </button>
            )}
          </div>
        </form>
      </div>

      <footer className="w-full max-w-md mx-auto text-center pt-2">
        <p className="text-xs text-[#6f797a]">
          AyushSetu • Secure OTP verification
        </p>
      </footer>
    </main>
  );
};

