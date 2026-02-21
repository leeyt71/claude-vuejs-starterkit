// Todo 스토어 (Options Store 패턴)
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { id: 1, text: 'Vue 3 학습하기', done: true },
      { id: 2, text: 'Vuetify 컴포넌트 살펴보기', done: false },
      { id: 3, text: 'Pinia 상태관리 이해하기', done: false },
    ],
    nextId: 4,
    filter: 'all', // 'all' | 'active' | 'completed'
  }),

  getters: {
    // 필터링된 목록
    filteredTodos (state) {
      if (state.filter === 'active') {
        return state.todos.filter(t => !t.done)
      }
      if (state.filter === 'completed') {
        return state.todos.filter(t => t.done)
      }
      return state.todos
    },

    // 통계
    totalCount: state => state.todos.length,
    activeCount: state => state.todos.filter(t => !t.done).length,
    completedCount: state => state.todos.filter(t => t.done).length,
  },

  actions: {
    // 추가
    addTodo (text) {
      if (!text.trim()) {
        return
      }
      this.todos.push({
        id: this.nextId++,
        text: text.trim(),
        done: false,
      })
    },

    // 토글
    toggleTodo (id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    },

    // 삭제
    removeTodo (id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },

    // 수정
    updateTodo (id, text) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.text = text
      }
    },

    // 필터 변경
    setFilter (filter) {
      this.filter = filter
    },

    // 완료 항목 전체 삭제
    clearCompleted () {
      this.todos = this.todos.filter(t => !t.done)
    },
  },
})
