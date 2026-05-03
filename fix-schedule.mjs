import fs from 'fs';

// Read file
const content = fs.readFileSync('docs/PUBLICATION_SCHEDULE.json', 'utf8');

// Find the last occurrence of ']' before the final '}'
const lastBraceIndex = content.lastIndexOf('}');
let braceCount = 0;
let lastValidBracketIndex = -1;

// Find the position of the last ] that would result in valid JSON
for (let i = 0; i < lastBraceIndex; i++) {
  if (content[i] === '[') braceCount++;
  if (content[i] === ']') {
    braceCount--;
    if (braceCount === 0) {
      lastValidBracketIndex = i;
    }
  }
}

if (lastValidBracketIndex === -1) {
  console.log('Could not find valid JSON structure');
  process.exit(1);
}

// Get valid JSON part
const validJsonStr = content.substring(0, lastValidBracketIndex + 1) + '\n}';

// Parse
let data;
try {
  data = JSON.parse(validJsonStr);
  console.log('Successfully parsed JSON');
} catch (e) {
  console.log('Parse error:', e.message);
  process.exit(1);
}

// Ensure entries is array
if (!Array.isArray(data.entries)) {
  data.entries = [];
}

// Add new entry if not exists
const newSlug = 'strategi-properti-komersial-waralaba-retail-alfamart-indomaret';
const exists = data.entries.some(e => e.slug === newSlug);

if (!exists) {
  data.entries.push({
    slug: newSlug,
    date: '2026-01-03',
    published_at_wib: '2026-01-03 09:00 WIB',
    status: '✅',
    path: 'artikel/tier-3-asset-builder/strategi-properti-komersial-waralaba-retail-alfamart-indomaret.md',
    notes: 'Property + retail franchise strategy for Tier3 Asset Builders, 2081 words, Syamsul Alam voice, comprehensive guide with ROI calculations, case study, risk mitigation, action steps, Duit.co.id ecosystem integration'
  });
  console.log('Added new entry');
} else {
  console.log('Entry already exists');
}

// Sort by date
data.entries.sort((a, b) => a.date.localeCompare(b.date));

// Write back
fs.writeFileSync('docs/PUBLICATION_SCHEDULE.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated PUBLICATION_SCHEDULE.json');
