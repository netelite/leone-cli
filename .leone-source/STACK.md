# LEONE v1.0 — TECH STACK & CONVENTIONS

> **NOTE:** This file is **CUSTOMIZABLE** per project. Edit to match your stack.

---

## 🛠️ Current Project Stack

### Template (Default) Stack

This is a **generic template**. Replace with your actual stack:

```
[ ] Frontend Framework: _______
[ ] Backend Framework: _______
[ ] Database: _______
[ ] ORM: _______
[ ] Auth: _______
[ ] Styling: _______
```

---

## 📋 Common Stack Templates

### Option 1: Full-Stack TypeScript (Recommended)

| Layer | Technology |
|-------|------------|
| Monorepo | Turborepo |
| Database | MySQL / PostgreSQL |
| ORM | Prisma |
| Auth | Lucia Auth / NextAuth |
| API | Express.js / Hono |
| Frontend | React 18 + Vite |
| State | TanStack Query + Zustand |
| Validation | Zod |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| i18n | react-i18next |

### Option 2: Next.js Full-Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Database | MySQL / PostgreSQL |
| ORM | Prisma / Drizzle |
| Auth | NextAuth / Lucia |
| Validation | Zod |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| i18n | next-intl |

### Option 3: React + Firebase

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| BaaS | Firebase |
| Database | Firestore |
| Auth | Firebase Auth |
| State | TanStack Query + Zustand |
| Validation | Zod |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |

### Option 4: Vue + Nuxt

| Layer | Technology |
|-------|------------|
| Framework | Nuxt 3 |
| Database | MySQL / PostgreSQL |
| ORM | Prisma / Drizzle |
| Auth | Nuxt Auth / Lucia |
| Validation | Zod / VeeValidate |
| Styling | Tailwind CSS |
| UI Components | Nuxt UI / shadcn-vue |

### Option 5: Python Backend

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | FastAPI / Django |
| Database | PostgreSQL |
| ORM | SQLAlchemy / Prisma Client JS |
| Auth | JWT + OAuth2 |
| Validation | Pydantic / Zod |
| Styling | Tailwind CSS |

---

## 📁 Standard Project Structure

### Monorepo (Turborepo)

```
my-app/
├── apps/
│   ├── web/              # React frontend
│   ├── api/              # Express API
│   └── docs/             # Documentation
├── packages/
│   ├── db/               # Prisma schema
│   ├── shared/           # Shared types/utils
│   └── ui/               # Shared components
├── .leone/          # AI system
└── turbo.json
```

### Single App

```
my-app/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── routes/
│   └── utils/
├── .leone/          # AI system
└── package.json
```

---

## 🔧 Configuration Files

### TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### ESLint (.eslintrc)

```json
{
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

---

## 📝 Coding Conventions

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserList.tsx` |
| Hooks | camelCase + `use` | `useUsers.ts` |
| Services | camelCase + `Service` | `userService.ts` |
| Types | PascalCase | `UserData` |
| Constants | UPPER_SNAKE_CASE | `MAX_USERS` |
| Files | kebab-case | `user-list.tsx` |

### File Extensions

| Type | Extension |
|------|-----------|
| React components | `.tsx` |
| TypeScript modules | `.ts` |
| Tests | `.test.ts` or `.spec.ts` |
| Styles | `.css` or `.module.css` |

---

## 🎨 Styling Approach

### Recommended: Tailwind CSS

```tsx
// ✅ Good
<div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
  Content
</div>
```

### Component Libraries

| Library | Use Case |
|---------|----------|
| shadcn/ui | Custom, accessible components |
| Radix UI | Headless, fully accessible |
| Mantine | Feature-rich, modern |
| Chakra UI | Rapid prototyping |

---

## 🔐 Security Standards

### Authentication

```
[ ] Session-based or JWT
[ ] Refresh token rotation
[ ] Secure cookie settings
[ ] CORS configured
```

### Authorization

```
[ ] RBAC implemented
[ ] Route guards in place
[ ] API middleware for protected routes
```

### Data Protection

```
[ ] Input validation (Zod)
[ ] SQL injection prevention (ORM)
[ ] XSS prevention (React escapes by default)
[ ] CSRF protection
```

---

## 📊 Database Conventions

### Naming

```
[ ] Table names: plural, snake_case (`users`, `audit_logs`)
[ ] Columns: snake_case (`created_at`, `user_id`)
[ ] Primary keys: `id` (auto-increment or UUID)
[ ] Timestamps: `created_at`, `updated_at`
```

### Relations

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

---

## 🔄 API Conventions

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get single user |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Response Format

```typescript
// Success
{
  data: { ... },
  message: "Success"
}

// Error
{
  error: "Error message",
  code: "ERROR_CODE"
}
```

---

## 🌍 i18n (Internationalization)

### Structure

```
locales/
├── en/
│   └── common.json
├── sr/
│   └── common.json
└── hr/
    └── common.json
```

### Usage

```tsx
// ✅ Good
<h1>{t('welcome.title')}</h1>

// ❌ Bad
<h1>Welcome</h1>
```

---

## 📝 How to Customize

1. **Edit this file** (`STACK.md`) with your actual stack
2. **Update `PROJECT_MAP.md`** with your file structure
3. **Keep `.leone/` system** - it's universal

---

**Version:** 1.0.0
**Status:** ✅ Template (Customize per project)