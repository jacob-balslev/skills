# Prompt-Injection Defense Source Review

Last reviewed: 2026-06-07

## Primary sources checked

- OWASP, `LLM01:2025 Prompt Injection`: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- OWASP Cheat Sheet Series, `LLM Prompt Injection Prevention`: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
- Anthropic Claude API docs, `Mitigate jailbreaks and prompt injections`: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
- NIST, `Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (AI 100-2e2025)`: https://csrc.nist.gov/pubs/ai/100/2/e2025/final
- NCSC, `Prompt injection is not SQL injection (it may be worse)`: https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection
- Greshake et al., `Not what you've signed up for`: https://arxiv.org/abs/2302.12173

## Current synthesis

- OWASP still classifies prompt injection as LLM01 and explicitly includes direct, indirect, multimodal, obfuscated, RAG, sensitive-disclosure, unauthorized-function, and command-execution consequences.
- OWASP's current mitigation guidance emphasizes least privilege, human approval for high-risk actions, segregating external content, adversarial testing, and defense in depth.
- NIST AI 100-2e2025 distinguishes indirect prompt injection through resource control from direct prompting attacks and names integrity and privacy compromise as consequences.
- Anthropic's current docs distinguish direct/jailbreak attempts from indirect prompt injection through third-party content such as web pages, email, documents, and tool results.
- NCSC's 2025 framing strengthens this skill's central claim: prompt injection should not be treated like SQL injection with a single encoding fix; LLM systems should be designed as inherently confusable components with deterministic safeguards around authority and impact.
- The Greshake et al. paper remains an appropriate historical source for the indirect case and remote exploitation of LLM-integrated applications.

## Content decisions

- Keep the skill's main mental model: the model can be tricked; the surrounding runtime must keep compromise from becoming high-impact action or exfiltration.
- Keep prompt wording, input filtering, and classifiers as weak-to-medium layers, not load-bearing solutions.
- Emphasize tool authority, origin tracking, typed handoff, planning/execution separation, output rendering controls, human approval, and adversarial testing.
- Update stale local neighbor names: use `guardrails`, `agent-eval-design`, `owasp-security`, and `security-fundamentals` instead of absent `model-safety` and `api-security` skills.
- Treat external truth as `EXTERNAL_UNHASHED` until a certifying external-source receipt exists.

## Skill Graph lens findings

- Routing for this skill depends on explicit `prompt injection`, `indirect prompt injection`, `untrusted content`, and `tool authority` language; generic wording routes to prompt-writing, eval-design, taxonomy, or autonomous-agent skills.
- The Skill Graph would benefit from a resolver-aware boundary pattern for absent legacy neighbor names, because older skills may still refer to `model-safety` or `api-security` even when the active library uses `guardrails`, `owasp-security`, and `security-fundamentals`.
- Application evals should include red herrings for `tool-call-flow`, `prompt-craft`, and `agent-eval-design` because they are realistic same-subject confusions.
