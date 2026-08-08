# Agents and Skills Index — CodeLens

This document indexes all custom AI agents and skills implemented within the CodeLens project.

---

## Custom Agents

### 1. Code Explanation & Debugging Agent
- **Location:** `agents/code-explanation-agent.md`
- **Role:** Analyzes source code, explains logic line-by-line, identifies bugs with root-cause education, and translates terminal stack traces into plain English.
- **Used by Endpoints:**
  - `POST /api/explain`
  - `POST /api/debug`
  - `POST /api/explain-error`

---

## Custom Skills

### 1. Beginner Code Analysis Skill
- **Location:** `skills/beginner-code-analysis/SKILL.md`
- **Description:** A step-by-step workflow covering language detection, syntax/logical decomposition, plain-English mapping with analogies, and structured JSON generation.
