#!/usr/bin/env bash
# Smaller copies of the large photos for srcset (phones and half-width layouts).
# Same pixels, resized only: no crop, no grade. Metadata stripped.
# Usage: scripts/make-image-sizes.sh   (writes public/images/sized/)
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/images/sized

resize() { # <source> <width>
  local src="public/images/$1" name="${1%.jpg}"
  ffmpeg -y -loglevel error -i "$src" -vf "scale=$2:-2:flags=lanczos" -map_metadata -1 -q:v 3 \
    "public/images/sized/${name}-$2.jpg"
}

resize talkhouse-stage.jpg 1200
resize 89north-full-band.jpg 1200
resize 89north-noah-trombone.jpg 1200
# Not the Meroke Lane cover: resizing would strip its Content Credentials (C2PA), which
# ASSETS.md keeps intact. The site serves the original cover.
ls -la public/images/sized
