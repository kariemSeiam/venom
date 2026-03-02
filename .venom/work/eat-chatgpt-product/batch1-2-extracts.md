# Merged extracts — ChatGPT product at chatgpt.com (on itself)

## Researcher
Surface: chatgpt.com = chat history, one prompt line, Voice. Entry: one UI spine; Settings gate memory, voice, data, Custom Instructions. Concepts: saved memories + chat history; Temporary Chat; Custom Instructions; voice nine + Shimmer; usage policies. Gaps: no limits matrix; no full UI map; retention/export underspecified. Anatomy: one entry (chat + Voice), behavior split across memory, Temporary Chat, Custom Instructions, voice limits, data controls — no single doc ties surface→feature→limit→policy.

## Architect
User state: account/tier; persistent prefs (Custom Instructions, Data Controls, memory on/off); per-session (current chat, Temporary flag); per-entity (GPT memory). Data flow: input → modality pipeline → model context = conversation + history + memories + CI + GPT + policy → output; voice transcript appended to text. Modes: text default; voice one concurrent; Separate Mode (blue orb); Temporary Chat. Gaps: conversation ID model; order of memory vs CI vs GPT prompt; persistence for chat history; sync web/mobile; Separate Mode vs main chat; abuse guardrails; GPT memory lifecycle; rate limits.

## Reviewer
Risks: usage policies (no intel, no bypass, no unlicensed advice, etc.); privacy/minors/high-stakes automation; voice limits by tier; retention 30 days; training opt-in/out by tier. What product doesn't spell out: numeric free voice cap; abuse definition; appeal process/SLA; policy changelog; memory evolution; memory cap; high-stakes definition. Anatomy: policy-bounded surface; boundaries = usage policies + voice/memory limits + training/retention; gaps in numbers, process, definitions.

## Historian
This run = first product-only eat from chatgpt.com. Prior: combined API+product in openai-chatgpt-eat; chatgpt-product-complete.md from that. This run fills "ChatGPT on itself" as distinct eat. Baseline to validate and extend.

## Predictor
Product explicitly mutable: policies update, limits may change, Custom Instructions beta, rollouts phased. No stability guarantee; only controls (memory off, Data Controls) and appeal. Brittle: CI and limit language. Anatomy: treat as changeable; rely on controls and current docs, not unchanging limits.

## Builder
User-building flows: start chat (chatgpt.com → prompt + Voice); start voice (icon → pick voice → speak; subscribers video/screenshare); memory remember/forget (conversation or Settings → Manage Memory); Custom Instructions (Settings → Beta); Temporary Chat (affordance); Settings (Data Controls, Personalization, Voice, Speech). Product enables continuity (memory + CI), ephemeral (Temporary), multimodal voice/video, per-GPT memory. Anatomy: product = control surface for "how I want this assistant to behave and remember"; memory ≠ history; Settings hold the real off switches.

## Debugger
Voice: transcript mismatch; one session; limit ordering/force-close unspecified; language detection; unsupported features in voice (failure mode not described). Memory: evolution not auditable; chat delete ≠ memory delete (two surfaces); per-GPT duplication. Custom Instructions: beta overlook or mis-apply; refuse/withhold no defined feedback. Policies: withhold criteria unspecified; policy changes unversioned. Cross-cutting: no shared spec for "what user sees when refused/limited/fails."

## Learner
Correction: scope was mixed (API+product); framing was Cursor/template. Now: product-only = chatgpt.com; "on itself" = describe the product, then optionally reuse for templates. Constraints: memory two kinds + off + Temporary; voice tier limits + one session + no tools in voice; CI every time + moderation; usage policies Oct 2025. Convention: "ChatGPT the product" ⇒ chatgpt.com; product eat is single source for what the product is.
