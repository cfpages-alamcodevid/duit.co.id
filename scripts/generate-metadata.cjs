#!/usr/bin/env node
/**
 * generate-metadata.js
 * 
 * Reads ARTICLE_CATALOG.md and generates missing metadata entries
 * for all JSON metadata files.
 * 
 * Usage: node scripts/generate-metadata.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'docs', 'ARTICLE_CATALOG.md');
const JSON_DIR = path.join(ROOT, 'JSON');

// JSON files to update
const JSON_FILES = {
  seo: path.join(JSON_DIR, 'article-seo.json'),
  taxonomy: path.join(JSON_DIR, 'article-taxonomy.json'),
  tags: path.join(JSON_DIR, 'article-tags.json'),
  dates: path.join(JSON_DIR, 'article-dates.json'),
  access: path.join(JSON_DIR, 'article-access.json'),
  media: path.join(JSON_DIR, 'article-media.json'),
};

// Parse ARTICLE_CATALOG.md
function parseCatalog() {
  const content = fs.readFileSync(CATALOG_PATH, 'utf8');
  const lines = content.split(/\r?\n/);
  const articles = [];
  
  let currentTier = '';
  let currentTierName = '';
  
  for (const line of lines) {
    // Detect tier headers
    const tierMatch = line.match(/^## (Tier \d+): (.+?) \(/);
    if (tierMatch) {
      currentTier = `tier-${tierMatch[1].replace('Tier ', '').toLowerCase()}-${tierMatch[2].toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`;
      currentTierName = tierMatch[2];
      continue;
    }
    
    // Parse table rows
    const rowMatch = line.match(/^\| (\d+\.\d+[a-z]?) \| (.+?) \| (.+?) \| (.+?) \| (.+?) \| (.+?) \| (.+?) \| (.+?) \| (.+?) \|$/);
    if (rowMatch) {
      const [, number, cluster, title, slug, category, gender, age, status, notes] = rowMatch;
      
      // Skip non-published articles
      if (!status.includes('✅')) continue;
      
      articles.push({
        number: number.trim(),
        cluster: cluster.trim(),
        title: title.trim(),
        slug: slug.trim(),
        category: category.trim().split(',').map(c => c.trim()),
        gender: gender.trim(),
        age: age.trim(),
        status: status.trim(),
        notes: notes.trim(),
        tier: currentTier,
        tierName: currentTierName,
      });
    }
  }
  
  return articles;
}

// Generate SEO metadata
function generateSeo(article) {
  const description = article.notes 
    ? article.notes.substring(0, 160)
    : `Panduan lengkap ${article.title.toLowerCase()} untuk ${article.tierName}. Data dan strategi terbaru 2025-2026.`;
  
  return {
    title: article.title,
    author: 'Duit.co.id Team',
    description: description,
    image: `/images/artikel/${article.slug}.jpg`,
  };
}

// Generate taxonomy metadata
function generateTaxonomy(article) {
  const education = article.age === 'muda' ? 'sma' : 's1';
  const location = article.category.includes('bisnis') || article.category.includes('karir') ? 'kota' : 'kota';
  
  return {
    tier: article.tier,
    age: article.age,
    education: education,
    location: location,
    gender: article.gender,
    category: article.category,
    cluster: article.cluster,
  };
}

// Generate tags metadata
function generateTags(article) {
  const tags = [];
  
  // Add category-based tags
  article.category.forEach(cat => {
    if (cat && cat.length > 2) tags.push(cat);
  });
  
  // Add cluster-based tags
  if (article.cluster) {
    const clusterWords = article.cluster.toLowerCase().split(/[\s&]+/).filter(w => w.length > 3);
    tags.push(...clusterWords.slice(0, 2));
  }
  
  // Add slug-based tags
  const slugWords = article.slug.split('-').filter(w => w.length > 3);
  tags.push(...slugWords.slice(0, 3));
  
  // Deduplicate
  return [...new Set(tags)].slice(0, 8);
}

// Generate date metadata
function generateDate(article) {
  // Use today's date for new articles
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Generate access metadata
function generateAccess() {
  return {
    access_level: 'open',
    is_premium: false,
    youtube_lock: false,
  };
}

// Generate media metadata
function generateMedia() {
  return {
    youtube_embed_position: 'top',
  };
}

// Main function
function main() {
  console.log('📖 Parsing ARTICLE_CATALOG.md...');
  const articles = parseCatalog();
  console.log(`✅ Found ${articles.length} published articles\n`);
  
  // Load existing JSON files
  const seo = JSON.parse(fs.readFileSync(JSON_FILES.seo, 'utf8'));
  const taxonomy = JSON.parse(fs.readFileSync(JSON_FILES.taxonomy, 'utf8'));
  const tags = JSON.parse(fs.readFileSync(JSON_FILES.tags, 'utf8'));
  const dates = JSON.parse(fs.readFileSync(JSON_FILES.dates, 'utf8'));
  const access = JSON.parse(fs.readFileSync(JSON_FILES.access, 'utf8'));
  const media = JSON.parse(fs.readFileSync(JSON_FILES.media, 'utf8'));
  
  // Track additions
  const stats = { seo: 0, taxonomy: 0, tags: 0, dates: 0, access: 0, media: 0 };
  const missing = [];
  
  for (const article of articles) {
    const { slug } = article;
    let isMissing = false;
    
    // SEO
    if (!seo[slug]) {
      seo[slug] = generateSeo(article);
      stats.seo++;
      isMissing = true;
    }
    
    // Taxonomy
    if (!taxonomy[slug]) {
      taxonomy[slug] = generateTaxonomy(article);
      stats.taxonomy++;
      isMissing = true;
    }
    
    // Tags
    if (!tags[slug]) {
      tags[slug] = generateTags(article);
      stats.tags++;
      isMissing = true;
    }
    
    // Dates
    if (!dates[slug]) {
      dates[slug] = generateDate(article);
      stats.dates++;
      isMissing = true;
    }
    
    // Access
    if (!access[slug]) {
      access[slug] = generateAccess();
      stats.access++;
      isMissing = true;
    }
    
    // Media
    if (!media[slug]) {
      media[slug] = generateMedia();
      stats.media++;
      isMissing = true;
    }
    
    if (isMissing) {
      missing.push(slug);
    }
  }
  
  console.log('📊 Missing metadata summary:');
  console.log(`   SEO:      ${stats.seo} entries to add`);
  console.log(`   Taxonomy: ${stats.taxonomy} entries to add`);
  console.log(`   Tags:     ${stats.tags} entries to add`);
  console.log(`   Dates:    ${stats.dates} entries to add`);
  console.log(`   Access:   ${stats.access} entries to add`);
  console.log(`   Media:    ${stats.media} entries to add`);
  console.log(`\n   Total unique articles needing metadata: ${missing.length}\n`);
  
  if (DRY_RUN) {
    console.log('🔍 DRY RUN — no files written.');
    console.log('\nMissing slugs:');
    missing.forEach(s => console.log(`  - ${s}`));
    return;
  }
  
  // Sort keys alphabetically before writing
  function sortObject(obj) {
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  }
  
  // Write updated JSON files
  console.log('💾 Writing updated JSON files...');
  fs.writeFileSync(JSON_FILES.seo, JSON.stringify(sortObject(seo), null, 2) + '\n');
  fs.writeFileSync(JSON_FILES.taxonomy, JSON.stringify(sortObject(taxonomy), null, 2) + '\n');
  fs.writeFileSync(JSON_FILES.tags, JSON.stringify(sortObject(tags), null, 2) + '\n');
  fs.writeFileSync(JSON_FILES.dates, JSON.stringify(sortObject(dates), null, 2) + '\n');
  fs.writeFileSync(JSON_FILES.access, JSON.stringify(sortObject(access), null, 2) + '\n');
  fs.writeFileSync(JSON_FILES.media, JSON.stringify(sortObject(media), null, 2) + '\n');
  
  console.log('✅ All JSON files updated successfully!');
}

main();
