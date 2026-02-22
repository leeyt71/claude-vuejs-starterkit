// 인증 상태 관리 Composable
import { onMounted, ref } from 'vue'
import { getAuthState, setAuthState } from '@/utils/crypto'

export function useAuth() {
  const isAuthenticated = ref(false)
  const isLoading = ref(true)

  onMounted(async () => {
    isAuthenticated.value = await getAuthState()
    isLoading.value = false
  })

  async function toggleAuth() {
    isLoading.value = true
    isAuthenticated.value = !isAuthenticated.value
    await setAuthState(isAuthenticated.value)
    isLoading.value = false
  }

  return { isAuthenticated, isLoading, toggleAuth }
}
