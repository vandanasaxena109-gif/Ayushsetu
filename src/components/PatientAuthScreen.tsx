import React, { useState } from 'react';
import { 
  LanguageOption, 
  PatientAuthData, 
  LanguageId 
} from '../types';
import { 
  User, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Headphones, 
  Check, 
  Sparkles, 
  CreditCard, 
  KeyRound, 
  AlertCircle,
  QrCode,
  Users
} from 'lucide-react';

interface PatientAuthScreenProps {
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  onSelectLanguage: (lang: LanguageId) => void;
  patientAuth: PatientAuthData;
  onUpdatePatientAuth: (data: PatientAuthData) => void;
  onContinue: () => void;
  onBack: () => void;
  onStaffHelp: () => void;
}

export const PatientAuthScreen: React.FC<PatientAuthScreenProps> = ({
  currentLanguage,
  languages,
  onSelectLanguage,
  patientAuth,
  onUpdatePatientAuth,
  onContinue,
  onBack,
  onStaffHelp,
}) => {
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [errors, setErrors] = useState<{ name?: string; age?: string; phone?: string; gender?: string }>({});
  
  // Login / OTP state
  const [loginPhone, setLoginPhone] = useState<string>('9823411200');
  const [otpValue, setOtpValue] = useState<string>('789012');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  // Local copy of registration form data
  const [formData, setFormData] = useState<PatientAuthData>({
    name: patientAuth.name || '',
    age: patientAuth.age || '',
    gender: patientAuth.gender || '',
    phone: patientAuth.phone ? patientAuth.phone.replace('+91 ', '') : '',
    abhaId: patientAuth.abhaId || '',
  });

  const demoProfiles = [
    {
      name: 'Shri Ramswaroop Sharma',
      age: 65,
      gender: 'Male' as const,
      phone: '9823411200',
      abhaId: '91-4523-8890-1234',
      tag: 'Elderly • Follow-up OPD'
    },
    {
      name: 'Smt. Priya Patel',
      age: 34,
      gender: 'Female' as const,
      phone: '9876543210',
      abhaId: '91-8890-1234-5678',
      tag: 'New Consultation'
    },
    {
      name: 'Kavita Deshmukh',
      age: 48,
      gender: 'Female' as const,
      phone: '9422088910',
      abhaId: '91-3321-7789-9901',
      tag: 'Ayurveda Kiosk'
    }
  ];

  const handleApplyPreset = (profile: typeof demoProfiles[0]) => {
    const updated: PatientAuthData = {
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      phone: profile.phone,
      abhaId: profile.abhaId,
    };
    setFormData(updated);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; age?: string; phone?: string; gender?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = currentLanguage.id === 'hi' ? 'कृपया मरीज का नाम दर्ज करें' : 'Please enter patient full name';
    }

    if (!formData.age || Number(formData.age) <= 0 || Number(formData.age) > 120) {
      newErrors.age = currentLanguage.id === 'hi' ? 'मान्य आयु दर्ज करें (1-120)' : 'Please enter valid age (1-120)';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = currentLanguage.id === 'hi' ? '10 अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter valid 10-digit mobile number';
    }

    if (!formData.gender) {
      newErrors.gender = currentLanguage.id === 'hi' ? 'कृपया लिंग चुनें' : 'Please select gender / sex';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validateForm()) {
      onUpdatePatientAuth({
        ...formData,
        phone: formData.phone.startsWith('+91') ? formData.phone : `+91 ${formData.phone.replace(/\D/g, '')}`,
      });
      onContinue();
    }
  };

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    // Simulate successful login
    setLoginSuccess(true);
    setTimeout(() => {
      onUpdatePatientAuth({
        name: 'Shri Ramswaroop Sharma',
        age: 65,
        gender: 'Male',
        phone: `+91 ${loginPhone}`,
        abhaId: '91-4523-8890-1234'
      });
      onContinue();
    }, 600);
  };

  return (
    <main 
      id="patient-auth-screen"
      className="flex-grow flex flex-col items-center justify-center py-4 sm:py-8 pb-28 sm:pb-12 px-3 sm:px-6 w-full max-w-[1000px] mx-auto min-h-screen"
    >
      {/* Header Bar with Language Switcher */}
      <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="self-start flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLanguage.id === 'hi' ? 'भाषा बदलें' : 'Change Language'}</span>
        </button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-[#3e494a] hidden sm:inline">Active Language:</span>
          <select
            value={currentLanguage.id}
            onChange={(e) => onSelectLanguage(e.target.value as LanguageId)}
            className="bg-white border border-[#bec8ca]/50 text-[#00535b] font-bold text-xs sm:text-sm rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-[#00535b]"
          >
            {languages.map((l) => (
              <option key={l.id} value={l.id}>
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Form Container */}
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-[0px_4px_24px_rgba(0,109,119,0.08)] border border-[#bec8ca]/30 overflow-hidden">
        {/* Top Banner */}
        <div className="bg-[#00535b] text-white p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#a9ece5] text-[#00535b] text-[10px] sm:text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                Step 1 of 6 • Patient Intake
              </span>
              <span className="text-white/70 text-xs hidden sm:inline">• AyushSetu Digital Kiosk</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {currentLanguage.id === 'hi' ? 'मरीज पंजीकरण / लॉगिन' : 'Patient Registration & Check-In'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 mt-0.5">
              {currentLanguage.id === 'hi' 
                ? 'डॉक्टर से मिलने से पहले कृपया अपनी प्राथमिक जानकारी दर्ज करें।' 
                : 'Please enter patient demographic details before clinical pre-intake.'}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="bg-black/20 p-1 rounded-xl flex self-start sm:self-center shrink-0 border border-white/10">
            <button
              id="tab-register-btn"
              onClick={() => setAuthMode('register')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                authMode === 'register' 
                  ? 'bg-white text-[#00535b] shadow-xs' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {currentLanguage.id === 'hi' ? 'नया पंजीकरण' : 'New Check-In'}
            </button>
            <button
              id="tab-login-btn"
              onClick={() => setAuthMode('login')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                authMode === 'login' 
                  ? 'bg-white text-[#00535b] shadow-xs' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {currentLanguage.id === 'hi' ? 'मोबाइल / ABHA लॉगिन' : 'Mobile / ABHA'}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-7 md:p-8">
          {authMode === 'register' ? (
            <div>
              {/* Quick Demo Profile Presets */}
              <div className="mb-6 bg-[#f2fbfe] border border-[#bec8ca]/30 rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#00535b] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {currentLanguage.id === 'hi' ? 'त्वरित डेमो प्रोफाइल (1-क्लिक टेस्ट)' : 'Quick 1-Click Demo Profiles'}
                  </span>
                  <span className="text-[10px] text-[#3e494a]">Tap to auto-fill</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {demoProfiles.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="text-left bg-white hover:bg-[#a9ece5]/20 border border-[#bec8ca]/40 rounded-lg p-2.5 transition-all text-xs group focus:outline-none focus:ring-1 focus:ring-[#00535b]"
                    >
                      <div className="font-bold text-[#141d1f] group-hover:text-[#00535b] truncate">{p.name}</div>
                      <div className="text-[11px] text-[#3e494a] flex items-center gap-1 mt-0.5">
                        <span>{p.age} Yrs</span> • <span>{p.gender}</span> • <span>+91 {p.phone.slice(-4)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Name & Age Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label 
                      htmlFor="patient-name-input"
                      className="block text-xs sm:text-sm font-bold text-[#141d1f] mb-1.5"
                    >
                      {currentLanguage.id === 'hi' ? 'मरीज का पूरा नाम *' : 'Patient Full Name *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6f797a]">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input
                        id="patient-name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder={currentLanguage.id === 'hi' ? 'उदा. रामस्वरूप शर्मा' : 'e.g. Rajesh Kumar'}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 ${
                          errors.name 
                            ? 'border-red-500 bg-red-50 focus:ring-red-400' 
                            : 'border-[#bec8ca]/60 bg-[#fbfdfd] focus:border-[#00535b] focus:ring-[#00535b]/20'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label 
                      htmlFor="patient-age-input"
                      className="block text-xs sm:text-sm font-bold text-[#141d1f] mb-1.5"
                    >
                      {currentLanguage.id === 'hi' ? 'आयु (वर्ष) *' : 'Age (Years) *'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6f797a]">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input
                        id="patient-age-input"
                        type="number"
                        min="1"
                        max="120"
                        required
                        value={formData.age}
                        onChange={(e) => {
                          const val = e.target.value ? parseInt(e.target.value, 10) : '';
                          setFormData({ ...formData, age: val });
                          if (errors.age) setErrors({ ...errors, age: undefined });
                        }}
                        placeholder="e.g. 45"
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 ${
                          errors.age 
                            ? 'border-red-500 bg-red-50 focus:ring-red-400' 
                            : 'border-[#bec8ca]/60 bg-[#fbfdfd] focus:border-[#00535b] focus:ring-[#00535b]/20'
                        }`}
                      />
                    </div>
                    {errors.age && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.age}
                      </p>
                    )}
                  </div>
                </div>

                {/* Gender (Sex) & Mobile Number Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Sex / Gender Selector */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#141d1f] mb-1.5">
                      {currentLanguage.id === 'hi' ? 'लिंग / Sex *' : 'Gender / Sex *'}
                    </label>
                    <div className="grid grid-cols-3 gap-2" id="gender-selection-group">
                      {(['Male', 'Female', 'Other'] as const).map((genderOption) => {
                        const isSelected = formData.gender === genderOption;
                        return (
                          <button
                            key={genderOption}
                            type="button"
                            id={`gender-btn-${genderOption.toLowerCase()}`}
                            onClick={() => {
                              setFormData({ ...formData, gender: genderOption });
                              if (errors.gender) setErrors({ ...errors, gender: undefined });
                            }}
                            className={`min-h-[44px] py-2 sm:py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#00535b] text-white border-[#00535b] shadow-xs'
                                : 'bg-[#f2fbfe] border-[#bec8ca]/50 text-[#141d1f] hover:bg-[#e6eff2]'
                            }`}
                          >
                            <span>
                              {genderOption === 'Male' && (currentLanguage.id === 'hi' ? 'पुरुष' : 'Male')}
                              {genderOption === 'Female' && (currentLanguage.id === 'hi' ? 'महिला' : 'Female')}
                              {genderOption === 'Other' && (currentLanguage.id === 'hi' ? 'अन्य' : 'Other')}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                    {errors.gender && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.gender}
                      </p>
                    )}
                  </div>

                  {/* Phone / Mobile Number */}
                  <div>
                    <label 
                      htmlFor="patient-phone-input"
                      className="block text-xs sm:text-sm font-bold text-[#141d1f] mb-1.5"
                    >
                      {currentLanguage.id === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number (for SMS & Token) *'}
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#bec8ca]/60 bg-[#ecf5f8] text-[#00535b] font-bold text-xs sm:text-sm">
                        +91
                      </span>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6f797a]">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          id="patient-phone-input"
                          type="tel"
                          required
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => {
                            const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData({ ...formData, phone: clean });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="98234 11200"
                          className={`w-full pl-9 pr-4 py-2.5 sm:py-3 rounded-r-xl border text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 ${
                            errors.phone 
                              ? 'border-red-500 bg-red-50 focus:ring-red-400' 
                              : 'border-[#bec8ca]/60 bg-[#fbfdfd] focus:border-[#00535b] focus:ring-[#00535b]/20'
                          }`}
                        />
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Optional ABHA ID Section */}
                <div className="pt-2">
                  <div className="bg-[#fbfdfd] border border-[#bec8ca]/40 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <label 
                        htmlFor="patient-abha-input"
                        className="text-xs sm:text-sm font-bold text-[#141d1f] flex items-center gap-2"
                      >
                        <CreditCard className="w-4 h-4 text-[#00535b]" />
                        <span>{currentLanguage.id === 'hi' ? 'ABHA स्वास्थ्य खाता संख्या (वैकल्पिक)' : 'ABHA Health ID / Card (Optional)'}</span>
                      </label>
                      <span className="text-[10px] font-bold text-[#006d77] bg-[#a9ece5]/40 px-2 py-0.5 rounded-full">
                        ABDM Integrated
                      </span>
                    </div>
                    <input
                      id="patient-abha-input"
                      type="text"
                      value={formData.abhaId || ''}
                      onChange={(e) => setFormData({ ...formData, abhaId: e.target.value })}
                      placeholder="e.g. 91-4523-8890-1234 or yourname@abdm"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#bec8ca]/50 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00535b]/20 focus:border-[#00535b]"
                    />
                    <p className="text-[11px] text-[#3e494a] mt-1.5">
                      Linking ABHA allows automatic fetching of past hospital discharge summaries and lab records.
                    </p>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#bec8ca]/30">
                  <button
                    type="button"
                    onClick={onStaffHelp}
                    className="order-2 sm:order-1 text-xs sm:text-sm font-semibold text-[#00535b] hover:underline flex items-center gap-1.5 py-2"
                  >
                    <Headphones className="w-4 h-4" />
                    <span>{currentLanguage.id === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Help at Kiosk?'}</span>
                  </button>

                  <button
                    id="submit-patient-auth-btn"
                    type="submit"
                    className="order-1 sm:order-2 w-full sm:w-auto min-h-[48px] bg-[#00535b] hover:bg-[#006d77] text-white px-8 py-3 rounded-xl font-bold text-sm sm:text-base shadow-[0px_4px_12px_rgba(0,109,119,0.15)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>{currentLanguage.id === 'hi' ? 'सहमति और लक्षण जांच पर आगे बढ़ें' : 'Proceed to Privacy & Voice Intake'}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Login with Mobile / ABHA Mode */
            <div className="max-w-md mx-auto py-2">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#ecf5f8] text-[#00535b] flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#141d1f]">
                  {currentLanguage.id === 'hi' ? 'मोबाइल नंबर से साइन इन करें' : 'Quick Sign In with Mobile OTP'}
                </h3>
                <p className="text-xs text-[#3e494a]">
                  Fetch your registered OPD profile and medical record history instantly.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="login-phone-input"
                    className="block text-xs font-bold text-[#141d1f] mb-1"
                  >
                    Registered Mobile Number
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#bec8ca]/60 bg-[#ecf5f8] text-[#00535b] font-bold text-xs sm:text-sm">
                      +91
                    </span>
                    <input
                      id="login-phone-input"
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9823411200"
                      className="w-full pl-3 pr-4 py-2.5 rounded-r-xl border border-[#bec8ca]/60 text-sm font-medium focus:ring-2 focus:ring-[#00535b]"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="bg-[#f2fbfe] border border-[#bec8ca]/40 rounded-xl p-3 animate-in fade-in">
                    <label 
                      htmlFor="login-otp-input"
                      className="block text-xs font-bold text-[#00535b] mb-1"
                    >
                      Enter 6-Digit OTP (Simulated)
                    </label>
                    <input
                      id="login-otp-input"
                      type="text"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      placeholder="789012"
                      className="w-full px-3 py-2 rounded-lg border border-[#00535b] text-center font-mono text-lg tracking-widest"
                    />
                    <p className="text-[11px] text-[#236863] mt-1 text-center">
                      Auto-filled OTP: <strong>789012</strong> (Sent to +91 {loginPhone})
                    </p>
                  </div>
                )}

                <button
                  id="login-action-btn"
                  type="submit"
                  disabled={loginSuccess}
                  className="w-full min-h-[48px] bg-[#00535b] hover:bg-[#006d77] text-white py-3 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {loginSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Verified! Loading Profile...</span>
                    </>
                  ) : !otpSent ? (
                    <>
                      <span>Send Verification OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Verify & Continue Intake</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-xs text-[#00535b] font-semibold hover:underline"
                  >
                    New to clinic? Create new check-in instead
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
