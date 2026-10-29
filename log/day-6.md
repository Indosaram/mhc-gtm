# Day 6 — 2026-10-29 (Thu)

## Metrics
Snapshot `metrics/day-6.json` was already captured at 2026-10-29 23:30 UTC. Diff vs `metrics/day-5.json`.

| Metric | Today | vs yesterday | % of goal |
|---|---|---|---|
| Stars | 2 | +0 | 1.3% (2/150 midpoint) |
| Forks | 0 | +0 | - |
| 14-day views / unique visitors | 12 / 7 | -3 / -1 | 0.7% (7/1,000) |
| 14-day clones / unique cloners | 3,265 / 387 | +197 / -15 | - |
| Installer downloads, cumulative | 58 | +6 | 9.0% (+27 of +300 since baseline) |
| External challenge reproductions | 0 | +0 | 0% (0/5) |
| External issues | 0 | +0 | 0% (0/10) |
| External posts and mentions | 0 | +0 | 0% (0/6) |

Top referrers: github.com 3 (3 unique), t.co 1 (1 unique); no source can be attributed to a specific post. Snapshot command: `bun scripts/snapshot.ts` (run once to verify the pre-captured snapshot; it returned the same values). The 7-day plan sets a 50-300 star expectation, not formal goals for most other metrics; percentage uses 150-star midpoint and explicit launch targets.

## Signals (new)

Queried GitHub issues created since 2026-10-29 in `code-yeongyu/oh-my-openagent` and `code-yeongyu/senpi` with memory/OOM/heap/install/windows/node terms. Added OmO#11824 to `strategy/signals.md`: one issue reports an interactive TUI retaining each full `message_update` partial and growing JS heap beyond 8 GB during a long stream. This is a single report, not evidence of multiple affected users. The matching interactive TUI path is not established in mhc; the fixed headless DAG is proxy-only. Other same-day matches were Windows-specific, CI/test infrastructure, or had no established mhc workload match. No X/Threads/Reddit search source was available in this run.

- Target: OmO#11824 as the newest unreproduced memory report, with the relevance limitation above.

## PROVE

- Signal: https://github.com/code-yeongyu/oh-my-openagent/issues/11824 (interactive TUI retains full partial streaming messages; reported >8 GB JS heap).
- Command (one capped harness attempt on Linux `omarchy`): `ssh omarchy 'set -eu; run="$HOME/.cache/mhcgtm-day6"; rm -rf "$run"; mkdir -p "$run"; trap '\''rm -rf "$run"'\'' EXIT; git clone --depth 1 https://github.com/Indosaram/mhc "$run/mhc"; cd "$run/mhc"; sed -i '\''s|docker run --rm --name "membench-\$3" --network host|docker run --rm --name "membench-\$3" --network host -m 512m --memory-swap 512m|'\'' tools/membench/bench.sh; grep -- "-m 512m" tools/membench/bench.sh; timeout --signal=TERM --kill-after=10s 1180s env RUNS=1 AGENTS=mhc WORK="$run/work" "$run/mhc/tools/membench/bench.sh"; rc=$?; echo "BENCH_RC=$rc"; exit 0'`.
- Result: current cloned mhc source was `7ebf8be`; installed binary version was `2026.10.28`. The cap check passed (`-m 512m --memory-swap 512m`). The harness warm-up reported `rc=0 secs=19 peak=241471488 out_ok=no`. The one measured workflow also failed before writing its expected output: its fixed DAG requires a workflow tool unavailable in this benchmark session; the model returned HTTP 429 `RESOURCE_EXHAUSTED` for its quick category. No comparable interactive TUI reproduction was established. The measured-run result file was removed by the cleanup trap, so measured-run rc/out_ok/anon peak/memory.peak are unavailable and are not claimed.
- Cleanup: the EXIT trap removed `~/.cache/mhcgtm-day6` (clone and work/results); verified the path absent and no `membench` container remained. No retry.

## SHIP material sheet (for the human; nothing posted)

- Channel: **No post today.** Prepare tomorrow's human-written technical retrospective for **r/rust**, not an HN repost: the scheduled Show HN date passed and current signal is not an mhc reproduction. `channels/rules.md` limits r/rust to a Rust topic and prohibits AI-generated / low-quality posts. Recheck current subreddit rules before writing/posting. No content was posted.
- Human action: write a fresh, human-authored retrospective on porting a TypeScript agent harness to Rust and the measured process-memory behavior, only using the existing benchmark facts below. Do not present it as proof of the interactive-TUI report. Confirm upstream author notification before any public comparison; this prerequisite remains open.
- Message: B, technical port and memory-model angle (two consecutive days under +10 stars/day already triggered the message switch). No star/vote request; no claim of full parity or faster wall time.
- Measured facts and source links: published fixed-DAG benchmark, 3 runs each, anon peak 83-86 MB (mhc) vs 1,356-1,398 MB (OmO 5.1.35): https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md. Earlier 512 MB challenge: mhc passed 2/2, `memory.peak` 201-203 MB and anon peak 110-113 MB; OmO reached the cap in 2/2 runs: https://github.com/Indosaram/mhc/blob/main/challenge-512m.md. Instructions: https://github.com/Indosaram/mhc/blob/main/challenge/README.md.
- Credit senpi (MIT) and oh-my-openagent (SUL-1.0). Explicitly state parity is incomplete and link https://github.com/Indosaram/mhc/blob/main/docs/parity.md. Link English README: https://github.com/Indosaram/mhc/blob/main/README.en.md. No post URL/time.

## What we did

| Time (KST) | Action | URL / commit |
|---|---|---|
| 08:30 | Reviewed captured day-6 metrics and ran snapshot once for verification | `metrics/day-6.json`; `bun scripts/snapshot.ts` |
| 08:31 | Queried upstream issues since 10/29; added one relevant report | `strategy/signals.md`; https://github.com/code-yeongyu/oh-my-openagent/issues/11824 |
| 08:32 | One capped PROVE harness attempt on omarchy; workflow failed, cleanup trap removed run directory | this log |
| 08:34 | Rechecked Show HN official rules; prepared material only, nothing posted | https://news.ycombinator.com/showhn.html |

## What we heard

The captured metrics show no external issues, challenge reproductions, posts, or mentions. Views decreased by 3 and unique visitors by 1 across the rolling 14-day window; clones increased by 197 while unique cloners decreased by 15. A single upstream issue reports a large interactive TUI heap; today's fixed DAG harness could not reproduce that workload.

## Decision rule check

| Rule | Triggered? | Numbers | Action |
|---|---|---|---|
| Challenge fails at 512 MB on day 0 | No | Historical day-0 run passed 2/2, `memory.peak` 201-203 MB | Preserve prior attributed result; today's unrelated harness failure does not change it |
| Show HN not on front page by 10/28 01:00 KST | Unknown | No confirmed HN post URL in workspace; item lookup was not a confirmed mhc post | Do not repost; tomorrow's retro material is a new technical angle, and human verifies channel eligibility |
| Under +10 stars/day for 2 days in a row after 10/27 | Yes | Day 5 +0; day 6 +0 | Continue message B technical angle; avoid unsupported TUI claims |
| 3+ external issues about same missing feature | No | `externalIssues=0` | No feature-driven target change |

## Loop changes

Tomorrow, preserve benchmark `*.result` evidence before cleanup so a failed measured run's rc/out_ok and memory figures remain auditable. The day-6 run exposed a workflow-tool/quota mismatch; do not retry the same unsupported workload or claim it as a reproduction.

## Tomorrow

10/30: human writes a fresh r/rust technical retrospective if current rules permit, based on the published fixed-DAG and 512 MB evidence only; no Show HN repost. Human writes and posts, then handles replies for six hours. Resolve upstream notification before public comparison. Day-7 final measurement is still due.
