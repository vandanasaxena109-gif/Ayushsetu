import React, { useState } from 'react';
import { 
  Stethoscope, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  Pill, 
  CheckCircle2, 
  Building2, 
  User, 
  Download, 
  Send,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { LanguageOption, PatientData } from '../types';

interface PatientConsultationScreenProps {
  currentLanguage: LanguageOption;
  patient: PatientData;
  onEndConsultation: () => void;
}

export const PatientConsultationScreen: React.FC<PatientConsultationScreenProps> = ({
  currentLanguage,
  patient,
  onEndConsultation,
}) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'doctor' | 'patient'; text: string; time: string }>>([
    {
      sender: 'doctor',
      text: `Namaste ${patient.name}. I have reviewed your voice intake and scanned records. We noticed the severe stomach pain and gastric irritation.`,
      time: '10:02 AM'
    },
    {
      sender: 'patient',
      text: 'Namaste Doctor. Yes, the pain started 3 days ago and feels worse after meals.',
      time: '10:03 AM'
    },
    {
      sender: 'doctor',
      text: 'I am prescribing Avipattikar Churna with warm water before meals, and continuing your Metformin safely with dietary adjustments.',
      time: '10:04 AM'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'video' | 'prescription' | 'chat'>('video');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      sender: 'patient' as const,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: 'Understood. Please follow the diet advice (avoid spicy & deep fried foods for 7 days). Let me know if symptoms persist.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }, 1200);
  };

  return (
    <main 
      id="patient-consultation-screen"
      className="min-h-screen bg-[#141d1f] text-white flex flex-col justify-between p-3 sm:p-6 select-none pb-24 sm:pb-8"
    >
      {/* Header Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00535b] text-white flex items-center justify-center font-bold shadow-md">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white">
                Live Consultation • OPD Room #4
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Connected
              </span>
            </div>
            <div className="text-xs text-[#9aa8ab] font-medium flex items-center gap-2">
              <span>Dr. Anand Sharma, MD (Ayush)</span>
              <span>•</span>
              <span className="text-[#9ff0fb]">Token: {patient.tokenNumber}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onEndConsultation}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
        >
          <PhoneOff className="w-4 h-4" />
          <span>End Consultation</span>
        </button>
      </header>

      {/* Main Grid */}
      <div className="w-full max-w-6xl mx-auto my-auto py-4 grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        {/* Left 2 Cols: Doctor & Patient Video Call Stage */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Main Video Viewfinder */}
          <div className="relative bg-[#1e292b] rounded-3xl overflow-hidden border border-white/10 flex-1 min-h-[340px] sm:min-h-[400px] flex items-center justify-center shadow-xl">
            {isVideoOn ? (
              <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-[#1e292b] to-[#141d1f]">
                {/* Doctor Avatar / Video Mock */}
                <div className="text-center p-6 space-y-3">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#00535b] to-[#236863] text-white flex items-center justify-center mx-auto shadow-2xl border-4 border-teal-400/40">
                    <Stethoscope className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Dr. Anand Sharma</h3>
                    <p className="text-xs text-[#9ff0fb]">Senior Ayush Consultant • AIIMS New Delhi</p>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-black/40 text-emerald-300 text-xs px-3 py-1 rounded-full backdrop-blur-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Audio & Video Encrypted (ABDM)</span>
                  </div>
                </div>

                {/* Patient PiP inset */}
                <div className="absolute bottom-4 right-4 w-28 sm:w-36 h-20 sm:h-24 bg-[#141d1f] rounded-2xl border-2 border-teal-400/50 shadow-2xl overflow-hidden flex items-center justify-center">
                  <div className="text-center text-xs">
                    <User className="w-6 h-6 text-[#9ff0fb] mx-auto mb-0.5" />
                    <span className="text-[10px] text-white/90 font-bold block truncate max-w-[90px]">
                      {patient.name}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 text-[#9aa8ab]">
                <VideoOff className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                <p className="text-sm font-bold">Camera is turned off</p>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/15">
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isMicOn ? 'bg-white/15 hover:bg-white/25 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isVideoOn ? 'bg-white/15 hover:bg-white/25 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Consultation Notes Summary Banner */}
          <div className="bg-[#1e292b] p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9ff0fb]" />
              <span>
                <strong>Diagnosis:</strong> <span className="text-amber-300">Amlapitta & Gastric Irritation (Visham Agni)</span>
              </span>
            </div>
            <span className="text-[11px] text-[#9aa8ab]">ICD-11 TM2: SG12</span>
          </div>
        </div>

        {/* Right Col: Live Prescription & Real-time Chat */}
        <div className="bg-[#1e292b] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-xl min-h-[400px]">
          {/* Tabs */}
          <div className="flex border-b border-white/10 bg-[#141d1f]">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'video' ? 'text-[#9ff0fb] border-b-2 border-[#9ff0fb] bg-[#1e292b]' : 'text-[#9aa8ab] hover:text-white'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Prescription</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'chat' ? 'text-[#9ff0fb] border-b-2 border-[#9ff0fb] bg-[#1e292b]' : 'text-[#9aa8ab] hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Chat</span>
            </button>
          </div>

          {/* Tab 1: Live Prescription */}
          {activeTab === 'video' && (
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs uppercase tracking-wider font-extrabold text-[#9ff0fb]">
                    Prescribed Formulations (Rx)
                  </span>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-bold">
                    Doctor Approved
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-[#141d1f] p-3 rounded-xl border border-white/10">
                    <div className="font-extrabold text-white">1. Avipattikar Churna (3g)</div>
                    <div className="text-[11px] text-[#9aa8ab]">Twice daily with warm water before meals (15 mins prior)</div>
                    <div className="text-[10px] text-amber-300 mt-1">Duration: 14 Days</div>
                  </div>

                  <div className="bg-[#141d1f] p-3 rounded-xl border border-white/10">
                    <div className="font-extrabold text-white">2. Kamdudha Ras (Moti Yukta - 250mg)</div>
                    <div className="text-[11px] text-[#9aa8ab]">1 tablet morning & evening after meals with cow milk / water</div>
                    <div className="text-[10px] text-amber-300 mt-1">Duration: 14 Days</div>
                  </div>

                  <div className="bg-[#141d1f] p-3 rounded-xl border border-white/10">
                    <div className="font-extrabold text-white">3. Metformin 500mg (Continue existing)</div>
                    <div className="text-[11px] text-[#9aa8ab]">1 tablet twice daily after major meals</div>
                  </div>
                </div>

                {/* Dietary Advice */}
                <div className="bg-teal-500/10 p-3 rounded-xl border border-teal-400/20 text-xs">
                  <div className="font-bold text-[#9ff0fb] mb-1">Pathya / Diet Regimen:</div>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    Avoid sour, pungent, oily foods and late dinners. Take light meals (Moong Dal, Pomegranate, Cow Ghee).
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={onEndConsultation}
                  className="w-full py-2.5 bg-[#00535b] hover:bg-[#006d77] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Digital Rx & Finish</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Chat */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between p-4 h-full">
              <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col text-xs ${
                      msg.sender === 'patient' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                        msg.sender === 'patient'
                          ? 'bg-[#00535b] text-white rounded-br-none'
                          : 'bg-[#141d1f] border border-white/15 text-gray-200 rounded-bl-none'
                      }`}
                    >
                      <div className="text-[10px] font-bold opacity-75 mb-0.5">
                        {msg.sender === 'patient' ? 'You' : 'Dr. Sharma'}
                      </div>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-[#9aa8ab] mt-0.5 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message to doctor..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#141d1f] border border-white/15 text-xs text-white focus:outline-none focus:border-[#9ff0fb]"
                />
                <button
                  type="submit"
                  className="bg-[#00535b] hover:bg-[#006d77] text-white px-3.5 py-2 rounded-xl text-xs font-bold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto text-center pt-2 text-xs text-[#9aa8ab]">
        AyushSetu Teleconsultation • Telemedicine Practice Guidelines compliant with ABDM
      </footer>
    </main>
  );
};
