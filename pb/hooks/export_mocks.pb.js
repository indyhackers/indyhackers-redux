/// <reference path="../pb_data/types.d.ts" />

routerAdd('GET', '/api/snapshot', async (c) => {
  // TODO: find out why environment variables don't make it here
  // const isDev = process.env.NODE_ENV === 'development'
  // const environ = $os.environ
  // console.log(isDev)

  // Check if the environment is development
  var namespace = ''
  try {
    const nsBytes = $os.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/namespace')
    namespace = nsBytes.toString()
  } catch (err) {
    namespace = 'docker'
  }

  if (!namespace === 'docker') {
    return c.json(403, { error: 'This route is only available in development mode. ' + isDev })
  }

  try {
    // Initialize the collections dump object
    const snapshot = {}

    // Get the list of collections
    const baseCollections = $app.dao().findCollectionsByType('base')
    const authCollections = $app.dao().findCollectionsByType('auth')
    const viewCollections = $app.dao().findCollectionsByType('view')

    const collections = [...baseCollections, ...authCollections, ...viewCollections]
    //const collections = await $app.dao().listCollections()

    // Iterate over each collection to fetch schema and data
    for (const collection of collections) {
      // Fetch collection schema
      const schema = await $app.dao().findCollectionByNameOrId(collection.name)

      // Fetch all records in the collection
      const records = await $app.dao().findRecordsByExpr(collection.name)

      // Combine schema and records for each collection
      snapshot[collection.name] = {
        collection: schema,
        items: records.map((record) => record.publicExport()) // Safely export fields
      }
    }

    // Return the combined collection data as JSON
    return c.json(200, snapshot)
  } catch (error) {
    console.error('Error fetching collections:', error)
    return c.json(500, { error: 'An error occurred while fetching collections: ' + error })
  }
})
