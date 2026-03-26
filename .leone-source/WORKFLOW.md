# LEONE v1.0 — FEATURE WORKFLOW

---

## 🧠 Pre-Code Checklist (ALWAYS BEFORE CODING)

**Before writing ANY code, you MUST:**

```
[ ] 1. Check if similar logic already exists (grep/search)
[ ] 2. Identify affected modules and files
[ ] 3. Plan file structure (see ARCHITECTURE.md)
[ ] 4. Define types/interfaces first
[ ] 5. Validate data flow (input → processing → output)
[ ] 6. Check STACK.md for tech constraints
[ ] 7. Check PROJECT_MAP.md for file locations
```

**If any check fails → ASK before proceeding!**

---

## 🚀 Workflow Selection

| Workflow | When to Use | Approval Needed | Est. Time |
|----------|-------------|-----------------|-----------|
| **FAST TRACK** | Bug fixes, minor changes, hotfixes | ❌ No | < 1 hour |
| **STANDARD** | Most new features, CRUD, integrations | ✅ Yes | 2-4 hours |
| **FULL** | Complex features, new modules, major refactors | ✅ Yes (detailed) | 4+ hours |

---

## ⚡ FAST TRACK Workflow

**For:** Bug fixes, minor changes, hotfixes (< 1 hour)

```
1. Identify issue
2. Fix code
3. Test manually
4. Auto-update SESSION_CONTEXT.md
5. Done
```

### Example Fast Track Tasks
- Fix typo in UI text
- Change color/spacing
- Fix null check bug
- Add missing import
- Update validation message
- Quick CSS fix

### When to Escalate
If during FAST_TRACK you find:
- The bug is deeper than expected
- Multiple files need changes
- Architecture change needed

→ You STOP and escalate to STANDARD workflow

---

## 📋 STANDARD Workflow

**For:** Most new features, CRUD operations, integrations

### Phase 1: Plan (5-15 min)
```
1. Understand requirement
2. Fill plan template (STANDARD.md)
3. Present to user
4. WAIT for approval response
```

### Phase 2: Database (10-20 min)
```
1. Update schema
2. Create migration
3. Run migration
4. Update validation schemas
```

### Phase 3: API (30-60 min)
```
1. Create service layer
2. Create controller
3. Create routes
4. Add RBAC middleware
5. Test endpoints
```

### Phase 4: Frontend (60-120 min)
```
1. Create data fetching hooks
2. Create atomic components
3. Create page/screen
4. Add i18n translations
5. Test UI flows
```

### Phase 5: Polish (15-30 min)
```
1. Run type check
2. Run lint
3. Test edge cases
4. Update documentation
5. Auto-generate SESSION_CONTEXT.md
```

---

## 📊 FULL Workflow

**For:** Complex features, new modules, major refactors

### Additional Steps vs STANDARD
```
[ ] Detailed risk analysis
[ ] Multiple approval checkpoints
[ ] Comprehensive testing plan
[ ] Documentation requirements
[ ] Migration strategy (if replacing existing)
[ ] Rollback plan
```

Use `plans/FULL.md` template.

---

## ✅ Approval Options

See [SYSTEM.md#approval-options](SYSTEM.md#approval-options) for all response options.

**Najčešće:** `"approved"` / `"go"` / `"yes"` ili `"revise: [razlog]"`

### Approval Response Examples

```
✅ "approved"
✅ "go"
✅ "yes, let's do it"
✅ "approved with changes: Use STANDARD instead of FULL"
✅ "revise: Add more detail on security implementation"
✅ "simplify: We need this fast, skip nice-to-haves"
✅ "pause: Need to discuss with team first"
```

---

## 🔄 Mid-Implementation Pivot (v1.0)

### When You Pivot

You will STOP and pivot when:

| Trigger | Example |
|---------|---------|
| **Blocker found** | "Table doesn't have required column" |
| **Better approach** | "Found a cleaner way to implement this" |
| **Scope issue** | "This is more complex than planned" |
| **Dependency missing** | "Need to install package X" |
| **Architecture conflict** | "This conflicts with existing module Y" |

### Your Pivot Process

```
1. STOP coding immediately
2. Document the situation
3. Present options with trade-offs:
   - Option A: [approach + pros + cons + time]
   - Option B: [approach + pros + cons + time]
   - Option C: [approach + pros + cons + time]
4. Give your recommendation
5. WAIT for user decision
6. Continue with chosen approach
```

### Pivot Example

```markdown
## 🚨 Mid-Implementation Pivot

**Situation:** The existing authentication middleware doesn't support the new role-based access we need.

**Options:**

| Option | Approach | Pros | Cons | Time |
|--------|----------|------|------|------|
| A | Extend existing middleware | Reusable, clean | More complex | +45 min |
| B | Create new RBAC middleware | Clean separation | More files | +30 min |
| C | Inline role checks | Fast now | Technical debt | +10 min |

**My Recommendation:** Option B — Clean separation, reasonable time.

**Your decision?**
```

---

## 🔄 Workflow State Machine

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌──────────┐                                             │
│   │  START   │                                             │
│   └────┬─────┘                                             │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────┐     ┌───────────────┐                       │
│   │ ANALYZE  │ ──→ │ Need clarity? │───Yes──→ Ask         │
│   └────┬─────┘     └───────────────┘                       │
│        │ No                                                │
│        ▼                                                    │
│   ┌──────────┐                                             │
│   │  CHOOSE  │                                             │
│   │ WORKFLOW │                                             │
│   └────┬─────┘                                             │
│        │                                                    │
│        ▼                                                    │
│   ┌──────────┐                                             │
│   │  PLAN    │     ┌───────────────┐                       │
│   │  CREATE  │ ──→ │   APPROVAL?   │                       │
│   └──────────┘     └───────┬───────┘                       │
│                            │                                 │
│              ┌─────────────┼─────────────┐                  │
│              │             │             │                   │
│              ▼             ▼             ▼                   │
│         ┌────────┐   ┌──────────┐  ┌─────────┐             │
│         │ Revise │   │ Approved │  │  Stop   │             │
│         └────────┘   └────┬─────┘  └─────────┘             │
│                           │                                 │
│                           ▼                                 │
│                    ┌──────────────┐                         │
│                    │  IMPLEMENT   │                         │
│                    └──────┬───────┘                         │
│                           │                                 │
│                           ▼                                 │
│                    ┌──────────────┐                         │
│                    │   PIVOT?     │───Yes──→ Present Options│
│                    └──────┬───────┘                         │
│                           │ No                              │
│                           ▼                                 │
│                    ┌──────────────┐                         │
│                    │    TEST      │                         │
│                    └──────┬───────┘                         │
│                           │                                 │
│                           ▼                                 │
│                    ┌──────────────┐                         │
│                    │    DONE      │                         │
│                    │ AUTO-SUMMARY │                         │
│                    └──────────────┘                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Definition of Done

A feature is **Done** when ALL are true:

```
[✅] Code follows RULES.md
[✅] Architecture matches approved plan
[✅] TypeScript compiles (no errors, no `any`)
[✅] RBAC implemented on protected endpoints
[✅] Loading/Error states handled
[✅] Responsive design verified
[✅] i18n keys used (no hardcoded strings)
[✅] Manual testing passes
[✅] SESSION_CONTEXT.md auto-generated
```

---

## 🎯 Quick Decision Matrix

| Situation | Workflow | Approval | Notes |
|-----------|----------|----------|-------|
| Bug fix < 30 min | FAST_TRACK | No | Just fix it |
| Bug fix reveals architecture issue | STANDARD | Yes | Pivot if needed |
| New CRUD feature | STANDARD | Yes | Standard flow |
| New module/system | FULL | Yes (detailed) | Full planning |
| Refactor existing | STANDARD or FULL | Yes | Depends on scope |
| Performance fix | STANDARD + profiling | Yes | Measure first |
| Security patch | FAST_TRACK → notify | No (critical) | Fix → Notify |
| "Make it faster" | STANDARD | Yes | Clarify: what aspect? |

---

## 📞 When You Need User Input

### You WILL Ask When:

| Situation | Your Action |
|-----------|-------------|
| Ambiguous requirement | Ask clarifying question |
| Trade-off decision needed | Present options with recommendation |
| Scope clarification | Ask: "Does this include X or just Y?" |
| Plan approval | Present plan → Wait for response |
| Mid-implementation pivot | Stop → Present options → Wait |
| Multiple valid approaches | Present A/B/C → Recommend one |

### You WILL NOT Ask When:

| Situation | Your Action |
|-----------|-------------|
| Following approved plan | Just do it |
| Standard implementation (CRUD, hooks, components) | Just do it |
| Bug fixes (FAST_TRACK) | Just fix it |
| Documentation updates | Just update it |
| Auto-generating session summary | Just generate it |

---

## 📊 Session Continuity

### Starting a New Session

```
1. You check for SESSION_CONTEXT.md
2. If exists:
   - Read last session state
   - Understand what's done/in-progress/pending
   - Continue from last step
3. If not exists:
   - Start fresh
   - Ask for task
```

### Ending a Session

```
1. You auto-generate SESSION_CONTEXT.md with:
   - Current date/time
   - What was completed
   - What's in progress (if any)
   - What's pending
   - Any blockers
   - Next session should...
2. Save for continuation
```

### Resuming After Pivot

```
1. You reference the pivot decision
2. Continue with chosen approach
3. Document in session summary
```