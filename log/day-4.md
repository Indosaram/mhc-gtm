# Day 4 — 2026-10-28 (Wed)

## Metrics
Snapshot metrics/day-4.json was already captured at 2026-10-27 23:30:03 UTC; diff vs metrics/day-3.json.

| Metric | Today | vs yesterday | % of goal |
|---|---|---|---|
| Stars | 2 | +0 | 1.3% (2/150) |
| Forks | 0 | +0 | - |
| 14-day views / unique visitors | 13 / 6 | +0 / +0 | 0.6% (6/1,000) |
| 14-day clones / unique cloners | 2,558 / 355 | +296 / +15 | - |
| Installer downloads, cumulative | 48 | +3 | 1.0% (+3 of +300 since baseline) |
| External challenge reproductions | 0 | +0 | 0% (0/5) |
| External issues | 0 | +0 | 0% (0/10) |
| External posts and mentions | 0 | +0 | 0% (0/6) |

Top 5 referrers: none (empty); no channel drove traffic. Snapshot command: `bun scripts/snapshot.ts` (snapshot already captured; not rerun).

## Signals (new)

Queried GitHub issues in `code-yeongyu/oh-my-openagent` and `code-yeongyu/senpi` with `created:>=2026-10-27` and memory/OOM/heap/install/windows/node terms using `gh api ... search/issues`. New memory signals added to strategy/signals.md:
- senpi#4415: TUI render signatures recursively hash omitted tails, causing quadratic memory and Node heap OOM on wide tool results. MEMORY; mhc relevance unconfirmed, matching TUI path not established.
- OmO#11484: failed taskkill or detached POSIX descendants can survive the memory deadline. MEMORY; mhc relevance unconfirmed.
- OmO#11450: expired time-boxed memory remains projected because there is no expiry convention / time-based cache invalidation. MEMORY; check mhc applicability.
- OmO#11453: external memory projection truncates filenames in large sets. MEMORY; check mhc applicability.
- OmO#11512: memory expiry follow-ups include hook comment bytes, pressure line counts, and invalid expiry handling. MEMORY; check mhc applicability.
- OmO#11557: reduce bytes used by memory external_projection names and expiry code. MEMORY; check mhc applicability.

GitHub query also returned unrelated Windows, test, and performance reports; not recorded as target-user pain without matching evidence. X/Threads/Reddit searches were not performed; no search source/tool configured in this run. Top unreproduced type remains MEMORY; newest relevant candidate is senpi#4415.

## PROVE

- Signal: senpi#4415, quadratic memory / heap OOM when hashing omitted tails in wide TUI tool results. The mhc matching execution path is unconfirmed.
- Command: `ssh omarchy 'command -v mhc; mhc --version'` (Linux host verification). Returned `zsh:1: command not found: mhc`, exit 127. Host confirmed Linux x86_64 with `uname -srm`.
- Result: no benchmark/reproduction launched. mhc version, rc/out_ok, anon peak, and memory.peak are unavailable. One reproduction attempt was not made because mhc is not installed on omarchy and the prescribed reproduction requires the installed binary; no substitute or second attempt.
- Cleanup: no run directory was created; nothing to clean up.

## SHIP material sheet (for the human; nothing posted)

- Today's channel: Hacker News Show HN, planned for 22:00 KST / 13:00 UTC on 10/27; that scheduled time has passed. The agent did not post. Official rules page: https://news.ycombinator.com/showhn.html; human-written content only, something people can try, no vote requests, no delete-and-repost. Recheck the official rules immediately before any posting.
- Human action: write a Show HN post only if the owner has resolved the still-open upstream-author notification prerequisite and approves the delayed timing. Otherwise no post today. Do not claim today's signal was reproduced.
- Message: A, technically framed around one native process versus one JS runtime per child; no complete parity or faster wall-time claim.
- Measured facts and sources (previously measured; today's PROVE added no benchmark): published Linux x86_64 benchmark, 3 runs each, anon peak 83-86 MB (mhc) vs 1,356-1,398 MB (OmO 5.1.35): https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md. The earlier 512 MB challenge measured mhc 2/2 pass, memory.peak 201-203 MB and anon peak 110-113 MB; OmO reached the cap in 2/2 runs (one killed before finishing, one printed DONE but did not exit): challenge-512m.md.
- Reproduce instructions: https://github.com/Indosaram/mhc/blob/main/challenge/README.md. Apply the documented sed adding `-m 512m --memory-swap 512m` before running the benchmark.
- Why: mhc runs parent and DAG children in one process; OmO starts a JS runtime per child (docs/memory-benchmark.md, “One process vs one runtime per child”).
- Credit both senpi (MIT) and oh-my-openagent (SUL-1.0). Say parity is incomplete and link https://github.com/Indosaram/mhc/blob/main/docs/parity.md. Link the English README: https://github.com/Indosaram/mhc/blob/main/README.en.md (default README remains Chinese). No post URL/time because none was published.

## What we did

| Time (KST) | Action | URL / commit |
|---|---|---|
| 08:30 | Reviewed pre-captured metrics and compared with day 3 | metrics/day-4.json |
| 08:31 | Queried upstream GitHub issues; updated signal ledger | strategy/signals.md |
| 08:32 | Checked omarchy Linux and mhc availability; binary absent, no reproduction launched | this log |
| 08:33 | Prepared Show HN material sheet; nothing posted | this log |

## What we heard

No external posts, mentions, issues or referrers in the captured metrics. GitHub memory reports are listed above. No new mhc reproduction result today.

## Decision rule check

| Rule | Triggered? | Numbers | Action |
|---|---|---|---|
| Challenge fails at 512 MB (day 0) | No | Prior day-0 challenge passed 2/2, memory.peak 201-203 MB | Keep prior evidence properly attributed; today's PROVE does not change it |
| Show HN not on front page by 10/28 01:00 KST | Unknown / not verified | No posting evidence available in this workspace; scheduled 10/27 22:00 KST | Human must check HN; do not repost, use a fresh technical angle on 10/29 if rule applies |
| Under +10 stars/day for 2 days in a row (after 10/27) | Not yet triggered | Day 3: +0; day 4: +0; rule requires two days after 10/27 | Day 4 is first eligible day; measure tomorrow before changing message |
| 3+ external issues about same missing feature | No | 0 external mhc issues | No change |

## Loop changes

Tomorrow, check Show HN front-page status and only plan a new technical post if it was not featured; no repost. For PROVE, verify the matching mhc path and Linux binary availability before attempting the single capped run. No benchmark was claimed because `mhc` is absent on omarchy.

## Tomorrow

10/29: human checks Show HN status against the 01:00 KST cutoff and writes a fresh technical post only if indicated; no repost. Human writes/posts and handles replies for six hours. Resolve upstream notification before a public comparison. Revisit memory target only after establishing an mhc-relevant scenario.
