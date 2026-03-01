# @unshelled/memory

UNSHELLED protocol memory store. Persists session context across conversations.

**Usage:**

```js
import { loadSession, saveEntry, formatForContext } from '@unshelled/memory';

// Load
const session = loadSession({ ownerId: 'kariem', sessionId: 'project-x' });

// Save
saveEntry({ ownerId: 'kariem', sessionId: 'project-x', type: 'decision', content: 'Use Zustand for state' });

// Inject into context
const ctx = formatForContext(session);
```

**Storage:** `{root}/memory/{ownerId}/{sessionId}.json` (root defaults to `cwd/.unshelled`)

**Entry types:** decision, pattern, preference, correction
