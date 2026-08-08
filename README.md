# CodeLens — Developer Productivity Web App

> **"Don't just run your code. Understand it."**

CodeLens is a beginner-friendly developer productivity web application that helps new programmers comprehend code line-by-line, debug tricky syntax/logic errors with root-cause education, and translate intimidating terminal stack traces into simple English.

---

## 🌟 Key Features

1. **Line-by-Line Code Explainer (`POST /api/explain`)**
   - Paste code in JavaScript, Python, C++, TypeScript, Java, HTML/CSS, Go, Rust, or SQL.
   - Get simple, line-level breakdowns synchronized with interactive line highlighting.
   - Toggle between **Plain English**, **Analogy Mode (ELI5)**, and **Concept Deep Dive**.

2. **Debugging Assistant (`POST /api/debug`)**
   - Submit code containing syntax or logical errors.
   - Highlights the exact problematic line.
   - Explains *What went wrong*, *Why it happened*, and provides an interactive before/after code diff fix.

3. **Terminal Error Translator (`POST /api/explain-error`)**
   - Paste compiler errors, npm failures, Python tracebacks, or runtime stack traces.
   - Translates confusing error output into:
     - **What happened**
     - **Where**
     - **Why**
     - **How to fix it**

4. **1-Click Project Zip Download**
   - Export the entire codebase directly as a `.zip` archive from the header button.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- Gemini API Key (stored in `GEMINI_API_KEY` environment variable)

### Installation & Execution
```bash
# Install dependencies
npm install

# Start development server (Node.js + Express + Vite)
npm run dev

# Build for production
npm run build

# Start production build
npm run start
```

---

## 📁 Repository Structure

- `agents/code-explanation-agent.md` — Custom AI agent specification
- `skills/beginner-code-analysis/SKILL.md` — Custom skill workflow
- `ARCHITECTURE.md` — Full system architecture & design specification
- `AGENTS.md` — Agent rules & operational guidelines
- `AGENTS_AND_SKILLS.md` — Agent and skill index
- `.github/workflows/ci.yml` — GitHub Actions CI pipeline
- `server.ts` — Node.js Express server powering API endpoints & Gemini integration
- `src/` — React 19 + Tailwind CSS frontend interface
