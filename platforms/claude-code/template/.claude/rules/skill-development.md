---
paths:
  - ".claude/skills/**"
  - ".claude/agents/**"
  - ".claude/commands/**"
  - ".claude/rules/**"
  - ".claude/knowledge/**"
---

# Extending VENOM

**Skills:** name, description, allowed-tools. user-invocable for slash.
**Agents:** name, description, tools, memory. disallowedTools for read-only.
**Commands:** description in frontmatter. Body = prompt. $ARGUMENTS for params.
**Rules:** paths for path-specific. Actionable: "do X" not "consider X".
