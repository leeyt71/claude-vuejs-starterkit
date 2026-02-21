# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # Vite 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 자동 수정 (eslint . --fix)
```

## 기술 스택

Vue 3.5 + Vuetify 3.8 + Pinia 3.0 + Vue Router 4.5, Vite 빌드, JavaScript (TypeScript 미사용)

## 코드 스타일

- 2칸 들여쓰기, 한국어 주석, 커밋 메시지 한국어
- Composition API + `<script setup>` 사용
- ESLint: `eslint-config-vuetify` (vue/attributes-order, vue/script-indent 2칸, perfectionist/sort-imports 등 자동 적용)
- `<script setup>` 블록 내부 코드는 **2칸 들여쓰기** (vue/script-indent 규칙)

## 아키텍처

**진입점 흐름**: `main.js` → `plugins/index.js`에서 Vuetify·Pinia·Router 등록 → `App.vue` 마운트

**레이아웃 구조**: 라우터 중첩으로 구현 (레이아웃 플러그인 미사용). 루트 라우트(`/`)가 `DefaultLayout.vue`를 로드하고, 자식 라우트들이 `<router-view />`에 렌더링됨. DefaultLayout = AppBar + NavigationDrawer + v-main + AppFooter

**라우팅**: `router/index.js`에서 명시적 라우트 정의 (파일 기반 라우팅 미사용). 모든 라우트는 lazy import. 전역 beforeEach 가드에서 페이지 타이틀 업데이트 및 인증 체크(`meta.requiresAuth`)

**상태관리**: Pinia 스토어는 `stores/`에 위치. Setup Store(`counter.js`) 와 Options Store(`todo.js`) 두 패턴 사용

**컴포넌트 등록**: `vite-plugin-vuetify` + `unplugin-vue-components`로 Vuetify 및 `components/` 내 컴포넌트 자동 임포트 (수동 import 불필요)

**경로 별칭**: `@` → `src/`

## 새 페이지 추가 패턴

1. `src/views/`에 Vue 컴포넌트 생성
2. `src/router/index.js`의 DefaultLayout children 배열에 라우트 추가
3. 메뉴 노출 시 `src/composables/useNavigation.js`의 menuItems에 항목 추가

## 새 스토어 추가 패턴

`src/stores/`에 파일 생성, `defineStore`로 스토어 정의 후 컴포넌트에서 직접 import하여 사용 (별도 등록 불필요)

## Vuetify 테마/기본값

`src/plugins/vuetify.js`에서 라이트/다크 테마 색상 및 컴포넌트 defaults 설정. SASS 변수 오버라이드는 `src/styles/settings.scss`
