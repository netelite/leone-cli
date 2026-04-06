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
#    Qwen CLI reads AGENTS.md first — no copy-paste needed.
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

## Key Features (v1.1.x)

### 🤖 AI Partner Profile

LEONE v1.1.x reorients the methodology around a **solo AI development partnership** — one human, one AI, working as a structured team.

### 🚀 Auto-Bootstrap

When using **Qwen CLI**, LEONE auto-bootstraps via `AGENTS.md` — the AI reads methodology files automatically at session start. No copy-paste prompts needed.

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
- `"nije to to"` — wrong approach, change direction
- `"promijeni pristup"` — switch strategy
- `"pojasni"` — clarify current approach

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
- File structure: `locales/en/`, `locales/sr/`
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
    ├── AGENTS.md              # Auto-bootstrap entry point (Qwen CLI)
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
    ├── VERSION                # Version file (1.1.1)
    └── plans/
        ├── LIGHT.md           # Bug fixes (< 1 hr, no approval)
        ├── STANDARD.md        # Most features (approval required)
        └── FULL.md            # Complex features (approval required)
```

---

## 🔄 Session Flow (v1.1.1)

![Leone methodology — AI agent flow](leone_ai_agent_flow_en.svg)

---

## Version History

| Version | Date | Codename | Changes |
|---------|------|----------|---------|
| 1.0.0 | 2026-03-25 | Initial Release | Human-AI partnership system baseline |
| 1.1.0 | 2026-04-03 | AI Partner Profile | Solo-dev focus, auto-bootstrap, context reset, self-review checklist, stop & redirect, human review points, smart reuse tree, performance budget, i18n workflow, secret management, N+1 prevention, Vitest/factories/mocking |
| 1.1.1 | 2026-04-03 | Progress Reporting | Structured progress report templates, phase tracking with visual indicators, feature-complete report with self-review status |

---

## For Developers: Publishing to NPM

If you want to publish this CLI to npm:

```bash
# 1. Update version in package.json and .leone-source/VERSION
npm version patch  # or minor/major

# 2. Update LEONE_VERSION in index.js

# 3. Test what will be published
npm pack

# 4. Login to npm (first time only)
npm login

# 5. Publish
npm publish

# 6. Install globally to test
npm install -g @netelite/leone-cli
leone version
```

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
