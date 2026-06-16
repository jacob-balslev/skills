---
# name: stable skill identifier. Match the skill directory name or the final namespace segment.
# Lowercase letters/numbers with hyphen, slash, or colon separators.
name: secrets-management
# description: routing-facing summary of what the skill covers and when it activates.
# Include concrete triggers and an explicit negative boundary; keep routing semantics out of prose-only ambiguity.
description: "Managing the full lifecycle of sensitive credentials — API keys, database passwords, tokens, certificates, signing keys, and encryption keys — so they are never exposed in code, logs, images, or version history. Covers the secret lifecycle (generation, storage, distribution, use, rotation, revocation, audit), the cardinal rule of never hardcoding secrets, externalizing values out of source into a secrets manager or vault, encryption at rest and in transit, least-privilege scoping per consumer, short-lived dynamically-issued credentials over long-lived static ones, automated rotation and emergency revocation, workload identity (OIDC/SPIFFE) to eliminate standing credentials, environment-variable and .env pitfalls, secret scanning and leak detection in commits and CI, blast-radius containment when a secret leaks, and audit logging of secret access. Tool-agnostic across HashiCorp Vault, cloud secret managers, and KMS-backed stores."
# license: SPDX license identifier (e.g., MIT, Apache-2.0).
license: MIT
# compatibility: runtime compatibility object. Prefer structured fields
# (`runtimes`, `node`) over free-text `notes`.
compatibility:
  notes: "Secrets-management discipline is platform-agnostic. The lifecycle, least-privilege, short-lived-credential, rotation, and leak-containment principles apply to HashiCorp Vault, AWS/GCP/Azure secret managers and KMS, Kubernetes secrets + external-secrets, and dotenv-based local dev alike; specific product APIs are illustrative — substitute your platform's vault, KMS, and identity primitives."
allowed-tools: Read Grep

# === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
# subject: primary browse shelf — what the skill teaches. One of twelve closed values:
# backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
# quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
subject: quality-assurance
# public: publishability/private-data gate. Boolean.
# true = publishable/shareable; false = private and excluded from public export.
# Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
public: true
# scope: free-text PRD-style statement of what the skill teaches and what it excludes.
# (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
scope: "Managing the lifecycle of sensitive credentials so they never leak into code, logs, build artifacts, or version control. Teaches: what counts as a secret (API keys, DB passwords, tokens, TLS/signing/encryption keys) vs ordinary config; the cardinal never-hardcode rule and why a committed credential is compromised the moment it is pushed; externalizing secret VALUES out of source into a dedicated secrets manager/vault while config references stay in code; encryption of secrets at rest and in transit; least-privilege scoping so each consumer holds only the secrets it needs; preferring short-lived, dynamically-issued credentials over long-lived static ones; automated rotation on a schedule and emergency revocation on compromise; workload identity (OIDC token exchange, SPIFFE/SVID, instance identity) to remove standing credentials entirely; the environment-variable and .env file pitfalls (process/log/crash-dump leakage, plaintext-in-git-history); secret scanning and leak detection in commits and CI; blast-radius containment and the rotate-everything response when a secret leaks; and audit logging of who accessed which secret when. Tool-agnostic. Excludes the authentication PROTOCOL design (session/token/OAuth flows), the authorization model (RBAC/ABAC/RLS), cryptographic-primitive design (which cipher/mode/KDF to implement), the CI pipeline orchestration that merely consumes short-lived CI credentials (ci-cd-pipelines), and general non-sensitive application configuration."
# taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
# lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
# `subject` is sufficient.
taxonomy_domain: security/secrets

# grounding: required when `project[]` is non-empty. Declares the truth sources
# the skill anchors to and the failure modes those sources prevent. Omit when the
# skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
grounding:
  subject_matter: "Lifecycle management of sensitive credentials: generation, storage, distribution, rotation, revocation, leak detection, and audit"
  grounding_mode: universal
  truth_sources:
    - path: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
      note: "OWASP Secrets Management Cheat Sheet — the canonical practitioner reference for the secret lifecycle, storage, rotation, leakage, and access control; grounds the lifecycle and least-privilege sections."
    - path: "https://cwe.mitre.org/data/definitions/798.html"
      note: "CWE-798 Use of Hard-coded Credentials — grounds the cardinal never-hardcode rule and why a committed credential is a vulnerability class, not a style issue."
    - path: "https://12factor.net/config"
      note: "Twelve-Factor Config — strict separation of config (incl. secrets) from code, injected from the environment; grounds the externalize-the-value principle (and its limits)."
    - path: "https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final"
      note: "NIST SP 800-57 Part 1 (Key Management) — grounds key/credential rotation cadence, crypto-period, and key-lifecycle states for the rotation and revocation sections."
    - path: "https://developer.hashicorp.com/vault/docs/concepts/dynamic-secrets"
      note: "HashiCorp Vault dynamic secrets — grounds short-lived, on-demand, automatically-revoked credentials as the preferred alternative to long-lived static secrets."
    - path: "https://spiffe.io/docs/latest/spiffe-about/overview/"
      note: "SPIFFE/SVID workload identity — grounds eliminating standing credentials via cryptographically-attested workload identity (the same idea behind OIDC token exchange in CI)."
    - path: "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"
      note: "OWASP Top 10 A07 — grounds the breach context: weak/leaked/long-lived credentials as a top application-security risk class."
  failure_modes:
    - "Hardcoding a key in source or committing a .env file so the secret lives in git history forever"
    - "One long-lived broadly-scoped admin credential shared across every service so a single leak compromises everything"
    - "Treating an environment variable as 'secure' while it leaks into logs, crash dumps, and child processes"
  evidence_priority: general_knowledge_first

# stability: lifecycle marker. One of:
# experimental (active development) / stable (production-ready) /
# frozen (no further changes expected) / deprecated.
# When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
stability: experimental

# keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
# Keep terms a user would actually type when starting a task in this skill's domain.
keywords:
  - secrets management
  - api key storage
  - secret rotation
  - vault
  - hardcoded credentials
  - environment variables secrets
  - least privilege credentials
  - short-lived credentials
  - secret scanning
  - leaked secret response

# examples: 2-5 realistic user prompts the skill SHOULD activate for.
# Written in the user's voice. Improves retrieval recall beyond keywords alone.
examples:
  - "Where should we store our API keys instead of the .env file we committed?"
  - "We leaked a database password in a public repo — what's the response?"
  - "Set up automated rotation for our service credentials"
  - "Move our app from long-lived cloud keys to short-lived workload identity"
  - "How do I keep secrets out of logs and container images?"

# anti_examples: near-miss prompts that should route ELSEWHERE.
# Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
anti_examples:
  - "Design the OAuth2 authorization-code flow for our login"
  - "Pick an RBAC vs ABAC model for org-scoped permissions"
  - "Implement AES-GCM encryption for this payload"
  - "Set up the GitHub Actions deploy pipeline stages"

# === Understanding fields (when comprehension_state: present) ===
# mental_model: the primitives of the concept and how they relate. One paragraph.
mental_model: "A secret is any value that grants access — a password, API key, token, certificate, or cryptographic key. Secrets management is the discipline of governing that value's entire lifecycle (mint → store → distribute → use → rotate → revoke → audit) so the value never lands anywhere it can be read by the wrong party: not in source code, not in logs, not in a container image, not in version history. The strongest form replaces long-lived static secrets with short-lived, dynamically-issued credentials scoped to least privilege, so a leaked credential is both narrow and already near-expiry."
# purpose: the problem this concept solves and why the field exists. One paragraph.
purpose: "Leaked and mismanaged credentials are the dominant breach vector: a hardcoded key in a repo, a long-lived admin token shared across services, or a password in a log file. Secrets management exists to remove standing exposure — centralize secrets in an auditable store, scope each to the minimum it needs, shorten its life so a leak is self-limiting, rotate it routinely, revoke it instantly on compromise, and detect leaks before attackers do. It converts credentials from a sprawling, untracked liability into a governed, observable asset."
# concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
# the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
concept_boundary: "Secrets-management owns the LIFECYCLE OF THE CREDENTIAL VALUE — generation, storage, scoping, rotation, revocation, leak detection, audit — independent of how the credential is used. It does NOT own the authentication protocol (how a session/token/OAuth flow is designed), the authorization model (RBAC/ABAC/RLS deciding what an identity may do), cryptographic-primitive design (which cipher or KDF to implement), or the CI orchestration that merely consumes a short-lived credential. The distinguishing mechanism: it governs the handling of a VALUE that grants access, not the protocols, policies, or algorithms that the value participates in."
# analogy: one-sentence metaphor preserving the core mechanism.
analogy: "A hotel key-card system: each guest gets a card scoped to one room, it expires at checkout, it can be revoked instantly if lost, every use is logged, and the master key is never handed out or photocopied — you manage the cards' lifecycle, not the lock's internal mechanism."
# misconception: the wrong mental model people bring; corrected explicitly.
misconception: "That moving a secret into an environment variable or a .env file 'secures' it. Externalizing the value out of source is necessary but nowhere near sufficient: an environment variable is readable by the whole process and its children, leaks into logs, crash dumps, and error reports, and a committed .env is a plaintext credential preserved in git history forever. Real security requires the value to be stored encrypted, scoped to least privilege, short-lived, rotated, revocable, and audited — not merely relocated from line 1 of the code to line 1 of a dotfile."

# relations: typed graph edges to sibling skills. Current fields:
# related (adjacency for browse / co-routing expansion) /
# suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
#             as "I own this exclusively over X", not "use X instead") /
# boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
# verify_with (cross-check; co-loaded as one-hop expansion) /
# depends_on (composition; transitive — A→B→C loads all three) /
# broader / narrower (SKOS-style generalization) /
# disjoint_with (mutual exclusion for incompatible ownership).
relations:
  related: ["owasp-security", "security-fundamentals", "dependency-architecture"]
  suppresses: []
  verify_with: ["owasp-security", "security-fundamentals"]
  depends_on: []
---

# Secrets Management

## Concept of the skill

A **secret** is any value that grants access or trust: an API key, a database password, an OAuth client secret, a session-signing key, a TLS private key, an encryption key, a webhook signing secret. Secrets management is the discipline of governing each secret's **entire lifecycle** — generation, storage, distribution, use, rotation, revocation, and audit — so the value never lands anywhere it can be read by the wrong party.

The single hardest truth: **a secret in source code is compromised the moment it is pushed.** Even if you delete it in the next commit, it lives in the repository's history, in every clone, in CI caches, and possibly in a fork. Treat a committed credential as already leaked — rotate it, do not just remove it.

## Coverage

- **What is a secret** vs ordinary config — the line is "does this value grant access or trust?"
- **The lifecycle:** generation (strong, random) → storage (encrypted, centralized) → distribution (scoped, just-in-time) → use → rotation → revocation → audit.
- **Never hardcode** — secrets do not belong in source, config files in the repo, container images, or front-end bundles.
- **Externalize the value** into a dedicated secrets manager / vault / KMS; the code holds a *reference*, not the value.
- **Encryption** at rest and in transit; envelope encryption with a KMS-held master key.
- **Least privilege** — each consumer holds only the secrets it needs, scoped as narrowly as possible.
- **Short-lived over long-lived** — prefer dynamically-issued, auto-expiring credentials to static ones.
- **Workload identity** — OIDC token exchange, SPIFFE/SVID, cloud instance identity — to eliminate standing credentials entirely.
- **Rotation** on a schedule and **revocation** on compromise.
- **Environment-variable and .env pitfalls** — process/log/crash-dump leakage; plaintext-in-git-history.
- **Secret scanning** in commits and CI; leak detection.
- **Leak response** — blast-radius containment and the rotate-everything playbook.
- **Audit logging** — who accessed which secret, when.

## Philosophy of the skill

**Assume every secret will eventually leak, and design so that leak is survivable.** This single assumption drives every practice: short lifetimes mean a leaked credential is near-expiry; least privilege means a leaked credential is narrow; rotation means a leaked credential is soon-invalid; audit logging means you can tell what a leaked credential touched. A secrets program is not judged by whether a leak ever happens — it is judged by how contained and detectable a leak is when it does.

**The best secret is one that does not exist as a standing value.** A long-lived static API key is the worst case: broad, durable, and hard to rotate. A short-lived credential minted on demand for a specific workload via OIDC/SPIFFE is the best case: there is no standing secret to steal. Move toward "no standing credentials" wherever the platform allows it.

## The secret lifecycle

```
generate ─► store (encrypted, central) ─► distribute (scoped, JIT) ─► use
                                                                        │
                  audit ◄── revoke (on compromise) ◄── rotate (scheduled)
```

Each stage has a failure mode: weak generation (guessable), plaintext storage (readable), over-broad distribution (one leak compromises everything), no rotation (a stolen credential is valid forever), no revocation (you can't stop a known-compromised credential), no audit (you can't tell what a leaked credential accessed).

## Never hardcode — and what "externalize" really means

Externalizing a secret means the *value* moves out of code into a managed store; the code holds only a *reference* (a key name the runtime resolves against the vault). Putting the value in a `.env` file is a half-measure that is acceptable only for *local development* with non-production credentials — and `.env` must be git-ignored. A production secret belongs in a secrets manager the runtime reads via a scoped, audited request, ideally exchanging a workload identity for a short-lived lease.

## Least privilege and scoping

Do not mint one admin credential and share it everywhere. Each service, job, or environment gets its own credential scoped to exactly what it needs (this database, read-only; this bucket, this prefix). When a narrowly-scoped credential leaks, the blast radius is one capability, not the whole estate.

## Short-lived over long-lived

A static secret that never changes is a permanent liability. Prefer credentials that are **dynamically issued and auto-expiring**: a vault mints a database credential valid for an hour and revokes it automatically; a CI job exchanges an OIDC token for a cloud session that lasts only the run. Short lifetimes turn "rotate everything" from a crisis into the normal steady state.

## Rotation and revocation

**Rotation** replaces a secret on a schedule (or after a suspected exposure) so no credential is valid indefinitely; rotation must be possible without downtime (overlapping validity windows). **Revocation** is the emergency lever — invalidate a known-compromised credential immediately. A secrets program without a tested rotation *and* revocation path is not production-ready: you will not be able to respond to a leak.

## The environment-variable trap

Environment variables are *not* a security boundary. They are visible to the whole process and inherited by child processes, they leak into logs and crash/error reports, and a process listing or debug dump can expose them. They are a reasonable *transport* for a secret a managed runtime injects just-in-time — but treating "it's in an env var" as "it's secure" is the most common misconception in this domain.

## Detection: secret scanning

Scan commits and CI for accidentally-committed secrets (high-entropy strings, known key formats). Catching a leak at commit time is vastly cheaper than after it ships. Pair pre-commit scanning with provider-side push protection and periodic history scans.

## Leak response

When a secret leaks (committed, logged, screenshotted), the response is **rotate, do not just delete**:

1. **Rotate** the leaked credential immediately — the old value is compromised regardless of whether you remove it from the repo.
2. **Revoke** the old value so it cannot be used.
3. **Audit** what the leaked credential could and did access (blast radius).
4. **Contain** — if it was broadly scoped, assume everything it could reach is suspect.
5. **Prevent recurrence** — add scanning, narrow the scope, shorten the lifetime.

Removing the secret from the latest commit does nothing: it is still in history and already copied.

## Verification

A secrets posture is sound when you can answer yes to:

- Are there zero secrets in source, repo config, images, or front-end bundles? (run a scan to prove it)
- Is every production secret stored encrypted in a managed store, referenced — not embedded — by code?
- Is each credential scoped to least privilege, not a shared admin key?
- Are credentials short-lived (dynamic/auto-expiring) wherever the platform allows, or at least on a tested rotation schedule?
- Is there a tested revocation path for an emergency?
- Is secret access audited?
- Is there a written leak-response playbook that starts with "rotate," not "delete"?

If any answer is no, name the gap before calling the system secure.

## Do NOT Use When

- The task is designing the **authentication protocol** (session/token/OAuth flow) — that is an auth-patterns concern, not the credential lifecycle.
- The task is the **authorization model** (RBAC/ABAC/RLS — what an identity may do) — out of scope; this skill governs the secret value, not the permission policy.
- The task is **cryptographic-primitive design** (which cipher, mode, or KDF to implement) — that is a cryptography concern; here we *use* KMS/encryption, we don't design the algorithm.
- The task is the **CI pipeline orchestration** itself — that is `ci-cd-pipelines`; this skill owns only the secret/credential slice it consumes.
- The value is **ordinary non-sensitive configuration** — that is general config management, not secrets.

## References

- OWASP Secrets Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- CWE-798 Use of Hard-coded Credentials: https://cwe.mitre.org/data/definitions/798.html
- Twelve-Factor — Config: https://12factor.net/config
- NIST SP 800-57 Part 1 (Key Management): https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final
- HashiCorp Vault — Dynamic Secrets: https://developer.hashicorp.com/vault/docs/concepts/dynamic-secrets
- SPIFFE — Workload Identity: https://spiffe.io/docs/latest/spiffe-about/overview/
- OWASP Top 10 A07 (Identification & Authentication Failures): https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/
