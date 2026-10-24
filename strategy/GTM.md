# mhc Go-To-Market Strategy

Written 2026-10-24. Sources: Indosaram/mhc README, docs/memory-benchmark.md, docs/parity.md, GitHub API (2026-10-24), OmO issue tracker search (2026-10-24).

## 1. Positioning

**One line:** mhc is OmO as one native binary: same `~/.omo`, same workflows, no JS runtime, a fraction of the memory.

**Category:** a drop-in alternative runtime for existing OmO users, not a new agent competing for new users.

**Proof points (all measured or factual, nothing else goes in posts):**
1. Memory: same 4-node `mass-ulw` DAG, anon peak 83-86 MB (mhc) vs 1356-1398 MB (OmO 5.1.35), wall time about equal. 3 runs each, Linux x86_64, 2026-10-19 ([method](https://github.com/Indosaram/mhc/blob/main/docs/memory-benchmark.md)).
2. Install: `curl | sh` (Linux x86_64, macOS arm64) or PowerShell (Windows x86_64), no Node/Bun/npm.
3. Config: reads the same `~/.omo` files as OmO, so trying it costs nothing and removing it loses nothing.

**What we do not claim:** full parity (not done, see docs/parity.md), speed (wall time is equal; the model dominates), Linux arm64 (no build).

## 2. Target

| Rank | Segment | Signal they exist | What mhc gives |
|---|---|---|---|
| 1 (beachhead) | Heavy OmO users running many parallel sub-agents | OmO memory issues filed in the last week alone: #10510 (~231 MB BM25 index per session), #10544 (+66 MB per live session), #10738 (session_read OOM) | Same workflows at ~1/16 the anon memory |
| 2 | People running agents on small boxes: VPS, CI runners, homelab | Common practice; the challenge measures exactly this | Fits a 512 MB container (to be confirmed by metrics/challenge-512m.md) |
| 3 | Windows users and teams that cannot install a JS toolchain | Windows zip ships today | Single binary |
| 4 | Rust developers | Interest in TS -> Rust ports | Technical write-up as content, not as a sales pitch |

Upstream size for context: code-yeongyu/oh-my-openagent has 70,303 stars (2026-10-24). Even a small slice of power users is many times our current reach (2 stars).

## 3. Why the loop is different

- **Product proof = marketing material.** The challenge output is the post. Every day starts from a measurement, not a claim.
- **Upstream pain is the fuel.** Each day we pick the most-reported upstream pain, reproduce it on Linux with mhc, and publish the result whether it passes or fails. A fail becomes an mhc issue and its fix is the next story.
- **Zero followers assumed.** Only algorithmic channels and communities whose rules we meet (channels/rules.md).

## 4. Relationship with upstream (must hold in every post)

- mhc is a port of senpi (MIT) and oh-my-openagent (SUL-1.0). Credit both in the first paragraph.
- Compare against OmO only with the published, reproducible benchmark. No other numbers.
- Do not advertise in upstream issues or PRs. Link mhc in an upstream thread only if someone asks for a lighter runtime, and say who you are.
- Decision needed from the owner before the first public comparison: notify the upstream author first (recommended).

## 5. Risks

| Risk | Mitigation |
|---|---|
| "Parity is not finished" is the first objection | Say so in the post with docs/parity.md link; list what works today |
| Comparison read as an attack on upstream | Credit, reproducible method, notify upstream first |
| README is Simplified Chinese by default | Owner decision: switch default to English before Show HN (README.en.md exists) |
| SUL-1.0 blocks commercial use | Do not market to companies for paid use; target individuals |
| mhc fails the 512 MB challenge | Drop message A for that claim, lead with B/C (see launch-7day.md) |
