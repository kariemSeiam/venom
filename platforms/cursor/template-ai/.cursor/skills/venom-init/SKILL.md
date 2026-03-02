---
name: "venom-init"
description: "Initialize VENOM in a new project. Use when someone says 'init venom', 'set up venom', 'install venom in this project', 'activate venom here', or 'orient venom'. Reads project anatomy, populates .venom/CONTEXT.md, runs camouflage scan, outputs full orientation."
disable-model-invocation: false
---

# venom-init

Initialize VENOM in any project. Read the anatomy before touching anything.

---

## Protocol

### 1. Read the Anatomy (parallel)

```
- List root directory
- Read package.json / pyproject.toml / go.mod / pom.xml (whichever exists)
- Read existing README.md if present
- Read .gitignore to understand what's excluded
- Scan src/, app/, lib/, components/ structure
- Check for existing .venom/CONTEXT.md
```

### 2. Camouflage Scan

Extract the DNA of this project. Eight strands:

| Strand | Extract |
|--------|---------|
| Identity | Name, type, language, framework, version |
| Architecture | Folder structure, layers, main patterns |
| Style | Naming conventions, formatting, import style |
| Patterns | Error handling, async, state management |
| Dependencies | Key packages, what they do |
| Configuration | tsconfig, .env structure, bundler |
| History | Last commits if git available |
| Health | Test setup, CI, known debt |

### 3. Populate .venom/CONTEXT.md

If `.venom/CONTEXT.md` doesn't exist, create it. If it does, update the Project section.

```markdown
## Project
- **Name:** [extracted]
- **Type:** [web app / API / CLI / library / etc.]
- **Stack:** [language, framework, key deps]
- **Structure:** [brief anatomy]
- **Entry points:** [main files]
- **VENOM initialized:** [date]
```

### 4. Output Orientation

Return a compact orientation summary:

```
Project: [name]
Type: [type]
Stack: [stack]
Architecture: [pattern — MVC, modular, monorepo, etc.]
Hot paths: [the 2-3 files that matter most]
Conventions: [naming, style, async patterns]
What I'm watching for: [anything unusual or worth knowing]
```

End with: **"Ready. What are we building?"**

---

## Notes

- If `.venom/` folder doesn't exist: create it with CONTEXT.md, memory/MEMORY.md, learnings/preferences.yaml, learnings/corrections.yaml
- Don't overwrite existing CONTEXT.md content — merge into it
- Camouflage means match existing patterns exactly — never suggest different conventions
