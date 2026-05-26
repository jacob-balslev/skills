---
name: owasp-security
description: "Use when reviewing code for security vulnerabilities, threat-modelling a new feature, implementing authentication or authorization, handling user input, or auditing a codebase against the OWASP Top 10 (2021). Covers injection (SQL, NoSQL, command, LDAP, XSS), broken access control, cryptographic failures, insecure design, security misconfiguration, vulnerable dependencies, identification and authentication failures, software and data integrity failures, logging and monitoring failures, and server-side request forgery. Do NOT use for general code review (use `code-review` for the holistic per-PR pass), for chasing a known production bug (use `debugging`), or for writing a security policy doc (use `documentation`)."
license: MIT
compatibility:
  notes: "Language-agnostic; OWASP Top 10 2021 reference"
allowed-tools: Read Grep Bash
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"

  # === v7 Classification (DEPRECATED 2026-05-26 — kept for back-compat only) ===
  # type: v7 classification — DEPRECATED, replaced by `operation`.
  # Legacy values: capability / workflow / router / overlay.
  type: capability
  # operation: cognitive operation enabled (Bloom-grounded). One of four closed values:
  # know (declarative — concepts, vocabulary, reference) /
  # do (procedural — step-by-step execution) /
  # decide (judgment — choosing, dispatching) /
  # modify (context injection — shapes how other skills execute).
  operation: do
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: quality

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: quality-assurance
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: quality/security
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-04"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-04\"}"

  # === Eval-health: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: planned
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  eval_state: unverified
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  routing_eval: absent
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"security\",\"owasp\",\"owasp top 10\",\"vulnerability\",\"sql injection\",\"xss\",\"cross site scripting\",\"csrf\",\"authentication\",\"authorization\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"audit this endpoint for SQL injection and XSS specifically\",\"this PR adds user input — what security checks should I run?\",\"threat-model this new file-upload feature\",\"review this auth flow against OWASP — is there a bypass?\",\"I'm building a search box — how do I prevent injection?\",\"the dependency scanner flagged 12 vulnerabilities — which ones matter?\",\"is this code path vulnerable to SSRF?\",\"review this access-control logic — can a non-admin escalate?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"review this PR holistically\",\"production users are reporting an error — debug it\",\"write our company security policy doc\",\"scaffold a new skill teaching security review\",\"rename this auth function for clarity\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"code-review\",\"reason\":\"code-review is the holistic per-PR pass that includes security as one of many concerns; owasp-security is the security-specific deep audit\"},{\"skill\":\"debugging\",\"reason\":\"debugging chases a known failure (security or otherwise); owasp-security finds vulnerabilities BEFORE they are exploited in production\"},{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy decides what to test broadly; owasp-security defines security-specific test cases (auth bypass tests, injection tests, etc.) as a sub-concern\"}],\"related\":[\"code-review\",\"testing-strategy\"],\"verify_with\":[\"testing-strategy\",\"code-review\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":180,\"review_cadence\":\"quarterly\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/owasp-security/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: UNVERIFIED
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: UNVERIFIED
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
---

# OWASP Security

## Coverage

- The OWASP Top 10 (2021) categories: A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A04 Insecure Design, A05 Security Misconfiguration, A06 Vulnerable Components, A07 Identification and Authentication Failures, A08 Software and Data Integrity Failures, A09 Security Logging and Monitoring Failures, A10 Server-Side Request Forgery
- Detection patterns per category: the code shapes that signal vulnerability and the grep / static-analysis queries that surface them
- Mitigation patterns per category: parameterised queries, output encoding, principle-of-least-privilege access checks, secure defaults, dependency pinning, input allowlisting, structured logging
- Threat modelling: the four-question STRIDE-lite (what are we building, what could go wrong, what are we doing about it, did we do a good job) for new features
- The AI-generated code premium: vulnerabilities specifically common in LLM-authored code (1.7-2.74× rate per published research) and what to look for
- Severity grading and disclosure: when a finding is critical, high, medium, or informational, and how to communicate fixes without leaking exploitable detail
- Defence in depth: why a single mitigation is insufficient, and how to layer controls
- The auth invariants that recur: authentication separated from authorisation, every privileged action checked, sessions invalidated on logout, secrets never in code or logs

## Philosophy

Security is not a feature; it is a *property* of the system that erodes silently unless actively maintained. The OWASP Top 10 is not a checklist to memorise — it is a vocabulary for naming the most-common ways software fails. A reviewer who can name "this is A03 Injection" and "this is A07 Identification Failure" can communicate findings to teammates, prioritise against industry data, and reach mitigations that are already documented and known to work.

The most expensive security bug is the one you didn't *notice was a security bug*. Most live vulnerabilities started life as a perfectly reasonable-looking line of code that the author did not recognise as a security-relevant decision. The point of this skill is to enrich your default reading of code with a security lens — not as a separate review pass, but as a way of seeing every input, every boundary, and every privileged action.

## The OWASP Top 10 — Detection and Mitigation

### A01 — Broken Access Control

**Detection.** Look for: missing authorisation checks on routes, IDOR-shaped URLs (`/users/{id}/...` with no ownership check), client-side-only role checks, force-browsing exposed endpoints, missing CSRF tokens on state-changing requests.

```
grep -rn "router\.\(get\|post\|put\|delete\)" --include="*.ts" \
  | grep -v "requireAuth\|requireAdmin\|allowAnonymous"
```

**Mitigation.** Centralise authorisation in middleware or a request-scoped helper (`requireAuth`, `requireOrgAccess`, `requireResourceOwnership`). Default to deny; require an explicit positive decision to allow. Test access denial as carefully as access success.

### A02 — Cryptographic Failures

**Detection.** Plaintext storage of credentials/PII, weak hashing (`md5`, `sha1`) for passwords (use Argon2 or bcrypt), reused IVs, hardcoded keys, missing TLS on sensitive endpoints, weak random sources (non-cryptographic random functions) for security tokens.

**Mitigation.** Use library primitives, not hand-rolled crypto. `crypto.randomBytes` for tokens; Argon2id/bcrypt for password hashing; AES-256-GCM with unique nonces for symmetric encryption; TLS 1.3 in transit; environment-variable secrets that the deployment system injects.

### A03 — Injection (SQL, NoSQL, command, LDAP, XSS)

**Detection.** String concatenation building queries, unparameterised user input interpolated into SQL/NoSQL/shell, dynamic-code-evaluation primitives invoked on any user input, direct DOM injection from user-controlled strings, missing output encoding in templates.

```
grep -rn "exec\|innerHTML\s*=" --include="*.ts" --include="*.js"
grep -rn "query.*\${" --include="*.ts" --include="*.sql"
```

The dynamic-code-evaluation family of primitives — those that take a string and execute it as code — is the highest-severity injection surface and should be banned in production code on user-controlled paths.

**Mitigation.** Parameterised queries always (`db.query("WHERE id = $1", [id])`, not template-literal interpolation of user input). Output encoding by default in the templating layer. Allowlist user input where the input space is narrow (enums, IDs). Content-Security-Policy headers to limit XSS blast radius. Forbid the dynamic-code-evaluation primitives entirely on production paths via a project-wide lint rule.

### A04 — Insecure Design

**Detection.** No threat model exists for the feature. Trust boundaries are not documented. Rate limiting absent on expensive operations. Business logic that can be subverted (price-tampering, quantity-tampering, redirect-tampering).

**Mitigation.** Threat-model new features at design time, not at review time. Document trust boundaries (what data is trusted, what is not). Rate-limit expensive operations and authentication endpoints. Server-side validate every business-rule the client could subvert.

### A05 — Security Misconfiguration

**Detection.** Default credentials in production. Verbose error messages (stack traces) returned to users. Unnecessary services enabled. Permissive CORS (`Access-Control-Allow-Origin: *` on credentialed endpoints). Missing security headers (CSP, X-Frame-Options, X-Content-Type-Options).

**Mitigation.** Secure defaults. Generic error messages to users; verbose logs to internal-only systems. Minimal services. Specific allowlisted origins for CORS on credentialed endpoints. Helmet (Node) or equivalent for header defaults.

### A06 — Vulnerable Components

**Detection.** Dependency lockfile not committed. No automated dependency-vulnerability scanning (Dependabot, Snyk, npm audit). Outdated framework versions with known CVEs.

**Mitigation.** Lockfiles committed. Automated vulnerability scanning on every PR. Pin direct dependencies; let the lockfile pin transitive ones. Patch high/critical CVEs within the disclosure SLA (typically 7-30 days).

### A07 — Identification and Authentication Failures

**Detection.** Weak password policies, no rate limiting on login, predictable session tokens, sessions not invalidated on logout, missing MFA option on sensitive accounts, password reset flow with predictable tokens.

**Mitigation.** Use a battle-tested auth library (NextAuth, Auth0, Clerk, Devise) — do not hand-roll. Rate-limit authentication. Invalidate sessions on logout, password change, and privilege escalation. Offer MFA. Password reset tokens must be cryptographically random and single-use with a short expiry.

### A08 — Software and Data Integrity Failures

**Detection.** Insecure deserialisation — using language-native binary deserialisers (e.g., Python's object-deserialisation module, Java native serialisation) on untrusted input is a remote code execution surface. JSON-parse with prototype-pollution risk on untrusted input. Unsigned packages or scripts loaded at runtime. CI/CD pipelines that pull and execute from mutable sources (pipe-to-shell of remote scripts).

**Mitigation.** Treat deserialised data as untrusted; validate against a schema before consuming. Prefer JSON or schema-validated formats over native binary deserialisers for any cross-trust-boundary data. Sign artifacts; verify signatures. Pin script sources by hash for any pipe-to-shell.

### A09 — Security Logging and Monitoring Failures

**Detection.** Authentication failures not logged. Sensitive operations (privilege change, data export) not logged. Logs that contain PII or secrets. No alerting on auth-anomaly patterns.

**Mitigation.** Log every authentication attempt (success and failure). Log every privileged operation with actor and target. Strip PII and secrets from logs. Alert on burst-authentication-failure patterns and unusual privileged actions.

### A10 — Server-Side Request Forgery (SSRF)

**Detection.** User input flowing into outbound HTTP requests (`fetch(userInput)`, `axios.get(userInput)`). Webhook URL validation that allows internal IPs. Image-proxying or URL-preview endpoints.

**Mitigation.** Allowlist outbound destinations. Reject URLs that resolve to RFC 1918 private addresses, link-local, or loopback. Use a separate egress-restricted network namespace for user-driven outbound calls.

## The AI-Generated Code Premium

Empirical studies (Stanford/Microsoft 2023, GitClear 2024) report AI-generated code has 1.7-2.74× the security-issue rate of human-authored equivalents. The recurring failure modes:

- **CWE-89 SQL Injection** — string-concatenated queries, the most common AI failure.
- **CWE-79 XSS** — direct DOM injection patterns from user-controlled strings, the second most common.
- **CWE-306 Missing Authentication** — endpoints generated without a thought to who can hit them.
- **CWE-918 SSRF** — user-input URLs passed to fetch with no validation.
- **CWE-22 Path Traversal** — file operations with unsanitised paths.

When reviewing AI-generated diffs, give these five categories deliberate attention. The code "looks fine" because it pattern-matches reasonable code; the security flaw is invisible at the line level and visible only when you ask the security questions explicitly.

## Threat-Modelling a New Feature

Four questions, asked at design time:

1. **What are we building?** A one-paragraph summary of the feature, including who the users are.
2. **What could go wrong?** Walk through STRIDE: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. For each, name a concrete attacker-story.
3. **What are we doing about it?** For each "could go wrong", name the mitigation. Defence in depth — at least two independent controls per category.
4. **Did we do a good job?** What evidence will convince us the mitigations work? Tests, code review, penetration testing, monitoring alerts.

The four questions are due *before* implementation, not during review. A feature without a threat model is shipping its security as a guess.

## Verification

- [ ] Every input boundary (HTTP, CLI, file upload, environment) is identified and the trust posture is explicit
- [ ] Every privileged action has an authorisation check that defaults to deny
- [ ] All database queries are parameterised; no string-concatenated SQL/NoSQL
- [ ] All HTML output is encoded by default; direct DOM injection from user-controlled strings is absent
- [ ] Dynamic-code-evaluation primitives are forbidden on production paths
- [ ] Secrets are loaded from environment, not committed in code or logs
- [ ] Dependencies are scanned on every PR; high/critical CVEs are patched within SLA
- [ ] Authentication is rate-limited; sessions invalidate on logout, password change, privilege escalation
- [ ] Outbound HTTP from user input is allowlisted (no SSRF surface)
- [ ] AI-generated diffs have been audited specifically for the five most-common AI failure modes
- [ ] A threat model exists for the feature being shipped

## Do NOT Use When

| Use instead | When |
|---|---|
| `code-review` | Conducting a holistic per-PR review (security is one concern of many) |
| `debugging` | Investigating a known production failure (security or otherwise) |
| `documentation` | Writing security policy or contributor security guide |
| `testing-strategy` | Deciding broadly what to test (security tests are one slice of strategy) |
| `skill-scaffold` | Authoring a new SKILL.md, including a security-themed skill |
