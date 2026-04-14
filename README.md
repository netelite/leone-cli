# LEONE CLI 🦁

> **Lead your AI with confidence**
>
> Optimized for **1 Human + 1 AI** development partnership

Command Line Interface for installing and managing the LEONE AI Governance Methodology.

---

## 📸 Preview

![LEONE CLI About](leone-about.png)

---

## 📜 License & Copyright

**CLI Code:** MIT License — see [LICENSE-CODE](LICENSE-CODE)

**LEONE Methodology:** CC BY-SA 4.0 — see [LICENSE-METHODOLOGY](LICENSE-METHODOLOGY)

**Copyright:** © 2026 NETELITE. All rights reserved.

**LEONE** is a trademark of NETELITE.

---

### What CC BY-SA 4.0 Means:

✅ **You can:**
- Use LEONE for personal and commercial projects
- Modify and improve the methodology
- Create training courses based on LEONE
- Distribute your modifications

✅ **But you must:**
- Give credit to NETELITE
- Release modifications under the same CC BY-SA 4.0 license
- Not suggest NETELITE endorses you (without permission)

📖 Full license: https://creativecommons.org/licenses/by-sa/4.0/

## Installation

### Option 1: Install from NPM (Recommended)

```bash
# Install globally
npm install -g @netelite/leone-cli

# Now you can use 'leone' from anywhere
leone init
```

### Option 2: Install from Source

```bash
# Navigate to the CLI directory
cd leone-cli

# Link globally
npm link

# Or run directly
node index.js <command>
```

### Option 3: Run Without Installing

```bash
# Use npx to run without installing
npx @netelite/leone-cli init
```

---

## Usage

```bash
leone <command> [options]
```

### Commands

| Command | Description |
|---------|-------------|
| `init` | Install .leone/ AI Governance Methodology |
| `update` | Check and install updates |
| `about` | Show system information |
| `version` | Show CLI version |
| `help` | Show help message |

### Options

| Option | Description |
|--------|-------------|
| `--force, -f` | Overwrite existing .leone/ directory |
| `--help, -h` | Show help for specific command |
| `--version, -v` | Show version |

---

## Examples

```bash
# Install in current folder
leone init

# Overwrite existing installation
leone init --force

# Check for updates
leone update

# Learn about the system
leone about

# Show version
leone version
```

---

## Quick Start

```bash
# 1. Navigate to your project folder
cd your-project-folder

# 2. Install LEONE methodology
leone init

# 3. Open your AI assistant — LEONE auto-bootstraps automatically!
#    Any supported AI CLI reads AGENTS.md first — no copy-paste needed.
```

---

## What is LEONE?

**LEONE** is a development methodology for human-AI collaboration.

- **Not a framework, tool, or platform**
- **A methodology** — a system of methods for achieving consistent, high-quality AI-assisted development
- **Optimized for 1 Human + 1 AI** solo development partnership

### Name & Origin

**LEONE** = LEO + NE

- **LEO** (Latin: Lion 🦁)
- **NE** (NETELITE) — The brand behind the methodology

Together: **LEONE** — "The Lion of NETELITE"

### Tagline

> "Lead your AI with confidence"

---

## Key Features (v1.2.0)

### 🤖 AI Partner Profile

LEONE v1.2.0 reorients the methodology around a **solo AI development partnership** — one human, one AI, working as a structured team.

### 🚀 Auto-Bootstrap

When using any supported AI CLI, LEONE auto-bootstraps via `AGENTS.md` — the AI reads methodology files automatically at session start. No copy-paste prompts needed.

**Tested & Verified:**
- Qwen CLI
- Gemini
- More models coming soon — we're continuously testing!

### 📊 Progress Reporting

Structured phase-by-phase progress updates with visual status indicators. The AI reports on each layer (DB → API → UI → Polish) before moving forward, preventing incomplete work being presented as "done."

### ✅ AI Self-Review Checklist

Before declaring anything complete, the AI runs an **11-item quality checklist**:
- Read modified files to verify correctness
- No `any` types in TypeScript code
- Zod validation on all inputs
- i18n compliance
- RBAC on all endpoints
- File size under 200 lines
- No stray `console.log`
- `tsc` passes
- Lint passes
- And more

### 🔄 Context Reset Procedure

When sessions exceed 2 hours or context degrades, the AI automatically summarizes state to prevent memory loss and maintain quality.

### 🛑 Stop & Redirect

Instant session control with recognized commands:
- `"stop"` — halt immediately
- `"this is wrong"` / `"not like this"` — wrong approach, change direction
- `"do it differently"` / `"change approach"` — switch strategy
- `"explain"` / `"clarify"` — clarify current approach

### 👤 Human Review Points

**5 defined checkpoints** where human oversight is required:
1. **Plan Approval** — before implementation starts
2. **DB Schema** — after database layer is complete
3. **API Complete** — after backend endpoints are ready
4. **UI Complete** — after frontend is built
5. **Final Review** — before declaring feature done

### 🧠 Smart Reuse Decision Tree

Concrete code reuse logic: **SEARCH → EVALUATE → EXTEND → EXTRACT**

Only reuse code that is **60%+ similar** in logic and structure.

### 📏 Performance Budget

**Frontend:**
- Initial bundle < 200KB (gzipped)
- Total bundle < 500KB
- TTI < 3.5s
- FCP < 1.8s
- CLS < 0.1

**Backend:**
- API p95 response < 200ms
- DB query p95 < 50ms
- Memory < 50MB/request

### 🌍 i18n Workflow

Standardized internationalization with:
- Key naming convention: `{namespace}.{feature}.{entity}.{action}`
- File structure: `locales/en/`, `locales/bs/`
- Clear rules for what does/doesn't need translation

### 🔐 Secret Management

- .env handling rules and templates
- What counts as a secret
- Exposure response procedure
- Environment-specific strategies

### ⚡ N+1 Query Prevention

**4 concrete rules** to prevent N+1 database queries:
1. Always use `include`/`select`
2. Never load relations in loops
3. Use `select` to limit fields
4. Always paginate

### 🧪 Testing with Vitest

- **Vitest** recommended over Jest for solo+AI setup
- **Test Data Factories** — centralized test data creation with faker
- **MSW Mocking** — HTTP-level mocking for external services (Stripe, SendGrid)
- **Coverage thresholds:** 60% solo / 80% production

---

### 🛠️ Supported AI Tools

LEONE is **AI-agnostic** — it works with any AI coding assistant that reads project files at session start.

**Tested & Verified:**
- ✅ **Qwen CLI** — primary development & testing platform
- ✅ **Gemini** — verified for auto-bootstrap and workflow compliance

**Coming Soon:**
- 🔜 We're continuously testing LEONE on additional AI models
- 🔜 Future releases will list all successfully tested platforms

**How it works:** Any AI that reads `AGENTS.md` at session start will automatically load the full LEONE methodology — no manual prompt copy-paste needed.

---

## File Structure

```
leone-cli/
├── index.js          # Main CLI entry point
├── package.json      # Package configuration
└── README.md         # This file
```

After running `leone init`, your project will have:

```
your-project/
└── .leone/
    ├── AGENTS.md              # Auto-bootstrap entry point (any AI CLI)
    ├── README.md              # Quick start guide
    ├── SYSTEM.md              # Operating principles & AI role
    ├── RULES.md               # Coding standards & anti-patterns
    ├── WORKFLOW.md            # Feature development flow
    ├── ARCHITECTURE.md        # Layer responsibilities (backend/frontend)
    ├── DATA_LAYER.md          # Database rules, secrets, N+1 prevention
    ├── TESTING.md             # Vitest, factories, mocking
    ├── STACK.md               # Tech stack (customizable per project)
    ├── SESSION_CONTEXT.md     # Session summary template
    ├── AI_INSTRUCTIONS.md     # Tool usage guide
    ├── PROJECT_MAP.md         # File structure reference
    └── plans/
        ├── LIGHT.md           # Bug fixes (< 1 hr, no approval)
        ├── STANDARD.md        # Most features (approval required)
        └── FULL.md            # Complex features (approval required)
```

---

## How It Works

### 🤝 The Partnership

| You (Human) | AI (Developer) |
|-------------|----------------|
| Define what you want to build | Create detailed plan |
| Approve or revise the plan | Build database, API, UI |
| Run commands (migrations, tests, dev server) | Report progress after each phase |
| Review at checkpoints | Self-review before saying "done" |
| Make decisions | Present options with recommendations |

**You lead. AI builds. Together you're more productive.**

### 🔁 Typical Workflow

1. **You say:** "I need an invoice module"
2. **AI creates:** A plan with phases, schema, endpoints, UI
3. **You review:** Approve or request changes
4. **AI builds:** DB → API → UI → Polish (reports progress)
5. **You test:** Run the dev server, click around, verify
6. **Done (or iterate):** AI updates SESSION_CONTEXT.md for next session

### ⚠️ What AI Can't Do
- Run dev servers or database migrations
- See the app in a browser
- Deploy to production
- Know what you want without you saying it

### ✅ What You Get
- Clean, structured, production-ready code
- Database schemas with migrations
- Validated, authenticated APIs (RBAC + Zod)
- Responsive, i18n-ready frontend
- Tests, audit logs, documentation
- A system that scales with your project

---

## 🔄 Session Flow

![Leone methodology — AI agent flow](leone_ai_agent_flow_en.svg)

```
┌─────────────────────────────────────────────────────────────┐
│  SESSION START                                              │
│  → AI reads AGENTS.md (auto-bootstrap)                      │
│  → Loads SYSTEM.md, WORKFLOW.md, RULES.md, STACK.md,        │
│    PROJECT_MAP.md, SESSION_CONTEXT.md (on-demand)           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  RECEIVE TASK                                               │
│  → Choose workflow (LIGHT/STANDARD/FULL)                    │
│  → Ask clarifying questions if needed                       │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  CREATE PLAN                                                │
│  → Present to user with progress format                     │
│  → Wait for approval                                        │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  APPROVAL GATE #1 — Plan Approval                           │
│  → "approved" / "go" / "yes" → Continue                    │
│  → "revise: reason" → Back to plan                          │
│  → "this is wrong" → Return to planning                     │
│  → "stop" → Halt immediately                                │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  IMPLEMENT (Phase by Phase)                                 │
│  → Phase 1: DB (Schema → Migration → Validation)            │
│  → Phase 2: API (Service → Controller → RBAC)               │
│  → Phase 3: UI (Hooks → Components → i18n)                  │
│  → Phase 4: Polish (Error states, tsc, lint)                │
│  → Mid-implementation pivot if blocker found                │
│  → Progress report after each phase                         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  APPROVAL GATE #2 — Code Review (per phase)                 │
│  → User reviews each phase before next                      │
│  → "do it differently" → Present alternatives               │
│  → "explain" → Explain thinking step by step                │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  SELF-REVIEW CHECKLIST (before saying "done")               │
│  → Re-read own code (read_file — do NOT skip)               │
│  → No `any` types anywhere                                  │
│  → All inputs validated with Zod                            │
│  → No hardcoded strings (i18n keys used)                    │
│  → RBAC on protected endpoints                              │
│  → Files under 200 lines                                    │
│  → No console.log in production code                        │
│  → tsc passes, lint passes                                  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  TEST & VERIFY                                              │
│  → Type check, lint, manual test, edge cases                │
│  → Tests pass (Vitest / integration / RBAC)                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  APPROVAL GATE #3 — Final Review                            │
│  → End-to-end functionality check                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  SESSION END                                                │
│  → AUTO-GENERATE SESSION_CONTEXT.md                         │
│  → Append-only log: completed, in-progress, pending,         │
│    blockers, next steps, file references                    │
│  → Ready for next session continuity                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛑 Stop & Redirect Commands

| Command | AI Action |
|---------|-----------|
| `"stop"` | Halt immediately. Save state. Wait. |
| `"this is wrong"` / `"not like this"` | Return to planning. Ask what was misunderstood. |
| `"do it differently"` / `"change approach"` | Present alternative approach (A/B/C). |
| `"explain"` / `"clarify"` | Explain thinking step by step. |

---

## 👤 Human Review Points (5 Checkpoints)

1. **Plan Approval** — Is the approach correct?
2. **DB Schema** — Data model, relations correct?
3. **API Complete** — Endpoints work? RBAC in place?
4. **UI Complete** — Looks right? Loading/error states?
5. **Final Review** — End-to-end functionality

---

## Version History

| Version | Date | Codename | Changes |
|---------|------|----------|---------|
| 1.0.0 | 2026-03-25 | Initial Release | Human-AI partnership system baseline |
| 1.1.0 | 2026-04-03 | AI Partner Profile | Solo-dev focus, auto-bootstrap, context reset, self-review checklist, stop & redirect, human review points, smart reuse tree, performance budget, i18n workflow, secret management, N+1 prevention, Vitest/factories/mocking |
| 1.1.1 | 2026-04-03 | Progress Reporting | Structured progress report templates, phase tracking with visual indicators, feature-complete report with self-review status |
| 1.2.0 | 2026-04-12 | Single Version | Unified versioning — CLI and methodology share one version from package.json. `{{VERSION}}` placeholders auto-replaced during `leone init` |
| 1.2.1 | 2026-04-14 | Session Flow Update | Updated Session Flow diagrams in both README files with Self-Review, Stop & Redirect, Human Review Points, phase-by-phase implementation |
| 1.2.2 | 2026-04-14 | Polish | Tailwind CSS v4+ requirement (warns against v3), VERSION file added, English language standardization, real npm update checks |
| 1.2.3 | 2026-04-14 | Session Flow + SVG | Updated Session Flow diagrams in both READMEs, leone_ai_agent_flow_en.svg updated with v1.1.x features, Version History updated |
| **1.2.4** | **2026-04-14** | **Layout fixes** | SVG diagram reference restored in CLI README, Session Flow header version removed, proper ordering restored |

---

## For Developers: Publishing to NPM

If you want to publish this CLI to npm:

```bash
# 1. Update version in package.json (single source of truth)
npm version patch  # or minor/major

# 2. Test what will be published
npm pack

# 3. Login to npm (first time only)
npm login

# 4. Publish
npm publish

# 5. Install globally to test
npm install -g @netelite/leone-cli
leone version
```

> **Note:** Version is managed in one place — `package.json`. The CLI reads it dynamically, and `{{VERSION}}` placeholders in `.leone-source/` files are replaced during `leone init`.

---

## Requirements

- **Node.js:** >= 14.0.0
- **npm:** >= 6.0.0

---

## Support

- **Issues:** https://github.com/netelite/leone-cli/issues
- **Repository:** https://github.com/netelite/leone-cli
- **NPM:** https://www.npmjs.com/package/@netelite/leone-cli

---

## License

MIT © NETELITE

---

🦁 **Lead your AI with confidence**
