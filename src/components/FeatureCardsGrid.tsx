import React from 'react';
import {
  Sparkles,
  MessageSquareText,
  ShieldCheck,
  FileSearch,
  BookOpenCheck,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { Mode } from '../types';

interface FeatureCardsGridProps {
  onSelectMode: (mode: Mode) => void;
}

export const FeatureCardsGrid: React.FC<FeatureCardsGridProps> = ({ onSelectMode }) => {
  const features = [
    {
      id: 'explain',
      mode: 'explain' as Mode,
      icon: Sparkles,
      title: 'AI Code Summaries',
      description: 'Line-by-line explanations in simple English, clear analogies, or technical breakdowns.',
      iconBg: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
      hoverBorder: 'group-hover:border-violet-500/40',
      badge: '1-Based Line Sync'
    },
    {
      id: 'knowledge',
      mode: 'knowledge' as Mode,
      icon: MessageSquareText,
      title: 'Smart Q&A Assistant',
      description: 'Ask questions about your documents or code and get instant, line-verified citations.',
      iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      hoverBorder: 'group-hover:border-cyan-500/40',
      badge: 'Verifiable Answers'
    },
    {
      id: 'compliance',
      mode: 'compliance' as Mode,
      icon: ShieldCheck,
      title: 'Compliance & Audit',
      description: 'Instant health checks for privacy policies, type safety, security rules, and GDPR compliance.',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      hoverBorder: 'group-hover:border-emerald-500/40',
      badge: 'Score 87%'
    },
    {
      id: 'documents',
      mode: 'documents' as Mode,
      icon: FileSearch,
      title: 'Document Intelligence',
      description: 'Bring source files, PDFs, meeting transcripts, and requirements to index with AI.',
      iconBg: 'bg-pink-500/15 border-pink-500/30 text-pink-300',
      hoverBorder: 'group-hover:border-pink-500/40',
      badge: 'Instant Vector Search'
    },
    {
      id: 'debug',
      mode: 'debug' as Mode,
      icon: BookOpenCheck,
      title: 'Debugging Assistant',
      description: 'Pinpoints problematic lines, explains root causes in plain language, and provides 1-click fixes.',
      iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      hoverBorder: 'group-hover:border-amber-500/40',
      badge: '1-Click Fixes'
    },
    {
      id: 'error',
      mode: 'error' as Mode,
      icon: Search,
      title: 'Terminal Error Translator',
      description: 'Translates intimidating stack traces and compiler logs into friendly, actionable guidance.',
      iconBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
      hoverBorder: 'group-hover:border-rose-500/40',
      badge: 'Error Translator'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-stone-100 tracking-tight font-sans">
            Explore Workspace Capabilities
          </h2>
          <p className="text-xs text-stone-400">
            Intelligent tools crafted for speed, understanding, and verification
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feat) => {
          const IconComponent = feat.icon;
          return (
            <div
              key={feat.id}
              onClick={() => onSelectMode(feat.mode)}
              className={`glass-card glass-card-hover p-6 rounded-3xl border border-white/10 ${feat.hoverBorder} space-y-4 cursor-pointer relative group overflow-hidden transition-all`}
            >
              {/* Subtle Ambient Accent Shimmer */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-pink-400/50 transition-all" />

              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl border backdrop-blur-md ${feat.iconBg} shadow-inner`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">
                  {feat.badge}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-100 group-hover:text-rose-200 transition-colors">
                    {feat.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-rose-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

