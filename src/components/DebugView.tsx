import React, { useState } from 'react';
import {
  Bug,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Wrench,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  FileCode2,
  Terminal,
  Maximize2,
  Minimize2,
  Play,
  Layers,
  Cpu,
  ArrowRight,
  Code2
} from 'lucide-react';
import { DebugResponse, Language } from '../types';
import { EXAMPLES } from '../data/examples';

interface DebugViewProps {
  language: Language;
  code: string;
  onChangeCode: (newCode: string) => void;
  onDebug: () => void;
  isLoading: boolean;
  result: DebugResponse | null;
}

export const DebugView: React.FC<DebugViewProps> = ({
  language,
  code,
  onChangeCode,
  onDebug,
  isLoading,
  result
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal' | 'diff'>('editor');
  const [isMaximized, setIsMaximized] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    'CodeLens Debug Studio Engine v2.4 initialized.',
    'Ready to analyze code line-by-line...'
  ]);

  const handleCopyFixedCode = () => {
    if (result?.correctedCode) {
      navigator.clipboard.writeText(result.correctedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyFix = () => {
    if (result?.correctedCode) {
      onChangeCode(result.correctedCode);
      setConsoleLogs((prev) => [
        ...prev,
        '✓ Applied AI corrected code to active buffer.'
      ]);
    }
  };

  const handleLoadBuggySnippet = (exampleId: string) => {
    const ex = EXAMPLES.find((item) => item.id === exampleId);
    if (ex && ex.buggyCode) {
      onChangeCode(ex.buggyCode);
      setConsoleLogs((prev) => [
        ...prev,
        `Loaded bug sample snippet: "${ex.name}"`
      ]);
    }
  };

  const triggerDebugWithLogs = () => {
    setConsoleLogs((prev) => [
      ...prev,
      `[DEBUG_INIT] Scanning ${language.toUpperCase()} syntax tree...`,
      '[LLM_INSPECT] Sending AST and line context to Gemini Engine...'
    ]);
    onDebug();
  };

  const handleSimulateRun = () => {
    setConsoleLogs((prev) => [
      ...prev,
      `[EXEC_INIT] Starting sandbox execution for ${language}...`,
    ]);

    if (language === 'javascript' || language === 'typescript') {
      try {
        const capturedLogs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => capturedLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args: any[]) => capturedLogs.push(`[ERROR] ${args.join(' ')}`),
          warn: (...args: any[]) => capturedLogs.push(`[WARN] ${args.join(' ')}`)
        };

        const runFn = new Function('console', code);
        runFn(customConsole);

        if (capturedLogs.length === 0) {
          setConsoleLogs((prev) => [...prev, '✓ Code executed cleanly (no console outputs).']);
        } else {
          setConsoleLogs((prev) => [
            ...prev,
            '--- STDOUT OUTPUT ---',
            ...capturedLogs,
            '--- EXECUTION COMPLETE ---'
          ]);
        }
      } catch (err: any) {
        setConsoleLogs((prev) => [
          ...prev,
          `❌ UNCAUGHT EXCEPTION: ${err.message}`
        ]);
      }
    } else {
      // Simulation for Python / C++ / Java
      setConsoleLogs((prev) => [
        ...prev,
        '--- SIMULATED OUTPUT ---',
        'Process completed with exit code 0.',
        '--- END OF STDOUT ---'
      ]);
    }
  };

  const lines = code.split('\n');

  return (
    <div className={`space-y-6 transition-all duration-300 ${isMaximized ? 'fixed inset-4 z-50 bg-slate-950/95 p-6 rounded-3xl overflow-y-auto border border-rose-500/30 backdrop-blur-2xl shadow-2xl space-y-4' : ''}`}>
      
      {/* WINDOW HEADER / TOOLBAR */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* macOS Window Title Bar */}
        <div className="px-4 py-3 bg-slate-950/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
            </div>
            
            <div className="h-4 w-px bg-white/10 mx-1" />

            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4 text-rose-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                CodeLens Debugging Studio Window
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                {language.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Window Actions */}
          <div className="flex items-center gap-3">
            {/* Buggy Presets Selector */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">Sample Bug:</span>
              <select
                onChange={(e) => handleLoadBuggySnippet(e.target.value)}
                defaultValue=""
                className="bg-slate-900 text-slate-200 text-xs rounded-xl px-2.5 py-1 font-mono border border-white/10 outline-none cursor-pointer hover:bg-slate-800 transition-colors"
              >
                <option value="" disabled>Load bug sample...</option>
                {EXAMPLES.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Maximize Window Toggle */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/10"
              title={isMaximized ? "Restore Window Size" : "Maximize Debug Window"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Debug Action Bar */}
        <div className="px-5 py-3 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={triggerDebugWithLogs}
              disabled={isLoading || !code.trim()}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 hover:from-violet-500 hover:to-amber-400 text-white text-xs font-bold flex items-center gap-2 shadow-xl shadow-rose-600/30 disabled:opacity-50 transition-all active:scale-95 cursor-pointer border border-white/20"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>CodeLens is debugging...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-amber-200" />
                  <span>Run Debug Analysis</span>
                </>
              )}
            </button>

            <button
              onClick={() => onChangeCode('')}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/10"
              title="Reset Editor"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Sub Window Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'editor' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'terminal' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Execution Console</span>
            </button>

            {result?.correctedCode && (
              <button
                onClick={() => setActiveTab('diff')}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'diff' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Fixed Code Diff</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MAIN DEBUG WINDOW BODY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CODE EDITOR WINDOW WITH LINE NUMBERS & BUG MARKERS */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col min-h-[420px]">
            
            {/* Editor Sub-Header */}
            <div className="px-4 py-2.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-rose-300 font-bold flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5" />
                Interactive Code Buffer
              </span>
              <span className="text-slate-500 text-[11px]">
                {lines.length} lines
              </span>
            </div>

            {/* Tab 1: Standard Editor View */}
            {activeTab === 'editor' && (
              <div className="flex-1 flex font-mono text-xs leading-relaxed bg-black/60 relative">
                {/* Line Numbers Gutter */}
                <div className="py-4 px-3 bg-slate-950/60 text-slate-600 border-r border-white/10 select-none text-right font-mono min-w-[3rem]">
                  {lines.map((_, idx) => {
                    const lineNum = idx + 1;
                    const isErrorLine = result?.line === lineNum;
                    return (
                      <div
                        key={idx}
                        className={`leading-relaxed ${
                          isErrorLine
                            ? 'text-rose-400 font-bold bg-rose-500/20 rounded px-1 -mx-1'
                            : ''
                        }`}
                      >
                        {lineNum}
                      </div>
                    );
                  })}
                </div>

                {/* Textarea Input */}
                <textarea
                  value={code}
                  onChange={(e) => onChangeCode(e.target.value)}
                  placeholder={`Paste buggy ${language} code here...\n\nExample:\nconst total = price + tax;`}
                  className="w-full h-full p-4 bg-transparent text-slate-200 border-none outline-none resize-none font-mono text-xs leading-relaxed placeholder:text-slate-600 focus:ring-0 min-h-[350px]"
                  spellCheck={false}
                />
              </div>
            )}

            {/* Tab 2: Execution Console View */}
            {activeTab === 'terminal' && (
              <div className="p-4 font-mono text-xs text-amber-300 bg-black/80 flex-1 space-y-2 overflow-y-auto max-h-[380px]">
                <div className="text-slate-500 border-b border-white/10 pb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>Debug Studio Runtime Console Logs</span>
                </div>
                {consoleLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-amber-500 font-bold">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                {result && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 mt-4 space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>[{result.errorType || 'ERROR'}] Line {result.line || '?'}:</span>
                    </div>
                    <p className="text-slate-300 pl-5">{result.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Code Fix Diff View */}
            {activeTab === 'diff' && result?.correctedCode && (
              <div className="p-4 font-mono text-xs bg-black/80 flex-1 space-y-3">
                <div className="flex items-center justify-between text-emerald-300 border-b border-white/10 pb-2">
                  <span className="font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Corrected Code Fix Preview
                  </span>
                  <button
                    onClick={handleApplyFix}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer"
                  >
                    Apply to Buffer
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 overflow-x-auto leading-relaxed">
                  {result.correctedCode}
                </pre>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: AI DIAGNOSIS & REPAIR PANEL */}
        <div className="lg:col-span-6 space-y-4">
          {result ? (
            result.hasError === false || result.errorType === 'Clean' ? (
              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">
                      Clean Code Verification Passed
                    </h3>
                    <p className="text-xs text-emerald-300 font-medium">
                      Zero syntax errors or runtime exceptions detected!
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/20 text-xs text-slate-300 space-y-2">
                  <p className="font-mono text-emerald-300 font-bold">
                    [ANALYSIS SUMMARY]
                  </p>
                  <p>{result.explanation}</p>
                  {result.suggestion && (
                    <p className="text-slate-400 italic pt-1">{result.suggestion}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('terminal');
                      handleSimulateRun();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Run Output Simulation</span>
                  </button>

                  <span className="text-[11px] font-mono text-slate-500">
                    1-Based Line Sync: Verified
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Problematic Line Banner */}
                <div className="glass-panel p-5 rounded-3xl border border-rose-500/40 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300 font-mono">
                        Bug Diagnosis
                      </h3>
                    </div>
                    {result.errorType && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-200 border border-rose-500/30">
                        {result.errorType}
                      </span>
                    )}
                  </div>

                  {result.line ? (
                    <p className="text-xs text-rose-200 font-mono">
                      📍 <strong className="text-rose-300">Fault Location:</strong> Line {result.line}
                    </p>
                  ) : null}

                  {result.codeLine ? (
                    <div className="p-3 rounded-xl bg-black/60 border border-rose-500/30 font-mono text-xs text-rose-200 overflow-x-auto">
                      {result.codeLine}
                    </div>
                  ) : null}
                </div>

                {/* Educational Breakdown Cards */}
                <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-4">
                  
                  {/* 1. What Went Wrong */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <HelpCircle className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wide font-mono">
                        1. What Went Wrong
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-6">
                      {result.explanation}
                    </p>
                  </div>

                  {/* 2. Why It Happened */}
                  {result.whyItHappened && (
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide font-mono">
                          2. Why It Happened (Concept Lesson)
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pl-6">
                        {result.whyItHappened}
                      </p>
                    </div>
                  )}

                  {/* 3. How To Fix It */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Wrench className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide font-mono">
                        3. How To Fix It
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pl-6">
                      {result.suggestion}
                    </p>
                  </div>
                </div>

                {/* Corrected Code Card */}
                {result.correctedCode && (
                  <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono">
                          Corrected Code Solution
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleApplyFix}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <FileCode2 className="w-3.5 h-3.5" />
                          <span>Apply to Editor</span>
                        </button>
                        <button
                          onClick={handleCopyFixedCode}
                          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors border border-white/10 cursor-pointer"
                          title="Copy Fixed Code"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <pre className="p-3.5 rounded-xl bg-black/60 font-mono text-xs text-emerald-300 border border-white/10 overflow-x-auto leading-relaxed">
                      {result.correctedCode}
                    </pre>
                  </div>
                )}

              </div>
            )
          ) : (
            <div className="h-full min-h-[380px] glass-panel rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center">
              <div className="p-4 rounded-2xl bg-rose-500/15 text-rose-300 border border-rose-500/30 mb-3 shadow-inner">
                <Bug className="w-8 h-8 text-rose-300" />
              </div>
              <h3 className="text-sm font-bold text-stone-100 font-sans mb-1">
                Nothing here yet
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mb-4">
                Paste your code on the left and click "Run Debug Analysis" to inspect bug lines, root causes, and 1-click code repairs.
              </p>
              <button
                onClick={() => handleLoadBuggySnippet('js-math-variables')}
                className="px-4 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 text-xs font-semibold transition-all border border-rose-500/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Load Sample Buggy Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
