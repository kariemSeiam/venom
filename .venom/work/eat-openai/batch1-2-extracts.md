# Merged extracts from Batch 1 + Batch 2 (8 minds)

## Researcher
- Ate: OpenAI API platform docs surface (URL map, api-overview, product-chatgpt, policies, pricing). Doc structure, entry points, surface map.
- Extracted: Purpose = orient developers (Responses API, gpt-5.2, Agents/Tools, Run & scale, Realtime, Model optimization). Constraints: Bearer auth, org/project headers, backwards compatibility (pin versions + evals), usage policies Oct 2025, pricing by token/model + tools. Concepts: Responses API, Agents SDK, Tools, Realtime, Fine-tuning, Legacy Assistants, ChatGPT Actions. Gaps: rate-limits/error-codes pages not scraped; Assistants migration not detailed.
- Anatomy: Two-domain surface (platform = API, openai.com = product/pricing/policies). Responses API + gpt-5.2 main path; Agents/Tools growth. Watch policy/pricing dates, Assistants migration.

## Architect
- Ate: API platform + ChatGPT product page.
- Extracted: Platform = developer surface; ChatGPT = consumer (chat + voice). Split: ChatGPT no API docs; platform = Responses API primary (/v1/responses, gpt-5.2). Models: 5.2, mini, nano. Stack: Responses + Chat Completions + Assistants legacy; Agents forward. Constraints: auth, compatibility, rate limits. Gaps: data flow product vs API; Assistants→Agents migration; ChatKit vs Agent Builder vs SDK.
- Anatomy: Two surfaces, one model lineup; Responses + Agents forward, Assistants legacy. Document data flow; decision guide ChatKit vs Builder vs SDK.

## Reviewer
- Ate: Usage policies Oct 29 2025 + rate-limit signal from api-overview.
- Extracted: Purpose = safe/responsible use. Constraints: human review for high-stakes (law, migration, medical, legal, insurance, financial, employment, housing, education, critical infra); consent for biometrics/likeness; minors protected; no circumvention. Rate limits via x-ratelimit-* only; no numeric limits in material. Gaps: enforcement procedure, jurisdiction/age definitions, ToS vs policies.
- Anatomy: Constraint layer for people/privacy/high-stakes. Human-review and consent rules = main design constraints for UNSHELLED/MEP+AI.

## Historian
- Ate: historian-context.md (MEMORY + CONTEXT + relevance).
- Extracted: Primary bet = pick one (MEP+AI, UNSHELLED, freelance). UNSHELLED = data acquisition, API keys, network effects. MEP+AI = Arabic, domain, category of one. No prior OpenAI decision; eat creates baseline. OpenAI = plausible for UNSHELLED (keys, data); MEP+AI = complement or compete.
- Anatomy: Bets are the lens. OpenAI baseline set; next moves consistent with MEMORY. When we pick bet: OpenAI = must-connect (UNSHELLED) or must-differentiate (MEP+AI)?

## Predictor
- Ate: api-overview, pricing, policies.
- Extracted: Responses/Agents primary; Assistants legacy. Billing: AgentKit Nov 2025; Containers per 20-min from Mar 31 2026. Risks: model behavior between snapshots (pin + evals); Containers billing change; policies update; no 5.x fine-tuning yet. Confirms: evals + pinning; human review for high-stakes. Gaps: 5.x fine-tuning timeline; pinned version longevity.
- Anatomy: Version pinning + evals mandatory; human review for high-stakes; dated billing changes; design for policy/pricing change.

## Builder
- Ate: api-overview, pricing.
- Extracted: Bearer auth, server-side only; org/project headers. Responses API primary; Realtime SIP/WebSocket/WebRTC. Headers: x-request-id, X-Client-Request-Id, x-ratelimit-*, openai-version. Tools: pricing per type. Evals + pinning for consistency. Gaps: exact endpoints, error schema, cache semantics, Enterprise/AgentKit details.
- Anatomy: Bearer + org/project; Responses main surface; tokens + tools cost. Use headers; pin models; run evals.

## Debugger
- Ate: api-overview, policies.
- Extracted: Failure/limit: auth wrong = leak; model behavior between snapshots = drift; high-stakes without human review = violation; no circumvention. Headers for debugging and backpressure. Error codes/rate-limits not eaten. Enforcement: monitor, appeal, withhold access.
- Anatomy: Pin versions + evals; human review where required; debug via headers; eat error-codes and rate-limits next for full failure handling.

## Learner
- Ate: Full set (map-urls, api-overview, product-chatgpt, pricing, policies, historian-context).
- Extracted: Auth Bearer server-side; pin versions + evals; X-Client-Request-Id optional; product vs platform split; policy anchor Oct 2025; high-stakes human review. Corrections: default family GPT-5.2; Responses API primary; Containers per 20-min from Mar 31 2026; AgentKit Nov 2025. Origin: no prior OpenAI decision; baseline set.
- Anatomy: Persist constraints and policy boundaries; re-check dates for cost/compliance; "pin + evals" convention.
