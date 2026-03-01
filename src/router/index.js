// 라우터 설정
import { createRouter, createWebHistory } from 'vue-router'
import { getAuthState } from '@/utils/crypto'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '홈' },
      },
      {
        path: 'vuetify',
        name: 'vuetify-example',
        component: () => import('@/views/VuetifyExampleView.vue'),
        meta: { title: 'Vuetify 예제' },
      },
      {
        path: 'pinia',
        name: 'pinia-example',
        component: () => import('@/views/PiniaExampleView.vue'),
        meta: { title: 'Pinia 예제' },
      },
      {
        path: 'router',
        name: 'router-example',
        component: () => import('@/views/RouterExampleView.vue'),
        meta: { title: 'Router 예제' },
        children: [
          {
            path: 'nested',
            component: () => import('@/views/router-examples/NestedParent.vue'),
            children: [
              {
                path: 'child1',
                name: 'nested-child1',
                component: () => import('@/views/router-examples/NestedChild1.vue'),
                meta: { title: '중첩 라우트 - 자식 1' },
              },
              {
                path: 'child2',
                name: 'nested-child2',
                component: () => import('@/views/router-examples/NestedChild2.vue'),
                meta: { title: '중첩 라우트 - 자식 2' },
              },
            ],
          },
          {
            path: 'user/:id',
            name: 'dynamic-user',
            component: () => import('@/views/router-examples/DynamicUser.vue'),
            props: true,
            meta: { title: '동적 라우트' },
          },
          {
            path: 'guarded',
            name: 'guarded',
            component: () => import('@/views/router-examples/GuardedView.vue'),
            meta: { title: '가드 예제', requiresAuth: true },
          },
        ],
      },
      {
        path: 'board',
        name: 'board',
        component: () => import('@/views/NoticeBoardExampleView.vue'),
        meta: { title: '게시판예제' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 전역 네비게이션 가드
router.beforeEach(async (to, _from, next) => {
  // 페이지 타이틀 업데이트
  document.title = to.meta.title
    ? `${to.meta.title} | Vue Starter Kit`
    : 'Vue Starter Kit'

  // 인증이 필요한 페이지 체크
  if (to.meta.requiresAuth) {
    const isAuthenticated = await getAuthState()
    if (!isAuthenticated) {
      // 인증되지 않으면 라우트는 허용하되, 컴포넌트에서 안내 표시
      next()
      return
    }
  }

  next()
})

export default router
