---
name: "beginner-code-analysis"
description: >
  Workflow for converting programming code and terminal errors into simple, beginner-friendly explanations with line-by-line breakdowns and actionable fix recommendations.
---

# Beginner Code Analysis Skill

This skill defines the end-to-end analysis workflow used by CodeLens to make programming accessible to beginners.

## Workflow

```
       [ Input Received: Code / Error Stack ]
                        ↓
             [ Language Identification ]
                        ↓
     [ Syntax & Logical Decomposition ]
                        ↓
   ┌────────────────────┼────────────────────┐
   ↓                    ↓                    ↓
[ Line-by-Line ]   [ Code Debug ]    [ Error Translation ]
   ↓                    ↓                    ↓
   └────────────────────┼────────────────────┘
                        ↓
         [ Plain English Mapping & Analogy ]
                        ↓
        [ Enforce Structured JSON Schema ]
                        ↓
            [ Return Backend Response ]
```

## Step Guidelines

### Step 1: Input Analysis & Language Normalization
- Identify programming language (`javascript`, `python`, `cpp`, `typescript`, `html`, `css`, `java`, `go`, `rust`, `sql`).
- Strip unnecessary formatting noise while keeping exact line numbering.

### Step 2: Line-by-Line Decomposition (`/api/explain`)
- Iterate through each non-empty line or meaningful code statement.
- Pair the exact line content with a 1-2 sentence explanation tailored for someone who has never coded before.
- Add an optional "Analogy" (e.g. comparing a variable to a labeled box, or an if-statement to a fork in the road).

### Step 3: Debugging Logic (`/api/debug`)
- Identify syntax errors, runtime exceptions, logic flaws, or missing variable declarations.
- Flag the precise line number.
- Explain *What* happened, *Why* it happened, and *How to fix it*.
- Provide clean, corrected code ready to be applied.

### Step 4: Terminal Error Translation (`/api/explain-error`)
- Parse cryptic logs (e.g., `ReferenceError`, `NullPointerException`, `Segmentation fault`).
- Extract the core message and translate it into:
  - **What happened**
  - **Where it occurred**
  - **Why it occurred**
  - **How to fix it**

### Step 5: JSON Schema Enforcer
- Ensure responses strictly adhere to the expected JSON structures without markdown wrapper text unless formatted as JSON.
