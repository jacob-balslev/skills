# Upstream Displacement Check: Expected Value

Checked 2026-05-27.

## Sources Checked

- OpenAI ChatGPT release notes: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
- Anthropic Claude release notes: https://support.claude.com/en/articles/12138966-release-notes
- OpenCode changelog: https://opencode.ai/changelog

## Result

No displacement found.

Recent model and product releases improve general reasoning, coding, tool use, and agent workflows, but the reviewed official release notes do not provide a native expected-value decision workflow that replaces this skill. The durable value of the skill is the explicit procedure: define actions, model outcomes, assign probabilities and values, subtract costs, test sensitivity, check constraints, and decide whether to choose, mitigate, reject, or gather information.

## Implication

Keep `expected-value` as a portable meta-methods skill. Native reasoning improvements may raise the baseline quality of unaided answers, but they do not remove the need for a routable, auditable method that keeps probability-weighted decisions separate from Bayesian updating, broad prioritization, and second-order consequence discovery.
