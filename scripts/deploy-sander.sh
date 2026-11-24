#!/usr/bin/env bash
# Ship ONLY public/sander/ to the droplet. No Vite build, no --delete.
# Use this to iterate on the Sander page; use `npm run deploy` for the whole site.
set -euo pipefail

HOST="fhwrdh@159.223.202.42"
REMOTE="~/fhwrdh.net/dist/sander"

# macOS ships rsync 2.6.9, which has no --chmod. Fix modes at the source instead,
# or nginx gets files it cannot read and serves 403.
echo "==> normalising modes"
find public/sander -type d -exec chmod 755 {} +
find public/sander -type f -exec chmod 644 {} +

echo "==> syncing public/sander/ -> $REMOTE"
ssh "$HOST" "mkdir -p $REMOTE"
rsync -az public/sander/ "$HOST:$REMOTE/"

echo "==> verifying"
curl -sI https://new.fhwrdh.net/sander/ | head -3

echo "==> done: https://new.fhwrdh.net/sander/"
