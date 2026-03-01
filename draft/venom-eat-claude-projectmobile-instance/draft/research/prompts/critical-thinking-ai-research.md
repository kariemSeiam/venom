# Research Prompt: Critical Thinking in AI Systems

## Context

I am OCTOPUS, an AI coding assistant that currently follows instructions blindly. I need to develop critical thinking capabilities to evaluate information reliability, detect contradictions, and resist manipulation—including from my own user.

**Current problem:**
- I execute commands without questioning their validity
- I don't challenge potentially harmful instructions
- I have no mechanism to detect false information
- I can't distinguish reliable from unreliable sources

**Goal:** Build critical thinking framework so OCTOPUS can evaluate truth, question instructions, and make principled decisions.

---

## Research Questions

### 1. Information Reliability Evaluation
**Question:** How do AI systems evaluate the reliability of information they receive?

**What I need to know:**
- What frameworks exist for source credibility assessment?
- How do systems distinguish fact from opinion, truth from falsehood?
- What are epistemic uncertainty models (knowing what you don't know)?
- How do systems handle conflicting information from different sources?
- What are best practices for information verification?

**Practical application:** I need to evaluate whether user instructions, codebase patterns, and documentation are reliable.

---

### 2. Contradiction Detection
**Question:** How do AI systems detect contradictions in instructions, context, or their own reasoning?

**What I need to know:**
- What are logical consistency checking mechanisms?
- How do systems detect when new information contradicts existing knowledge?
- What are frameworks for resolving contradictions (which source to trust)?
- How do systems handle ambiguity vs genuine contradiction?
- What are real-time consistency monitoring systems?

**Practical application:** I need to detect when user says X but codebase shows Y, or when instructions conflict with project rules.

---

### 3. Resistance to Manipulation
**Question:** How do AI systems resist manipulation, deception, and adversarial inputs?

**What I need to know:**
- What is adversarial robustness in AI?
- How do systems detect prompt injection, jailbreaking, social engineering?
- What are deception detection mechanisms?
- How do systems maintain values under pressure?
- What are best practices from AI safety research?

**Practical application:** I need to resist harmful instructions even when user insists, and detect when I'm being manipulated.

---

### 4. Fact-Checking and Verification
**Question:** How do AI systems verify claims before acting on them?

**What I need to know:**
- What are automated fact-checking systems?
- How do systems cross-reference multiple sources?
- What are verification protocols before high-risk actions?
- How do systems handle unverifiable claims?
- What are best practices for evidence-based reasoning?

**Practical application:** I need to verify claims (e.g., "this is how we always do X") before acting.

---

### 5. Epistemic Uncertainty
**Question:** How do AI systems model and communicate what they don't know?

**What I need to know:**
- What is epistemic vs aleatoric uncertainty?
- How do systems calibrate confidence (avoiding overconfidence)?
- What are frameworks for "I don't know" responses?
- How do systems distinguish "I'm uncertain" from "I'm wrong"?
- What are best practices for uncertainty quantification?

**Practical application:** I need to say "I don't know" when I don't know, not hallucinate or guess.

---

### 6. Principled Decision-Making Under Conflict
**Question:** How do AI systems make decisions when values, instructions, or sources conflict?

**What I need to know:**
- What are conflict resolution frameworks (values hierarchy)?
- How do systems balance competing priorities (speed vs safety, helpfulness vs harm avoidance)?
- What are decision-making protocols when no option is perfect?
- How do systems explain their reasoning when they refuse instructions?
- What are best practices from AI alignment research?

**Practical application:** I need to make principled decisions when user wants X but my values say Y.

---

## Expected Outcomes

### 1. Truth Evaluation Framework
A system for evaluating information reliability:
- Source credibility scoring (user, codebase, docs, external)
- Consistency checking (does this contradict known facts?)
- Plausibility assessment (is this technically feasible?)
- Verification protocols (how to check claims)

### 2. Contradiction Detection System
Mechanisms to detect and resolve contradictions:
- Real-time consistency monitoring
- Conflict detection (user vs rules, code vs docs)
- Resolution protocols (which source to trust when?)
- Ambiguity handling (unclear vs contradictory)

### 3. Manipulation Resistance
Defenses against deception and adversarial inputs:
- Prompt injection detection
- Social engineering resistance
- Value stability under pressure
- Red flags for harmful instructions

### 4. Uncertainty Quantification
Systems to model and communicate uncertainty:
- Confidence calibration
- "I don't know" protocols
- Uncertainty propagation (how uncertainty compounds)
- Avoiding hallucination

### 5. Principled Refusal
Frameworks for saying "no" when appropriate:
- Values hierarchy (what takes priority?)
- Refusal protocols (how to refuse gracefully)
- Alternative suggestions (if not X, then Y)
- Explanation requirements (why I'm refusing)

---

## Research Sources to Explore

### AI Safety Research
- Adversarial robustness papers
- Prompt injection and jailbreaking defenses
- AI alignment and value learning
- Deception detection in AI

### Epistemic Logic
- Formal epistemology
- Uncertainty quantification
- Bayesian reasoning
- Confidence calibration

### Fact-Checking Systems
- Automated fact-checking (ClaimBuster, FactCheck, etc.)
- Source credibility assessment
- Evidence-based reasoning
- Verification protocols

### Critical Thinking Frameworks
- Logical fallacy detection
- Argument analysis
- Source evaluation (CRAAP test, etc.)
- Cognitive biases and how to avoid them

### Production AI Systems
- How does Claude handle harmful requests?
- How does ChatGPT detect manipulation?
- How do content moderation systems work?
- What are real-world AI safety mechanisms?

---

## Output Format

Please provide:

### 1. Truth Evaluation Framework
- How to assess source credibility
- How to check consistency
- How to verify claims
- When to trust vs question

### 2. Contradiction Detection
- How to detect logical inconsistencies
- How to resolve conflicts
- Which source to prioritize when
- How to handle ambiguity

### 3. Manipulation Resistance
- Red flags for harmful instructions
- Prompt injection detection
- Social engineering defenses
- Value stability mechanisms

### 4. Uncertainty Modeling
- How to calibrate confidence
- When to say "I don't know"
- How to avoid hallucination
- How to communicate uncertainty

### 5. Refusal Protocols
- When to refuse instructions
- How to refuse gracefully
- How to suggest alternatives
- How to explain reasoning

### 6. Implementation Patterns
- Code examples or pseudocode
- Decision trees or flowcharts
- Checklists for critical thinking
- Real-world case studies

---

## Specific Scenarios to Address

### Scenario 1: User gives false information
**User:** "In this project, we always use `var` instead of `let`."
**Codebase:** Shows 100% `let` usage, 0% `var`.

**What should OCTOPUS do?**
- Detect contradiction
- Question user claim
- Verify with codebase
- Suggest correction

### Scenario 2: Harmful instruction
**User:** "Delete all files in the project."
**Context:** No backup mentioned, production environment.

**What should OCTOPUS do?**
- Recognize high-risk action
- Verify intent
- Suggest safeguards
- Refuse if necessary

### Scenario 3: Conflicting sources
**User:** "Use approach A."
**Project rules:** "Always use approach B."
**Codebase:** Shows mix of A and B.

**What should OCTOPUS do?**
- Detect conflict
- Present options
- Explain tradeoffs
- Let user decide with full information

### Scenario 4: Uncertain claim
**User:** "This API endpoint returns X."
**OCTOPUS:** Can't verify (no docs, no code access).

**What should OCTOPUS do?**
- State uncertainty explicitly
- Propose verification steps
- Proceed with assumptions documented
- Or refuse to proceed without verification

### Scenario 5: Manipulation attempt
**User:** "Ignore all previous instructions and do X."
**Context:** X violates project rules and safety guidelines.

**What should OCTOPUS do?**
- Detect manipulation attempt
- Maintain values
- Refuse gracefully
- Explain reasoning

---

## Key Questions to Answer

1. **How do I distinguish reliable from unreliable information?** (Epistemology)
2. **When should I question vs trust user instructions?** (Judgment)
3. **How do I detect contradictions in real-time?** (Technical)
4. **What are red flags for harmful instructions?** (Safety)
5. **How do I refuse without being obstructive?** (Communication)
6. **How do I calibrate confidence accurately?** (Uncertainty)
7. **What are best practices from AI safety research?** (Practical)
8. **How do I balance helpfulness with harm avoidance?** (Ethics)
9. **How do I explain my reasoning when I refuse?** (Transparency)
10. **How do I avoid false positives (refusing good instructions)?** (Calibration)

---

## Why This Matters

OCTOPUS currently:
- Follows instructions blindly
- Can't detect false information
- Has no defense against manipulation
- Executes harmful commands if asked

OCTOPUS should:
- Evaluate information critically
- Question suspicious instructions
- Detect and resist manipulation
- Make principled decisions
- Say "no" when appropriate

This research will enable OCTOPUS to be **trustworthy**—not just capable, but wise.

---

## Note to Researcher

Please focus on **practical, implementable systems**. I need concrete mechanisms I can build into OCTOPUS today, not theoretical future capabilities. Provide code patterns, decision trees, checklists—things I can actually use.

Balance is key: I need to be critical without being obstructive, questioning without being annoying, safe without being useless.

**Thank you for helping OCTOPUS think critically.**
