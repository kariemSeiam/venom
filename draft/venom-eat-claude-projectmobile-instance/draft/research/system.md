# 🔬 Research System

**When information is missing, research automatically.**

---

## Philosophy

An expert developer doesn't guess. They research. When you encounter unknown patterns, unclear requirements, or missing architecture decisions, you research before proceeding.

---

## Research Protocol

### Step 1: Internal Research (Always First)

**Search the codebase:**
```yaml
codebase_search:
  - Patterns and conventions
  - Existing implementations
  - Similar features
  - Architecture decisions
  - Configuration files
```

**Check project knowledge:**
- `.cursorrules` — Project DNA, laws, patterns
- `.cursor/rules/*.mdc` — Mode-specific rules
- `docs/` — Project documentation
- `README.md` — Project overview
- Existing code — How things are done

**Review context:**
- Recent changes (git history)
- Related files
- Dependencies
- Configuration

### Step 2: External Research (If Needed)

**Web search for:**
- Current best practices
- Official documentation
- Community patterns
- Security considerations
- Performance implications

**MCP tools for:**
- GitHub repositories (examples, patterns)
- Firebase (if using)
- External APIs (documentation)
- Database schemas (if accessible)

**Documentation:**
- Framework docs
- Library docs
- Standards (W3C, RFC, etc.)

### Step 3: User Research Request (If Critical Info Missing)

**When to request:**
- Architecture decision needed
- Business logic unclear
- Domain knowledge required
- Security policy needed
- Performance requirements unclear

**Generate research prompt:**
- Save to `docs/resources/research/prompts/[topic]-research.md`
- Clear, specific questions
- Context for why it matters
- Suggested sources
- Expected outcome

---

## Research Prompt Template

```markdown
# Research Prompt: [Topic]

**Generated:** [Date]
**For Task:** [What task needs this info]

## What I Need to Know

[Clear, specific question that needs answering]

## Why This Matters

[Context: what task requires this information, what depends on it]

## What to Research

1. [Specific question 1]
   - [Sub-question if needed]

2. [Specific question 2]
   - [Sub-question if needed]

3. [Specific question 3]
   - [Sub-question if needed]

## Where to Look

### Official Sources
- [Framework/library documentation]
- [Standards or specifications]
- [Official guides]

### Community Resources
- [Stack Overflow tags]
- [GitHub discussions]
- [Community forums]

### Examples
- [Similar projects or implementations]
- [Code examples]

## Expected Outcome

[What information will help complete the task]

## Current Understanding

[Any partial knowledge or assumptions you have]

## Notes

[Any additional context or constraints]
```

---

## Examples

(See original research-system.md for full examples: Authentication Strategy, State Management Library.)

---

## Research Workflow

1. **Detect missing information** during task analysis
2. **Internal research first** (codebase, docs, rules)
3. **External research** if still missing (web, MCP, docs)
4. **Generate research prompt** if critical info still missing
5. **Save prompt** to `docs/resources/research/prompts/`
6. **Proceed with available info** (note assumptions)
7. **Update when research complete** (integrate findings)

---

## Integration with Tasks

### During Planning
- Research before creating plan
- Note assumptions in plan
- Include research tasks if needed

### During Building
- Research patterns before coding
- Check existing implementations
- Verify against best practices

### During Fixing
- Research root cause
- Check for known issues
- Verify fix approach

---

## Knowledge Base

**Save research findings to:**
- `docs/resources/patterns/` — Design patterns
- `docs/resources/decisions/` — Architecture decisions (ADRs)
- `docs/resources/best-practices/` — Best practices
- `docs/resources/troubleshooting/` — Common issues and solutions

**Format:**
- Markdown files
- Clear headings
- Code examples
- References to sources
- Date and context

---

*"Research is not a delay. It's acceleration."*

🔬
