# Script: Fix Internal Links - Strip Tier Folder
# Usage: powershell -ExecutionPolicy Bypass -File scripts/fix-internal-links.ps1

$ErrorActionPreference = "Stop"
$artikelPath = Join-Path (Join-Path $PSScriptRoot "..") "artikel"
$fixedCount = 0
$skippedCount = 0

$pattern = '/artikel/tier-[a-z0-9-]+/'
$replacement = '/artikel/'

Write-Host "=== Fix Internal Links: Strip Tier Folder ===" -ForegroundColor Cyan
Write-Host "Pattern: $pattern -> $replacement"
Write-Host ""

$mdFiles = Get-ChildItem -Path $artikelPath -Recurse -Filter "*.md"

foreach ($file in $mdFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    if ($content -match $pattern) {
        $newContent = $content -replace $pattern, $replacement
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        $fixedCount++
        Write-Host "  FIXED: $($file.Name)" -ForegroundColor Green
    } else {
        $skippedCount++
    }
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "  Files fixed: $fixedCount" -ForegroundColor Green
Write-Host "  Files skipped (no changes): $skippedCount" -ForegroundColor Yellow
Write-Host "  Total files processed: $($fixedCount + $skippedCount)"