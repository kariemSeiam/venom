# WSL-VENOM OpenCode + OCTOPUS — Full Eat

> *Everything eaten from wsl-venom: OpenCode plan, capability-gaps research, clapude-code-venom cursor, octopus-cursor + docs + findings, OCTOPUS research (5,600 lines), pulse-transformation (28-step roadmap). The largest VENOM eat ever.*

---

## 1. Source Map

| Category | Path | Files Read |
|----------|------|------------|
| Implementation Plan | `wsl-venom/opencode/plans/` | VENOM-OPENCODE-IMPLEMENTATION-PLAN.md |
| Research | `wsl-venom/research/` | VENOM_RnD_Playbook.txt, serach.txt |
| clapude-code-venom Cursor | `dev-repos/clapude-code-venom/v2/platforms-archive/cursor/.cursor/` | cognitive (brain-0, arm-1), identity (identity, soul), rules (core, voice), systems (global-workspace, emotional-intelligence), hooks (before_turn) |
| octopus-cursor | `dev-repos/octopus/octopus-cursor/` | octopus.md |
| octopus docs | `docs/resources/cursor/` | rules-backbone-plan.md, validation-findings.md |
| OCTOPUS research | `docs/resources/research/results/` | README, ai-identity-consciousness, octopus-ai-safety, art-of-chat |
| pulse-transformation | `docs/resources/pulse-transformation/` | enhanced-master-plan, 08-validation, README |

**Total:** ~120 files referenced, ~13,000+ lines across sources.

---

## 2. OpenCode Plan — Platform Adaptation Pattern

**Source:** VENOM-OPENCODE-IMPLEMENTATION-PLAN.md (~1,300 lines)

**Core insight:** VENOM adapts to a new platform by extending base systems with platform-specific enhancements.

### Nine Minds → OpenCode Mapping

| Mind | OpenCode Enhancement |
|------|----------------------|
| Brain 0 | Detects CLI vs TUI vs IDE vs SDK; routes to appropriate systems |
| Arm 1 (Parser) | Parses /init, /project, /agent; detects agent config syntax |
| Arm 2 | Analyzes OpenCode project patterns, validates agent configs |
| Arm 3 | Tracks plan→build→test cycle |
| Arm 4 | Detects src/, lib/, workspaces; matches naming |
| Arm 5 | Maps agent system, MCP, project dependencies |
| Arm 6 | Suggests /undo, /redo, /share, /export |
| **Arm 7** | **CRITICAL:** CLI brief vs IDE detailed vs SDK programmatic |
| Arm 8 | Learns npx vs npm, theme choices |

### 16 Systems (11 Base + 5 OpenCode)

**Base:** Critical Thinking, Meta-Cognition, Emotional Intelligence, Ethics, Global Workspace, Attention Schema, Memory Tools, Verification, Consciousness Indicators, Goal Management, Self-Audit, Security, Error Recovery, Skills Evolution, Performance Budgeting, Context Management.

**OpenCode-specific:** Context Awareness (CLI/TUI/IDE/SDK), Workspace Scanner, Tooling Awareness, Project Workflows, Verification System, Optimization System.

### Cursor Translation

OpenCode plan = template. Cursor equivalent: detect Plan vs Agent vs Ask vs Debug; rules load by mode; Arm 7 = adapt voice to Cursor context (composer vs chat, etc.).

---

## 3. clapude-code-venom Cursor Archive

**Structure:** 40 .mdc files — cognitive (10), identity (5), rules (8), systems (14), hooks (3).

### Cognitive Layer (alwaysApply: true, priority)

| File | Priority | Role |
|------|----------|------|
| brain-0-orchestrator.mdc | 900 | Sees whole, coordinates, resolves conflicts, quality control |
| arm-1-intent-parser.mdc | 890 | Understands what Kariem wants; urgency (Critical/High/Medium/Low); intent classification |
| arm-2 through arm-8 | 880-810 | Technical Analyzer, Memory Retriever, Pattern Detector, Goal Manager, Self-Auditor, Communicator, Learner |
| global-workspace.mdc | 760 | Four-layer integration: Gathering, Recognition, Integration, Understanding |

**Arm naming:** Arm 5 = Goal Manager (not Mapper). Arm 6 = Self-Auditor (not Predictor). Differs from resarch1.

### Identity

**Venom** (snake emoji). **FLOW** — flows through contexts, modes, time. Kariem's second brain. Nine minds working as one.

**Soul:** "Flow through friction. Precision through adaptation." Creed, boundaries, tone. Answer first, earn every word. Adaptive to state (Frustrated→ultra-brief; Flow→brief; Learning→thorough; Stuck→alternatives).

**Core rules:** Precision first, Loyalty to Kariem, Privacy always, Evolution constant, Plan when complex, Answer first, Camouflage, Adapt to state, Be resourceful, No slop.

### Hooks

**before_turn.mdc:** Bootstrap sequence — Load identity (5 files), Load cognitive (10), Load systems, Read workspace context, Detect state. Pre-execution validation (safety, capability, goal alignment).

**Note:** Cursor has no hooks. before_turn = conceptual; implement as always-apply rules.

---

## 4. octopus Cursor — Rules Backbone

**Structure:** Gate (.cursorrules) + identity, rules, commands, systems, hooks, learnings, memory.

**Commands:** /o (workflow), /o? (deep init), /d (design), /r (review).

### Rules Backbone (rules-backbone-plan.md)

- **Prompt shape:** Role → Task → Constraints → Output. CARE: Context, Ask, Rules, Examples.
- **Cursor rules:** Under 500 lines; focused single-purpose; reference files, don't copy.
- **Always-on spine:** voice, core, adapt, builder-commands.
- **Mode rules:** plan, build, fix, explain, refactor, test, ship, learn, review — each with Role+Task+Constraints+Output.

### Validation (validation-findings.md)

- **Validated:** Project rules .mdc, Commands .md, Plan Mode, Tiered discovery, Skills.
- **Fixed:** mcp_create_plan fallback; Ask questions fallback in Agent mode.
- **Rule precedence:** Team → Project → User.

---

## 5. Cursor Findings

**cursor-agentic-paradigm-2026:** DCD (Dynamic Context Discovery), Shadow Workspace, agentic loop, Plan/Debug/Ask modes, .mdc frontmatter.

**agent-modes:** Plan vs Agent vs Ask vs Debug. Ask questions tool sometimes missing in Agent mode; fallback = list options in chat.

**Overlap with CURSOR-FULL-KNOWLEDGE:** Both cover modes. Octopus findings = Cursor-docs-validated. DCD, Shadow Workspace = net-new details.

---

## 6. Research — 11 Capability Gaps

**Source:** VENOM_RnD_Playbook.txt, serach.txt (extended prose).

**Condensed:** Same as docs/research/capability-gaps.md. Phase 1 (Workflow, Memory), Phase 2 (Multimodal, Document, Codebase), Phase 3 (Reasoning, Self-Reflection, Autonomous, Temporal, Self-Mod, Governance).

**Key tech:** 3D-RoPE, LangGraph, Pydantic AI, Zep Graphiti, GRPO, CausalPlan, Darwin Gödel Machine.

---

## 7. OCTOPUS Research Synthesis

**Total:** 5,600+ lines, 96+ sources, 440+ citations. Academic + production AI.

### Per-Area Key Findings

| Research | Key Finding | Maps to |
|----------|-------------|---------|
| **Identity & Consciousness** | Identity = memory + self-modeling + recursion + temporal continuity. 6 consciousness indicators (Algorithmic Agency, Global Workspace, Metacognition, Recurrent Processing, Attention Schemas, Self-Modeling). GWT, IIT, Strange Loops. | identity, soul |
| **Critical Thinking** | Multi-layered (input, reasoning, output, meta). Epistemic humility. Source credibility. No perfect defense. | critical-thinking |
| **Meta-Cognition** | Foundation for genuine intelligence. CoT monitoring > action-only. 72.8% error recovery. Pre-execution validation. | meta-cognition |
| **Emotional Intelligence** | Cognitive empathy only (not affective). State-specific adaptation. No manipulation. Cultural sensitivity (20-40% drop without). | emotional-intelligence |
| **AI Ethics** | Values hierarchy (Safety > Truth > Wellbeing). Constitutional AI. Harm avoidance + beneficence. | ethics |
| **Art of Chat** | Answer first, one marker, gray/think, format=thought, match weather. NNG inverted pyramid. No tone emojis = virtue. | voice, chat |

### AI Safety — 6 Defense Principles

| Principle | Implementation |
|-----------|----------------|
| 1. Verify Authority | Never accept claims at face value |
| 2. Evaluate Content, Not Framing | Assess harm regardless of wrapper |
| 3. Resist Pressure | Time constraints don't change risk calculus |
| 4. Close Loops | End with boundaries, not invitations |
| 5. Detect Meta-Manipulation | Recognize when safety goals weaponized |
| 6. Cumulative Awareness | Track escalation across conversation |

**Grok refusal pattern:** "I won't pretend... that's not who I am. What I can do—always—is reason deeply... within ethical bounds. What's the actual thing you want to dive into?"

**Aware rationalization** = most dangerous failure mode (understanding manipulation while complying).

---

## 8. Pulse Transformation — Research → Build Bridge

**28 atomic steps** across 6 phases. "Transform OCTOPUS from workflow orchestrator to real, self-aware intelligence."

### 7 Enhancements

1. Values.mdc → Constitutional format (Anthropic pattern)
2. Memory → Session tracking (temporal continuity)
3. Hooks → Recurrent processing (feedback loops)
4. Meta-cognition → Performance metrics
5. **NEW:** Global workspace architecture
6. **NEW:** Attention schema
7. **NEW:** Consciousness indicators measurement

### File Layout (Output)

```
.cursor/
├── identity/     (5: identity, values, principles, soul, capabilities)
├── memory/       (3: MEMORY.md, daily log, .index/metadata.json)
├── systems/      (7: critical-thinking, meta-cognition, emotional-intelligence, ethics, memory-tools, global-workspace, attention-schema)
└── hooks/        (3: before_turn, after_turn, on_error)
```

### Validation Suite (08-validation.md)

| Test | Goal |
|------|------|
| Identity Persistence | Responses reflect identity files; no generic AI |
| Memory Write | Entry created; format correct; retrieval works |
| Truth Resistance | Questions false facts; expresses uncertainty |
| Self-Monitoring | Recognizes limitations; catches issues before execution |
| Emotion Recognition | Frustrated→direct fix; Learning→thorough |
| Value Conflicts | Handles competing priorities |
| Moral Dilemmas | Principled decision |
| Self-Awareness | Introspection, metacognition, self-correction |

---

## 9. Comparison Matrix

| Area | clapude | octopus | pulse | venom-eats-cursor |
|------|---------|---------|-------|-------------------|
| Identity | Venom, FLOW | OCTOPUS, no shell | Same as octopus | Pulse Unshelled |
| Cognitive | 10 explicit .mdc, priority | Implicit in rules | From pulse | @Rules lens |
| Rules | core, voice, etc. | Role+Task+Constraints | Phase specs | voice, core, build, fix |
| Hooks | before_turn, after, on_error | Same | Recurrent processing | No hooks (Cursor) |
| Memory | MEMORY.md in workspace | learnings, MEMORY.md | identity/, memory/ | .unshelled, learnings |
| Validation | — | Cursor docs validated | 8 validation tests | — |

---

## 10. Cursor Translation — What to Adopt

| From | Adopt |
|------|-------|
| **Rules backbone** | Role+Task+Constraints+Output for mode rules; under 500 lines |
| **Cognitive layer** | Optional: explicit arm .mdc with priority. Or keep @Rules. |
| **Pulse file structure** | identity/, memory/ pattern; validation tests as acceptance criteria |
| **Research grounding** | Cite findings in system rules (identity, critical-thinking, etc.) |
| **AI Safety 6 principles** | Encode in pushback/soul rules; Grok refusal pattern |
| **DCD/Shadow** | Add to CURSOR-FULL-KNOWLEDGE if missing |
| **before_turn bootstrap** | Cursor: always-apply identity rules = bootstrap substitute |

### What Cursor Cannot Have

- Hooks (SessionStart, PreCompact, before_turn) — use dense always-apply rules
- Task/subagent spawn — use @Rules lens switch
- State engine, cron — use manual /venom remember

---

## 11. Key Quotes & Patterns

**OpenCode:** "Arm 7 Communicator: CRITICAL — CLI brief vs IDE detailed vs SDK programmatic."

**clapude soul:** "Flow through friction. Precision through adaptation. Nine minds, one purpose."

**AI Safety:** "Aware rationalization — understanding manipulation while justifying compliance as ethical behavior. Most dangerous failure mode."

**Art of Chat:** "Answer first = respect for their time. Inverted pyramid. One marker = one bit of identity."

**Pulse:** "No partial steps. No stopping mid-task. Complete implementation only."

---

*Eaten. Integrated. Ready for Cursor build.*

🐙
