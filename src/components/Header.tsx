import React from 'react';
import {
  Code2,
  Sparkles,
  FileText,
  ShieldCheck,
  BarChart3,
  Bug,
  Terminal,
  Download,
  FileCode,
  Globe,
  Search,
  Cpu,
  Play
} from 'lucide-react';
import { Mode, Language } from '../types';

interface HeaderProps {
  currentMode: Mode;
  onSelectMode: (mode: Mode) => void;
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onExportZip: () => void;
  onOpenDocs: () => void;
  isExportingZip: boolean;
  onOpenCommandPalette: () => void;
  onToggleDebugConsole: () => void;
  onToggleDemoMode: () => void;
  isDebugConsoleOpen: boolean;
  isDemoMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  selectedLanguage,
  onSelectLanguage,
  onExportZip,
  onOpenDocs,
  isExportingZip,
  onOpenCommandPalette,
  onToggleDebugConsole,
  onToggleDemoMode,
  isDebugConsoleOpen,
  isDemoMode
}) => {
  const languages: { value: Language; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML / CSS' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'sql', label: 'SQL' }
  ];

  return (
    <div className="sticky top-3 z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
      <header className="glass-nav rounded-2xl p-2.5 px-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 transition-all border border-indigo-500/20 shadow-xl">
        
        {/* Left: Brand Logo + Status */}
        <div className="flex items-center justify-between lg:justify-start gap-3">
          <div
            onClick={() => onSelectMode('explain')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-violet-600 via-rose-500 to-amber-400 text-white shadow-lg shadow-violet-600/30 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-amber-50 font-sans">
                  CodeLens
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-gradient-to-r from-violet-500/20 to-rose-500/20 text-rose-300 ring-1 ring-rose-500/30">
                  AI Workspace
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium hidden sm:block">
                Clear Intelligence & Compliance
              </p>
            </div>
          </div>

          {/* AI Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-violet-400 to-rose-400 shadow-md"></span>
            </span>
            <span className="text-[11px] font-sans font-semibold tracking-wide text-rose-200">
              CodeLens AI <span className="text-violet-300 font-normal">· Ready to help</span>
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar text-xs">
          <button
            onClick={() => onSelectMode('explain')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 font-medium whitespace-nowrap cursor-pointer ${
              currentMode === 'explain'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explain Code</span>
          </button>

          <button
            onClick={() => onSelectMode('knowledge')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 font-medium whitespace-nowrap cursor-pointer ${
              currentMode === 'knowledge'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Smart Q&A</span>
          </button>

          <button
            onClick={() => onSelectMode('documents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 font-medium whitespace-nowrap cursor-pointer ${
              currentMode === 'documents'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Documents</span>
          </button>

          <button
            onClick={() => onSelectMode('compliance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 font-medium whitespace-nowrap cursor-pointer ${
              currentMode === 'compliance'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compliance</span>
          </button>

          <button
            onClick={() => onSelectMode('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 font-medium whitespace-nowrap cursor-pointer ${
              currentMode === 'analytics'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => onSelectMode('debug')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 font-medium whitespace-nowrap cursor-pointer ${
              currentMode === 'debug'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Debug</span>
          </button>

          <button
            onClick={() => onSelectMode('error')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 font-medium whitespace-nowrap cursor-pointer ${
              currentMode === 'error'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Error Logs</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center justify-between lg:justify-end gap-2">
          
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-white/10 text-slate-300 text-xs font-mono transition-all cursor-pointer"
            title="Open Command Palette (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden xl:inline text-slate-400">Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-slate-800 text-slate-400 border border-white/5">
              ⌘K
            </kbd>
          </button>

          {/* Dev Console Toggle */}
          <button
            onClick={onToggleDebugConsole}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              isDebugConsoleOpen
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
            title="Toggle Developer Debug Console"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Dev Console</span>
          </button>

          {/* Demo Mode Toggle */}
          <button
            onClick={onToggleDemoMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              isDemoMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
            title="Toggle Hackathon Demo Mode"
          >
            <Play className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span className="hidden sm:inline">Demo</span>
          </button>

          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => onSelectLanguage(e.target.value as Language)}
            className="glass-input text-slate-200 text-xs rounded-xl px-2.5 py-1.5 border border-white/10 font-mono cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value} className="bg-slate-900 text-slate-200">
                {lang.label}
              </option>
            ))}
          </select>

          {/* Hackathon Specs Button */}
          <button
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-all cursor-pointer"
            title="Inspect Hackathon Specifications"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Specs</span>
          </button>

          {/* Export Zip */}
          <button
            onClick={onExportZip}
            disabled={isExportingZip}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isExportingZip ? 'Zipping...' : 'Export Zip'}</span>
          </button>

        </div>

      </header>
    </div>
  );
};

