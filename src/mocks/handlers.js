import { http, HttpResponse } from 'msw'

import * as mocks from './mocks.json'

export const handlers = [
  http.get('/api/collections', ({}) => {
    const paginated = {
      page: 1,
      perPage: 100,
      totalItems: Object.keys(mocks).length,
      totalPages: 1,
      items: mocks.map((c) => c.collection)
    }
    return HttpResponse.json(paginated)
  }),
  http.get('/api/collections/:collection', ({ params }) => {
    const { collection_name } = params

    const collection = mocks[collection_name].collection
    return HttpResponse.json(collection)
  }),
  http.get('/api/collections/:collection/records', ({ params }) => {
    const { collection } = params

    const paginated = {
      page: 1,
      perPage: 100,
      totalItems: mocks[collection].items.length,
      totalPages: 1,
      items: mocks[collection].items
    }
    return HttpResponse.json(paginated)
  }),
  http.get('/api/collections/:collection/records/:id', ({ params }) => {
    const { collection, id } = params
    console.log('hi')
    return HttpResponse.json(mocks[collection].items.find((el) => el.id === id))
  }),
  http.post('/api/collections/:collection/records', async ({ params, request }) => {
    const { collection } = params

    let body = await request.text()
    let newRecord = JSON.parse(body)

    mocks[collection].items.push(newRecord)
    return HttpResponse.json(newRecord)
  }),
  http.patch('/api/collections/:collection/records/:id', async ({ params, request }) => {
    const { collection, id } = params

    let body = await request.text()
    let recordUpdate = JSON.parse(body)

    let recordToUpdate = mocks[collection].items.find((el) => el.id === id)
    //merge fields of recordUpdate and recordToUpdate

    if (recordToUpdate) {
      // Merge fields of recordUpdate and recordToUpdate
      let updatedRecord = { ...recordToUpdate, ...recordUpdate }

      // Update the entry in mocks (assuming you want to save the updated record)
      let recordIndex = mocks[collection].items.findIndex((el) => el.id === id)
      mocks[collection].items[recordIndex] = updatedRecord

      return HttpResponse.json(updatedRecord)
    } else {
      return HttpResponse.json({ error: 'Record not found' }, { status: 404 })
    }
  })
]
