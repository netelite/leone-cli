# LEONE {{VERSION}} — FULL Plan Template

**Workflow:** FULL
**For:** Complex features, new modules, major refactors

---

## 📋 Overview

| Field | Value |
|-------|-------|
| **Feature** | [Feature name] |
| **Type** | [Complex Feature / New Module / Major Refactor] |
| **Priority** | [Critical / High / Medium / Low] |
| **Workflow** | FULL |
| **Complexity** | [High / Very High] |

---

## 🎯 What & Why

### Problem
[What problem are we solving?]

### Solution
[High-level description]

### User Value
[Why are we building this?]

---

## 📐 Architecture

```
[Brief diagram of components and data flow]
```

### Key Design Decisions
| Decision | Why |
|----------|-----|
| [Decision 1] | [Reason] |
| [Decision 2] | [Reason] |

---

## 🗄️ Data Model

```prisma
[Schema design]
```

### Migrations
- [ ] Migration 1: [Description]
- [ ] Migration 2: [Description]

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/resource` | List | Required |
| POST | `/api/resource` | Create | Required |
| GET | `/api/resource/:id` | Get | Required |
| PUT | `/api/resource/:id` | Update | Required |
| DELETE | `/api/resource/:id` | Delete | Required |

---

## 🎨 Frontend

### Components
| Component | Purpose |
|-----------|---------|
| [Component] | [What it does] |

### Routes
| Route | Component | Auth |
|-------|-----------|------|
| `/resource` | ListPage | Required |
| `/resource/:id` | DetailPage | Required |

### State Management
[TanStack Query keys, Zustand stores if needed]

---

## 🔐 Security

### RBAC
| Role | Create | Read | Update | Delete |
|------|--------|------|--------|--------|
| Admin | ✅ | ✅ | ✅ | ✅ |
| User | ✅ (own) | ✅ (own) | ✅ (own) | ❌ |

### Audit Logging
[What actions get logged]

---

## 📊 Testing Plan

- [ ] Service layer unit tests
- [ ] API integration tests
- [ ] RBAC tests
- [ ] Edge case tests
- [ ] Manual test flows

---

## ⚠️ Risks & Dependencies

| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [H/M/L] | [Strategy] |

### Dependencies
| Dependency | Status |
|------------|--------|
| [Package/Service] | [Available/Blocked] |

---

## 📅 Phases

### Phase 1: Foundation
- [ ] Database schema + migration
- [ ] Validation schemas
- [ ] Repository methods

### Phase 2: API
- [ ] Service layer
- [ ] Controllers + routes
- [ ] RBAC middleware

### Phase 3: Frontend
- [ ] Data fetching hooks
- [ ] Components
- [ ] i18n + styling

### Phase 4: Polish
- [ ] Error handling
- [ ] Loading states
- [ ] Edge cases
- [ ] Type check + lint

---

## ✅ Definition of Done

- [✅] Code follows RULES.md
- [✅] Architecture matches this plan
- [✅] TypeScript compiles (no `any`)
- [✅] RBAC on protected endpoints
- [✅] Loading/error states handled
- [✅] i18n keys used
- [✅] Manual testing passes
- [✅] Self-review passed (see SYSTEM.md)
- [✅] SESSION_CONTEXT.md updated

---

## 🎯 Approval

**Status:** ⏳ Pending

See [SYSTEM.md](../SYSTEM.md) for approval options.

**Your call:** `"approved"` / `"go"` / `"yes"` / `"revise: [reason]"`

---

**Version:** {{VERSION}} — AI Partner Profile + Progress Reporting
**Methodology:** LEONE AI Governance
**Template:** FULL (Simplified)
