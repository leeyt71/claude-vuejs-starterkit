<template>
  <!-- 섹션 카드: 예제 페이지에서 공통 사용 -->
  <v-card class="mb-6">
    <v-card-title>
      <v-icon v-if="icon" class="mr-2">{{ icon }}</v-icon>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    title: { type: String, required: true },
    icon: { type: String, default: undefined },
  })
</script>
