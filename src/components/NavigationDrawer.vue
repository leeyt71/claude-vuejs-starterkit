<template>
  <!-- 좌측 네비게이션 드로어 -->
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <!-- 로고 영역 -->
    <v-list-item
      class="mb-2"
      prepend-avatar="@/assets/logo.svg"
      subtitle="v0.1.0"
      title="Vue Starter Kit"
    />

    <v-divider />

    <!-- 메뉴 목록 -->
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.to"
        exact
        :prepend-icon="item.icon"
        rounded="lg"
        :title="item.title"
        :to="item.to"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { useNavigation } from '@/composables/useNavigation'

  defineProps({
    modelValue: Boolean,
  })

  defineEmits(['update:modelValue'])

  const { menuItems } = useNavigation()
</script>
