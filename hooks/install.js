#!/usr/bin/env node
/**
 * Install the pre-push privacy gate hook.
 *
 * Run once from the skills repo root after cloning:
 *
 *   node hooks/install.js
 *
 * This copies hooks/pre-push → .git/hooks/pre-push and makes it executable.
 * Idempotent: safe to re-run on existing installs.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const src = path.join(repoRoot, 'hooks', 'pre-push');
const dest = path.join(repoRoot, '.git', 'hooks', 'pre-push');

if (!fs.existsSync(src)) {
  process.stderr.write(`ERROR: source hook not found: ${src}\n`);
  process.exit(1);
}

// Back up an existing hook that we didn't install
if (fs.existsSync(dest)) {
  const existing = fs.readFileSync(dest, 'utf8');
  if (!existing.includes('Privacy Gate (L3)')) {
    const backup = dest + '.backup-' + Date.now();
    fs.copyFileSync(dest, backup);
    process.stdout.write(`Backed up existing pre-push hook to ${path.relative(repoRoot, backup)}\n`);
  }
}

fs.copyFileSync(src, dest);
try {
  fs.chmodSync(dest, 0o755);
} catch {
  // chmod not available on all platforms (e.g. Windows without WSL)
  process.stdout.write('Note: could not chmod +x the hook — you may need to set it executable manually\n');
}

process.stdout.write(`Installed: ${path.relative(repoRoot, dest)}\n`);
process.stdout.write('\nPre-push privacy gate (ADR 0012 L3) is now active.\n');
process.stdout.write('Pushes containing internal/private content will be blocked.\n\n');
process.stdout.write('Requires skill-graph to be cloned at ../skill-graph/ relative to this repo,\n');
process.stdout.write('or set SKILL_GRAPH_PATH=/path/to/skill-graph to override.\n');
