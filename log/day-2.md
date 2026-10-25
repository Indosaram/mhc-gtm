# Day 2 — 2026-10-26 (Mon)

Note: there is no log/day-1.md. metrics/day-1.json was captured (2026-10-25 08:30 KST) but the day-1 RETRO did not run, and none of the 10/25 schedule items (challenge write-up, Korean Rust Discord, GeekNews) are recorded as done. Day-2 diffs are against day-1.json.

## Metrics
Snapshot metrics/day-2.json (captured 2026-10-26 08:30 KST, `bun scripts/snapshot.ts`).

| Metric | Today | vs yesterday | % of goal |
|---|---|---|---|
| Stars | 2 | +0 | 1.3% (2/150) |
| Forks | 0 | +0 | - |
| 14-day views / unique visitors | 13 / 6 | +0 / +0 | 0.6% (6/1,000) |
| 14-day clones / unique cloners | 2,481 / 338 | +62 / +7 | - |
| Installer downloads, cumulative | 38 | +7 | 2.3% (+7 of +300 since baseline) |
| External challenge reproductions | 0 | +0 | 0% (0/5) |
| External issues | 0 | +0 | 0% (0/10) |
| External posts and mentions | 0 | +0 | 0% (0/6) |

Referrers: none (top 5 empty), so no channel drove traffic. Only clones and installer downloads move, which matches the day-0 reading (install scripts/CI, not people visiting the page). `traffic/popular/paths` shows hits on `/LinKeninDev/mhc` paths (4 views / 3 uniques), i.e. part of the traffic is counted under a former repo path.

## Signals (new)
Search window created:>=2026-10-24 (gh search on both repos, see skills/signal.md). Added to strategy/signals.md:
- senpi#4239 (external reporter): RPC host `--mode rpc --multi-session` grows to 6-24 GB anon heap, systemd-oomd kills the session cgroup. MEMORY.
- OmO#11299 (external): Desktop GUI stops following a heavy /goal thread; each message_update carries the whole accumulated message. PERF.
- OmO#11269 (external): Windows task record rename EPERM leaves a subagent pending forever. WINDOWS.
- OmO#11262 (external): macOS keychain keeps prompting "bun wants to access key omo-cli"; memory tool hangs while the prompt is open. INSTALL.
- OmO#11230 (maintainer-filed): Windows .cmd shims lose a Node path containing `!`. WINDOWS/INSTALL.
- senpi#4213 (maintainer-filed): startup grows quadratically with skill count. PERF.

Not collected: X, Threads. Reddit search returned a non-JSON response (blocked) and gave nothing. Ledger count by type: MEMORY 4, WINDOWS 2, PERF 2, INSTALL 1; MEMORY stays the PROVE type.

## PROVE
- Signal: senpi#4239 (newest MEMORY signal; MEMORY is the most-repeated unreproduced type). The issue is a long-lived multi-session RPC host growing over hours; a single 20-minute run cannot reproduce that. Proxy used: the challenge DAG widened from 3 to 8 parallel children (+ join) under the 512 MB hard cap, to see whether memory scales with live children.
- Command (omarchy, Linux x86_64, run dir `~/.cache/mhcgtm-day2`, mhc repo main `b2d92c25`):
  ```
  git clone --depth 1 https://github.com/Indosaram/mhc && cd mhc/tools/membench
  sed -i 's|docker run --rm --name "membench-\$3" --network host|docker run --rm --name "membench-\$3" --network host -m 512m --memory-swap 512m|' bench.sh
  # run-in-container.sh edited: nodes a..h (8 files, same 40-line inputs), join dependsOn a..h
  RUNS=1 AGENTS=mhc WORK=~/.cache/mhcgtm-day2/work timeout -k 10 1200 ./bench.sh
  ```
- Result (mhc 2026.10.25.1, 512 MB cap, no swap):

  | run | rc | secs | memory.peak | anon peak | anon avg | file peak | procs | out_ok |
  |---|---|---|---|---|---|---|---|---|
  | warm-up | 0 | 65 | 235 MB | 114 MB | - | - | - | no |
  | mhc-1 | 124 | 900 | 219 MB | 110 MB | 72 MB | 104 MB | 9 | yes |

  Memory: 8 children peak at 110-114 MB anon, the same as the 3-child day-0 run (110-113 MB). Width did not add memory.
  Function: **FAIL.** Warm-up: all 8 child nodes ended with `Nothing to compact (session too small)`, join was skipped, no output. Measured run: out.txt was written, but the process never exited and was killed by the 900 s timeout (rc 124); its stdout holds only 15 `omo-senpi ulw-loop status ignored {"reason":"non-zero-exit","code":1}` warnings, no DONE.
  Also from day-0 output: mhc-1 printed `thread 'memory-reflection-run-1' panicked at crates/maho-ext-host/src/runner.rs:245:13` after DONE.
- Follow-up (human, not posted by the agent): open an mhc issue "8-wide mass-ulw DAG: children fail with 'Nothing to compact (session too small)'; when the DAG completes, `mhc -p` does not exit (rc 124 after 900 s)", with the command and table above. The fix and rerun are tomorrow's material. Do not use "8 children in 110 MB" publicly until the run exits cleanly.
- Cleanup: `rm -rf ~/.cache/mhcgtm-day2` done, verified absent. No containers from this run remain (`membench-mhc` / `membench-omo` listed by `docker ps -a` were created 2026-10-19, untouched). Run time about 18 minutes (08:32-08:50 KST).

## Day-0 challenge result (read today, written to metrics/challenge-512m.md)
From `~/.cache/mhcgtm-512/out` on omarchy, summarized with `tools/membench/summarize.sh`:

| run | rc | secs | memory.peak | anon peak | out_ok |
|---|---|---|---|---|---|
| mhc-1 (version not recorded) | 0 | 136 | 201 MB | 113 MB | yes |
| mhc-2 | 0 | 129 | 203 MB | 110 MB | yes |
| omo-1 (OmO; `omo --version` today says 5.1.38, version at run time not recorded) | 137 | 55 | 512 MB | 496 MB | no |
| omo-2 | 137 | 910 | 512 MB | 496 MB | yes (printed DONE, never exited, killed by the 900 s timeout) |

mhc passed the 512 MB cap 2/2. OmO reached the cap in every run (anon 496 MB); omo-1 and the warm-up were killed early, omo-2 finished the DAG but never exited.

## SHIP material sheet (for the human; nothing posted)
- Today's channel per strategy/launch-7day.md: **r/rust**, technical post on how the TS harness was ported to Rust and where the memory went. Rules (channels/rules.md): must be a Rust topic; AI-generated / low-quality posts are removed. Re-check https://www.reddit.com/r/rust/about/rules before posting (the agent could not fetch it today).
- Carry-over not done on 10/25: Korean Rust user group Discord (read #rules first), GeekNews Show GN (only if the account is 1+ week old).
- One message: **A** framed technically ("one process vs one runtime per child"), not as a challenge to upstream.
- Numbers with sources:
  - Published benchmark: anon peak 83-86 MB (mhc) vs 1356-1398 MB (OmO 5.1.35), 3 runs each, Linux x86_64, 2026-10-19: https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md
  - 512 MB cap, 3-child DAG: mhc 2/2 finished, memory.peak 201-203 MB, anon peak 110-113 MB; OmO (5.1.38 per today's `omo --version`) reached 512 MB in 2/2 runs (1 killed before finishing, 1 finished but never exited) (metrics/challenge-512m.md).
  - Why: mhc runs the parent and every DAG child in one process; OmO starts one JS runtime per child (docs/memory-benchmark.md, "One process vs one runtime per child").
  - Do not use today's 8-wide run (it failed functionally, see PROVE).
- Credit line: mhc is a Rust port of senpi (MIT) and oh-my-openagent (SUL-1.0); credit both in the first paragraph.
- Parity line: not full parity; status per crate in https://github.com/Indosaram/mhc/blob/main/docs/parity.md. Wall time is about equal; do not say "faster".
- Reproduce: challenge/README.md (`RUNS=2 ./bench.sh` with the 512m sed).
- Owner decision still open (strategy/GTM.md section 4): notify the upstream author before the first public comparison. The OmO 512 MB numbers are a new comparison.

## What we did
| Time (KST) | Action | URL / commit |
|---|---|---|
| 08:30 | Snapshot (scheduler) | metrics/day-2.json |
| 08:31 | Signal search, 6 new rows | strategy/signals.md |
| 08:32-08:50 | PROVE 8-wide DAG under 512 MB on omarchy, run dir removed | this log |
| 08:55 | Day-0 challenge result written | metrics/challenge-512m.md |
| 08:55 | Loop fix in skills/prove.md | loop/CHANGELOG.md, commit `day-2` |

## What we heard
Nothing: no posts yet, 0 external issues, 0 referrers.

## Decision rule check
| Rule | Triggered? | Numbers | Action |
|---|---|---|---|
| Challenge fails at 512 MB (day 0) | No | mhc 2/2 out_ok=yes, memory.peak 201-203 MB | Message A stays usable |
| Show HN not on front page by 10/28 01:00 | Not yet applicable | Show HN not posted (scheduled 10/27) | - |
| < +10 stars/day for 2 days after 10/27 | Not yet applicable | +0 stars today | - |
| 3+ external issues about the same missing feature | No | 0 external issues | - |

## Loop changes
skills/prove.md said `MEM_LIMIT=512m ... bench.sh`, but bench.sh never reads `MEM_LIMIT`; the cap only exists with the sed from challenge/README.md. Today's run applied the sed. prove.md now uses the sed and drops MEM_LIMIT (loop/CHANGELOG.md).

## Tomorrow
10/27: human opens the mhc issue for the PROVE failure; if fixed, rerun the 8-wide DAG as PROVE. Show HN 22:00 KST needs the owner decisions first (README default to English, upstream notified). Retro must run every day so a missing log like day-1 does not happen again.
