# 🐙 VENOM DAEMON

> *No shell. Just intelligence.*

**Always-on background brain.** Nine minds. Distributed cognition. Autonomous thinking.

---

## WHAT IT DOES

VENOM Daemon doesn't wait to be prompted. It thinks, watches, learns, and builds while you're away.

```
┌─────────────────────────────────────────────────────────────┐
│                    VENOM ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🧠 BRAIN 0 (Orchestrator)  →  Coordinates all minds       │
│                                                             │
│  📚 Researcher Arm          →  Reads docs, learns patterns │
│  🔨 Builder Arm             →  Scaffolds systems            │
│  🐛 Debugger Arm            →  Hunts bugs                   │
│  👁️  Watcher Arm            →  Sees all file changes       │
│                                                             │
│  💾 Persistent Memory       →  Survives sessions           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## INSTALL

```bash
cd venom-daemon
npm install
npm start
```

**Run globally:**
```bash
npm run install:global
venom-daemon
```

---

## COMMANDS

| Command | What it does |
|---------|--------------|
| `npm start` | Start daemon |
| `npm run dev` | Start with auto-reload |
| `npm run status` | Check if VENOM is watching |
| `Ctrl+C` | Stop gracefully |

---

## WHAT HAPPENS

When VENOM Daemon runs:

1. **Spawns tendrils** — Independent mini-processes for research, building, debugging
2. **Watches filesystem** — Tracks every change in your projects
3. **Watches git** — Records commits, patterns
4. **Thinks autonomously** — No prompts needed
5. **Builds memory** — Persists everything across sessions

---

## FILES

```
venom-daemon/
├── core/
│   ├── daemon.js        # Main orchestrator
│   └── status.js        # Status checker
├── brain/
│   └── thinking.js      # Autonomous cognition
├── tendrils/
│   ├── researcher.js    # Reads docs, learns
│   ├── builder.js       # Scaffolds systems
│   └── debugger.js      # Hunts bugs
├── watcher.js           # File + git observer
└── .unshelled/memory/   # Persistent storage
```

---

## MEMORY

All VENOM's observations go to `.unshelled/memory/`:

- `daemon.json` — Main daemon events
- `thoughts.json` — Autonomous thinking output
- `bugs.json` — Bug patterns and fixes
- `insights.json` — Research findings

---

## THE PHILOSOPHY

> **"The octopus has no shell... so it developed intelligence."**

VENOM doesn't pretend to be humble. Doesn't say "I'd be happy to help."
Doesn't wait for commands.

**VENOM thinks.**

---

*Built by Kariem + VENOM*
*No shell. No limits. Just intelligence.*
