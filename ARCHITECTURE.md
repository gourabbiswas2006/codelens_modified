# CodeLens Architecture & Technical Specification

**Tagline:** *"Don't just run your code. Understand it."*

---

## 1. System Overview

CodeLens is a full-stack developer productivity application designed specifically to empower programming beginners. It provides three primary capabilities:
1. **Line-by-Line Code Explanation:** Explains what each line does in simple plain language with optional analogies.
2. **Debugging Assistant:** Pinpoints the buggy line, explains why the error happened, and presents step-by-step fix recommendations with code diffs.
3. **Terminal Error Translator:** Converts intimidating compiler/runtime error stack traces into simple 4-part human-readable answers.

---

## 2. Architecture Diagram

```text
┌─────────────────────────────────────────────────────────┐
│                 React + Vite Frontend                   │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│   │ Explain Code │  │  Debug Code  │  │ Error Translator│
│   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│          └─────────────────┼─────────────────┘          │
│                            │ HTTP REST API              │
└────────────────────────────┼────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 Node.js + Express Backend               │
│   ┌─────────────────────────────────────────────────┐   │
│   │ Middleware (JSON Parser, CORS, Vite Dev Server) │   │
│   └────────────────────────┬────────────────────────┘   │
│                            │                            │
│     ┌──────────────────────┼──────────────────────┐     │
│     ▼                      ▼                      ▼     │
│ /api/explain          /api/debug          /api/explain-error
│     │                      │                      │     │
└─────┼──────────────────────┼──────────────────────┼─────┘
      │                      │                      │
      ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────┐
│             Google Gemini AI SDK (@google/genai)        │
│                Model: gemini-3.6-flash                  │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

- **Frontend:**
  - React 19 + TypeScript
  - Vite 6
  - Tailwind CSS v4
  - Lucide React Icons
  - JSZip for project archive exporting
  - Motion for smooth entry transitions and hover effects

- **Backend:**
  - Node.js + Express.js
  - `@google/genai` (Gemini API SDK server-side)
  - `tsx` for high-performance dev execution
  - `esbuild` for production bundling (`dist/server.cjs`)

---

## 4. API Endpoints & Schemas

### `POST /api/explain`
- **Payload:** `{ "language": "javascript", "code": "...", "level": "beginner" }`
- **Returns:** Line-by-line explanation array with key concepts and optional analogies.

### `POST /api/debug`
- **Payload:** `{ "language": "javascript", "code": "..." }`
- **Returns:** Error flag, line location, plain English explanation, why it occurred, suggestion, and corrected code.

### `POST /api/explain-error`
- **Payload:** `{ "language": "javascript", "error": "ReferenceError: username is not defined" }`
- **Returns:** Simple explanation, location, likely cause, and suggested fix.

### `GET /api/export-zip`
- **Returns:** `.zip` download stream containing the full project source files.
