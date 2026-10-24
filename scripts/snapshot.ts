// Usage: bun scripts/snapshot.ts [owner/repo] > metrics/day-N.json
// Requires an authenticated gh CLI. Traffic endpoints need push access to the repo.
const repo = process.argv[2] ?? "Indosaram/mhc";
const gh = async (path: string) => {
  const out = await Bun.$`gh api ${path}`.quiet().nothrow();
  if (out.exitCode !== 0) return { error: out.stderr.toString().trim() };
  return JSON.parse(out.stdout.toString());
};
const [meta, views, clones, referrers, releases, issues] = await Promise.all([
  gh(`repos/${repo}`),
  gh(`repos/${repo}/traffic/views`),
  gh(`repos/${repo}/traffic/clones`),
  gh(`repos/${repo}/traffic/popular/referrers`),
  gh(`repos/${repo}/releases?per_page=100`),
  gh(`repos/${repo}/issues?state=all&per_page=100`),
]);
if ((meta as any).error) { console.error(meta.error); process.exit(1); }
const installerDownloads = Array.isArray(releases)
  ? releases.flatMap((r: any) => r.assets)
      .filter((a: any) => /\.(tar\.gz|zip)$/.test(a.name))
      .reduce((n: number, a: any) => n + a.download_count, 0)
  : releases;
const owner = repo.split("/")[0];
const externalIssues = Array.isArray(issues)
  ? issues.filter((i: any) => !i.pull_request && i.user?.login !== owner).length
  : issues;
console.log(JSON.stringify({
  capturedAt: new Date().toISOString(),
  repo,
  stars: meta.stargazers_count,
  forks: meta.forks_count,
  watchers: meta.subscribers_count,
  views14d: views.error ? views : { count: views.count, uniques: views.uniques },
  clones14d: clones.error ? clones : { count: clones.count, uniques: clones.uniques },
  referrers,
  installerDownloadsTotal: installerDownloads,
  externalIssues,
  manual: { challengeReproductions: [], externalPosts: [] },
}, null, 2));
