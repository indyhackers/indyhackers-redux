/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2409499253")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": null,
    "updateRule": null
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2409499253")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != '' && @request.auth.id = user.id",
    "deleteRule": "@request.auth.id != '' && @request.auth.roles.name ?= 'admin'",
    "updateRule": "@request.auth.id = user.id && @request.auth.id = user.id"
  }, collection)

  return app.save(collection)
})
