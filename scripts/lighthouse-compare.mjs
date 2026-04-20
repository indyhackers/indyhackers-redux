#!/usr/bin/env node

/**
 * Compare two Lighthouse JSON reports side-by-side.
 *
 * Usage:
 *   node scripts/lighthouse-compare.mjs <before.json> <after.json>
 *
 * Example:
 *   node scripts/lighthouse-compare.mjs tmp/lighthouse/before.report.json tmp/lighthouse/after.report.json
 */

import { readFileSync } from 'node:fs'

const [beforePath, afterPath] = process.argv.slice(2)

if (!beforePath || !afterPath) {
  console.error('Usage: node scripts/lighthouse-compare.mjs <before.json> <after.json>')
  process.exit(1)
}

const before = JSON.parse(readFileSync(beforePath, 'utf-8'))
const after = JSON.parse(readFileSync(afterPath, 'utf-8'))

// Category scores
console.log('=== Category Scores ===')
console.log()
console.log(
  'Category'.padEnd(22) + 'Before'.padStart(8) + 'After'.padStart(8) + 'Delta'.padStart(8)
)
console.log('-'.repeat(46))

for (const key of Object.keys(before.categories)) {
  const b = Math.round(before.categories[key].score * 100)
  const a = Math.round(after.categories[key].score * 100)
  const delta = a - b
  const sign = delta > 0 ? '+' : ''
  const marker = delta > 0 ? ' ^^' : delta < 0 ? ' !!' : ''
  console.log(
    before.categories[key].title.padEnd(22) +
      String(b).padStart(8) +
      String(a).padStart(8) +
      (sign + delta).padStart(8) +
      marker
  )
}

// Key metrics
const metrics = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'speed-index',
  'total-blocking-time',
  'cumulative-layout-shift',
]

console.log()
console.log('=== Key Metrics ===')
console.log()
console.log(
  'Metric'.padEnd(35) + 'Before'.padStart(12) + 'After'.padStart(12) + 'Delta'.padStart(12)
)
console.log('-'.repeat(71))

for (const id of metrics) {
  const b = before.audits[id]
  const a = after.audits[id]
  if (!b || !a) continue

  const bVal = b.numericValue || 0
  const aVal = a.numericValue || 0
  const delta = aVal - bVal
  const sign = delta > 0 ? '+' : ''
  const unit = id === 'cumulative-layout-shift' ? '' : 'ms'
  const format = (v) => (id === 'cumulative-layout-shift' ? v.toFixed(3) : Math.round(v) + unit)

  console.log(
    b.title.padEnd(35) +
      format(bVal).padStart(12) +
      format(aVal).padStart(12) +
      (sign + format(delta)).padStart(12)
  )
}

// Audits that improved or regressed
console.log()
console.log('=== Audit Changes ===')
console.log()

const changes = []
for (const [id, bAudit] of Object.entries(before.audits)) {
  const aAudit = after.audits[id]
  if (!aAudit || bAudit.score === null || aAudit.score === null) continue
  if (bAudit.score !== aAudit.score) {
    changes.push({
      title: bAudit.title,
      before: bAudit.score,
      after: aAudit.score,
      delta: aAudit.score - bAudit.score,
    })
  }
}

changes.sort((a, b) => b.delta - a.delta)

const improved = changes.filter((c) => c.delta > 0)
const regressed = changes.filter((c) => c.delta < 0)

if (improved.length) {
  console.log('Improved:')
  for (const c of improved) {
    console.log(
      `  + ${c.title} (${Math.round(c.before * 100)}% -> ${Math.round(c.after * 100)}%)`
    )
  }
}

if (regressed.length) {
  console.log('Regressed:')
  for (const c of regressed) {
    console.log(
      `  - ${c.title} (${Math.round(c.before * 100)}% -> ${Math.round(c.after * 100)}%)`
    )
  }
}

if (!improved.length && !regressed.length) {
  console.log('No audit score changes detected.')
}

// Network comparison
console.log()
console.log('=== Transfer Size ===')
console.log()

const totalBefore = before.audits['network-requests']?.details?.items?.reduce(
  (sum, i) => sum + (i.transferSize || 0),
  0
)
const totalAfter = after.audits['network-requests']?.details?.items?.reduce(
  (sum, i) => sum + (i.transferSize || 0),
  0
)

if (totalBefore && totalAfter) {
  const kb = (v) => Math.round(v / 1024) + 'KB'
  const delta = totalAfter - totalBefore
  const sign = delta > 0 ? '+' : ''
  console.log(`  Before: ${kb(totalBefore)}`)
  console.log(`  After:  ${kb(totalAfter)}`)
  console.log(`  Delta:  ${sign}${kb(delta)}`)
}
