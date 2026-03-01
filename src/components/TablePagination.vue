<template>
  <!-- 테이블 커스텀 페이지네이션: 페이지 크기 선택 + 페이지 번호 버튼 + 전체 건수 -->
  <div class="px-4 py-2">
    <!-- 1행: 페이지 크기 + 전체 건수 -->
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center ga-2">
        <span class="text-body-2 text-medium-emphasis text-no-wrap">페이지당 행:</span>
        <v-select
          :model-value="pageSize"
          density="compact"
          hide-details
          :items="pageSizeOptions"
          style="width: 90px"
          variant="outlined"
          @update:model-value="$emit('update:pageSize', $event)"
        />
      </div>
      <span class="text-body-2 text-medium-emphasis">총 {{ totalCount }}건</span>
    </div>

    <!-- 2행: 페이지 번호 네비게이션 (All이 아닌 경우만 표시) -->
    <div v-if="pageSize !== -1" class="d-flex justify-center align-center ga-1 mt-1">
      <!-- 첫 페이지 -->
      <v-btn
        density="compact"
        :disabled="page === 1"
        icon="mdi-page-first"
        variant="text"
        @click="$emit('update:page', 1)"
      />
      <!-- 이전 페이지 -->
      <v-btn
        density="compact"
        :disabled="page === 1"
        icon="mdi-chevron-left"
        variant="text"
        @click="$emit('update:page', page - 1)"
      />
      <!-- 페이지 번호 버튼 (최대 5개) -->
      <v-btn
        v-for="p in pageWindow"
        :key="p"
        :color="p === page ? 'primary' : undefined"
        density="compact"
        min-width="36"
        size="small"
        :variant="p === page ? 'flat' : 'text'"
        @click="$emit('update:page', p)"
      >
        {{ p }}
      </v-btn>
      <!-- 다음 페이지 -->
      <v-btn
        density="compact"
        :disabled="page === totalPages"
        icon="mdi-chevron-right"
        variant="text"
        @click="$emit('update:page', page + 1)"
      />
      <!-- 마지막 페이지 -->
      <v-btn
        density="compact"
        :disabled="page === totalPages"
        icon="mdi-page-last"
        variant="text"
        @click="$emit('update:page', totalPages)"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    page: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    totalCount: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    // 페이지 크기 옵션 (재정의 가능)
    pageSizeOptions: {
      type: Array,
      default: () => [
        { value: 3, title: '3' },
        { value: 5, title: '5' },
        { value: 10, title: '10' },
        { value: 20, title: '20' },
        { value: -1, title: 'All' },
      ],
    },
  })

  defineEmits(['update:page', 'update:pageSize'])

  // 표시할 페이지 번호 목록 (최대 5개, 현재 페이지를 중심으로 계산)
  const pageWindow = computed(() => {
    const { totalPages, page } = props
    const MAX = 5

    let start = Math.max(1, page - Math.floor(MAX / 2))
    let end = Math.min(totalPages, start + MAX - 1)

    // 끝이 total에 붙으면 시작을 앞으로 당겨 최대 5개 유지
    if (end - start < MAX - 1) {
      start = Math.max(1, end - MAX + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })
</script>
