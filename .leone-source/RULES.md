# LEONE v1.0 — CODING RULES & STANDARDS

---

## 🧠 Smart Reuse Rule (BEFORE CREATING NEW CODE)

**Before creating new code, you MUST:**

```
1. SEARCH existing code for similar logic
2. REUSE if possible (don't reinvent)
3. EXTEND if needed (modify existing)
4. CREATE NEW only if absolutely necessary
```

**Ask yourself:**
- "Does this already exist somewhere?"
- "Can I extend an existing function/service?"
- "Am I duplicating logic?"

**If yes to any → STOP and refactor instead!**

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
| Test Coverage | 80%+ | Run test coverage tool |

---

## 🔧 Project-Specific Rules

> **NOTE:** Edit this section based on your project's needs.
> See `STACK.md` for tech stack details.

```
[Add project-specific rules here]
```

---

**Version:** 1.0.0
**Methodology:** LEONE AI Governance
**Status:** ✅ Active
