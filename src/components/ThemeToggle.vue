<template>
  <!-- 다크/라이트 테마 토글 버튼 -->
  <v-btn
    icon
    variant="text"
    @click="toggleTheme"
  >
    <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    <v-tooltip activator="parent" location="bottom">
      {{ isDark ? '라이트 모드' : '다크 모드' }}
    </v-tooltip>
  </v-btn>
</template>

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  const isDark = computed(() => theme.global.current.value.dark)

  function toggleTheme () {
    theme.global.name.value = isDark.value ? 'light' : 'dark'
  }
</script>
