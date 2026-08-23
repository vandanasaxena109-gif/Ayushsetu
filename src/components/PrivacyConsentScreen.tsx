import React from 'react';
import { Lock, Sliders, Mic, Check, Headphones, Globe } from 'lucide-react';
import { LanguageOption, LanguageId } from '../types';

interface PrivacyConsentScreenProps {
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  onSelectLanguage: (lang: LanguageId) => void;
  consentChecked: boolean;
  onToggleConsent: (checked: boolean) => void;
  onContinue: () => void;
  onBack?: () => void;
  onStaffHelp: () => void;
}

export const PrivacyConsentScreen: React.FC<PrivacyConsentScreenProps> = ({
  currentLanguage,
  languages,
  onSelectLanguage,
  consentChecked,
  onToggleConsent,
  onContinue,
  onBack,
  onStaffHelp,
}) => {
  const [showLangMenu, setShowLangMenu] = React.useState(false);

  return (
    <main 
      id="privacy-consent-screen"
      className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 pb-24 sm:pb-8 relative"
    >
      {/* Top Header / Language Switcher Row */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-3 sm:mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-xs sm:text-sm font-semibold text-[#00535b] hover:bg-[#e6eff2] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>←</span>
            <span>{currentLanguage.id === 'hi' ? 'मरीज विवरण बदलें' : 'Back to Patient Details'}</span>
          </button>
        ) : (
          <div></div>
        )}

        <div className="relative">
          <button
            id="persistent-lang-toggle"
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="bg-white border border-[#bec8ca]/40 text-[#00535b] text-xs sm:text-sm font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-xs flex items-center gap-1.5 hover:bg-[#e6eff2] transition-colors"
          >
            <Globe className="w-4 h-4 text-[#00535b]" />
            <span>{currentLanguage.nativeName} ({currentLanguage.name})</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#bec8ca]/30 py-2 z-50 max-h-60 overflow-y-auto">
              {languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    onSelectLanguage(l.id);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#a9ece5]/20 ${
                    l.id === currentLanguage.id ? 'font-bold text-[#00535b] bg-[#e6eff2]' : 'text-[#141d1f]'
                  }`}
                >
                  <span>{l.nativeName}</span>
                  <span className="text-xs text-[#3e494a]">{l.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8">
        {/* Header Section */}
        <div className="text-center space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00535b]">
            Your Privacy Matters
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-[#236863]">
            आपकी गोपनीयता महत्वपूर्ण है
          </h2>
        </div>

        {/* Cards Container - Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Card 1: Private & Secure */}
          <div 
            id="privacy-card-security"
            className="bg-white border border-[#bec8ca]/30 rounded-2xl p-4 sm:p-6 shadow-xs flex items-start gap-3.5 sm:gap-4 hover:shadow-md transition-shadow"
          >
            <div className="bg-[#006d77] text-white p-2.5 sm:p-3 rounded-2xl flex-shrink-0 shadow-xs">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#141d1f] mb-1">
                Private & Secure
              </h3>
              <p className="text-xs sm:text-base text-[#3e494a] leading-relaxed">
                Your health information is shared only with your healthcare team. It is never sold or used for marketing.
              </p>
            </div>
          </div>

          {/* Card 2: You Are in Control */}
          <div 
            id="privacy-card-control"
            className="bg-white border border-[#bec8ca]/30 rounded-2xl p-4 sm:p-6 shadow-xs flex items-start gap-3.5 sm:gap-4 hover:shadow-md transition-shadow"
          >
            <div className="bg-[#a9ece5] text-[#00535b] p-2.5 sm:p-3 rounded-2xl flex-shrink-0 shadow-xs">
              <Sliders className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#141d1f] mb-1">
                You Are in Control
              </h3>
              <p className="text-xs sm:text-base text-[#3e494a] leading-relaxed">
                Skip any question you don't feel comfortable with. You can always discuss it in person later.
              </p>
            </div>
          </div>
        </div>

        {/* Voice Prompt Notice */}
        <div 
          id="privacy-voice-notice"
          className="bg-[#e6eff2] border-l-4 border-[#00535b] p-3.5 sm:p-4.5 rounded-r-xl flex items-center gap-3 sm:gap-4 shadow-xs"
        >
          <div className="text-[#00535b] flex-shrink-0 bg-white p-2 rounded-full">
            <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <p className="text-xs sm:text-base text-[#141d1f]">
            Voice responses are converted to text. Your audio is <strong>not saved</strong>.
          </p>
        </div>

        {/* Consent Checkbox */}
        <div className="bg-white border border-[#bec8ca]/30 rounded-2xl p-4 sm:p-6 shadow-xs">
          <label 
            htmlFor="consent-checkbox"
            className="flex items-center gap-3 sm:gap-4 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8">
              <input
                id="consent-checkbox"
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => onToggleConsent(e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                  consentChecked 
                    ? 'bg-[#00535b] border-[#00535b] text-white shadow-xs' 
                    : 'border-[#6f797a] group-hover:border-[#00535b] bg-white'
                }`}
              >
                {consentChecked && <Check className="w-4 h-4 text-white stroke-[3]" />}
              </div>
            </div>
            <span className="text-base sm:text-lg text-[#141d1f] font-medium group-hover:text-[#00535b] transition-colors">
              I understand and want to continue
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-1 sm:mt-2 justify-center w-full">
          <button
            id="privacy-continue-btn"
            disabled={!consentChecked}
            onClick={onContinue}
            className={`text-base sm:text-lg font-semibold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-full shadow-[0px_4px_12px_rgba(0,109,119,0.15)] transition-all flex-1 max-w-sm flex items-center justify-center gap-2 ${
              consentChecked
                ? 'bg-[#00535b] hover:bg-[#006d77] text-white cursor-pointer active:scale-[0.99]'
                : 'bg-[#00535b]/40 text-white/70 cursor-not-allowed'
            }`}
          >
            <span>Continue to Pre-Intake</span>
          </button>

          <button
            id="privacy-staff-help-btn"
            onClick={onStaffHelp}
            className="bg-white border-2 border-[#00535b] text-[#00535b] text-base sm:text-lg font-semibold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-full hover:bg-[#a9ece5]/20 transition-all flex-1 max-w-sm flex items-center justify-center gap-2"
          >
            <Headphones className="w-5 h-5" />
            <span>Ask Staff for Help</span>
          </button>
        </div>
      </div>
    </main>
  );
};
