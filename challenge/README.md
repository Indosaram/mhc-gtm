# The 512 MB challenge

Run the same fixed multi-agent workflow (3 parallel sub-agents + 1 join, via `mass-ulw`) inside a container with a hard 512 MB memory cap and no swap, once with mhc and once with OmO, using the same `~/.omo` config and models.

## Run it

Requirements are the same as [mhc docs/memory-benchmark.md](https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md#requirements) (Linux, cgroup v2, Docker, mhc and OmO installed, a working `~/.omo`).

```bash
git clone https://github.com/Indosaram/mhc && cd mhc/tools/membench
# add a hard cap to the benchmark container (no swap)
sed -i 's|docker run --rm --name "membench-\$3" --network host|docker run --rm --name "membench-\$3" --network host -m 512m --memory-swap 512m|' bench.sh
RUNS=2 ./bench.sh
```

Each row ends with `ok=yes` when the DAG finished and wrote its output. A run killed by the cap shows `ok=no` (and usually rc 137).

## Share your result

Open an issue in this repo with the summary table, your machine (CPU, RAM, distro) and mhc/OmO versions. External reproductions are one of our 7-day goals; failures are just as useful as passes.
