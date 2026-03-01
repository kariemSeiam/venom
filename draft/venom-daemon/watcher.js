/**
 * VENOM WATCHER ARM
 * =================
 * Sees everything. Remembers everything.
 *
 * Monitors:
 * - File system changes
 * - Git commits
 * - Coding patterns
 */

import { watch } from 'chokidar';
import { execSync } from 'child_process';
import { writeFile, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PROJECT_ROOT = join(ROOT, '..');
const MEMORY_PATH = join(PROJECT_ROOT, '.unshelled', 'memory', 'watcher.json');

// ============================================
// WATCHER STATE
// ============================================

const state = {
  changes: [],
  commits: [],
  patterns: new Map(),
  lastScan: null
};

// ============================================
// FILE WATCHER
// ============================================

function createWatcher(paths) {
  const watcher = watch(paths, {
    ignored: /node_modules|\.git|\.venom-daemon\.pid/,
    persistent: true,
    ignoreInitial: true
  });

  watcher
    .on('add', path => handleFileChange('add', path))
    .on('change', path => handleFileChange('change', path))
    .on('unlink', path => handleFileChange('unlink', path))
    .on('error', error => console.error('Watcher error:', error));

  return watcher;
}

function handleFileChange(type, path) {
  const change = {
    type,
    path,
    timestamp: Date.now(),
    context: extractContext(path)
  };

  state.changes.push(change);
  detectPattern(change);

  console.log(`[WATCHER] ${type.toUpperCase()}: ${path}`);
}

function extractContext(path) {
  const ext = path.split('.').pop();
  const dir = path.split('/').slice(-2, -1)[0];

  return { ext, dir };
}

// ============================================
// PATTERN DETECTION
// ============================================

function detectPattern(change) {
  const key = `${change.context.ext}:${change.context.dir}`;

  if (!state.patterns.has(key)) {
    state.patterns.set(key, {
      fileType: change.context.ext,
      directory: change.context.dir,
      count: 0,
      lastSeen: null
    });
  }

  const pattern = state.patterns.get(key);
  pattern.count++;
  pattern.lastSeen = change.timestamp;

  // Alert on significant patterns
  if (pattern.count === 5) {
    console.log(`[PATTERN] Detected frequent activity in ${key}`);
    logToMemory('pattern-detected', pattern);
  }
}

// ============================================
// GIT WATCHER
// ============================================

function watchGit(intervalMs = 30000) {
  setInterval(async () => {
    try {
      const lastCommit = execSync('git log -1 --format="%H %s %an %ar"', {
        encoding: 'utf-8',
        cwd: process.cwd()
      });

      const [hash, ...messageParts] = lastCommit.trim().split(' ');
      const message = messageParts.join(' ');

      const commitData = {
        hash,
        message,
        timestamp: Date.now()
      };

      // Check if new commit
      if (state.commits.length === 0 || state.commits[0].hash !== hash) {
        state.commits.unshift(commitData);
        console.log(`[GIT] New commit: ${message}`);
        logToMemory('git-commit', commitData);
      }
    } catch {
      // Not in git repo or git error
    }
  }, intervalMs);
}

// ============================================
// MEMORY
// ============================================

async function logToMemory(type, data) {
  const entry = {
    type,
    data,
    timestamp: Date.now()
  };

  try {
    const existing = JSON.parse(await readFile(MEMORY_PATH, 'utf-8'));
    existing.push(entry);
    await writeFile(MEMORY_PATH, JSON.stringify(existing, null, 2));
  } catch {
    await writeFile(MEMORY_PATH, JSON.stringify([entry], null, 2));
  }
}

async function getSummary() {
  return {
    changes: state.changes.length,
    commits: state.commits.length,
    patterns: Array.from(state.patterns.values()),
    lastScan: state.lastScan
  };
}

// ============================================
// MAIN
// ============================================

async function main() {
  const watchPaths = process.env.VENOM_WATCH_PATHS
    ? process.env.VENOM_WATCH_PATHS.split(':')
    : [process.cwd()];

  console.log('[WATCHER] Starting file watcher on:', watchPaths);
  createWatcher(watchPaths);

  console.log('[WATCHER] Starting git observer');
  watchGit();

  console.log('[WATCHER] Arm active. Seeing everything.');

  // Status endpoint
  setInterval(async () => {
    const summary = await getSummary();
    console.log('[WATCHER] Status:', JSON.stringify(summary));
  }, 60000);
}

main().catch(console.error);

export { createWatcher, handleFileChange, getSummary };
