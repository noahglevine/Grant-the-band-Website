// Brand guard: fails the build if banned copy sneaks into the source.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const banned = [
  { re: /—/, why: 'em dash' },
  { re: /&mdash;/, why: 'em dash entity' },
  { re: /unforgettable/i, why: '"unforgettable"' },
];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|ts|json|css|md|mjs)$/.test(name)) files.push(p);
  }
})('src');

let bad = 0;
for (const f of files) {
  readFileSync(f, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const { re, why } of banned) {
        if (re.test(line)) {
          console.error(`${f}:${i + 1}  ${why}`);
          bad++;
        }
      }
    });
}
if (bad) process.exit(1);
console.log(`check-copy: ${files.length} files clean`);
