# LEONE {{VERSION}} — STANDARD Plan Template

**Workflow:** STANDARD
**For:** Most new features, CRUD operations, integrations

---

## Task Overview

| Field | Value |
|-------|-------|
| **Feature** | [Feature name] |
| **Type** | [New Feature / CRUD / Integration] |
| **Priority** | [High / Medium / Low] |
| **Est. Time** | 2-4 hours |
| **Workflow** | STANDARD |

---

## Description

[Clear description of what we're building]

### User Value

[Why are we building this? What user problem does it solve?]

---

## Requirements

### Functional Requirements

```
[ ] [Requirement 1]
[ ] [Requirement 2]
[ ] [Requirement 3]
```

### Non-Functional Requirements

```
[ ] TypeScript (no `any` types)
[ ] RBAC on protected endpoints
[ ] Zod validation on all inputs
[ ] Loading/Error states
[ ] i18n keys (no hardcoded strings)
[ ] Responsive design
```

---

## Current State

[What exists now / Starting point]

---

## Expected State

[What we'll have after implementation]

---

## Implementation Plan

### Phase 1: Database

```
[ ] Update schema
[ ] Create migration
[ ] Run migration
[ ] Update validation schemas
```

### Phase 2: API

```
[ ] Create service layer
[ ] Create controller
[ ] Create routes
[ ] Add RBAC middleware
[ ] Test endpoints
```

### Phase 3: Frontend

```
[ ] Create data fetching hooks
[ ] Create atomic components
[ ] Create page/screen
[ ] Add i18n translations
[ ] Test UI flows
```

### Phase 4: Polish

```
[ ] Run type check
[ ] Run lint
[ ] Test edge cases
[ ] Update documentation
[ ] Generate SESSION_CONTEXT.md
```

---

## File Structure

### New Files

| Path | Purpose |
|------|---------|
| [File path] | [What it does] |
| [File path] | [What it does] |

### Modified Files

| Path | Change |
|------|--------|
| [File path] | [What changes] |

---

## Data Model

### Schema Changes

```prisma
// Add schema changes here
model NewModel {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Relations

[Describe any new relations]

---

## API Endpoints

### New Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/resource` | List resources | Required |
| POST | `/api/resource` | Create resource | Required |
| GET | `/api/resource/:id` | Get single resource | Required |
| PUT | `/api/resource/:id` | Update resource | Required |
| DELETE | `/api/resource/:id` | Delete resource | Required |

### Request/Response Examples

```typescript
// POST /api/resource
// Request
{
  name: string,
  ...
}

// Response
{
  data: { id: number, name: string, ... },
  message: "Success"
}
```

---

## UI Components

### New Components

| Component | Purpose |
|-----------|---------|
| ResourceList | Display list of resources |
| ResourceForm | Create/Edit form |
| ResourceDetail | Single resource view |

### Component Hierarchy

```
ResourceListPage
├── ResourceList
│   └── ResourceItem
└── ResourceForm (modal)
```

---

## Testing

### Manual Tests

```
[ ] Create flow works
[ ] Edit flow works
[ ] Delete flow works
[ ] Validation errors show
[ ] Loading states work
[ ] Error states work
```

### Edge Cases

```
[ ] Empty state handling
[ ] Large data sets
[ ] Network errors
[ ] Permission denied
```

---

## Security

### RBAC Requirements

| Role | Create | Read | Update | Delete |
|------|--------|------|--------|--------|
| Admin | ✅ | ✅ | ✅ | ✅ |
| User | ❌ | ✅ (own) | ✅ (own) | ❌ |

### Audit Logging

```
[ ] Log create actions
[ ] Log update actions
[ ] Log delete actions
```

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [High/Med/Low] | [How to mitigate] |

---

## Approval

**Status:** ⏳ Pending

See [SYSTEM.md#approval-options](../SYSTEM.md#approval-options) for all response options.

**Common:** `"approved"` / `"go"` / `"yes"` or `"revise: [reason]"`

---

**Version:** {{VERSION}} — AI Partner Profile + Progress Reporting
**Methodology:** LEONE AI Governance
**Template:** STANDARD