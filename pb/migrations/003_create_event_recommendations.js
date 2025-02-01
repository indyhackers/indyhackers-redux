migrate(
  (app) => {
    // Create Event Recommendations Collection
    let eventRecommendationsCollection = new Collection({
      type: 'base',
      name: 'event_recommendations',
      fields: [
        { name: 'email', type: 'string', required: true },
        { name: 'title', type: 'string', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'url', type: 'string', required: true },
        { name: 'start_date', type: 'date', required: true },
        { name: 'start_time', type: 'time', required: true },
        { name: 'end_date', type: 'date', required: false },
        { name: 'end_time', type: 'time', required: true },
        {
          name: 'repeat',
          type: 'string',
          required: true,
          options: ['Weekly', 'Monthly', 'Not at all']
        }
      ]
    })

    app.save(eventRecommendationsCollection)
  },
  (app) => {
    // Delete Event Recommendations Collection
    let eventRecommendationsCollection = app.findCollectionByNameOrId('event_recommendations')
    app.delete(eventRecommendationsCollection)
  }
)
