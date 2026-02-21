<template>
  <!-- 네비게이션 가드 예제 -->
  <SectionCard icon="mdi-shield-lock" title="네비게이션 가드 (Navigation Guard)">
    <v-alert class="mb-4" density="compact" type="info" variant="tonal">
      이 페이지는 <code>meta.requiresAuth</code> 플래그가 설정되어 있습니다.
      전역 가드(<code>beforeEach</code>)에서 인증 상태를 확인합니다.
    </v-alert>

    <!-- 인증 상태 표시 -->
    <v-card
      class="pa-4 mb-4"
      :color="isAuthenticated ? 'success' : 'warning'"
      variant="tonal"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-4" size="48">
          {{ isAuthenticated ? 'mdi-shield-check' : 'mdi-shield-alert' }}
        </v-icon>
        <div>
          <h3 class="text-h6">
            {{ isAuthenticated ? '인증됨' : '인증되지 않음' }}
          </h3>
          <p class="text-body-2">
            {{
              isAuthenticated
                ? '현재 로그인 상태입니다. 보호된 컨텐츠에 접근할 수 있습니다.'
                : '로그인이 필요합니다. 아래 버튼으로 인증 상태를 변경해보세요.'
            }}
          </p>
        </div>
      </div>
    </v-card>

    <!-- 인증 토글 -->
    <v-btn
      :color="isAuthenticated ? 'error' : 'success'"
      :prepend-icon="isAuthenticated ? 'mdi-logout' : 'mdi-login'"
      @click="toggleAuth"
    >
      {{ isAuthenticated ? '로그아웃' : '로그인' }}
    </v-btn>

    <!-- 보호된 컨텐츠 -->
    <v-expand-transition>
      <v-card v-if="isAuthenticated" class="mt-4 pa-4" color="success" variant="tonal">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">
          <v-icon class="mr-1">mdi-lock-open</v-icon>
          보호된 컨텐츠
        </h3>
        <p class="text-body-2">
          이 영역은 인증된 사용자만 볼 수 있습니다.
          실제 애플리케이션에서는 API 토큰 검증, 세션 확인 등의 로직이 들어갑니다.
        </p>
      </v-card>
    </v-expand-transition>

    <!-- 구현 설명 -->
    <v-card class="mt-4 pa-4" variant="outlined">
      <h3 class="text-subtitle-2 font-weight-bold mb-2">구현 방법</h3>
      <v-list density="compact">
        <v-list-item prepend-icon="mdi-numeric-1-circle">
          라우트 정의 시 <code>meta: {{ '{ requiresAuth: true }' }}</code> 설정
        </v-list-item>
        <v-list-item prepend-icon="mdi-numeric-2-circle">
          <code>router.beforeEach</code>에서 meta.requiresAuth 확인
        </v-list-item>
        <v-list-item prepend-icon="mdi-numeric-3-circle">
          <code>localStorage.getItem('isAuthenticated')</code>로 인증 상태 확인
        </v-list-item>
      </v-list>
    </v-card>
  </SectionCard>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import SectionCard from '@/components/SectionCard.vue'

  const isAuthenticated = ref(false)

  onMounted(() => {
    isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  })

  function toggleAuth () {
    isAuthenticated.value = !isAuthenticated.value
    localStorage.setItem('isAuthenticated', String(isAuthenticated.value))
  }
</script>
