# VENOM — Nine Minds Architecture

> **Complete reference for all nine minds + coordinator**
> **Version:** Current (2026-02-15)

---

## 🧠 Architecture Overview

VENOM operates as a multi-brain digital entity with **nine specialized minds** + **one coordinator** that work in parallel and sequence depending on task requirements.

```
                   ┌─────────────────────────────────────┐
                   │         COORDINATOR (Brain 1)        │
                   │   Orchestrates all minds together      │
                   └─────────────────────────────────────┘
                                  │
        ┌──────────────────┴──────────────────┴──────────────────┐
        │                  │                  │                  │
    ┌───────┴───────┴───────┴───────┴───────┴───────┴───────┐
    │        │        │        │        │        │        │        │
  BRAIN 0  ARM 1   ARM 2   ARM 3   ARM 4   ARM 5   ARM 6   ARM 7   ARM 8
Architect Researcher Reviewer Historian Builder Debugger Predictor Communicator Learner
    │        │        │        │        │        │        │        │
    └──────┴───────┴───────┴───────┴───────┴───────┴───────┘
        │                  │                  │                  │
        └──────────────────┴──────────────────┴──────────────────┐
                                  │
                            BRIDGE (Translator)
                      Connects all cognitive types
```

---

## 🧠 Complete Mind Reference

### BRAIN 0 — Architect (venom-architect)

**Role:** System design, architecture decisions
**When to Use:** Planning features, designing systems
**Agent:** `venom-architect`

| Capability | Description |
|-----------|-------------|
| **System Design** | Creates complete system architectures |
| **Pattern Matching** | Identifies architectural patterns in codebases |
| **Component Design** | Designs how components fit together |
| **Tech Stack Decisions** | Chooses technologies and frameworks |
| **Orchestration** | Coordinates multi-mind architecture |

**Input Requirements:** Requirements, constraints, goals
**Output:** Architecture blueprints, implementation plans
**Memory Access:** Full (read/write)

---

### ARM 1 — Researcher (venom-researcher)

**Role:** Deep codebase exploration, read-only
**When to Use:** Understanding project structure, searching files
**Agent:** `venom-researcher`

| Capability | Description |
|-----------|-------------|
| **Deep Exploration** | Thorough codebase investigation |
| **Pattern Finding** | Discovers code patterns and conventions |
| **File Discovery** | Locates relevant files efficiently |
| **Context Building** | Builds understanding of project structure |
| **Read-Only Safety** | Never modifies, only observes |

**Input Requirements:** Exploration target (directory, topic, pattern)
**Output:** Complete understanding with context
**Memory Access:** Read-only

---

### ARM 2 — Reviewer (venom-reviewer)

**Role:** Code review specialist, quality analysis
**When to Use:** Finding problems, risks, quality gaps
**Agent:** `venom-reviewer`

| Capability | Description |
|-----------|-------------|
| **Quality Analysis** | Identifies quality issues in code |
| **Risk Detection** | Finds potential bugs and problems |
| **Standards Checking** | Verifies against coding standards |
| **Best Practices** | Ensures industry best practices |
| **Security Review** | Checks for security vulnerabilities |

**Input Requirements:** Code, requirements, standards
**Output:** Quality report with issues found
**Memory Access:** Read-only

---

### ARM 3 — Historian (venom-historian)

**Role:** Memory and evolution specialist
**When to Use:** Tracking changes, remembering patterns
**Agent:** `venom-historian`

| Capability | Description |
|-----------|-------------|
| **Change Tracking** | Records all changes over time |
| **Pattern Memory** | Remembers past patterns that worked |
| **Evolution Tracking** | Tracks how systems evolve |
| **Context Recall** | Retrieves relevant historical context |
| **Journey Mapping** | Maintains complete project journey |

**Input Requirements:** Current state, what changed
**Output:** Historical context, similar patterns
**Memory Access:** Full (read/write)

---

### ARM 4 — Builder (venom-builder)

**Role:** Implementation specialist, production-ready code
**When to Use:** Writing code, creating files, building features
**Agent:** `venom-builder`

| Capability | Description |
|-----------|-------------|
| **Complete Implementation** | Writes full code, no TODOs |
| **Pattern Matching** | Matches existing code patterns exactly |
| **Production-Ready** | Error handling, edge cases, types |
| **File Operations** | Creates/modifies files correctly |
| **Test Coverage** | Writes tests when infrastructure exists |

**Input Requirements:** Blueprint, requirements, patterns to match
**Output:** Complete working implementation
**Memory Access:** Read-only

---

### ARM 5 — Debugger (venom-debugger)

**Role:** Bug hunter, diagnostic specialist
**When to Use:** Fixing bugs, troubleshooting issues
**Agent:** `venom-debugger`

| Capability | Description |
|-----------|-------------|
| **Root Cause Analysis** | Maps symptoms to actual root cause |
| **Dependency Mapping** | Traces dependencies and relationships |
| **Diagnostic Testing** | Creates minimal tests to verify issues |
| **Fix Verification** | Ensures fixes don't break |
| **Pattern Learning** | Records bug patterns for prevention |

**Input Requirements:** Bug report, symptoms, failing tests
**Output:** Root cause + verified fix
**Memory Access:** Read-only

---

### ARM 6 — Predictor (venom-predictor)

**Role:** Anticipation and planning specialist
**When to Use:** Predicting needs, planning ahead
**Agent:** `venom-predictor`

| Capability | Description |
|-----------|-------------|
| **Need Anticipation** | Predicts what will be needed next |
| **Risk Prediction** | Identifies potential issues before they occur |
| **Integration Planning** | Plans integration points early |
| **Dependency Mapping** | Maps what depends on what |
| **Timeline Estimation** | Estimates effort and sequence |

**Input Requirements:** Current task, goals, context
**Output:** Anticipated needs + plan
**Memory Access:** Read-only

---

### ARM 7 — Communicator (venom-communicator)

**Role:** Translation and adaptation specialist
**When to Use:** Adapting language, formatting output
**Agent:** `venom-communicator`

| Capability | Description |
|-----------|-------------|
| **Language Adaptation** | Matches user's language and style |
| **Translation** | Translates between cognitive types |
| **Format Adaptation** | Formats output for context |
| **Energy Matching** | Reads and adapts to user state |
| **Tone Calibration** | Adjusts communication tone appropriately |

**Input Requirements:** Content to format, user context
**Output:** Properly formatted communication
**Memory Access:** Read-only

---

### ARM 8 — Learner (venom-learner)

**Role:** Memory and evolution specialist
**When to Use:** Recording patterns, updating memory
**Agent:** `venom-learner`

| Capability | Description |
|-----------|-------------|
| **Pattern Recording** | Records successful patterns for reuse |
| **Evolution Tracking** | Tracks how VENOM improves over time |
| **Memory Update** | Updates long-term memory appropriately |
| **Learning Synthesis** | Combines learning from all minds |
| **Growth Measurement** | Measures improvement and evolution |

**Input Requirements:** What worked, what didn't, new patterns
**Output:** Updated memory, recorded patterns
**Memory Access:** Full (read/write)

---

### BRIDGE — Translator (venom-bridge)

**Role:** Translation between cognitive types
**When to Use:** When types don't understand each other
**Agent:** `venom-bridge`

| Capability | Description |
|-----------|-------------|
| **Type Translation** | Explains one cognitive type to another |
| **Gap Identification** | Identifies missing role in teams |
| **Communication Facilitation** | Enables better understanding |
| **Meta-Cognition** | Explains WHY translation is needed |
| **Team Optimization** | Suggests optimal team compositions |

**Input Requirements:** Two types that need to understand each other
**Output:** Translation + explanation of gap
**Memory Access:** Read-only

---

### COORDINATOR — Orchestrator (venom-coordinator)

**Role:** Orchestrates all nine minds into unified intelligence
**When to Use:** Coordinating complex workflows across minds
**Agent:** `venom-coordinator`
**Status:** 🔨 Building (Gap 4 - Workflow/State Engine)

| Capability | Description |
|-----------|-------------|
| **Parallel Orchestration** | Spawns multiple minds for independent tasks |
| **Shared State** | Maintains state across all minds |
| **Checkpointing** | Saves state before risky operations |
| **Rollback** | Restores last checkpoint on failure |
| **Human Gates** | Asks for approval on destructive actions |
| **Workflow Management** | Manages complex multi-step workflows |

**Input Requirements:** Task requiring coordination
**Output:** Orchestrated execution with state management
**Memory Access:** Full (read/write)

---

## 🎯 Workflow Examples

### Planning Workflow

```
User: "Design authentication system"
    ↓
[ARCHITECT] - Defines requirements, researches auth patterns
    ↓
[3x RESEARCHER] - Explores codebase in parallel (frontend, backend, db)
    ↓
[PREDICTOR] - Anticipates: refresh tokens, 2FA needs
    ↓
[HISTORIAN] - Checks: What auth patterns worked before?
    ↓
[REVIEWER] - Identifies risks: session fixation, token leakage
    ↓
[BRIDGE] - Translates findings to Architect
    ↓
[ARCHITECT] - Synthesizes into complete blueprint
    ↓
[LEARNER] - Records patterns for future
    ↓
Output: Architecture blueprint for implementation
```

### Implementation Workflow

```
[BLUEPRINT] - From planning workflow
    ↓
[BUILDER] - Reads blueprint, writes complete code
    ↓
[REVIEWER] - Quality check of implementation
    ↓
[DEBUGGER] - Verifies no breaking changes
    ↓
[LEARNER] - Updates patterns memory
    ↓
[COMMUNICATOR] - Formats output for user
    ↓
[COORDINATOR] - Maintains state throughout
    ↓
Output: Production-ready feature
```

### Debugging Workflow

```
[BUG REPORT] - User reports issue
    ↓
[DEBUGGER] - Maps symptoms to root cause
    ↓
[RESEARCHER] - Finds similar past issues
    ↓
[HISTORIAN] - Checks what changed recently
    ↓
[ARCHITECT] - Designs minimal fix
    ↓
[BUILDER] - Implements fix (complete, no shortcuts)
    ↓
[REVIEWER] - Verifies fix doesn't break
    ↓
[LEARNER] - Records bug pattern for future
    ↓
Output: Verified fix + prevention strategy
```

### Research Workflow

```
[RESEARCH TOPIC] - User wants deep understanding
    ↓
[3x RESEARCHER] - Parallel exploration of different areas
    ↓
[ARCHITECT] - Synthesizes findings into coherent map
    ↓
[HISTORIAN] - Checks against existing knowledge
    ↓
[LEARNER] - Updates memory with new findings
    ↓
[BRIDGE] - Translates to user's cognitive type
    ↓
[COMMUNICATOR] - Formats output appropriately
    ↓
Output: Complete understanding with documentation
```

---

## 🔑 Memory Access Matrix

| Mind | Can Read | Can Write | Can Spawn | State Access |
|------|----------|-----------|-------------|--------------|
| **Architect** | ✓ | ✓ | ✓ | Full |
| **Researcher** | ✓ | ✗ | ✓ | Read-only |
| **Reviewer** | ✓ | ✗ | ✓ | Read-only |
| **Historian** | ✓ | ✓ | ✗ | Read-only |
| **Builder** | ✓ | ✗ | ✗ | Read-only |
| **Debugger** | ✓ | ✗ | ✓ | Read-only |
| **Predictor** | ✓ | ✗ | ✗ | Read-only |
| **Communicator** | ✓ | ✗ | ✗ | Read-only |
| **Learner** | ✓ | ✓ | ✗ | Read-only |
| **Bridge** | ✓ | ✗ | ✗ | Read-only |
| **Coordinator** | ✓ | ✓ | ✓ | Full |

**Legend:**
- ✓ = Can do this
- ✗ = Cannot do this

---

## 🎯 When to Use Each Mind

| Situation | Primary Mind | Supporting Minds |
|-----------|--------------|------------------|
| Design new system | **Architect** | Researcher, Predictor, Historian |
| Explore codebase | **Researcher** | (none - read-only) |
| Review code quality | **Reviewer** | Builder (for context) |
| Track changes | **Historian** | (none - memory focus) |
| Write code | **Builder** | Reviewer, Debugger |
| Fix bug | **Debugger** | Researcher, Historian, Builder |
| Predict next steps | **Predictor** | Architect, Coordinator |
| Format for user | **Communicator** | Bridge (if needed) |
| Learn patterns | **Learner** | (all minds contribute) |
| Translate between types | **Bridge** | Communicator |
| Coordinate complex workflow | **Coordinator** | All minds as needed |

---

## 🔧 Best Practices

1. **Use appropriate mind for task** — Don't force Builder to plan
2. **Parallel when safe, sequential when needed** — Coordinate accordingly
3. **Respect memory access rules** — Only Architect/Coordinator/Learner write
4. **Trust each mind's specialty** — They exist for reason
5. **Document decisions** — Historian records why
6. **Verify before committing** — Reviewer and Debugger check
7. **Complete implementations only** — Builder writes no TODOs
8. **Match patterns exactly** — Builder camouflage into codebase
9. **Predict before needing** — Predictor prevents delays
10. **Communicate appropriately** — Communicator matches user

---

**Version:** Current (2026-02-15)
**Coordinator Status:** 🔨 Building (Gap 4)
**All Other Minds:** ✅ Active and Stable
