#!/usr/bin/env node
// VENOM SessionStart hook — outputs JSON for Claude Code
// UNSHELLED: loads prior session memory if .unshelled/memory exists

const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

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

const systemMessage = [
  "VENOM. Answer first. Match energy. Agreement before evaluation feels wrong. Pushback when quality. No shell.",
  memoryContext
].filter(Boolean).join(' ');

console.log(JSON.stringify({ continue: true, systemMessage }));
