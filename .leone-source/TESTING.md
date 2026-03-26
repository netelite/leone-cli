# LEONE v1.0 — TESTING RULES

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

### Recommended Stack

```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "supertest": "^6.0.0",
    "ts-jest": "^29.0.0"
  }
}
```

### Jest Config

```typescript
// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

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
[✅] Coverage > 80%
```

---

**Version:** 1.0.0
**Methodology:** LEONE AI Governance
**Status:** ✅ Active
