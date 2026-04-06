# LEONE v1.1.1 — DATA LAYER RULES

> **Purpose:** Define database-first thinking and data integrity rules

---

## 🗄️ Database-First Mindset

**Always follow this order:**

```
1. Schema Design     → Define data structure
2. Migration         → Version control for DB
3. Validation        → Zod schemas for input
4. Repository        → DB access layer
5. Service           → Business logic
```

**Never skip steps!**

---

## 📋 Schema Design Rules

### 1. Define Schema First

```prisma
// ✅ GOOD - Explicit schema
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  posts     Post[]
  comments  Comment[]
}

enum Role {
  USER
  ADMIN
  MODERATOR
}
```

**Rules:**
- ✅ Define all fields explicitly
- ✅ Use appropriate types
- ✅ Set defaults where needed
- ✅ Define relations clearly
- ❌ No implicit fields
- ❌ No `Any` or `Json` types (unless absolutely necessary)

---

## 🔀 Migration Rules

### Always Create Migrations

```bash
# ✅ GOOD workflow
1. Update schema.prisma
2. Run: prisma migrate dev --name add_user_role
3. Review generated migration
4. Commit migration file
```

**Rules:**
- ✅ Every schema change = new migration
- ✅ Review migration before committing
- ✅ Meaningful migration names
- ✅ Never edit committed migrations
- ❌ No direct DB changes without migration
- ❌ No `prisma db push` in production

---

## 🛡️ Validation Rules (Zod)

### Input Validation Before DB

```typescript
// ✅ GOOD - Validate before DB
const createUserSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['USER', 'ADMIN', 'MODERATOR']).default('USER'),
});

// In service
async createUser(data: CreateUserDto) {
  // Validate first
  const validated = createUserSchema.parse(data);
  
  // Then DB
  return this.userRepo.create(validated);
}
```

**Rules:**
- ✅ Validate ALL inputs
- ✅ Use Zod for validation
- ✅ Clear error messages
- ✅ Type inference from schemas
- ❌ No trust in client data
- ❌ No validation skipping

---

## 📦 Repository Pattern

### DB Access Only in Repositories

```typescript
// ✅ GOOD
class UserRepository {
  constructor(private db: PrismaClient) {}
  
  async findById(id: string) {
    return this.db.user.findUnique({
      where: { id },
      include: { posts: true }
    });
  }
  
  async create(data: CreateUserDto) {
    return this.db.user.create({ data });
  }
  
  async update(id: string, data: UpdateUserDto) {
    return this.db.user.update({
      where: { id },
      data
    });
  }
  
  async delete(id: string) {
    return this.db.user.delete({
      where: { id }
    });
  }
}
```

**Rules:**
- ✅ DB access only in repositories
- ✅ One method per operation
- ✅ Return raw data (no transformation)
- ✅ Handle Prisma-specific errors
- ❌ No business logic
- ❌ No HTTP handling

---

## 🔗 Relation Handling

### Define Relations Clearly

```prisma
// ✅ GOOD - Explicit relations
model User {
  id        String   @id @default(uuid())
  posts     Post[]
  profile   Profile?
}

model Post {
  id        String   @id @default(uuid())
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  comments  Comment[]
}

model Comment {
  id        String   @id @default(uuid())
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
}
```

**Rules:**
- ✅ Define both sides of relation
- ✅ Use explicit foreign keys
- ✅ Handle cascading deletes
- ✅ Optional vs Required clearly marked
- ❌ No circular relations without care
- ❌ No implicit relations

---

## 🔐 Security Rules

### Data Protection

```typescript
// ✅ GOOD - Hash passwords
class AuthService {
  async register(data: RegisterDto) {
    const hashedPassword = await hash(data.password, 12);
    return this.userRepo.create({
      ...data,
      password: hashedPassword
    });
  }
  
  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedError();
    
    const valid = await compare(password, user.password);
    if (!valid) throw new UnauthorizedError();
    
    return generateToken(user);
  }
}
```

**Rules:**
- ✅ Hash passwords (bcrypt/argon2)
- ✅ Never store plain text passwords
- ✅ Sanitize inputs
- ✅ Use parameterized queries (Prisma does this)
- ❌ No SQL injection risks
- ❌ No sensitive data in logs

---

## 📊 Audit Logging

### Track All Mutations

```typescript
// ✅ GOOD - Audit trail
interface AuditChanges {
  [key: string]: unknown;
}

interface AuditLogEntry {
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  changes?: AuditChanges;
  timestamp: Date;
}

class AuditService {
  async log(action: string, entity: string, entityId: string, userId: string, changes?: AuditChanges) {
    return this.db.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        userId,
        changes,
        timestamp: new Date()
      }
    });
  }
}

// In service
async updateUser(id: string, data: UpdateUserDto, userId: string) {
  const user = await this.userRepo.update(id, data);
  await this.auditService.log('UPDATE', 'User', id, userId, { data });
  return user;
}
```

**Rules:**
- ✅ Log all CREATE, UPDATE, DELETE
- ✅ Include userId, timestamp
- ✅ Track what changed
- ✅ Immutable audit logs
- ❌ No audit log modifications
- ❌ No sensitive data in audit

---

## 🧪 Testing Rules

### Database Testing

```typescript
// ✅ GOOD - Test repository
describe('UserRepository', () => {
  let repo: UserRepository;
  let db: PrismaClient;
  
  beforeAll(async () => {
    db = new PrismaClient();
    repo = new UserRepository(db);
  });
  
  afterEach(async () => {
    await db.user.deleteMany();
  });
  
  it('should create user', async () => {
    const user = await repo.create({
      email: 'test@example.com',
      password: 'hashed',
      name: 'Test'
    });
    
    expect(user.email).toBe('test@example.com');
  });
});
```

**Rules:**
- ✅ Test repositories independently
- ✅ Clean DB after tests
- ✅ Test edge cases
- ✅ Test relations
- ❌ No tests without cleanup
- ❌ No production DB in tests

---

## 📋 Pre-DB Checklist

Before any database operation:

```
[ ] Schema is defined
[ ] Migration is created
[ ] Validation schema exists (Zod)
[ ] Repository method exists
[ ] Error handling is in place
[ ] Audit logging (for mutations)
[ ] RBAC is checked
```

---

## 🚫 Anti-Patterns (Never)

| Anti-Pattern | Why It's Bad | Fix |
|--------------|--------------|-----|
| Direct DB in controller | Skips validation | Use repository |
| Direct DB in UI | Security risk | Use API |
| No migrations | No version control | Always migrate |
| No validation | Data corruption | Use Zod |
| Plain text passwords | Security breach | Hash passwords |
| No audit logs | No traceability | Add audit service |
| `Any` types in schema | No type safety | Use specific types |

---

## 🔐 Secret Management

### Why This Exists
API keys, database passwords, JWT secrets — these must never appear in code or git history. I must handle secrets correctly by design.

### What Counts as a Secret
- API keys (Stripe, SendGrid, AWS, etc.)
- Database connection strings (contain passwords)
- JWT signing keys
- OAuth client secrets
- Encryption keys
- Third-party service tokens

### Rules
- [ ] NEVER commit `.env` files to git
- [ ] ALWAYS use `.env.example` with placeholder values
- [ ] NEVER log secret values (even in error messages)
- [ ] NEVER pass secrets as query parameters or in URLs
- [ ] Rotate secrets every 90 days (or immediately after exposure)

### .env.example Template
```env
# Database
DATABASE_URL="postgresql://user:PASSWORD@localhost:5432/dbname"

# Auth
JWT_SECRET="change-me-in-production"
JWT_EXPIRY="24h"

# External Services
STRIPE_SECRET_KEY="sk_test_..."
SENDGRID_API_KEY="SG...."

# Feature Flags
ENABLE_AUDIT_LOGS=true
```

### Environment-Specific Strategy
| Env | Secret Source |
|-----|---------------|
| Local | `.env` file (gitignored) |
| CI/CD | Platform secrets (GitHub Actions, Vercel env) |
| Production | Environment variables, secret manager (AWS Secrets Manager, Doppler) |

### Exposure Response
If a secret is accidentally committed:
1. Revoke/rotate immediately
2. Remove from git history (`git filter-branch` or `bfg`)
3. Force push
4. Notify user
5. Audit access logs for misuse

---

## ⚡ N+1 Query Prevention

### Why This Exists
I will naturally write loops that load relations one-by-one. This is the most common performance mistake. N+1 queries must be prevented by design.

### What Is N+1
```
1 query to get N records
+ N queries to get each record's relations
= N+1 total queries (could be 100+ queries)
```

### How to Prevent

#### Rule 1: Always use `include` or `select` for relations
```typescript
// ❌ BAD — N+1: 1 + N queries
const users = await db.user.findMany();
const usersWithPosts = users.map(user => ({
  ...user,
  posts: await db.post.findMany({ where: { authorId: user.id } })
}));

// ✅ GOOD — 1 query with include
const users = await db.user.findMany({
  include: { posts: true }
});
```

#### Rule 2: Never load relations in a loop
```typescript
// ❌ BAD
for (const user of users) {
  const profile = await db.profile.findUnique({ where: { userId: user.id } });
}

// ✅ GOOD
const profiles = await db.profile.findMany({
  where: { userId: { in: users.map(u => u.id) } }
});
```

#### Rule 3: Use `select` to limit fields
```typescript
// ❌ BAD — loads all fields
const users = await db.user.findMany();

// ✅ GOOD — loads only what's needed
const users = await db.user.findMany({
  select: { id: true, name: true, email: true }
});
```

#### Rule 4: Always paginate
```typescript
// ❌ BAD — loads ALL records
const users = await db.user.findMany();

// ✅ GOOD — paginated
const users = await db.user.findMany({
  take: 20,
  skip: (page - 1) * 20,
  orderBy: { createdAt: 'desc' }
});
```

### N+1 Checklist
- [ ] No relation loading in loops
- [ ] `include`/`select` used instead of manual queries
- [ ] Pagination applied to list queries
- [ ] Only necessary fields selected
- [ ] Foreign key columns indexed

---

## ✅ Code Review Checklist

```
[ ] Schema defined first
[ ] Migration created and reviewed
[ ] Zod validation in place
[ ] Repository pattern used
[ ] No direct DB calls outside repo
[ ] Passwords hashed
[ ] Audit logs for mutations
[ ] RBAC checked before DB access
[ ] Error handling implemented
[ ] Tests pass
```

---

**Version:** 1.1.1 — AI Partner Profile + Progress Reporting
**Methodology:** LEONE AI Governance
**Status:** ✅ Active
