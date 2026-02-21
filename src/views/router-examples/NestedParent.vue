<template>
  <!-- 중첩 라우트 부모 -->
  <SectionCard icon="mdi-file-tree" title="중첩 라우트 (Nested Routes)">
    <v-alert class="mb-4" density="compact" type="info" variant="tonal">
      부모 라우트 안에 자식 라우트를 정의하여 레이아웃을 공유할 수 있습니다.
      현재 경로: <code>{{ $route.path }}</code>
    </v-alert>

    <v-tabs class="mb-4" color="primary">
      <v-tab :to="{ name: 'nested-child1' }">자식 1</v-tab>
      <v-tab :to="{ name: 'nested-child2' }">자식 2</v-tab>
    </v-tabs>

    <!-- 자식 라우트 표시 영역 -->
    <v-sheet class="pa-4 bg-surface-light" rounded="lg">
      <router-view />
    </v-sheet>
  </SectionCard>
</template>

<script setup>
  import SectionCard from '@/components/SectionCard.vue'
</script>
