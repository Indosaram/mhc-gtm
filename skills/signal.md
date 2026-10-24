# skill: signal

1. Collect since the last run:
   - `gh api -X GET search/issues -f q='repo:code-yeongyu/oh-my-openagent is:issue created:>=<yesterday> memory OR OOM OR heap OR install OR windows OR node'`
   - same for code-yeongyu/senpi
   - mentions of "oh-my-openagent" / "OmO" memory or install problems on X, Threads, Reddit (read only)
2. One row per signal in strategy/signals.md with type and source URL.
3. Pick today's PROVE target: the most-repeated unreproduced type, then the newest.
4. Facts only. One report is one report, not "users".
