<template>
  <!-- Vuetify 컴포넌트 종합 예제 -->
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">
      <v-icon class="mr-2" color="primary">mdi-vuetify</v-icon>
      Vuetify 컴포넌트 예제
    </h1>

    <!-- 버튼 섹션 -->
    <SectionCard icon="mdi-gesture-tap-button" title="버튼 (Buttons)">
      <p class="text-body-2 text-medium-emphasis mb-4">
        다양한 variant와 크기의 버튼 예제입니다.
      </p>

      <h3 class="text-subtitle-2 mb-2">Variant</h3>
      <div class="d-flex flex-wrap ga-2 mb-4">
        <v-btn color="primary">기본 (Elevated)</v-btn>
        <v-btn color="primary" variant="flat">Flat</v-btn>
        <v-btn color="primary" variant="outlined">Outlined</v-btn>
        <v-btn color="primary" variant="tonal">Tonal</v-btn>
        <v-btn color="primary" variant="text">Text</v-btn>
        <v-btn color="primary" variant="plain">Plain</v-btn>
      </div>

      <h3 class="text-subtitle-2 mb-2">크기</h3>
      <div class="d-flex flex-wrap align-center ga-2 mb-4">
        <v-btn color="secondary" size="x-small">X-Small</v-btn>
        <v-btn color="secondary" size="small">Small</v-btn>
        <v-btn color="secondary">Default</v-btn>
        <v-btn color="secondary" size="large">Large</v-btn>
        <v-btn color="secondary" size="x-large">X-Large</v-btn>
      </div>

      <h3 class="text-subtitle-2 mb-2">아이콘 버튼</h3>
      <div class="d-flex flex-wrap ga-2">
        <v-btn color="error" icon="mdi-heart" variant="tonal" />
        <v-btn color="warning" icon="mdi-star" variant="tonal" />
        <v-btn color="info" icon="mdi-share" variant="tonal" />
        <v-btn color="success" prepend-icon="mdi-download">다운로드</v-btn>
        <v-btn append-icon="mdi-arrow-right" color="primary">다음</v-btn>
      </div>
    </SectionCard>

    <!-- 카드 섹션 -->
    <SectionCard icon="mdi-card-outline" title="카드 (Cards)">
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-img
              cover
              height="200"
              src="https://picsum.photos/seed/vuetify1/400/200"
            />
            <v-card-title>이미지 카드</v-card-title>
            <v-card-subtitle>카드에 이미지를 포함할 수 있습니다</v-card-subtitle>
            <v-card-text>
              v-img 컴포넌트를 사용하여 반응형 이미지를 표시합니다.
              cover, contain 등의 옵션을 지원합니다.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="text">자세히</v-btn>
              <v-spacer />
              <v-btn color="error" icon="mdi-heart" variant="text" />
              <v-btn icon="mdi-share-variant" variant="text" />
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card color="primary" theme="dark">
            <v-card-title>액션 카드</v-card-title>
            <v-card-text>
              색상과 테마를 적용한 카드입니다.
              다양한 색상과 스타일을 조합하여 사용할 수 있습니다.
            </v-card-text>
            <v-card-actions>
              <v-btn variant="outlined">확인</v-btn>
              <v-btn variant="text">취소</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </SectionCard>

    <!-- 다이얼로그 섹션 -->
    <SectionCard icon="mdi-window-maximize" title="다이얼로그 (Dialog)">
      <div class="d-flex flex-wrap ga-2">
        <v-btn color="primary" @click="basicDialog = true">
          기본 다이얼로그
        </v-btn>
        <v-btn color="warning" @click="confirmDialog = true">
          확인 다이얼로그
        </v-btn>
      </div>

      <!-- 기본 다이얼로그 -->
      <v-dialog v-model="basicDialog" max-width="500">
        <v-card>
          <v-card-title>기본 다이얼로그</v-card-title>
          <v-card-text>
            이것은 기본 다이얼로그 예제입니다.
            v-dialog 컴포넌트로 모달 창을 만들 수 있습니다.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="basicDialog = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 확인 다이얼로그 -->
      <v-dialog v-model="confirmDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h6">
            <v-icon class="mr-2" color="warning">mdi-alert</v-icon>
            확인
          </v-card-title>
          <v-card-text>
            이 작업을 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="confirmDialog = false">취소</v-btn>
            <v-btn
              color="warning"
              variant="flat"
              @click="onConfirm"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </SectionCard>

    <!-- 폼 섹션 -->
    <SectionCard icon="mdi-form-textbox" title="폼 (Form)">
      <v-form ref="formRef" v-model="formValid" @submit.prevent="onSubmitForm">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.name"
              label="이름"
              prepend-inner-icon="mdi-account"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              label="이메일"
              prepend-inner-icon="mdi-email"
              :rules="[rules.required, rules.email]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.role"
              :items="['개발자', '디자이너', '기획자', '관리자']"
              label="역할"
              prepend-inner-icon="mdi-badge-account"
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-radio-group v-model="form.gender" inline label="성별">
              <v-radio label="남성" value="male" />
              <v-radio label="여성" value="female" />
              <v-radio label="기타" value="other" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.bio"
              label="자기소개"
              prepend-inner-icon="mdi-text"
              rows="3"
            />
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="form.agree"
              label="이용약관에 동의합니다"
              :rules="[rules.agree]"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              :disabled="!formValid"
              type="submit"
            >
              제출
            </v-btn>
            <v-btn
              class="ml-2"
              variant="text"
              @click="resetForm"
            >
              초기화
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- 폼 제출 결과 알림 -->
      <v-snackbar v-model="formSnackbar" color="success" timeout="3000">
        폼이 성공적으로 제출되었습니다!
      </v-snackbar>
    </SectionCard>

    <!-- 테이블 섹션 -->
    <SectionCard icon="mdi-table" title="데이터 테이블 (Data Table)">
      <v-text-field
        v-model="tableSearch"
        class="mb-4"
        hide-details
        label="검색"
        prepend-inner-icon="mdi-magnify"
        single-line
      />
      <v-data-table
        :headers="tableHeaders"
        :items="tableItems"
        items-per-page="5"
        :search="tableSearch"
      >
        <template #item.status="{ item }">
          <v-chip
            :color="item.status === '활성' ? 'success' : 'error'"
            size="small"
          >
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </SectionCard>

    <!-- 알림 섹션 -->
    <SectionCard icon="mdi-alert-circle" title="알림 (Alerts)">
      <div class="d-flex flex-column ga-3">
        <v-alert closable type="success" variant="tonal">
          성공! 작업이 완료되었습니다.
        </v-alert>
        <v-alert closable type="info" variant="tonal">
          안내: 새로운 업데이트가 있습니다.
        </v-alert>
        <v-alert closable type="warning" variant="tonal">
          경고: 저장하지 않은 변경 사항이 있습니다.
        </v-alert>
        <v-alert closable type="error" variant="tonal">
          오류: 요청을 처리할 수 없습니다.
        </v-alert>
      </div>
    </SectionCard>

    <!-- 칩 & 탭 섹션 -->
    <SectionCard icon="mdi-label" title="칩 & 탭 (Chips & Tabs)">
      <h3 class="text-subtitle-2 mb-2">칩</h3>
      <div class="d-flex flex-wrap ga-2 mb-6">
        <v-chip>기본</v-chip>
        <v-chip color="primary">Primary</v-chip>
        <v-chip color="success" prepend-icon="mdi-check">완료</v-chip>
        <v-chip closable color="error">삭제 가능</v-chip>
        <v-chip color="info" variant="outlined">Outlined</v-chip>
        <v-chip color="warning" label>Label</v-chip>
      </div>

      <h3 class="text-subtitle-2 mb-2">탭</h3>
      <v-card>
        <v-tabs v-model="currentTab" color="primary">
          <v-tab value="tab1">탭 1</v-tab>
          <v-tab value="tab2">탭 2</v-tab>
          <v-tab value="tab3">탭 3</v-tab>
        </v-tabs>
        <v-card-text>
          <v-tabs-window v-model="currentTab">
            <v-tabs-window-item value="tab1">
              <p>첫 번째 탭의 내용입니다. v-tabs와 v-tabs-window를 조합하여 탭 UI를 구현합니다.</p>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab2">
              <p>두 번째 탭의 내용입니다. 각 탭은 독립적인 컨텐츠를 가질 수 있습니다.</p>
            </v-tabs-window-item>
            <v-tabs-window-item value="tab3">
              <p>세 번째 탭의 내용입니다. 탭 전환 시 애니메이션이 적용됩니다.</p>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </SectionCard>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import SectionCard from '@/components/SectionCard.vue'

  // 다이얼로그
  const basicDialog = ref(false)
  const confirmDialog = ref(false)

  function onConfirm () {
    confirmDialog.value = false
  }

  // 폼
  const formRef = ref(null)
  const formValid = ref(false)
  const formSnackbar = ref(false)
  const form = ref({
    name: '',
    email: '',
    role: null,
    gender: null,
    bio: '',
    agree: false,
  })

  const rules = {
    required: v => !!v || '필수 입력 항목입니다',
    email: v => /.+@.+\..+/.test(v) || '유효한 이메일을 입력하세요',
    agree: v => v === true || '이용약관에 동의해야 합니다',
  }

  function onSubmitForm () {
    if (formValid.value) {
      formSnackbar.value = true
    }
  }

  function resetForm () {
    formRef.value?.reset()
  }

  // 테이블
  const tableSearch = ref('')
  const tableHeaders = [
    { title: 'ID', key: 'id', sortable: true },
    { title: '이름', key: 'name', sortable: true },
    { title: '이메일', key: 'email' },
    { title: '역할', key: 'role' },
    { title: '상태', key: 'status' },
  ]
  const tableItems = ref([
    { id: 1, name: '김철수', email: 'kim@example.com', role: '개발자', status: '활성' },
    { id: 2, name: '이영희', email: 'lee@example.com', role: '디자이너', status: '활성' },
    { id: 3, name: '박민수', email: 'park@example.com', role: '기획자', status: '비활성' },
    { id: 4, name: '정수진', email: 'jung@example.com', role: '관리자', status: '활성' },
    { id: 5, name: '최동현', email: 'choi@example.com', role: '개발자', status: '활성' },
    { id: 6, name: '강서연', email: 'kang@example.com', role: '디자이너', status: '비활성' },
    { id: 7, name: '윤재호', email: 'yoon@example.com', role: '개발자', status: '활성' },
    { id: 8, name: '한미래', email: 'han@example.com', role: '기획자', status: '활성' },
  ])

  // 탭
  const currentTab = ref('tab1')
</script>
