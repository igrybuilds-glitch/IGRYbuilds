import React, { useState } from 'react';
import { CheckCheck, Send, Phone, Video, MoreVertical, Bot, CalendarCheck, Sparkles } from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface ChatMessage {
  id: string;
  sender: 'customer' | 'bot' | 'system';
  text: string;
  time: string;
  options?: string[];
  card?: {
    type: 'appointment' | 'quote' | 'status';
    title: string;
    details: string[];
  };
}

interface ChatMockupProps {
  businessName?: string;
  verified?: boolean;
  avatarLetter?: string;
  className?: string;
  initialMessages?: ChatMessage[];
  showInput?: boolean;
}

export const ChatMockup: React.FC<ChatMockupProps> = ({
  businessName = 'IGRYbuilds Systems Core',
  verified = true,
  avatarLetter = 'I',
  className = '',
  initialMessages,
  showInput = true,
}) => {
  const defaultFlow: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'customer',
      text: 'Hi, I want to know more about automating our client intake.',
      time: '14:28',
    },
    {
      id: 'm2',
      sender: 'bot',
      text: 'Hello! I am the automated intake assistant for IGRYbuilds. What type of system are you looking to streamline?',
      time: '14:28',
      options: ['Lead Qualification & Booking', 'WhatsApp Customer Portal', 'AI Voice Assistant'],
    },
    {
      id: 'm3',
      sender: 'customer',
      text: 'Lead Qualification & Booking',
      time: '14:29',
    },
    {
      id: 'm4',
      sender: 'bot',
      text: 'Understood. Based on your pipeline requirements, I have reserved a 20-min live systems review slot tomorrow at 4:30 PM with our senior architect.',
      time: '14:29',
      card: {
        type: 'appointment',
        title: 'Architecture Review Confirmed',
        details: [
          'Date: Tomorrow at 4:30 PM',
          'Channel: Google Meet + Live Screen Share',
          'Calendar invite dispatched to email',
          'SMS reminder scheduled 1h prior',
        ],
      },
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages || defaultFlow);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectOption = (opt: string) => {
    if (selectedOption) return;
    setSelectedOption(opt);
    const newCustomerMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'customer',
      text: opt,
      time: '14:30',
    };
    const newBotMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `Excellent choice. Your brief for "${opt}" has been indexed in our CRM queue. Availability confirmed for tomorrow at 4:30 PM.`,
      time: '14:30',
      card: {
        type: 'appointment',
        title: 'Appointment Confirmed ✓',
        details: ['Verified slot: Tomorrow 4:30 PM', 'Lead score: 96/100', 'Status: CRM Synchronized'],
      },
    };
    setMessages((prev) => [...prev, newCustomerMsg, newBotMsg]);
  };

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-[#ECE5DD] shadow-lg flex flex-col overflow-hidden text-slate-800 ${className}`}>
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm ring-2 ring-emerald-400/40">
            {avatarLetter}
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-semibold text-xs text-white truncate max-w-[180px]">{businessName}</span>
              {verified && (
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-200/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Automated Business Agent (Active)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/90">
          <DemoBadge label="DEMO AUTOMATION" className="bg-white/10 text-white border-white/20 text-[9px]" />
          <MoreVertical className="w-4 h-4 opacity-75" />
        </div>
      </div>

      {/* Chat Messages Container with subtle WhatsApp background pattern */}
      <div className="p-3 sm:p-4 space-y-3 flex-1 overflow-y-auto max-h-[420px] bg-[radial-gradient(#0000000a_1px,transparent_1px)] bg-[size:16px_16px]">
        <div className="text-center my-1">
          <span className="bg-white/80 backdrop-blur-xs text-[10px] font-medium text-slate-500 px-3 py-0.5 rounded-full shadow-2xs">
            TODAY — END-TO-END AUTOMATION FLOW
          </span>
        </div>

        {messages.map((m) => {
          const isCustomer = m.sender === 'customer';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-xl px-3 py-2 text-xs shadow-xs leading-relaxed relative ${
                  isCustomer
                    ? 'bg-[#E7FFDB] text-slate-900 rounded-tr-none'
                    : 'bg-white text-slate-900 rounded-tl-none border border-slate-100'
                }`}
              >
                {!isCustomer && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 mb-1">
                    <Bot className="w-3 h-3 text-emerald-600" />
                    <span>IGRY System Agent</span>
                  </div>
                )}
                <p className="whitespace-pre-line">{m.text}</p>

                {/* Optional Structured Card Attachment */}
                {m.card && (
                  <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                      <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{m.card.title}</span>
                    </div>
                    <ul className="text-[10px] text-emerald-800 space-y-0.5">
                      {m.card.details.map((d, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Timestamp & double tick */}
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>{m.time}</span>
                  {isCustomer && <CheckCheck className="w-3 h-3 text-sky-500" />}
                </div>
              </div>

              {/* Quick Reply Interactive Chips */}
              {m.options && !selectedOption && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                  {m.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      className="px-2.5 py-1 text-[10px] font-medium bg-white text-emerald-700 border border-emerald-300 rounded-full hover:bg-emerald-50 active:scale-95 transition-all shadow-2xs text-left"
                    >
                      {opt} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input bar mockup */}
      {showInput && (
        <div className="bg-slate-100/95 border-t border-slate-200 px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-[11px] text-slate-400 flex items-center justify-between shadow-2xs">
            <span>Type a reply to test agent response...</span>
          </div>
          <button
            onClick={() => handleSelectOption('Schedule Strategy Call')}
            className="w-8 h-8 rounded-full bg-[#075E54] text-white flex items-center justify-center hover:bg-emerald-800 transition-colors shadow-xs"
            title="Simulate Send"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
