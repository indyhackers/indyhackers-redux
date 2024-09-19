/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId('jobs')

    collection.listRule = ''
    collection.viewRule = ''
    collection.createRule = "@request.auth.id != '' && @request.auth.id = user.id"
    collection.updateRule = '@request.auth.id = user.id && @request.auth.id = user.id'
    collection.deleteRule = "@request.auth.id != '' && @request.auth.roles.name ?= 'admin'"

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: '6roz2bhz',
        name: 'salary_max',
        type: 'number',
        required: true,
        presentable: false,
        unique: false,
        options: {
          min: 1,
          max: 1000,
          noDecimal: false
        }
      })
    )

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: 'fcysx7o7',
        name: 'approved',
        type: 'bool',
        required: false,
        presentable: false,
        unique: false,
        options: {}
      })
    )

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: 'm98fccc3',
        name: 'salary_min',
        type: 'number',
        required: true,
        presentable: false,
        unique: false,
        options: {
          min: 1,
          max: 1000,
          noDecimal: false
        }
      })
    )

    return dao.saveCollection(collection)
  },
  (db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId('jobs')

    collection.listRule = null
    collection.viewRule = null
    collection.createRule = null
    collection.updateRule = null

    // remove
    collection.schema.removeField('6roz2bhz')

    // remove
    collection.schema.removeField('fcysx7o7')

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: 'm98fccc3',
        name: 'salary',
        type: 'number',
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: null,
          max: null,
          noDecimal: false
        }
      })
    )

    return dao.saveCollection(collection)
  }
)
