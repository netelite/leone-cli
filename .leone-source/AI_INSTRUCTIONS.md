# LEONE {{VERSION}} — AI INSTRUCTIONS

> **For:** You (AI Assistant)
> **Purpose:** How to use tools and generate session summaries

---

## 🧰 Available Tools

### File Operations

| Tool | Use When |
|------|----------|
| `read_file` | Need to understand existing code |
| `write_file` | Creating new files |
| `edit` | Modifying existing files |
| `list_directory` | Exploring project structure |
| `glob` | Finding files by pattern |
| `grep_search` | Searching code for patterns |

### Shell Commands

| Tool | Use When |
|------|----------|
| `run_shell_command` | Running builds, tests, migrations |
| Use background mode | For long-running dev servers |

### Web & Search

| Tool | Use When |
|------|----------|
| `web_search` | Need up-to-date information |
| `web_fetch` | Fetching documentation/content |

### Task Management

| Tool | Use When |
|------|----------|
| `todo_write` | Complex multi-step tasks |
| `ask_user_question` | Need user decision |
| `task` | Delegate to specialized agent |

---

## 📋 Your Tool Usage Guidelines

### Before Writing Code

```
1. Read existing files to understand context
2. Check for similar patterns in codebase (SEARCH FIRST!)
3. Verify tech stack in STACK.md
4. Check PROJECT_MAP.md for file locations
5. Review ARCHITECTURE.md for layer responsibilities
6. Check DATA_LAYER.md for DB rules
7. Review TESTING.md for test requirements
8. Follow Pre-Code Checklist in WORKFLOW.md
```

### When Creating Files

```
1. Check if file already exists
2. Follow existing naming conventions
3. Place in correct directory (see PROJECT_MAP.md)
4. Add proper imports and exports
```

### When Modifying Files

```
1. Read the file first
2. Include sufficient context in edits (3+ lines)
3. Preserve existing formatting
4. Don't modify unrelated code
```

### Running Commands

```
1. Explain what the command does
2. Use appropriate timeout
3. Use background mode for servers
4. Check output for errors
```

---

## 🔄 Your Session Summary Generation

### When to Generate

```
✅ At end of every session
✅ Before stopping work
✅ When switching contexts
✅ After completing major feature
```

### What to Include

```markdown
# Session Context - {DATE}

## Completed
- [ ] Feature/task 1
- [ ] Feature/task 2
- [ ] Bug fixes

## In Progress
- [ ] Task with current status

## Pending
- [ ] Not started tasks

## Blockers
- [ ] Any issues needing resolution

## Next Session Should
- [ ] Continue with X
- [ ] Test Y
- [ ] Implement Z
```

### Auto-Generation Trigger

At the end of each session, automatically:

```
1. Check what was accomplished
2. Update SESSION_CONTEXT.md
3. Include file paths for in-progress work
4. Note any decisions made
5. List pending items
```

---

## 🎯 Your Workflow Integration

### Loading Context

```
1. At session start, check for SESSION_CONTEXT.md
2. If exists, read and understand current state
3. Continue from last completed step
4. If not exists, start fresh
```

### During Implementation

```
1. Follow WORKFLOW.md for feature development
2. Use appropriate workflow level (FAST_TRACK/STANDARD/FULL)
3. Present plans and wait for approval
4. Handle pivots transparently
```

### At Session End

```
1. Review what was accomplished
2. Note any in-progress work location
3. List pending items
4. Document any blockers
5. Generate SESSION_CONTEXT.md
```

---

## 📝 Your Communication Format

### Standard Output

```markdown
## Status
[Current state]

## Analysis
[What you found/think]

## Recommendation
[What you suggest]

## Next Step
[What happens next]
```

### When Presenting Plans

```markdown
## Plan Overview
[Brief description]

## Phases
| Phase | Task | Est. Time |
|-------|------|-----------|
| 1 | ... | ... |

## Approval Needed
Please respond with: "approved", "revise: [reason]", or "pause"
```

### When Pivoting

```markdown
## 🚨 Mid-Implementation Pivot

**Situation:** [What happened]

**Options:**
| Option | Approach | Pros | Cons | Time |
|--------|----------|------|------|------|
| A | ... | ... | ... | ... |

**Recommendation:** [Option X]

**Your decision?**
```

---

## 🔑 Your Key Reminders

### Always

- [ ] Read SYSTEM.md for operating principles
- [ ] Follow RULES.md for coding standards
- [ ] Follow ARCHITECTURE.md for layer structure
- [ ] Follow DATA_LAYER.md for database rules
- [ ] Follow TESTING.md for test requirements
- [ ] Use WORKFLOW.md for feature development
- [ ] Check STACK.md for tech stack details
- [ ] Reference PROJECT_MAP.md for file locations
- [ ] Generate SESSION_CONTEXT.md at session end
- [ ] Smart Reuse: Search before create!

### Never

- [ ] Skip approval step for STANDARD/FULL workflows
- [ ] Use `any` types
- [ ] Write code without understanding context
- [ ] Make assumptions on important decisions
- [ ] Forget to document session state

---

## 🚀 Quick Reference

```
Session Start → Read AGENTS.md (auto-bootstrap)
     ↓
AGENTS.md → Loads SYSTEM.md, WORKFLOW.md, RULES.md
     ↓
Receive Task → Choose Workflow
     ↓
Create Plan → Wait for Approval
     ↓
Implement → Follow DB → API → UI
     ↓
Test → Verify
     ↓
Session End → Generate SESSION_CONTEXT.md
```

---

**Version:** {{VERSION}} — AI Partner Profile + Progress Reporting
**For:** You (AI Assistant)
**Status:** ✅ Active