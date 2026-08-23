import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Volume2, 
  HelpCircle, 
  Search, 
  User, 
  Globe, 
  ArrowRight, 
  AlertTriangle,
  Stethoscope,
  Activity,
  Flame,
  Wind
} from 'lucide-react';
import { SYMPTOM_OPTIONS } from '../data/mockData';
import { LanguageOption, LanguageId } from '../types';

interface VoiceIntakeScreenProps {
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  onSelectLanguage: (lang: LanguageId) => void;
  liveTranscript: string;
  onUpdateTranscript: (text: string) => void;
  selectedSymptoms: string[];
  onToggleSymptom: (symptomName: string) => void;
  onContinue: () => void;
  onTriggerUrgentAlert: (reason: string) => void;
  onNeedHelp: () => void;
}

export const VoiceIntakeScreen: React.FC<VoiceIntakeScreenProps> = ({
  currentLanguage,
  languages,
  onSelectLanguage,
  liveTranscript,
  onUpdateTranscript,
  selectedSymptoms,
  onToggleSymptom,
  onContinue,
  onTriggerUrgentAlert,
  onNeedHelp,
}) => {
  const [isListening, setIsListening] = useState<boolean>(true);
  const [speechState, setSpeechState] = useState<'listening' | 'understanding' | 'idle'>('listening');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showLangMenu, setShowLangMenu] = useState<boolean>(false);

  // Suggested demo speech phrases
  const demoPhrases = [
    'My stomach has been hurting since morning.',
    'I have severe chest pain radiating to my left arm.',
    'Persistent dry cough and mild evening fever for 2 weeks.',
    'Experiencing heavy gas, bloating, and irregular appetite.',
    'Dizziness with headache after skipped meals.'
  ];

  // Speech Recognition hook
  useEffect(() => {
    let recognition: any = null;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition && isListening) {
      try {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = currentLanguage.id === 'hi' ? 'hi-IN' : currentLanguage.id === 'mr' ? 'mr-IN' : 'en-US';

        recognition.onresult = (event: any) => {
          setSpeechState('understanding');
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          if (transcript) {
            onUpdateTranscript(transcript);
            
            // Check for red flags
            const lower = transcript.toLowerCase();
            if (lower.includes('chest') || lower.includes('heart') || lower.includes('छाती') || lower.includes('सांस')) {
              onTriggerUrgentAlert('Chest pain with radiating symptoms detected via voice transcript.');
            }
          }
          setTimeout(() => setSpeechState('listening'), 800);
        };

        recognition.onerror = () => {
          // graceful fallback
        };

        recognition.start();
      } catch (err) {
        console.log('Speech recognition fallback enabled');
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {}
      }
    };
  }, [isListening, currentLanguage]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setSpeechState('idle');
    } else {
      setIsListening(true);
      setSpeechState('listening');
    }
  };

  const handleSpeakTranscript = () => {
    if ('speechSynthesis' in window && liveTranscript) {
      setIsPlayingAudio(true);
      const utterance = new SpeechSynthesisUtterance(liveTranscript);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  const handleSymptomClick = (symptom: typeof SYMPTOM_OPTIONS[0]) => {
    onToggleSymptom(symptom.name);
    
    // Auto-update transcript preview if empty or preset
    if (!liveTranscript || liveTranscript === 'My stomach has been hurting since morning.') {
      onUpdateTranscript(`I am experiencing ${symptom.name.toLowerCase()} since yesterday.`);
    }

    if (symptom.isRedFlag) {
      onTriggerUrgentAlert(`Severe ${symptom.name} reported. Immediate triage required.`);
    }
  };

  return (
    <div id="voice-intake-screen" className="min-h-screen bg-[#f2fbfe] flex flex-col relative pb-24">
      {/* TopNavBar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#bec8ca]/30 shadow-xs">
        <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-[1200px] mx-auto h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-bold text-xl shadow-sm">
              A
            </div>
            <span className="text-2xl font-bold text-[#00535b] tracking-tight">AyushSetu</span>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Search Bar Placeholder */}
            <div className="hidden md:flex items-center bg-[#e6eff2] rounded-full px-4 py-2 w-64 border border-[#bec8ca]/30">
              <Search className="w-4 h-4 text-[#3e494a] mr-2" />
              <input
                type="text"
                placeholder="Search symptoms or tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm text-[#141d1f] placeholder-[#3e494a]/70 w-full"
              />
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                id="voice-lang-btn"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 hover:bg-[#a9ece5]/20 transition-colors px-3 py-1.5 rounded-lg border border-[#bec8ca]/30 text-[#00535b] font-semibold text-sm"
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

            {/* Utility icons */}
            <div className="flex items-center gap-1">
              <button 
                onClick={onNeedHelp}
                aria-label="Help" 
                className="p-2 text-[#00535b] hover:bg-[#e6eff2] rounded-full transition-colors"
              >
                <HelpCircle className="w-6 h-6" />
              </button>
              <div className="w-9 h-9 rounded-full bg-[#a9ece5] text-[#00535b] flex items-center justify-center font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-3 sm:p-4 md:p-8 pb-28 sm:pb-12 w-full max-w-[1000px] mx-auto">
        {/* Header Text */}
        <div className="text-center mb-5 sm:mb-8 w-full max-w-2xl">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#141d1f] mb-1.5 sm:mb-2 tracking-tight">
            What is bothering you today?
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#3e494a]">
            Speak naturally in your preferred language.
          </p>
        </div>

        {/* Central Mic Interaction Area */}
        <div className="relative flex flex-col items-center justify-center mb-6 sm:mb-8 w-full">
          {/* Concentric Pulse Rings */}
          {isListening && (
            <>
              <div className="absolute w-36 h-36 sm:w-44 sm:h-44 bg-[#006d77]/20 rounded-full animate-pulse-ring pointer-events-none"></div>
              <div className="absolute w-36 h-36 sm:w-44 sm:h-44 bg-[#006d77]/10 rounded-full animate-pulse-ring-slow pointer-events-none"></div>
            </>
          )}

          {/* Mic Button */}
          <button
            id="mic-action-btn"
            onClick={toggleListening}
            className={`relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-[0px_8px_24px_rgba(0,109,119,0.25)] flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 group ${
              isListening ? 'bg-[#00535b] text-white' : 'bg-[#6f797a] text-white'
            }`}
          >
            <Mic className="w-12 h-12 sm:w-16 sm:h-16 transition-transform group-hover:scale-110" />
          </button>

          {/* Status Text with Animated Dots */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center h-8">
            {speechState === 'listening' && (
              <div className="text-sm sm:text-base font-semibold text-[#00535b] flex items-center gap-2 sm:gap-3">
                <span>Listening</span>
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00535b] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#00535b] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#00535b] animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            )}
            {speechState === 'understanding' && (
              <div className="text-sm sm:text-base font-semibold text-[#236863] flex items-center gap-2 sm:gap-3">
                <span>Processing Indian Language</span>
                <span className="w-2 h-2 rounded-full bg-[#236863] animate-ping"></span>
              </div>
            )}
            {speechState === 'idle' && (
              <span className="text-xs sm:text-sm font-medium text-[#3e494a]">
                Mic paused. Tap to start speaking.
              </span>
            )}
          </div>

          {/* Quick Voice Demo Selector Chips */}
          <div className="mt-2 sm:mt-3 flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-xl px-2">
            <span className="text-[11px] sm:text-xs text-[#3e494a] self-center">Try preset:</span>
            {demoPhrases.slice(0, 3).map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onUpdateTranscript(phrase);
                  if (phrase.includes('chest') || phrase.includes('arm')) {
                    onTriggerUrgentAlert('Chest pain with radiating symptoms reported.');
                  }
                }}
                className="text-[11px] sm:text-xs bg-white hover:bg-[#e6eff2] text-[#00535b] border border-[#bec8ca]/40 px-2.5 py-1 rounded-full transition-colors"
              >
                "{phrase.slice(0, 22)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Transcript Card */}
        <div 
          id="live-transcript-card"
          className="bg-white border border-[#bec8ca]/30 shadow-[0px_4px_16px_rgba(0,109,119,0.06)] rounded-2xl p-4 sm:p-6 w-full max-w-2xl mb-6 sm:mb-8 transition-all"
        >
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                <p className="text-[10px] sm:text-xs font-bold text-[#3e494a] uppercase tracking-wider">
                  Live Transcript
                </p>
                <span className="text-[10px] sm:text-xs text-[#006d77] bg-[#a9ece5]/40 px-2 py-0.5 rounded-full font-medium">
                  {currentLanguage.name} Voice
                </span>
              </div>
              <textarea
                id="transcript-textarea"
                rows={2}
                value={liveTranscript}
                onChange={(e) => onUpdateTranscript(e.target.value)}
                className="w-full bg-transparent border-0 focus:ring-0 p-0 text-base sm:text-lg md:text-xl text-[#141d1f] font-normal italic resize-none"
                placeholder="Spoken symptoms will appear here in real time..."
              />
            </div>
            <button
              id="audio-readout-btn"
              onClick={handleSpeakTranscript}
              aria-label="Listen"
              className={`flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-colors ${
                isPlayingAudio 
                  ? 'bg-[#00535b] text-white animate-pulse' 
                  : 'bg-[#e1eaed] hover:bg-[#bec8ca]/50 text-[#00535b]'
              }`}
            >
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Symptom Grid Fallback */}
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-end mb-2.5 sm:mb-3">
            <div>
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#141d1f]">
                Or tap symptoms manually
              </h2>
              <p className="text-[11px] sm:text-xs text-[#3e494a]">
                Select multiple if needed
              </p>
            </div>
            <span className="text-xs text-[#00535b] font-medium">
              {selectedSymptoms.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {SYMPTOM_OPTIONS.map((sym) => {
              const isSelected = selectedSymptoms.includes(sym.name);
              return (
                <button
                  key={sym.id}
                  id={`symptom-chip-${sym.id}`}
                  onClick={() => handleSymptomClick(sym)}
                  className={`rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1 sm:gap-1.5 transition-all text-center border relative ${
                    isSelected
                      ? 'bg-[#a9ece5]/30 border-[#00535b] shadow-xs'
                      : 'bg-white hover:bg-[#f2fbfe] border-[#bec8ca]/40 text-[#141d1f]'
                  } ${sym.isRedFlag ? 'hover:border-red-400' : ''}`}
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    sym.isRedFlag 
                      ? 'bg-red-50 text-red-600' 
                      : isSelected 
                      ? 'bg-[#00535b] text-white' 
                      : 'bg-[#ecf5f8] text-[#00535b]'
                  }`}>
                    {sym.id === 'chest' && <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {sym.id === 'fever' && <Flame className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {sym.id === 'cough' && <Wind className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {sym.id === 'stomach' && <Activity className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {sym.id === 'pain' && <Activity className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {sym.id === 'headache' && <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {sym.id === 'breath' && <Wind className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {sym.id === 'vomit' && <Activity className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-[#141d1f] mt-0.5 sm:mt-1">
                    {sym.name}
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#3e494a]">
                    {sym.hindi}
                  </span>

                  {sym.isRedFlag && (
                    <span className="text-[9px] sm:text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">
                      Red Flag
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Forward Navigation Bar */}
        <div className="mt-6 sm:mt-8 w-full max-w-2xl flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <button
            onClick={onNeedHelp}
            className="text-xs sm:text-sm text-[#00535b] font-semibold hover:underline flex items-center gap-1 order-2 sm:order-1"
          >
            <HelpCircle className="w-4 h-4" />
            Need assistance from desk?
          </button>

          <button
            id="voice-continue-btn"
            onClick={onContinue}
            className="w-full sm:w-auto bg-[#00535b] hover:bg-[#006d77] text-white px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-[0px_4px_12px_rgba(0,109,119,0.15)] transition-all flex items-center justify-center gap-2 active:scale-[0.98] order-1 sm:order-2"
          >
            <span>Proceed to Document Scan</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Floating Need Help FAB */}
      <button
        id="voice-help-fab"
        onClick={onNeedHelp}
        className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-30 bg-[#825b00] hover:bg-[#634500] text-white shadow-[0px_4px_16px_rgba(99,69,0,0.25)] rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3.5 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 font-semibold text-xs sm:text-base"
      >
        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Need Help?</span>
      </button>
    </div>
  );
};
