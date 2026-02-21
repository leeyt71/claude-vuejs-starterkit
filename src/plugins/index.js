import router from '@/router'
import pinia from '@/stores'
// 플러그인 통합 등록
import vuetify from './vuetify'

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(pinia)
  app.use(router)
}
