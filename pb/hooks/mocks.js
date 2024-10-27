async function exportMocks() {
  try {
    // Initialize the collections dump object
    const snapshot = {}

    // Get the list of collections
    const baseCollections = $app.dao().findCollectionsByType('base')
    const authCollections = $app.dao().findCollectionsByType('auth')
    const viewCollections = $app.dao().findCollectionsByType('view')

    const collections = [...baseCollections, ...authCollections, ...viewCollections]

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

    console.log(`Writing ${__hooks}/mocks.json`)
    $os.writeFile(`${__hooks}/mocks.json`, JSON.stringify(snapshot, null, 2), 0644)
  } catch (error) {
    console.error('Error fetching collections:', error)
    return c.json(500, { error: 'An error occurred while fetching collections: ' + error })
  }
}

async function applyMocks() {
  try {
    const db = $app.dao()

    const mockData = await JSON.parse(
      String.fromCharCode(...$os.readFile(`/${__hooks}/mocks.json`))
    )

    // Loop over each collection in the mock data
    for (const [collectionName, collectionData] of Object.entries(mockData)) {
      // Check if the collection already exists
      var collection = null
      try {
        collection = await db.findCollectionByNameOrId(collectionName)
      } catch (err) {
        console.log('errr: ' + err)
        // Create the collection if it doesn't exist
        console.log(`Creating collection: ${collectionName}`)
        const newCollection = new Collection(collectionData.collection)
        db.saveCollection(newCollection)
      }
      // Loop over each record in the collection items
      for (const item of collectionData.items) {
        // Check if the record already exists by ID
        try {
          await db.findRecordById(collectionName, item.id)
        } catch (err) {
          // Insert the record if it doesn't exist
          const record = new Record(collection, item)
          console.log(`Inserting record: ${item.id} into collection: ${collectionName}`)
          if (collection.type === 'auth') {
            record.setPassword($security.randomString(42))
          }
          await db.saveRecord(record)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  applyMocks,
  exportMocks
}
