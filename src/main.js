import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'
//import { BVToastPlugin } from 'bootstrap-vue'
//import { jQuery } from 'jQuery'
import PocketBase from 'pocketbase'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'popper.js/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import App from './App.vue'
import router from './router'

async function prepareApp() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mocks/browser')
  return worker.start()
}

let pbURL = 'http://127.0.0.1:8090'
if (import.meta.env.DEV) {
  pbURL = '/'
}
const pocketbase = new PocketBase(pbURL)
//const toaster = useToast()

const app = createApp(App)
app.config.globalProperties.pocketbase = pocketbase
//app.config.globalProperties.$bvToast = toaster

//window.jQuery = jQuery

app.use(createPinia())
app.use(createBootstrap())
//app.use(BVToastPlugin)
app.use(router)

prepareApp().then(() => {
  app.mount('#app')
})
