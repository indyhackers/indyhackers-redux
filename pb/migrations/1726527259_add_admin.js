// pb_migrations/1687801090_initial_admin.js
migrate(
  (db) => {
    const dao = new Dao(db)

    const admin = new Admin()
    admin.email = 'admin@indyhackers.org'
    admin.setPassword('go west, young hackie, hack the planet !')

    dao.saveAdmin(admin)
  },
  (db) => {
    // optional revert
    const dao = new Dao(db)

    try {
      const admin = dao.findAdminByEmail('admin@indyhackers.org')

      dao.deleteAdmin(admin)
    } catch (_) {
      /* most likely already deleted */
    }
  }
)
