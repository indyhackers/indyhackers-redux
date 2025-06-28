/// <reference path="../data/types.d.ts" />

routerAdd("get", "/jobs.atom", (e) => {
  const xml = $template.loadFiles(
    `${__hooks}/views/atom_layout.html`, `${__hooks}/views/atom.html`,
  ).render();

  return e.blob(200, 'application/atom+xml', xml)
})