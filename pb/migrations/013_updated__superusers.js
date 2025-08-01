migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3142635823')

    // add field
    collection.fields.addAt(
      6,
      new Field({
        cascadeDelete: false,
        collectionId: '_pb_users_auth_',
        hidden: false,
        id: 'relation2375276105',
        maxSelect: 1,
        minSelect: 0,
        name: 'user',
        presentable: false,
        required: false,
        system: false,
        type: 'relation'
      })
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3142635823')

    // remove field
    collection.fields.removeById('relation2375276105')

    return app.save(collection)
  }
)
