#!/usr/bin/env node
/**
 * CI Privacy Scanner — Layer 4 gate (ADR 0012)
 *
 * Scans the full published skills tree for internal-path / private-data
 * signals using the shared detector from skill-graph. This is the entry
 * point called by the CI workflow (.github/workflows/privacy-scan.yml).
 *
 * === Single Source of Truth ===
 *
 *   Privacy patterns live in skill-graph/scripts/lib/privacy-patterns.js.
 *   This script NEVER duplicates patterns — it loads them from skill-graph
 *   at runtime, the same way hooks/pre-push does.
 *
 * === Detector resolution ===
 *
 *   1. SKILL_GRAPH_PATH env var  — explicit override (CI sets this after
 *      cloning skill-graph as a sibling step).
 *   2. Default sibling path      — ../skill-graph/ relative to the skills
 *      repo root (matches the local developer workspace layout).
 *
 * === Usage ===
 *
 *   # Scan all SKILL.md files in the repo:
 *   node scripts/ci-privacy-scan.js
 *
 *   # Scan specific files (space-separated, for targeted checks):
 *   node scripts/ci-privacy-scan.js path/to/SKILL.md path/to/other.md
 *
 *   # Override skill-graph location:
 *   SKILL_GRAPH_PATH=/path/to/skill-graph node scripts/ci-privacy-scan.js
 *
 * === Exit codes ===
 *
 *   0  — Clean. No violations found.
 *   1  — Violations found. Offending file list printed to stderr.
 *   2  — Setup error (detector not loadable, no files to scan).
 *
 * === Architecture ===
 *
 *   ADR 0012 "Internal Skill Library Separation: Defense-in-Depth Gate"
 *   L2 — export-marketplace-skills.js  (export-time gate)
 *   L3 — hooks/pre-push                (pre-push hook)
 *   L4 — .github/workflows/privacy-scan.yml  (CI gate — this script)
 */

'use strict';

const path = require('path');
const fs = require('fs');

// ─── Resolve shared detector ──────────────────────────────────────────────────

const repoRoot = path.resolve(__dirname, '..');

function resolvePrivacyPatternsPath() {
  if (process.env.SKILL_GRAPH_PATH) {
    return path.join(process.env.SKILL_GRAPH_PATH, 'scripts', 'lib', 'privacy-patterns.js');
  }
  // Standard sibling layout:
  //   ~/Development/skills/       ← this repo
  //   ~/Development/skill-graph/  ← tooling repo
  return path.resolve(repoRoot, '..', 'skill-graph', 'scripts', 'lib', 'privacy-patterns.js');
}

function loadDetector() {
  const modulePath = resolvePrivacyPatternsPath();
  try {
    fs.accessSync(modulePath);
    return require(modulePath);
  } catch {
    process.stderr.write([
      '',
      'ci-privacy-scan: ERROR — cannot load the shared privacy-patterns module.',
      '',
      '  Expected: ' + modulePath,
      '',
      '  Options:',
      '    1. Set SKILL_GRAPH_PATH=/path/to/skill-graph',
      '    2. Clone skill-graph as a sibling of this repo:',
      '         ../skill-graph/  (relative to skills repo root)',
      '',
      '  In CI, the workflow should clone skill-graph before running this script.',
      '  See .github/workflows/privacy-scan.yml',
      '',
    ].join('\n'));
    process.exit(2);
  }
}

// ─── Collect files to scan ────────────────────────────────────────────────────

/**
 * Recursively find all files matching `filter` under `dir`.
 *
 * @param {string} dir
 * @param {(name: string) => boolean} filter
 * @param {string[]} [results]
 * @returns {string[]}
 */
function findFiles(dir, filter, results = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    // Skip hidden directories and node_modules
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findFiles(fullPath, filter, results);
    } else if (entry.isFile() && filter(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

function collectFilesToScan(cliArgs) {
  if (cliArgs.length > 0) {
    // Explicit file list from CLI
    return cliArgs.map(f => path.resolve(f));
  }
  // Default: per-skill CONTENT artifacts — SKILL.md bodies AND the sibling
  // audit-state.json / evals JSON sidecars. The sidecars carry eval receipts whose
  // absolute paths leaked /Users/... into the public repo (SKI-736); scanning
  // SKILL.md alone left that whole class ungated. Governance/meta files
  // (CONTRIBUTING.md, SECURITY.md, README.md, CODE_OF_CONDUCT.md) legitimately
  // reference pattern strings in their explanatory prose and stay intentionally
  // excluded — the gate protects skill content, not docs about the gate.
  return findFiles(repoRoot, name =>
    name === 'SKILL.md' ||
    name === 'audit-state.json' ||
    name === 'comprehension.json' ||
    name === 'application.json');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const { detectPrivacyViolations } = loadDetector();

  const cliArgs = process.argv.slice(2);
  const files = collectFilesToScan(cliArgs);

  if (files.length === 0) {
    process.stderr.write('ci-privacy-scan: no markdown files found to scan.\n');
    process.exit(2);
  }

  process.stdout.write(`ci-privacy-scan: scanning ${files.length} file(s)...\n`);

  const pathDisplay = p => path.relative(repoRoot, p);
  const findings = detectPrivacyViolations(files, { pathDisplay });

  if (findings.length === 0) {
    process.stdout.write('ci-privacy-scan: CLEAN — 0 violations found.\n');
    process.exit(0);
  }

  // ── Violations found — report and fail ───────────────────────────────────

  const violatingFiles = [...new Set(findings.map(f => f.file))].sort();

  process.stderr.write('\n');
  process.stderr.write('┌─────────────────────────────────────────────────────────────────────┐\n');
  process.stderr.write('│  CI BLOCKED — privacy violation detected                            │\n');
  process.stderr.write('│  ADR 0012 Layer 4 gate (skill-graph/scripts/lib/privacy-patterns.js)│\n');
  process.stderr.write('└─────────────────────────────────────────────────────────────────────┘\n');
  process.stderr.write('\n');
  process.stderr.write(`${violatingFiles.length} file(s) contain internal or private content:\n\n`);

  for (const file of violatingFiles) {
    process.stderr.write(`  BLOCKED  ${file}\n`);
  }

  process.stderr.write(`\n${findings.length} violation(s):\n\n`);
  for (const f of findings) {
    process.stderr.write(`  ${f.file}:${f.line}  [${f.id}] ${f.message}\n`);
    process.stderr.write(`           match: "${f.match}"\n`);
  }

  process.stderr.write('\n');
  process.stderr.write('HARD RULE: No Sales Hub / customer / personal / API / bank data may\n');
  process.stderr.write('enter the public skills repo. Remove the offending content and retry.\n\n');
  process.stderr.write('See: skill-graph/docs/adr/0012-internal-skill-library-separation.md\n\n');

  process.exit(1);
}

main();
