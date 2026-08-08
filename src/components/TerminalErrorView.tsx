import React from 'react';
import {
  Terminal,
  AlertOctagon,
  HelpCircle,
  MapPin,
  Wrench,
  Code,
  RotateCcw,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ErrorTranslationResponse, Language } from '../types';
import { EXAMPLES } from '../data/examples';

interface TerminalErrorViewProps {
  language: Language;
  errorText: string;
  onChangeErrorText: (text: string) => void;
  onTranslateError: () => void;
  isLoading: boolean;
  result: ErrorTranslationResponse | null;
}

export const TerminalErrorView: React.FC<TerminalErrorViewProps> = ({
  language,
  errorText,
  onChangeErrorText,
  onTranslateError,
  isLoading,
  result
}) => {
  const handleLoadSampleError = (exampleId: string) => {
    const ex = EXAMPLES.find((item) => item.id === exampleId);
    if (ex && ex.terminalError) {
      onChangeErrorText(ex.terminalError);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Sample Errors */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Terminal Error Translator</h2>
            <p className="text-xs text-slate-300">
              Paste intimidating compiler or terminal stack traces to convert them into clear, actionable advice.
            </p>
          </div>
        </div>

        {/* Sample Terminal Error Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 whitespace-nowrap font-medium">Sample Error Logs:</span>
          <select
            onChange={(e) => handleLoadSampleError(e.target.value)}
            defaultValue=""
            className="glass-input text-slate-200 text-xs rounded-xl px-3 py-1.5 font-mono cursor-pointer"
          >
            <option value="" disabled className="bg-slate-900 text-slate-200">Pick an error log...</option>
            {EXAMPLES.map((ex) => (
              <option key={ex.id} value={ex.id} className="bg-slate-900 text-slate-200">
                {ex.name} (Stack Trace)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Terminal Log Input on Left, Friendly Translation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Terminal Output Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 bg-slate-950/80 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  Raw Terminal / Stack Trace Output
                </span>
              </div>
              <button
                onClick={() => onChangeErrorText('')}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                title="Clear Error Input"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 font-mono text-xs leading-relaxed relative bg-black/50 min-h-[300px]">
              <textarea
                value={errorText}
                onChange={(e) => onChangeErrorText(e.target.value)}
                placeholder={`Paste error output here...\n\nExample:\nReferenceError: username is not defined\n    at Object.<anonymous> (/app/index.js:1:13)`}
                className="w-full h-72 bg-transparent text-amber-200/90 border-none outline-none resize-none font-mono text-xs leading-relaxed placeholder:text-slate-700 focus:ring-0"
                spellCheck={false}
              />
            </div>

            <div className="p-4 bg-slate-900/90 border-t border-white/10 flex justify-end">
              <button
                onClick={onTranslateError}
                disabled={isLoading || !errorText.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-500 to-pink-500 hover:from-amber-500 hover:to-pink-400 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-600/30 disabled:opacity-50 transition-all active:scale-95 cursor-pointer border border-white/20"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>CodeLens is analyzing error...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                    <span>Translate Terminal Error</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Beginner-Friendly Translation */}
        <div className="lg:col-span-6 space-y-4">
          {result ? (
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5 shadow-2xl">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-rose-400" />
                  <h3 className="text-sm font-bold text-white font-mono">
                    {result.errorType}
                  </h3>
                </div>
                {result.location && (
                  <span className="flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{result.location}</span>
                  </span>
                )}
              </div>

              {/* 1. What Happened */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono">
                    1. What Happened
                  </h4>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed pl-6 bg-black/40 p-3.5 rounded-xl border border-white/10">
                  {result.simpleExplanation}
                </p>
              </div>

              {/* 2. Why It Happened */}
              {result.likelyCause && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                      2. Likely Cause
                    </h4>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed pl-6 bg-black/40 p-3.5 rounded-xl border border-white/10">
                    {result.likelyCause}
                  </p>
                </div>
              )}

              {/* 3. How to Fix It */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                    3. How to Fix It
                  </h4>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed pl-6 bg-black/40 p-3.5 rounded-xl border border-white/10">
                  {result.suggestedFix}
                </p>
              </div>

              {/* 4. Example Fix Snippet */}
              {result.codeExample && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-sky-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300 font-mono">
                      4. Code Example Fix
                    </h4>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-black/60 font-mono text-xs text-sky-200 border border-white/10 overflow-x-auto leading-relaxed">
                    {result.codeExample}
                  </pre>
                </div>
              )}

            </div>
          ) : (
            <div className="h-full min-h-[360px] glass-panel rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center">
              <div className="p-4 rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-3 shadow-inner">
                <Terminal className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-sm font-bold text-stone-100 font-sans mb-1">
                Nothing here yet
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mb-4">
                Paste a terminal error message or stack trace on the left to transform it into plain, easy-to-understand English.
              </p>
              <button
                onClick={() => handleLoadSampleError('js-math-variables')}
                className="px-4 py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 text-xs font-semibold transition-all border border-amber-500/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Load Sample Error Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
