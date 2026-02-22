// AES-GCM 256bit 암호화 유틸리티 (Web Crypto API)
// sessionStorage에 키를 보관하여 탭 닫으면 키 소멸 → 자동 로그아웃 효과

const KEY_STORAGE_KEY = 'auth_enc_key'
const AUTH_STORAGE_KEY = 'isAuthenticated'
const ALGORITHM = { name: 'AES-GCM', length: 256 }

/**
 * sessionStorage에서 암호화 키를 재사용하거나 신규 생성
 * @returns {Promise<CryptoKey>}
 */
async function getOrCreateKey() {
  const stored = sessionStorage.getItem(KEY_STORAGE_KEY)
  if (stored) {
    const raw = Uint8Array.from(atob(stored), c => c.charCodeAt(0))
    return window.crypto.subtle.importKey('raw', raw, ALGORITHM, true, ['encrypt', 'decrypt'])
  }
  const key = await window.crypto.subtle.generateKey(ALGORITHM, true, ['encrypt', 'decrypt'])
  const exported = await window.crypto.subtle.exportKey('raw', key)
  sessionStorage.setItem(
    KEY_STORAGE_KEY,
    btoa(String.fromCharCode(...new Uint8Array(exported)))
  )
  return key
}

/**
 * 평문을 AES-GCM으로 암호화
 * @param {string} plainText
 * @returns {Promise<string>} "ivBase64:cipherBase64" 형식
 */
async function encrypt(plainText) {
  const key = await getOrCreateKey()
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const encoded = new TextEncoder().encode(plainText)
  const cipherBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  )
  const ivBase64 = btoa(String.fromCharCode(...iv))
  const cipherBase64 = btoa(String.fromCharCode(...new Uint8Array(cipherBuffer)))
  return `${ivBase64}:${cipherBase64}`
}

/**
 * 암호화된 문자열을 복호화
 * @param {string} storedValue "ivBase64:cipherBase64" 형식
 * @returns {Promise<string|null>} 평문 또는 실패 시 null
 */
async function decrypt(storedValue) {
  try {
    const [ivBase64, cipherBase64] = storedValue.split(':')
    if (!ivBase64 || !cipherBase64) return null

    const key = await getOrCreateKey()
    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0))
    const cipherBuffer = Uint8Array.from(atob(cipherBase64), c => c.charCodeAt(0))
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      cipherBuffer
    )
    return new TextDecoder().decode(decrypted)
  } catch {
    // 변조 탐지 (GCM 인증 태그 불일치) 또는 세션 만료 시 null 반환
    return null
  }
}

/**
 * 인증 상태를 암호화하여 localStorage에 저장
 * @param {boolean} isAuth
 */
export async function setAuthState(isAuth) {
  const encrypted = await encrypt(String(isAuth))
  localStorage.setItem(AUTH_STORAGE_KEY, encrypted)
}

/**
 * localStorage에서 인증 상태를 읽어 복호화 후 boolean 반환
 * 값 없음 / 변조 / 세션 만료 시 false 반환
 * @returns {Promise<boolean>}
 */
export async function getAuthState() {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!stored) return false
  const plainText = await decrypt(stored)
  return plainText === 'true'
}
