/// <reference path="../data/types.d.ts" />

routerAdd("get", "/jobs_test.atom", (e) => {
  const template = $template.loadFiles(
    `${__hooks}/views/atom.html`,
  );


  let records = $app.findRecordsByFilter(
    "jobs",                                    // collection
    "", // filter
    "-created",                                   // sort
    20,                                            // limit
    0,                                             // offset
    { },                        // optional filter params
  )

  const entries = records.map((r) => ({
    title:   r.getString("title"),
    author:  r.getString("company"),
    link:    `https://indyhackers.org/posts/${r.id}`,
    id:      `tag:indyhackers.org,2025:post/${r.id}`,
    updated: new Date(r.getDateTime("created")).toISOString(),
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