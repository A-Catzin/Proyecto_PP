# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | /home/angel/.config/opencode/skills/branch-pr/SKILL.md |
| When a PR would exceed 400 changed lines, when planning chained PRs, stacked PRs, or reviewable slices | chained-pr | /home/angel/.config/opencode/skills/chained-pr/SKILL.md |
| When writing guides, READMEs, RFCs, onboarding docs, architecture docs, or review-facing documentation | cognitive-doc-design | /home/angel/.config/opencode/skills/cognitive-doc-design/SKILL.md |
| When drafting or posting feedback, review comments, maintainer replies, Slack messages, or GitHub comments | comment-writer | /home/angel/.config/opencode/skills/comment-writer/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | /home/angel/.config/opencode/skills/go-testing/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | /home/angel/.config/opencode/skills/issue-creation/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | judgment-day | /home/angel/.config/opencode/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | /home/angel/.config/opencode/skills/skill-creator/SKILL.md |
| When implementing a change, preparing commits, splitting PRs, or planning chained or stacked PRs | work-unit-commits | /home/angel/.config/opencode/skills/work-unit-commits/SKILL.md |
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | /home/angel/.copilot/skills/branch-pr/SKILL.md |
| When a PR would exceed 400 changed lines, when planning chained PRs, stacked PRs, or reviewable slices | chained-pr | /home/angel/.copilot/skills/chained-pr/SKILL.md |
| When writing guides, READMEs, RFCs, onboarding docs, architecture docs, or review-facing documentation | cognitive-doc-design | /home/angel/.copilot/skills/cognitive-doc-design/SKILL.md |
| When drafting or posting feedback, review comments, maintainer replies, Slack messages, or GitHub comments | comment-writer | /home/angel/.copilot/skills/comment-writer/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | /home/angel/.copilot/skills/go-testing/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | /home/angel/.copilot/skills/issue-creation/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | judgment-day | /home/angel/.copilot/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | /home/angel/.copilot/skills/skill-creator/SKILL.md |
| When implementing a change, preparing commits, splitting PRs, or planning chained or stacked PRs | work-unit-commits | /home/angel/.copilot/skills/work-unit-commits/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue (status:approved) — no exceptions
- Every PR MUST have exactly one `type:*` label
- Automated checks must pass before merge
- Branch naming: `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$`
- Use conventional commits: `type(scope): description` — lowercase, no spaces
- PR body template: summary of changes, testing done, related issues

### chained-pr
- MUST split when PR exceeds 400 changed lines unless `size:exception` is maintainer-approved
- Every chained PR MUST state what came before, what it covers, and what comes next
- Every chained PR MUST be understandable and verifiable on its own (autonomous)
- One deliverable work unit per PR — do NOT mix unrelated refactors, features, tests, or docs
- Every chained PR MUST include a dependency diagram that marks the current PR
- In Feature Branch Chain: PR #1 targets feature/tracker branch; children target the immediate previous PR branch
- If a child PR shows previous PR changes in its diff, its base is wrong — retarget/rebase
- Design for ≤60-minute human review per PR

### cognitive-doc-design
- Lead with the answer: put the decision/action/outcome first, context after
- Progressive disclosure: happy path first, then details, edge cases, references
- Chunking: group related info into small sections; keep flat lists short
- Signposting: use headings, labels, callouts, summaries so readers know where they are
- Recognition over recall: prefer tables, checklists, examples, templates over prose
- Review empathy: design so reviewers can verify intent without reconstructing the whole story
- Default structure: outcome title → quick path (numbered) → details (table) → checklist → next step

### comment-writer
- Start with the actionable point — do NOT recap the whole context before feedback
- Be warm and direct, sound like a thoughtful teammate not a corporate bot
- Keep it short: 1-3 short paragraphs or a tight bullet list
- Explain WHY when requesting a change (technical reasoning)
- Avoid pile-ons: comment on highest-value issue, not every tiny preference
- Match thread language; for Spanish use Rioplatense voseo: podés, tenés, fijate, dale
- No em dashes — use commas, periods, or parentheses
- Formula: observation/request → why it matters (if needed) → concrete next action

### go-testing
- Table-driven tests: `[]struct{name, input, expected, wantErr}` + `t.Run(tt.name, ...)`
- Test Bubbletea TUIs with `teatest` for model testing, golden files for rendering
- Use `httptest` for HTTP integration tests, `t.TempDir()` for temp directories
- Golden files: write `.golden` in `testdata/`, compare with `testify` or manual diff
- Prefer `require` for fatal assertions, `assert` for non-fatal

### issue-creation
- Blank issues are disabled — MUST use template (bug report or feature request)
- Every issue gets `status:needs-review` on creation
- Maintainer MUST add `status:approved` before any PR can be opened
- Search existing issues for duplicates first
- Fill in ALL required fields in the template
- Questions go to Discussions, not issues

### judgment-day
- Launch TWO sub-agents via `delegate` (async, parallel — never sequential)
- Each agent receives same target, works independently and blindly — NO cross-contamination
- NEVER do the review yourself as orchestrator — coordination only
- After both return: Confirmed (both found) → fix; Suspect (one found) → triage; Contradiction → flag
- Follow Skill Resolver Protocol before launching: search engram for skill-registry, inject compact rules into judge prompts
- If no registry: warn user and proceed with generic review
- Judges classify: CRITICAL (blocking, must fix) or WARNING (improvement, should fix)
- Max 2 iterations; escalation to human if disagreement persists after 2 rounds

### skill-creator
- Create skill when: pattern repeats, project conventions differ from generic best practices, complex workflows need step-by-step
- Don't create: for already-documented patterns, trivial tasks, one-off tasks
- Structure: `skills/{name}/SKILL.md` with frontmatter (name, description with Trigger:, license, metadata)
- SKILL.md sections: When to Use (bullets), Critical Patterns (rules AI MUST know)
- Description's Trigger field tells AI when to load this skill
- Reference local docs via `references/docs.md`

### work-unit-commits
- Commit by work unit (deliverable behavior/fix/migration/docs), NOT by file type
- Keep tests in the SAME commit as the code they verify
- Keep docs in the SAME commit as the user-visible change they explain
- Each commit tells a story — reviewer understands why it exists from diff + message
- Each commit should be a candidate chained PR when the change grows
- If SDD tasks forecast >400-line change, group commits into chained PR slices before implementation
- Pre-commit checklist: one purpose, repo works with just this commit, rollback reasonable

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| context.md | /home/angel/Escritorio/Proyecto_PP/context.md | Full project specification |

No convention files (AGENTS.md, CLAUDE.md, .cursorrules, GEMINI.md, copilot-instructions.md) found in project root. The `context.md` file serves as the project's primary specification document.

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
