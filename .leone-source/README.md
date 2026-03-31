# LEONE v1.0 — AI-First Development System

> **Optimized for AI** — Lead your AI with confidence.

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
| 4 | Watch progress | I update as I work |

### For You (AI)

```
1. Load system context at session start
2. Read SYSTEM.md for operating principles
3. Follow WORKFLOW.md for feature development
4. Use AI_INSTRUCTIONS.md for tool usage
5. Auto-generate session summary at end
```

---

## 📁 File Structure

```
.leone/
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

## 🎯 Workflow Selection

| Workflow | Use For | Approval | Est. Time |
|----------|---------|----------|-----------|
| **FAST_TRACK** | Bug fixes, minor changes | ❌ No | < 1 hour |
| **STANDARD** | New features, CRUD | ✅ Yes | 2-4 hours |
| **FULL** | Complex features, modules | ✅ Yes (detailed) | 4+ hours |

---

## ✅ Approval Options

See [SYSTEM.md#approval-options](SYSTEM.md#approval-options) for all response options.

**Najčešće:** `"approved"` / `"go"` / `"yes"` ili `"revise: [razlog]"`

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

## 🔄 Session Flow (v1.0)

---

![Leone methodology — AI agent flow](./leone_ai_agent_flow_en.svg)

---

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

## 🔄 Mid-Implementation Pivot (v1.0)

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
| v1.0.0 | 2026-03-25 | Initial LEONE release - Human-AI partnership system |

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
