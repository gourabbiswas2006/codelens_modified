import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Lightbulb,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import { ExplainResponse, Language, ExplainLevel } from '../types';
import { EXAMPLES } from '../data/examples';

interface ExplainViewProps {
  language: Language;
  code: string;
  onChangeCode: (newCode: string) => void;
  onExplain: (level: ExplainLevel) => void;
  isLoading: boolean;
  result: ExplainResponse | null;
  selectedLevel: ExplainLevel;
  onChangeLevel: (level: ExplainLevel) => void;
}

export const ExplainView: React.FC<ExplainViewProps> = ({
  language,
  code,
  onChangeCode,
  onExplain,
  isLoading,
  result,
  selectedLevel,
  onChangeLevel
}) => {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadExample = (exampleId: string) => {
    const ex = EXAMPLES.find((item) => item.id === exampleId);
    if (ex) {
      onChangeCode(ex.code);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Quick Presets */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Line-by-Line Code Explainer</h2>
            <p className="text-xs text-slate-300">
              Paste code below or pick a starter example to see what every single line does.
            </p>
          </div>
        </div>

        {/* Starter Preset Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 whitespace-nowrap font-medium">Starter Snippets:</span>
          <select
            onChange={(e) => handleLoadExample(e.target.value)}
            defaultValue=""
            className="glass-input text-slate-200 text-xs rounded-xl px-3 py-1.5 font-mono cursor-pointer"
          >
            <option value="" disabled className="bg-slate-900 text-slate-200">Choose an example...</option>
            {EXAMPLES.map((ex) => (
              <option key={ex.id} value={ex.id} className="bg-slate-900 text-slate-200">
                {ex.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Code Input on Left, Explanations on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Code Editor View */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-950/80 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
                  {language} editor
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => onChangeCode('')}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                  title="Clear Code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Code Textarea / Line View */}
            <div className="p-4 font-mono text-sm leading-relaxed relative bg-black/50 min-h-[320px]">
              <textarea
                value={code}
                onChange={(e) => onChangeCode(e.target.value)}
                placeholder={`Paste your ${language} code here...\n\nExample:\nlet x = 10;\nlet y = 20;\nconsole.log(x + y);`}
                className="w-full h-80 bg-transparent text-slate-200 border-none outline-none resize-none font-mono text-sm leading-relaxed placeholder:text-slate-600 focus:ring-0"
                spellCheck={false}
              />
            </div>

            {/* Explainer Action Footer */}
            <div className="p-4 bg-slate-900/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Level Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 text-xs">
                <button
                  onClick={() => onChangeLevel('beginner')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                    selectedLevel === 'beginner'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Plain English
                </button>
                <button
                  onClick={() => onChangeLevel('analogy')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                    selectedLevel === 'analogy'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Analogies (ELI5)
                </button>
                <button
                  onClick={() => onChangeLevel('deepdive')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                    selectedLevel === 'deepdive'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Deep Dive
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => onExplain(selectedLevel)}
                disabled={isLoading || !code.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-violet-600/30 disabled:opacity-50 transition-all active:scale-95 cursor-pointer border border-white/20"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>CodeLens is reading your code...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                    <span>Explain Line-by-Line</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Line Explanations Output */}
        <div className="lg:col-span-6 space-y-4">
          {result ? (
            <div className="space-y-4">
              {/* Summary Card */}
              <div className="glass-panel p-5 rounded-3xl border border-indigo-500/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono">
                      Program Overview
                    </h3>
                  </div>
                  {result.difficulty && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                      {result.difficulty}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {result.summary}
                </p>

                {result.keyConcepts && result.keyConcepts.length > 0 && (
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-slate-400 font-medium mr-1">Key Concepts:</span>
                    {result.keyConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg text-xs bg-black/40 text-indigo-300 border border-white/10 font-mono"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Line Breakdown Cards List */}
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {result.explanations.map((item) => {
                  const isHovered = activeLine === item.line;
                  return (
                    <div
                      key={item.line}
                      onMouseEnter={() => setActiveLine(item.line)}
                      onMouseLeave={() => setActiveLine(null)}
                      className={`glass-card p-4 rounded-2xl border transition-all duration-200 space-y-2 ${
                        isHovered
                          ? 'bg-indigo-950/50 border-indigo-500/60 shadow-lg shadow-indigo-500/20'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30 shrink-0">
                            {item.line}
                          </span>
                          <code className="font-mono text-xs text-amber-300 bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 max-w-[260px] sm:max-w-md truncate">
                            {item.code || `Line ${item.line}`}
                          </code>
                        </div>

                        {item.concept && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-300 border border-white/10 font-mono shrink-0">
                            {item.concept}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed font-sans pt-1">
                        {item.explanation}
                      </p>

                      {item.analogy && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-2">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong className="text-amber-300 font-mono">Analogy:</strong> {item.analogy}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[380px] glass-panel rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center">
              <div className="p-4 rounded-2xl bg-violet-500/15 text-rose-300 border border-violet-500/30 mb-3 shadow-inner">
                <Sparkles className="w-8 h-8 animate-pulse text-amber-300" />
              </div>
              <h3 className="text-sm font-bold text-stone-100 font-sans mb-1">
                Nothing here yet
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mb-4">
                Paste your code on the left and click "Explain Line-by-Line" to see clear explanations for every single line.
              </p>
              <button
                onClick={() => handleLoadExample('js-math-variables')}
                className="px-4 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 text-rose-200 text-xs font-semibold transition-all border border-violet-500/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Load Starter Example</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
