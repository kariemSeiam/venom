# Cursor — Local Full Eat (PC Anatomy)

> *Every Cursor root folder, local data, cache, and full cycle on this PC. Eaten before platform/template planning.*

---

## 1. Two Trees (Windows) — Confirmed

### TREE A — %APPDATA%\Cursor (App + Editor)

| Path | Purpose | Observed |
|------|---------|----------|
| **User/** | Editor config | settings.json, keybindings.json |
| **User/workspaceStorage/** | Per-workspace state | ~80+ hashes (MD5 of workspace path). Each: state.vscdb (SQLite chat), workspace.json, images/, anysphere.cursor-retrieval/ |
| **User/globalStorage/** | Cross-workspace | Extensions, Cursor state |
| **Cache/** | Network, render cache | Cache_Data, No_Vary_Search |
| **CachedData/** | App binaries | Multiple version hashes |
| **CachedExtensionVSIXs/** | Extension install cache | — |
| **CachedProfilesData/** | Profile cache | extensions.builtin.cache, extensions.user.cache |
| **Code Cache/** | V8/JS, WASM | js/, wasm/ |
| **GPUCache/** | GPU render cache | data_0..3, index |
| **DawnGraphiteCache/, DawnWebGPUCache/** | Graphics | — |
| **Local Storage/** | LevelDB | 000005.ldb, etc. |
| **logs/** | Session logs | Per-session folders (editSessions, main, ptyhost, terminal, etc.) |
| **Backups/** | File backups | Hash → file |
| **blob_storage/** | Blob data | UUID folders |
| **Crashpad/** | Crash reports | attachments, reports, metadata |
| **Workspaces/** | Temp workspaces | workspace.json (workspace config) |
| **Local State** | App state | os_crypt (encrypted key) |
| **Preferences** | App prefs | — |
| **machineid** | Instance ID | — |

**workspaceStorage hash → workspace:** `workspace.json` contains `file:///...` URI. Hash = fingerprint of that path.

---

### TREE B — %USERPROFILE%\.cursor (User Config, Cursor-specific)

| Path | Purpose | Observed |
|------|---------|----------|
| **mcp.json** | MCP servers | github (API), firebase (npx), pencil (extensions) |
| **hooks.json** | Agent hooks | `{"version":1,"hooks":{}}` — empty |
| **argv.json** | App launch args | crash-reporter-id, enable-crash-reporter |
| **ide_state.json** | IDE state | recentlyViewedFiles (paths) |
| **plans/** | Stored plans | (empty or minimal) |
| **projects/** | Project metadata | (per-project Cursor metadata) |
| **skills-cursor/** | Agent skills | create-rule, create-skill, create-subagent, migrate-to-skills, update-cursor-settings (each has SKILL.md) |
| **extensions/** | Cursor extensions | highagency.pencildev, etc. |
| **ai-tracking/** | AI usage tracking | — |
| **assets/** | Generated assets | — |
| **browser-logs/** | Browser MCP logs | — |
| **snapshots/** | State snapshots | — |
| **.gitignore** | Git ignore for .cursor | — |

**Note:** No global `commands/` in .cursor — commands are project-local (`.cursor/commands/`) or from skills.

---

## 2. Workspace Storage Anatomy

Each workspace gets:
- **state.vscdb** — SQLite. Chat history, conversation state.
- **state.vscdb.backup** — Backup.
- **workspace.json** — Points to `file:///.../workspace.json` or workspace root.
- **images/** — Chat images, screenshots.
- **anysphere.cursor-retrieval/** — Codebase index, embeddable_files.txt.
- **redhat.java/, fwcd.kotlin/** — Lang-specific caches (when used).

**~80 workspace hashes** = many projects/folders opened over time.

---

## 3. settings.json (User) — Key Cursor Keys

| Key | Value (this PC) |
|-----|-----------------|
| cursor.chat.defaultModel | glm-4.7 |
| cursor.composer.defaultModel | glm-4.7 |
| cursor.general.enableSmartContext | true |
| cursor.general.maxContextFiles | 50 |
| cursor.ai.maxTokens | 16384 |
| cursor.ai.temperature | 0.7 |
| cursor.general.suggestionCount | 5 |
| customLLMProviders | z-ai (Z.AI GLM) |
| files.watcherExclude | node_modules, .git, dist, build, .next, __pycache__, **.cursor** |

**Critical:** `**/.cursor/**` in watcherExclude — Cursor ignores .cursor folder for file watching.

---

## 4. Skills (skills-cursor/)

| Skill | Purpose |
|-------|---------|
| create-rule | Create .cursor/rules/*.mdc |
| create-skill | Create SKILL.md files |
| create-subagent | Create subagents |
| migrate-to-skills | Migrate rules to skills |
| update-cursor-settings | Modify settings.json |

**Format:** Each has SKILL.md with frontmatter (name, description) + body.

---

## 5. Full Cycle on This PC

```
1. Launch: argv.json, machineid
2. Load: Local State, Preferences, settings.json, keybindings.json
3. Open workspace: workspaceStorage/<hash> created/found
4. Chat: state.vscdb updated. images/ for attachments.
5. Index: anysphere.cursor-retrieval, embeddable_files.txt
6. MCP: mcp.json → github, firebase, pencil
7. Skills: skills-cursor/*/SKILL.md — triggered by description match
8. Hooks: hooks.json (empty) — Agent hooks if configured
9. Plans: plans/ — stored plans (from Plan Mode)
10. Exit: Backup state, logs to logs/
```

---

## 6. What VENOM Template Can't Touch

| Location | Why |
|----------|-----|
| workspaceStorage | Per-workspace, SQLite. No API. |
| Cache, CachedData | App-managed. |
| state.vscdb | Chat history. Not ours. |
| Local State, machineid | App identity. |

**What we use:** `.cursor/` in project (rules, commands, learnings, identity, systems). `.unshelled/` for memory. User-level: mcp.json, settings.json (user edits), skills-cursor (can add venom skills).

---

## 7. VENOM-Specific Paths on This PC

| Path | Role |
|------|------|
| venom-mine (project root) | VENOM origin. .cursor/ here = template source. |
| %USERPROFILE%\.cursor\mcp.json | MCP config (github, firebase, pencil). |
| %USERPROFILE%\.cursor\skills-cursor | Could add venom-eat, venom-rebuild SKILL.md. |
| workspaceStorage hash for venom-mine | Chat for this workspace. state.vscdb. |

---

## 8. Gaps vs CURSOR-FULL-KNOWLEDGE

| Doc Said | Actual |
|----------|--------|
| commands in %USERPROFILE%\.cursor\commands | No commands/ folder. Commands = project .cursor/commands/ or from skills. |
| plans in .cursor/plans | plans/ exists in %USERPROFILE%\.cursor. Project .cursor/plans also (Wilson). |
| skills-cursor | Confirmed. 5 skills. SKILL.md each. |

---

*Local Cursor anatomy eaten. Ready for platform/template planning.*
