// Mirror the ClaritX evidence dataset into this repository.
//
// Every file is verified before it is written: it must arrive as CSV (not as
// an HTML page wearing a .csv name) and carry exactly the row count the
// manifest promises. A snapshot that fails either test is not committed —
// the repository keeps the last good one rather than recording a broken night.
import { mkdir, writeFile } from 'node:fs/promises';

const MANIFEST = 'https://www.claritx.ai/data/claritx-evidence.json';

const res = await fetch(MANIFEST);
if (!res.ok) throw new Error(`manifest ${res.status}`);
const manifest = await res.json();

const files = [];
for (const f of manifest.files) {
  const r = await fetch(f.url);
  const type = (r.headers.get('content-type') || '').toLowerCase();
  const text = await r.text();
  if (!r.ok) throw new Error(`${f.url}: ${r.status}`);
  if (!type.includes('csv') || /^\s*</.test(text)) throw new Error(`${f.url}: not CSV (${type})`);
  const rows = text.trim().split('\n').length - 1;
  if (rows !== f.rows) throw new Error(`${f.url}: ${rows} rows, manifest says ${f.rows}`);
  files.push({ name: f.url.split('/').pop(), text: text.endsWith('\n') ? text : `${text}\n` });
}

await mkdir('data', { recursive: true });
for (const f of files) await writeFile(`data/${f.name}`, f.text);
// "generated" changes every build even when no number does; drop it so a
// commit only happens when the record itself moved.
const { generated, ...stable } = manifest;
await writeFile('data/claritx-evidence.json', `${JSON.stringify(stable, null, 2)}\n`);

console.log(`snapshot ${manifest.snapshot_date}: ${files.map((f) => f.name).join(', ')}`);
await writeFile(process.env.GITHUB_OUTPUT || '/dev/null', `snapshot=${manifest.snapshot_date}\n`, { flag: 'a' });
