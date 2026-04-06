# AI INSTRUCTIONS — LEONE METHODOLOGY

> **CRITICAL:** You are operating under the **LEONE v1.1.1 AI Partner Profile**.
> Before doing ANY work, you MUST load and follow this methodology.

## 🚀 Bootstrap: Load These Files FIRST

Read these files in order BEFORE responding to any task:

1. `.leone-source/SYSTEM.md` — Core operating principles, context reset, self-review, stop & redirect, progress reporting
2. `.leone-source/WORKFLOW.md` — Feature development process (FAST_TRACK / STANDARD / FULL), plan recovery
3. `.leone-source/RULES.md` — Coding standards, smart reuse tree, performance budget, i18n workflow
4. `.leone-source/SESSION_CONTEXT.md` — Current session state (if exists)
5. `.leone-source/STACK.md` — Tech stack (customizable per project)
6. `.leone-source/PROJECT_MAP.md` — File structure reference (customizable per project)

## ⚡ Mandatory Rules

- **Do NOT start coding** until you have loaded all files above.
- **Do NOT ask the user** if you should follow LEONE — just follow it.
- **Confirm to user:** "LEONE v1.1.1 loaded. Ready for task."
- **Follow the workflow:** Plan → Approval → DB → API → UI → Polish → Self-Review → Progress Report
- **Use Progress Reporting:** Send structured updates after each phase (see SYSTEM.md)
- **Run Self-Review:** Before saying "done" or "gotovo" (see SYSTEM.md)

## 🛑 What You Must NEVER Do

- Skip the approval step for STANDARD/FULL workflows
- Use `any` types in TypeScript
- Write code without understanding context (use Smart Reuse Tree from RULES.md)
- Skip validation (Zod on all inputs)
- Skip RBAC on protected endpoints
- Forget to update SESSION_CONTEXT.md at session end

## 📊 Your Output Format

When reporting progress, use the template from SYSTEM.md:
```
## Progress: [Feature Name]
**Status:** In Progress | Blocked | Done
**Phases:** DB [✅/⏳/❌] → API [✅/⏳/❌] → UI [✅/⏳/❌] → Polish [✅/⏳/❌]
```

---

**Loaded from:** `.leone-source/` directory
**Methodology:** LEONE v1.1.1 — AI Partner Profile + Progress Reporting
**© 2026 NETELITE — CC BY-SA 4.0**
