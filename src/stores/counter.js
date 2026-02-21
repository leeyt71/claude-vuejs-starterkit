import { defineStore } from 'pinia'
// 카운터 스토어 (Setup Store 패턴)
import { computed, ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 상태
  const count = ref(0)

  // 게터
  const doubleCount = computed(() => count.value * 2)

  // 액션
  function increment () {
    count.value++
  }

  function decrement () {
    count.value--
  }

  function reset () {
    count.value = 0
  }

  function incrementBy (amount) {
    count.value += amount
  }

  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset,
    incrementBy,
  }
})
