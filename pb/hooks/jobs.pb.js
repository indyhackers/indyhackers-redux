/// <reference path="../pb_data/types.d.ts" />

onRecordEnrich((e) => {
    // hide name and email fields
    e.record.hide('name', 'email')

    e.next()
}, "jobs")

onRecordUpdate((e) => {
    const wasApproved = e.record.original().getBool("approved")
    const isApproved = e.record.getBool("approved")

    if (!wasApproved && isApproved) {
        // approved just flipped to true — stamp the time
        e.record.set("approved_at", new Date().toISOString())
    } else if (wasApproved && !isApproved) {
        // approved flipped back to false — clear the timestamp
        e.record.set("approved_at", "")
    }

    e.next()
}, "jobs")