const fs = require('fs');
const path = 'docs/PUBLICATION_SCHEDULE.json';

// Read the file
let content = fs.readFileSync(path, 'utf8');

// Find the first entries array and the second one
const firstEntriesMatch = content.match(/"entries"\s*:\s*\[/);
if (!firstEntriesMatch) {
  console.log('No entries found');
  process.exit(1);
}

// Find the start of first entries
const firstStart = firstEntriesMatch.index + firstEntriesMatch[0].length;

// Find the second "entries" if exists
const secondEntriesMatch = content.indexOf('"entries"', firstStart);
let validJson;

if (secondEntriesMatch > -1) {
  // There are duplicate entries - get content before second entries
  const beforeSecond = content.substring(0, secondEntriesMatch);
  // Find the last } before second entries that closes the first entries
  const lastBraceBeforeSecond = beforeSecond.lastIndexOf('}');
  validJson = content.substring(0, lastBraceBeforeSecond + 1);
} else {
  validJson = content;
}

// Try to parse
let data;
try {
  data = JSON.parse(validJson);
} catch (e) {
  console.log('Parse error:', e.message);
  // Try to fix by finding the valid part
  const fixedContent = validJson.substring(0, validJson.lastIndexOf(']') + 1) + '\n  ]\n}';
  try {
    data = JSON.parse(fixedContent);
  } catch (e2) {
    console.log('Still error:', e2.message);
    process.exit(1);
  }
}

// Ensure entries is an array
if (!Array.isArray(data.entries)) {
  data.entries = [];
}

// Check if our slug already exists
const existingIndex = data.entries.findIndex(e => e.slug === 'strategi-properti-komersial-waralaba-retail-alfamart-indomaret');
const newEntry = {
  "slug": "strategi-properti-komersial-waralaba-retail-alfamart-indomaret",
  "date": "2026-01-03",
  "published_at_wib": "2026-01-03 09:00 WIB",
  "status": "✅",
  "path": "artikel/tier-3-asset-builder/strategi-properti-komersial-waralaba-retail-alfamart-indomaret.md",
  "notes": "Property + retail franchise strategy for Tier3 Asset Builders, 2081 words, Syamsul Alam voice, comprehensive guide with ROI calculations, case study (Bapak Budi Bekasi), risk mitigation, action steps, Duit.co.id ecosystem integration"
};

if (existingIndex > -1) {
  data.entries[existingIndex] = newEntry;
  console.log('Updated existing entry');
} else {
  data.entries.push(newEntry);
  console.log('Added new entry');
}

// Sort by date
data.entries.sort((a, b) => a.date.localeCompare(b.date));

// Write back
fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated PUBLICATION_SCHEDULE.json');
