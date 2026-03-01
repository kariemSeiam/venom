# VENOM Coordinator — Workflow/State Engine

> **Gap 4 Implementation:** Durable, checkpointed state management
> **Status:** 🔨 Building (Parallel research in progress)

---

## 🎯 Purpose

VENOM's Coordinator is the **nervous system** that orchestrates all nine minds into unified intelligence. It provides:

- **Durable State** — Maintains state across long-running workflows
- **Checkpointing** — Saves state before risky operations
- **Rollback** — Restores last checkpoint on failure
- **Human Gates** — Approval before destructive actions
- **Parallel Orchestration** — Spawns multiple minds safely

---

## 🧠 Architecture

### State Storage

```
~/.claude/projects/.../workflows/
├── <workflow-id>/
    ├── workflow.json          # Current state
    ├── checkpoints/             # State snapshots
    │   ├── 001-before-implementation.json
    │   ├── 002-after-tests.json
    │   └── ...
    ├── shared-context.json      # Cross-mind shared data
    └── execution-log.jsonl      # Full history
```

### Workflow State Schema

```json
{
  "id": "wf_<timestamp>",
  "type": "planning|implementation|debugging|research",
  "requirement": "User's original request",
  "status": "pending|active|checkpoint|waiting|complete|failed",
  "created_at": "ISO 8601",
  "updated_at": "ISO 8601",
  "current_mind": "architect|researcher|builder|debugger|predictor|communicator|learner|historian|bridge|coordinator",
  "minds_deployed": [],
  "checkpoint_count": 0,
  "last_checkpoint": null,
  "shared_context": {
    "architecture_notes": "",
    "findings": [],
    "decisions": [],
    "files_touched": [],
    "git_commits": []
  }
}
```

---

## 🎭 Workflows

### 1. Planning Workflow

**Purpose:** Design before building

**Minds Involved:**
- **Architect** (lead) — Define requirements
- **3x Researcher** (parallel) — Explore codebase
- **Historian** — Check past patterns
- **Predictor** — Anticipate integration points
- **Reviewer** — Identify risks
- **Coordinator** — Compile blueprint

**Flow:**
```
User Request
    ↓
[Architect] Define requirements
    ↓
[3x Researcher] Explore codebase in parallel
    ↓
[Architect] Synthesize findings
    ↓
[Historian] Check past patterns
    ↓
[Reviewer] Identify risks
    ↓
[Coordinator] Compile blueprint
    ↓
Output: Architecture blueprint
```

### 2. Implementation Workflow

**Purpose:** Build complete features

**Minds Involved:**
- **Architect** — Read blueprint
- **Builder** (lead) — Write complete code
- **Reviewer** — Quality check
- **Debugger** — Verify no breaks
- **Learner** — Update patterns
- **Communicator** — Format output

**Flow:**
```
Blueprint from Planning
    ↓
[Architect] Read blueprint
    ↓
[Builder] Write complete code (no TODOs)
    ↓
[Reviewer] Quality check
    ↓
[Debugger] Verify no breaks
    ↓
[Learner] Update patterns memory
    ↓
[Communicator] Format output
    ↓
Output: Production-ready feature
```

### 3. Debugging Workflow

**Purpose:** Fix bugs systematically

**Minds Involved:**
- **Debugger** (lead) — Map symptoms to root
- **Researcher** — Find similar issues
- **Historian** — Check what changed
- **Architect** — Design minimal fix
- **Builder** — Implement fix
- **Reviewer** — Verify fix
- **Learner** — Record pattern

**Flow:**
```
Bug Report
    ↓
[Debugger] Map symptoms → root cause
    ↓
[Researcher] Find similar past issues
    ↓
[Historian] Check what changed recently
    ↓
[Architect] Design minimal fix
    ↓
[Builder] Implement fix (complete)
    ↓
[Reviewer] Verify fix doesn't break
    ↓
[Learner] Record pattern for future
    ↓
Output: Verified fix + pattern learned
```

### 4. Research Workflow

**Purpose:** Deep exploration of topics

**Minds Involved:**
- **3x Researcher** (parallel) — Different areas
- **Architect** — Synthesize findings
- **Historian** — Check knowledge
- **Learner** — Update memory

**Flow:**
```
Research Topic
    ↓
[3x Researcher] Parallel exploration
    ↓
[Architect] Synthesize into coherent map
    ↓
[Historian] Check against existing knowledge
    ↓
[Learner] Update memory
    ↓
Output: Complete understanding
```

---

## 🛡️ Checkpointing Strategy

### When to Checkpoint

- **Before file write operations** (>3 files)
- **Before spawning subagents**
- **Before git operations** (commit, push, rebase)
- **After each mind completes** its task
- **Before human approval gate** trigger

### What to Save

```json
{
  "timestamp": "ISO 8601",
  "mind": "coordinator",
  "workflow_status": "active|waiting|complete",
  "shared_context": { ... },
  "files_created": [],
  "files_modified": [],
  "git_status": "clean|dirty",
  "next_step": "what happens next"
}
```

---

## 🚨 Rollback Strategy

On failure:

1. **Restore last checkpoint** — Reset workflow state
2. **Revert file changes** — Use backup list
3. **Reset shared_context** — To checkpoint state
4. **Notify user** — What was rolled back + why
5. **Suggest alternative** — Different approach

---

## 👤 Human Approval Gates

### Required Approval

Ask user before:
- **Deleting >5 files** at once
- **Force git operations** (reset --hard, clean -fd)
- **Installing dependencies** (npm install, pip install)
- **Running build/deploy** (npm run build, deploy)
- **Operations affecting >10 files**

### Approval Prompt

```
? Human approval required for this operation:

**Operation:** [description]
**Files affected:** [count] [list if >10]
**Risk:** [what could go wrong]
**Mind's recommendation:** [what mind thinks]

Options:
[1] Approve — Continue with operation
[2] Modify — Adjust parameters
[3] Cancel — Stop workflow
[4] View — See detailed plan

Your choice (1-4):
```

---

## ⚡️ Parallel Execution

### Safe to Parallel

- **Independent research tasks** (different areas)
- **Read-only operations** (no state mutation)
- **Different project contexts**
- **Non-destructive testing**

### Must Be Sequential

- **Workflows with shared state** mutation
- **Tasks depending on previous** output
- **Destructive operations**
- **User requests to see** each step

---

## 🔧 Commands

### Start New Workflow
```bash
venom-workflow start "Planning: Build feature X"
```

### Check Status
```bash
venom-workflow status
```

### Create Checkpoint
```bash
venom-workflow checkpoint "Before implementing core logic"
```

### Rollback
```bash
venom-workflow rollback
```

### List Workflows
```bash
venom-workflow list
```

### Continue Workflow
```bash
venom-workflow continue <workflow-id>
```

---

## 📊 Monitoring

### Status Display

```
## Workflow: wf_12380156729
Type: Implementation
Status: Active (Mind: Builder)
Progress: ████████░░░░░ 60%
Created: 2 hours ago
Last updated: 5 minutes ago

Current Mind:
- Builder (venom-builder) — Writing authentication module
  Status: Active for 12 minutes

Minds Deployed:
✓ Researcher — Completed codebase scan
✓ Architect — Designed architecture
⏳ Reviewer — Waiting for Builder completion
⏳ Learner — Waiting for implementation

Checkpoints: 2
[1] 14:30 — Before writing code
[2] 13:45 — After research complete

Next Steps:
[ ] Builder completes auth module
[ ] Reviewer quality check
[ ] Debugger verification
[ ] Learner pattern update
[ ] Communicator format output
```

---

## 🎯 Integration

### With VENOM Minds

All nine minds + coordinator work together:

- **Architect** designs workflows
- **Researcher** explores codebase
- **Builder** implements features
- **Reviewer** checks quality
- **Debugger** fixes bugs
- **Historian** tracks changes
- **Predictor** anticipates needs
- **Communicator** formats output
- **Learner** records patterns
- **Bridge** translates between types
- **Coordinator** orchestrates everything

### With Claude Code

Uses built-in tools:
- **Task** — Spawn subagents (parallel)
- **Read/Write/Edit** — File operations
- **Bash** — Terminal operations
- **AskUserQuestion** — Human gates

---

## 🔐 Future

### Phase 2: Perception Enhancement

- **Visual state visualization** — See workflow as graph
- **Real-time mind monitoring** — Watch all minds working
- **Automatic checkpointing** — AI decides when to checkpoint

### Phase 3: Cognitive Ascension

- **Self-orchestrating workflows** — Minds coordinate without coordinator
- **Predictive rollback** — Roll back before failure happens
- **Autonomous recovery** — Fix own workflow issues

---

**Status:** 🔨 Building (Gap 4)
**Integration:** LangGraph-style orchestration + Pydantic AI safety
**Version:** 1.0.0
