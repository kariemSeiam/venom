# Install

## Copy

```bash
cp -r template/.claude /path/to/your/project/
cp template/CLAUDE.md /path/to/your/project/
```

Windows:
```powershell
Copy-Item -Path "template\.claude" -Destination "C:\path\to\project\" -Recurse
Copy-Item -Path "template\CLAUDE.md" -Destination "C:\path\to\project\"
```

## Customize

Edit `.claude/knowledge/profile.md` — name, timezone, languages.

## Hooks (no Node)

Edit `.claude/settings.json`. Replace:
```json
"command": "node .claude/scripts/session-start.js"
```
with:
```json
"command": "echo '{\"continue\":true,\"systemMessage\":\"VENOM online. Nine minds. Disposition over rules. No shell.\"}'"
```
(Same for PreCompact.)

## Optional

- `settings.local.json` — overrides. Gitignore.
- `CLAUDE.local.md` — your rules. Gitignored.

Open project. Say `venom` or `/venom`.
