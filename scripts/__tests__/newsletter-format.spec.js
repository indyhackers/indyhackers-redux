import { describe, it, expect } from 'vitest'
import {
  formatEventDate,
  formatEventTime,
  formatEventSuffix,
  extractUrl,
  buildSegments,
} from '../newsletter-format.js'

// All times use America/Indiana/Indianapolis (UTC-5 in winter, UTC-4 in summer)
// DST 2026 starts March 8, so dates before that = UTC-5

describe('formatEventDate', () => {
  it('formats a datetime string with full month name', () => {
    expect(formatEventDate('2026-03-03T12:00:00Z')).toBe('March 3')
  })

  it('formats a date-only string without timezone shift', () => {
    expect(formatEventDate('2026-03-03')).toBe('March 3')
  })

  it('handles other months', () => {
    expect(formatEventDate('2026-11-04T12:00:00Z')).toBe('November 4')
  })

  it('handles January', () => {
    expect(formatEventDate('2026-01-14T12:00:00Z')).toBe('January 14')
  })
})

describe('formatEventTime', () => {
  it('formats an AM time with minutes', () => {
    // 12:00Z = 7:00 AM EST
    expect(formatEventTime('2026-03-03T12:00:00Z')).toBe('7:00 AM')
  })

  it('formats a PM time with minutes', () => {
    // 21:00Z = 4:00 PM EST
    expect(formatEventTime('2026-03-03T21:00:00Z')).toBe('4:00 PM')
  })

  it('formats a time with non-zero minutes', () => {
    // 14:30Z = 9:30 AM EST
    expect(formatEventTime('2026-03-03T14:30:00Z')).toBe('9:30 AM')
  })

  it('returns empty string for date-only input', () => {
    expect(formatEventTime('2026-03-03')).toBe('')
  })

  it('returns empty string for empty input', () => {
    expect(formatEventTime('')).toBe('')
  })
})

describe('formatEventSuffix', () => {
  it('includes date and time for timed events', () => {
    const event = {
      date: '2026-11-04T12:00:00Z', // 7:00 AM EST
      endDate: '2026-11-04T13:30:00Z',
    }
    expect(formatEventSuffix(event)).toBe(' - November 4 at 7:00 AM')
  })

  it('omits time for all-day events', () => {
    const event = { date: '2026-03-05', endDate: '2026-03-06' }
    expect(formatEventSuffix(event)).toBe(' - March 5')
  })

  it('formats a PM event correctly', () => {
    const event = { date: '2026-03-01T21:00:00Z', endDate: '' }
    expect(formatEventSuffix(event)).toBe(' - March 1 at 4:00 PM')
  })
})

describe('job segments', () => {
  const makeJob = (overrides = {}) => ({
    id: 'abc123',
    title: 'Project Manager',
    company: 'Six Feet Up',
    ...overrides,
  })

  const jobSegs = (jobs) => buildSegments([], jobs).filter((s) => s.url?.includes('/job?id='))

  it('formats job as "Title at Company" hyperlink', () => {
    const [seg] = jobSegs([makeJob()])
    expect(seg.text).toBe('Project Manager at Six Feet Up')
    expect(seg.url).toBe('https://www.indyhackers.org/job?id=abc123')
    expect(seg.bold).toBe(false)
  })

  it('uses the job id in the URL', () => {
    const [seg] = jobSegs([makeJob({ id: 'xyz999' })])
    expect(seg.url).toBe('https://www.indyhackers.org/job?id=xyz999')
  })

  it('includes all jobs', () => {
    const jobs = [
      makeJob({ id: '1', title: 'Developer', company: 'Acme' }),
      makeJob({ id: '2', title: 'Designer', company: 'Foo Co' }),
    ]
    const segs = jobSegs(jobs)
    expect(segs).toHaveLength(2)
    expect(segs[0].text).toBe('Developer at Acme')
    expect(segs[1].text).toBe('Designer at Foo Co')
  })

  it('shows placeholder when no jobs', () => {
    const segs = buildSegments([], [])
    const placeholder = segs.find((s) => s.text.includes('No recent job listings'))
    expect(placeholder).toBeDefined()
  })
})

describe('extractUrl', () => {
  it('extracts first URL from text', () => {
    expect(extractUrl('Join us!\nhttps://www.meetup.com/fishers-code-coffee/\nSee you there')).toBe(
      'https://www.meetup.com/fishers-code-coffee/',
    )
  })

  it('extracts URL when surrounded by other text', () => {
    expect(extractUrl('More info: https://meetup.com/indy and also visit us')).toBe(
      'https://meetup.com/indy',
    )
  })

  it('returns empty string when no URL present', () => {
    expect(extractUrl('No links here')).toBe('')
  })

  it('returns empty string for null input', () => {
    expect(extractUrl(null)).toBe('')
  })

  it('returns empty string for empty string', () => {
    expect(extractUrl('')).toBe('')
  })
})
