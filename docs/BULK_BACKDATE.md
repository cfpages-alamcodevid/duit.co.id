# Bulk Article Backdate Tool

This tool is used to backdate articles after bulk creation to avoid SEO penalties from having multiple articles with the same date.

## Why Backdating Matters

Search engines (Google) view multiple articles on the same date as:
- **Low quality signal** - appears bulk-generated
- **SEO penalty risk** - deduplication issues
- **Poor crawl behavior** - all pages "published" same day looks unnatural

**Solution:** Assign unique historical dates, max 1 article per day.

## Prerequisites

1. **Create PUBLICATION_SCHEDULE.json** if it doesn't exist:

```json
{
  "version": 1,
  "timezone": "Asia/Jakarta",
  "policy": {
    "max_articles_per_day": 1,
    "backdate_required_for_bulk": true,
    "default_publish_time_wib": "09:00",
    "date_field": "date",
    "optional_datetime_field": "published_at_wib"
  },
  "rules": [
    "Every article must have a unique `date` (YYYY-MM-DD).",
    "Bulk creation must assign historical/backdated dates, one article per day.",
    "When `published_at_wib` is present, format must be `YYYY-MM-DD HH:mm WIB`."
  ],
  "entries": []
}
```

2. Articles must have a unique `slug` in frontmatter.

## Commands

### 1. Schedule Specific Slugs (Dry-Run First)

```bash
npm run schedule:publish -- --slugs slug-a,slug-b,slug-c --start-date 2026-04-17 --direction backward
```

**Options:**
| Flag | Description | Required |
|------|------------|----------|
| `--slugs` | Comma-separated slugs | Yes (one of --slugs, --slugs-file, --all-unscheduled) |
| `--start-date` | Starting date (YYYY-MM-DD) | Yes |
| `--direction` | `backward` or `forward` | No (default: backward) |
| `--time` | Publish time in WIB | No (default: 09:00) |
| `--status` | `planned`, `published`, or `review` | No (default: planned) |

**To apply (persist changes):**
```bash
npm run schedule:publish -- --slugs slug-a,slug-b,slug-c --start-date 2026-04-17 --direction backward --apply
```

### 2. From Slugs File

Create `slugs.txt` with one slug per line:
```
panduan-lunas-pinjol
cara-menghadapi-debt-collector
budgeting-darurat-umr
```

Run:
```bash
npm run schedule:publish -- --slugs-file slugs.txt --start-date 2026-04-17 --direction backward --apply
```

### 3. Mass Backlog (All Unscheduled Articles)

Automatically finds all articles NOT in `PUBLICATION_SCHEDULE.json` and schedules them:

```bash
npm run schedule:publish -- --all-unscheduled --start-date 2026-04-17 --direction backward
```

**Dry-run first (check output):**
No `--apply` flag = dry-run mode

**Then apply:**
```bash
npm run schedule:publish -- --all-unscheduled --start-date 2026-04-17 --direction backward --apply
```

## Examples

### Example 1: Schedule 3 Articles Backward

```bash
npm run schedule:publish -- --slugs hadapi-debt-collector,budgeting-darurat-umr,cara-negosiasi-utang --start-date 2026-04-17 --direction backward
```

Expected output:
```
[publication-scheduler] DRY-RUN mode
hadapi-debt-collector -> 2026-04-17 (2026-04-17 09:00 WIB) [planned]
budgeting-darurat-umr -> 2026-04-16 (2026-04-16 09:00 WIB) [planned]
cara-negosiasi-utang -> 2026-04-15 (2026-04-15 09:00 WIB) [planned]

No files were changed. Re-run with --apply to persist.
```

### Example 2: Apply Changes

```bash
npm run schedule:publish -- --slugs hadapi-debt-collector,budgeting-darurat-umr,cara-negosiasi-utang --start-date 2026-04-17 --direction backward --apply
```

### Example 3: Publish Forward (New Articles First)

```bash
npm run schedule:publish -- --slugs article-new-1,article-new-2 --start-date 2026-04-20 --direction forward --apply
```

Output:
```
[publication-scheduler] APPLY mode
article-new-1 -> 2026-04-20 (2026-04-20 09:00 WIB) [planned]
article-new-2 -> 2026-04-21 (2026-04-21 09:00 WIB) [planned]
```

## How It Works

1. **Scans** all `.md` files in `/artikel/`
2. **Reads** `docs/PUBLICATION_SCHEDULE.json` for existing dates
3. **Assigns** unique dates, avoiding conflicts
4. **Updates** frontmatter `date` and `published_at_wib` fields
5. **Updates** `PUBLICATION_SCHEDULE.json` with new entries

## Post-Backdate Checklist

- [ ] Verify dates in frontmatter are unique
- [ ] Check `PUBLICATION_SCHEDULE.json` entries
- [ ] Verify no duplicate dates in sitemap (if generated)
- [ ] Test article pages load correctly

## Related Documentation

- `docs/CMS.md` - Article creation workflow
- `docs/ARTICLE_CATALOG.md` - Article list tracking
- `.opencode/agents/article-writer.md` - Use after writing articles