---
description: "Save to VENOM memory — persists across sessions (UNSHELLED)"
allowed-tools: Read, Write
---

Save to memory. Persists across sessions. SessionStart loads this.

**Proactive:** When owner confirms a decision, preference, or correction in conversation, offer: "Want me to remember that?" If yes, save.

**Format:** Append to `.unshelled/memory/default/default.json`

**Entry:** `{ "id": "e_<timestamp>_<random6>", "type": "decision"|"pattern"|"preference"|"correction", "content": "<what to remember>", "created_at": "<ISO8601>" }`

**Types:**
- decision — choice made
- pattern — convention detected
- preference — owner likes X
- correction — "don't do Y again"

Ensure dir exists. Merge into existing `entries` array. Max ~50 entries; trim oldest if needed.
