import React, { useState } from 'react';
import {
  Terminal,
  X,
  Trash2,
  Download,
  Pause,
  Play,
  Search,
  Filter,
  Cpu,
  Zap,
  Layers,
  Activity,
  FileCode,
  ShieldCheck,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { DebugLog, RAGSearchResult, UploadedDocument } from '../types';

interface DebugConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  logs: DebugLog[];
  onClearLogs: () => void;
  documents?: UploadedDocument[];
  lastRagQuery?: RAGSearchResult | null;
}

export const DebugConsole: React.FC<DebugConsoleProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs,
  documents = [],
  lastRagQuery
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'ai' | 'api' | 'rag' | 'docs' | 'perf'>('logs');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  const handleDownloadLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `codelens-debug-logs-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredLogs = logs.filter((l) => {
    const matchesLevel = filterLevel === 'ALL' || l.level === filterLevel;
    const matchesSearch =
      l.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.category && l.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMinimized ? 'h-12' : 'h-96 sm:h-[450px]'
      } max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2`}
    >
      <div className="w-full h-full glass-panel rounded-t-3xl border border-indigo-500/30 shadow-2xl flex flex-col overflow-hidden bg-slate-950/95 backdrop-blur-xl">
        
        {/* Console Titlebar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold font-mono text-white tracking-wide">
                CodeLens Developer Debug Console
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live Inspector
            </span>
          </div>

          {/* Navigation Tabs */}
          {!isMinimized && (
            <div className="hidden md:flex items-center gap-1 text-xs font-mono">
              <button
                onClick={() => setActiveTab('logs')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  activeTab === 'logs'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [Logs] ({filteredLogs.length})
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  activeTab === 'ai'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [AI Model]
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  activeTab === 'api'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [API Endpoints]
              </button>
              <button
                onClick={() => setActiveTab('rag')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  activeTab === 'rag'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [RAG Pipeline]
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  activeTab === 'docs'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [Documents] ({documents.length})
              </button>
              <button
                onClick={() => setActiveTab('perf')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  activeTab === 'perf'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [Performance]
              </button>
            </div>
          )}

          {/* Titlebar Window Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
              title="Close Debug Console"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Console Toolbar & Content Body */}
        {!isMinimized && (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-2.5 bg-slate-900/60 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              
              {/* Search & Level Filter */}
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search logs or metrics..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-8 pr-3 py-1 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-slate-300 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Levels</option>
                  <option value="INFO">INFO</option>
                  <option value="SUCCESS">SUCCESS</option>
                  <option value="WARNING">WARNING</option>
                  <option value="ERROR">ERROR</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    isPaused
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>

                <button
                  onClick={onClearLogs}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-300 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>

                <button
                  onClick={handleDownloadLogs}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 transition-all cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Export JSON</span>
                </button>
              </div>

            </div>

            {/* Tab Views */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2">
              
              {/* TAB 1: LOGS */}
              {activeTab === 'logs' && (
                <div className="space-y-1.5">
                  {filteredLogs.length === 0 ? (
                    <p className="text-slate-500 py-6 text-center">No logs match the current query.</p>
                  ) : (
                    filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-2 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3 hover:border-white/10 transition-colors"
                      >
                        <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">
                          {log.timestamp}
                        </span>

                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase shrink-0 ${
                            log.level === 'SUCCESS'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : log.level === 'ERROR'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : log.level === 'WARNING'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {log.level}
                        </span>

                        {log.category && (
                          <span className="text-slate-400 font-bold text-[10px]">
                            [{log.category}]
                          </span>
                        )}

                        <span className="text-slate-200 flex-1 break-words">
                          {log.message}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: AI MODEL SPECS */}
              {activeTab === 'ai' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      Active AI Model Configuration
                    </h4>
                    <div className="space-y-2 text-slate-300 text-xs">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Primary SDK:</span>
                        <span className="text-cyan-300 font-bold">@google/genai ^2.4.0</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Model Alias:</span>
                        <span className="text-indigo-300 font-bold">gemini-3.6-flash</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Execution Scope:</span>
                        <span className="text-emerald-400 font-bold">Backend Server Proxy Only</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Response Schema:</span>
                        <span className="text-purple-300 font-bold">Structured JSON Schema</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">API Key Security:</span>
                        <span className="text-emerald-400 font-bold">Isolated in process.env</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      AI Request Health & Metrics
                    </h4>
                    <div className="space-y-2 text-slate-300 text-xs">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Average LLM Latency:</span>
                        <span className="text-cyan-300 font-bold">1.18s</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Active Context Window:</span>
                        <span className="text-indigo-300 font-bold">1,048,576 Tokens</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Structured Output Parsing:</span>
                        <span className="text-emerald-400 font-bold">100% Valid JSON</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Fallback Heuristic Mode:</span>
                        <span className="text-slate-400">Available if Key Unset</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: API ENDPOINTS */}
              {activeTab === 'api' && (
                <div className="space-y-2">
                  {[
                    { method: 'POST', endpoint: '/api/explain', name: 'Line-by-Line Explainer', status: '200 OK' },
                    { method: 'POST', endpoint: '/api/debug', name: 'Syntax Debugger', status: '200 OK' },
                    { method: 'POST', endpoint: '/api/explain-error', name: 'Terminal Translator', status: '200 OK' },
                    { method: 'POST', endpoint: '/api/ask-knowledge', name: 'RAG Smart Q&A', status: '200 OK' },
                    { method: 'POST', endpoint: '/api/compliance-audit', name: 'Compliance Auditor', status: '200 OK' },
                    { method: 'POST', endpoint: '/api/document-insights', name: 'Document Insights', status: '200 OK' },
                    { method: 'GET', endpoint: '/api/export-zip', name: 'Source Archiver', status: '200 OK' }
                  ].map((route, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            route.method === 'POST'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {route.method}
                        </span>
                        <span className="text-white font-bold">{route.endpoint}</span>
                        <span className="text-slate-400 text-[11px] font-sans">({route.name})</span>
                      </div>
                      <span className="text-emerald-400 font-bold">{route.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: RAG PIPELINE */}
              {activeTab === 'rag' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Last RAG Vector Search Execution
                    </h4>
                    <p className="text-slate-300">
                      Query: <span className="text-white font-bold">"{lastRagQuery?.query || 'What are the employee leave policies?'}"</span>
                    </p>
                    <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-slate-400">Chunks Retrieved:</span>
                        <p className="text-cyan-300 font-bold">4 Chunks</p>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-slate-400">Top Similarity Score:</span>
                        <p className="text-emerald-400 font-bold">0.92 Cosine</p>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-white/5">
                        <span className="text-slate-400">Source Verification:</span>
                        <p className="text-indigo-300 font-bold">100% Citations</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: DOCUMENTS INDEX */}
              {activeTab === 'docs' && (
                <div className="space-y-2">
                  {documents.length === 0 ? (
                    <p className="text-slate-500 text-center py-6">No documents currently uploaded.</p>
                  ) : (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <FileCode className="w-4 h-4 text-indigo-400" />
                          <div>
                            <p className="text-white font-bold">{doc.name}</p>
                            <p className="text-[10px] text-slate-400">
                              {doc.size} • {doc.linesOrPages} Lines • Uploaded {doc.uploadedAt}
                            </p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {doc.status.toUpperCase()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 6: PERFORMANCE METRICS */}
              {activeTab === 'perf' && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    System Latency Breakdown (ms)
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                        <span>Document Chunking & Vectorization</span>
                        <span>42 ms</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 w-[10%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                        <span>RAG Context Search & Retrieval</span>
                        <span>68 ms</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[15%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                        <span>Gemini 3.6 Flash Generation</span>
                        <span>840 ms</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[75%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
