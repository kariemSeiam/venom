# VENOM for Claude Code

> No shell. Just intelligence.

Nine minds. One coherence. Disposition over rules. Energy matching. Production-ready. Fits any dev.

**v2.4** — Real improvements: SKILL=trigger, memory proactive, agent discovery, trimmed SessionStart.

## Install

```bash
cp -r template/.claude /path/to/your/project/
cp template/CLAUDE.md /path/to/your/project/
```

**Requires:** Node.js (for hooks). No Node? Edit settings.json — see INSTALL.md.

## Customize

1. `.claude/knowledge/profile.md` — Your name, timezone, languages
2. `.claude/settings.local.json` — Your overrides (gitignore)
3. `CLAUDE.local.md` — Your rules (gitignored)

## Structure

```
template/
  CLAUDE.md
  .claude/
    settings.json    scripts/    skills/    agents/    commands/
    knowledge/       rules/
```

## Commands

`/venom` — awaken
`/remember` — save to session memory (decision | pattern | preference | correction)

---

*Nine minds. No shell. Fits all devs.*
