<template>
  <!-- 상단 앱바 -->
  <v-app-bar
    density="comfortable"
    elevation="1"
  >
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

    <v-app-bar-title>
      <v-icon class="mr-2">mdi-vuejs</v-icon>
      Vue Starter Kit
    </v-app-bar-title>

    <template #append>
      <ThemeToggle />
      <v-btn
        href="https://github.com"
        icon
        target="_blank"
        variant="text"
      >
        <v-icon>mdi-github</v-icon>
        <v-tooltip activator="parent" location="bottom">
          GitHub
        </v-tooltip>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
  defineEmits(['toggle-drawer'])
</script>
