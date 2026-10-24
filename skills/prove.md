# skill: prove

Run on Linux only: `ssh omarchy`. mhc is installed at `~/.local/share/mhc`.

1. Turn the signal into a minimal scenario (prompt + inputs) that exercises the same path.
2. Run it under a memory cap with the benchmark harness:
   `cd <run dir> && MEM_LIMIT=512m RUNS=1 AGENTS=mhc WORK=<run dir>/work tools/membench/bench.sh` (see challenge/README.md for the 512m variant).
3. Record in log/day-N.md: command, mhc version, rc, out_ok, anon peak, memory.peak.
4. PASS -> material for SHIP. FAIL -> open an mhc issue with the reproduction; the fix and its numbers become tomorrow's material.
5. Never run OmO on the owner's Mac for comparison. Only rerun OmO under the same harness on Linux when the comparison is the point.
6. Remove the run directory afterwards and note the cleanup in the log.
