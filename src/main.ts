import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'

import useMock from './mock'

useMock()

const app = createApp(App)
app.use(router).mount('#app')
