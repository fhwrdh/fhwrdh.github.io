# fhwrdh.net Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move fhwrdh.net from GitHub Pages to the sfo3 droplet with real URL paths, then rename the repo to match.

**Architecture:** Same React/Vite/Chakra build, served as static files by nginx on the sfo3 droplet with an SPA `try_files` fallback (same pattern as `ferry.fhwrdh.net`). Router switches from `createHashRouter` to `createBrowserRouter`; a shim rewrites old `#/...` links to `/...` so existing links keep working. Stage at `new.fhwrdh.net`, cut DNS over, keep Pages frozen for rollback, decommission Pages and rename the repo only after a soak period.

**Tech Stack:** React 18, Vite 5, react-router-dom 6, nginx, Let's Encrypt (certbot), rsync, doctl, gh.

**Spec:** No separate spec file. Design was drafted 2026-09-25 (see memory `fhwrdh-site-migration-and-flickr-archive`) and is restated in Global Constraints below. Approval of this plan is approval of that design.

## Global Constraints

- **Do not modify or delete infrastructure without explicit approval.** Every task step marked `APPROVAL` stops and asks the user in chat first. Approval is per step, not per task.
- SSH only as `fhwrdh@159.223.202.42`, never root. `fhwrdh` has no passwordless sudo: steps marked `USER (sudo)` are run by the user.
- Target droplet: sfo3, `159.223.202.42`, Debian 13, nginx already installed, certbot already in use.
- The droplet cannot run the Vite build. Build on the Mac, rsync `dist/`.
- Remote web root: `/home/fhwrdh/fhwrdh.net/dist`.
- Do not touch: `photo.fhwrdh.net` (A record on old droplet 157.230.156.132, 301 to `https://fhwrdh.net$request_uri`), `resume.fhwrdh.net` (CNAME to `fhwrdh.github.io`, served by the separate `fhwrdh/resume-react` Pages repo), Zoho MX/SPF/verification records, the `_github-pages-challenge-fhwrdh` TXT record.
- Never push to `main` until the Pages workflow is removed in the same push (Task 3). A new-router build on Pages breaks deep links.
- Never delete the `gh-pages` branch in this plan. It is the frozen rollback copy.
- Rename target repo name: `fhwrdh.net` (change here first if the user wants another name).
- Existing DNS record IDs (fhwrdh.net): A `@` = 1809369636, 1809369661, 1809369670, 1809369674 (TTL 3600); CNAME `www` = 1809369676 (TTL 3600).

---

## File Structure

- Create `src/legacyHash.js` — pure function that rewrites `#/path` to `/path`.
- Create `src/legacyHash.test.js` — `node:test` tests for it.
- Modify `src/router.jsx` — browser router, call shim first.
- Modify `public/llms.txt`, `scripts/generate-manifest.js`, regenerate `public/site-manifest.json` — path URLs instead of hash URLs.
- Create `scripts/deploy.sh` — build + rsync, modeled on ferrytimer's.
- Modify `package.json` — drop `gh-pages`, `cname`, pre/postdeploy; add `test`, new `deploy`.
- Delete `.github/workflows/deploy.yml`.
- Modify `CLAUDE.md`, `README.md` (docs), `~/dev/fhwrdh/DIGITALOCEAN.md` (infra doc).
- Server only: `/etc/nginx/sites-available/fhwrdh.net`.

---

### Task 1: Legacy hash shim

**Files:**
- Create: `src/legacyHash.js`
- Create: `src/legacyHash.test.js`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Produces: `migrateLegacyHash(location: {hash: string}, history: {replaceState: Function}): boolean` — returns true if it rewrote the URL.

- [ ] **Step 1: Create a branch**

```bash
cd ~/dev/fhwrdh/fhwrdh.github.io
git switch -c migrate-to-droplet
```

- [ ] **Step 2: Write the failing test**

Create `src/legacyHash.test.js`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { migrateLegacyHash } from "./legacyHash.js";

function fakeHistory() {
  const calls = [];
  return { calls, replaceState: (...args) => calls.push(args) };
}

test("rewrites a hash route to a path", () => {
  const h = fakeHistory();
  const changed = migrateLegacyHash({ hash: "#/work/ftprtu/winter-couplet" }, h);
  assert.equal(changed, true);
  assert.deepEqual(h.calls, [[null, "", "/work/ftprtu/winter-couplet"]]);
});

test("rewrites the bare root hash", () => {
  const h = fakeHistory();
  assert.equal(migrateLegacyHash({ hash: "#/" }, h), true);
  assert.deepEqual(h.calls, [[null, "", "/"]]);
});

test("ignores empty hash", () => {
  const h = fakeHistory();
  assert.equal(migrateLegacyHash({ hash: "" }, h), false);
  assert.equal(h.calls.length, 0);
});

test("ignores non-route hash such as an in-page anchor", () => {
  const h = fakeHistory();
  assert.equal(migrateLegacyHash({ hash: "#section" }, h), false);
  assert.equal(h.calls.length, 0);
});
```

- [ ] **Step 3: Add the test script and run it to see it fail**

In `package.json` `scripts`, add after `"lint"`:

```json
    "test": "node --test src/",
```

Run: `npm test`
Expected: FAIL with `Cannot find module` for `./legacyHash.js`.

- [ ] **Step 4: Write minimal implementation**

Create `src/legacyHash.js`:

```js
// Old URLs looked like https://fhwrdh.net/#/work/ftprtu (hash router, a
// GitHub Pages workaround). Rewrite them to real paths before the router reads
// the location, so bookmarks and shared links keep working.
export function migrateLegacyHash(location, history) {
  const { hash } = location;
  if (!hash.startsWith("#/")) return false;
  history.replaceState(null, "", hash.slice(1));
  return true;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: 4 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/legacyHash.js src/legacyHash.test.js package.json
git commit -m "feat: add legacy hash-URL rewrite shim"
```

---

### Task 2: Browser router and path URLs in agent-facing files

**Files:**
- Modify: `src/router.jsx`
- Modify: `public/llms.txt:20,23`
- Modify: `scripts/generate-manifest.js:12`
- Regenerate: `public/site-manifest.json`

**Interfaces:**
- Consumes: `migrateLegacyHash` from Task 1.

- [ ] **Step 1: Switch the router**

Replace the top of `src/router.jsx` (imports and `createHashRouter(` call) so the file reads:

```jsx
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import FirstTheyPassed from "./work/FirstTheyPassed";
import AngleOfRepose from "./work/AngleOfRepose";
import SoundOfTheSea from "./work/SoundOfTheSea";
import IfYouCantSeeMyMirrors from "./work/IfYouCantSeeMyMirrors";
import { migrateLegacyHash } from "./legacyHash";

// Must run before createBrowserRouter reads window.location.
migrateLegacyHash(window.location, window.history);

const router = createBrowserRouter(
```

Leave the route tree and `export default router;` unchanged.

- [ ] **Step 2: Update llms.txt URLs**

In `public/llms.txt`, change `https://fhwrdh.net/#/work/ftprtu` to `https://fhwrdh.net/work/ftprtu` and `https://fhwrdh.net/#/work/ftprtu/winter-couplet` to `https://fhwrdh.net/work/ftprtu/winter-couplet`. Check the whole file: `grep -n "#/" public/llms.txt` must print nothing.

- [ ] **Step 3: Update manifest generator**

In `scripts/generate-manifest.js:12` change the line to:

```js
  routing: "path-based (e.g. https://fhwrdh.net/work/ftprtu)",
```

- [ ] **Step 4: Regenerate manifest and check**

Run: `npm run manifest && grep -c "#/" public/site-manifest.json`
Expected: `0`. If non-zero, run `grep -n "#/" scripts/generate-manifest.js` and fix remaining hash URL construction.

- [ ] **Step 5: Lint, build, and check locally**

Run: `npm run lint && npm test && npm run build`
Expected: all pass, `dist/` produced.

Run: `npm run preview` (serves `dist/` on :4173; Vite preview falls back to index.html). Open `http://localhost:4173/#/work/ftprtu` in the browser tool. Expected: URL bar becomes `http://localhost:4173/work/ftprtu` and the series renders. Then load `http://localhost:4173/work/ftprtu/winter-couplet` directly; expected: carousel modal opens. Stop the preview server.

- [ ] **Step 6: Commit**

```bash
git add src/router.jsx public/llms.txt scripts/generate-manifest.js public/site-manifest.json
git commit -m "feat: switch to browser router with path URLs"
```

---

### Task 3: Deploy script, remove Pages workflow and gh-pages

**Files:**
- Create: `scripts/deploy.sh`
- Modify: `package.json`
- Delete: `.github/workflows/deploy.yml`

**Interfaces:**
- Produces: `npm run deploy` builds and rsyncs `dist/` to `fhwrdh@159.223.202.42:~/fhwrdh.net/dist/`.

- [ ] **Step 1: Write the deploy script**

Create `scripts/deploy.sh`:

```bash
#!/usr/bin/env bash
# Build locally and ship to the sfo3 droplet (fhwrdh.net).
#
# The droplet can't run the Vite build (too little RAM, arm64/amd64 esbuild),
# so we build on the Mac and rsync dist/. Same flow as ferrytimer.
set -euo pipefail

HOST="fhwrdh@159.223.202.42"
REMOTE="~/fhwrdh.net"

echo "==> building"
npm run build

echo "==> syncing dist/"
ssh "$HOST" "mkdir -p $REMOTE/dist"
rsync -az --delete dist/ "$HOST:$REMOTE/dist/"

echo "==> done: https://fhwrdh.net (staging: https://new.fhwrdh.net)"
```

Run: `chmod +x scripts/deploy.sh`

- [ ] **Step 2: Update package.json scripts and dependency**

In `scripts`, remove `cname`, `predeploy`, `postdeploy`; change `build` and `deploy`:

```json
    "build": "npm run manifest && vite build",
    "deploy": "bash scripts/deploy.sh",
```

Remove the `gh-pages` line from `dependencies`, then run `npm install` to update the lockfile.

- [ ] **Step 3: Remove the Pages workflow**

```bash
git rm .github/workflows/deploy.yml
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm test && npm run build && ls dist/CNAME 2>&1`
Expected: build passes; `ls` reports `No such file` (CNAME no longer written to dist). Run `bash -n scripts/deploy.sh`; expected: no output.

- [ ] **Step 5: Commit**

```bash
git add scripts/deploy.sh package.json package-lock.json
git commit -m "build: deploy to droplet via rsync, drop gh-pages and Pages workflow"
```

Do not push yet. The `main` merge happens in Task 7, after cutover is verified.

---

### Task 4: Stage on new.fhwrdh.net

**Files:**
- Server: `/etc/nginx/sites-available/fhwrdh.net` (+ symlink in `sites-enabled`)

**Interfaces:**
- Produces: `https://new.fhwrdh.net` serving `/home/fhwrdh/fhwrdh.net/dist` with SPA fallback.

- [ ] **Step 1: APPROVAL — create staging DNS record**

Ask the user. Then:

```bash
doctl compute domain records create fhwrdh.net --record-type A --record-name new --record-data 159.223.202.42 --record-ttl 300
```

Expected: record listed. Verify: `dig +short new.fhwrdh.net @ns1.digitalocean.com` prints `159.223.202.42`.

- [ ] **Step 2: APPROVAL — first deploy of files**

Ask the user. Then, from the repo on branch `migrate-to-droplet`:

```bash
npm run deploy
```

Expected: ends with `==> done`. Verify: `ssh fhwrdh@159.223.202.42 'ls ~/fhwrdh.net/dist | head'` shows `index.html`, `assets`, `work`.

- [ ] **Step 3: Write the nginx config locally**

Create `docs/superpowers/plans/assets/fhwrdh.net.nginx` (kept in the repo as the reviewable source; copied to the server in the next step):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name new.fhwrdh.net;

    root /home/fhwrdh/fhwrdh.net/dist;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;

    # Vite hashed bundles never change under the same name.
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Images only. /work/<series> paths are client routes and must reach the SPA fallback.
    location ~* ^/work/.+\.(jpe?g|png|webp|gif|avif)$ {
        expires 7d;
        add_header Cache-Control "public";
        try_files $uri =404;
    }

    # SPA: serve built files, fall back to index.html for client routes.
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- [ ] **Step 4: USER (sudo) — install config, reload nginx, get cert**

Copy the file up, then ask the user to run on the droplet (`ssh fhwrdh@159.223.202.42`):

```bash
scp docs/superpowers/plans/assets/fhwrdh.net.nginx fhwrdh@159.223.202.42:/tmp/fhwrdh.net.nginx
```

```bash
sudo cp /tmp/fhwrdh.net.nginx /etc/nginx/sites-available/fhwrdh.net
sudo ln -s /etc/nginx/sites-available/fhwrdh.net /etc/nginx/sites-enabled/fhwrdh.net
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d new.fhwrdh.net
```

Expected: `nginx -t` reports `syntax is ok`; certbot reports a deployed certificate.

- [ ] **Step 5: Verify staging**

```bash
curl -sI https://new.fhwrdh.net/ | head -3
curl -sI https://new.fhwrdh.net/work/ftprtu | head -3
curl -sI https://new.fhwrdh.net/work/ftprtu/winter-couplet | head -3
curl -sI https://new.fhwrdh.net/does-not-exist.png | head -1
```

Expected: first three `HTTP/2 200`. The fourth is also `200` (SPA fallback serves index.html); that is expected for client routes. Then in the browser tool open `https://new.fhwrdh.net/#/work/ftprtu`; expected: rewritten to `/work/ftprtu`, images load, carousel arrows work, `/about` loads on hard refresh. Check `llms.txt` and `site-manifest.json` load.

- [ ] **Step 6: Commit the nginx source file**

```bash
git add docs/superpowers/plans/assets/fhwrdh.net.nginx
git commit -m "docs: add nginx config source for fhwrdh.net"
```

---

### Task 5: Cutover

**Files:**
- Server: `/etc/nginx/sites-available/fhwrdh.net`
- DNS: fhwrdh.net `@` A records, `www` CNAME

**Interfaces:**
- Consumes: working staging site from Task 4.
- Produces: `https://fhwrdh.net` served from the droplet; `www` 301s to apex.

Short TLS-error window (about 1–2 minutes) between the DNS change and certbot issuing: HTTP-01 needs DNS to resolve to the droplet first. Acceptable for this site; do it at a quiet hour.

- [ ] **Step 1: APPROVAL — lower TTLs, then wait**

Ask the user. Then:

```bash
for id in 1809369636 1809369661 1809369670 1809369674 1809369676; do
  doctl compute domain records update fhwrdh.net --record-id $id --record-ttl 300
done
```

Wait at least 1 hour (the old TTL was 3600). Save the pre-change state for rollback:

```bash
doctl compute domain records list fhwrdh.net --format ID,Type,Name,Data,TTL --no-header > /private/tmp/fhwrdh.net-dns-before.txt
```

- [ ] **Step 2: Update nginx for the real names (HTTP only, before DNS flips)**

Edit the local source file `docs/superpowers/plans/assets/fhwrdh.net.nginx`: change `server_name new.fhwrdh.net;` to `server_name fhwrdh.net www.fhwrdh.net new.fhwrdh.net;`. Then split off www with a redirect by adding this block above the existing one:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name www.fhwrdh.net;
    return 301 https://fhwrdh.net$request_uri;
}
```

and change the main block's `server_name` to `fhwrdh.net new.fhwrdh.net;`.

Note: certbot has already rewritten the server block on the droplet for `new.`; do not overwrite the server copy wholesale. **USER (sudo)**: edit `/etc/nginx/sites-available/fhwrdh.net` on the droplet, set `server_name fhwrdh.net new.fhwrdh.net;` in the existing 443 and 80 blocks, add the www block above, then `sudo nginx -t && sudo systemctl reload nginx`.

- [ ] **Step 3: APPROVAL — flip DNS**

Ask the user. Then:

```bash
doctl compute domain records update fhwrdh.net --record-id 1809369636 --record-data 159.223.202.42
for id in 1809369661 1809369670 1809369674; do
  doctl compute domain records delete fhwrdh.net $id --force
done
doctl compute domain records update fhwrdh.net --record-id 1809369676 --record-data @
```

Verify: `dig +short fhwrdh.net @ns1.digitalocean.com` prints only `159.223.202.42`; `dig +short www.fhwrdh.net @ns1.digitalocean.com` shows `fhwrdh.net.` then the same IP.

- [ ] **Step 4: USER (sudo) — issue the real certificate right away**

```bash
sudo certbot --nginx -d fhwrdh.net -d www.fhwrdh.net
sudo nginx -t && sudo systemctl reload nginx
```

Expected: certbot deploys the certificate and adds HTTP→HTTPS redirects. Then confirm www redirects over HTTPS: `curl -sI https://www.fhwrdh.net/work/ftprtu | grep -i location` prints `location: https://fhwrdh.net/work/ftprtu`. If www HTTPS is not redirecting, add `return 301 https://fhwrdh.net$request_uri;` to the 443 block for `www.fhwrdh.net`.

- [ ] **Step 5: Verify production**

```bash
curl -sI https://fhwrdh.net/ | grep -iE "^HTTP|server"
curl -sI https://fhwrdh.net/work/angleofrepose | head -1
curl -sI https://photo.fhwrdh.net/ | grep -i location
```

Expected: `server: nginx` (not GitHub.com), 200 on the deep link, photo redirect to `https://fhwrdh.net/`. In the browser tool: open `https://photo.fhwrdh.net/#/work/ftprtu`; expected final URL `https://fhwrdh.net/work/ftprtu` (the fragment survives the 301 and the shim rewrites it). Also confirm `https://resume.fhwrdh.net` still loads.

- [ ] **Step 6: Renewal dry run**

USER (sudo): `sudo certbot renew --dry-run`. Expected: all simulated renewals succeed, including `fhwrdh.net`.

- [ ] **Step 7: Rollback procedure (reference, only if needed)**

APPROVAL first. Restores the Pages DNS:

```bash
doctl compute domain records update fhwrdh.net --record-id 1809369636 --record-data 185.199.108.153
for ip in 185.199.109.153 185.199.110.153 185.199.111.153; do
  doctl compute domain records create fhwrdh.net --record-type A --record-name @ --record-data $ip --record-ttl 300
done
doctl compute domain records update fhwrdh.net --record-id 1809369676 --record-data fhwrdh.github.io.
```

Pages still serves the frozen last `gh-pages` deployment (hash-router build), which works as before.

---

### Task 6: Merge, docs, soak

**Files:**
- Modify: `CLAUDE.md`, `README.md`
- Modify: `~/dev/fhwrdh/DIGITALOCEAN.md`

- [ ] **Step 1: Update repo docs**

In `CLAUDE.md`: change the deploy command comment to `npm run deploy     # Build + rsync to the sfo3 droplet (see scripts/deploy.sh)`; replace "Uses hash-based routing (`createHashRouter`) for GitHub Pages compatibility." with "Uses path-based routing (`createBrowserRouter`); nginx falls back to `index.html`. `src/legacyHash.js` rewrites old `#/...` links."; change "served at fhwrdh.net" context to say hosted on the sfo3 droplet; change "No tests exist in this project" to "Only test: `npm test` (node:test, `src/legacyHash.test.js`)"; add `npm test` to the Commands list and fix the `npm run build` comment (it no longer writes CNAME); replace the Playwright note about hash URLs (`https://fhwrdh.net/#/work/ftprtu`) with `https://fhwrdh.net/work/ftprtu`. Run `grep -n -i "hash\|gh-pages\|GitHub Pages" CLAUDE.md README.md` and fix every remaining stale mention.

- [ ] **Step 2: Update infrastructure doc**

In `~/dev/fhwrdh/DIGITALOCEAN.md`: add `fhwrdh.net` and `www` to the sfo3 "Serving" row; add a section modeled on the ferry one (static files at `/home/fhwrdh/fhwrdh.net/dist`, nginx config `/etc/nginx/sites-available/fhwrdh.net`, Let's Encrypt, deploy `npm run deploy` in the repo); rewrite the "fhwrdh.net — Vestigial" and "Domains & DNS" fhwrdh.net sections (A record now `159.223.202.42`, `www` CNAME to `@`, `new` A record, GitHub Pages only for `resume.`); change the SSL table row to Let's Encrypt.

- [ ] **Step 3: Commit, push, and merge**

APPROVAL (push). Pushing `migrate-to-droplet` is safe: the Pages workflow no longer exists on it.

```bash
git add CLAUDE.md README.md
git commit -m "docs: update for droplet hosting and path routing"
git push -u origin migrate-to-droplet
```

Then merge to `main` (PR or fast-forward per the user's preference). Verify no Actions run starts: https://github.com/fhwrdh/fhwrdh.github.io/actions.

- [ ] **Step 4: Soak**

Wait 7 days. Check periodically: `curl -sI https://fhwrdh.net/ | head -1`, and that `certbot.timer` is active (`systemctl is-active certbot.timer`). Proceed to Task 7 only if the user confirms no problems.

- [ ] **Step 5: Clean up staging**

APPROVAL, then delete the `new` A record (`doctl compute domain records list fhwrdh.net` to get its ID, then `doctl compute domain records delete fhwrdh.net <id> --force`). USER (sudo): remove `new.fhwrdh.net` from `server_name`, then `sudo certbot delete --cert-name new.fhwrdh.net` and reload nginx.

---

### Task 7: Decommission Pages and rename the repo

**Files:**
- Repo settings (GitHub), local remote URL, local directory, `package.json` name

Order matters: Pages first (rollback ends here), then rename. Renaming a user-site repo (`fhwrdh.github.io`) removes the `fhwrdh.github.io` Pages site. `resume.fhwrdh.net` CNAMEs to that hostname but is bound to the `resume-react` repo's own CNAME file, so it should keep working; this is verified in Step 3 and reversible in Step 4.

- [ ] **Step 1: APPROVAL — unpublish Pages**

Releases the `fhwrdh.net` custom-domain claim on GitHub so nobody else can claim it.

```bash
gh api -X DELETE repos/fhwrdh/fhwrdh.github.io/pages
```

Expected: no error output. Remove the now-meaningless `CNAME` file from the repo root in the next commit (Step 5).

- [ ] **Step 2: APPROVAL — rename the repo**

```bash
gh repo rename fhwrdh.net --repo fhwrdh/fhwrdh.github.io --yes
```

GitHub redirects the old repo URL (clone and web). Expected: `✓ Renamed repository fhwrdh/fhwrdh.net`.

- [ ] **Step 3: Verify resume**

```bash
curl -sI https://resume.fhwrdh.net/ | head -1
```

Expected: `HTTP/2 200`. In the browser tool confirm the resume page renders.

- [ ] **Step 4: Rollback if resume broke**

APPROVAL, then `gh repo rename fhwrdh.github.io --repo fhwrdh/fhwrdh.net --yes`, re-check Step 3, and stop to rethink (e.g. move resume to the droplet too).

- [ ] **Step 5: Update local checkout**

```bash
cd ~/dev/fhwrdh/fhwrdh.github.io
git remote set-url origin https://github.com/fhwrdh/fhwrdh.net
git rm CNAME
```

In `package.json` change `"name": "fhwrdh.github.io"` to `"name": "fhwrdh.net"`. Update the repo name in `CLAUDE.md` (the actions URL and any repo references) and in `scripts`/docs that mention `fhwrdh.github.io`: `grep -rn "fhwrdh.github.io" . --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git` and fix each hit except `resume.fhwrdh.net` CNAME references in `~/dev/fhwrdh/DIGITALOCEAN.md`, which correctly stay. Then:

```bash
git add -A package.json package-lock.json CLAUDE.md
git commit -m "chore: rename repo to fhwrdh.net, drop Pages CNAME"
git push
```

- [ ] **Step 6: Rename the local directory and fix references**

```bash
cd ~/dev/fhwrdh && mv fhwrdh.github.io fhwrdh.net
```

Update `~/dev/fhwrdh/CLAUDE.md` and `~/dev/CLAUDE.md` if they reference the old directory name; `DIGITALOCEAN.md` deploy paths if any. Update `.claude/settings.local.json` absolute paths in the repo (`sed -i '' 's#fhwrdh/fhwrdh.github.io#fhwrdh/fhwrdh.net#g' fhwrdh.net/.claude/settings.local.json`).

- [ ] **Step 7: Update the memory file**

Edit `~/.claude/projects/-Users-stout-dev/memory/fhwrdh-site-migration-and-flickr-archive.md`: mark project #1 done with the date, record the new repo name/path and deploy command, keep #2 (Flickr archive) as the open item.

---

## Self-Review

- **Spec coverage:** real paths (Tasks 1–2); old `#/` link shim (Task 1, wired in Task 2); drop gh-pages dep / cname script / Actions workflow (Task 3); `scripts/deploy.sh` rsync to `~/fhwrdh.net/dist` (Task 3); nginx `try_files` fallback (Task 4); www→apex 301 (Task 5); Let's Encrypt (Tasks 4–5); stage at `new.fhwrdh.net` (Task 4); lower TTL, cut DNS, keep Pages for rollback (Task 5, rollback Step 7); leave `photo.` and `resume.` alone (constraints, verified Task 5 Step 5 and Task 7 Step 3); repo rename (Task 7); docs (Task 6).
- **Placeholders:** none. Record IDs, IPs, and commands are literal.
- **Consistency:** `migrateLegacyHash(location, history)` is the same in the test, implementation, and router call. Remote path `~/fhwrdh.net/dist` is the same in the script, nginx root, and docs.
- **Known risks:** brief TLS-error window at cutover (Task 5); the `resume.` behaviour after rename is verified rather than assumed (Task 7); Flickr archive is out of scope and remains the next project.
