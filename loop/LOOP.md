# Daily GTM loop — master skill

Runs once a day at 08:30 KST from the owner's scheduler (job `mhc-gtm-daily-v1`). Agents do steps 1-3 and 6 and prepare material for 4; a human does 4 and 5.

## Order

1. **MEASURE** (skills/measure.md): `bun scripts/snapshot.ts > metrics/day-N.json`, diff vs previous day.
2. **SIGNAL** (skills/signal.md): new upstream pain signals since yesterday -> strategy/signals.md.
3. **PROVE** (skills/prove.md): reproduce the top unreproduced signal with mhc on Linux (ssh omarchy), never on the Mac. Record numbers and the command.
4. **SHIP** (skills/ship.md): agent prepares facts, numbers, links and today's channel rules; a human writes and posts.
5. **REPLY**: a human answers every comment for 6 hours after posting.
6. **RETRO** (skills/retro.md): log/day-N.md, decision-rule check, one change for tomorrow.

## Invariant rules

- Only numbers we measured, with the command that produced them.
- Credit senpi and oh-my-openagent; never call mhc "complete parity".
- Humans write and post. No vote/star requests, no multiple accounts, no reposting the same post.
- Builds and reproductions run on Linux (omarchy), not on the Mac.
- Commit daily: `day-N: <one-line loop change>`.
