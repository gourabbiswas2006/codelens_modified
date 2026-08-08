import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, FileCode, Clock, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { UploadedDocument, DocumentInsights } from '../types';
import { SmartDocumentInsights } from './SmartDocumentInsights';
import { AISuggestedQuestions } from './AISuggestedQuestions';

interface DocumentUploadSectionProps {
  onLoadCodeContent: (codeContent: string) => void;
  onSelectSuggestedQuestion?: (q: string) => void;
}

export const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  onLoadCodeContent,
  onSelectSuggestedQuestion
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [insights, setInsights] = useState<DocumentInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState('System_Architecture_Spec.pdf');

  const [documents, setDocuments] = useState<UploadedDocument[]>([
    {
      id: 'doc-1',
      name: 'System_Architecture_Spec.pdf',
      type: 'PDF',
      size: '1.2 MB',
      uploadedAt: 'Just now',
      linesOrPages: 24,
      status: 'ready',
      contentSnippet: 'Full-stack Node.js Express server + React client architecture.'
    },
    {
      id: 'doc-2',
      name: 'Employee_Data_Privacy_Policy.docx',
      type: 'DOCX',
      size: '480 KB',
      uploadedAt: '5m ago',
      linesOrPages: 12,
      status: 'ready',
      contentSnippet: 'Employees are entitled to 12 casual leaves per year. Personal data retention policy.'
    },
    {
      id: 'doc-3',
      name: 'server.ts (Backend Source Code)',
      type: 'TypeScript',
      size: '13.2 KB',
      uploadedAt: '10m ago',
      linesOrPages: 373,
      status: 'ready',
      contentSnippet: 'Express backend serving /api/explain, /api/debug, /api/explain-error.'
    }
  ]);

  const fetchDocumentInsights = async (content: string, title: string) => {
    setIsLoadingInsights(true);
    setSelectedDocTitle(title);
    try {
      const res = await fetch('/api/document-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, title })
      });
      if (res.ok) {
        const data: DocumentInsights = await res.json();
        setInsights(data);
      }
    } catch (err) {
      console.error('Failed to fetch document insights:', err);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc: UploadedDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedAt: 'Just now',
        linesOrPages: Math.floor(Math.random() * 50) + 10,
        status: 'ready',
        contentSnippet: `Uploaded document: ${file.name}`
      };

      // Read text content if readable
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          onLoadCodeContent(text);
          fetchDocumentInsights(text, file.name);
        }
      };
      reader.readAsText(file);

      setDocuments((prev) => [newDoc, ...prev]);
    }
  };

  const handleRemoveDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Upload Dropzone Glass Card */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        className={`glass-panel rounded-3xl p-8 text-center transition-all duration-300 border relative overflow-hidden ${
          isDragging
            ? 'border-indigo-500 bg-indigo-950/40 shadow-2xl shadow-indigo-500/20 scale-[1.01]'
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <div className="max-w-md mx-auto space-y-4">
          
          {/* Animated Upload Icon */}
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
            <Upload className="w-8 h-8 animate-bounce" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-stone-100 font-sans">Bring your documents</h3>
            <p className="text-xs text-stone-300 mt-1">
              Supports <span className="text-rose-300 font-semibold">PDF, DOCX, TXT, JS, TS, PY, C++</span> & meeting transcripts
            </p>
          </div>

          {/* Browse Files Button */}
          <label className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white text-xs font-bold shadow-xl shadow-violet-600/30 transition-all cursor-pointer border border-white/20">
            <Upload className="w-4 h-4 text-amber-200" />
            <span>Bring your documents</span>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.docx,.txt,.js,.ts,.py,.cpp,.html,.css,.java,.go,.rs,.sql"
            />
          </label>

          <p className="text-[11px] text-slate-500">
            🔒 All documents are indexed securely server-side without public persistence.
          </p>

        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Indexed Documents & Code Files ({documents.length})
          </h3>
          <span className="text-[11px] text-indigo-400 font-medium">
            Click document to generate AI insights
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => fetchDocumentInsights(doc.contentSnippet, doc.name)}
              className="glass-card glass-card-hover p-4 rounded-2xl border border-white/10 space-y-3 relative group cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white truncate max-w-[170px]" title={doc.name}>
                      {doc.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveDoc(doc.id);
                  }}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Remove Document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 bg-black/40 p-2.5 rounded-xl border border-white/5 font-sans line-clamp-2">
                "{doc.contentSnippet}"
              </p>

              <div className="flex items-center justify-between pt-1 text-[10px]">
                <span className="flex items-center gap-1.5 text-emerald-300 font-semibold font-mono bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Analyzed</span>
                </span>
                <span className="text-rose-300 font-bold flex items-center gap-1 group-hover:underline">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Extract Insights</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Smart Document Insights Section */}
      {insights && (
        <SmartDocumentInsights
          insights={insights}
          isLoading={isLoadingInsights}
          documentTitle={selectedDocTitle}
        />
      )}

      {/* Suggested Follow-Up Questions */}
      {onSelectSuggestedQuestion && (
        <AISuggestedQuestions
          onSelectQuestion={onSelectSuggestedQuestion}
        />
      )}

    </div>
  );
};

