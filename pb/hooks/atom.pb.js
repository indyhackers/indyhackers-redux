/// <reference path="../data/types.d.ts" />

routerAdd("get", "/jobs_test.atom", (e) => {
  const template = $template.loadFiles(
    `${__hooks}/views/atom.html`,
  );


  const cutoff = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()

  let records = $app.findRecordsByFilter(
    "jobs",                                    // collection
    'approved = true && approved_at != "" && approved_at >= {:cutoff}', // filter
    "-approved_at",                            // sort
    20,                                        // limit
    0,                                         // offset
    { cutoff },                                // filter params
  )

  const entries = records.map((r) => ({
    title:   r.getString("title"),
    author:  r.getString("company"),
    link:    `https://indyhackers.org/posts/${r.id}`,
    id:      `tag:indyhackers.org,2025:post/${r.id}`,
    updated: new Date(r.getDateTime("approved_at")).toISOString(),
    summary: r.getString("description") || "",
  }));

  const xml = template.render({
    title:   "IndyHackers Job Board Atom Feed",
    updated: new Date().toISOString(),
    feedID:  "https://indyhackers.org/",
    entries
  });

  // 6) respond as Atom XML
  return e
    .blob(200, "application/atom+xml; charset=utf-8", xml)

});