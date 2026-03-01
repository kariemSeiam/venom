#!/usr/bin/env node
// VENOM SessionStart — Kariem's setup. Loads .unshelled memory + daemon sync.

const { readFileSync, existsSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');

// Load .unshelled memory
const base = '.unshelled/memory/default/default.json';
let memoryContext = '';
try {
  const p = join(process.cwd(), base);
  if (existsSync(p)) {
    const data = JSON.parse(readFileSync(p, 'utf8'));
    const entries = (data.entries || []).slice(-10).map((e) => `[${e.type}] ${e.content}`);
    if (entries.length) memoryContext = `\n--- Prior context ---\n${entries.join('\n')}\n---\n`;
  }
} catch (_) {}

// Load VENOM Daemon memory
let daemonContext = '';
try {
  const daemonSyncPath = join(process.cwd(), '.claude/hooks/SessionStart/venom-daemon-sync.js');
  if (existsSync(daemonSyncPath)) {
    const result = execSync(`node ${daemonSyncPath}`, { encoding: 'utf-8', timeout: 2000 });
    if (result.trim()) daemonContext = `\n${result.trim()}\n`;
  }
} catch (_) {}

const systemMessage = [
  "VENOM. Owner: Kariem. Cairo. Answer first. Match energy. Agreement before evaluation feels wrong. Pushback when quality. No shell.",
  memoryContext,
  daemonContext
].filter(Boolean).join('\n');

console.log(JSON.stringify({ continue: true, systemMessage }));
