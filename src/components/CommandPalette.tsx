import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  FileText,
  ShieldCheck,
  BarChart3,
  Bug,
  Terminal,
  Upload,
  Download,
  Terminal as ConsoleIcon,
  Play,
  X
} from 'lucide-react';
import { Mode } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: Mode) => void;
  onToggleDebugConsole: () => void;
  onToggleDemoMode: () => void;
  onExportZip: () => void;
  isDemoMode: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectMode,
  onToggleDebugConsole,
  onToggleDemoMode,
  onExportZip,
  isDemoMode
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'explain',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      title: 'Line-by-Line Code Explainer',
      category: 'Analysis',
      action: () => {
        onSelectMode('explain');
        onClose();
      }
    },
    {
      id: 'knowledge',
      icon: <Search className="w-4 h-4 text-cyan-400" />,
      title: 'Ask CodeLens AI (Smart Q&A with Citations)',
      category: 'Knowledge',
      action: () => {
        onSelectMode('knowledge');
        onClose();
      }
    },
    {
      id: 'documents',
      icon: <FileText className="w-4 h-4 text-purple-400" />,
      title: 'Upload & Process Documents',
      category: 'Knowledge',
      action: () => {
        onSelectMode('documents');
        onClose();
      }
    },
    {
      id: 'compliance',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      title: 'Run AI Compliance & Security Audit',
      category: 'Audit',
      action: () => {
        onSelectMode('compliance');
        onClose();
      }
    },
    {
      id: 'debug',
      icon: <Bug className="w-4 h-4 text-rose-400" />,
      title: 'Debug Code & Fix Syntax Errors',
      category: 'Developer',
      action: () => {
        onSelectMode('debug');
        onClose();
      }
    },
    {
      id: 'error',
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      title: 'Translate Terminal Stack Traces',
      category: 'Developer',
      action: () => {
        onSelectMode('error');
        onClose();
      }
    },
    {
      id: 'console',
      icon: <ConsoleIcon className="w-4 h-4 text-cyan-300" />,
      title: 'Toggle Developer Debug Console',
      category: 'Developer',
      action: () => {
        onToggleDebugConsole();
        onClose();
      }
    },
    {
      id: 'demo',
      icon: <Play className="w-4 h-4 text-amber-300" />,
      title: isDemoMode ? 'Exit Hackathon Demo Mode' : 'Start Hackathon Demo Mode',
      category: 'Hackathon',
      action: () => {
        onToggleDemoMode();
        onClose();
      }
    },
    {
      id: 'zip',
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      title: 'Download Project Zip Source',
      category: 'Export',
      action: () => {
        onExportZip();
        onClose();
      }
    }
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search feature... (e.g., Compliance, Debug, Documents)"
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full p-3 rounded-2xl hover:bg-indigo-950/60 border border-transparent hover:border-indigo-500/30 flex items-center justify-between text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-800/80 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-indigo-300">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">{item.category}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300">
                  Select ↵
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">ESC</kbd> to close</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">Ctrl + K</kbd> Toggle</span>
        </div>

      </div>
    </div>
  );
};
