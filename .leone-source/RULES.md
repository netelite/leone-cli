# LEONE {{VERSION}} — CODING RULES & STANDARDS

---

## 🧠 Smart Reuse Rule (Expanded Decision Tree)

**Before creating new code, follow this decision tree:**

```
1. SEARCH: Does similar code exist? (grep/glob for keywords)
   │
   ├── YES → Go to 2
   └── NO → Create new (document why nothing existed)
   │
2. EVALUATE: Is the existing code reusable?
   │
   ├── YES (same domain, clean API) → Go to 3
   ├── YES BUT (different domain, needs extraction) → Go to 4
   └── NO (tightly coupled, dirty) → Create new, flag for refactor
   │
3. EXTEND: Can I add my use case to existing code?
   │
   ├── YES (minor addition) → Extend existing code
   └── NO (would break SRP) → Create new, import shared utilities
   │
4. EXTRACT: Should I refactor to make reusable?
   │
   ├── YES (will be reused 3+ times) → Extract shared logic first
   └── NO (one-off case) → Duplicate with TODO comment, schedule refactor
```

### "Similar Enough" Threshold
Code is "similar enough" to reuse when ALL are true:
- [ ] Shares 60%+ logic or structure
- [ ] Same or related domain
- [ ] Can be extended without violating Single Responsibility
- [ ] Doesn't require awkward abstractions

### When NOT to Reuse
- Reuse would create a "god function" with many if/else branches
- The abstraction is leaky (caller needs to know internals)
- More time spent adapting than creating from scratch
- Existing code is scheduled for deletion
- You're forcing reuse just to avoid creating — this is worse than duplication

### Search Commands to Use
```bash
# Find files by name pattern
glob **/*user*service*.ts

# Find code by keyword
grep_search "findByEmail" --glob "*.ts"

# Find all references to a pattern
grep_search "class.*Service" --glob "*.ts"
```

---

## 🚫 Absolute Rules (Never Break)

### TypeScript Rules

| Rule | Bad Example | Good Example |
|------|-------------|--------------|
| **No `any` types** | `const data: any = {}` | `const data: UserData = {}` |
| **No implicit any** | `function process(d) { ... }` | `function process(d: Data) { ... }` |
| **Use strict types** | `let value = null` | `let value: string \| null = null` |
| **Define interfaces** | `const obj = { a: 1, b: 2 }` | `interface Obj { a: number; b: number }` |

### Data Integrity Rules

| Rule | Bad Example | Good Example |
|------|-------------|--------------|
| **No float for money** | `const price = 19.99` | `const price = new Decimal(19.99)` |
| **Validate all inputs** | `function create(data)` | `function create(data: CreateSchema)` |
| **Use Zod validation** | `if (!email) throw...` | `schema.parse({ email })` |
| **Proper null handling** | `user.address.street` | `user.address?.street` |

### Security Rules

| Rule | Bad Example | Good Example |
|------|-------------|--------------|
| **RBAC on endpoints** | `app.get('/admin', ...)` | `app.get('/admin', requireRole('admin'), ...)` |
| **Never trust client** | `const id = req.query.id` | `const id = schema.parse(req.query.id)` |
| **Audit mutations** | `db.update(...)` | `await auditLog(...); db.update(...)` |
| **Hash passwords** | `password = plain` | `password = await hash(password)` |

### Architecture Rules

| Rule | Bad Example | Good Example |
|------|-------------|--------------|
| **Max 200 lines** | One 800-line file | Multiple 150-line files |
| **Single responsibility** | `class User { CRUD + email + ... }` | `class User` + `class UserEmail` |
| **Separate concerns** | UI + business logic | UI calls service layer |
| **No files in DB** | `file: Blob` in table | S3 URL in table |

### Code Style Rules

| Rule | Bad Example | Good Example |
|------|-------------|--------------|
| **No hardcoded strings** | `"User not found"` | `t('errors.user.notFound')` |
| **Consistent naming** | `getUserData`, `fetch_data` | `getUserData`, `fetchUserData` |
| **Meaningful names** | `const d = new Date()` | `const createdAt = new Date()` |
| **No magic numbers** | `if (age > 18)` | `const LEGAL_AGE = 18` |

---

## ✅ Best Practices

### File Organization

```
components/
├── atomic/           # Button, Input, Label
├── composite/        # FormField, Card
└── pages/            # UserListPage, UserEditPage

hooks/
├── useUsers.ts       # Data fetching
├── useUserForm.ts    # Form logic
└── useAuth.ts        # Auth state

services/
├── userService.ts    # Business logic
├── emailService.ts   # External calls
└── auditService.ts   # Audit logging
```

### Function Guidelines

| Guideline | Limit |
|-----------|-------|
| Max function length | 50 lines |
| Max parameters | 3 (use object if more) |
| Nesting depth | Max 3 levels |
| Cyclomatic complexity | Keep it simple |

### Error Handling

```typescript
// ✅ Good
try {
  await userService.create(data);
} catch (error) {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  if (error instanceof UnauthorizedError) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  logger.error('Unexpected error:', error);
  return res.status(500).json({ error: 'Internal server error' });
}

// ❌ Bad
try {
  await userService.create(data);
} catch (e) {
  console.log(e);
  res.send('Error');
}
```

---

## 📋 Code Review Checklist

Before considering code "done":

```
[ ] No TypeScript errors
[ ] No `any` types
[ ] All inputs validated with Zod
[ ] RBAC on protected endpoints
[ ] Error handling implemented
[ ] Loading states handled
[ ] i18n keys used (no hardcoded strings)
[ ] Files under 200 lines
[ ] Functions under 50 lines
[ ] No console.log in production code
[ ] Proper null/undefined handling
[ ] Tests pass (if applicable)
```

---

## 🐛 Anti-Patterns (Never Do These)

### 1. The `any` Trap
```typescript
// ❌ NEVER
function process(data: any) {
  return data.value;
}

// ✅ ALWAYS
function process(data: ProcessData) {
  return data.value;
}
```

### 2. Float Math for Money
```typescript
// ❌ NEVER
const total = 0.1 + 0.2; // 0.30000000000000004

// ✅ ALWAYS
const total = new Decimal(0.1).add(0.2); // 0.3
```

### 3. Skipping Validation
```typescript
// ❌ NEVER
app.post('/user', (req, res) => {
  const { email } = req.body;
  db.user.create({ data: { email } });
});

// ✅ ALWAYS
app.post('/user', (req, res) => {
  const { email } = createUserSchema.parse(req.body);
  db.user.create({ data: { email } });
});
```

### 4. Missing RBAC
```typescript
// ❌ NEVER
app.delete('/user/:id', (req, res) => {
  db.user.delete({ where: { id: req.params.id } });
});

// ✅ ALWAYS
app.delete('/user/:id', requireRole('admin'), (req, res) => {
  db.user.delete({ where: { id: req.params.id } });
});
```

### 5. Hardcoded Strings
```typescript
// ❌ NEVER
return <div>User not found</div>;

// ✅ ALWAYS
return <div>{t('errors.user.notFound')}</div>;
```

### 6. Files in Database
```typescript
// ❌ NEVER
model Document {
  file Blob
}

// ✅ ALWAYS
model Document {
  fileUrl String
  // Store actual file in S3/blob storage
}
```

### 7. Direct DB in UI
```typescript
// ❌ NEVER
// In React component
const users = await db.user.findMany();

// ✅ ALWAYS
// In service layer
const users = await userService.getAll();
// In component
const { data: users } = useUsers();
```

---

## 📊 Quality Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Type Safety | 100% | No `any` in codebase |
| Validation | 100% | All inputs use Zod |
| RBAC Coverage | 100% | All protected routes have middleware |
| File Size | < 200 lines | Count lines per file |
| Function Size | < 50 lines | Count lines per function |
| Test Coverage | 60%+ (solo) / 80%+ (production) | Run coverage tool |

---

## ⚡ Performance Budget

### Why This Exists
Without explicit limits, I will silently create a 2MB bundle or an API endpoint that takes 3 seconds to respond. Performance must be a first-class concern.

### Frontend Budgets
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Bundle size (initial load) | < 200KB gzipped | `npm run build` + analysis |
| Bundle size (total app) | < 500KB gzipped | Webpack/Vite bundle analyzer |
| TTI (Time to Interactive) | < 3.5s on 3G | Lighthouse |
| FCP (First Contentful Paint) | < 1.8s | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |

### Backend Budgets
| Metric | Target | How to Measure |
|--------|--------|----------------|
| API response time (p95) | < 200ms | Manual timing or APM |
| DB query time (p95) | < 50ms | Prisma logging |
| Memory per request | < 50MB | Node.js --inspect |

### N+1 Query Prevention
```typescript
// ❌ BAD — N+1 query (1 query for users + N queries for posts)
const users = await db.user.findMany();
for (const user of users) {
  user.posts = await db.post.findMany({ where: { authorId: user.id } });
}

// ✅ GOOD — Single query with include
const users = await db.user.findMany({
  include: { posts: true }
});
```

### Performance Rules
- [ ] Use `include`/`select` instead of manual relation loading
- [ ] Add `take`/`skip` for pagination (never load all records)
- [ ] Index foreign key columns in database
- [ ] Use code splitting for routes (lazy loading)
- [ ] Review slow query log weekly
- [ ] If bundle exceeds budget → investigate with analyzer

---

## 🌍 i18n Workflow

### Why This Exists
"No hardcoded strings" is a rule without a workflow. This defines HOW i18n actually works.

### Key Naming Convention
```
{namespace}.{feature}.{entity}.{action_or_property}

Examples:
  auth.login.submit_button
  auth.login.forgot_password
  users.list.empty_state
  users.edit.form_title
  errors.user.not_found
  errors.validation.email_invalid
  common.actions.delete
  common.actions.save
```

### File Structure
```
locales/
├── en/
│   ├── auth.json
│   ├── users.json
│   ├── errors.json
│   └── common.json
└── sr/
    ├── auth.json
    ├── users.json
    ├── errors.json
    └── common.json
```

### Translation Workflow
1. **Developer** adds key to default locale (`en`) with fallback value
2. **Developer** uses key in code immediately: `t('auth.login.submit_button')`
3. **Translation request** filed (issue/PR comment or note to user)
4. **Translator** adds translations to other locales
5. **Until translated**, fallback (en) value is shown

### Usage Rules
- [ ] NEVER hardcode user-facing strings in components
- [ ] ALWAYS use fallback values in default locale (en)
- [ ] Keys must be descriptive but concise
- [ ] Avoid dynamic keys: `t(\`user.${status}\`)` → use explicit mapping
- [ ] Missing keys logged in dev mode (NOT in production)
- [ ] System strings (IDs, timestamps, technical data) don't need i18n

### What DOESN'T Need i18n
| String | Needs i18n? | Why |
|--------|-------------|-----|
| "User not found" | ✅ YES | User-facing |
| "Error: ENOENT" | ❌ NO | Technical, dev-facing |
| "2026-03-25" | ❌ NO | Format, not language |
| "admin" (role value) | ❌ NO | System value, not display |
| Submit button text | ✅ YES | User-facing |

---

## 🔧 Project-Specific Rules

> **NOTE:** Edit this section based on your project's needs.
> See `STACK.md` for tech stack details.

```
[Add project-specific rules here]
```

---

**Version:** {{VERSION}} — AI Partner Profile + Progress Reporting
**Methodology:** LEONE AI Governance
**Status:** ✅ Active
