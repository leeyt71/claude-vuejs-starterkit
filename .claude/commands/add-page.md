---
description: '새 페이지(View) 생성, 라우터 등록, 네비게이션 메뉴 추가를 한 번에 처리합니다'
allowed-tools:
  [
    'Read',
    'Write',
    'Edit',
    'Glob',
    'Bash(ls:*)',
  ]
argument-hint: [페이지이름(PascalCase), URL경로, 페이지타이틀, 메뉴아이콘(선택)]
model: sonnet
---

아래 파라미터로 새 페이지를 추가하세요.

- 페이지 이름 (PascalCase): $0 → 파일명: `$0View.vue`
- URL 경로: $1 → `/$1`
- 페이지 타이틀 (한국어): $2
- 메뉴 아이콘 (MDI 아이콘명): $3 → 비어있으면 네비게이션 메뉴에 추가하지 않음

## 처리 순서

### 1단계 — 기존 파일 확인

`src/views/$0View.vue`가 이미 존재하는지 확인하세요.
이미 존재하면 덮어쓰지 말고 사용자에게 알리고 중단하세요.

### 2단계 — `src/views/$0View.vue` 생성

아래 구조를 기반으로 생성하세요:
- `<script setup>` + Composition API (2칸 들여쓰기)
- Vuetify 컴포넌트 사용 (`v-row`, `v-col`, `v-card`)
- 페이지 상단에 타이틀(`$2`) 표시
- 한국어 주석 포함

```vue
<template>
  <!-- $2 페이지 -->
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h5 font-weight-bold mb-4">$2</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            $2 페이지입니다.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  // $2 페이지 로직
</script>
```

### 3단계 — `src/router/index.js` 라우트 추가

`src/router/index.js`를 읽고, DefaultLayout children 배열의 **마지막 항목 뒤**에 아래 라우트를 추가하세요:

```js
{
  path: '$1',
  name: '$1',
  component: () => import('@/views/$0View.vue'),
  meta: { title: '$2' },
},
```

### 4단계 — 네비게이션 메뉴 추가 (조건부)

`$3`이 입력된 경우에만 `src/composables/useNavigation.js`를 읽고,
menuItems 배열의 **마지막 항목 뒤**에 아래 항목을 추가하세요:

```js
{
  title: '$2',
  icon: '$3',
  to: '/$1',
},
```

`$3`이 비어있으면 이 단계는 건너뜁니다.

## 완료 후 안내

처리된 내용을 아래 형식으로 요약해주세요:

```
✅ 페이지 추가 완료

파일 생성: src/views/$0View.vue
라우터 등록: /$1 (name: '$1')
메뉴 추가: [추가됨 / 건너뜀 (아이콘 미입력)]
```
