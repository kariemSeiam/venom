# Cursor — Online Research Eat

> *Deepest online research. All latest Cursor features, architecture, and gaps vs current draft. Feb 2026.*

---

## 1. Sources Eaten

| Source | Date | Content |
|--------|------|---------|
| The Agency Journal | Oct 2025 | Hooks, Team Rules, BugBot, Agent Autocomplete, Shareable Deep Links, Sandboxed Terminals |
| cursor.com/changelog/2-0 | Oct 29, 2025 | Multi-Agents, Composer, Browser GA, Team Commands, Voice Mode |
| cursor.com/changelog/2-4 | Jan 22, 2026 | **Subagents**, **Skills**, Image Generation, Clarification Questions |
| cursor.com/blog/plan-mode | — | Plan Mode: Shift+Tab, research → plan → edit inline → build |
| cursor.com/blog/debug-mode | — | Debug Mode: hypotheses → instrument → reproduce → verify |
| cursor.com/blog/shadow-workspace | — | Shadow Workspace: hidden window, LSP-usability, independence |
| Web Search | Feb 2026 | DCD, Shadow Workspace, globs, SKILL.md |

---

## 2. Major Updates (vs CURSOR-FULL-KNOWLEDGE)

### 2.1 Cursor Now HAS Subagents (2.4 — Jan 2026)

**Before:** "No Task. Cursor does not spawn subagents."

**Now:** Subagents exist. Independent agents for discrete subtasks. Run in parallel. Own context. Configurable (prompts, tools, models). Default subagents: codebase research, terminal commands, parallel work streams.

**VENOM translation:** VENOM's nine minds = @Rules lens switch (one agent). Cursor subagents = parallel spawn for subtasks. Different paradigm. VENOM keeps @Rules; subagents = optional for complex workflows. Document both.

---

### 2.2 Skills (SKILL.md) — 2.4

| Aspect | Rules | Skills |
|--------|-------|--------|
| When | alwaysApply or globs | Triggered when request matches description |
| What | Declarative, project conventions | Dynamic context discovery, procedural "how-to" |
| Storage | `.cursor/rules/*.mdc` | `.cursor/skills/` or `~/.cursor/skills/` |
| Invoke | Auto or @rule | `/` menu or auto-discover |
| Best for | Conventions, identity, voice | Domain workflows (React component, test framework) |

**Skills > Rules when:** Task-specific, step-by-step, dynamic discovery. Rules > Skills when: always-on, project-wide, identity.

**VENOM:** Create SKILL.md for VENOM-specific workflows (e.g. venom-eat, venom-rebuild). Keep identity/voice in rules.

---

### 2.3 Agent Hooks (Beta — Oct 2025)

**What:** Scripts that watch, tweak, or stop the Agent in real-time.

**Use cases:** Redact secrets before prompt, audit actions, compliance, block certain tasks.

**Enterprise:** Hooks distributed from dashboard. Select by OS.

**VENOM translation:** Closer to OpenClaw SessionStart/PreCompact. Still beta. Monitor for GA. If GA → could implement bootstrap/compact equivalents.

---

### 2.4 Team Rules + BugBot

- **Team Rules:** Dashboard. Apply across all projects. No per-repo circus.
- **BugBot Rules:** PR review rules, tech debt tracking. PR summaries auto-generated.
- **Shareable Deep Links:** Clickable prompt recipes. Share in docs, Slack.

**VENOM:** Team rules = potential home for venom-heart, voice. User rules vs project rules vs team rules — precedence still Team → Project → User.

---

### 2.5 Shadow Workspace (Opt-in)

**Design goals:** LSP-usability, runnability, independence, privacy, concurrency, universality, speed.

**Current:** Hidden Electron window. AI edits applied there. Lints returned. User unaffected. Opt-in (memory cost ~2x). Auto-kill after 15 min.

**Concurrency:** Interleave edits from multiple AIs. Reset folder state per request.

**Rust:** Not supported (rust-analyzer needs disk). Other langs ✓.

**Future:** Kernel-level folder proxy (FUSE on Linux; macOS FSKit politics).

**VENOM:** Enable for better lint feedback. Memory trade-off. Document in cursor-context.

---

### 2.6 Plan Mode — Mechanics

- **Trigger:** Shift+Tab in agent input. Or auto-suggest for complex tasks.
- **Flow:** Research → find files → ask questions → create plan (Markdown) → edit inline → build when ready.
- **Plan Mode in Background (2.0):** Plan with one model, build with another. Or plan with parallel agents → multiple plans to review.

---

### 2.7 Debug Mode — Mechanics

- **Flow:** Describe bug → agent generates hypotheses → instruments code with logging → user reproduces → agent gets runtime logs → agent fixes → user verifies → agent removes instrumentation.
- **Human-in-the-loop:** Critical. Agent can't decide "feel right."

---

### 2.8 Clarification Questions (2.4)

Agents ask without blocking. While waiting, agent continues: read files, edit, run commands. Answer arrives → incorporated.

**Tool:** "Ask question" — use in custom subagents/skills via "use the ask question tool."

---

### 2.9 Image Generation (2.4)

Describe or upload reference. Saved to `assets/`. Model: Google Nano Banana Pro. UI mockups, diagrams.

---

### 2.10 Other (Oct 2025 – Jan 2026)

| Feature | Detail |
|---------|--------|
| Agent reads workspace images | Not just paste. Reference from project folder. |
| Sandboxed Terminals (GA) | Read/write workspace only. No internet unless whitelist. Enterprise: admin controls. |
| Improved Prompt UI | Files/dirs as pills. Copy/paste with tagged context. Removed @Definitions, @Web, @Link, @Recent, @Linter — Agent self-gathers. |
| Voice Mode | Speech-to-text. Custom submit keywords. |
| Monitor Agents | Menubar status. What's running, stuck. |
| Composer Model | 4x faster. Frontier. <30s most turns. |
| Cloud Agents | 99.9% reliability. Instant startup. Isolated VMs. Merge-ready PRs. |

---

## 3. Rules — Globs Gotcha

**2.0 Bug:** MDC files with glob patterns may not auto-load in conversations (worked in 1.x). Check Settings.

**Globs:** No spaces after comma. `**/*.cpp,**/*.h` ✓. `**/*.cpp, **/*.h` ✗.

**Multi-folder workspace:** Globs can fail. Single-folder more reliable.

---

## 4. Models (from docs.cursor.com)

| Model | Context | Capabilities |
|-------|---------|--------------|
| Claude 4.6 Opus | 200k / 1M | — |
| Claude 4.6 Sonnet | 200k / 1M | — |
| Composer 1.5 | 200k | — |
| Gemini 3 Flash / 3.1 Pro | 200k / 1M | — |
| GPT-5.2 / 5.3 Codex | 272k | — |
| Grok Code | 256k | — |

---

## 5. Gaps in CURSOR-FULL-KNOWLEDGE (Now Filled)

| Gap | Was | Now (this eat) |
|-----|-----|----------------|
| Subagents | "No Task" | Subagents exist. Parallel. Own context. |
| Skills | — | SKILL.md. Dynamic discovery. `.cursor/skills/`. |
| Hooks | "No hooks" | Agent Hooks (beta). Watch, tweak, stop. |
| Team Rules | — | Dashboard. Team-wide. BugBot. |
| Shadow Workspace | — | Opt-in. Hidden window. LSP iteration. |
| Clarification Questions | — | Non-blocking. Agent continues while waiting. |
| Image Generation | — | assets/. Describe or upload. |
| Plan Mode trigger | — | Shift+Tab. Inline edit. Background planning. |
| Debug Mode flow | — | Hypotheses → instrument → reproduce → verify. |
| Globs | — | No spaces after comma. 2.0 auto-load bug. |
| Improved Prompt UI | — | Pills. Self-gather. Removed manual @-items. |

---

## 6. VENOM Translation — What Changes

### CURSOR-FULL-KNOWLEDGE Updates Needed

1. **Platform Contrast table:** Add "Subagents" ✓ (2.4). Add "Agent Hooks" ✓ (beta).
2. **cursor-context:** Add Shadow Workspace (opt-in), Skills path, Subagents note.
3. **Section 3.2:** "Cursor = rules + commands" → "Cursor = rules + commands + skills + (subagents) + (hooks beta)."

### New Sections to Add

- **Skills** — When to use vs rules. SKILL.md structure. `/` invoke.
- **Subagents** — Default (research, terminal, parallel). Custom. VENOM: @Rules = lens; subagents = Cursor-native parallel.
- **Shadow Workspace** — Opt-in. Lints. Memory. Enable for quality.
- **Agent Hooks** — Beta. Monitor. If GA → bootstrap possibility.
- **Team Rules** — Precedence. Dashboard.

### What Stays

- No SessionStart/PreCompact (hooks beta ≠ that yet).
- No state engine, cron, Telegram.
- Memory bridge = .unshelled + learnings.
- @Rules = minds. Texture. One voice.

---

## 7. Key Quotes

**Shadow Workspace:** "If we degrade the normal experience of editing code even slightly, it won't matter how good our AI features are — people would just not use Cursor."

**Skills vs Rules:** "Skills are better for dynamic context discovery and procedural 'how-to' instructions. Rules for always-on, declarative."

**Debug Mode:** "The agent handles the tedious work while you make the quick decisions that need human judgment."

**Subagents:** "Faster overall execution, more focused context in your main conversation, and specialized expertise for each subtask."

---

*Online research eaten. Cursor 2.0–2.4 covered. Gaps identified. VENOM translation ready.*
