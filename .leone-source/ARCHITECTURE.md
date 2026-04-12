# LEONE {{VERSION}} — ARCHITECTURE RULES

> **Purpose:** Define clear architecture patterns for you to follow

---

## 🏗️ Backend Structure

```
apps/api/
├── src/
│   ├── controllers/     # HTTP handling only
│   ├── services/        # Business logic only
│   ├── repositories/    # DB access only
│   ├── schemas/         # Zod validation schemas
│   ├── middleware/      # Express middleware (RBAC, audit)
│   ├── utils/           # Shared utilities
│   └── index.ts         # Entry point
```

---

## 📐 Layer Responsibilities

### Controllers Layer
```typescript
// ✅ GOOD
class UserController {
  constructor(private userService: UserService) {}
  
  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.getById(id);
    return res.json(user);
  }
}

// ❌ BAD - Business logic in controller
class UserController {
  async getUser(req: Request, res: Response) {
    // Direct DB call
    const user = await db.user.findUnique({ where: { id: req.params.id } });
    
    // Business logic in controller
    if (user.balance < 0) {
      user.status = 'suspended';
    }
    
    return res.json(user);
  }
}
```

**Rules:**
- ✅ HTTP handling only (req/res)
- ✅ Call services, never DB directly
- ✅ Return HTTP responses
- ❌ No business logic
- ❌ No direct DB calls
- ❌ No data transformation (except HTTP-specific)

---

### Services Layer
```typescript
// ✅ GOOD
class UserService {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService
  ) {}
  
  async createUser(data: CreateUserDto) {
    // Business logic here
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('User already exists');
    }
    
    const user = await this.userRepo.create(data);
    await this.emailService.sendWelcome(user);
    return user;
  }
}
```

**Rules:**
- ✅ Core business logic lives here
- ✅ Call repositories for DB access
- ✅ Call other services for cross-cutting concerns
- ✅ Throw domain-specific errors
- ❌ No HTTP handling (req/res)
- ❌ No direct DB queries (use repositories)

---

### Repositories Layer
```typescript
// ✅ GOOD
class UserRepository {
  constructor(private db: PrismaClient) {}
  
  async findById(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }
  
  async create(data: CreateUserDto) {
    return this.db.user.create({ data });
  }
}
```

**Rules:**
- ✅ DB access only
- ✅ Prisma/ORM calls only
- ✅ Return raw data
- ❌ No business logic
- ❌ No HTTP handling
- ❌ No validation (use schemas)

---

### Schemas Layer (Zod)
```typescript
// ✅ GOOD
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
```

**Rules:**
- ✅ All input validation here
- ✅ Type inference from schemas
- ✅ Reusable across layers
- ❌ No business logic
- ❌ No DB calls

---

## 🔄 Request Flow

```
┌─────────────┐
│   Request   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Middleware │ → RBAC, Audit, CORS
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller  │ → HTTP handling
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │ → Business logic
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Repository  │ → DB access
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Database   │
└─────────────┘
```

---

## 📁 Frontend Structure

```
apps/web/
├── src/
│   ├── components/
│   │   ├── atomic/       # Button, Input, Label
│   │   ├── composite/    # FormField, Card, Modal
│   │   └── pages/        # Page-specific components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API calls
│   ├── stores/           # State management (Zustand/Redux)
│   ├── types/            # TypeScript types
│   ├── utils/            # Shared utilities
│   └── pages/            # Route pages
```

---

## 🎯 Component Hierarchy

```
Pages (fetch data)
  ↓
Composite Components (compose UI)
  ↓
Atomic Components (primitives)
```

**Rules:**
- ✅ Pages: Data fetching, state management
- ✅ Composite: Business UI logic
- ✅ Atomic: Pure UI, no business logic
- ❌ No mixed concerns

---

## 📊 State Management

```typescript
// ✅ GOOD - Separation
// Service layer (API calls)
const userService = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
};

// Hook layer (state management)
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchUsers = async () => {
    setLoading(true);
    const data = await userService.getAll();
    setUsers(data);
    setLoading(false);
  };
  
  return { users, loading, fetchUsers };
};
```

---

## 🔑 Key Principles

| Principle | Description |
|-----------|-------------|
| **Separation of Concerns** | Each layer has one responsibility |
| **Dependency Injection** | Inject dependencies, don't create |
| **Single Source of Truth** | Data lives in one place |
| **Explicit Dependencies** | No hidden imports or side effects |
| **Testability** | Each layer can be tested independently |

---

## 🚫 Anti-Patterns (Never)

| Anti-Pattern | Why It's Bad | Fix |
|--------------|--------------|-----|
| Controller → DB | Skips business logic | Use service layer |
| Service → HTTP | Mixed concerns | Use controller |
| Component → DB | Breaks separation | Use service/hook |
| Direct DB in UI | Security risk | Use API |
| Business logic in views | Hard to test | Move to service |

---

## ✅ Code Review Checklist

```
[ ] Controllers: HTTP handling only
[ ] Services: Business logic only
[ ] Repositories: DB access only
[ ] Schemas: Validation only
[ ] Components: UI only
[ ] No circular dependencies
[ ] Clear layer boundaries
[ ] Dependencies injected
```

---

**Version:** {{VERSION}} — AI Partner Profile + Progress Reporting
**Methodology:** LEONE AI Governance
**Status:** ✅ Active
