# Day 5 — 2026-10-28 (Wed)

## Metrics
Snapshot `metrics/day-5.json` was already captured at 2026-10-28 23:30:02 UTC; diff vs `metrics/day-4.json`.

| Metric | Today | vs yesterday | % of goal |
|---|---|---|---|
| Stars | 2 | +0 | 1.3% (2/150) |
| Forks | 0 | +0 | - |
| 14-day views / unique visitors | 15 / 8 | +2 / +2 | 0.8% (8/1,000) |
| 14-day clones / unique cloners | 3,068 / 402 | +510 / +47 | - |
| Installer downloads, cumulative | 52 | +4 | 1.3% (+4 of +300 since baseline) |
| External challenge reproductions | 0 | +0 | 0% (0/5) |
| External issues | 0 | +0 | 0% (0/10) |
| External posts and mentions | 0 | +0 | 0% (0/6) |

Top referrers: github.com 2 (2 unique); remainder none. Snapshot command: `bun scripts/snapshot.ts` (already captured; not rerun). The 7-day expectations document stars only (50-300), not goals for the other metrics; percentages above use the strategy's 150-star midpoint and explicit goal counts where provided.

## Signals (new)

Searched upstream issues created since 2026-10-27 in `code-yeongyu/oh-my-openagent` and `code-yeongyu/senpi` using `gh api ... search/issues` with memory/OOM/heap/install/windows/node terms. Added matching issues to `strategy/signals.md`.

- OmO#11584 reports one interactive TUI process at 4.94-6.35 GB anon RSS around 14 kernel OOM kills; the reporter asks whether the footprint is expected and how to bound it. MEMORY. mhc's fixed headless DAG benchmark is only proxy evidence; an interactive TUI path match is unproven.
- OmO#11651 reports Windows process-tree termination gaps. MEMORY, but Windows-specific path; not an mhc reproduction candidate.
- senpi#4616 reports a compact paged-tree cache bound based on an estimate, not actual heap. MEMORY; no matching mhc workload established.
- senpi#4614 reports TypeScript graph recompilation on child launch. PERF; not directly applicable to Rust mhc.

Other queried Windows, test-infrastructure and UI issues were not added as user pain signals without a matching problem type. No X/Threads/Reddit mention search source is configured here. Top unreproduced type remains MEMORY; newest potentially relevant candidate is OmO#11584, but only as a proxy since its TUI path is not established in mhc.

## PROVE

- Signal: OmO#11584, reported multi-GB anonymous RSS in one interactive TUI session. A comparable mhc interactive workflow is not established, so the fixed DAG benchmark is proxy evidence only.
- Command (Linux omarchy): cloned current mhc at `~/.cache/mhcgtm-day5/mhc`, applied the documented 512 MB/no-swap sed, verified `grep -- '-m 512m' tools/membench/bench.sh`, then ran `RUNS=1 AGENTS=mhc WORK="$HOME/.cache/mhcgtm-day5/work" "$HOME/.cache/mhcgtm-day5/mhc/tools/membench/bench.sh`.
- Result: installed binary version `2026.10.28`. The sole attempted harness run reached the warm-up only: `rc=0 secs=14 peak=117219328 out_ok=no`; `out_ok=no` because the requested workflow tool was unavailable in the benchmark session, so `/bench/work/out.txt` was not produced and no DAG/reproduction result is claimed. Measured-run stage did not execute. Peak equals 117,219,328 bytes in the warm-up cgroup. No meaningful memory.peak for a successful reproduction.
- Cleanup: removed `~/.cache/mhcgtm-day5`, including clone and work/results, and verified absence; no membench containers remained.

## SHIP material sheet (for the human; nothing posted)

- Channel: **No post today.** The signal has not been reproduced, and the Show HN schedule (10/27 22:00 KST) has passed. HN's official page was rechecked at https://news.ycombinator.com/showhn.html: it requires a runnable thing people can try, prohibits vote requests, and says do not repost; human-written content is required by `channels/rules.md`.
- Human action: do not write/post on HN today. If an upstream-author notification and a fresh, relevant reproduction are completed, tomorrow a human may write a new technical-angle post for **Hacker News (Show HN)**; check 10/29 front-page status first and do not repost.
- Message: A remains limited to existing measured headless DAG evidence; do not imply interactive TUI memory was reproduced.
- Measured facts and source links: published fixed-DAG benchmark, 3 runs each, anon peak 83-86 MB (mhc) vs 1,356-1,398 MB (OmO 5.1.35): https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md. Earlier 512 MB challenge: mhc passed 2/2, memory.peak 201-203 MB and anon peak 110-113 MB; OmO reached the cap in 2/2 runs: https://github.com/Indosaram/mhc/blob/main/challenge-512m.md. Reproduction instructions: https://github.com/Indosaram/mhc/blob/main/challenge/README.md.
- Credit senpi (MIT) and oh-my-openagent (SUL-1.0). State parity is incomplete and link https://github.com/Indosaram/mhc/blob/main/docs/parity.md. Do not claim full parity or faster wall time. Link English README: https://github.com/Indosaram/mhc/blob/main/README.en.md. No post URL/time.

## What we did

| Time (KST) | Action | URL / commit |
|---|---|---|
| 08:30 | Reviewed pre-captured metrics and compared with day 4 | `metrics/day-5.json` |
| 08:31 | Queried upstream issues; added relevant rows to signal ledger | `strategy/signals.md` |
| 08:32 | One capped PROVE attempt on omarchy; benchmark stopped at unsuccessful warm-up; cleaned run directory | this log |
| 08:34 | Rechecked official Show HN rules and prepared material sheet; nothing posted | https://news.ycombinator.com/showhn.html |

## What we heard

Metrics contain no external posts, mentions, issues, or meaningful referral sources (2 GitHub referrers). Upstream OmO#11584 reports a single-session multi-GB RSS/OOM problem; no reproduction in mhc was established.

## Decision rule check

| Rule | Triggered? | Numbers | Action |
|---|---|---|---|
| Challenge fails at 512 MB on day 0 | No | Prior day-0 challenge passed 2/2, memory.peak 201-203 MB | Keep historical, attributed evidence; today's attempted warm-up does not change it |
| Show HN not on front page by 10/28 01:00 KST | Unknown / not verified | No HN posting evidence in this workspace | Do not repost; human checks status before any fresh post |
| Under +10 stars/day for 2 days in a row (after 10/27) | Yes | Day 4 +0; day 5 +0 | Switch from A to B for next message; avoid unsupported TUI comparison and use a new technical angle only with relevant proof |
| 3+ external issues about same missing feature | No | 0 external mhc issues | No change |

## Loop changes

Tomorrow's change: before PROVE, require a runnable scenario on the chosen Linux host that exercises the reported mhc-relevant path; distinguish an unavailable workflow tool from a valid benchmark result. The one run hit `out_ok=no`, so do not repeat the same setup or claim a successful reproduction.

## Tomorrow

10/29: human checks Show HN front-page status. No repost. If a new post is justified, human writes a fresh technical angle for Hacker News and handles replies for six hours; upstream notification remains an open prerequisite before public comparison. Choose message B after two consecutive days at +0 stars; do not use interactive-TUI claims without direct evidence.
