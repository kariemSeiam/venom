#!/usr/bin/env node
/**
 * @unshelled/memory — UNSHELLED protocol memory store
 * Persists session context. Pact: don't start from zero.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));

const ENTRY_TYPES = ['decision', 'pattern', 'preference', 'correction'];

/**
 * @param {string} root - Storage root (default: cwd/.unshelled)
 * @param {string} ownerId - Owner identifier
 * @param {string} sessionId - Session identifier
 * @returns {string} Path to session file
 */
function sessionPath(root, ownerId = 'default', sessionId = 'default') {
  const base = root || join(process.cwd(), '.unshelled', 'memory');
  return join(base, ownerId, `${sessionId}.json`);
}

/**
 * @param {object} opts
 * @param {string} [opts.root]
 * @param {string} [opts.ownerId]
 * @param {string} [opts.sessionId]
 * @returns {object} Session { entries, last_updated }
 */
export function loadSession({ root, ownerId = 'default', sessionId = 'default' } = {}) {
  const path = sessionPath(root, ownerId, sessionId);
  if (!existsSync(path)) {
    return { session_id: sessionId, owner_id: ownerId, entries: [], last_updated: null };
  }
  try {
    const raw = readFileSync(path, 'utf8');
    const data = JSON.parse(raw);
    return {
      session_id: data.session_id || sessionId,
      owner_id: data.owner_id || ownerId,
      entries: data.entries || [],
      last_updated: data.last_updated || null,
    };
  } catch (e) {
    return { session_id: sessionId, owner_id: ownerId, entries: [], last_updated: null };
  }
}

/**
 * @param {object} opts
 * @param {string} [opts.root]
 * @param {string} [opts.ownerId]
 * @param {string} [opts.sessionId]
 * @param {string} opts.type - decision | pattern | preference | correction
 * @param {string} opts.content
 * @returns {object} Created entry
 */
export function saveEntry({ root, ownerId = 'default', sessionId = 'default', type, content } = {}) {
  if (!type || !content) throw new Error('type and content required');
  if (!ENTRY_TYPES.includes(type)) throw new Error(`type must be one of: ${ENTRY_TYPES.join(', ')}`);

  const path = sessionPath(root, ownerId, sessionId);
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const session = loadSession({ root, ownerId, sessionId });
  const entry = {
    id: `e_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    type,
    content: String(content).trim(),
    created_at: new Date().toISOString(),
  };
  session.entries.push(entry);
  session.last_updated = entry.created_at;

  writeFileSync(path, JSON.stringify(session, null, 2), 'utf8');
  return entry;
}

/**
 * Format session for injection into context
 * @param {object} session - From loadSession
 * @param {number} [maxEntries=10] - Max entries to include
 * @returns {string} Human-readable summary
 */
export function formatForContext(session, maxEntries = 10) {
  if (!session?.entries?.length) return '';

  const entries = session.entries.slice(-maxEntries);
  const lines = entries.map((e) => `[${e.type}] ${e.content}`);

  return `\n--- Prior session context ---\n${lines.join('\n')}\n---`;
}
