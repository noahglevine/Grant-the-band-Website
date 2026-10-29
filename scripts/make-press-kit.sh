#!/usr/bin/env bash
# Builds public/press/grant-the-band-press-kit.zip: full-res photos, the cover (original,
# Content Credentials intact), the monogram, press/bio.txt and the stage plot once it exists.
# Rerun after any of those change, e.g. when the stage plot PDF lands.
set -euo pipefail
cd "$(dirname "$0")/.."
out=public/press/grant-the-band-press-kit.zip
files=(
  public/images/89north-full-band.jpg
  public/images/89north-noah-trombone.jpg
  public/images/talkhouse-stage.jpg
  public/images/talkhouse-noah.jpg
  public/images/meroke-lane-cover.jpg
  public/images/gtb-monogram.png
  press/bio.txt
)
[ -f public/press/grant-the-band-stage-plot.pdf ] && files+=(public/press/grant-the-band-stage-plot.pdf)
rm -f "$out"
# -j: flat folder, -X: no extra file attributes.
zip -j -X -q "$out" "${files[@]}"
unzip -l "$out"
