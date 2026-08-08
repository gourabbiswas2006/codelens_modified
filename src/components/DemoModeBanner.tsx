import React from 'react';
import { Play, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Bug, FileText, Search, X } from 'lucide-react';
import { Mode } from '../types';

interface DemoModeBannerProps {
  onClose: () => void;
  onSelectMode: (mode: Mode) => void;
  onTriggerDemoAction: (step: string) => void;
  currentStep?: string;
}

export const DemoModeBanner: React.FC<DemoModeBannerProps> = ({
  onClose,
  onSelectMode,
  onTriggerDemoAction,
  currentStep = '1'
}) => {
  const steps = [
    {
      id: '1',
      title: '1. Load Sample Doc',
      desc: 'Employee & Security Policy',
      action: () => {
        onSelectMode('documents');
        onTriggerDemoAction('load_sample');
      }
    },
    {
      id: '2',
      title: '2. AI Insights',
      desc: 'Extract Summary & Tasks',
      action: () => {
        onSelectMode('documents');
        onTriggerDemoAction('extract_insights');
      }
    },
    {
      id: '3',
      title: '3. Smart Q&A',
      desc: 'RAG Citation Query',
      action: () => {
        onSelectMode('knowledge');
        onTriggerDemoAction('ask_rag');
      }
    },
    {
      id: '4',
      title: '4. Compliance Audit',
      desc: 'Risk Policy Scoring',
      action: () => {
        onSelectMode('compliance');
        onTriggerDemoAction('run_compliance');
      }
    },
    {
      id: '5',
      title: '5. Line-by-Line Code',
      desc: 'Beginner Explanation',
      action: () => {
        onSelectMode('explain');
        onTriggerDemoAction('explain_code');
      }
    },
    {
      id: '6',
      title: '6. Debug Console',
      desc: 'Live RAG & API Logs',
      action: () => {
        onTriggerDemoAction('toggle_console');
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="glass-panel p-4 rounded-3xl border border-amber-500/40 relative overflow-hidden shadow-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40">
        
        {/* Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40">
              <Play className="w-4 h-4 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-sans tracking-wide">
                  Hackathon Judge Presentation Mode
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                  Track B Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Click steps below to walk through the complete end-to-end CodeLens AI workflow in 60 seconds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer self-start sm:self-center"
            title="Exit Demo Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pipeline Step Sequence Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={s.action}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer group flex flex-col justify-between ${
                currentStep === s.id
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/80 border-white/10 hover:border-amber-500/30 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-amber-300">
                  {s.title}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-300 transition-colors" />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{s.desc}</p>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
