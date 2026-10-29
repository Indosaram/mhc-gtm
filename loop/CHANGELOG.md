# Loop changelog

- 2026-10-24 v1: initial loop (MEASURE, SIGNAL, PROVE, SHIP, REPLY, RETRO). Derived from the Clone Loop Day submissions: product output as marketing material (arkpoint), public-signal discovery (AI특별시, arkpoint), message portfolio (Mu).
- 2026-10-26 v1.1: skills/prove.md cap fix. It ran bench.sh with `MEM_LIMIT=512m`, which bench.sh never reads, so a PROVE run would have had no memory cap. Now it applies the challenge/README.md sed and checks for `-m 512m` first. Evidence: tools/membench/bench.sh at mhc main b2d92c25 has no MEM_LIMIT; log/day-2.md PROVE.
- 2026-10-29 v1.2: preserve benchmark `.result` files and classify workflow-tool/quota failures before selecting tomorrow's PROVE target. Day 6's capped run showed `out_ok=no` because the fixed DAG workflow tool was unavailable and the workflow model hit HTTP 429; cleaning the run directory also removed the measured-run result before it could be recorded. Evidence: log/day-6.md.
