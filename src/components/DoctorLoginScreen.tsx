import React, { useState } from 'react';
import { 
  Stethoscope, 
  Lock, 
  Building2, 
  UserCheck, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Fingerprint, 
  KeyRound, 
  RefreshCw, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { LanguageOption } from '../types';

interface DoctorLoginScreenProps {
  currentLanguage: LanguageOption;
  onLoginSuccess: (doctorInfo: { doctorId: string; name: string; facility: string }) => void;
  onBackToRole: () => void;
}

export const DoctorLoginScreen: React.FC<DoctorLoginScreenProps> = ({
  currentLanguage,
  onLoginSuccess,
  onBackToRole,
}) => {
  const [facilityId, setFacilityId] = useState('AIIMS-AYUSH-ND-04');
  const [doctorId, setDoctorId] = useState('DOC-AYUSH-9921');
  const [password, setPassword] = useState('••••••••••••');
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [verificationMethod, setVerificationMethod] = useState<'otp' | 'sso' | 'biometric'>('otp');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verification');
  };

  const handleFinalVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        doctorId: doctorId || 'DOC-AYUSH-9921',
        name: 'Dr. Anand Sharma, MD (Ayush)',
        facility: facilityId || 'National Institute of Ayurveda / AIIMS',
      });
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setFacilityId('AIIMS-AYUSH-ND-04');
    setDoctorId('DOC-AYUSH-9921');
    onLoginSuccess({
      doctorId: 'DOC-AYUSH-9921',
      name: 'Dr. Anand Sharma, MD (Ayush)',
      facility: 'National Institute of Ayurveda / AIIMS',
    });
  };

  return (
    <main 
      id="doctor-login-screen"
      className="min-h-screen bg-[#141d1f] text-white flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Header */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBackToRole}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#9ff0fb] hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Role Selection</span>
        </button>

        <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full">
          Clinical Portal
        </span>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto my-auto space-y-6">
        {step === 'credentials' ? (
          <div className="bg-[#1e292b] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#236863] text-white flex items-center justify-center mx-auto mb-3 shadow-lg border border-teal-400/30">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Doctor Portal
              </h1>
              <p className="text-xs sm:text-sm text-[#9aa8ab] mt-1 font-medium">
                Secure access for healthcare professionals
              </p>
            </div>

            {/* Quick Demo Fill */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="inline-flex items-center gap-1.5 text-xs text-[#9ff0fb] font-bold bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 px-3 py-1.5 rounded-xl transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" /> 1-Click Doctor Demo Sign-In
              </button>
            </div>

            <form onSubmit={handleCredentialSubmit} className="space-y-4">
              {/* Facility ID */}
              <div>
                <label 
                  htmlFor="facility-id"
                  className="block text-xs font-bold text-[#9aa8ab] uppercase tracking-wider mb-1.5"
                >
                  Hospital / Facility ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6f797a]">
                    <Building2 className="w-4 h-4 text-[#9aa8ab]" />
                  </div>
                  <input
                    id="facility-id"
                    type="text"
                    value={facilityId}
                    onChange={(e) => setFacilityId(e.target.value)}
                    placeholder="Enter facility ID"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#141d1f] text-white text-sm focus:outline-none focus:border-[#9ff0fb] focus:ring-2 focus:ring-[#9ff0fb]/20"
                  />
                </div>
              </div>

              {/* Doctor ID */}
              <div>
                <label 
                  htmlFor="doctor-id"
                  className="block text-xs font-bold text-[#9aa8ab] uppercase tracking-wider mb-1.5"
                >
                  Doctor ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6f797a]">
                    <UserCheck className="w-4 h-4 text-[#9aa8ab]" />
                  </div>
                  <input
                    id="doctor-id"
                    type="text"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    placeholder="Enter doctor ID"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#141d1f] text-white text-sm focus:outline-none focus:border-[#9ff0fb] focus:ring-2 focus:ring-[#9ff0fb]/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label 
                  htmlFor="doc-password"
                  className="block text-xs font-bold text-[#9aa8ab] uppercase tracking-wider mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6f797a]">
                    <Lock className="w-4 h-4 text-[#9aa8ab]" />
                  </div>
                  <input
                    id="doc-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#141d1f] text-white text-sm focus:outline-none focus:border-[#9ff0fb] focus:ring-2 focus:ring-[#9ff0fb]/20"
                  />
                </div>
              </div>

              <button
                id="btn-doc-signin"
                type="submit"
                className="w-full min-h-[48px] bg-[#00535b] hover:bg-[#006d77] text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] border border-teal-400/40"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-[#9ff0fb] border border-white/10 transition-colors"
                >
                  Sign in with Hospital SSO
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#9aa8ab] pt-2 border-t border-white/10">
                <button type="button" className="hover:underline">Forgot Password?</button>
                <button type="button" className="hover:underline flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Need IT Support?
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Step 2: 2-Factor / Biometric Verification */
          <div className="bg-[#1e292b] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6 text-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-600/30 text-[#9ff0fb] flex items-center justify-center mx-auto mb-3 border border-teal-400/40">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-white">
                Secure Verification
              </h2>
              <p className="text-xs text-[#9aa8ab] mt-1">
                Complete 2FA verification to access protected patient health records.
              </p>
            </div>

            {/* Verification options */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'otp' as const, label: 'OTP Code', icon: KeyRound },
                { id: 'sso' as const, label: 'Hospital SSO', icon: Building2 },
                { id: 'biometric' as const, label: 'Biometric', icon: Fingerprint },
              ].map((m) => {
                const Icon = m.icon;
                const isSel = verificationMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setVerificationMethod(m.id)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                      isSel
                        ? 'bg-[#00535b] border-teal-400 text-white shadow-sm'
                        : 'bg-[#141d1f] border-white/10 text-[#9aa8ab] hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {verificationMethod === 'otp' && (
              <div className="space-y-3">
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit code (e.g., 992144)"
                  className="w-full text-center text-xl tracking-widest font-mono py-2.5 rounded-xl border border-white/20 bg-[#141d1f] text-white focus:outline-none focus:border-[#9ff0fb]"
                />
                <button
                  type="button"
                  onClick={() => setOtpCode('992144')}
                  className="text-xs text-[#9ff0fb] hover:underline"
                >
                  Auto-fill demo code (992144)
                </button>
              </div>
            )}

            {verificationMethod === 'biometric' && (
              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-400/20 text-xs text-[#9ff0fb] flex items-center justify-center gap-2">
                <Fingerprint className="w-5 h-5 animate-pulse" />
                <span>Touch security key or device sensor</span>
              </div>
            )}

            {verificationMethod === 'sso' && (
              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-400/20 text-xs text-[#9ff0fb]">
                AIIMS Hospital Single Sign-On Verified ✓
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="flex-1 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-[#9aa8ab] hover:bg-white/5"
              >
                Back
              </button>
              <button
                id="btn-doc-verify-final"
                type="button"
                disabled={isLoading}
                onClick={handleFinalVerify}
                className="flex-1 py-2.5 rounded-xl bg-[#00535b] hover:bg-[#006d77] text-white text-xs font-bold border border-teal-400/40 flex items-center justify-center gap-1.5 shadow-md"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Enter Dashboard →'}
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="w-full max-w-md mx-auto text-center pt-2 text-xs text-[#6f797a]">
        AyushSetu Clinical Gateway • ABDM & HIPAA-aligned encryption
      </footer>
    </main>
  );
};
