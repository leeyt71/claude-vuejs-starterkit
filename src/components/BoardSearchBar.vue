<template>
  <!-- 게시판 검색바: 검색 타입 선택 + 검색어 입력 + 검색 버튼 -->
  <v-card variant="outlined">
    <v-card-text class="py-3">
      <v-row align="center" dense>
        <!-- 모바일: 전체 너비 / 데스크탑: 자동 너비 -->
        <v-col cols="12" sm="auto">
          <v-btn-toggle
            v-model="searchType"
            density="compact"
            mandatory
            variant="outlined"
          >
            <v-btn
              v-for="opt in searchTypeOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <!-- 검색어 입력 (남은 너비 차지) -->
        <v-col cols="12" sm="">
          <v-text-field
            v-model="searchText"
            clearable
            density="compact"
            hide-details
            placeholder="검색어를 입력하세요"
            prepend-inner-icon="mdi-magnify"
            @keyup.enter="onSearch"
          />
        </v-col>

        <!-- 검색 버튼: 모바일에서 전체 너비 -->
        <v-col cols="12" sm="auto">
          <v-btn
            :block="smAndDown"
            color="primary"
            @click="onSearch"
          >
            검색
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'

  const props = defineProps({
    // 검색 타입 옵션 목록 (재정의 가능)
    searchTypeOptions: {
      type: Array,
      default: () => [
        { value: 'title', label: '제목' },
        { value: 'content', label: '내용' },
        { value: 'all', label: '전체' },
      ],
    },
  })

  const emit = defineEmits(['search'])

  const { smAndDown } = useDisplay()

  const searchText = ref('')
  const searchType = ref(props.searchTypeOptions[0]?.value ?? 'title')

  // 검색 실행 → { searchType, keyword } 형태로 emit
  function onSearch () {
    emit('search', { searchType: searchType.value, keyword: searchText.value })
  }
</script>
