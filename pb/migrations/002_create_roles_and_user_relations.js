migrate(
  (app) => {
    // Create Roles Collection
    let rolesCollection = new Collection({
      type: 'base',
      name: 'roles',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text', required: false },
        { name: 'level', type: 'number', required: true, min: 0, max: 100, onlyInt: true }
      ],
      listRule: ''
    })

    app.save(rolesCollection)

    // Add Role Relation to Users Collection
    let usersCollection = app.findCollectionByNameOrId('users')
    usersCollection.fields.push(
      new RelationField({
        name: 'role',
        required: false,
        collectionId: rolesCollection.id,
        options: {
          cascadeDelete: false
        }
      })
    )
    usersCollection.fields.push(
      new JSONField({
        name: 'consents',
        required: false,
        default: {}
      })
    )
    usersCollection.fields.push(
      new BoolField({
        name: 'email_consent',
        required: false,
        default: false
      })
    )

    app.save(usersCollection)
  },
  (app) => {
    // Remove Role Relation, consents, and email_consent fields from Users Collection
    let usersCollection = app.findCollectionByNameOrId('users')
    usersCollection.fields = usersCollection.fields.filter(
      (field) =>
        field.name !== 'role' && field.name !== 'consents' && field.name !== 'email_consent'
    )
    app.save(usersCollection)

    // Delete Roles Collection
    let rolesCollection = app.findCollectionByNameOrId('roles')
    app.delete(rolesCollection)
  }
)
