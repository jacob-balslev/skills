# Security Fundamentals Upstream Check — 2026-06-07

## Sources Checked

- Saltzer and Schroeder, "The Protection of Information in Computer Systems": https://www.cs.virginia.edu/~evans/cs551/saltzer/
- OWASP Top 10:2021: https://owasp.org/Top10/2021/
- OWASP Input Validation Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- NIST SP 800-63B-4: https://pages.nist.gov/800-63-4/sp800-63b.html
- CISA secure-by-design guidance: https://www.cisa.gov/sites/default/files/2023-06/principles_approaches_for_security-by-design-default_508c.pdf
- OWASP Top 10 for Large Language Model Applications: https://owasp.org/www-project-top-10-for-large-language-model-applications/

## Findings

- The core skill remains valid as a portable fundamentals skill: threat modeling, trust boundaries, secure-by-default design, least privilege, complete mediation, input validation, authn/authz separation, and defense in depth are still stable fundamentals.
- OWASP Top 10:2021 is still the stable OWASP web-app awareness document surfaced by OWASP, while newer OWASP category deep-review work belongs in `owasp-security`.
- OWASP LLM security remains a separate specialization. `security-fundamentals` should support its trust-boundary reasoning, but `prompt-injection-defense` should own detailed LLM instruction-channel and tool-authority defenses.
- NIST SP 800-63 has advanced to the `800-63-4` family. The skill's authentication source link should point to the current 800-63B-4 page, not the older 800-63-3 page.
- OWASP's current input-validation guidance reinforces the skill's core claim: untrusted input should be validated early, preferably when received from an external party, and server-side validation remains necessary.

## No Upstream Displacement

No checked source displaced the skill's central model. The required changes are routing/metadata hygiene and source freshness, not a replacement of the teaching content.
