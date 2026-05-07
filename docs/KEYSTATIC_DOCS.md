# Keystatic Documentation Summary for Duit.co.id

Tanggal: 2026-05-08 WIB

Dokumen ini merangkum dokumentasi resmi Keystatic yang relevan untuk migrasi Duit.co.id ke Next.js + Git-based Markdown CMS.

## Kesimpulan Untuk Duit.co.id

Keystatic cocok untuk Duit.co.id karena:

- Content tetap berupa file di Git, bukan database CMS.
- Bisa menyimpan dan mengedit Markdown/MDX/Markdoc dengan frontmatter.
- Bisa dipasang langsung di Next.js App Router.
- Bisa berjalan dalam local mode untuk development dan GitHub mode untuk kolaborasi penulis.
- Reader API bisa membaca content dari local filesystem atau GitHub secara server-side.

Keystatic tidak menggantikan D1. Untuk Duit.co.id:

- Artikel tetap di `/artikel/{tier}/{slug}.md`.
- D1 tetap untuk user, unlock, tracking, leads, tools, dan course progress.
- Keystatic hanya menjadi editor Git untuk Markdown/frontmatter.

## Batasan Penting

Keystatic Admin UI membutuhkan server-side code dan Next.js API routes. Karena itu:

- Dengan `next.config.mjs` saat ini yang memakai `output: "export"`, Keystatic sebaiknya dipakai dulu untuk local editing saja.
- Jika admin Keystatic ingin dipakai di production, deployment kemungkinan harus pindah dari static export Cloudflare Pages ke runtime yang mendukung server/API routes, misalnya Cloudflare Workers/OpenNext atau Node-compatible hosting.
- Public artikel tetap bisa static, tetapi admin editor tidak bisa murni static jika memakai GitHub mode.

## Paket Yang Dibutuhkan

Dokumentasi Next.js resmi Keystatic meminta paket:

```bash
npm install @keystatic/core @keystatic/next @markdoc/markdoc
```

Untuk Duit.co.id, jangan install sebelum fase POC Keystatic dimulai. Prioritas saat ini tetap:

1. Stabilkan Next.js App Router.
2. Render semua artikel Markdown server-side/static.
3. Baru pasang Keystatic untuk editing.

## File Dan Route Keystatic

Integrasi Next.js App Router memakai:

```text
keystatic.config.ts
src/app/keystatic/keystatic.ts
src/app/keystatic/layout.tsx
src/app/keystatic/[[...params]]/page.tsx
src/app/api/keystatic/[...params]/route.ts
```

Catatan untuk Duit.co.id:

- Route `/keystatic` tidak boleh dianggap public consumer route.
- Saat local mode, cukup jalankan `npm run dev` dan buka `/keystatic`.
- Saat GitHub mode, akses editor harus mengikuti permission GitHub repository.

## Storage Mode

### Local Mode

Local mode menyimpan perubahan langsung ke filesystem lokal. Ini cocok untuk:

- POC.
- Solo editing.
- Testing schema.
- Menyesuaikan existing `/artikel` tanpa risiko production.

Konfigurasi dasar:

```ts
storage: {
  kind: "local",
}
```

### GitHub Mode

GitHub mode cocok untuk kolaborasi. Syarat utama:

- Project sudah ada di GitHub.
- Collaborator punya write access ke repo.
- Keystatic config memakai repo owner/name.

Contoh:

```ts
storage: {
  kind: "github",
  repo: "OWNER/REPO",
}
```

Untuk Duit.co.id, GitHub mode adalah target setelah local POC stabil.

## Collections vs Singletons

Keystatic punya dua struktur utama:

| Tipe | Fungsi | Contoh Duit.co.id |
|---|---|---|
| Collection | Banyak entry dengan schema yang sama | artikel, courses, experts, partners |
| Singleton | Satu entry khusus | site settings, navigation, homepage copy |

Artikel Duit.co.id harus memakai collections.

Singleton bisa dipakai nanti untuk:

- Navbar link config.
- Footer settings.
- Homepage content.
- Global SEO defaults.

## Path Dan Content Organisation

Keystatic collection memakai `path` dengan wildcard `*`.

Untuk menjaga struktur sekarang:

```text
artikel/
├── tier-0-survival/
├── tier-1-hustler/
├── tier-2-scaler/
├── tier-3-asset-builder/
└── tier-4-legacy/
```

POC paling aman adalah satu collection per tier:

```ts
articlesTier0: collection({
  label: "Artikel - Tier 0 Survival",
  path: "artikel/tier-0-survival/*",
  // ...
})
```

Alasannya:

- Folder tier tetap stabil.
- `tier` frontmatter bisa divalidasi agar sama dengan folder.
- Risiko nested slug lebih rendah.

Alternatif setelah POC:

```ts
path: "artikel/**"
```

Wildcard `**` mendukung nested folder path, tetapi perlu diuji karena slug bisa mengandung `/`. Untuk 518 artikel existing, pendekatan satu collection per tier lebih konservatif.

## Format Options

Keystatic bisa menyimpan data sebagai YAML, JSON, Markdoc, dan MDX.

Default collection tanpa content field akan menghasilkan YAML. Untuk Duit.co.id, itu tidak cukup karena artikel harus satu file Markdown dengan frontmatter.

Gunakan `format.contentField` supaya metadata dan body berada di satu file:

```ts
format: {
  contentField: "content",
}
```

Lalu field body memakai Markdoc atau MDX dengan extension `.md`:

```ts
content: fields.mdx({
  label: "Content",
  extension: "md",
})
```

Rekomendasi awal Duit.co.id:

- Pakai `fields.mdx({ extension: "md" })` untuk body agar tetap `.md`.
- Jangan gunakan import statements, raw HTML, atau JSX di artikel.
- Tetap render public article dengan pipeline Markdown/MDX yang kita kontrol di Next.js.

## MDX vs Markdoc Untuk Duit.co.id

Keystatic mendukung `fields.mdx` dan `fields.markdoc`.

| Field | Kelebihan | Risiko |
|---|---|---|
| `fields.mdx` | Dekat dengan Markdown modern dan bisa memakai `.md` extension | Keystatic tidak mendukung import statements dan HTML tags di MDX |
| `fields.markdoc` | Cocok untuk content structured/editorial | Perlu renderer Markdoc dan penyesuaian syntax |

Rekomendasi:

- Mulai dengan `fields.mdx({ extension: "md" })`.
- Larang JSX/import/raw HTML dalam agent instructions.
- Jika nanti butuh callout atau komponen editorial, evaluasi content components.

## Field Mapping Untuk Artikel

Skema Keystatic harus mengikuti `docs/CMS.md` dan `docs/TAXONOMY.md`.

Mapping yang disarankan:

| Frontmatter | Keystatic field | Catatan |
|---|---|---|
| `title` | `fields.text` atau `fields.slug` POC | Existing files punya `title` dan `slug` terpisah, jadi perlu uji mapping |
| `description` | `fields.text({ multiline: true })` | Validasi panjang 150-160 karakter bisa dilakukan manual/script |
| `date` | `fields.date` | Tetap unique across article files |
| `published_at_wib` | `fields.text` | Format `YYYY-MM-DD HH:mm WIB` |
| `author` | `fields.text` atau `fields.select` | Default `Duit.co.id Team` |
| `slug` | `fields.text` atau slug-derived field | Harus sama dengan filename |
| `image` | `fields.text` atau `fields.image` | Existing memakai public path string |
| `read_time` | `fields.text` | Bisa dihitung script |
| `tier` | `fields.select` | Harus sama dengan folder |
| `gender` | `fields.select` | `male`, `female`, `unisex`, `other` jika dipakai |
| `age` | `fields.select` | `muda`, `produktif`, `pensiun` |
| `location` | `fields.select` | `desa`, `kota`, `global` |
| `education` | `fields.select` | `sma`, `s1`, `s2`, `spesialis` |
| `category` | `fields.array(fields.select(...))` | Multi category |
| `tags` | `fields.array(fields.text(...))` | Lowercase/hyphenated where possible |
| `access_level` | `fields.select` | `open`, `share_gate`, `youtube_gate`, `register_gate`, `paid` |
| `is_premium` | `fields.checkbox` | Boolean |
| `youtube_lock` | `fields.checkbox` | Boolean |
| `youtube_url` | `fields.url` or `fields.text` | Empty string support perlu diuji |
| `youtube_embed_position` | `fields.select` | `top`, `middle`, `bottom`, `inline` |
| body | `fields.mdx({ extension: "md" })` | Stored through `format.contentField` |

## Draft Schema POC

Contoh ini bukan final, tapi cukup untuk POC satu tier:

```ts
import { collection, config, fields } from "@keystatic/core";

const articleSchema = {
  title: fields.text({ label: "Title", validation: { isRequired: true } }),
  description: fields.text({
    label: "Description",
    multiline: true,
    validation: { isRequired: true },
  }),
  date: fields.date({ label: "Publish date", validation: { isRequired: true } }),
  published_at_wib: fields.text({ label: "Published at WIB" }),
  author: fields.text({ label: "Author", defaultValue: "Duit.co.id Team" }),
  slug: fields.text({ label: "Slug", validation: { isRequired: true } }),
  image: fields.text({ label: "Image path" }),
  read_time: fields.text({ label: "Read time" }),
  tier: fields.select({
    label: "Tier",
    options: [{ label: "Tier 0 Survival", value: "tier-0-survival" }],
    defaultValue: "tier-0-survival",
  }),
  gender: fields.select({
    label: "Gender",
    options: [
      { label: "Unisex", value: "unisex" },
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    defaultValue: "unisex",
  }),
  age: fields.select({
    label: "Age",
    options: [
      { label: "Muda", value: "muda" },
      { label: "Produktif", value: "produktif" },
      { label: "Pensiun", value: "pensiun" },
    ],
    defaultValue: "produktif",
  }),
  location: fields.select({
    label: "Location",
    options: [
      { label: "Desa", value: "desa" },
      { label: "Kota", value: "kota" },
      { label: "Global", value: "global" },
    ],
    defaultValue: "kota",
  }),
  education: fields.select({
    label: "Education",
    options: [
      { label: "SMA", value: "sma" },
      { label: "S1", value: "s1" },
      { label: "S2", value: "s2" },
      { label: "Spesialis", value: "spesialis" },
    ],
    defaultValue: "sma",
  }),
  category: fields.array(fields.text({ label: "Category" }), {
    label: "Categories",
    itemLabel: (props) => props.value,
  }),
  tags: fields.array(fields.text({ label: "Tag" }), {
    label: "Tags",
    itemLabel: (props) => props.value,
  }),
  access_level: fields.select({
    label: "Access level",
    options: [
      { label: "Open", value: "open" },
      { label: "Share gate", value: "share_gate" },
      { label: "YouTube gate", value: "youtube_gate" },
      { label: "Register gate", value: "register_gate" },
      { label: "Paid", value: "paid" },
    ],
    defaultValue: "open",
  }),
  is_premium: fields.checkbox({ label: "Premium" }),
  youtube_lock: fields.checkbox({ label: "YouTube lock" }),
  youtube_url: fields.text({ label: "YouTube URL" }),
  youtube_embed_position: fields.select({
    label: "YouTube embed position",
    options: [
      { label: "Top", value: "top" },
      { label: "Middle", value: "middle" },
      { label: "Bottom", value: "bottom" },
      { label: "Inline", value: "inline" },
    ],
    defaultValue: "top",
  }),
  content: fields.mdx({
    label: "Content",
    extension: "md",
  }),
};

export default config({
  storage: { kind: "local" },
  collections: {
    tier0Articles: collection({
      label: "Artikel - Tier 0 Survival",
      slugField: "title",
      path: "artikel/tier-0-survival/*",
      format: { contentField: "content" },
      schema: articleSchema,
    }),
  },
});
```

POC warning:

- Existing `title` and `slug` are separate fields. Keystatic's `fields.slug` may be nicer for new files, but must be tested against existing files before replacing `title`/`slug` semantics.
- If Keystatic rewrites frontmatter ordering, that is acceptable only if it preserves all values and build validation passes.

## Reader API

Reader API is server-side only. Good places to use it include React Server Components and static build code.

Local reader pattern:

```ts
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);
```

Typical operations:

- `reader.collections.articles.list()` to list slugs.
- `reader.collections.articles.read(slug)` to read one entry.
- `reader.collections.articles.all()` to read all entries with slugs.
- `reader.singletons.settings.read()` for singleton data.

For Duit.co.id, Reader API can eventually power:

- `/artikel` index.
- `/artikel/[slug]`.
- sitemap generation.
- related article generation.

But if Reader API output for MDX/Markdoc does not match current Markdown rendering needs, we can still keep a custom Markdown loader using `gray-matter` while Keystatic acts only as the editor.

## Images And Media

Keystatic image fields can store uploaded images in local filesystem or GitHub. The docs support custom `directory` and public path patterns.

For Duit.co.id:

- Continue using `/public/images/artikel`.
- Prefer frontmatter image strings initially to avoid unexpected file movement.
- Later evaluate `fields.image` with:
  - `directory: "public/images/artikel"`
  - a public path matching `/images/artikel/...`

R2 should be reserved for larger media workflows later. Article featured images can remain in Git/public until the repo size becomes a real issue.

## Content Components

Keystatic content components can add structured blocks to MDX/Markdoc editing:

- wrapper
- block
- inline
- mark
- repeating

For Duit.co.id, do not enable these in phase 1.

Reason:

- Existing articles are plain Markdown.
- Current renderer is `react-markdown`/MDX-oriented, not a custom component renderer.
- Components can introduce JSX-like output that breaks the simple Markdown pipeline.

Use later for:

- callouts
- calculator embeds
- expert CTA blocks
- YouTube embeds
- legal warning boxes

## Real-Time Preview

Keystatic supports a Next.js draft-mode preview recipe.

For Duit.co.id:

- Defer this until after GitHub mode works.
- Static Cloudflare Pages export will not be enough for draft-mode preview.
- Preview requires server routes and branch-aware reading from GitHub.

## Recommended Implementation Phases

### Phase 1: Local POC

- Install Keystatic packages.
- Add `keystatic.config.ts`.
- Configure one tier collection, probably `tier-0-survival`.
- Map 3-5 sample existing articles.
- Verify Keystatic can open, edit, and save without corrupting frontmatter.
- Verify `npm run build` still passes after edits.

### Phase 2: All Article Tiers

- Add collections for all five tiers.
- Validate all required frontmatter fields.
- Add clear editor labels and descriptions.
- Test create/edit/delete workflow.
- Test article filename/slug consistency.

### Phase 3: Production Editorial Decision

- If editor is local-only: document writer workflow using Git branches/PR.
- If editor must be deployed: move runtime plan to Workers/OpenNext or another Node-compatible deployment.
- Add GitHub mode and repo permissions.

### Phase 4: Optional Enhancements

- Add image picker after image path behavior is tested.
- Add singleton for site settings.
- Add preview URL with Next draft mode.
- Add content components only after article renderer supports them.

## Duit.co.id Keystatic Rules

Article files must stay compatible with both Keystatic and the public renderer:

- One file per article.
- YAML frontmatter only at the top.
- No malformed multiline YAML.
- `title` is the page H1; body must not use `#`.
- Body starts with a real article opening, not an editorial/meta note.
- No repeated boilerplate such as:
  - `Artikel ini ditulis untuk pembaca...`
  - `Riset pendukungnya...`
- No raw HTML, script tags, import statements, or JSX.
- Use Markdown tables/lists/blockquotes normally.
- Keep URLs root-relative where possible: `/artikel/...`, `/images/artikel/...`.

## Official Sources Checked

- Keystatic Introduction: https://keystatic.com/docs
- Keystatic Next.js installation: https://keystatic.com/docs/installation-next-js
- Configuration: https://keystatic.com/docs/configuration
- Local mode: https://keystatic.com/docs/local-mode
- GitHub mode: https://keystatic.com/docs/github-mode
- Collections and singletons: https://keystatic.com/docs/collections-and-singletons
- Singletons: https://keystatic.com/docs/singletons
- Content organisation: https://keystatic.com/docs/content-organisation
- Path wildcard: https://keystatic.com/docs/path-wildcard
- Format options: https://keystatic.com/docs/format-options
- Reader API: https://keystatic.com/docs/reader-api
- MDX field: https://keystatic.com/docs/fields/mdx
- Markdoc field: https://keystatic.com/docs/fields/markdoc
- Text field: https://keystatic.com/docs/fields/text
- Slug field: https://keystatic.com/docs/fields/slug
- Select field: https://keystatic.com/docs/fields/select
- Checkbox field: https://keystatic.com/docs/fields/checkbox
- Array field: https://keystatic.com/docs/fields/array
- URL field: https://keystatic.com/docs/fields/url
- Image field: https://keystatic.com/docs/fields/image
- Relationship field: https://keystatic.com/docs/fields/relationship
- Path reference field: https://keystatic.com/docs/fields/path-reference
- Content components: https://keystatic.com/docs/content-components
- Real-time previews with Next.js draft mode: https://keystatic.com/docs/recipes/real-time-previews
