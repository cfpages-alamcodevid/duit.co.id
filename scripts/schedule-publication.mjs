console.error(
  [
    "schedule:publish is deprecated.",
    "Article files are now body-only Markdown, and public dates live in JSON/article-dates.json.",
    "Run `npm run prebuild` to assign stable unique dates for new article slugs.",
  ].join("\n"),
)

process.exitCode = 1
