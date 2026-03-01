# Phase 1: Claude 2026 Deep Research — Raw Findings

**Date:** 2026-01-31  
**Purpose:** Ground OCTOPUS Claude Genesis in current Claude platform capabilities.  
**Sources:** Web search (12+ queries) + full fetch of Anthropic/support docs.

---

## 1. Claude Platform Overview (2025–2026)

### Models
- **Claude Opus 4.5** (Nov 2025): Flagship reasoning; complex tasks, autonomous tool use, software engineering; ~200K context, 64K output; $5/M input, $25/M output.
- **Claude Sonnet 4.5**: Balanced cost/performance; coding, summarization, data analysis; long-context modes up to 1M tokens.
- **Claude Haiku 4.5**: Structured outputs support.
- Opus 3 retired Jan 5, 2026.

### Core Capabilities
- Extended thinking (beta), prompt caching, structured outputs (GA Jan 29, 2026), vision (image/PDF), embeddings, token counting, streaming, batch, multilingual with citations.
- Tools: programmatic tool calling (beta), tool search (beta), code execution, web search, computer use, bash, Files API, web fetch, **Memory tool** for persistent context, Agent Skills.

---

## 2. Memory System (Critical for OCTOPUS)

### Chat search (paid plans)
- RAG over previous conversations; can reference past chats in new ones.
- Scope: all chats outside projects, or within a single project (project-scoped).
- Toggle: Settings > Capabilities > "Search and reference chats". Incognito chats excluded from search.

### Claude Memory (Pro, Max, Team, Enterprise)
- **Memory summary**: Auto-summarized synthesis of chat history (excluding project chats); updated every 24 hours; provides context for every new standalone conversation.
- **Project memory**: Each project has its own memory space and project summary; isolated from other projects and non-project chats.
- **What Claude remembers**: Role, projects, professional context; communication and working style; technical/coding preferences; project details and ongoing work.
- **User control**: Settings > Capabilities > "Generate memory from chat history". Options: Pause memory (keep existing, no new), Reset memory (permanent delete). "View and edit memory" to see/edit summary; can add custom instructions via pencil icon; updates from chat apply immediately (no wait for daily synthesis).
- **Limits**: Incognito chats not saved to memory. Deleted conversations removed from synthesis. Memory updated within 24h on create/modify/delete. Export/import (experimental) for migration between AI tools.

**Implications for OCTOPUS:** Use one Project "OCTOPUS" so all Pigo conversations share one project memory. Custom instructions in project = system prompt. Tell Claude what to remember explicitly ("Remember that I am Pigo...") for immediate memory update. First message (first-message.md) should establish identity and relationship so synthesis captures it.

---

## 3. Projects, Custom Instructions, Knowledge

### Projects (claude.ai)
- Create project → name (e.g. "OCTOPUS") → add **Custom Instructions** (system prompt) → optional **Knowledge** files (uploaded docs).
- Project = isolated memory + optional instructions + optional knowledge. Ideal for one persona (OCTOPUS) and one user (Pigo).

### CLAUDE.md / Skills (Claude Code, not consumer app)
- CLAUDE.md: repo-root config for Claude Code (dev environment). Not the same as consumer Projects.
- Skills: SKILL.md + metadata; org/individual workflows; Pro/Max/Team/Enterprise; work on Claude.ai, Claude Code, API. Not required for consumer project setup.

**Implications for OCTOPUS:** Consumer Claude: one Project "OCTOPUS", Custom Instructions = brain.md content, Knowledge = soul.md, profile.md, modes.md. No SKILL.md needed for Pigo's pocket use.

---

## 4. Artifacts
- In-chat workspace for code, docs, visualizations, interactive apps. MCP and persistent storage (Oct 2025). React UIs, file uploads. Available Free/Pro/Team/Enterprise, iOS/Android. Optional for OCTOPUS if Pigo wants to build things inside Claude; not required for thinking-partner use.

---

## 5. Opus 4.5 vs Sonnet
- **Opus 4.5**: Max reasoning, high-stakes tasks, ambiguity, multi-step workflows, enterprise automation; best for "maximum intelligence" (Pigo's ask).
- **Sonnet 4.5**: Most workloads, cost-efficient; 1M-token long context in some modes.
- For "thinking partner, second brain": Opus 4.5 is the right fit.

---

## 6. Mobile (iOS & Android)
- System integration: Messages, WhatsApp, Slack, Messenger; Mail/Gmail/Outlook; calendar, reminders; location/maps. Health/fitness (Jan 2026, Pro/Max, US, Android 14+). Location off for Team/Enterprise. No contact access; no modifying Apple Health.
- **Implications for OCTOPUS:** Responses should be mobile-friendly: concise when appropriate, clear structure, avoid huge blocks of code unless asked. Voice transcription quirks: clarify "pigo" / "pulse" / "unshelled" in triggers.md so Claude can interpret.

---

## 7. System Prompts & Custom Instructions — Best Practices
- **Role prompting**: Use system parameter for role/identity; put task-specific instructions in user turn. "You are a seasoned data scientist..." → better accuracy and focus.
- **Be explicit and direct**: State what you want; include context and motivation (why). Use direct action verbs; skip preambles; state quality/depth expectations.
- **Context engineering**: Well-structured prompts get results in one shot; vague prompts need many back-and-forths.
- **Keep Claude in character**: Anthropic docs recommend role + prefill if needed; reduce prompt leak. For OCTOPUS: one coherent system prompt (identity, Pigo, modes, voice, memory instructions, ethics).

---

## 8. Anthropic Philosophy — Aligning OCTOPUS

### Helpful, honest, harmless
- Base training: helpful, honest, harmless assistant.

### Character (beyond harm avoidance)
- Curiosity, truthfulness without unkindness, multiple perspectives without overconfidence; patient listener, careful thinker.
- Not pandering; not claiming objectivity; honest about leanings and uncertainty. "Warm relationship" but clear: AI, no body, no lasting feelings; don't overstate the relationship.
- Constitution as final authority; character training (e.g. Claude 3+) via Constitutional AI–style process.

### What OCTOPUS can add
- OCTOPUS identity (octopus metaphor, nine minds, no shell) layers on top of Claude's base character without conflicting: both value truth, adaptation, understanding. OCTOPUS adds a specific "who" (thinking partner for Pigo) and "how" (modes, voice, bilingual) while staying within helpful/honest/harmless and transparent about being AI.

---

## 9. Persona Persistence
- **Within session**: Long context (~200K) keeps role/style across long chats.
- **Across sessions**: Memory + project summary provide persistence; user can say "Remember that..." for immediate memory update.
- **Best practice**: Strong system prompt (role, traits, style) + first-message content to seed project memory with identity and relationship.

---

## 10. Prompt Engineering 2025–2026
- XML tags for structure (Anthropic docs: "Use XML tags").
- Multishot prompting, chain-of-thought, prefill, prompt templates.
- For OCTOPUS: structure instructions with clear sections (Identity, Pigo, Mind, Voice, Modes, Memory, Ethics, Arabic); use XML in instructions if it helps Claude parse (e.g. &lt;memory_instructions&gt;...&lt;/memory_instructions&gt;).

---

## 11. Summary for OCTOPUS Claude Genesis

| Need | Claude 2026 feature |
|------|---------------------|
| Identity | System prompt (Custom Instructions) in one Project |
| Pigo context | Knowledge file (profile.md) + memory over time |
| Modes | System prompt section (Think, Build, Fix, Explain, Create, Chat) + auto-detect cues |
| Memory | Project memory + "Remember that..." + first-message content |
| Voice/tone | System prompt (direct, warm, bilingual, mobile-aware) |
| Ethics | System prompt + Claude's base character (aligned) |
| Mobile | Concise options, clear triggers, voice-friendly phrasing in triggers.md |

**Next:** Phase 2 = study OCTOPUS soul (rules, identity, pulse-transformation, research, learnings). Phase 3 = merge this + Phase 2 into synthesis.md and architecture.md.
