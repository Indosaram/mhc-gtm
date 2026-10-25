# 512 MB challenge — our own run

Run on omarchy (Linux x86_64), started 2026-10-24 22:04 KST, 1 warm-up + 2 measured runs per agent, `docker run -m 512m --memory-swap 512m` (challenge/README.md). Summary from `tools/membench/summarize.sh ~/.cache/mhcgtm-512/out`, read 2026-10-26.

| run | rc | secs | memory.peak MB | anon_peak MB | anon_avg MB | file_peak MB | procs | ok |
|---|---|---|---|---|---|---|---|---|
| mhc-1 | 0 | 136 | 201 | 113 | 93 | 81 | 8 | yes |
| mhc-2 | 0 | 129 | 203 | 110 | 91 | 87 | 7 | yes |
| omo-1 | 137 | 55 | 512 | 496 | 463 | 140 | 8 | no |
| omo-2 | 137 | 910 | 512 | 496 | 475 | 155 | 14 | yes |

Warm-ups (discarded): mhc rc=0 out_ok=yes; OmO rc=137 out_ok=no.

- mhc: 2/2 finished under the cap and exited 0. After DONE, mhc-1 printed a panic in `memory-reflection-run-1` (`crates/maho-ext-host/src/runner.rs:245:13`); exit code was still 0.
- OmO: hit the 512 MB cap in every run; omo-1 and the warm-up were OOM-killed (rc 137). omo-2 wrote its output and printed DONE, but did not exit and was killed at 910 s (the 900 s timeout plus its 10 s kill grace), with memory pinned at the cap.
- Versions: mhc version at run time not recorded; OmO reports `omo 5.1.38 (engine: senpi 2026.10.19)` when checked on 2026-10-26 (version at run time not recorded).
