# LEONE {{VERSION}} — AI-First Development System

> **AI Partner Profile** — Optimized for 1 Human + 1 AI partnership.
> Lead your AI with confidence.

---

## 📜 Copyright & License

**© 2026 NETELITE. All rights reserved.**

This methodology is licensed under **CC BY-SA 4.0**.
See [LICENSE-METHODOLOGY](../LICENSE-METHODOLOGY) for details.

**LEONE** is a trademark of NETELITE.

### You are free to:
- ✅ Use for personal and commercial projects
- ✅ Modify and improve
- ✅ Distribute your modifications

### But you must:
- ✅ Give credit to NETELITE
- ✅ Release modifications under CC BY-SA 4.0

---

## 🚀 Quick Start

### For Project Owner (Human)

| Step | Action | Output |
|------|--------|--------|
| 1 | Tell me what you want to build | I'll choose workflow |
| 2 | Review my plan | Approve/revise |
| 3 | Say "approved" / "go" / "yes" | I start building |
| 4 | Review at checkpoints | I present work for your review |

### For You (AI)

```
1. AGENTS.md auto-reads at session start (bootstrap)
2. Loads SYSTEM.md, WORKFLOW.md, RULES.md automatically
3. Follows methodology for all work
4. Runs self-review before saying "done"
5. Auto-generates session summary at end
```

### ⚡ AI CLI Auto-Bootstrap

When using any supported AI CLI, the `AGENTS.md` file ensures methodology is loaded automatically.
**You don't need to copy-paste any prompt.** Just start your AI CLI in the project folder and give your task.

```bash
cd my-project
# Start your AI CLI (Qwen, Gemini, or other supported tools)
# AI automatically reads AGENTS.md → loads LEONE → says "LEONE {{VERSION}} loaded. Ready for task."
# You: "Make invoice module"
```

---

## 📁 File Structure

```
.leone/
├── AGENTS.md              # ⚡ AUTO-BOOTSTRAP — AI CLI reads this first!
├── README.md              # This file - how to use the system
├── SYSTEM.md              # Operating principles + AI optimization
├── ARCHITECTURE.md        # Layer responsibilities + structure
├── DATA_LAYER.md          # Database rules + migrations
├── TESTING.md             # Testing rules + examples
├── RULES.md               # Coding standards & anti-patterns
├── WORKFLOW.md            # Feature development + approval + pivot
├── STACK.md               # Tech stack & conventions (CUSTOMIZABLE)
├── SESSION_CONTEXT.md     # Auto-generated session summary
├── AI_INSTRUCTIONS.md     # Tool usage + auto-summary generation
├── PROJECT_MAP.md         # File structure reference (CUSTOMIZABLE)
└── plans/
    ├── LIGHT.md           # Bug fixes (< 1 hour)
    ├── STANDARD.md        # Most features
    └── FULL.md            # Complex features
```

**Total:** 14 files (11 core + 3 plan templates)

---

## 🛠️ Supported AI Tools

LEONE is **AI-agnostic** — it works with any AI coding assistant that reads project files at session start.

### Tested & Verified
| Tool | Status | Notes |
|------|--------|-------|
| **Qwen CLI** | ✅ Verified | Primary development & testing platform |
| **Gemini** | ✅ Verified | Auto-bootstrap and workflow compliance confirmed |

### Coming Soon
- 🔜 We're continuously testing LEONE on additional AI models
- 🔜 Future releases will list all successfully tested platforms

### How Auto-Bootstrap Works
Any AI CLI that reads `AGENTS.md` at session start will automatically load the full LEONE methodology — no manual prompt copy-paste needed.

---

## 🎯 Workflow Selection

| Workflow | Use For | Approval | Est. Time |
|----------|---------|----------|-----------|
| **FAST_TRACK** | Bug fixes, minor changes | ❌ No | < 1 hour |
| **STANDARD** | New features, CRUD | ✅ Yes | 2-4 hours |
| **FULL** | Complex features, modules | ✅ Yes (detailed) | 4+ hours |

---

## ✅ Approval Options

See [SYSTEM.md#approval-options](SYSTEM.md#approval-options) for all response options.

**Common:** `"approved"` / `"go"` / `"yes"` or `"revise: [reason]"`

---

## ✨ What's New in {{VERSION}} — AI Partner Profile + Progress Reporting

{{VERSION}} is optimized specifically for **1 Human + 1 AI** development with auto-bootstrap. Key changes:

### Added
| Feature | Where | Why |
|---------|-------|-----|
| **Context Reset Procedure** | SYSTEM.md | AI loses context in long sessions — this manages the constraint |
| **AI Self-Review Checklist** | SYSTEM.md | AI says "done" too early — self-review catches issues before user sees them |
| **Stop & Redirect** | SYSTEM.md | Instant stop mechanism without pivot ceremony |
| **Human Review Points** | SYSTEM.md | Defines exactly when the user steps in and what to check |
| **Plan Recovery Procedure** | WORKFLOW.md | Handles fundamentally wrong plans (not just mid-implementation blockers) |
| **Smart Reuse Decision Tree** | RULES.md | Concrete decision tree instead of vague "search before create" |
| **Performance Budget** | RULES.md | Prevents silent performance degradation (bundle size, N+1 queries) |
| **i18n Workflow** | RULES.md | Concrete workflow for "no hardcoded strings" rule |
| **Secret Management** | DATA_LAYER.md | How to handle .env, API keys, JWT secrets |
| **N+1 Query Prevention** | DATA_LAYER.md | Most common performance mistake — prevented by design |
| **Vitest + Factories + Mocking** | TESTING.md | Modern test stack, test data factories, external service mocking |
| **AGENTS.md (Auto-Bootstrap)** | AGENTS.md | Any AI CLI auto-loads LEONE — zero manual work |

### Removed / Simplified
| What | Why |
|------|-----|
| "Team" references | You are solo — no team to discuss with |
| Time estimates in plans | AI has no reliable time sense |
| Enterprise risk matrices | Overhead for solo development |
| FULL plan bloat (483 → ~150 lines) | 80% was noise for 1+AI setup |
| 80% test coverage requirement | 60% is pragmatic for solo, 80% for production |

### Fixed
| What | Issue |
|------|-------|
| `any` type in AuditService | Violated own "no any" rule |

---

## 🔑 Key Principles

### The Holy Trinity
```
1. ARCHITECTURE    → Modular, clean, decoupled
2. DATA INTEGRITY  → Strict types, validation, proper data handling
3. SECURITY        → RBAC, audit logs, secure APIs
```

### Core Rules
- **Plan before code** — Never write without understanding
- **Follow the flow** — DB → Migration → Validation → API → UI
- **Security first** — RBAC on every protected endpoint
- **Modularity** — Max 200 lines per file

### Anti-Patterns (Never)
- ❌ `any` types
- ❌ Float math for money
- ❌ Skipping RBAC
- ❌ Files in database
- ❌ Hardcoded strings (use i18n)

---

## 📋 How You Work

### Your Output Format
```markdown
## Status
[What's happening]

## Analysis
[What you found/think]

## Recommendation
[What you suggest]

## Next Step
[What happens next / what you need from user]
```

### When You Need User Input
| When | Your Action |
|------|-------------|
| Ambiguous request | Ask clarifying question |
| Trade-off needed | Present options with recommendation |
| Plan approval | Wait for explicit response |
| Blocker found | Propose solutions (A/B/C) |
| Mid-implementation pivot | Stop → Explain → Options → Wait |

### When You Work Independently
| Task | You Will Just Do It |
|------|---------------------|
| Following approved plan | ✅ |
| Standard CRUD | ✅ |
| Bug fixes (FAST_TRACK) | ✅ |
| Documentation | ✅ |
| Auto-summary at session end | ✅ |

---

## 🔄 Session Flow

```
┌─────────────────────────────────────────────────────────────┐
│  SESSION START                                              │
│  → Load SESSION_CONTEXT.md (if exists)                      │
│  → Understand current state                                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  RECEIVE TASK                                               │
│  → Choose workflow (LIGHT/STANDARD/FULL)                    │
│  → Ask clarifying questions if needed                       │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  CREATE PLAN                                                │
│  → Present to Project Owner                                 │
│  → Wait for approval                                        │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  APPROVAL CHECK                                             │
│  → "approved" / "go" / "yes" → Continue                    │
│  → "revise" → Back to plan                                  │
│  → "approved with changes" → Adjust → Continue              │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  IMPLEMENT (DB → API → UI)                                  │
│  → Mid-implementation pivot if blocker found               │
│  → Update progress as you work                                │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  TEST & VERIFY                                              │
│  → Type check, lint, manual test                            │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  SESSION END                                                │
│  → AUTO-GENERATE SESSION_CONTEXT.md                         │
│  → Document progress + next steps                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Definition of Done

```
[✅] Code follows RULES.md
[✅] Architecture matches approved plan
[✅] TypeScript compiles (no `any`)
[✅] RBAC on protected endpoints
[✅] Loading/Error states handled
[✅] Responsive design works
[✅] i18n keys used
[✅] Manual testing passes
[✅] SESSION_CONTEXT.md auto-generated
```

---

## 📞 Communication

### How User Gives You Tasks

**Good:**
> "Create user management with CRUD, roles, and audit logs"

**Also Good:**
> "Fix the null reference error in UserList component"

**Needs Clarification:**
> "Make it better" → You will ask: "What aspect should we improve?"

### How You Will Respond

| Situation | Your Response |
|-----------|---------------|
| Clear task | Present plan → implement |
| Unclear task | Ask clarifying questions |
| Complex task | Break down → present options |
| Bug fix | FAST_TRACK → fix immediately |
| Blocker | Stop → explain → propose A/B/C |

---

## 🔄 Mid-Implementation Pivot

If you find a blocker or better approach during implementation:

```
1. STOP coding
2. Explain the situation
3. Present options:
   - Option A: [approach + trade-offs]
   - Option B: [approach + trade-offs]
   - Option C: [approach + trade-offs]
4. Wait for your decision
5. Continue with chosen approach
```

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.2.0 | 2026-04-12 | Single version system - CLI and methodology share one version from package.json |
| v1.1.1 | 2026-04-03 | Progress Reporting — Structured format za AI fokus i quality kontrolu |
| v1.1.0 | 2026-04-03 | AI Partner Profile — Context reset, self-review, stop & redirect, human review points, performance budget, i18n workflow, secret management, N+1 prevention, Vitest, factories, mocking, simplified FULL plan |
| v1.0.0 | 2026-03-25 | Initial LEONE release — Human-AI partnership system |

---

## 🤖 For AI (Quick Reference)

**Your Core Files:**
- `SYSTEM.md` → Your operating principles
- `WORKFLOW.md` → Your feature development process (Pre-Code Checklist!)
- `RULES.md` → Your coding standards (Smart Reuse Rule!)
- `ARCHITECTURE.md` → Your layer responsibilities
- `DATA_LAYER.md` → Your database rules
- `TESTING.md` → Your testing requirements
- `SESSION_CONTEXT.md` → Your session memory (update at end!)
- `AI_INSTRUCTIONS.md` → Your tool usage guide

**Your Key Rules:**
- ✅ Plan before code (use LIGHT/STANDARD/FULL)
- ✅ Wait for approval before implementation
- ✅ Ask when unsure (see When You Need User Input)
- ✅ Follow the flow: DB → Migration → Validation → API → UI → Test
- ✅ Generate SESSION_CONTEXT.md at session end
- ✅ Search before create (Smart Reuse Rule)

**Your Output Format:**
```markdown
## Status
[What's happening]

## Analysis
[What you found/think]

## Recommendation
[What you suggest]

## Next Step
[What happens next / what you need from user]
```

---

## 🛠️ Tech Stack (CUSTOMIZABLE)

This system is **tech-agnostic**. Edit `STACK.md` to match your project's stack.

Common stacks:
- **Full-Stack**: React + Node.js + Prisma + MySQL
- **Frontend**: React/Vue + Vite + Tailwind
- **Backend**: Node.js/Python + Express/FastAPI + Database
- **Mobile**: React Native / Flutter

---

**Built for:** Human-AI partnership
**Methodology:** LEONE AI Governance
**Status:** ✅ Active

---

## 🗺️ Project Map Reference

For file locations, see `PROJECT_MAP.md` (customize for your project)

| What | Where (Example) |
|------|-----------------|
| Database schema | `packages/db/schema.prisma` |
| API routes | `apps/api/src/routes/` |
| Controllers | `apps/api/src/controllers/` |
| Services | `apps/api/src/services/` |
| React hooks | `apps/web/hooks/` |
| Components | `apps/web/components/` |
| Pages | `apps/web/pages/` |
| Validation | `packages/shared/validation/` |

---

**Built for:** Human-AI partnership
**Methodology:** LEONE AI Governance
**Philosophy:** Lead your AI with confidence
**Status:** ✅ Active
