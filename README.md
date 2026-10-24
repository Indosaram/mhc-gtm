# mhc GTM Agentic Loop

> 7-day GTM loop for [mhc](https://github.com/Indosaram/mhc), started 2026-10-24 (inspired by Clone Loop Day in Seoul submissions). Run period 2026-10-25 (Sun) to 2026-10-31 (Sat) 18:00 KST.

mhc is a native Rust port of OmO (oh-my-openagent on senpi): one self-contained binary, the same `~/.omo` config, no Node/Bun/npm runtime. This repo is not a program. It is the method of a GTM loop run once a day for 7 days: Markdown skills, a metrics script, a reproducible memory challenge, and daily logs.

## 7-day goals (as of 2026-10-31 18:00 KST)

Baseline measured with `gh api` on 2026-10-24 ([metrics/baseline.json](metrics/baseline.json)).

| Metric | Baseline (10/24) | Goal | Stretch |
|---|---|---|---|
| GitHub stars (Indosaram/mhc) | 2 | **150** | 500 |
| Installer downloads, cumulative (tar.gz/zip only, no .sha256) | 31 | +300 | +1,000 |
| GitHub 14-day unique visitors | 6 | 1,000 | 3,000 |
| External people who reproduced the memory challenge (issue/comment with output) | 0 | 5 | 15 |
| Issues opened by people other than the maintainer | 0 | 10 | 25 |
| External posts and mentions | 0 | 6 | 15 |

Revenue goal: none. `crates/omo/**` is under SUL-1.0 (no commercial use), so this loop measures adoption only.

## The core idea: the 512 MB challenge

The product's measured advantage is also the marketing material. [docs/memory-benchmark.md](https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md) in mhc shows a fixed `mass-ulw` DAG (3 parallel sub-agents + join) peaking at 83-86 MB anon for mhc vs 1356-1398 MB for OmO. The challenge turns that into something anyone can rerun in one command inside a hard memory cap: [challenge/README.md](challenge/README.md). Status of our own run under the cap: [metrics/challenge-512m.md](metrics/challenge-512m.md).

## The loop on one page

```
 1 MEASURE  snapshot.ts -> metrics/day-N.json, diff vs yesterday
 2 SIGNAL   collect upstream pain signals (OmO/senpi issues, X, Threads, Reddit):
            memory/OOM, Node/Bun install failures, Windows, headless servers
 3 PROVE    reproduce today's top pain with mhc on Linux (omarchy), under a memory cap
            pass -> numbers + GIF = today's material
            fail -> mhc issue; the fix becomes tomorrow's material
 4 SHIP     one post per day; a HUMAN writes it (HN, r/rust ban LLM-written posts)
 5 REPLY    a human answers every comment for 6 hours after posting
 6 RETRO    log/day-N.md; swap the message (A/B/C) by response
```

Messages under test (one per post, rotated by result):
- A. "16x less memory with 3 parallel sub-agents" (measured, reproducible)
- B. "One binary. No Node, no Bun, no npm." (factual)
- C. "Keeps your `~/.omo`. Install next to OmO, try it, remove it." (factual)

## Repo structure

| Path | Contents |
|---|---|
| [strategy/GTM.md](strategy/GTM.md) | Positioning, target, why now, risks |
| [strategy/launch-7day.md](strategy/launch-7day.md) | 7-day schedule and mid-course decision rules |
| [strategy/signals.md](strategy/signals.md) | Upstream pain-signal ledger (updated daily) |
| [loop/LOOP.md](loop/LOOP.md) | Daily procedure (master skill) |
| [skills/](skills/) | measure, signal, prove, ship, retro |
| [channels/rules.md](channels/rules.md) | Channel rules and prohibitions |
| [challenge/](challenge/) | The reproducible 512 MB challenge |
| [scripts/snapshot.ts](scripts/snapshot.ts) | Metrics snapshot (`bun scripts/snapshot.ts`) |
| [metrics/](metrics/) · [log/](log/) | Baseline, daily snapshots, daily logs |

## Humans vs agents

Agents: measuring, collecting signals, reproducing on Linux, fact checks, drafting material and logs. Humans: writing and posting every post and comment, answering replies. This split follows channel rules (channels/rules.md).

## Mapping to the judging criteria

| Criterion | Where |
|---|---|
| Strategy fits product and customers | strategy/GTM.md |
| Actually run repeatedly | log/day-*.md, metrics/*.json |
| Loop improved from interim results | "Loop changes" in each log, loop/CHANGELOG.md |
| Results vs goals | goals table above vs metrics/day-7.json |
