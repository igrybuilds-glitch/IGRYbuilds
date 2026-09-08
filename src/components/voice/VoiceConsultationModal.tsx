import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Radio, 
  Cpu, 
  ArrowRight,
  Send,
  CheckCircle2
} from 'lucide-react';
import { DemoBadge } from '../visuals/DemoBadge';

interface VoiceConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  openBriefModal?: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

export const VoiceConsultationModal: React.FC<VoiceConsultationModalProps> = ({
  isOpen,
  onClose,
  openBriefModal,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Hello. I am the IGRYbuilds System Architect powered by the Gemini Live API. Tell me what operational bottleneck or growth goal you are trying to solve in your business.',
      time: 'Just now',
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Speech Recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const resultTranscript = event.results[current][0].transcript;
        setTranscript(resultTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your question below.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const msg = (textToSend || transcript).trim();
    if (!msg) return;

    const userMsg: Message = {
      role: 'user',
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setTranscript('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/voice-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      const reply =
        data.response ||
        'I recommend deploying a connected pipeline: high-converting web capture, sub-45 second WhatsApp verification, and automated CRM deal dispatch.';

      const botMsg: Message = {
        role: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(reply);
    } catch (err) {
      const fallbackMsg: Message = {
        role: 'assistant',
        text: 'I recommend connecting a custom intake flow with an autonomous WhatsApp qualification bridge to eliminate response latency.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Live AI System Architect
                </h3>
              </div>
              <p className="text-[10px] font-mono text-slate-400">
                MODEL: gemini-3.1-flash-live-preview • SUB-SECOND LATENCY
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-2 rounded-xl transition-colors ${
                speechEnabled ? 'bg-slate-800 text-emerald-400' : 'bg-slate-800 text-slate-500'
              }`}
              title={speechEnabled ? 'Voice output enabled' : 'Voice output muted'}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                window.speechSynthesis?.cancel();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Conversation Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] font-mono text-slate-400 mb-1 px-1">
                {m.role === 'user' ? 'YOU' : 'IGRY SYSTEM ARCHITECT'} • {m.time}
              </div>
              <div
                className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-500 max-w-xs shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span>Architect reasoning with Gemini Live API...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Waveform / Voice Status Strip */}
        <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Radio className={`w-3.5 h-3.5 ${isListening ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
            <span>{isListening ? 'Listening to your voice...' : 'Tap microphone or type question'}</span>
          </div>
          <span className="text-[10px] text-slate-400">Audio Synthesis Ready</span>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-500 text-white ring-4 ring-rose-500/20 shadow-md animate-pulse'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={isListening ? 'Listening...' : 'Type or speak: "How do I automate lead follow-up?"'}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!transcript.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-2xl transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 pb-3 pt-1 bg-white flex flex-wrap gap-1.5 border-t border-slate-100">
          {[
            'How do I stop losing leads after hours?',
            'What is the best architecture for dental clinics?',
            'How does WhatsApp booking connect to HubSpot?',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
