$ErrorActionPreference = 'Stop'

$path = Join-Path $PSScriptRoot 'docs/ARTICLE_CATALOG.md'
$lines = Get-Content $path

function Get-Cluster {
  param(
    [int]$Tier,
    [string]$Title,
    [string]$Slug,
    [string]$Category,
    [string]$Notes
  )

  $hay = "$Title $Slug $Category $Notes".ToLowerInvariant()

  switch ($Tier) {
    0 {
      if ($hay -match 'phk|cari kerja|jual barang|skill sederhana|uang darurat|jasa harian|tabung kembalian') { return 'Income Shock & Recovery' }
      if ($hay -match 'budget|gaji|hemat|thr|belanja|listrik|air|data|transport|pulsa|internet|kuota|makan') { return 'Budget Defense' }
      if ($hay -match 'utang|cicilan|restrukturisasi|penagihan|bukti chat|telepon penagihan|kontrakan|sewa kos|kirim uang|numpang tinggal|orang tua|sewa|tagihan') { return 'Debt & Bill Management' }
      if ($hay -match 'pinjol|debt collector|lapor|perlindungan|legal|skema pinjaman|bodong|investasi bodong|koperasi bodong|arisan|ktp|otp|apk|link whatsapp|pinjol asli|aplikasi scam|penipuan|whatsapp|berbahaya') { return 'Scam & Digital Safety' }
      return 'Household Survival'
    }
    1 {
      if ($hay -match 'legalitas|haki|amdal|k3|ekspor|pitch deck|bimbingan skripsi|konselor pendidikan|konsultan gizi|tax filer|bookkeeper|data analyst|auditor|headhunter|psikolog|penerjemah|grant writer|sop|digital marketing|jasa rab|ekspor|legal consultant') { return 'Professional Services' }
      if ($hay -match 'freelance|va|ghostwriter|tutor|resume|linkedin|customer support|community manager|appointment setter|lead generation|product lister|qa tester|software tester|email deliverability|cold email|cro specialist|seo|copywriting|writer|editor|thumbnail|ui-ux|webflow|framer|notion|airtable|zapier|make|shopify developer|podcast|ugc|video editor|short-form|voice over|indonesian tutor|executive va|remote travel|discord|design') { return 'Digital & Knowledge Work' }
      if ($hay -match 'budidaya|ternak|maggot|jamur|bibit|kompos|pupuk|jelantah|arang|kayu bakar|daun pisang|sayur|buah|lele|ikan hias|kambing') { return 'Agribusiness & Recycling' }
      if ($hay -match 'jastip|makelar|supplier|agen|pengepul|jualan|online shop|dropship|tiktok live|food reviewer|host live|admin olshop|print on demand|etsy|affiliate marketing|social media|marketing|google my business|buka toko online|reseller|foto|video profil|undangan|filter ig|facebook ads') { return 'Commerce & Brokerage' }
      if ($hay -match 'jasa|sewa|cuci|salon|poles|bor air|kunci|grooming|pet sitter|pindahan|sedot wc|tebang|panggung|mainan|kamera|genset|ht|playstation|smart home|perbaikan pipa|deep cleaning|konstruksi|moving|detailing') { return 'Local Services' }
      return 'Career Starter'
    }
    2 {
      if ($hay -match 'scale-up|expansi|expansion|business-plan|launch-strategy|go-to-market|geographic-expansion|growth-hacking|freemium|viral|referrals|retensi|customer journey|customer retention|product-market-fit|channel-distribution|partnership-strategic|market-segmentation|competitor-analysis|decision-matrix-proyek|upselling|cross-selling|roi-digital-marketing|cac|launch') { return 'Growth & Expansion' }
      if ($hay -match 'sop|workflow|qc|inventory|dms|standard-operating-environment|business-continuity|knowledge-management|change-management|process-documentation|dashboard-metrics|meeting-management|tools-scaling-bisnis|automasi|digitalisasi|transformasi-digital|vendor-management|document management|automation') { return 'Operations & Systems' }
      if ($hay -match 'cash-flow|financial-planning|emergency-fund|working-capital|cost-structure|break-even|profit-margin|budget|ratio|cost-of-goods|overhead|capital-budgeting|lease-vs-buy|review-keuangan|cash management|passive-active-income|emergency fund') { return 'Finance Control' }
      if ($hay -match 'reksa|saham|obligasi|etf|dividen|paper-asset|portfolio|compound|rebalancing|dollar-cost-averaging|asset-allocation|risk-return|indeks-saham-indonesia|sukuk|robo-advisor|behavioral-finance|dividend') { return 'Investing' }
      if ($hay -match 'first-hire|recruitment|compensation|employee|leadership|onboarding|remote-team|performance-management|delegation|team-motivation|performance-bonus|org-structure|retention|hr|manajemen-kompensasi|hire') { return 'People & HR' }
      return 'Legal & Risk'
    }
    3 {
      if ($hay -match 'franchise|operator-vs-autopilot|multi-unit|franchise-dari-nol|anatomi-franchise|cek-kontrak-franchise|lokasi-franchise') { return 'Franchise Ops' }
      if ($hay -match 'sertifikat|ppjb|ajb|hgb|sengketa|due diligence|pajak-properti|bphtb|property legal|lindungi-aset|tax|waris|prenuptial|pra-nikah') { return 'Property Legal' }
      if ($hay -match 'reits|dividen|obligasi|angel|diversifikasi|opm|mitigasi|transisi-kuadran|asset-allocation|saham-global|portfolio|sukuk|investing') { return 'Portfolio & Capital' }
      if ($hay -match 'exit|nilai-bisnis|retirement-business|family-office|akuisisi|corporate-governance|strategi-keranjang|suksesi|buy-sell|governance') { return 'Governance & Exit' }
      return 'Property Strategy'
    }
    4 {
      if ($hay -match 'aset-lintas-negara|tax-residency|pajak-berganda|cross-border') { return 'Tax & Cross-Border' }
      if ($hay -match 'sop-family-office|rekrut-cfo-gc-investment-officer|reporting|dashboard|meeting|family-office') { return 'Family Office Ops' }
      if ($hay -match 'governance|investment-policy-statement|family-constitution|corporate-governance|crisis-playbook') { return 'Governance' }
      if ($hay -match 'estate|wasiat|hibah|perwalian|suksesi') { return 'Estate Planning' }
      if ($hay -match 'holding|subholding|perjanjian-pra-nikah|wealth-protection|offshore|lindungi-aset|ring-fencing|proteksi-aset') { return 'Asset Shield' }
      if ($hay -match 'philanthropy|legacy|filantropi') { return 'Philanthropy & Legacy' }
      return 'Tax & Cross-Border'
    }
  }
}

function Parse-Row {
  param([string]$Line)
  $cells = $Line.Trim().Trim('|').Split('|')
  if ($cells.Count -eq 9 -and $cells[7].Trim() -in @('✅', '📝', '📋', '✍️', '👀', '🔄')) {
    return [pscustomobject]@{
      Num      = $cells[0].Trim()
      Cluster  = $cells[1].Trim()
      Title    = $cells[2].Trim()
      Slug     = $cells[3].Trim()
      Category = $cells[4].Trim()
      Gender   = $cells[5].Trim()
      Age      = $cells[6].Trim()
      Status   = $cells[7].Trim()
      Notes    = $cells[8].Trim()
    }
  }

  if ($cells.Count -eq 8) {
    return [pscustomobject]@{
      Num      = $cells[0].Trim()
      Cluster  = ''
      Title    = $cells[1].Trim()
      Slug     = $cells[2].Trim()
      Category = $cells[3].Trim()
      Gender   = $cells[4].Trim()
      Age      = $cells[5].Trim()
      Status   = $cells[6].Trim()
      Notes    = $cells[7].Trim()
    }
  }

  return $null
}

function Get-RowLine {
  param(
    [string]$Num,
    [string]$Cluster,
    [pscustomobject]$Row
  )
  return "| $Num | $Cluster | $($Row.Title) | $($Row.Slug) | $($Row.Category) | $($Row.Gender) | $($Row.Age) | $($Row.Status) | $($Row.Notes) |"
}

function Sort-ByNum {
  param([System.Collections.Generic.List[object]]$Rows)
  return $Rows | Sort-Object @{ Expression = {
    $n = $_.Num
    if ($n -match '^(\d+)\.(\d+)([a-z])?$') {
      $suffix = 0
      if ($matches[3]) { $suffix = ([int][char]$matches[3].ToUpperInvariant()[0]) - 64 }
      return ([int]$matches[1] * 100000) + ([int]$matches[2] * 100) + $suffix
    }
    if ($n -match '^(\d+)\.(\d+)\.(\d+)$') {
      return ([int]$matches[1] * 100000) + ([int]$matches[2] * 100) + [int]$matches[3]
    }
    return 99999999
  } }
}

$tierRows = @{ 0 = New-Object 'System.Collections.Generic.List[object]'; 1 = New-Object 'System.Collections.Generic.List[object]'; 2 = New-Object 'System.Collections.Generic.List[object]'; 3 = New-Object 'System.Collections.Generic.List[object]'; 4 = New-Object 'System.Collections.Generic.List[object]' }

$tier = $null
$tier0Start = $null
for ($i = 0; $i -lt $lines.Count; $i++) {
  $line = $lines[$i]
  if ($line -match '^## Tier 0:') { $tier = 0; $tier0Start = $i; continue }
  if ($line -match '^## Tier 1:') { $tier = 1; continue }
  if ($line -match '^## Tier 2:') { $tier = 2; continue }
  if ($line -match '^## Tier 3:') { $tier = 3; continue }
  if ($line -match '^## Tier 4:') { $tier = 4; continue }
  if ($line -match '^## Summary Statistics') { $tier = $null; continue }
  if ($null -eq $tier) { continue }
  $trim = $line.Trim()
  if (-not $trim.StartsWith('|')) { continue }
  if ($trim -match '^\|\s*#\s*\|') { continue }
  if ($trim -match '^\|[-\s\|]+\|$') { continue }
  $row = Parse-Row -Line $line
  if ($null -eq $row) { continue }
  $tierRows[$tier].Add($row)
}

$tier2Extras = New-Object 'System.Collections.Generic.List[object]'
$tier2Main = New-Object 'System.Collections.Generic.List[object]'
foreach ($row in $tierRows[2]) {
  if ($row.Num -match '^2\.\d+\.[A-Za-z0-9]+$') { $tier2Extras.Add($row) } else { $tier2Main.Add($row) }
}

function Build-TierBlock {
  param(
    [int]$Tier,
    [string]$Heading,
    [string]$Audience,
    [string]$Focus,
    [System.Collections.Generic.List[object]]$Rows,
    [int]$CompleteCount,
    [int]$TotalCount,
    [string]$TargetLabel,
    [switch]$AppendExtraTier2,
    [System.Collections.Generic.List[object]]$ExtraRows
  )

  $block = New-Object System.Collections.Generic.List[string]
  $block.Add($Heading)
  $block.Add($Audience)
  $block.Add($Focus)
  $block.Add('')
  $block.Add('| # | Cluster | Title | Slug | Category | Gender | Age | Status | Notes |')
  $block.Add('|---|---------|-------|------|----------|--------|-----|--------|-------|')

  $sorted = Sort-ByNum -Rows $Rows
  foreach ($row in $sorted) {
    $cluster = Get-Cluster -Tier $Tier -Title $row.Title -Slug $row.Slug -Category $row.Category -Notes $row.Notes
    $block.Add((Get-RowLine -Num $row.Num -Cluster $cluster -Row $row))
  }

  if ($AppendExtraTier2) {
    $extraIndex = 111
    foreach ($row in $ExtraRows) {
      $cluster = Get-Cluster -Tier $Tier -Title $row.Title -Slug $row.Slug -Category $row.Category -Notes $row.Notes
      $block.Add((Get-RowLine -Num ("2.{0}" -f $extraIndex) -Cluster $cluster -Row $row))
      $extraIndex++
    }
    $TotalCount = $TotalCount + $ExtraRows.Count
  }

  $pending = $TotalCount - $CompleteCount
  $block.Add('')
  $block.Add(("**{0}**: {1} articles ({2} complete, {3} research pending)" -f $TargetLabel, $TotalCount, $CompleteCount, $pending))
  $block.Add('')
  $block.Add('---')
  $block.Add('')
  return [string[]]$block.ToArray()
}

$out = New-Object System.Collections.Generic.List[string]

# Preserve pre-tier intro
for ($i = 0; $i -lt $tier0Start; $i++) { $out.Add($lines[$i]) }

$tier0RowsSorted = Sort-ByNum -Rows $tierRows[0]
$tier1RowsSorted = Sort-ByNum -Rows $tierRows[1]
$tier2CompleteCount = ($tierRows[2] | Where-Object { $_.Status -eq '✅' }).Count
$tier3RowsSorted = Sort-ByNum -Rows $tierRows[3]
$tier4RowsSorted = Sort-ByNum -Rows $tierRows[4]

foreach ($line in (Build-TierBlock -Tier 0 -Heading '## Tier 0: Survival (Debt Relief & Survival)' -Audience '**Target Audience:** People in financial crisis, debt traps, pinjol victims' -Focus '**Content Focus:** Immediate relief, legal protection, survival strategies' -Rows $tier0RowsSorted -CompleteCount 11 -TotalCount $tier0RowsSorted.Count -TargetLabel 'Tier 0 Target')) { $out.Add($line) }
foreach ($line in (Build-TierBlock -Tier 1 -Heading '## Tier 1: The Hustler (Side Hustles & High-Income Skills)' -Audience '**Target Audience:** Youth, fresh graduates, UMR workers' -Focus '**Content Focus:** Extra income, skill development, zero-risk business models' -Rows $tier1RowsSorted -CompleteCount 90 -TotalCount $tier1RowsSorted.Count -TargetLabel 'Tier 1 Target')) { $out.Add($line) }
foreach ($line in (Build-TierBlock -Tier 2 -Heading '## Tier 2: The Scaler (Business Scaling & Financial Planning)' -Audience '**Target Audience:** Managers, professionals, small business owners' -Focus '**Content Focus:** Systematization, scaling, paper assets, financial planning' -Rows $tier2Main -CompleteCount $tier2CompleteCount -TotalCount $tier2Main.Count -TargetLabel 'Tier 2 Target' -AppendExtraTier2 -ExtraRows $tier2Extras)) { $out.Add($line) }
foreach ($line in (Build-TierBlock -Tier 3 -Heading '## Tier 3: Asset Builder (Property, Franchise & Investments)' -Audience '**Target Audience:** Successful entrepreneurs, high-level executives' -Focus '**Content Focus:** Real estate, franchising, advanced investing, retirement planning' -Rows $tier3RowsSorted -CompleteCount 35 -TotalCount $tier3RowsSorted.Count -TargetLabel 'Tier 3 Target')) { $out.Add($line) }
foreach ($line in (Build-TierBlock -Tier 4 -Heading '## Tier 4: Legacy Maker (Wealth Protection & Succession)' -Audience '**Target Audience:** Ultra-High Net Worth Individuals (UHNWI)' -Focus '**Content Focus:** Corporate structuring, tax optimization, wealth protection, succession planning' -Rows $tier4RowsSorted -CompleteCount 15 -TotalCount $tier4RowsSorted.Count -TargetLabel 'Tier 4 Target')) { $out.Add($line) }

$tierStats = @(
  [pscustomobject]@{ Name = 'Tier 0: Survival'; Total = $tier0RowsSorted.Count; Published = 11 },
  [pscustomobject]@{ Name = 'Tier 1: Hustler'; Total = $tier1RowsSorted.Count; Published = 90 },
  [pscustomobject]@{ Name = 'Tier 2: Scaler'; Total = ($tier2Main.Count + $tier2Extras.Count); Published = $tier2CompleteCount },
  [pscustomobject]@{ Name = 'Tier 3: Asset Builder'; Total = $tier3RowsSorted.Count; Published = 35 },
  [pscustomobject]@{ Name = 'Tier 4: Legacy'; Total = $tier4RowsSorted.Count; Published = 15 }
)

$totalCount = ($tierStats | Measure-Object Total -Sum).Sum
$publishedCount = ($tierStats | Measure-Object Published -Sum).Sum
$completePct = [math]::Round(($publishedCount / $totalCount) * 100)

$out.Add('## Summary Statistics')
$out.Add('')
$out.Add('| Tier | Target Articles | Published | % Complete |')
$out.Add('|------|----------------|-----------|------------|')
foreach ($s in $tierStats) {
  $pct = [math]::Round(($s.Published / $s.Total) * 100)
  $out.Add(("| {0} | {1} | {2} | {3}% |" -f $s.Name, $s.Total, $s.Published, $pct))
}
$out.Add(("| **TOTAL** | **{0}** | **{1}** | **{2}%** |" -f $totalCount, $publishedCount, $completePct))

[System.IO.File]::WriteAllText($path, ($out -join "`n"), (New-Object System.Text.UTF8Encoding($false)))
