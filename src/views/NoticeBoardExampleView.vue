<template>
  <!-- 게시판예제 페이지 -->
  <div>
    <!-- 게시글 목록 뷰 -->
    <template v-if="!selectedPost">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h5 font-weight-bold mb-4">
            <v-icon class="mr-2" color="primary">mdi-clipboard-text</v-icon>
            게시판예제
          </h1>
        </v-col>
      </v-row>

      <!-- 검색 영역 -->
      <v-row class="mb-2">
        <v-col cols="12">
          <BoardSearchBar @search="onSearch" />
        </v-col>
      </v-row>

      <!-- 게시글 테이블 (서비스 함수가 페이지네이션을 처리하므로 server 모드 사용) -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-data-table-server
              v-model:page="page"
              v-model:items-per-page="pageSize"
              v-model:sort-by="sortBy"
              :headers="headers"
              :items="pagedResult.items"
              :items-length="pagedResult.totalCount"
              hide-default-footer
              :no-data-text="appliedSearchText ? '검색 결과가 없습니다.' : '게시글이 없습니다.'"
              :row-props="() => ({ style: 'cursor: pointer' })"
              @click:row="(_, { item }) => selectPost(item)"
            />

            <v-divider />

            <!-- 커스텀 페이지네이션 푸터 -->
            <TablePagination
              v-model:page="page"
              v-model:page-size="pageSize"
              :total-count="pagedResult.totalCount"
              :total-pages="pagedResult.totalPages"
            />
          </v-card>
        </v-col>
      </v-row>
    </template>

    <!-- 게시글 상세 뷰 -->
    <template v-else>
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center mb-4">
            <v-btn
              class="mr-3"
              icon="mdi-arrow-left"
              variant="text"
              @click="goBack"
            />
            <h1 class="text-h5 font-weight-bold">게시글 상세</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="text-h6 pa-5 pb-3">
              {{ selectedPost.title }}
            </v-card-title>
            <v-card-subtitle class="d-flex flex-wrap ga-3 px-5 pb-3">
              <span>작성자: {{ selectedPost.author }}</span>
              <span>작성일: {{ selectedPost.date }}</span>
              <span>조회수: {{ selectedPost.views }}</span>
            </v-card-subtitle>
            <v-divider />
            <v-card-text class="pa-5">
              <p>{{ selectedPost.content }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            prepend-icon="mdi-arrow-left"
            variant="outlined"
            @click="goBack"
          >
            목록으로
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script setup>
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useRoute, useRouter } from 'vue-router'
  import { fetchPosts, findPostById } from '@/services/boardService'

  const route = useRoute()
  const router = useRouter()
  const { smAndDown } = useDisplay()

  // 페이지 크기 (TablePagination과 v-model:pageSize로 양방향 바인딩)
  const pageSize = ref(10)

  // 전체 테이블 헤더 정의
  const allHeaders = [
    { title: '번호', key: 'id', width: '70px', sortable: true },
    { title: '제목', key: 'title', sortable: true },
    { title: '작성자', key: 'author', width: '100px', sortable: true },
    { title: '작성일', key: 'date', width: '110px', sortable: true },
    { title: '조회수', key: 'views', width: '80px', sortable: true },
  ]

  // 모바일에서는 제목·작성일만 표시
  const headers = computed(() =>
    smAndDown.value
      ? allHeaders.filter(h => ['title', 'date'].includes(h.key))
      : allHeaders
  )

  // 실제 서비스 호출에 사용되는 검색 상태 (BoardSearchBar @search 이벤트로 반영)
  const appliedSearchText = ref('')
  const appliedSearchType = ref('title')

  // 정렬 상태 (v-data-table-server v-model:sort-by 형식: [{ key, order }])
  const sortBy = ref([])

  // BoardSearchBar @search 이벤트 핸들러
  function onSearch ({ searchType, keyword }) {
    appliedSearchType.value = searchType
    appliedSearchText.value = keyword
    page.value = 1
  }

  // 현재 페이지 (URL 쿼리 ?page= 기반으로 유지)
  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (newPage) => {
      router.replace({
        query: {
          ...route.query,
          page: newPage > 1 ? newPage : undefined,
        },
      })
    },
  })

  // 정렬 또는 페이지 크기 변경 시 1페이지로 리셋
  watch([sortBy, pageSize], () => {
    page.value = 1
  })

  // 서비스 함수 호출 → 현재 페이지 항목 + 전체 건수 반환
  const pagedResult = computed(() => fetchPosts({
    searchType: appliedSearchType.value,
    keyword: appliedSearchText.value,
    page: page.value,
    pageSize: pageSize.value,
    sortKey: sortBy.value[0]?.key ?? 'id',
    sortOrder: sortBy.value[0]?.order ?? 'desc',
  }))

  // 쿼리 파라미터 ?id= 기반으로 선택된 게시글 결정 (브라우저 뒤로가기 지원)
  const selectedPost = computed(() => {
    const id = Number(route.query.id)
    return id ? findPostById(id) : null
  })

  // 게시글 선택 → URL에 id 추가 (현재 페이지 번호 유지)
  function selectPost (post) {
    router.push({ query: { ...route.query, id: post.id } })
  }

  // 목록으로 돌아가기 (브라우저 뒤로가기와 동일 동작 → 페이지 번호 자동 복원)
  function goBack () {
    router.back()
  }

  // 백스페이스 키: 상세 뷰에서 목록으로 전환 (입력 필드 제외)
  function onKeydown (event) {
    if (event.key !== 'Backspace' || !selectedPost.value) return
    const tag = document.activeElement?.tagName
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
      goBack()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
