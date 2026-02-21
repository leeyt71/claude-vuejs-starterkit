// 앱 진입점
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import App from './App.vue'

// 폰트
import '@fontsource/roboto'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
