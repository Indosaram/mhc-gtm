# Upstream pain-signal ledger

Updated daily by the SIGNAL step. One row per signal. "Reproduced" links to the PROVE result.

| Date seen | Source | Signal (one line) | Type | mhc relevant? | Reproduced | Used in post |
|---|---|---|---|---|---|---|
| 2026-10-24 | code-yeongyu/oh-my-openagent#10510 | memory recall keeps a ~231 MB BM25 index per session, rebuilt on every memory write | MEMORY | check whether mhc ports the same index | - | - |
| 2026-10-24 | code-yeongyu/oh-my-openagent#10544 | every session on a shared host re-parses the same memory repo (+66 MB per live session) | MEMORY | check | - | - |
| 2026-10-24 | code-yeongyu/oh-my-openagent#10738 | session_read/session_search load whole sessions into the caller (memory, OOM) | MEMORY | check | - | - |

Types: MEMORY, INSTALL, WINDOWS, HEADLESS, PERF, OTHER.
