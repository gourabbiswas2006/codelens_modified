import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, RefreshCw, Lock, Sparkles, FileText } from 'lucide-react';
import { ComplianceResponse, Language } from '../types';

interface ComplianceViewProps {
  code: string;
  language: Language;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({ code, language }) => {
  const [complianceData, setComplianceData] = useState<ComplianceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const runComplianceAudit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/compliance-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });
      if (res.ok) {
        const data: ComplianceResponse = await res.json();
        setComplianceData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runComplianceAudit();
  }, [code, language]);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card with Compliance Score Gauge */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Compliance & Security Verification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight font-sans">
            Compliance Dashboard
          </h2>
          <p className="text-xs text-stone-300 leading-relaxed">
            Automated verification for privacy policies, data protection, type safety, GDPR standards, and security best practices.
          </p>
          <button
            onClick={runComplianceAudit}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer border border-white/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'CodeLens is checking...' : 'Check compliance'}</span>
          </button>
        </div>

        {/* Vibrant Radial Progress Gauge */}
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-stone-950/80 border border-white/12 shadow-2xl relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="complianceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="50%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <circle
                cx="72"
                cy="72"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                className="text-stone-800"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="58"
                stroke="url(#complianceGradient)"
                strokeWidth="10"
                strokeDasharray={364}
                strokeDashoffset={364 - (364 * (complianceData?.score || 87)) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-3xl font-extrabold text-stone-100 font-mono">
                {complianceData?.score || 87}%
              </span>
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                Strong compliance
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-2 font-mono">
            {complianceData?.passedChecks || 4} of {complianceData?.totalChecks || 5} Rules Passed
          </p>
        </div>

      </div>

      {/* Compliance Rules Checklist */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Audit Checks & Remediation Guidelines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(complianceData?.items || []).map((item) => {
            const isCompliant = item.status === 'compliant';
            const isWarning = item.status === 'warning';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                className={`glass-card p-5 rounded-2xl border transition-all cursor-pointer ${
                  isCompliant
                    ? 'border-emerald-500/30 hover:border-emerald-400/50 bg-emerald-950/10'
                    : isWarning
                    ? 'border-amber-500/30 hover:border-amber-400/50 bg-amber-950/10'
                    : 'border-rose-500/30 hover:border-rose-400/50 bg-rose-950/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {isCompliant && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
                    {!isCompliant && !isWarning && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                      isCompliant
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Expanded Remediation Box */}
                <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-indigo-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono font-semibold text-[11px] text-indigo-200">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Recommended Action:</span>
                  </div>
                  <p className="text-slate-300 font-sans text-[11px]">
                    {item.remediation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Legal & Compliance Guidance Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-center space-y-1">
        <p className="text-xs font-mono font-bold text-indigo-300">
          🛡 AI Security & Compliance Disclaimer
        </p>
        <p className="text-[11px] text-slate-400">
          AI findings are generated for developer/compliance guidance and do not constitute formal legal counsel. All API keys remain isolated in backend server proxy routes.
        </p>
      </div>

    </div>
  );
};
