import { google } from 'googleapis'
import PocketBase from 'pocketbase'
import {
  SPONSORS,
  CALENDAR_DAYS_AHEAD,
  DOC_TITLE_PREFIX,
  IMPERSONATE_USER,
} from './newsletter-config.js'
import { extractUrl, buildSegments, segmentsToText } from './newsletter-format.js'

// ---------------------------------------------------------------------------
// Env var validation
// ---------------------------------------------------------------------------

const REQUIRED_ENV_VARS = [
  'GOOGLE_SERVICE_ACCOUNT_KEY_FILE',
  'GOOGLE_CALENDAR_ID',
  'GOOGLE_DRIVE_FOLDER_ID',
  'POCKETBASE_URL',
  'POCKETBASE_ADMIN_EMAIL',
  'POCKETBASE_ADMIN_PASSWORD',
  //'SLACK_WEBHOOK_URL',
]

function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((k) => !process.env[k])
  if (missing.length) {
    console.error('Missing required environment variables:')
    missing.forEach((k) => console.error(`  ${k}`))
    process.exit(1)
  }
}

// ---------------------------------------------------------------------------
// Google auth (service account + Domain-Wide Delegation)
// ---------------------------------------------------------------------------

// Auth for Drive/Docs — uses DWD so files are owned by a real user
function buildAuthClient() {
  return new google.auth.JWT({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
    scopes: [
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive',
    ],
    subject: IMPERSONATE_USER,
  })
}

// Auth for Calendar — public calendar, no DWD needed
function buildCalendarAuthClient() {
  return new google.auth.JWT({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  })
}

// ---------------------------------------------------------------------------
// Fetch calendar events
// ---------------------------------------------------------------------------

async function fetchCalendarEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth })
  const now = new Date()
  const future = new Date(now)
  future.setDate(future.getDate() + CALENDAR_DAYS_AHEAD)

  const res = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: now.toISOString(),
    timeMax: future.toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: 'startTime',
  })

  return (res.data.items || []).map((e) => ({
    title: e.summary || '(no title)',
    date: e.start.dateTime || e.start.date,
    endDate: e.end?.dateTime || e.end?.date || '',
    url: extractUrl(e.description) || '',
  }))
}

// ---------------------------------------------------------------------------
// Fetch jobs from PocketBase
// ---------------------------------------------------------------------------

async function fetchJobs() {
  const pb = new PocketBase(process.env.POCKETBASE_URL)
  await pb.collection('_superusers').authWithPassword(
    process.env.POCKETBASE_ADMIN_EMAIL,
    process.env.POCKETBASE_ADMIN_PASSWORD,
  )
const JOBS_LIMIT = 10
  const result = await pb.collection('jobs').getList(1, JOBS_LIMIT, {
    filter: 'approved = true && approved_at != ""',
    sort: '-approved_at',
  })

  return result.items.map((r) => ({
    id: r.id,
    title: r.title,
    company: r.company,
  }))
}


// ---------------------------------------------------------------------------
// Create Google Doc
// ---------------------------------------------------------------------------

async function createNewsletterDoc(auth, title, segments) {
  const drive = google.drive({ version: 'v3', auth })
  const docs = google.docs({ version: 'v1', auth })

  // Create a blank doc directly in the target folder
  const file = await drive.files.create({
    requestBody: {
      name: title,
      mimeType: 'application/vnd.google-apps.document',
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    },
    fields: 'id',
  })
  const docId = file.data.id

  // Calculate style ranges before inserting (Google Docs index starts at 1)
  const fullText = segments.map((s) => s.text).join('')
  const styleRequests = []
  let offset = 1
  for (const seg of segments) {
    if (seg.heading) {
      styleRequests.push({
        updateParagraphStyle: {
          range: { startIndex: offset, endIndex: offset + seg.text.length },
          paragraphStyle: { namedStyleType: 'HEADING_1' },
          fields: 'namedStyleType',
        },
      })
    }
    if (seg.bold || seg.url) {
      styleRequests.push({
        updateTextStyle: {
          range: { startIndex: offset, endIndex: offset + seg.text.length },
          textStyle: {
            ...(seg.bold && { bold: true }),
            ...(seg.url && { link: { url: seg.url } }),
          },
          fields: [seg.bold && 'bold', seg.url && 'link'].filter(Boolean).join(','),
        },
      })
    }
    offset += seg.text.length
  }

  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [
        { insertText: { location: { index: 1 }, text: fullText } },
        ...styleRequests,
      ],
    },
  })

  await appendSponsorLogos(docs, docId, 1 + fullText.length)

  return docId
}

async function appendSponsorLogos(docs, docId, afterIndex) {
  const sponsorsWithLogos = SPONSORS.filter((s) => s.logoUrl)
  if (!sponsorsWithLogos.length) return

  // '\n\n' before + 'Thanks to Our Sponsors\n' heading + '\n' blank line
  const header = '\n\nThanks to Our Sponsors\n\n'
  const headingStart = afterIndex + 2
  const headingEnd = headingStart + 'Thanks to Our Sponsors\n'.length
  const requests = [
    { insertText: { location: { index: afterIndex }, text: header } },
    {
      updateParagraphStyle: {
        range: { startIndex: headingStart, endIndex: headingEnd },
        paragraphStyle: { namedStyleType: 'HEADING_1' },
        fields: 'namedStyleType',
      },
    },
  ]

  let pos = afterIndex + header.length
  for (const sponsor of sponsorsWithLogos) {
    requests.push({
      insertInlineImage: {
        location: { index: pos },
        uri: sponsor.logoUrl,
        objectSize: {
          height: { magnitude: 72, unit: 'PT' },
          width: { magnitude: 144, unit: 'PT' },
        },
      },
    })
    pos += 1 // inline image occupies 1 character position
    requests.push({ insertText: { location: { index: pos }, text: '\n' } })
    pos += 1
  }

  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: { requests },
  })
}

// ---------------------------------------------------------------------------
// Slack notification
// ---------------------------------------------------------------------------

async function notifySlack(text) {
  const res = await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) {
    console.warn(`Slack notification failed: ${res.status}`)
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  validateEnv()

  const now = new Date()
  const monthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const docTitle = `${DOC_TITLE_PREFIX} — ${monthYear}`

  if (dryRun) {
    console.log(`=== DRY RUN — would create: ${docTitle} ===\n`)
    // Still fetch real data in dry-run so you can preview it
    const auth = buildAuthClient()
    let events = []
    let jobs = []
    try {
      events = await fetchCalendarEvents(buildCalendarAuthClient())
      console.log(`Fetched ${events.length} calendar events`)
    } catch (err) {
      console.warn('Could not fetch calendar events:', err.message)
    }
    try {
      jobs = await fetchJobs()
      console.log(`Fetched ${jobs.length} jobs`)
    } catch (err) {
      console.warn('Could not fetch jobs:', err.message)
    }
    console.log('\n' + segmentsToText(buildSegments(events, jobs)))
    return
  }

  const auth = buildAuthClient()

  let events = []
  try {
    events = await fetchCalendarEvents(buildCalendarAuthClient())
    console.log(`Fetched ${events.length} calendar events`)
  } catch (err) {
    console.warn('Failed to fetch calendar events — continuing without them:', err.message)
  }

  let jobs = []
  try {
    jobs = await fetchJobs()
    console.log(`Fetched ${jobs.length} jobs`)
  } catch (err) {
    console.warn('Failed to fetch jobs — continuing without them:', err.message)
  }

  const segments = buildSegments(events, jobs)

  console.log(`Creating Google Doc: ${docTitle}`)
  const docId = await createNewsletterDoc(auth, docTitle, segments)
  const docUrl = `https://docs.google.com/document/d/${docId}/edit`

  // try {
  //   await notifySlack(
  //     `📰 *Newsletter draft ready for ${monthYear}*\n<${docUrl}|Open in Google Docs>`,
  //   )
  // } catch (err) {
  //   console.warn('Slack notification failed (doc was still created):', err.message)
  // }

  console.log(`\nDone!`)
  console.log(`  Title: ${docTitle}`)
  console.log(`  URL:   ${docUrl}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
