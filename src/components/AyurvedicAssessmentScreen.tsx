import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Utensils, 
  Waves, 
  Frown, 
  Moon, 
  Sparkles, 
  Heart, 
  CheckCircle, 
  HelpCircle, 
  User, 
  Globe 
} from 'lucide-react';
import { AYURVEDIC_QUESTIONS } from '../data/mockData';
import { AyurvedicAssessmentState, LanguageOption, LanguageId } from '../types';
import { getTranslation } from '../data/translations';

interface AyurvedicAssessmentScreenProps {
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  onSelectLanguage: (lang: LanguageId) => void;
  assessmentState: AyurvedicAssessmentState;
  onUpdateAssessment: (key: keyof AyurvedicAssessmentState, value: string) => void;
  onFinish: () => void;
  onBack: () => void;
  onStaffHelp: () => void;
}

export const AyurvedicAssessmentScreen: React.FC<AyurvedicAssessmentScreenProps> = ({
  currentLanguage,
  languages,
  onSelectLanguage,
  assessmentState,
  onUpdateAssessment,
  onFinish,
  onBack,
  onStaffHelp,
}) => {
  const t = getTranslation(currentLanguage.id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showLangMenu, setShowLangMenu] = useState<boolean>(false);

  const currentQ = AYURVEDIC_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / AYURVEDIC_QUESTIONS.length) * 100);

  const handleSelectOption = (optionId: string) => {
    onUpdateAssessment(currentQ.id as keyof AyurvedicAssessmentState, optionId);
  };

  const handleNext = () => {
    if (currentQuestionIndex < AYURVEDIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onBack();
    }
  };

  const currentSelectedVal = assessmentState[currentQ.id as keyof AyurvedicAssessmentState] || '';

  return (
    <div id="ayurvedic-assessment-screen" className="min-h-screen bg-[#f2fbfe] flex flex-col pb-24">
      {/* TopNavBar */}
      <header className="bg-white border-b border-[#bec8ca]/30 sticky top-0 z-40 shadow-xs">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1200px] mx-auto h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-bold text-xl shadow-sm">
              आ
            </div>
            <span className="text-2xl font-bold text-[#00535b] tracking-tight">{t.appName}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Pill */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 hover:bg-[#a9ece5]/20 transition-colors px-3 py-1.5 rounded-lg border border-[#bec8ca]/30 text-[#00535b] font-semibold text-sm cursor-pointer"
              >
                <Globe className="w-4 h-4" />
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
                      className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#a9ece5]/20 cursor-pointer ${
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

            <button 
              onClick={onStaffHelp}
              className="p-2 text-[#00535b] hover:bg-[#e6eff2] rounded-full transition-colors cursor-pointer"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#a9ece5] text-[#00535b] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col p-3 sm:p-4 md:p-8 pb-28 sm:pb-12 max-w-[1000px] mx-auto w-full">
        {/* Progress & Header Section */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <button
              id="assessment-back-btn"
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#bec8ca]/50 bg-white flex items-center justify-center text-[#00535b] hover:bg-[#e6eff2] shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex-grow">
              <div className="w-full bg-[#e6eff2] rounded-full h-2.5 sm:h-3 overflow-hidden shadow-inner">
                <div 
                  className="bg-[#00535b] h-full rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1.5 sm:mt-2 text-xs md:text-sm font-semibold text-[#3e494a]">
                <span>{currentQ.section}</span>
                <span>Question {currentQuestionIndex + 1} of {AYURVEDIC_QUESTIONS.length}</span>
              </div>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00535b] mb-1">
            {t.ayurvedicAssessmentTitle}
          </h1>
          <p className="text-xs sm:text-base text-[#3e494a]">
            {t.ayurvedicAssessmentSubtitle}
          </p>
        </div>

        {/* Assessment Form Area */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,109,119,0.06)] border border-[#bec8ca]/30 flex-grow flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#141d1f]">
              {currentQ.question}
            </h2>
            {currentLanguage.id === 'hi' && (
              <span className="text-xs sm:text-sm font-medium text-[#236863] bg-[#ecf5f8] px-3 py-1 rounded-full self-start sm:self-auto">
                {currentQ.questionHindi}
              </span>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 flex-grow content-start">
            {currentQ.options.map((opt) => {
              const isSelected = currentSelectedVal === opt.id;
              return (
                <div
                  key={opt.id}
                  id={`option-${opt.id.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-6 transition-all flex flex-col gap-3 sm:gap-4 border-2 relative min-h-[110px] sm:min-h-[140px] ${
                    isSelected
                      ? 'border-[#00535b] bg-[#f2fbfe] shadow-[0px_4px_16px_rgba(0,109,119,0.12)]'
                      : 'border-[#bec8ca]/40 bg-white hover:bg-[#f2fbfe]/50 hover:border-[#236863]/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-[#006d77] text-white shadow-xs' : 'bg-[#e6eff2] text-[#00535b]'
                    }`}>
                      {opt.icon === 'restaurant' && <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'waves' && <Waves className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'sentiment_dissatisfied' && <Frown className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'bedtime' && <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'nights_stay' && <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'snooze' && <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'check_circle' && <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'priority_high' && <Waves className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'bolt' && <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'self_improvement' && <Heart className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'psychology' && <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
                      {opt.icon === 'local_fire_department' && <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </div>

                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#00535b] bg-white' : 'border-[#6f797a]'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-[#00535b]"></div>}
                    </div>
                  </div>

                  <div>
                    <div className="text-base sm:text-lg font-bold text-[#141d1f] mb-0.5 sm:mb-1">
                      {opt.title}
                    </div>
                    <div className="text-xs sm:text-sm text-[#3e494a] leading-relaxed">
                      {opt.desc}
                    </div>
                  </div>

                  <div className="mt-auto pt-2">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#006d77] bg-[#a9ece5]/30 px-2 py-0.5 rounded-md">
                      Prakriti: {opt.dosha}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Area */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#bec8ca]/30 flex justify-between items-center gap-3">
            <button
              id="assessment-skip-btn"
              onClick={handleNext}
              className="text-[#00535b] font-semibold text-sm sm:text-base hover:underline underline-offset-4 px-2 sm:px-3 py-2 cursor-pointer"
            >
              Skip for now
            </button>

            <button
              id="assessment-next-btn"
              onClick={handleNext}
              className="bg-[#00535b] hover:bg-[#006d77] text-white rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 font-bold text-sm sm:text-base shadow-[0px_4px_12px_rgba(0,109,119,0.15)] transition-all flex items-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <span>{currentQuestionIndex === AYURVEDIC_QUESTIONS.length - 1 ? t.continueBtn : 'Next'}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
