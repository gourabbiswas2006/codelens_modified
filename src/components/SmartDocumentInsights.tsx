import React from 'react';
import {
  FileText,
  AlertTriangle,
  Calendar,
  Users,
  ShieldCheck,
  CheckSquare,
  HelpCircle,
  Sparkles,
  Layers,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { DocumentInsights, DocumentRisk, ActionItem } from '../types';

interface SmartDocumentInsightsProps {
  insights: DocumentInsights | null;
  isLoading: boolean;
  documentTitle?: string;
  onToggleActionItem?: (id: string) => void;
  onSelectSuggestedQuestion?: (question: string) => void;
}

export const SmartDocumentInsights: React.FC<SmartDocumentInsightsProps> = ({
  insights,
  isLoading,
  documentTitle = 'Uploaded Document',
  onToggleActionItem,
  onSelectSuggestedQuestion
}) => {
  if (isLoading) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/20 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-mono font-bold animate-pulse">
          <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
          <span>Generating AI Smart Insights with Gemini 3.6 Flash...</span>
        </div>
        <div className="max-w-md mx-auto h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 animate-pulse w-3/4 rounded-full" />
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Extracting executive summary, compliance risks, key topics, and action items...
        </p>
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  return (
    <div className="space-y-6">
      
      {/* Header Bar with Evidence Strength */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/80 border border-white/10 glass-card">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Smart Document Insights
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              {documentTitle}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            AI-extracted executive summary, key risks, policy requirements, and extracted tasks
          </p>
        </div>

        {/* Evidence Strength Gauge */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
          <div className="text-right">
            <p className="text-[10px] font-mono font-semibold uppercase text-slate-400">
              Evidence Strength
            </p>
            <p className="text-sm font-bold text-cyan-300 font-mono">
              {insights.evidenceStrength}% Confidence
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-xs text-white">
              {insights.evidenceStrength}%
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/20 relative overflow-hidden space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Executive Summary</span>
        </div>
        <p className="text-slate-200 text-sm leading-relaxed font-sans font-normal">
          {insights.executiveSummary}
        </p>

        {/* Key Topics Chips */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono font-semibold">Key Topics:</span>
          {insights.keyTopics.map((topic, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-xl text-xs font-medium bg-slate-800/80 text-cyan-300 border border-cyan-500/20"
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>

      {/* Grid: Risks + Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Compliance & Security Risks */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Identified Risks & Vulnerabilities</span>
            </h4>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              {insights.risks.length} Issues
            </span>
          </div>

          <div className="space-y-3">
            {insights.risks.map((risk, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-white">{risk.title}</p>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md ${
                      risk.severity === 'High'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : risk.severity === 'Medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {risk.severity} Severity
                  </span>
                </div>
                <p className="text-xs text-slate-300">{risk.description}</p>
                <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-300 font-mono">
                  💡 <span className="font-semibold text-indigo-200">Recommendation:</span> {risk.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Extracted Action Items */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <CheckSquare className="w-4 h-4 text-purple-400" />
              <span>Extracted Action Items</span>
            </h4>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {insights.actionItems.length} Tasks
            </span>
          </div>

          <div className="space-y-2.5">
            {insights.actionItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleActionItem && onToggleActionItem(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  item.completed
                    ? 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
                    : 'bg-slate-900/80 border-white/10 hover:border-purple-500/40 text-slate-200'
                }`}
              >
                <div className="mt-0.5">
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div className="w-4 h-4 rounded border border-slate-600 hover:border-purple-400" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-medium">{item.task}</p>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                    <span>👤 {item.owner}</span>
                    <span>📅 {item.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grid: Dates, People, Missing Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Important Dates */}
        {insights.importantDates && insights.importantDates.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <Calendar className="w-4 h-4" />
              <span>Key Dates</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {insights.importantDates.map((date, idx) => (
                <li key={idx} className="flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stakeholders & Orgs */}
        {insights.peopleOrOrgs && insights.peopleOrOrgs.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold">
              <Users className="w-4 h-4" />
              <span>Stakeholders</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {insights.peopleOrOrgs.map((person, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>{person}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Information Flags */}
        {insights.missingInformation && insights.missingInformation.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold">
              <XCircle className="w-4 h-4" />
              <span>Missing Details Flagged</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {insights.missingInformation.map((info, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-rose-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

    </div>
  );
};
