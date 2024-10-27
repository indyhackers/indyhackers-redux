# CHANGELOG

## Initial Features

- pocketbase API for collections & records for all collections mocked up using msw which means you don't have to use pocketbase on the backend to do UI development
  - this makes automated unit/e2e testing a dream
- endpoint to grab a snapshot of all collections and the data inside of them
  - save this as `src/mocks/mocks.json` in the solution when the mocked data changes
- `Dockerfile` and `docker-compose.yaml` builds a complete docker image with pocketbase, migrations, hooks & the Vue UI
  - can store your local data in pb
  - can edit the schema live in the docker container locally which will auto-generate migrations (which when built into a docker image will apply schema changes going forward)
  - can edit mocked data locally in much the same way as well, just snapshot into `src/mocks/mocks.json` at the end
  - TBD: migration that applies mocked data to the DB locally if missing
- `jobs` controller will enable logged in users with the role of employer access to edit their own job postings
  - maybe this will cut down on the approval workflow, but we may want to keep it just in case
- `job` descriptions are edited using the `TipTapEditor` which has no buttons currently or context menus but has Medium style editing, and normal keyboard shortcuts work
- working on an OmniController to CRUD any collection record consistently (and allow you to set the insides custom)
- `users` are tied to records like job postings
- `users` can have multiple roles
- collection viewing is based off of `roles`, via PocketBase API rules -- e.g. a `job` can only be updated by the `employer` that created the record
- I created a OpenAI GPT Assistant to streamline the creation of further Vue controllers (will edit it to customize the OmniController based on wireframe (or existing website screenshots)
