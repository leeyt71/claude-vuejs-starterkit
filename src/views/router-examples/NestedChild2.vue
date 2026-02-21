<template>
  <!-- 중첩 라우트 자식 2 -->
  <div>
    <h3 class="text-h6 mb-2">
      <v-icon class="mr-1" color="secondary">mdi-numeric-2-circle</v-icon>
      자식 라우트 2
    </h3>
    <p class="text-body-2">
      이 컴포넌트는 <code>/router/nested/child2</code> 경로에 매핑됩니다.
      같은 부모 레이아웃(탭 네비게이션)을 공유하면서 다른 내용을 표시합니다.
    </p>
    <v-chip class="mt-2" color="secondary">
      NestedChild2.vue
    </v-chip>
  </div>
</template>
