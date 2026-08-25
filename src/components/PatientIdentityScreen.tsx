import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { LanguageOption, PatientAuthData } from '../types';
import { getTranslation } from '../data/translations';

interface PatientIdentityScreenProps {
  currentLanguage: LanguageOption;
  patientAuth: PatientAuthData;
  onUpdatePatientAuth: (data: PatientAuthData) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const PatientIdentityScreen: React.FC<PatientIdentityScreenProps> = ({
  currentLanguage,
  patientAuth,
  onUpdatePatientAuth,
  onContinue,
  onBack,
}) => {
  const t = getTranslation(currentLanguage.id);
  const [formData, setFormData] = useState<PatientAuthData>({
    name: patientAuth.name || '',
    age: patientAuth.age || '',
    gender: patientAuth.gender || '',
    phone: patientAuth.phone ? patientAuth.phone.replace('+91 ', '') : '',
    abhaId: patientAuth.abhaId || '',
    ayushmanCard: patientAuth.ayushmanCard || '',
  });

  const [errors, setErrors] = useState<{ name?: string; age?: string; gender?: string; phone?: string }>({});

  const demoPresets = [
    { name: 'Riya Sharma', age: 42, gender: 'Female' as const, phone: '9876544582' },
    { name: 'Ramswaroop Sharma', age: 65, gender: 'Male' as const, phone: '9823411200' },
    { name: 'Ananya Sen', age: 29, gender: 'Transgender' as const, phone: '9711044552' },
  ];

  const handleApplyPreset = (p: typeof demoPresets[0]) => {
    setFormData({
      ...formData,
      name: p.name,
      age: p.age,
      gender: p.gender,
      phone: p.phone,
    });
    setErrors({});
  };

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!formData.name.trim()) {
      errs.name = `${t.fullName} ${t.required || 'is required'}`;
    }
    if (!formData.age || Number(formData.age) <= 0 || Number(formData.age) > 125) {
      errs.age = `${t.age} is invalid`;
    }
    if (!formData.gender) {
      errs.gender = `${t.gender} is required`;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = `${t.mobileNumber} (10 digits)`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onUpdatePatientAuth({
        ...formData,
        phone: formData.phone.startsWith('+91') ? formData.phone : `+91 ${formData.phone.replace(/\D/g, '')}`,
      });
      onContinue();
    }
  };

  return (
    <main 
      id="patient-identity-screen"
      className="min-h-screen bg-[#f2fbfe] flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none pb-24 sm:pb-10"
    >
      {/* Header */}
      <header className="w-full max-w-2xl mx-auto flex items-center justify-between py-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        <span className="text-xs font-extrabold text-[#00535b] bg-[#a9ece5]/40 px-3 py-1 rounded-full">
          Step 1 of 4 • Identity
        </span>
      </header>

      {/* Form Card */}
      <div className="w-full max-w-2xl mx-auto my-auto bg-white rounded-3xl p-6 sm:p-8 shadow-[0px_6px_24px_rgba(0,109,119,0.06)] border border-[#bec8ca]/30">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-[#141d1f] tracking-tight">
            {t.patientInfoTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#3e494a] mt-1 font-medium">
            {t.patientInfoSubtitle}
          </p>
        </div>

        {/* Quick Demo Fill */}
        <div className="mb-6 bg-[#f2fbfe] p-3 rounded-2xl border border-[#bec8ca]/40 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#00535b] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Demo Fill:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {demoPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="bg-white hover:bg-[#a9ece5]/30 text-[#00535b] border border-[#00535b]/30 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                {preset.name} ({preset.gender[0]}, {preset.age})
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label 
              htmlFor="identity-name"
              className="block text-xs sm:text-sm font-bold text-[#141d1f] mb-1.5"
            >
              {t.fullName} *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6f797a]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="identity-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder={t.fullName}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm sm:text-base font-medium transition-all focus:outline-none focus:ring-2 ${
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

          {/* Age & Sex Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Age */}
            <div>
              <label 
                htmlFor="identity-age"
                className="block text-xs sm:text-sm font-bold text-[#141d1f] mb-1.5"
              >
                {t.age} *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6f797a]">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  id="identity-age"
                  type="number"
                  min="1"
                  max="125"
                  value={formData.age}
                  onChange={(e) => {
                    const val = e.target.value ? parseInt(e.target.value, 10) : '';
                    setFormData({ ...formData, age: val });
                    if (errors.age) setErrors({ ...errors, age: undefined });
                  }}
                  placeholder={t.age}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm sm:text-base font-medium transition-all focus:outline-none focus:ring-2 ${
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

            {/* Sex / Large Selectable Cards */}
            <div className="sm:col-span-2">
              <label className="block text-xs sm:text-sm font-bold text-[#141d1f] mb-1.5">
                {t.gender} *
              </label>
              <div className="grid grid-cols-3 gap-2" id="sex-selection-cards">
                {(['Male', 'Female', 'Transgender'] as const).map((genderOption) => {
                  const isSelected = formData.gender === genderOption;
                  const label = genderOption === 'Male' ? t.male : genderOption === 'Female' ? t.female : t.other;
                  return (
                    <button
                      key={genderOption}
                      type="button"
                      id={`sex-btn-${genderOption.toLowerCase()}`}
                      onClick={() => {
                        setFormData({ ...formData, gender: genderOption });
                        if (errors.gender) setErrors({ ...errors, gender: undefined });
                      }}
                      className={`min-h-[48px] py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#00535b] text-white border-[#00535b] shadow-xs'
                          : 'bg-[#f2fbfe] border-[#bec8ca]/50 text-[#141d1f] hover:bg-[#e6eff2]'
                      }`}
                    >
                      <span>{label}</span>
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
          </div>

          {/* Mobile Number */}
          <div>
            <label 
              htmlFor="identity-phone"
              className="block text-xs sm:text-sm font-bold text-[#141d1f] mb-1.5"
            >
              {t.mobileNumber} *
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#bec8ca]/60 bg-[#ecf5f8] text-[#00535b] font-extrabold text-sm">
                +91
              </span>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6f797a]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="identity-phone"
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, phone: clean });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="10-digit mobile number"
                  className={`w-full pl-10 pr-4 py-3 rounded-r-xl border text-sm sm:text-base font-medium transition-all focus:outline-none focus:ring-2 ${
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

          {/* Submit Button */}
          <div className="pt-4">
            <button
              id="btn-identity-continue"
              type="submit"
              className="w-full min-h-[50px] bg-[#00535b] hover:bg-[#006d77] text-white py-3 px-6 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <span>{t.continueBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-2xl mx-auto text-center pt-2">
        <p className="text-xs text-[#6f797a]">
          AyushSetu • ABDM Compliant Digital Intake
        </p>
      </div>
    </main>
  );
};
