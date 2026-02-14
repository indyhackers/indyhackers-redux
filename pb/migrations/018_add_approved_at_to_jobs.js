/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2409499253")

  // add approved_at date field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "date_approved_at",
    "name": "approved_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  app.save(collection)

  // backfill: set approved_at = created for existing approved jobs
  app.db().newQuery(
    "UPDATE jobs SET approved_at = created WHERE approved = true AND (approved_at IS NULL OR approved_at = '')"
  ).execute()
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2409499253")

  // remove approved_at field
  collection.fields.removeById("date_approved_at")

  return app.save(collection)
})
