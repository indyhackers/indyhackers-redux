migrate(
  (db) => {
    const dao = new Dao(db)

    const users = dao.findCollectionByNameOrId('users')
    const collection = new Collection({
      name: 'jobs',
      type: 'base',
      schema: [
        {
          name: 'user',
          type: 'relation',
          required: true,
          options: {
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: false
          }
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          unique: false
        },
        {
          name: 'company',
          type: 'text',
          required: true,
          unique: false
        },
        {
          name: 'salary',
          type: 'number',
          required: false
        },
        {
          name: 'description',
          type: 'editor',
          required: false
        }
      ],
      //indexes: [],
      options: {},
      //id: 'jobs',
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null
    })

    dao.saveCollection(collection)
  },
  (db) => {
    const dao = new Dao(db)
    dao.deleteCollection('jobs')
  }
)
