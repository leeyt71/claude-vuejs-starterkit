<template>
  <!-- 기본 레이아웃: 앱바 + 드로어 + 메인 컨텐츠 + 푸터 -->
  <AppBar @toggle-drawer="drawer = !drawer" />

  <NavigationDrawer v-model="drawer" />

  <v-main>
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main>

  <AppFooter />
</template>

<script setup>
  import { ref } from 'vue'

  const drawer = ref(true)
</script>
