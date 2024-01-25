import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from './Store'

createApp(App).use(pinia).mount('#app')
