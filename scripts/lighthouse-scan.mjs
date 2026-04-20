#!/usr/bin/env node

/**
 * Run a Lighthouse scan against a URL and save the report.
 *
 * Usage:
 *   node scripts/lighthouse-scan.mjs [url] [label]
 *
 * Examples:
 *   node scripts/lighthouse-scan.mjs                          # scans localhost:5173, label "local"
 *   node scripts/lighthouse-scan.mjs https://dev.indyhackers.org dev
 *   node scripts/lighthouse-scan.mjs http://localhost:5173 before
 */

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const url = process.argv[2] || 'http://localhost:5173'
const label = process.argv[3] || 'local'
const outDir = resolve(import.meta.dirname, '..', 'tmp', 'lighthouse')

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const baseName = `${label}-${timestamp}`
const jsonPath = resolve(outDir, `${baseName}.json`)
const htmlPath = resolve(outDir, `${baseName}.html`)

const chromePath =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

console.log(`Scanning ${url} ...`)

try {
  execSync(
    `lighthouse "${url}" ` +
      `--output json,html ` +
      `--output-path "${resolve(outDir, baseName)}" ` +
      `--chrome-flags="--headless --no-sandbox" ` +
      `--quiet`,
    { env: { ...process.env, CHROME_PATH: chromePath }, stdio: 'inherit', timeout: 120_000 }
  )
} catch (e) {
  console.error('Lighthouse scan failed:', e.message)
  process.exit(1)
}

// Lighthouse appends the extension itself when given multiple outputs
const actualJson = resolve(outDir, `${baseName}.report.json`)
const actualHtml = resolve(outDir, `${baseName}.report.html`)

const reportPath = existsSync(actualJson) ? actualJson : jsonPath

// Print summary
const report = JSON.parse((await import('node:fs')).readFileSync(reportPath, 'utf-8'))
const cats = report.categories

console.log()
console.log(`=== Lighthouse: ${url} (${label}) ===`)
console.log()
for (const cat of Object.values(cats)) {
  const score = Math.round(cat.score * 100)
  const bar = score >= 90 ? '##' : score >= 50 ? '#-' : '--'
  console.log(`  ${bar} ${cat.title.padEnd(20)} ${score}`)
}

console.log()
console.log(`JSON: ${existsSync(actualJson) ? actualJson : jsonPath}`)
console.log(`HTML: ${existsSync(actualHtml) ? actualHtml : htmlPath}`)
console.log()
console.log(`Compare with: node scripts/lighthouse-compare.mjs ${reportPath} <other-report.json>`)
