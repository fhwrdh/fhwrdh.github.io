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
rsync -az --delete --chmod=D755,F644 dist/ "$HOST:$REMOTE/dist/"

echo "==> done: https://fhwrdh.net (staging: https://new.fhwrdh.net)"
