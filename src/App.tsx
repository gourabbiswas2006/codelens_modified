import React, { useState, useEffect } from 'react';
import { BackgroundGlow } from './components/BackgroundGlow';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureCardsGrid } from './components/FeatureCardsGrid';
import { DocumentUploadSection } from './components/DocumentUploadSection';
import { ExplainView } from './components/ExplainView';
import { SmartQAChat } from './components/SmartQAChat';
import { ComplianceView } from './components/ComplianceView';
import { AnalyticsView } from './components/AnalyticsView';
import { DebugView } from './components/DebugView';
import { TerminalErrorView } from './components/TerminalErrorView';
import { HackathonDocsModal } from './components/HackathonDocsModal';
import { AICommandCenter } from './components/AICommandCenter';
import { CommandPalette } from './components/CommandPalette';
import { DemoModeBanner } from './components/DemoModeBanner';
import { DebugConsole } from './components/DebugConsole';
import { SourceExplorerModal } from './components/SourceExplorerModal';
import {
  Mode,
  Language,
  ExplainLevel,
  ExplainResponse,
  DebugResponse,
  ErrorTranslationResponse,
  Citation,
  DebugLog
} from './types';
import { EXAMPLES } from './data/examples';

export default function App() {
  const [currentMode, setCurrentMode] = useState<Mode>('explain');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');
  const [selectedLevel, setSelectedLevel] = useState<ExplainLevel>('beginner');

  // Input States
  const [code, setCode] = useState<string>(EXAMPLES[0].code);
  const [errorText, setErrorText] = useState<string>(EXAMPLES[0].terminalError || '');

  // Response States
  const [explainResult, setExplainResult] = useState<ExplainResponse | null>(null);
  const [debugResult, setDebugResult] = useState<DebugResponse | null>(null);
  const [errorResult, setErrorResult] = useState<ErrorTranslationResponse | null>(null);

  // Loading States
  const [isLoadingExplain, setIsLoadingExplain] = useState(false);
  const [isLoadingDebug, setIsLoadingDebug] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);

  // Modals & Panels State
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDebugConsoleOpen, setIsDebugConsoleOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [inspectedCitation, setInspectedCitation] = useState<Citation | null>(null);

  // Debug Console Logs
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>([
    {
      id: 'log-1',
      timestamp: new Date().toLocaleTimeString(),
      level: 'INFO',
      message: 'Server listening on port 3000 (0.0.0.0)'
    },
    {
      id: 'log-2',
      timestamp: new Date().toLocaleTimeString(),
      level: 'INFO',
      message: 'Gemini SDK initialized via server proxy routes'
    },
    {
      id: 'log-3',
      timestamp: new Date().toLocaleTimeString(),
      level: 'SUCCESS',
      message: 'Document RAG vectors indexed: 3 documents online'
    }
  ]);

  // Global Key Listener for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addLog = (level: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS', module: string, message: string) => {
    const newLog: DebugLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level,
      message: `[${module}] ${message}`
    };
    setDebugLogs((prev) => [newLog, ...prev]);
  };

  // 1. API Call: Explain Code
  const handleExplainCode = async (levelToUse: ExplainLevel = selectedLevel) => {
    if (!code.trim()) return;
    setIsLoadingExplain(true);
    addLog('INFO', 'AI Explain', `Requesting level=${levelToUse} for ${selectedLanguage}`);

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          code,
          level: levelToUse
        })
      });

      const contentType = res.headers.get('content-type') || '';
      let data: ExplainResponse;

      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0, 100)}`);
      }

      if (!res.ok) {
        throw new Error((data as any).error || `Server returned ${res.status}`);
      }

      setExplainResult(data);
      addLog('SUCCESS', 'AI Explain', `Received ${data.explanations?.length || 0} line explanations`);
    } catch (err: any) {
      console.error('Failed to explain code:', err);
      addLog('ERROR', 'AI Explain', `Failed to analyze code: ${err.message}`);
    } finally {
      setIsLoadingExplain(false);
    }
  };

  // 2. API Call: Debug Code
  const handleDebugCode = async () => {
    if (!code.trim()) return;
    setIsLoadingDebug(true);
    addLog('INFO', 'AI Debugger', `Analyzing code for syntax & logic bugs...`);

    try {
      const res = await fetch('/api/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          code
        })
      });

      const contentType = res.headers.get('content-type') || '';
      let data: DebugResponse;

      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0, 100)}`);
      }

      if (!res.ok) {
        throw new Error((data as any).error || `Server returned ${res.status}`);
      }

      setDebugResult(data);
      addLog('SUCCESS', 'AI Debugger', data.hasError ? `Bug identified: ${data.errorType || 'Syntax Error'}` : 'Code validated cleanly');
    } catch (err: any) {
      console.error('Failed to debug code:', err);
      addLog('ERROR', 'AI Debugger', `Debug analysis failed: ${err.message}`);
    } finally {
      setIsLoadingDebug(false);
    }
  };

  // 3. API Call: Translate Error
  const handleTranslateError = async () => {
    if (!errorText.trim()) return;
    setIsLoadingError(true);
    addLog('INFO', 'Error Translator', `Translating stack trace error...`);

    try {
      const res = await fetch('/api/explain-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          error: errorText
        })
      });

      const contentType = res.headers.get('content-type') || '';
      let data: ErrorTranslationResponse;

      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0, 100)}`);
      }

      if (!res.ok) {
        throw new Error((data as any).error || `Server returned ${res.status}`);
      }

      setErrorResult(data);
      addLog('SUCCESS', 'Error Translator', `Error translated into beginner-friendly explanation`);
    } catch (err: any) {
      console.error('Failed to translate error:', err);
      addLog('ERROR', 'Error Translator', `Error translation failed: ${err.message}`);
    } finally {
      setIsLoadingError(false);
    }
  };

  // 4. Download Whole Project as Zip
  const handleExportZip = async () => {
    setIsExportingZip(true);
    addLog('INFO', 'Zip Export', `Packaging project files for download...`);
    try {
      const response = await fetch('/api/export-zip');
      if (!response.ok) {
        throw new Error('Failed to generate zip file');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'codelens-project.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      addLog('SUCCESS', 'Zip Export', `Project zip exported successfully`);
    } catch (err: any) {
      console.error('Failed to export zip:', err);
      addLog('ERROR', 'Zip Export', `Export failed: ${err.message}`);
      alert('Could not download project zip. Check backend logs.');
    } finally {
      setIsExportingZip(false);
    }
  };

  // Demo Preset Trigger
  const handleRunDemoPreset = (presetCode: string, lang: Language) => {
    setCode(presetCode);
    setSelectedLanguage(lang);
    setCurrentMode('explain');
    handleExplainCode('beginner');
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative">
      
      {/* Ambient Liquid Glass Background */}
      <BackgroundGlow />

      {/* Demo Mode Top Banner */}
      {isDemoMode && (
        <DemoModeBanner
          onExitDemo={() => setIsDemoMode(false)}
          onRunPreset={handleRunDemoPreset}
        />
      )}

      {/* Floating Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onExportZip={handleExportZip}
        onOpenDocs={() => setIsDocsOpen(true)}
        isExportingZip={isExportingZip}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleDebugConsole={() => setIsDebugConsoleOpen((prev) => !prev)}
        onToggleDemoMode={() => setIsDemoMode((prev) => !prev)}
        isDebugConsoleOpen={isDebugConsoleOpen}
        isDemoMode={isDemoMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 relative z-10">
        
        {/* Hero Banner Section */}
        <HeroSection onSelectMode={setCurrentMode} />

        {/* Feature Cards Showcase */}
        <FeatureCardsGrid onSelectMode={setCurrentMode} />

        {/* AI Command Center */}
        <AICommandCenter
          currentMode={currentMode}
          onSelectMode={setCurrentMode}
          onRunExplain={() => handleExplainCode()}
          onRunDebug={() => handleDebugCode()}
          onRunErrorTranslate={() => handleTranslateError()}
          isProcessing={isLoadingExplain || isLoadingDebug || isLoadingError}
        />

        {/* Dynamic Mode Views */}
        {currentMode === 'explain' && (
          <ExplainView
            language={selectedLanguage}
            code={code}
            onChangeCode={setCode}
            onExplain={(lvl) => {
              setSelectedLevel(lvl);
              handleExplainCode(lvl);
            }}
            isLoading={isLoadingExplain}
            result={explainResult}
            selectedLevel={selectedLevel}
            onChangeLevel={(lvl) => {
              setSelectedLevel(lvl);
              if (explainResult) {
                handleExplainCode(lvl);
              }
            }}
          />
        )}

        {currentMode === 'knowledge' && (
          <SmartQAChat
            contextCode={code}
            onInspectCitation={(cit) => setInspectedCitation(cit)}
          />
        )}

        {currentMode === 'documents' && (
          <DocumentUploadSection
            onLoadCodeContent={(newCode) => {
              setCode(newCode);
              setCurrentMode('explain');
            }}
          />
        )}

        {currentMode === 'compliance' && (
          <ComplianceView code={code} language={selectedLanguage} />
        )}

        {currentMode === 'analytics' && (
          <AnalyticsView />
        )}

        {currentMode === 'debug' && (
          <DebugView
            language={selectedLanguage}
            code={code}
            onChangeCode={setCode}
            onDebug={handleDebugCode}
            isLoading={isLoadingDebug}
            result={debugResult}
          />
        )}

        {currentMode === 'error' && (
          <TerminalErrorView
            language={selectedLanguage}
            errorText={errorText}
            onChangeErrorText={setErrorText}
            onTranslateError={handleTranslateError}
            isLoading={isLoadingError}
            result={errorResult}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-6 text-center text-xs text-slate-400 relative z-10 mt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong className="text-white font-mono">CodeLens</strong> — Built for Hackathon Track B: Enterprise Code & Document Intelligence.
          </p>
          <p className="text-slate-500 font-mono">
            Node.js • Express • React • Vite • Liquid Glass UI • Gemini AI
          </p>
        </div>
      </footer>

      {/* Developer Debug Console Panel */}
      <DebugConsole
        isOpen={isDebugConsoleOpen}
        onClose={() => setIsDebugConsoleOpen(false)}
        logs={debugLogs}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectMode={(mode) => {
          setCurrentMode(mode);
          setIsCommandPaletteOpen(false);
        }}
        onSelectLanguage={(lang) => {
          setSelectedLanguage(lang);
          setIsCommandPaletteOpen(false);
        }}
        onToggleDebugConsole={() => {
          setIsDebugConsoleOpen((prev) => !prev);
          setIsCommandPaletteOpen(false);
        }}
        onToggleDemoMode={() => {
          setIsDemoMode((prev) => !prev);
          setIsCommandPaletteOpen(false);
        }}
      />

      {/* Source Citation Inspector Modal */}
      {inspectedCitation && (
        <SourceExplorerModal
          isOpen={!!inspectedCitation}
          onClose={() => setInspectedCitation(null)}
          citation={inspectedCitation}
        />
      )}

      {/* Hackathon Deliverables Modal */}
      <HackathonDocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

    </div>
  );
}

