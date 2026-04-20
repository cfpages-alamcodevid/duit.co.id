import fs from "fs"
import path from "path"

const ROOT = process.cwd()
const VERSION_FILE = path.join(ROOT, "src", "version.ts")

function getCurrentVersion() {
  const content = fs.readFileSync(VERSION_FILE, "utf-8")
  const match = content.match(/VERSION = "(\d+)\.(\d+)\.(\d+)"/)
  if (!match) throw new Error("Cannot parse version")
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) }
}

function bumpVersion(part = "patch") {
  const v = getCurrentVersion()
  let newVersion

  if (part === "major") {
    newVersion = { major: v.major + 1, minor: 0, patch: 0 }
  } else if (part === "minor") {
    newVersion = { major: v.major, minor: v.minor + 1, patch: 0 }
  } else {
    newVersion = { major: v.major, minor: v.minor, patch: v.patch + 1 }
  }

  const today = new Date().toISOString().split("T")[0]

  const content = `export const VERSION = "${newVersion.major}.${newVersion.minor}.${newVersion.patch}" as const
export const BUILD_DATE = "${today}" as const
`

  fs.writeFileSync(VERSION_FILE, content, "utf-8")

  console.log(`Version bumped: ${v.major}.${v.minor}.${v.patch} → ${newVersion.major}.${newVersion.minor}.${newVersion.patch}`)
  console.log(`Build date: ${today}`)
}

const args = process.argv.slice(2)
const part = args[0] || "patch"

try {
  bumpVersion(part)
} catch (err) {
  console.error(err.message)
  process.exit(1)
}