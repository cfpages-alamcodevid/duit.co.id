# Duit.co.id Financial Quiz Specification

## 1. Overview

The Financial Quiz is the **primary entry point** and **onboarding mechanism** for Duit.co.id. It serves multiple purposes:
- Classifies users into income tiers for content personalization
- Collects valuable demographic and financial data
- Provides immediate value through personalized recommendations
- Creates engagement and investment in the platform

**Quiz Location:** `/quiz`
**Estimated Completion Time:** 2-3 minutes
**Required:** No (users can skip and browse freely)
**Recommended:** Yes (personalized experience)

---

## 2. Quiz Flow

### Step-by-Step User Journey

```
Landing Page → "Start Quiz" CTA → /quiz
  ↓
Step 1: Basic Info (Age Group)
  ↓
Step 2: Gender Perspective
  ↓
Step 3: Primary Income
  ↓
Step 4: Additional Income (if business owner)
  ↓
Step 5: Asset Assessment
  ↓
Step 6: Debt Situation
  ↓
Step 7: Education Level
  ↓
Step 8: Location Type
  ↓
Results: Tier Assignment + Personalized Recommendations
  ↓
CTA: "Enter My Dashboard" → Register (free) or Continue Browsing
```

---

## 3. Quiz Questions

### Question 1: Age Group
**Question:** "Berapa kelompok usia Anda saat ini?"

**Options:**
- `Di bawah 20 tahun` → age_group: `muda`
- `20 - 35 tahun` → age_group: `produktif`
- `36 - 50 tahun` → age_group: `produktif`
- `Di atas 50 tahun` → age_group: `pensiun`

**Purpose:** Determines content tone and life-stage relevance

---

### Question 2: Gender Perspective
**Question:** "Perspektif apa yang Anda pilih untuk saran keuangan?"

**Options:**
- `Maskulin (Pertumbuhan Agresif)` → gender: `male`
- `Feminin (Stabilitas & Keamanan)` → gender: `female`
- `Netral` → gender: `unisex`

**Purpose:** Filters content by gender-specific advice where applicable

---

### Question 3: Primary Monthly Income
**Question:** "Berapa pendapatan bersih Anda per bulan?"

**Options:**
- `Kurang dari Rp 5 juta` → monthly_income_net: `<5000000`, potential_tier: `tier-0` or `tier-1`
- `Rp 5 juta - Rp 10 juta` → monthly_income_net: `5000000-10000000`, potential_tier: `tier-1`
- `Rp 10 juta - Rp 50 juta` → monthly_income_net: `10000000-50000000`, potential_tier: `tier-2`
- `Rp 50 juta - Rp 100 juta` → monthly_income_net: `50000000-100000000`, potential_tier: `tier-2` or `tier-3`
- `Rp 100 juta - Rp 500 juta` → monthly_income_net: `100000000-500000000`, potential_tier: `tier-3`
- `Rp 500 juta - Rp 1 milyar` → monthly_income_net: `500000000-1000000000`, potential_tier: `tier-3` or `tier-4`
- `Lebih dari Rp 1 milyar` → monthly_income_net: `>1000000000`, potential_tier: `tier-4`

**Purpose:** Primary tier classifier

---

### Question 4: Business Ownership
**Question:** "Apakah Anda memiliki bisnis sendiri?"

**Options:**
- `Ya, saya memiliki bisnis` → has_business: `true`
- `Tidak, saya karyawan/freelancer` → has_business: `false`
- `Ya, saya freelance/pekerja lepas` → has_business: `true` (self-employed)

**Branching Logic:**
- If "Ya" → Show Question 4a (Business Revenue)
- If "Tidak" → Skip to Question 5

**Purpose:** Identifies business owners for business-related content and revenue-based tier override

---

### Question 4a: Monthly Business Revenue (Conditional)
**Question:** "Berapa omzet bisnis Anda per bulan?"

**Options:**
- `Kurang dari Rp 10 juta` → monthly_business_revenue: `<10000000`
- `Rp 10 juta - Rp 50 juta` → monthly_business_revenue: `10000000-50000000`
- `Rp 50 juta - Rp 100 juta` → monthly_business_revenue: `50000000-100000000`
- `Rp 100 juta - Rp 500 juta` → monthly_business_revenue: `100000000-500000000`
- `Lebih dari Rp 500 juta` → monthly_business_revenue: `>500000000`

**Purpose:** Business revenue can override income-based tier classification

---

### Question 5: Asset Assessment
**Question:** "Berapa estimasi total aset Anda (properti, investasi, tabungan)?"

**Options:**
- `Kurang dari Rp 100 juta` → total_assets: `<100000000`
- `Rp 100 juta - Rp 500 juta` → total_assets: `100000000-500000000`
- `Rp 500 juta - Rp 1 milyar` → total_assets: `500000000-1000000000`
- `Rp 1 milyar - Rp 5 milyar` → total_assets: `1000000000-5000000000`
- `Rp 5 milyar - Rp 50 milyar` → total_assets: `5000000000-50000000000`
- `Lebih dari Rp 50 milyar` → total_assets: `>50000000000`

**Purpose:** Asset-based tier override (wealth builders with low income but high assets)

---

### Question 6: Debt Situation
**Question:** "Apakah Anda memiliki utang berbunga tinggi (misal: Pinjol, Kartu Kredit)?"

**Options:**
- `Ya, beberapa dan memberatkan` → debt_level: `high`, force_tier_override: `tier-0`
- `Ya, tapi masih terkelola` → debt_level: `medium`
- `Tidak, saya bebas utang` → debt_level: `none`

**Purpose:** Identifies users in financial crisis who need Tier 0 survival content regardless of income

---

### Question 7: Education Level
**Question:** "Apa tingkat pendidikan terakhir Anda?"

**Options:**
- `SMA atau sederajat` → edu_level: `sma`
- `S1 / D4 / Sarjana` → edu_level: `s1`
- `S2 / Magister` → edu_level: `s2`
- `S3 / Doktor / Spesialis` → edu_level: `spesialis`

**Purpose:** Content complexity and terminology adaptation

---

### Question 8: Location Type
**Question:** "Di mana Anda tinggal saat ini?"

**Options:**
- `Desa / Kawasan rural` → location_type: `desa`
- `Kota kecil` → location_type: `kota`
- `Kota besar (Jakarta, Surabaya, dll)` → location_type: `kota`
- `Luar Indonesia / Global` → location_type: `global`

**Purpose:** Location-specific advice (regulations, opportunities, cost of living)

---

## 4. Tier Classification Logic

### Primary Classification (Income-Based)

| Tier | Monthly Income Range | Label |
|------|---------------------|-------|
| **Tier 0** | < Rp 5 juta OR high debt | Survival (Bertahan) |
| **Tier 1** | Rp 5 juta - Rp 10 juta | Hustler (Pekerja Keras) |
| **Tier 2** | Rp 10 juta - Rp 100 juta | Scaler (Penskala) |
| **Tier 3** | Rp 100 juta - Rp 1 milyar | Asset Builder (Pembangun Aset) |
| **Tier 4** | > Rp 1 milyar | Legacy Maker (Pewaris) |

### Tier Override Logic (Asset-Based)

**Assets can override income classification:**

| Asset Range | Override To Tier |
|------------|------------------|
| > Rp 500 juta | Minimum Tier 2 (even if income < Rp 10 juta) |
| > Rp 5 milyar | Minimum Tier 3 (even if income < Rp 100 juta) |
| > Rp 50 milyar | Minimum Tier 4 (even if income < Rp 1 milyar) |

**Logic:**
```
IF total_assets > 50_billion AND income_tier < tier-4 THEN
  income_tier = tier-4
ELSE IF total_assets > 5_billion AND income_tier < tier-3 THEN
  income_tier = tier-3
ELSE IF total_assets > 500_million AND income_tier < tier-2 THEN
  income_tier = tier-2
END IF
```

### Debt Override Logic

**High debt forces Tier 0 regardless of income/assets:**

```
IF debt_level == 'high' THEN
  income_tier = tier-0
  priority_content = 'debt-relief'
END IF
```

**Rationale:** Users drowning in debt need immediate survival guidance, even if they have high income or assets. Debt crisis requires different mindset and education.

---

## 5. Results Page

### Display Elements

1. **Tier Badge** (Large, prominent)
   ```
   👑
   Jalur Anda: Tier 2 - Penskala
   
   Anda berada di jalur yang tepat untuk mengembangkan
   keuangan dan bisnis Anda ke level berikutnya.
   ```

2. **Personalized Summary**
   ```
   Profil Keuangan Anda:
   • Pendapatan: Rp 15 juta/bulan
   • Aset: Rp 800 juta
   • Status: Bebas utang
   • Lokasi: Kota besar
   
   Rekomendasi konten telah disesuaikan untuk Anda.
   ```

3. **Content Recommendations** (3 cards)
   - Article 1: Most relevant for their tier
   - Article 2: Tool or calculator
   - Article 3: E-course recommendation

4. **CTA Buttons**
   - Primary: "Masuk ke Dashboard Saya" → Register (free)
   - Secondary: "Jelajahi Konten Sekarang" → Browse without registration

---

## 6. Post-Quiz User Journey

### Path A: Register (Recommended)
```
Results Page → "Masuk ke Dashboard Saya" → Registration Form
  ↓
Registration → Email + Password OR Google OAuth (Clerk)
  ↓
Dashboard → Personalized feed based on quiz results
  ↓
Features Available:
• My Feed (tier-filtered content)
• Saved Articles
• Course Progress Tracking
• Tool Usage History
• Downloadable Resources
• Expert Consultation Booking
```

### Path B: Browse Without Registration
```
Results Page → "Jelajahi Konten Sekarang" → Browse Freely
  ↓
Access:
• 1 full article free (tracked via FingerprintJS)
• After 1 article → "Register to read more" modal
• All public tools accessible
• Search and filter available
  ↓
Limitations:
• Cannot save articles
• Cannot track progress
• Cannot download resources
• Must share/subscribe to unlock additional gated content
```

---

## 7. Technical Implementation

### Frontend (React + TypeScript)

```typescript
interface QuizAnswers {
  age_group: 'muda' | 'produktif' | 'pensiun';
  gender: 'male' | 'female' | 'unisex';
  monthly_income_net: number; // In IDR
  has_business: boolean;
  monthly_business_revenue?: number;
  total_assets: number; // In IDR
  debt_level: 'high' | 'medium' | 'none';
  edu_level: 'sma' | 's1' | 's2' | 'spesialis';
  location_type: 'desa' | 'kota' | 'global';
}

interface TierResult {
  tier: 'tier-0' | 'tier-1' | 'tier-2' | 'tier-3' | 'tier-4';
  label: string;
  override_reason?: 'asset_based' | 'debt_based';
  original_tier?: string; // Before override
}

function calculateTier(answers: QuizAnswers): TierResult {
  let tier: string;
  let override_reason: string | undefined;
  
  // Debt override (highest priority)
  if (answers.debt_level === 'high') {
    return { tier: 'tier-0', label: 'Survival (Bertahan)', override_reason: 'debt_based' };
  }
  
  // Primary: Income-based
  if (answers.monthly_income_net < 5_000_000) {
    tier = 'tier-0';
  } else if (answers.monthly_income_net < 10_000_000) {
    tier = 'tier-1';
  } else if (answers.monthly_income_net < 100_000_000) {
    tier = 'tier-2';
  } else if (answers.monthly_income_net < 1_000_000_000) {
    tier = 'tier-3';
  } else {
    tier = 'tier-4';
  }
  
  // Asset-based override
  if (answers.total_assets > 50_000_000_000 && tier < 'tier-4') {
    tier = 'tier-4';
    override_reason = 'asset_based';
  } else if (answers.total_assets > 5_000_000_000 && tier < 'tier-3') {
    tier = 'tier-3';
    override_reason = 'asset_based';
  } else if (answers.total_assets > 500_000_000 && tier < 'tier-2') {
    tier = 'tier-2';
    override_reason = 'asset_based';
  }
  
  const labels = {
    'tier-0': 'Survival (Bertahan)',
    'tier-1': 'Hustler (Pekerja Keras)',
    'tier-2': 'Scaler (Penskala)',
    'tier-3': 'Asset Builder (Pembangun Aset)',
    'tier-4': 'Legacy Maker (Pewaris)',
  };
  
  return { tier, label: labels[tier], override_reason };
}
```

### Database Storage

```sql
-- Save to users table after registration
INSERT INTO users (
  id, email, full_name, gender, monthly_income_net, income_tier,
  has_business, monthly_business_revenue, total_assets, debt_level,
  edu_level, location_type, age_group, yt_subscribed, membership_status
) VALUES (
  :clerk_id, :email, :full_name, :gender, :monthly_income_net, :income_tier,
  :has_business, :monthly_business_revenue, :total_assets, :debt_level,
  :edu_level, :location_type, :age_group, 0, 'free'
);
```

### FingerprintJS Integration (For Anonymous Visitors)

```typescript
import FingerprintJS from '@fingerprintjs/fingerprintjs';

async function getVisitorFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // Unique hash
}

// Check article access
async function checkArticleAccess(fingerprint: string): Promise<boolean> {
  const response = await fetch(`/api/visitor/check/${fingerprint}`);
  const data = await response.json();
  return data.articles_viewed < 1; // Allow 1 free article
}

// Log article view
async function logArticleView(fingerprint: string, articleSlug: string) {
  await fetch('/api/visitor/view', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fingerprint, articleSlug }),
  });
}
```

---

## 8. Quiz Retake Policy

**Users can retake quiz:**
- Once per year (reminder via email/notification)
- Manually via Profile page → "Retake Quiz" button
- Results update tier classification and feed recommendations

**Database Tracking:**
```sql
-- Log quiz retakes
ALTER TABLE users ADD COLUMN last_quiz_date DATETIME;
ALTER TABLE users ADD COLUMN quiz_retake_count INTEGER DEFAULT 0;
```

---

## 9. Analytics & Optimization

### Key Metrics to Track

| Metric | Target | Why |
|--------|--------|-----|
| Quiz Completion Rate | > 80% | Indicates good UX and clear value prop |
| Registration After Quiz | > 40% | Measures conversion effectiveness |
| Tier Distribution | Varies | Helps plan content creation priorities |
| Quiz Drop-off Point | Step 3 or earlier | Identify friction points |

### A/B Testing Opportunities

- Question order (income first vs age first)
- Number of income brackets (7 vs 5 options)
- Results page CTA wording
- Progress bar design
- Social proof placement

---

## 10. Related Documentation

- **docs/DATABASE.md:** User profiles and fingerprint schemas
- **docs/VIRALITY_STRATEGY.md:** Content access control mechanics
- **docs/TAXONOMY.md:** Tier definitions and filtering logic
- **docs/PAGES.md:** Routing structure
- **docs/COMPONENTS.md:** FinancialQuiz component specifications
