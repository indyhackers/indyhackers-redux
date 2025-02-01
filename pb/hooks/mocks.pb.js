/// <reference path="../pb_data/types.d.ts" />

$app.rootCmd.addCommand(
  new Command({
    use: 'apply-mocks',
    run: async (cmd, args) => {
      const mocks = require(`${__hooks}/mocks.js`)
      mocks.applyMocks()
    }
  })
)

$app.rootCmd.addCommand(
  new Command({
    use: 'export-mocks',
    run: async (cmd, args) => {
      const mocks = require(`${__hooks}/mocks.js`)
      const snapshot = mocks.exportMocks()
      console.log(toString(snapshot))
    }
  })
)
