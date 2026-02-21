<template>
  <!-- Router 예제 부모 -->
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">
      <v-icon class="mr-2" color="success">mdi-routes</v-icon>
      Vue Router 예제
    </h1>

    <!-- 현재 라우트 정보 -->
    <SectionCard icon="mdi-information" title="현재 라우트 정보">
      <v-table density="compact">
        <tbody>
          <tr>
            <td class="font-weight-bold" style="width: 150px">Path</td>
            <td><code>{{ route.path }}</code></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Name</td>
            <td><code>{{ route.name || '(없음)' }}</code></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Params</td>
            <td><code>{{ JSON.stringify(route.params) }}</code></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Query</td>
            <td><code>{{ JSON.stringify(route.query) }}</code></td>
          </tr>
          <tr>
            <td class="font-weight-bold">Meta</td>
            <td><code>{{ JSON.stringify(route.meta) }}</code></td>
          </tr>
        </tbody>
      </v-table>
    </SectionCard>

    <!-- 라우트 예제 링크 -->
    <SectionCard icon="mdi-link-variant" title="라우트 이동">
      <v-row>
        <!-- 중첩 라우트 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4" variant="outlined">
            <h3 class="text-subtitle-1 font-weight-bold mb-3">
              <v-icon class="mr-1">mdi-file-tree</v-icon>
              중첩 라우트
            </h3>
            <div class="d-flex flex-column ga-2">
              <v-btn
                block
                color="primary"
                :to="{ name: 'nested-child1' }"
                variant="tonal"
              >
                자식 1
              </v-btn>
              <v-btn
                block
                color="primary"
                :to="{ name: 'nested-child2' }"
                variant="tonal"
              >
                자식 2
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <!-- 동적 라우트 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4" variant="outlined">
            <h3 class="text-subtitle-1 font-weight-bold mb-3">
              <v-icon class="mr-1">mdi-account-switch</v-icon>
              동적 라우트
            </h3>
            <div class="d-flex flex-column ga-2">
              <v-btn
                block
                color="secondary"
                :to="{ name: 'dynamic-user', params: { id: '1' } }"
                variant="tonal"
              >
                사용자 #1
              </v-btn>
              <v-btn
                block
                color="secondary"
                :to="{ name: 'dynamic-user', params: { id: '42' } }"
                variant="tonal"
              >
                사용자 #42
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <!-- 네비게이션 가드 -->
        <v-col cols="12" md="4">
          <v-card class="pa-4" variant="outlined">
            <h3 class="text-subtitle-1 font-weight-bold mb-3">
              <v-icon class="mr-1">mdi-shield-lock</v-icon>
              네비게이션 가드
            </h3>
            <div class="d-flex flex-column ga-2">
              <v-btn
                block
                color="warning"
                :to="{ name: 'guarded' }"
                variant="tonal"
              >
                보호된 페이지
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </SectionCard>

    <!-- 자식 라우트 출력 영역 -->
    <router-view />
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import SectionCard from '@/components/SectionCard.vue'

  const route = useRoute()
</script>
