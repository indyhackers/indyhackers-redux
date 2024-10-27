/// <reference path="../pb_data/types.d.ts" />

onAfterBootstrap((e) => {
  const mocks = require(`${__hooks}/mocks.js`)
  const nodeEnv = $os.getenv('NODE_ENV')

  if (nodeEnv === 'development') {
    const hooksDir = '/pb_hooks'
    var hookFiles = $os.readDir(hooksDir).map((x) => x.toString().replace('- ', ''))
    var devFiles = hookFiles.filter((x) => x.toString().match(/\.dev$/))

    if (devFiles.length > 0) {
      console.log('Transmogrifying dev hooks')
      const out = $os.cmd('cp', '/mocks.json', '/pb_hooks/mocks.json')
      console.log(toString(out.combinedOutput()))
    }

    mocks.applyMocks()
  }
})
