/// <reference path="../pb_data/types.d.ts" />

onRecordEnrich((e) => {
    // hide name and email fields
    e.record.hide('name', 'email')

    e.next()
}, "jobs")