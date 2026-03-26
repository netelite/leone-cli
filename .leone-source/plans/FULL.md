# FULL Plan Template

**Workflow:** FULL
**For:** Complex features, new modules, major refactors

---

## 📋 Executive Summary

| Field | Value |
|-------|-------|
| **Feature** | [Feature name] |
| **Type** | [Complex Feature / New Module / Major Refactor] |
| **Priority** | [Critical / High / Medium / Low] |
| **Est. Time** | 4+ hours |
| **Workflow** | FULL |
| **Complexity** | [High / Very High] |

---

## 🎯 Overview

### Problem Statement

[What problem are we solving?]

### Proposed Solution

[High-level description of the solution]

### User Value

[Why are we building this? What user problem does it solve?]

### Business Value

[How does this benefit the business?]

---

## 📐 Architecture

### System Design

[High-level architecture diagram/description]

```
┌─────────────┐
│   Component │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │
└─────────────┘
```

### Component Diagram

[How components interact]

### Data Flow

[How data moves through the system]

---

## 📚 Requirements

### Functional Requirements

```
[ ] [FR-001] [Requirement description]
[ ] [FR-002] [Requirement description]
[ ] [FR-003] [Requirement description]
```

### Non-Functional Requirements

```
[ ] [NFR-001] Performance: [metric]
[ ] [NFR-002] Security: [requirement]
[ ] [NFR-003] Scalability: [requirement]
[ ] [NFR-004] Maintainability: [requirement]
```

### Technical Requirements

```
[ ] TypeScript strict mode (no `any`)
[ ] 100% Zod validation on inputs
[ ] RBAC on all protected endpoints
[ ] Audit logging on mutations
[ ] Comprehensive error handling
[ ] Loading/Error states in UI
[ ] Full i18n support
[ ] Responsive design
[ ] Cross-browser compatibility
```

---

## 🗄️ Data Model

### Schema Design

```prisma
// Full schema design
model MainEntity {
  id          Int      @id @default(autoincrement())
  name        String
  relations   RelatedEntity[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model RelatedEntity {
  id          Int      @id @default(autoincrement())
  mainEntity  MainEntity @relation(fields: [mainEntityId], references: [id])
  mainEntityId Int
}
```

### Migrations Required

```
[ ] Migration 1: [Description]
[ ] Migration 2: [Description]
```

### Data Migration Strategy

[If migrating existing data, describe approach]

---

## 🔌 API Design

### New Endpoints

| Method | Endpoint | Description | Auth | Rate Limit |
|--------|----------|-------------|------|------------|
| GET | `/api/resource` | List resources | Required | 100/min |
| POST | `/api/resource` | Create resource | Required | 20/min |
| GET | `/api/resource/:id` | Get single | Required | 100/min |
| PUT | `/api/resource/:id` | Update | Required | 20/min |
| DELETE | `/api/resource/:id` | Delete | Required | 20/min |

### Request/Response Contracts

```typescript
// Request Schema
interface CreateRequest {
  name: string;
  // ...
}

// Response Schema
interface CreateResponse {
  data: Resource;
  message: string;
}

// Error Response
interface ErrorResponse {
  error: string;
  code: string;
  details?: object;
}
```

### WebSocket Events (if applicable)

| Event | Direction | Payload |
|-------|-----------|---------|
| `resource:created` | Server → Client | `{ resource: Resource }` |
| `resource:updated` | Server → Client | `{ resource: Resource }` |

---

## 🎨 Frontend Design

### Component Architecture

```
FeaturePage/
├── FeatureList/
│   ├── FeatureItem/
│   └── FeatureListHeader/
├── FeatureDetail/
│   ├── FeatureInfo/
│   └── FeatureActions/
├── FeatureForm/
│   ├── FeatureFormBasic/
│   └── FeatureFormAdvanced/
└── FeatureModal/
```

### New Components

| Component | Type | Purpose |
|-----------|------|---------|
| FeatureList | Composite | Display list with pagination |
| FeatureItem | Atomic | Single item display |
| FeatureForm | Composite | Create/Edit form |
| FeatureModal | Composite | Modal wrapper |

### State Management

```typescript
// TanStack Query keys
export const featureKeys = {
  all: ['features'] as const,
  lists: () => [...featureKeys.all, 'list'] as const,
  detail: (id: number) => [...featureKeys.all, 'detail', id] as const,
};

// Zustand store (if needed)
interface FeatureStore {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}
```

### Routing

| Route | Component | Auth |
|-------|-----------|------|
| `/features` | FeatureListPage | Required |
| `/features/:id` | FeatureDetailPage | Required |
| `/features/new` | FeatureCreatePage | Required |
| `/features/:id/edit` | FeatureEditPage | Required |

---

## 🔐 Security Design

### RBAC Matrix

| Role | Create | Read | Update | Delete | Admin |
|------|--------|------|--------|--------|-------|
| Super Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Admin | ✅ | ✅ | ✅ | ✅ | ❌ |
| Manager | ✅ | ✅ (team) | ✅ (team) | ❌ | ❌ |
| User | ✅ (own) | ✅ (own) | ✅ (own) | ❌ | ❌ |

### Authentication Requirements

```
[ ] Session validation on all endpoints
[ ] Token refresh mechanism
[ ] Logout invalidation
```

### Authorization Checks

```
[ ] Route guards implemented
[ ] API middleware in place
[ ] Button/action visibility based on role
```

### Audit Logging

| Action | Log Fields |
|--------|------------|
| Create | userId, resourceId, timestamp, ipAddress |
| Update | userId, resourceId, changes, timestamp |
| Delete | userId, resourceId, timestamp |

---

## 📊 Testing Strategy

### Unit Tests

```
[ ] Service layer tests
[ ] Validation schema tests
[ ] Utility function tests
```

### Integration Tests

```
[ ] API endpoint tests
[ ] Database operation tests
[ ] Auth flow tests
```

### E2E Tests

```
[ ] Critical user flows
[ ] Permission-based flows
[ ] Error scenarios
```

### Manual Testing Checklist

```
[ ] Create flow (happy path)
[ ] Create flow (validation errors)
[ ] Read/List (pagination, sorting, filtering)
[ ] Update flow
[ ] Delete flow (with confirmation)
[ ] Permission denied scenarios
[ ] Loading states
[ ] Error states
[ ] Empty states
[ ] Mobile responsive
[ ] Cross-browser
```

---

## 📝 Documentation

### Code Documentation

```
[ ] JSDoc comments on public functions
[ ] Inline comments for complex logic
[ ] Type definitions documented
```

### User Documentation

```
[ ] Feature guide
[ ] User manual updates
[ ] FAQ updates
```

### Developer Documentation

```
[ ] API documentation
[ ] Architecture decision records
[ ] README updates
```

---

## 🚀 Deployment Plan

### Pre-Deployment

```
[ ] Code review completed
[ ] All tests passing
[ ] Performance benchmarks met
[ ] Security review completed
```

### Deployment Steps

```
1. [ ] Backup database
2. [ ] Run migrations
3. [ ] Deploy backend
4. [ ] Deploy frontend
5. [ ] Verify deployment
6. [ ] Smoke tests
```

### Rollback Plan

```
[If issues found]:
1. Revert frontend deployment
2. Revert database migrations (if safe)
3. Restore from backup (if needed)
```

---

## ⚠️ Risk Analysis

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk] | [High/Med/Low] | [High/Med/Low] | [Strategy] |

### Schedule Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk] | [High/Med/Low] | [High/Med/Low] | [Strategy] |

### Dependencies

| Dependency | Status | Owner |
|------------|--------|-------|
| [Package/Service] | [Available/Blocked] | [Who] |

---

## 📅 Implementation Phases

### Phase 1: Foundation (X hours)

```
[ ] Database schema
[ ] Migrations
[ ] Core service layer
[ ] Basic API endpoints
```

### Phase 2: Core Features (X hours)

```
[ ] Complete API
[ ] RBAC implementation
[ ] Frontend hooks
[ ] Base components
```

### Phase 3: UI/UX (X hours)

```
[ ] Complete pages
[ ] Styling
[ ] i18n
[ ] Responsive design
```

### Phase 4: Polish (X hours)

```
[ ] Error handling
[ ] Loading states
[ ] Edge cases
[ ] Performance optimization
[ ] Documentation
```

### Phase 5: Testing & QA (X hours)

```
[ ] Unit tests
[ ] Integration tests
[ ] Manual testing
[ ] Bug fixes
```

---

## ✅ Definition of Done

```
[✅] All functional requirements met
[✅] All non-functional requirements met
[✅] Code follows RULES.md
[✅] Architecture matches this plan
[✅] TypeScript compiles (no `any`)
[✅] RBAC on all protected endpoints
[✅] Loading/Error states handled
[✅] Responsive design works
[✅] i18n keys used
[✅] All tests passing
[✅] Documentation complete
[✅] SESSION_CONTEXT.md updated
```

---

## 🎯 Approval

**Status:** ⏳ Pending

**Approval Required:** YES (Detailed)

See [SYSTEM.md#approval-options](../SYSTEM.md#approval-options) for all response options.

**Najčešće:** `"approved"` / `"go"` / `"yes"` ili `"revise: [razlog]"`

---

**Version:** 1.0.0
**Template:** FULL
**Last Updated:** [Date]