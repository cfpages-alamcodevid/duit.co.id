# Content Taxonomy & Filtering System

The "My Feed" discovery engine uses the following taxonomy to filter and display personalized content (articles/tools).

## 1. Income Tier (Primary Filter)
- `tier-0-survival`: Debt relief, survival budgeting.
- `tier-1-hustler`: Side hustles, high-income skills.
- `tier-2-scaler`: Systematization, scaling business.
- `tier-3-asset-builder`: Investments, real estate, franchise.
- `tier-4-legacy`: Holding companies, wealth protection.

## 2. Gender (Specific Interest Filter)
Certain business ideas or tools are specifically relevant to a particular gender or both.
- `male`: Content specifically targeting men (e.g., specific manual labor side hustles).
- `female`: Content specifically targeting women (e.g., specialized service-based consulting or female-led entrepreneurship niches).
- `unisex`: Content relevant to all genders (e.g., general stock market investing, tax laws).

**Filtering Logic:**
- If user is `male`, display: `male` + `unisex`.
- If user is `female`, display: `female` + `unisex`.
- If user is `other/prefer-not-to-say`, display: `unisex`.

## 3. Age Group
- `muda`: Fresh graduates, university students.
- `produktif`: Active workers, families.
- `pensiun`: Retirement planning, passive income focus.

## 4. Other Taxonomy Filters
- **Location:** `desa`, `kota`, `global`.
- **Education:** `sma`, `s1`, `s2`, `spesialis`.
- **Category:** `karir`, `bisnis`, `legal`, `investasi`, `hukum`.

## 5. Frontmatter Example
Every Markdown content file must include these tags in its YAML frontmatter:
```yaml
---
title: "Jastip Barang Mewah untuk Ibu Rumah Tangga"
tier: "tier-1-hustler"
gender: "female"
age: "produktif"
location: "kota"
education: "bebas"
---
```
