import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, FileText, CornerDownRight, HelpCircle } from 'lucide-react';
import { QAMessage, Citation } from '../types';

interface SmartQAChatProps {
  contextCode: string;
  onInspectCitation?: (citation: Citation) => void;
}

export const SmartQAChat: React.FC<SmartQAChatProps> = ({ contextCode, onInspectCitation }) => {
  const [messages, setMessages] = useState<QAMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Hello! Here\'s what I found 👇\nI am your CodeLens AI Assistant. Ask any question about your documents, code logic, API contracts, or compliance rules.',
      timestamp: 'Just now',
      citations: [
        {
          documentName: 'Employee Policy',
          location: 'Page 15, Section 4.2',
          snippet: 'Employees are entitled to 12 casual leaves per year with statutory benefits.'
        }
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const suggestedQuestions = [
    "Summarize this",
    "What's important?",
    "Any compliance risks?",
    "Show me the evidence"
  ];

  const handleSendQuestion = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const queryToUse = customText || inputQuery;
    if (!queryToUse.trim() || isAsking) return;

    setInputQuery('');

    const userMsg: QAMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: queryToUse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsAsking(true);

    try {
      const res = await fetch('/api/ask-knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: queryToUse,
          contextCode
        })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();

      const aiMsg: QAMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: data.text ? `Here's what I found 👇\n\n${data.text}` : 'Here\'s what I found 👇\n\nAnswer generated successfully.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: QAMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: 'Something didn\'t go as planned while reading your documents. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/12 space-y-5 flex flex-col h-[620px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-violet-600 via-rose-500 to-amber-400 text-white shadow-lg shadow-violet-600/25 ring-1 ring-white/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2 font-sans">
              <span>Smart Q&A Assistant</span>
              <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-200 text-[10px] font-mono border border-violet-500/30">
                Line-Verified Evidence
              </span>
            </h3>
            <p className="text-xs text-stone-400">What would you like to know about your documents?</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-violet-600 to-rose-500 p-0.5 shadow-md shrink-0">
                <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-rose-300">
                  <Sparkles className="w-4 h-4 text-rose-300" />
                </div>
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-2xl p-4 text-xs leading-relaxed border space-y-2 ${
                msg.sender === 'user'
                  ? 'glass-user-message text-stone-100 rounded-tr-none'
                  : 'glass-ai-message text-stone-100 rounded-tl-none shadow-xl'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

              {/* Source Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-amber-200">
                    <FileText className="w-3.5 h-3.5 text-rose-300" />
                    <span>Evidence & Citations:</span>
                  </div>
                  {msg.citations.map((cit, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1 text-[11px]"
                    >
                      <div className="flex items-center justify-between font-mono font-semibold text-rose-200">
                        <span className="flex items-center gap-1">
                          <CornerDownRight className="w-3 h-3 text-violet-300" />
                          📄 {cit.documentName}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-stone-300 bg-white/10 px-2 py-0.5 rounded text-[10px]">
                            {cit.location}
                          </span>
                          {onInspectCitation && (
                            <button
                              onClick={() => onInspectCitation(cit)}
                              className="px-2 py-0.5 rounded bg-violet-600/30 hover:bg-violet-600/50 text-rose-200 text-[9px] font-bold transition-colors cursor-pointer border border-violet-400/30"
                            >
                              View Evidence
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-stone-300 italic font-sans text-[10px] leading-relaxed">
                        "{cit.snippet}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-[9px] font-mono text-stone-400 text-right pt-1">
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-stone-300 shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isAsking && (
          <div className="flex items-center gap-2 text-rose-300 text-xs italic font-mono bg-violet-950/40 p-3.5 rounded-2xl w-fit border border-violet-500/30">
            <Sparkles className="w-4 h-4 animate-spin text-rose-300" />
            <span>CodeLens is reading your document...</span>
          </div>
        )}
      </div>

      {/* Suggested Questions Quick Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
        <span className="text-[10px] font-medium text-stone-400 shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-rose-300" /> Suggestions:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendQuestion(undefined, q)}
            className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 text-[11px] text-stone-300 transition-colors whitespace-nowrap cursor-pointer hover:text-white"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendQuestion} className="flex items-center gap-2 pt-2 border-t border-white/10">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="What would you like to know?"
          className="glass-input flex-1 rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-violet-500 font-sans"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isAsking}
          className="btn-warm-primary p-3 flex items-center justify-center shadow-lg transition-all disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};

