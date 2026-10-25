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

Types: MEMORY, INSTALL, WINDOWS, HEADLESS, PERF, OTHER.
