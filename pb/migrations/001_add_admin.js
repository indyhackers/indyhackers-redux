// pb_migrations/1687801090_initial_admin.js
migrate(
  (app) => {
    const superusers = app.findCollectionByNameOrId('_superusers')
    const admin = new Record(superusers)

    // Set the admin details
    admin.set('email', 'admin@indyhackers.org')
    admin.set('password', 'go west, young hackie, hack the planet !')

    app.save(admin)
  },
  (app) => {
    try {
      const admin = app.findAuthRecordByEmail('_superusers', 'admin@indyhackers.org')
      app.delete(admin)
    } catch {
      // Silent errors (probably already deleted)
    }
  }
)
