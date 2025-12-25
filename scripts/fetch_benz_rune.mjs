#!/usr/bin/env node

// fetch_benz_rune.mjs
// Simple Node.js ESM script to read and print the benz_rune.json file.
// Usage:
//   node scripts/fetch_benz_rune.mjs [path/to/benz_rune.json]
// Defaults to: website/data/benz_rune.json

import { readFile } from 'fs/promises';
import path from 'path';

const DEFAULT_PATH = 'website/data/benz_rune.json';
const input = process.argv[2] || DEFAULT_PATH;
const filePath = path.resolve(input);

async function main() {
  try {
    const raw = await readFile(filePath, 'utf8');
    const data = JSON.parse(raw);

    console.log(`Loaded: ${filePath}`);
    console.log('');
    console.log(JSON.stringify(data, null, 2));
    console.log('');
    console.log('Summary:');
    console.log('  Rune:         ', data.rune ?? '—');
    console.log('  Spaced Rune:  ', data.spaced_rune ?? '—');
    console.log('  Cap:          ', data.cap ?? '—');
    console.log('  Premine:      ', data.premine ?? '—');
    console.log('  Mint amount:  ', data.mint_amount ?? '—');
    console.log('  Source:       ', data.source ?? '—');

    // Optional: compute and display percentage premine of cap if numeric
    if (typeof data.cap === 'number' && typeof data.premine === 'number') {
      const pct = (data.premine / data.cap) * 100;
      console.log('  Premine % of cap:', pct.toFixed(6) + '%');
    }
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

main();
