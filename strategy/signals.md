# Upstream pain-signal ledger

Updated daily by the SIGNAL step. One row per signal. "Reproduced" links to the PROVE result.

| Date seen | Source | Signal (one line) | Type | mhc relevant? | Reproduced | Used in post |
|---|---|---|---|---|---|---|
| 2026-10-24 | code-yeongyu/oh-my-openagent#10510 | memory recall keeps a ~231 MB BM25 index per session, rebuilt on every memory write | MEMORY | check whether mhc ports the same index | - | - |
| 2026-10-24 | code-yeongyu/oh-my-openagent#10544 | every session on a shared host re-parses the same memory repo (+66 MB per live session) | MEMORY | check | - | - |
| 2026-10-24 | code-yeongyu/oh-my-openagent#10738 | session_read/session_search load whole sessions into the caller (memory, OOM) | MEMORY | check | - | - |
| 2026-10-26 | code-yeongyu/senpi#4239 | RPC host (`--mode rpc --multi-session`) grows to 6-24 GB anon heap; systemd-oomd kills the session cgroup (external reporter) | MEMORY | yes: mhc runs children in one process | proxy only (8-wide DAG, 512 MB): anon 110 MB but run FAIL, see log/day-2.md | - |
| 2026-10-26 | code-yeongyu/oh-my-openagent#11299 | Desktop GUI stops following a heavy /goal thread; each message_update carries the whole accumulated message (external) | PERF | check (mhc has no desktop GUI) | - | - |
| 2026-10-26 | code-yeongyu/oh-my-openagent#11269 | Windows: task record rename EPERM leaves a subagent pending forever (external) | WINDOWS | check | - | - |
| 2026-10-26 | code-yeongyu/oh-my-openagent#11262 | macOS: keychain keeps prompting "bun wants to access key omo-cli"; memory tool hangs while prompt is open (external) | INSTALL | check (no bun in mhc) | - | - |
| 2026-10-26 | code-yeongyu/oh-my-openagent#11230 | Windows .cmd shims lose a Node path containing `!` (maintainer-filed) | WINDOWS | yes: mhc ships no Node shim | - | - |
| 2026-10-26 | code-yeongyu/senpi#4213 | startup grows quadratically with skill count (maintainer-filed) | PERF | check | - | - |
| 2026-10-26 | https://github.com/code-yeongyu/oh-my-openagent/issues/11384 | POSIX memory reflection deadline can leave a SIGTERM-ignoring descendant alive | MEMORY | check: mhc reproduction path not established | - | - |
| 2026-10-26 | https://github.com/code-yeongyu/oh-my-openagent/issues/11383 | Model-family usage limit without family name is treated as account-wide; same-provider fallback is skipped | OTHER | check | - | - |
| 2026-10-27 | https://github.com/code-yeongyu/senpi/issues/4415 | TUI render signatures recursively hash omitted tails; quadratic memory and Node heap OOM on wide tool results | MEMORY | check whether mhc has the matching TUI path | - | - |
| 2026-10-27 | https://github.com/code-yeongyu/oh-my-openagent/issues/11484 | Failed taskkill or detached POSIX descendants can survive the memory deadline | MEMORY | check | - | - |
| 2026-10-27 | https://github.com/code-yeongyu/oh-my-openagent/issues/11450 | Expired time-boxed memory remains projected; expiry is not time-invalidated | MEMORY | check | - | - |
| 2026-10-27 | https://github.com/code-yeongyu/oh-my-openagent/issues/11453 | External memory projection truncates filenames in large sets | MEMORY | check | - | - |
| 2026-10-27 | https://github.com/code-yeongyu/oh-my-openagent/issues/11512 | Memory expiry follow-ups: hook comment bytes, pressure line counts, and invalid expiry handling | MEMORY | check | - | - |
| 2026-10-27 | https://github.com/code-yeongyu/oh-my-openagent/issues/11557 | Reduce bytes used by memory external_projection names and expiry code | MEMORY | check | - | - |

Types: MEMORY, INSTALL, WINDOWS, HEADLESS, PERF, OTHER.
