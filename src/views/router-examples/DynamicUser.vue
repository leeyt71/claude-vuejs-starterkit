<template>
  <!-- 동적 라우트: /router/user/:id -->
  <SectionCard icon="mdi-account-switch" title="동적 라우트 (Dynamic Route)">
    <v-alert class="mb-4" density="compact" type="info" variant="tonal">
      URL 파라미터를 통해 동적으로 데이터를 표시합니다.
      <code>props: true</code> 옵션으로 라우트 파라미터가 컴포넌트 props로 전달됩니다.
    </v-alert>

    <v-card class="pa-4" variant="outlined">
      <div class="d-flex align-center mb-4">
        <v-avatar class="mr-4" color="primary" size="64">
          <span class="text-h5">{{ id }}</span>
        </v-avatar>
        <div>
          <h3 class="text-h6">사용자 #{{ id }}</h3>
          <p class="text-body-2 text-medium-emphasis">
            동적 파라미터: <code>:id = {{ id }}</code>
          </p>
        </div>
      </div>

      <v-table density="compact">
        <tbody>
          <tr>
            <td class="font-weight-bold">사용자 ID (props)</td>
            <td>{{ id }}</td>
          </tr>
          <tr>
            <td class="font-weight-bold">라우트 경로</td>
            <td><code>/router/user/{{ id }}</code></td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- 다른 사용자로 이동 -->
    <div class="mt-4">
      <span class="text-body-2 mr-2">다른 사용자 보기:</span>
      <v-btn
        v-for="userId in [1, 2, 42, 100]"
        :key="userId"
        class="mr-2"
        size="small"
        :to="{ name: 'dynamic-user', params: { id: String(userId) } }"
        variant="tonal"
      >
        #{{ userId }}
      </v-btn>
    </div>
  </SectionCard>
</template>

<script setup>
  import SectionCard from '@/components/SectionCard.vue'

  // props: true 옵션에 의해 라우트 파라미터가 props로 전달됨
  defineProps({
    id: { type: String, required: true },
  })
</script>
