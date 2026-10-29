// Production guard: fails the production build if placeholder text or placeholder markup
// reaches dist/ HTML. On previews and local builds it only lists what's still owed.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const production = process.env.CONTEXT === 'production';
const checks = [
  // Bracketed placeholder text like [SET LENGTHS] or [Poster image], in visible text only.
  { re: /\[[A-Z][^\]<>\n]{0,80}\]/g, why: 'bracketed placeholder' },
  { re: /class="[^"]*\b(ph|ph-inline|ph-tag|ph-btn)\b[^"]*"/g, why: 'placeholder class' },
];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) files.push(p);
  }
})('dist');

const hits = [];
for (const f of files) {
  // Scripts, styles and JSON-LD aren't visible copy.
  const html = readFileSync(f, 'utf8').replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '');
  for (const { re, why } of checks) {
    for (const m of html.matchAll(re)) hits.push(`${f}  ${why}: ${m[0]}`);
  }
}

if (!hits.length) {
  console.log(`check-dist: ${files.length} pages, no placeholders`);
} else if (production) {
  console.error(`check-dist: placeholders in the production build:\n${hits.join('\n')}`);
  process.exit(1);
} else {
  console.log(`check-dist: ${hits.length} placeholder(s), allowed outside production:\n${hits.join('\n')}`);
}
