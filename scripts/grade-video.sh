#!/usr/bin/env bash
# Warm grade + web encode for the hero loop (and any band footage), per CLAUDE.md.
# Usage: scripts/grade-video.sh input.mov public/video/hero-desktop.mp4
# Writes the graded MP4 (no audio, H.264, faststart) and a matching JPG poster next to it.
# Target: 6 to 10 sec, under 3 MB. Trim before grading if the source is longer.
set -euo pipefail

if [ $# -ne 2 ]; then
  echo "Usage: $0 <input> <output.mp4>" >&2
  exit 1
fi

in="$1"
out="$2"
poster="${out%.*}-poster.jpg"

GRADE="colorbalance=rs=0.10:gs=0.02:bs=-0.12:rm=0.08:bm=-0.10:rh=0.04:bh=-0.06,eq=saturation=0.92:contrast=1.04"

ffmpeg -y -loglevel error -i "$in" \
  -vf "${GRADE},scale='min(1920,iw)':-2" \
  -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  "$out"

ffmpeg -y -loglevel error -i "$out" -frames:v 1 -q:v 3 "$poster"

size=$(wc -c < "$out")
echo "Wrote $out ($((size / 1024)) KB) and $poster"
if [ "$size" -gt 3145728 ]; then
  echo "Warning: over 3 MB. Trim the clip or raise -crf." >&2
fi
