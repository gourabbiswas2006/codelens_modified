import React, { useState } from 'react';
import { X, FileCode, Check, Copy } from 'lucide-react';

interface HackathonDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HackathonDocsModal: React.FC<HackathonDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    'arch' | 'agents' | 'index' | 'agent_spec' | 'skill_spec' | 'ci' | 'readme'
  >('arch');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const docsContent = {
    arch: `# CodeLens Architecture & Technical Specification

**Tagline:** "Your Knowledge. Verified by AI."

CodeLens is a full-stack developer productivity and enterprise document intelligence platform.

## System Components
1. **Frontend:** React 18, Vite, Tailwind CSS, Liquid Glass UI, Lucide Icons, JSZip.
2. **Backend:** Node.js, Express.js server, Gemini AI SDK (@google/genai).
3. **API Contracts:**
   - POST /api/explain
   - POST /api/debug
   - POST /api/explain-error
   - POST /api/ask-knowledge
   - POST /api/compliance-audit
   - GET /api/export-zip`,

    agents: `# CodeLens Agent Rules & Guidelines

1. **Prioritize Beginner Comprehension Over Complexity:**
   - Always assume the user is learning to code for the first time.
   - Avoid intimidating academic terminology without defining it inline.

2. **Strict Schema Compliance:**
   - All backend AI endpoints MUST return valid JSON matching defined TypeScript schemas.

3. **Backend-Only AI Execution:**
   - All AI API calls execute securely on the Node.js Express server (server.ts).`,

    index: `# Agents and Skills Index — CodeLens

## Custom Agents
- **Code Explanation Agent:** agents/code-explanation-agent.md

## Custom Skills
- **Beginner Code Analysis:** skills/beginner-code-analysis/SKILL.md`,

    agent_spec: `# Custom Agent Specification: Code Explanation & Debugging Agent

Role: Beginner-Friendly Code Analysis & Enterprise Intelligence Expert
Location: agents/code-explanation-agent.md

Objectives:
- Explain code line-by-line in plain English, analogies, or deep dives.
- Identify errors and provide educational root-cause explanations.
- Translate terminal stack traces into simple 4-part answers.`,

    skill_spec: `# Custom Skill: Beginner Code Analysis

Location: skills/beginner-code-analysis/SKILL.md

Workflow:
Input -> Language ID -> Syntax Decomposition -> Plain English Mapping -> Enforce JSON Schema -> Return Response`,

    ci: `name: CI Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
      - name: Install Dependencies
        run: npm ci
      - name: Type Check
        run: npm run lint
      - name: Build Application
        run: npm run build`,

    readme: `# CodeLens — Enterprise AI Knowledge & Code Intelligence Platform

"Your Knowledge. Verified by AI."

A Track B Developer Productivity web app built with liquid glass UI.`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(docsContent[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel border border-white/10 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-mono">
                Hackathon Artifact Inspector
              </h2>
              <p className="text-xs text-slate-400">
                Inspect mandatory project specifications and agent rules.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-black/60 border-b border-white/10 overflow-x-auto text-xs font-mono no-scrollbar">
          <button
            onClick={() => setActiveTab('arch')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'arch' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ARCHITECTURE.md
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'agents' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            AGENTS.md
          </button>
          <button
            onClick={() => setActiveTab('agent_spec')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'agent_spec' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            code-explanation-agent.md
          </button>
          <button
            onClick={() => setActiveTab('skill_spec')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'skill_spec' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            beginner-code-analysis/SKILL.md
          </button>
          <button
            onClick={() => setActiveTab('index')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'index' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            AGENTS_AND_SKILLS.md
          </button>
          <button
            onClick={() => setActiveTab('ci')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'ci' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ci.yml
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'readme' ? 'bg-indigo-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            README.md
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-200 bg-black/40 leading-relaxed flex-1">
          <pre className="whitespace-pre-wrap">{docsContent[activeTab]}</pre>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-slate-950/90">
          <span className="text-xs text-slate-400">
            All files are stored at project root and included in <code className="text-emerald-400 font-mono">.zip</code> export.
          </span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors border border-white/10 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy File Content'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
