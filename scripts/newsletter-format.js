import { SPONSORS } from './newsletter-config.js'

const FULL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/
const TZ = 'America/Indiana/Indianapolis'

export function formatEventDate(isoString) {
  if (DATE_ONLY.test(isoString)) {
    // Parse parts directly — avoids UTC-midnight shifting the date
    const [, month, day] = isoString.split('-').map(Number)
    return `${FULL_MONTHS[month - 1]} ${day}`
  }
  const d = new Date(isoString)
  if (isNaN(d)) return isoString
  return d.toLocaleDateString('en-US', {
    timeZone: TZ,
    month: 'long',
    day: 'numeric',
  })
}

export function formatEventTime(isoString) {
  if (!isoString || DATE_ONLY.test(isoString)) return ''
  const d = new Date(isoString)
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(d)
  const hour = parts.find((p) => p.type === 'hour').value
  const minute = parts.find((p) => p.type === 'minute').value
  const period = parts.find((p) => p.type === 'dayPeriod').value.toUpperCase()
  return `${hour}:${minute} ${period}`
}

// Returns the plain-text suffix after the title, e.g. " - November 4 at 7:00 AM"
export function formatEventSuffix(event) {
  const date = formatEventDate(event.date)
  const time = formatEventTime(event.date)
  return time ? ` - ${date} at ${time}` : ` - ${date}`
}

export function extractUrl(text) {
  if (!text) return ''
  const match = text.match(/https?:\/\/[^\s<>"]+/)
  return match ? match[0] : ''
}

function jobUrl(job) {
  return `https://www.indyhackers.org/job?id=${job.id}`
}

// Each segment: { text, url, bold, heading }
// heading segments become Heading 1 paragraphs in the Google Doc.
export function buildSegments(events, jobs) {
  const segs = []
  const t = (text) => segs.push({ text, url: null, bold: false, heading: false })
  const h = (text) => {
    segs.push({ text: text + '\n', url: null, bold: false, heading: true })
    t('\n')
  }
  const pushEvent = (event) => {
    segs.push({ text: event.title, url: event.url || null, bold: true, heading: false })
    t(formatEventSuffix(event) + '\n')
  }

  // Intro
  h('INTRO')
  t('[LEAVE BLANK — editor to write intro here]\n\n\n')

  // Meetup of the Fortnight
  h('MEETUP OF THE FORTNIGHT')
  const featured = events[0] || null
  if (featured) {
    pushEvent(featured)
  } else {
    t('[No upcoming events found — check calendar]\n')
  }
  t('\n\n')

  // Upcoming Events
  h('UPCOMING EVENTS')
  if (events.length > 0) {
    for (const event of events) {
      pushEvent(event)
    }
  } else {
    t('[No upcoming events found]\n')
  }
  t('\nIs there an event you would like to announce here? Let us know at newsletter@indyhackers.org and we\'ll get it added to the calendar.\n\n')

  // Jobs
  h('NEW ON THE JOB BOARD')
  if (jobs.length > 0) {
    for (const job of jobs) {
      segs.push({ text: `${job.title} at ${job.company}`, url: jobUrl(job), bold: false, heading: false })
      t('\n')
    }
  } else {
    t('[No recent job listings found]\n')
  }
  t('\nThe IndyHackers job board is free to companies and the community. Our goal is to help as many community members as possible land jobs they love at companies based here in Indiana, growing the community of hackers throughout the state.\n\n')
  t('If your company is hiring, post your job here.\n\n')
  t("If you're hunting for a job, the full job board is here or you can follow along in #jobs in our ")
  segs.push({ text: 'Slack', url: 'https://slack.indyhackers.org/', bold: false, heading: false })
  t(". Or: Just reply to this email with what you're looking for.\n\n")

  // Closing
  h('CLOSING')
  t('[LEAVE BLANK — editor to write closing here]\n')

  return segs
}

// Render segments as markdown-ish text for dry-run preview
export function segmentsToText(segs) {
  return segs
    .map((s) => {
      let text = s.text
      if (s.url) text = `[${text}](${s.url})`
      if (s.bold) text = `**${text}**`
      if (s.heading) text = `## ${text}`
      return text
    })
    .join('')
}
