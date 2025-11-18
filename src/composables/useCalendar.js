import { ref, computed } from 'vue'

export function useCalendar() {
  const events = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Calendar ID from the existing CalendarView
  const CALENDAR_ID = 'ig7e0j6v8ub9q6kga256n77048@group.calendar.google.com'

  // Google Calendar API key from environment variables
  // For public calendars, you can get a free API key from Google Cloud Console
  const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY

  if (!API_KEY) {
    console.warn('VITE_GOOGLE_CALENDAR_API_KEY is not set in environment variables')
  }

  const fetchEvents = async () => {
    loading.value = true
    error.value = null

    try {
      // Get events from now onwards, ordered by start time
      const now = new Date().toISOString()
      const params = new URLSearchParams({
        key: API_KEY,
        timeMin: now,
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime'
      })

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar events: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // Parse and transform events
      events.value = (data.items || []).map(event => ({
        id: event.id,
        title: event.summary || 'No title',
        description: event.description || '',
        location: event.location || '',
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
        link: event.htmlLink,
        isAllDay: !event.start?.dateTime, // If no dateTime, it's an all-day event
        created: event.created,
        updated: event.updated
      }))

    } catch (err) {
      console.error('Error fetching calendar events:', err)
      error.value = err.message || 'Failed to fetch calendar events'
    } finally {
      loading.value = false
    }
  }

  // Group events by date
  const eventsByDate = computed(() => {
    const grouped = {}

    events.value.forEach(event => {
      const startDate = new Date(event.start)
      const dateKey = startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })

    return grouped
  })

  // Get upcoming events (next 5)
  const upcomingEvents = computed(() => {
    return events.value.slice(0, 5)
  })

  return {
    events,
    loading,
    error,
    fetchEvents,
    eventsByDate,
    upcomingEvents
  }
}
