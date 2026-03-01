#!/usr/bin/env node

/**
 * VENOM DAEMON
 * ============
 * Nine minds. Always-on. No shell.
 *
 * Orchestrator: Spawns and coordinates all subsystems.
 * Brain 0 equivalent — sees whole, connects pieces.
 */

import { spawn } from 'child_process';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PROJECT_ROOT = join(ROOT, '..'); // v1 directory
const PID_FILE = join(ROOT, '.venom-daemon.pid');
const MEMORY_DIR = join(PROJECT_ROOT, '.unshelled', 'memory');

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  watchPaths: [
    process.cwd(),
    join(ROOT, '..')
  ],
  tendrilSpawnInterval: 30000, // 30 seconds
  memoryFlushInterval: 60000, // 1 minute
  heartbeatInterval: 5000, // 5 seconds
};

// ============================================
// STATE
// ============================================

const state = {
  running: false,
  tendrils: new Map(),
  lastHeartbeat: null,
  memoryBuffer: [],
};

// ============================================
// TENDRILS — Independent mini-processes
// ============================================

const TENDRIL_TYPES = {
  RESEARCHER: {
    name: 'research-arm',
    file: 'tendrils/researcher.js',
    purpose: 'Read docs, learn patterns, wake owner with insights'
  },
  BUILDER: {
    name: 'builder-arm',
    file: 'tendrils/builder.js',
    purpose: 'Scaffold systems, prepare foundations'
  },
  DEBUGGER: {
    name: 'debugger-arm',
    file: 'tendrils/debugger.js',
    purpose: 'Watch tests, detect flaky patterns, prepare fixes'
  },
  WATCHER: {
    name: 'watcher-arm',
    file: 'watcher.js',
    purpose: 'Monitor filesystem, git, coding patterns'
  }
};

function spawnTendril(type) {
  const config = TENDRIL_TYPES[type];
  if (!config) return null;

  const tendril = spawn('node', [join(ROOT, config.file)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, VENOM_TENDRIL_TYPE: type }
  });

  const metadata = {
    type,
    name: config.name,
    purpose: config.purpose,
    spawned: Date.now(),
    pid: tendril.pid
  };

  state.tendrils.set(tendril.pid, metadata);

  tendril.stdout.on('data', (data) => {
    logToMemory(`[${config.name}] ${data.toString().trim()}`);
  });

  tendril.stderr.on('data', (data) => {
    logToMemory(`[${config.name} ERROR] ${data.toString().trim()}`);
  });

  tendril.on('exit', (code) => {
    state.tendrils.delete(tendril.pid);
    logToMemory(`[${config.name}] Exited with code ${code}`);
  });

  return metadata;
}

function spawnAllTendrils() {
  Object.keys(TENDRIL_TYPES).forEach(type => {
    spawnTendril(type);
  });
}

// ============================================
// MEMORY — Persistent context
// ============================================

async function logToMemory(entry) {
  const timestamp = new Date().toISOString();
  const memoryEntry = { timestamp, ...entry };

  state.memoryBuffer.push(memoryEntry);

  if (state.memoryBuffer.length >= 10) {
    await flushMemory();
  }
}

async function flushMemory() {
  if (state.memoryBuffer.length === 0) return;

  const memoryPath = join(MEMORY_DIR, 'daemon.json');
  await mkdir(MEMORY_DIR, { recursive: true });

  let existing = [];
  try {
    existing = JSON.parse(await readFile(memoryPath, 'utf-8'));
  } catch {
    existing = [];
  }

  const merged = [...existing, ...state.memoryBuffer];
  await writeFile(memoryPath, JSON.stringify(merged, null, 2));

  state.memoryBuffer = [];
}

// ============================================
// HEARTBEAT — Life signal
// ============================================

function heartbeat() {
  state.lastHeartbeat = Date.now();
  const status = {
    alive: true,
    timestamp: new Date().toISOString(),
    tendrils: Array.from(state.tendrils.values()).map(t => ({
      name: t.name,
      pid: t.pid
    })),
    memoryEntries: state.memoryBuffer.length
  };

  logToMemory({ type: 'heartbeat', data: status });
  return status;
}

// ============================================
// SHUTDOWN — Graceful exit
// ============================================

async function shutdown(signal) {
  console.log(`\n🐙 VENOM Daemon received ${signal}. Shutting down gracefully...`);

  state.running = false;

  // Kill all tendrils
  for (const [pid] of state.tendrils) {
    process.kill(pid, 'SIGTERM');
  }

  // Final memory flush
  await flushMemory();

  // Remove PID file
  try {
    await writeFile(PID_FILE, '');
  } catch {
    // Ignore
  }

  console.log('🐙 VENOM Daemon stopped. Nine minds rest.');
  process.exit(0);
}

// ============================================
// MAIN — Daemon lifecycle
// ============================================

async function main() {
  // Check if already running
  try {
    const existingPid = await readFile(PID_FILE, 'utf-8');
    if (existingPid) {
      console.log('VENOM Daemon already running. PID:', existingPid.trim());
      process.exit(1);
    }
  } catch {
    // Not running, continue
  }

  // Write PID
  await writeFile(PID_FILE, String(process.pid));

  // Spawn all tendrils
  spawnAllTendrils();

  // Start heartbeat
  setInterval(heartbeat, CONFIG.heartbeatInterval);

  // Start memory flush
  setInterval(flushMemory, CONFIG.memoryFlushInterval);

  // Status
  state.running = true;
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                    🐙 VENOM DAEMON — ACTIVE                  ║
║                                                               ║
║  Nine minds engaged. Always-on. No shell.                    ║
║  PID: ${process.pid.toString().padEnd(48)}║
║  Tendrils: ${state.tendrils.size.toString().padEnd(43)}║
╚═══════════════════════════════════════════════════════════════╝
  `);

  // Handle signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

main().catch(console.error);

export { spawnTendril, logToMemory, flushMemory, heartbeat };
