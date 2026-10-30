# Day 7 — 2026-10-30 (Fri)

## Metrics
Snapshot `metrics/day-7.json` was already captured at 2026-10-30 23:30 UTC. Diff vs `metrics/day-6.json`.

| Metric | Today | vs yesterday | % of goal |
|---|---|---|---|
| Stars | 2 | +0 | 1.3% (2/150 midpoint of 50-300 expectation) |
| Forks | 0 | +0 | - |
| 14-day views / unique visitors | 17 / 8 | +5 / +1 | 0.8% (8/1,000) |
| 14-day clones / unique cloners | 3,481 / 393 | +216 / +6 | - |
| Installer downloads, cumulative | 113 | +55 | 27.3% (+82 of +300 since baseline) |
| External challenge reproductions | 0 | +0 | 0% (0/5) |
| External issues | 0 | +0 | 0% (0/10) |
| External posts and mentions | 0 | +0 | 0% (0/6) |

Snapshot command: `bun scripts/snapshot.ts` (the day-7 snapshot was captured before this run; not rerun). Top referrers: github.com 5 (4 unique), t.co 1 (1 unique); no specific post attribution. The plan specifies 50-300 stars as an expectation, not a guaranteed target; the midpoint is shown for comparison. Other explicit launch goals are used where available.

## Signals (new)

Queried GitHub issues created since 2026-10-29 in `code-yeongyu/oh-my-openagent` and `code-yeongyu/senpi` with memory/OOM/heap/install/windows/node terms. Added two memory reports to `strategy/signals.md`:

- senpi#5113 reports old RPC agent processes holding 0.5-1.0 GB more than fresh processes on the same session, with memory reporting unavailable if not enabled at process start. One report; fixed mhc DAG is proxy-only.
- senpi#4999 reports repeated tool calls growing host RSS beyond 32 GB and session close timing out. One report; relevance to fixed mhc DAG is unestablished.

Other results were test/CI reports, Windows-specific failures, or unrelated features. No X/Threads/Reddit mention source was available in this run. Today's newest unreproduced memory target is senpi#5113, with the explicit limitation that mhc's fixed DAG benchmark does not reproduce long-lived RPC process reuse.

## PROVE

- Signal: https://github.com/code-yeongyu/senpi/issues/5113 (old RPC processes reportedly use 0.5-1.0 GB more anon memory than fresh processes).
- Command (single 512 MB capped attempt on Linux `omarchy`): `ssh omarchy 'set -eu; run="$HOME/.cache/mhcgtm-day7"; rm -rf "$run"; mkdir -p "$run"; trap '\''rm -rf "$run"'\'' EXIT; git clone --depth 1 https://github.com/Indosaram/mhc "$run/mhc"; cd "$run/mhc"; sed -i '\''s|docker run --rm --name "membench-\$3" --network host|docker run --rm --name "membench-\$3" --network host -m 512m --memory-swap 512m|'\'' tools/membench/bench.sh; grep -- "-m 512m" tools/membench/bench.sh; timeout --signal=TERM --kill-after=10s 1180s env RUNS=1 AGENTS=mhc WORK="$run/work" "$run/mhc/tools/membench/bench.sh"'`.
- Result: the clone completed and the 512 MB cap was verified in `tools/membench/bench.sh`, but the remote session did not return harness output. Follow-up inspection found no running benchmark process or container and no cloned source/log in the run directory, so it is unknown whether the harness reached its measured stage. mhc version, run rc, out_ok, anon peak, and `memory.peak` are unavailable; no reproduction is claimed. This fixed-DAG harness is proxy-only for an RPC process-retention report.
- Cleanup: removed the remaining `~/.cache/mhcgtm-day7` work directory and verified it absent; no `membench` container remained. No retry.

## SHIP material sheet (for the human; nothing posted)

- Channel: **No post today.** Day 7 is the final measurement/retrospective day; the scheduled Show HN and r/rust technical-post dates have passed. Human action today: write a fresh, human-authored retrospective for **r/rust** only if current rules permit and the upstream-author notification prerequisite is resolved; otherwise do not post. Recheck official rules before posting. No text was posted by the agent.
- Message: B, a technical port/memory-model angle, because the +0 star change persisted across multiple days after 10/27. Do not treat the current signal as reproduced or present it as evidence for interactive/RPC memory behavior.
- Measured facts and source links: published fixed-DAG benchmark, 3 runs each, anon peak 83-86 MB (mhc) vs 1,356-1,398 MB (OmO 5.1.35): https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md. Earlier 512 MB challenge: mhc passed 2/2 with `memory.peak` 201-203 MB and anon peak 110-113 MB; OmO reached the cap in 2/2: https://github.com/Indosaram/mhc/blob/main/challenge-512m.md. Reproduction instructions: https://github.com/Indosaram/mhc/blob/main/challenge/README.md.
- Credit both senpi (MIT) and oh-my-openagent (SUL-1.0). Explicitly state parity is incomplete and link https://github.com/Indosaram/mhc/blob/main/docs/parity.md. Do not claim full parity or faster wall time. Link the English README: https://github.com/Indosaram/mhc/blob/main/README.en.md. No post URL/time.

## What we did

| Time (KST) | Action | URL / commit |
|---|---|---|
| 08:30 | Compared pre-captured day-7 metrics with day 6 | `metrics/day-7.json` |
| 08:31 | Queried upstream issues since 10/29; recorded two memory reports | `strategy/signals.md`; https://github.com/code-yeongyu/senpi/issues/5113 |
| 08:32 | Checked omarchy Linux, Docker and cgroup v2; mhc binary is not installed | this log |
| 08:33 | Started one capped harness attempt on omarchy with cleanup trap | this log |
| 08:34 | Prepared human-only retrospective material; nothing posted | this log |

## What we heard

The snapshot reports no external reproductions, issues, posts, or mentions. Rolling 14-day views and unique visitors rose by 5 and 1; clones and unique cloners rose by 216 and 6. Two newly filed upstream reports concern retained memory in long-lived RPC processes and repeated tool-call RSS growth; each is one report, and neither matches the fixed headless mhc workflow directly.

## Decision rule check

| Rule | Triggered? | Numbers | Action |
|---|---|---|---|
| Challenge fails at 512 MB on day 0 | No | Earlier day-0 run passed 2/2; `memory.peak` 201-203 MB | Keep attributed historical result; do not conflate today's proxy run with the original challenge |
| Show HN not on front page by 10/28 01:00 KST | Unknown | Workspace has no confirmed Show HN URL/status | No repost; scheduled campaign passed; human writes only a fresh post if eligible |
| Under +10 stars/day for 2 days in a row after 10/27 | Yes | Days 5 and 6: +0 stars each; day 7 also +0 | Switch from A to B technical angle; avoid unsupported RPC/TUI claims |
| 3+ external issues about same missing feature | No | Day-7 `externalIssues=0` | No feature-driven target change |

## Loop changes

Future runs should preserve the complete harness result log before removing the run directory, including failed measured-stage diagnostics; day 6 showed why warm-up output alone is not enough. This does not justify repeating today's attempt.

## Tomorrow

The 7-day loop ends. Human decision today: whether to write a fresh retrospective for **r/rust**; verify current subreddit rules and resolve upstream-author notification before any public comparison. If posted by the human, reply to comments for six hours. No agent-authored or agent-posted content.
