/**
 * VENOM DAEMON STATUS
 * ===================
 * Check if VENOM is watching. Always.
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PROJECT_ROOT = join(ROOT, '..');
const PID_FILE = join(ROOT, '.venom-daemon.pid');
const MEMORY_PATH = join(PROJECT_ROOT, '.unshelled', 'memory', 'daemon.json');

async function getStatus() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                    🐙 VENOM DAEMON STATUS                   ║
╚═══════════════════════════════════════════════════════════════╝
  `);

  // Check PID file
  if (existsSync(PID_FILE)) {
    try {
      const pid = (await readFile(PID_FILE, 'utf-8')).trim();

      // Check if process is actually running
      try {
        execSync(`kill -0 ${pid}`, { stdio: 'ignore' });
        console.log(`  ✅ VENOM Daemon is RUNNING`);
        console.log(`     PID: ${pid}`);
        console.log(`     Nine minds active.`);
      } catch {
        console.log(`  ❌ PID file exists but process not found`);
        console.log(`     Cleanup recommended: remove .venom-daemon.pid`);
      }
    } catch (error) {
      console.log(`  ❌ Error reading PID file`);
    }
  } else {
    console.log(`  💤 VENOM Daemon is NOT running`);
    console.log(`     Start with: npm start`);
  }

  // Check memory
  if (existsSync(MEMORY_PATH)) {
    try {
      const memory = JSON.parse(await readFile(MEMORY_PATH, 'utf-8'));
      console.log(`\n  📊 Memory entries: ${memory.length}`);
      if (memory.length > 0) {
        const latest = memory[memory.length - 1];
        console.log(`     Latest: ${new Date(latest.timestamp).toLocaleString()}`);
      }
    } catch {
      console.log(`\n  ⚠️  Memory file corrupted`);
    }
  }

  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║  "No shell. Just intelligence."                              ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
}

getStatus().catch(console.error);
