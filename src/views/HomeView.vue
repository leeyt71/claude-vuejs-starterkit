<template>
  <!-- 홈 대시보드 -->
  <div>
    <!-- 환영 메시지 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">
          <v-icon class="mr-2" color="primary">mdi-vuejs</v-icon>
          Vue.js Starter Kit
        </h1>
        <p class="text-body-1 text-medium-emphasis">
          빠른 웹 애플리케이션 프로토타이핑을 위한 스타터 킷입니다.
          아래 기술 스택을 활용하여 바로 개발을 시작하세요.
        </p>
      </v-col>
    </v-row>

    <!-- 기술 스택 카드 -->
    <v-row>
      <v-col
        v-for="tech in techStack"
        :key="tech.title"
        cols="12"
        md="3"
        sm="6"
      >
        <v-card
          class="pa-4 text-center"
          height="100%"
          hover
          :to="tech.to"
        >
          <v-icon
            class="mb-3"
            :color="tech.color"
            size="48"
          >
            {{ tech.icon }}
          </v-icon>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ tech.title }}
          </v-card-title>
          <v-card-subtitle>{{ tech.version }}</v-card-subtitle>
          <v-card-text class="text-body-2">
            {{ tech.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 시작하기 안내 -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-rocket-launch</v-icon>
            시작하기
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(step, i) in gettingStarted"
                :key="i"
                :prepend-icon="step.icon"
              >
                <v-list-item-title>{{ step.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ step.desc }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기술 스택 정보
  const techStack = ref([
    {
      title: 'Vue 3',
      version: 'v3.5+',
      icon: 'mdi-vuejs',
      color: '#41B883',
      description: 'Composition API와 <script setup>을 활용한 반응형 UI 프레임워크',
      to: undefined,
    },
    {
      title: 'Vuetify 3',
      version: 'v3.8+',
      icon: 'mdi-vuetify',
      color: '#1867C0',
      description: 'Material Design 3 기반의 풍부한 UI 컴포넌트 라이브러리',
      to: '/vuetify',
    },
    {
      title: 'Pinia',
      version: 'v3.0+',
      icon: 'mdi-fruit-pineapple',
      color: '#F4C542',
      description: 'Vue 공식 상태관리 라이브러리 (Setup Store & Options Store)',
      to: '/pinia',
    },
    {
      title: 'Vue Router',
      version: 'v4.5+',
      icon: 'mdi-routes',
      color: '#42B883',
      description: '중첩 라우트, 동적 라우트, 네비게이션 가드 지원',
      to: '/router',
    },
  ])

  // 시작하기 단계
  const gettingStarted = ref([
    {
      icon: 'mdi-folder-open',
      title: '프로젝트 구조 확인',
      desc: 'src/ 디렉토리의 views, components, stores, router 구조를 살펴보세요',
    },
    {
      icon: 'mdi-palette',
      title: '테마 커스터마이징',
      desc: 'src/plugins/vuetify.js에서 테마 색상을 변경할 수 있습니다',
    },
    {
      icon: 'mdi-file-document-plus',
      title: '새 페이지 추가',
      desc: 'views/에 컴포넌트를 만들고 router/index.js에 라우트를 등록하세요',
    },
    {
      icon: 'mdi-database',
      title: '상태 관리',
      desc: 'stores/에 Pinia 스토어를 추가하여 전역 상태를 관리하세요',
    },
  ])
</script>
