import React from 'react';
import {
  Sparkles,
  FileText,
  Search,
  ShieldCheck,
  CheckSquare,
  HelpCircle,
  BarChart3,
  Cpu,
  Zap,
  Bot
} from 'lucide-react';
import { Mode } from '../types';

interface AICommandCenterProps {
  onSelectMode: (mode: Mode) => void;
  onTriggerQuickAction?: (actionType: string) => void;
  documentCount?: number;
  complianceScore?: number;
}

export const AICommandCenter: React.FC<AICommandCenterProps> = ({
  onSelectMode,
  onTriggerQuickAction,
  documentCount = 24,
  complianceScore = 87
}) => {
  const handleAction = (type: string, mode?: Mode) => {
    if (mode) {
      onSelectMode(mode);
    }
    if (onTriggerQuickAction) {
      onTriggerQuickAction(type);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden shadow-2xl space-y-6">
      
      {/* Background Animated Gradient Mesh */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-600/10 to-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar with Glowing AI Orb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        
        {/* Left: AI Avatar Orb + Title */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            {/* Pulsing Outer Rings */}
            <div className="absolute w-14 h-14 rounded-2xl bg-indigo-500/20 animate-ping opacity-75" />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-xl shadow-indigo-500/30 relative z-10 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="w-7 h-7 text-cyan-300 animate-pulse" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
                CodeLens AI
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30">
                PRO ENGINE v3.6
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Your intelligent knowledge & compliance assistant
            </p>
          </div>
        </div>

        {/* Right: Live AI Pipeline Indicator */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
            <span className="text-cyan-300 font-bold">RAG + Compliance Active</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">Gemini 3.6 Flash</span>
        </div>
      </div>

      {/* Quick Action Matrix Grid */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Instant AI Quick Actions
          </span>
          <span className="text-[11px] text-slate-500 font-mono">Select task to execute</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* Action 1: Summarize Document */}
          <button
            onClick={() => handleAction('summarize', 'documents')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-indigo-950/60 border border-white/10 hover:border-indigo-500/40 transition-all text-left group flex flex-col justify-between min-h-[90px] cursor-pointer"
          >
            <div className="p-2 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                ✨ Summarize
              </p>
              <p className="text-[10px] text-slate-400">Executive Brief</p>
            </div>
          </button>

          {/* Action 2: Find Information */}
          <button
            onClick={() => handleAction('find', 'knowledge')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-500/40 transition-all text-left group flex flex-col justify-between min-h-[90px] cursor-pointer"
          >
            <div className="p-2 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                🔎 Find Info
              </p>
              <p className="text-[10px] text-slate-400">RAG Semantic Search</p>
            </div>
          </button>

          {/* Action 3: Compliance Audit */}
          <button
            onClick={() => handleAction('compliance', 'compliance')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-emerald-950/60 border border-white/10 hover:border-emerald-500/40 transition-all text-left group flex flex-col justify-between min-h-[90px] cursor-pointer"
          >
            <div className="p-2 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                🛡 Compliance
              </p>
              <p className="text-[10px] text-slate-400">Risk & Policy Audit</p>
            </div>
          </button>

          {/* Action 4: Extract Action Items */}
          <button
            onClick={() => handleAction('action_items', 'documents')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-purple-950/60 border border-white/10 hover:border-purple-500/40 transition-all text-left group flex flex-col justify-between min-h-[90px] cursor-pointer"
          >
            <div className="p-2 w-fit rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                📌 Action Items
              </p>
              <p className="text-[10px] text-slate-400">Extract Tasks</p>
            </div>
          </button>

          {/* Action 5: Ask About Documents */}
          <button
            onClick={() => handleAction('ask', 'knowledge')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-blue-950/60 border border-white/10 hover:border-blue-500/40 transition-all text-left group flex flex-col justify-between min-h-[90px] cursor-pointer"
          >
            <div className="p-2 w-fit rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                ❓ Ask AI Q&A
              </p>
              <p className="text-[10px] text-slate-400">With Citations</p>
            </div>
          </button>

          {/* Action 6: Generate Insights */}
          <button
            onClick={() => handleAction('insights', 'analytics')}
            className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-pink-950/60 border border-white/10 hover:border-pink-500/40 transition-all text-left group flex flex-col justify-between min-h-[90px] cursor-pointer"
          >
            <div className="p-2 w-fit rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors">
                📊 Insights
              </p>
              <p className="text-[10px] text-slate-400">Knowledge Health</p>
            </div>
          </button>

        </div>
      </div>

    </div>
  );
};
