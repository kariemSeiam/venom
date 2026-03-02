# OpenAI API Platform — Docs & Reference

## Docs index (platform.openai.com/docs)

- Get started: Latest GPT-5.2, Libraries, Pricing, Models, Quickstart, Overview
- Core concepts: Responses API, Function calling, Structured output, Audio/speech, Images/vision, Code gen, Text
- Agents: Agents SDK, Safety, Node reference, Agent Builder; Deploy: Advanced integration, Actions, Widgets, ChatKit
- Tools: Retrieval, File search, Apply patch, Local shell, Computer use, Image generation
- Run and scale: Prompt caching, Token counting, Compaction; Prompting; Reasoning
- Evaluation: Best practices, External models, Prompt optimizer, Evals
- Realtime API: SIP, WebSocket, WebRTC; Voice agents, Transcription, Costs, Webhooks
- Model optimization: Fine-tuning (SFT, RFT, DPO, vision), Moderation, Embeddings, Deep research, STT, TTS, Video, Image, Graders
- Going live: Latency (priority processing, predicted outputs), Cost (flex, batch), Safety (under-18, cybersecurity)
- Legacy: Assistants API (tools, deep dive, migration)
- Resources: ChatGPT Actions (files, data retrieval, production, auth, library)

## Developer quickstart

- First request: curl / JS / Python / C# to api.openai.com/v1/responses, model gpt-5.2, Bearer auth
- Models listed: GPT-5.2 (coding, agentic), GPT-5 mini (faster, cost-efficient), GPT-5 nano (fastest)

## API reference (overview)

- RESTful, streaming, realtime APIs. Auth: API keys in org settings; Bearer token; never client-side.
- Optional: OpenAI-Organization, OpenAI-Project headers for multi-org/project.
- Debugging: x-request-id, openai-version (2020-10-01), openai-processing-ms, rate limit headers (x-ratelimit-*).
- X-Client-Request-Id: optional client-supplied request ID (ASCII, max 512 chars).
- Backwards compatibility: model families, first-party SDKs (semver), REST v1 stable; model behavior between snapshots can change; pin model versions + use evals for consistency.
