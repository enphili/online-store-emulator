import { createApp } from 'vue'
import App from './App.vue'
import notification from '@/plugins/notification/notification'
import router from './router'
import store from './store'
import './assets/css/style.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(notification)
app.mount('#app')
