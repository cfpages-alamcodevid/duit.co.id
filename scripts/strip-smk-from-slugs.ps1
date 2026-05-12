# Script: Strip -smk from Slugs
# Usage: powershell -ExecutionPolicy Bypass -File scripts/strip-smk-from-slugs.ps1
# Description: Renames -smk slugs to general across all files

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

# All slugs with -smk to strip
$slugMap = @{
    "admin-koperasi-smk" = "admin-koperasi"
    "admin-marketplace-smk" = "admin-marketplace"
    "animasi-iklan-pendek-smk" = "animasi-iklan-pendek"
    "arsip-digital-smk" = "arsip-digital"
    "audit-kandang-smk" = "audit-kandang"
    "audit-kolam-ikan-smk" = "audit-kolam-ikan"
    "audit-listrik-kos-smk" = "audit-listrik-kos"
    "bibit-tanaman-smk" = "bibit-tanaman"
    "budidaya-ikan-hias-smk" = "budidaya-ikan-hias"
    "desain-spanduk-menu-smk" = "desain-spanduk-menu"
    "drafter-rab-renovasi-smk" = "drafter-rab-renovasi"
    "formulasi-pakan-smk" = "formulasi-pakan"
    "foto-produk-multimedia-smk" = "foto-produk-multimedia"
    "guide-lokal-smk" = "guide-lokal"
    "hidroponik-rumah-smk" = "hidroponik-rumah"
    "housekeeping-airbnb-smk" = "housekeeping-airbnb"
    "input-nota-akuntansi-smk" = "input-nota-akuntansi"
    "inspeksi-mobil-bekas-smk" = "inspeksi-mobil-bekas"
    "inspeksi-motor-bekas-smk" = "inspeksi-motor-bekas"
    "instalasi-listrik-toko-smk" = "instalasi-listrik-toko"
    "itinerary-lokal-smk" = "itinerary-lokal"
    "jahit-seragam-komunitas-smk" = "jahit-seragam-komunitas"
    "jasa-packing-umkm-smk" = "jasa-packing-umkm"
    "jasa-pola-baju-smk" = "jasa-pola-baju"
    "kas-kecil-umkm-smk" = "kas-kecil-umkm"
    "katering-harian-tata-boga-smk" = "katering-harian-tata-boga"
    "landing-page-rpl-smk" = "landing-page-rpl"
    "live-host-smk" = "live-host"
    "maintenance-komputer-umkm-smk" = "maintenance-komputer-umkm"
    "meal-prep-smk" = "meal-prep"
    "meja-stainless-umkm-smk" = "meja-stainless-umkm"
    "mua-wisuda-smk" = "mua-wisuda"
    "nail-art-home-service-smk" = "nail-art-home-service"
    "operator-homestay-smk" = "operator-homestay"
    "pos-kasir-sederhana-rpl-smk" = "pos-kasir-sederhana"
    "qc-produk-rumahan-smk" = "qc-produk-rumahan"
    "rak-gudang-fabrikasi-smk" = "rak-gudang-fabrikasi"
    "repair-elektronik-rumahan-smk" = "repair-elektronik-rumahan"
    "sabun-pembersih-kimia-smk" = "sabun-pembersih-kimia"
    "service-laptop-sekolah-kantor-smk" = "service-laptop"
    "servis-ac-kulkas-komersial-smk" = "servis-ac-kulkas"
    "servis-motor-panggilan-smk" = "servis-motor-panggilan"
    "setup-printer-barcode-smk" = "setup-printer-barcode"
    "smart-home-iot-smk" = "smart-home-iot"
    "stock-opname-gudang-smk" = "stock-opname-gudang"
    "subtitle-video-smk" = "subtitle-video"
    "training-smk" = "training-operator"
    "ukur-lahan-gps-smk" = "ukur-lahan-gps"
    "video-short-umkm-smk" = "video-short-umkm"
    "virtual-admin-smk" = "virtual-admin"
}

$renamedFiles = 0
$updatedFiles = 0

Write-Host "=== Strip -smk from Slugs ===" -ForegroundColor Cyan
Write-Host "Total slugs to rename: $($slugMap.Count)"
Write-Host ""

# Step 1: Rename article files
Write-Host "--- Step 1: Renaming article files ---" -ForegroundColor Yellow
foreach ($oldSlug in $slugMap.Keys) {
    $newSlug = $slugMap[$oldSlug]
    $oldPath = "$root\artikel\tier-1-hustler\$oldSlug.md"
    $newPath = "$root\artikel\tier-1-hustler\$newSlug.md"
    
    if (Test-Path $oldPath) {
        if (-not (Test-Path $newPath)) {
            Rename-Item -Path $oldPath -NewName "$newSlug.md" -Force
            Write-Host "  RENAMED: $oldSlug.md -> $newSlug.md" -ForegroundColor Green
            $renamedFiles++
        } else {
            Write-Host "  SKIP (exists): $newSlug.md already exists" -ForegroundColor Yellow
        }
    }
}

Write-Host "  Files renamed: $renamedFiles"
Write-Host ""

# Step 2: Update all markdown files (slug references + internal links)
Write-Host "--- Step 2: Updating slug references in all files ---" -ForegroundColor Yellow
$mdFiles = @()
$mdFiles += Get-ChildItem -Path "$root\artikel" -Recurse -Include "*.md" -File -ErrorAction SilentlyContinue
$mdFiles += Get-ChildItem -Path "$root\docs" -Recurse -Include "*.md" -File -ErrorAction SilentlyContinue
$mdFiles += Get-ChildItem -Path "$root\research" -Recurse -Include "*.md" -File -ErrorAction SilentlyContinue
$mdFiles += Get-ChildItem -Path "$root\.qwen" -Recurse -Include "*.md" -File -ErrorAction SilentlyContinue
$mdFiles += Get-ChildItem -Path "$root" -Include "*.md" -File -ErrorAction SilentlyContinue

foreach ($file in $mdFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    foreach ($oldSlug in $slugMap.Keys) {
        $newSlug = $slugMap[$oldSlug]
        # Replace slug in all contexts (links, slugs, filenames)
        $content = $content -replace [regex]::Escape($oldSlug), $newSlug
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $updatedFiles++
        Write-Host "  UPDATED: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "  Files updated: $updatedFiles"
Write-Host ""

# Step 3: Update research folder names
Write-Host "--- Step 3: Renaming research folders ---" -ForegroundColor Yellow
$researchPath = "$root\research\tier-1-hustler"
$renamedResearch = 0

if (Test-Path $researchPath) {
    foreach ($oldSlug in $slugMap.Keys) {
        $newSlug = $slugMap[$oldSlug]
        $oldResearchPath = "$researchPath\$oldSlug-research.md"
        $newResearchPath = "$researchPath\$newSlug-research.md"
        
        if (Test-Path $oldResearchPath) {
            if (-not (Test-Path $newResearchPath)) {
                Rename-Item -Path $oldResearchPath -NewName "$newSlug-research.md" -Force
                Write-Host "  RENAMED: $oldSlug-research.md -> $newSlug-research.md" -ForegroundColor Green
                $renamedResearch++
            }
        }
    }
}

# Also check tier-2 research
$researchPath2 = "$root\research\tier-2-scaler"
if (Test-Path $researchPath2) {
    # Check training-smk in tier-2
    $oldResearchPath = "$researchPath2\training-smk-research.md"
    $newResearchPath = "$researchPath2\training-operator-research.md"
    if (Test-Path $oldResearchPath) {
        if (-not (Test-Path $newResearchPath)) {
            Rename-Item -Path $oldResearchPath -NewName "training-operator-research.md" -Force
            Write-Host "  RENAMED: training-smk-research.md -> training-operator-research.md" -ForegroundColor Green
            $renamedResearch++
        }
    }
}

Write-Host "  Research files renamed: $renamedResearch"
Write-Host ""

# Step 4: Update JSON metadata files
Write-Host "--- Step 4: Updating JSON metadata files ---" -ForegroundColor Yellow
$jsonPath = "$root\JSON"
$jsonFiles = Get-ChildItem -Path $jsonPath -Filter "*.json" -File
$jsonUpdated = 0

foreach ($file in $jsonFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    foreach ($oldSlug in $slugMap.Keys) {
        $newSlug = $slugMap[$oldSlug]
        $content = $content -replace [regex]::Escape($oldSlug), $newSlug
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $jsonUpdated++
        Write-Host "  UPDATED: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "  JSON files updated: $jsonUpdated"
Write-Host ""

Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "  Files renamed: $renamedFiles"
Write-Host "  MD files updated: $updatedFiles"
Write-Host "  Research files renamed: $renamedResearch"
Write-Host "  JSON files updated: $jsonUpdated"
Write-Host ""
Write-Host "Done!" -ForegroundColor Green