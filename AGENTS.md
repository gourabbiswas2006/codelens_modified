# CodeLens Agent Rules & Guidelines

Welcome to **CodeLens**! This file defines the core directives for AI agents operating within this project.

## Core Directives

1. **Prioritize Beginner Comprehension Over Complexity:**
   - Always assume the user is learning to code for the first time.
   - Avoid intimidating academic terminology without defining it inline or with an analogy.

2. **Strict Schema Compliance:**
   - All backend AI endpoints (`/api/explain`, `/api/debug`, `/api/explain-error`) MUST return valid JSON matching the specified schemas.
   - Never output raw unformatted text or conversational preamble when structured JSON is requested.

3. **Backend-Only AI Execution:**
   - All AI API calls (Gemini SDK) must execute securely on the Node.js Express server (`server.ts`).
   - The frontend React client must never call AI services directly or expose API keys.

4. **1-Based Line Synchronization:**
   - Explanations and debug flags MUST map accurately to 1-based line numbers matching the user's input code string.
