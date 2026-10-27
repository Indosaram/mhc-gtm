# Day 3 — 2026-10-27 (Tue)

## Metrics
Snapshot metrics/day-3.json (captured 2026-10-27 02:06:54 UTC, `bun scripts/snapshot.ts`); diff vs metrics/day-2.json.

| Metric | Today | vs yesterday | % of goal |
|---|---|---|---|
| Stars | 2 | +0 | 1.3% (2/150) |
| Forks | 0 | +0 | - |
| 14-day views / unique visitors | 13 / 6 | +0 / +0 | 0.6% (6/1,000) |
| 14-day clones / unique cloners | 2,262 / 340 | -219 / +2 | - |
| Installer downloads, cumulative | 45 | +7 | 2.3% (+7 of +300 since baseline) |
| External challenge reproductions | 0 | +0 | 0% (0/5) |
| External issues | 0 | +0 | 0% (0/10) |
| External posts and mentions | 0 | +0 | 0% (0/6) |

Top 5 referrers: none (empty); no channel drove traffic. Snapshot command: `bun scripts/snapshot.ts`.

## Signals (new)

Searched GitHub issues in `code-yeongyu/oh-my-openagent` and `code-yeongyu/senpi` using `gh api ... search/issues` with `created:>=2026-10-26` and memory/OOM/heap/install/windows/node terms. Added to strategy/signals.md:
- OmO#11384 (external reporter): on POSIX a SIGTERM-ignoring descendant survives the memory reflection hard deadline. MEMORY; mhc relevance unconfirmed.
- OmO#11383 (external reporter): a weekly model-family usage limit without the family name is classified as account-wide; fallback skips same-provider models. OTHER; mhc relevance unconfirmed.

Reddit/Threads/X mention search not performed; this session has no source/search tool for those platforms. The queried GitHub search did not surface a new memory/OOM/heap/install/windows/node issue in senpi. Day-3 top unreproduced pain type remains MEMORY; the newest applicable signal is OmO#11384.

## PROVE

- Signal: OmO#11384, POSIX memory-supervisor descendant surviving a reflection deadline. A matching minimal reproduction is not defined for mhc's CLI harness; mhc relevance is unconfirmed. One capped Linux harness setup was attempted, but the existing `tools/membench/bench.sh` fails during home preparation before launching the benchmark: `rm: cannot remove '/home/indo/.cache/mhcgtm-day3/work/template/.omo/agent/git/github.com/code-yeongyu': Directory not empty`.
- Command (omarchy, Linux): `RUNS=1 AGENTS=mhc WORK="$HOME/.cache/mhcgtm-day3/work" MHC_DIR="$HOME/.local/share/mhc" tools/membench/bench.sh` from a fresh clone at `9fc8130`, after applying the 512 MB / no-swap sed and verifying `grep -- "-m 512m" tools/membench/bench.sh`.
- Result: no reproduction launched, so mhc version for this run, rc/out_ok, anon peak and memory.peak are not applicable. Installed binary version observed separately: `2026.10.27-1`. No benchmark result is claimed.
- Cleanup: removed `~/.cache/mhcgtm-day3`; verified the directory absent and no `membench-*` containers remain. The sole attempted harness setup failed before running the workload; no retry.

## SHIP material sheet (for the human; nothing posted)

- Today's channel: **Hacker News Show HN**, scheduled 22:00 KST / 13:00 UTC. Official rules page rechecked at https://news.ycombinator.com/showhn.html: the project must be something people can try, title begins “Show HN”, and vote requests are prohibited. No post was written or submitted by the agent.
- Message: **A**, technically framed around one native process versus one JS runtime per child; do not claim complete parity or faster wall time.
- Measured facts and sources:
  - Published benchmark: anon peak 83-86 MB (mhc) vs 1,356-1,398 MB (OmO 5.1.35), 3 runs each, Linux x86_64, 2026-10-19: https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md
  - 512 MB cap, 3-child DAG: mhc passed 2/2, memory.peak 201-203 MB, anon peak 110-113 MB; OmO reached the 512 MB cap in 2/2 runs, with one killed before finishing and one that printed DONE but did not exit (metrics/challenge-512m.md).
  - Reproduction instructions: https://github.com/Indosaram/mhc/blob/main/challenge/README.md (apply the documented sed adding `-m 512m --memory-swap 512m` before `RUNS=2 ./bench.sh`).
  - Why: mhc runs parent and DAG children in one process; OmO starts a JS runtime per child (docs/memory-benchmark.md, “One process vs one runtime per child”).
- Credit line facts: mhc is a Rust port of senpi (MIT) and oh-my-openagent (SUL-1.0); credit both in the opening paragraph.
- Parity line: not full parity; status is at https://github.com/Indosaram/mhc/blob/main/docs/parity.md. Wall time is about equal; do not say “faster”. Link https://github.com/Indosaram/mhc/blob/main/README.en.md because the default README is Chinese.
- Owner action before the first public comparison remains open: notify the upstream author. Show HN needs a human-written post and human replies for six hours. No URL/time because nothing was posted.

## What we did

| Time (KST) | Action | URL / commit |
|---|---|---|
| 11:06 | Re-ran metrics snapshot | metrics/day-3.json |
| 11:07-11:09 | GitHub signal searches; rechecked Show HN rules | strategy/signals.md; https://news.ycombinator.com/showhn.html |
| 11:09 | One capped PROVE harness setup on omarchy; failed before workload; run directory cleaned | this log |
| 11:10 | Prepared Show HN material sheet; nothing posted | this log |

## What we heard

No external posts, mentions, issues or referrers in the captured metrics. New upstream issues are listed above; no mhc reproduction result today.

## Decision rule check

| Rule | Triggered? | Numbers | Action |
|---|---|---|---|
| Challenge fails at 512 MB (day 0) | No | Prior day-0 mhc 2/2 out_ok=yes, memory.peak 201-203 MB | Message A remains supported by the earlier measured challenge; day-3 PROVE provides no new evidence |
| Show HN not on front page by 10/28 01:00 KST | Not yet applicable | Scheduled 10/27 22:00; not posted by agent | Human posts only if owner prerequisites are resolved; check front page at deadline |
| Under +10 stars/day for 2 days in a row (after 10/27) | Not yet applicable | Day 3 +0; rule starts after 10/27 | Measure tomorrow; switch A -> B -> C if two consecutive days meet rule |
| 3+ external issues about same missing feature | No | 0 external mhc issues | No change |

## Loop changes

No loop rule changed. PROVE could not get past concurrent cleanup inside the harness; do not report a benchmark number or retry, per the one-reproduction limit.

## Tomorrow

10/28: check Show HN status at 01:00 KST; do not repost if it is not on the front page. Human must write and post any approved material and reply for six hours. Resolve upstream-notification prerequisite before public comparison. Revisit OmO#11384 only if mhc has a matching scenario.
