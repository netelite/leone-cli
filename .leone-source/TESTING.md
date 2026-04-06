# LEONE v1.1.1 — TESTING RULES

> **Purpose:** Ensure all code is tested and validated

---

## 🧪 Testing Mindset

**Test Pyramid:**

```
        /\
       /  \
      / E2 \      ← Few (slow, expensive)
     /------\
    / Integ  \    ← Some (medium speed)
   /----------\
  /   Unit     \  ← Many (fast, cheap)
 /--------------\
```

**Focus on:**
1. Unit tests for services
2. Integration tests for APIs
3. E2E tests for critical flows

---

## ✅ Input Validation (ALWAYS)

### Zod Validation for All Inputs

```typescript
// ✅ GOOD - Validate ALL inputs
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be 8+ characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
});

type CreateUserDto = z.infer<typeof createUserSchema>;

// In controller
async createUser(req: Request, res: Response) {
  try {
    const validated = createUserSchema.parse(req.body);
    const user = await userService.create(validated);
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    throw error;
  }
}
```

**Rules:**
- ✅ Validate ALL inputs with Zod
- ✅ Clear error messages
- ✅ Return 400 for validation errors
- ✅ Type inference from schemas
- ❌ No unvalidated inputs
- ❌ No `any` types

---

## 🧩 Unit Testing

### Service Layer Tests

```typescript
// ✅ GOOD - Unit test example
describe('UserService', () => {
  let service: UserService;
  let mockRepo: MockUserRepository;
  
  beforeEach(() => {
    mockRepo = new MockUserRepository();
    service = new UserService(mockRepo);
  });
  
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'hashed123',
        name: 'Test User',
      };
      
      const user = await service.create(userData);
      
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
      expect(mockRepo.create).toHaveBeenCalledWith(userData);
    });
    
    it('should throw ConflictError for duplicate email', async () => {
      mockRepo.findByEmail.mockResolvedValue({ id: '1', email: 'test@example.com' });
      
      await expect(service.create({ email: 'test@example.com', password: '123', name: 'Test' }))
        .rejects.toThrow(ConflictError);
    });
    
    it('should hash password before saving', async () => {
      const userData = { email: 'test@example.com', password: 'plain123', name: 'Test' };
      
      await service.create(userData);
      
      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: expect.not.stringMatching('plain123'),
        })
      );
    });
  });
});
```

**Rules:**
- ✅ Test each service method
- ✅ Test happy path
- ✅ Test error cases
- ✅ Mock dependencies
- ❌ No real DB in unit tests
- ❌ No skipped edge cases

---

## 🔗 Integration Testing

### API Endpoint Tests

```typescript
// ✅ GOOD - Integration test example
describe('POST /api/users', () => {
  let app: Express;
  let db: PrismaClient;
  
  beforeAll(() => {
    app = createApp();
    db = new PrismaClient();
  });
  
  afterEach(async () => {
    await db.user.deleteMany();
  });
  
  it('should create user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123',
        name: 'Test User',
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
    expect(response.body).not.toHaveProperty('password');
  });
  
  it('should return 400 for invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'invalid', password: '123', name: 'Test' });
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  
  it('should return 400 for short password', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', password: '123', name: 'Test' });
    
    expect(response.status).toBe(400);
  });
  
  it('should return 409 for duplicate email', async () => {
    await db.user.create({
      data: { email: 'test@example.com', password: 'hashed', name: 'Existing' },
    });
    
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', password: '123', name: 'New' });
    
    expect(response.status).toBe(409);
  });
});
```

**Rules:**
- ✅ Test full request/response cycle
- ✅ Clean DB after each test
- ✅ Test all HTTP methods (GET, POST, PUT, DELETE)
- ✅ Test authentication/authorization
- ❌ No test dependencies between tests
- ❌ No production DB

---

## 🔐 Security Testing

### RBAC & Authentication

```typescript
// ✅ GOOD - Test RBAC
describe('DELETE /api/users/:id', () => {
  it('should return 401 without token', async () => {
    const response = await request(app).delete('/api/users/123');
    expect(response.status).toBe(401);
  });
  
  it('should return 403 for regular user', async () => {
    const token = generateToken({ role: 'USER' });
    const response = await request(app)
      .delete('/api/users/123')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(403);
  });
  
  it('should delete user for admin', async () => {
    const token = generateToken({ role: 'ADMIN' });
    const response = await request(app)
      .delete('/api/users/123')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
```

**Rules:**
- ✅ Test unauthenticated requests
- ✅ Test unauthorized roles
- ✅ Test authorized access
- ✅ Test privilege escalation attempts
- ❌ No skipped auth tests

---

## 🧪 Edge Case Testing

### Common Edge Cases

```typescript
describe('Edge Cases', () => {
  it('should handle empty string', () => {
    expect(() => schema.parse({ name: '' })).toThrow();
  });
  
  it('should handle null values', () => {
    expect(() => schema.parse({ email: null })).toThrow();
  });
  
  it('should handle undefined values', () => {
    expect(() => schema.parse({ password: undefined })).toThrow();
  });
  
  it('should handle very long strings', () => {
    const longString = 'a'.repeat(10000);
    expect(() => schema.parse({ name: longString })).toThrow();
  });
  
  it('should handle special characters', () => {
    const result = schema.parse({ name: 'O\'Brien <>&"' });
    expect(result.name).toBe('O\'Brien <>&"');
  });
  
  it('should handle SQL injection attempts', () => {
    const result = schema.parse({ email: "'; DROP TABLE users; --" });
    expect(result.email).toBe("'; DROP TABLE users; --");
    // Prisma handles parameterization
  });
});
```

**Rules:**
- ✅ Test empty strings
- ✅ Test null/undefined
- ✅ Test very long inputs
- ✅ Test special characters
- ✅ Test injection attempts
- ❌ No assumed valid inputs

---

## 📋 Testing Checklist

### Before Marking Feature as Done

```
[ ] Input validation tested (Zod)
[ ] Happy path tested
[ ] Error cases tested
[ ] Edge cases tested
[ ] RBAC tested (if applicable)
[ ] Authentication tested (if applicable)
[ ] Database cleanup in tests
[ ] No test dependencies
[ ] Mock external services
[ ] Tests pass locally
```

---

## 🧰 Testing Tools

### Modern Test Stack Options

| Tool | Use For | Why Choose It |
|------|---------|---------------|
| **Vitest** | Unit + Integration tests | Faster than Jest, native ESM, Vite integration, same API as Jest |
| **Jest** | Unit + Integration tests | Mature ecosystem, better mocking, widely adopted |
| **Playwright** | E2E tests | Multi-browser, reliable, auto-wait, parallel execution |
| **Supertest** | API integration tests | Express endpoint testing |

### Recommended Stack (AI Partner Profile)

For solo + AI setup, prefer **Vitest** over Jest — it's faster and integrates better with modern tooling:

```json
{
  "devDependencies": {
    "vitest": "^2.0.0",
    "@vitest/coverage-v8": "^2.0.0",
    "supertest": "^6.0.0",
    "@types/supertest": "^6.0.0"
  }
}
```

### Vitest Config

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      thresholds: {
        branches: 60,
        functions: 60,
        lines: 60,
        statements: 60,
      },
    },
  },
});
```

### Coverage Thresholds: Solo vs Production
| Metric | Solo Project | Production App |
|--------|-------------|----------------|
| Branches | 50% | 70% |
| Functions | 60% | 80% |
| Lines | 60% | 80% |
| Statements | 60% | 80% |

**Why lower for solo?** 80% coverage on a solo project creates slowdown without proportional benefit. 60% catches most bugs. 80% is for teams where code is touched by multiple people.

---

## 🏭 Test Data Factories

### Why This Exists
Without a factory pattern, I will duplicate test data across dozens of tests. When the schema changes, every test breaks individually. Factories centralize test data creation.

### Factory Pattern

```typescript
// test/factories/userFactory.ts
import { faker } from '@faker-js/faker';

export interface CreateUserData {
  email?: string;
  password?: string;
  name?: string;
  role?: 'USER' | 'ADMIN';
}

export const createUserFactory = (overrides: CreateUserData = {}) => ({
  email: overrides.email || faker.internet.email(),
  password: overrides.password || faker.internet.password({ length: 12 }),
  name: overrides.name || faker.person.fullName(),
  role: overrides.role || 'USER',
});

// Usage in tests
import { createUserFactory } from '../factories/userFactory';

it('should create user', async () => {
  const userData = createUserFactory({ role: 'ADMIN' });
  const user = await repo.create(userData);
  expect(user.role).toBe('ADMIN');
});

it('should reject duplicate email', async () => {
  const data = createUserFactory();
  await repo.create(data);
  await expect(repo.create(data)).rejects.toThrow();
});
```

### Benefits
- One place to update when schema changes
- Realistic fake data (faker)
- Override specific fields per test
- No copy-paste duplication

---

## 🎭 Mocking External Services

### Why This Exists
I must not call real external APIs (email, payments, storage) during tests. They're slow, expensive, and unreliable.

### Mock with Jest/Vitest

```typescript
// Mock email service
vi.mock('../services/emailService', () => ({
  EmailService: vi.fn().mockImplementation(() => ({
    send: vi.fn().mockResolvedValue({ id: 'mock-email-id' }),
  })),
}));
```

### Mock with MSW (HTTP-based services)
For services called over HTTP (Stripe, SendGrid, etc.), use **MSW** (Mock Service Worker):

```typescript
// test/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://api.stripe.com/v1/charges', () => {
    return HttpResponse.json({
      id: 'ch_mock',
      status: 'succeeded',
    });
  }),
  http.post('https://api.sendgrid.com/v3/mail/send', () => {
    return HttpResponse.json({ id: 'mock-message-id' });
  }),
];

// test/setup.ts
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### When to Mock vs When to Use Real
| Service | Test Strategy | Why |
|---------|--------------|-----|
| Email (SendGrid) | Mock | External, rate-limited |
| Payments (Stripe) | Mock | Real money, can't test |
| File storage (S3) | Mock | Slow, costs money |
| Database | Real (test DB) | Need actual queries |
| Auth provider | Mock or real test DB | Depends on setup |

---

## 🚫 Anti-Patterns (Never)

| Anti-Pattern | Why It's Bad | Fix |
|--------------|--------------|-----|
| No input validation | Security risk | Use Zod |
| No error case tests | Hidden bugs | Test errors |
| No edge case tests | Production failures | Test boundaries |
| Real DB in unit tests | Slow, flaky | Mock DB |
| Test dependencies | Brittle tests | Independent tests |
| No auth tests | Security holes | Test RBAC |
| No cleanup | Data pollution | Clean after tests |

---

## ✅ Definition of Done (Testing)

A feature is **tested** when:

```
[✅] All inputs validated with Zod
[✅] Happy path has unit test
[✅] Error cases have tests
[✅] Edge cases covered
[✅] RBAC tested (if applicable)
[✅] API has integration tests
[✅] All tests pass
[✅] Coverage > 60% (solo) / > 80% (production)
```

---

**Version:** 1.1.1 — AI Partner Profile + Progress Reporting
**Methodology:** LEONE AI Governance
**Status:** ✅ Active
