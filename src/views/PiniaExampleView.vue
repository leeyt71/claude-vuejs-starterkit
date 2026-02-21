<template>
  <!-- Pinia 상태관리 예제 -->
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">
      <v-icon class="mr-2" color="warning">mdi-fruit-pineapple</v-icon>
      Pinia 상태관리 예제
    </h1>

    <v-row>
      <!-- 카운터 (Setup Store) -->
      <v-col cols="12" md="6">
        <SectionCard icon="mdi-counter" title="카운터 (Setup Store)">
          <v-alert class="mb-4" density="compact" type="info" variant="tonal">
            Setup Store 패턴: Composition API 스타일로 ref, computed, function을 사용합니다.
          </v-alert>

          <div class="text-center mb-4">
            <div class="text-h2 font-weight-bold mb-2">
              {{ counter.count }}
            </div>
            <div class="text-body-2 text-medium-emphasis">
              두 배 값: <strong>{{ counter.doubleCount }}</strong>
            </div>
          </div>

          <div class="d-flex justify-center ga-2 mb-4">
            <v-btn
              color="error"
              prepend-icon="mdi-minus"
              variant="tonal"
              @click="counter.decrement"
            >
              감소
            </v-btn>
            <v-btn
              color="primary"
              prepend-icon="mdi-refresh"
              variant="tonal"
              @click="counter.reset"
            >
              리셋
            </v-btn>
            <v-btn
              color="success"
              prepend-icon="mdi-plus"
              variant="tonal"
              @click="counter.increment"
            >
              증가
            </v-btn>
          </div>

          <div class="d-flex justify-center align-center ga-2">
            <v-text-field
              v-model.number="incrementAmount"
              density="compact"
              hide-details
              label="증가량"
              style="max-width: 120px"
              type="number"
            />
            <v-btn
              color="primary"
              @click="counter.incrementBy(incrementAmount)"
            >
              추가
            </v-btn>
          </div>
        </SectionCard>
      </v-col>

      <!-- Todo (Options Store) -->
      <v-col cols="12" md="6">
        <SectionCard icon="mdi-checkbox-marked-outline" title="Todo CRUD (Options Store)">
          <v-alert class="mb-4" density="compact" type="info" variant="tonal">
            Options Store 패턴: state, getters, actions를 객체로 정의합니다.
          </v-alert>

          <!-- 통계 -->
          <v-row class="mb-4" dense>
            <v-col cols="4">
              <v-card class="text-center pa-2" color="primary" variant="tonal">
                <div class="text-h6">{{ todo.totalCount }}</div>
                <div class="text-caption">전체</div>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="text-center pa-2" color="warning" variant="tonal">
                <div class="text-h6">{{ todo.activeCount }}</div>
                <div class="text-caption">미완료</div>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="text-center pa-2" color="success" variant="tonal">
                <div class="text-h6">{{ todo.completedCount }}</div>
                <div class="text-caption">완료</div>
              </v-card>
            </v-col>
          </v-row>

          <!-- 입력 -->
          <v-text-field
            v-model="newTodoText"
            class="mb-3"
            hide-details
            label="새 할 일 추가"
            prepend-inner-icon="mdi-plus"
            @keyup.enter="addNewTodo"
          >
            <template #append-inner>
              <v-btn
                color="primary"
                icon="mdi-send"
                size="small"
                variant="text"
                @click="addNewTodo"
              />
            </template>
          </v-text-field>

          <!-- 필터 -->
          <v-btn-toggle
            class="mb-3"
            density="compact"
            mandatory
            :model-value="todo.filter"
            @update:model-value="todo.setFilter"
          >
            <v-btn size="small" value="all">전체</v-btn>
            <v-btn size="small" value="active">미완료</v-btn>
            <v-btn size="small" value="completed">완료</v-btn>
          </v-btn-toggle>

          <!-- 목록 -->
          <v-list density="compact">
            <v-list-item
              v-for="item in todo.filteredTodos"
              :key="item.id"
            >
              <template #prepend>
                <v-checkbox-btn
                  color="success"
                  :model-value="item.done"
                  @update:model-value="todo.toggleTodo(item.id)"
                />
              </template>

              <v-list-item-title
                :class="{ 'text-decoration-line-through text-medium-emphasis': item.done }"
              >
                {{ item.text }}
              </v-list-item-title>

              <template #append>
                <v-btn
                  color="error"
                  icon="mdi-delete"
                  size="small"
                  variant="text"
                  @click="todo.removeTodo(item.id)"
                />
              </template>
            </v-list-item>

            <v-list-item v-if="todo.filteredTodos.length === 0">
              <v-list-item-title class="text-center text-medium-emphasis">
                할 일이 없습니다
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <!-- 완료 항목 삭제 -->
          <v-btn
            v-if="todo.completedCount > 0"
            class="mt-2"
            color="error"
            size="small"
            variant="text"
            @click="todo.clearCompleted"
          >
            완료 항목 삭제 ({{ todo.completedCount }})
          </v-btn>
        </SectionCard>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import SectionCard from '@/components/SectionCard.vue'
  import { useCounterStore } from '@/stores/counter'
  import { useTodoStore } from '@/stores/todo'

  const counter = useCounterStore()
  const todo = useTodoStore()

  // 카운터 증가량
  const incrementAmount = ref(5)

  // 새 Todo 입력
  const newTodoText = ref('')

  function addNewTodo () {
    if (newTodoText.value.trim()) {
      todo.addTodo(newTodoText.value)
      newTodoText.value = ''
    }
  }
</script>
