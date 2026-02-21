<template>
  <!-- 중첩 라우트 자식 1 -->
  <div>
    <h3 class="text-h6 mb-2">
      <v-icon class="mr-1" color="primary">mdi-numeric-1-circle</v-icon>
      자식 라우트 1
    </h3>
    <p class="text-body-2">
      이 컴포넌트는 <code>/router/nested/child1</code> 경로에 매핑됩니다.
      부모 컴포넌트(NestedParent)의 <code>&lt;router-view /&gt;</code> 영역에 렌더링됩니다.
    </p>
    <v-chip class="mt-2" color="primary">
      NestedChild1.vue
    </v-chip>
  </div>
</template>
