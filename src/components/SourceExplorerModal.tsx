import React from 'react';
import { X, FileText, ExternalLink, ShieldCheck, CheckCircle2, Copy } from 'lucide-react';
import { Citation } from '../types';

interface SourceExplorerModalProps {
  citation: Citation | null;
  onClose: () => void;
  evidenceStrength?: number;
}

export const SourceExplorerModal: React.FC<SourceExplorerModalProps> = ({
  citation,
  onClose,
  evidenceStrength = 94
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!citation) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(citation.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">
                Source Evidence Inspector
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {citation.documentName} • {citation.location}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Evidence Strength Indicator */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>RAG Verified Citation</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
            Evidence Strength: {evidenceStrength}%
          </span>
        </div>

        {/* Snippet Content Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase text-slate-400">
              Verbatim Text Snippet
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-mono cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Snippet'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
            {citation.snippet}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
