#!/usr/bin/env bash
# Ship ONLY public/sander/ to the droplet. No Vite build, no --delete.
# Use this to iterate on the Sander page; use `npm run deploy` for the whole site.
set -euo pipefail

HOST="fhwrdh@159.223.202.42"
REMOTE="~/fhwrdh.net/dist/sander"

echo "==> syncing public/sander/ -> $REMOTE"
ssh "$HOST" "mkdir -p $REMOTE"
rsync -az --chmod=D755,F644 --info=progress2 public/sander/ "$HOST:$REMOTE/"

echo "==> verifying"
curl -sI https://fhwrdh.net/sander/ | head -3

echo "==> done: https://fhwrdh.net/sander/"
