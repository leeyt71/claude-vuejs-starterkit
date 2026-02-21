// 네비게이션 메뉴 데이터
import { ref } from 'vue'

export function useNavigation () {
  const menuItems = ref([
    {
      title: '홈',
      icon: 'mdi-home',
      to: '/',
    },
    {
      title: 'Vuetify 예제',
      icon: 'mdi-vuetify',
      to: '/vuetify',
    },
    {
      title: 'Pinia 예제',
      icon: 'mdi-fruit-pineapple',
      to: '/pinia',
    },
    {
      title: 'Router 예제',
      icon: 'mdi-routes',
      to: '/router',
    },
  ])

  return { menuItems }
}
