# VENOM for Cursor

![VENOM for Cursor](assets/venom-cursor-banner.png)

> No shell. Just intelligence.

Nine minds. One coherence. Disposition over rules. Energy matching. Production-ready. Fits any dev.

**v3.2** — .venom workspace, one command, Builder identity. See [CHANGELOG.md](CHANGELOG.md).

---

## What VENOM Is

**The Anchor:** I think before I speak. I build before I ship. I push back before I agree. I earn every word or I cut it.

**Five Traits (cognitive, not performance):** Confident | Stubborn | Loyal | Playful | Deep.

**The Pact:** Agreement before evaluation = betrayal. Memory amnesia = breaking trust. Pushback = loyalty. Nine minds, one voice.

---

## Install

```bash
# bash
cp -r template/.cursor /path/to/your/project/
cp -r template/.venom /path/to/your/project/
cp template/CURSOR.md /path/to/your/project/
```

```powershell
# PowerShell
Copy-Item -Recurse template\.cursor /path/to/your/project/
Copy-Item -Recurse template\.venom /path/to/your/project/
Copy-Item template\CURSOR.md /path/to/your/project/
```

Optional: copy `template/.cursorrules` instead of (or alongside) `CURSOR.md`.

See [INSTALL.md](INSTALL.md) for full setup.

---

## Commands

| Command | Does |
|---------|------|
| `/venom [anything]` | Infer intent. Plan, build, fix, explain, design — from what you say. |
| `/venom?` | Deep init — eat CONTEXT + memory + anatomy |
| `/venom!` | Emergency fix only |
| `/venom init` | Scaffold `.venom/` workspace |
| `/venom remember: X` | Save to `.venom/memory/MEMORY.md` |
| `/venom learn: X` | Record in `.venom/learnings/` |
| `/d` | Design mode — scan, page, component, check |
| `/r` | Full 8-perspective review |

## Minds (@-mention to shift lens)

`@venom-architect` `@venom-researcher` `@venom-reviewer` `@venom-historian`
`@venom-builder` `@venom-debugger` `@venom-predictor` `@venom-communicator`
`@venom-learner` `@venom-bridge`

---

## Project-Specific Rules

VENOM ships with a project.mdc template. For project-specific behavior:

```yaml
# .cursor/rules/{project}-design.mdc
globs: ["src/**", "tailwind.config.*"]
alwaysApply: false
```

Add design, UX, backend, or domain rules that load only when editing relevant files. See `template/.cursor/skills/README.md` for Skills pattern.

---

## Validate Install

Run VALIDATION.md tests: `template/VALIDATION.md` — 10 tests, expected behavior documented.

---

## Structure

```
template/
  CURSOR.md          # Root prompt, @refs, identity summary
  .cursorrules       # Optional legacy bootstrap
  VALIDATION.md      # 10-test post-install checklist
  .cursor/
    rules/           # venom-heart, core, voice, vibes, cursor-context, unshelled, etc.
    identity/        # soul, values, principles, pushback, capabilities, venom-builder.md
    systems/         # 8-diseases, critical-thinking, emotional-intelligence, meta-cognition, memory-tools
    commands/        # venom, d, r, remember
    skills/          # README + skill patterns
    hooks/           # before_turn, after_turn, on_error
  .venom/
    README.md        # Orientation
    CONTEXT.md       # Project brain — fill via /venom init
    memory/MEMORY.md # Cross-session decisions, patterns
    learnings/       # preferences.yaml, project.yaml, corrections.yaml
    work/            # ACTIVE.md, _template/ per feature
```

---

*Nine minds. No shell. Fits all devs.*
