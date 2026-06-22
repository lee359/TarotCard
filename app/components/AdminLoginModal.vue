<script setup lang="ts">
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const props = defineProps<{
  modelValue: boolean
  initialMessage?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { $firebaseAuth } = useNuxtApp()
const email = ref('')
const password = ref('')
const errorMessage = ref(props.initialMessage ?? '')
const submitting = ref(false)
const emailInput = ref<HTMLInputElement | null>(null)

function close() {
  if (!submitting.value) emit('update:modelValue', false)
}

function getLoginError(code?: string) {
  if (['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(code ?? '')) {
    return '電子信箱或密碼不正確。'
  }
  if (code === 'auth/too-many-requests') return '登入嘗試次數過多，請稍後再試。'
  if (code === 'auth/network-request-failed') return '目前無法連線至 Firebase，請檢查網路後再試。'
  return '登入失敗，請確認 Firebase Authentication 設定。'
}

async function submitLogin() {
  errorMessage.value = ''

  if (!$firebaseAuth) {
    errorMessage.value = 'Firebase 尚未完成設定，請重新啟動伺服器或檢查部署環境變數。'
    return
  }

  submitting.value = true

  try {
    const credential = await signInWithEmailAndPassword($firebaseAuth, email.value.trim(), password.value)

    if (!await hasAdminAccess(credential.user)) {
      await signOut($firebaseAuth)
      errorMessage.value = '此帳號沒有管理員權限。'
      return
    }

    emit('update:modelValue', false)
    await navigateTo('/admin')
  } catch (error: unknown) {
    const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : undefined
    errorMessage.value = getLoginError(code)
  } finally {
    submitting.value = false
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleEscape)
  nextTick(() => emailInput.value?.focus())
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div class="login-overlay animate__animated animate__fadeIn" @click.self="close">
    <section class="login-dialog animate__animated animate__zoomIn" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
      <button class="close-button" type="button" aria-label="關閉登入視窗" title="關閉" @click="close">&times;</button>
      <p class="eyebrow"><span /> ADMIN ACCESS <span /></p>
      <h2 id="admin-login-title">管理員登入</h2>

      <form @submit.prevent="submitLogin">
        <label for="admin-email">電子信箱</label>
        <input id="admin-email" ref="emailInput" v-model="email" type="email" autocomplete="username" required>

        <label for="admin-password">密碼</label>
        <input id="admin-password" v-model="password" type="password" autocomplete="current-password" required>

        <p v-if="errorMessage" class="login-error" role="alert">{{ errorMessage }}</p>

        <button class="submit-button" type="submit" :disabled="submitting">
          <span>{{ submitting ? '驗證中' : '登入後台' }}</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.login-overlay { position: fixed; inset: 0; z-index: 50; display: grid; padding: 24px; place-items: center; background: rgba(9, 8, 23, .82); backdrop-filter: blur(9px); --animate-duration: .3s; }
.login-dialog { position: relative; width: min(440px, 100%); padding: 38px 42px 42px; border: 1px solid var(--gold); background: #121027; box-shadow: 0 28px 90px rgba(0, 0, 0, .55); --animate-duration: .45s; }
.close-button { position: absolute; top: 10px; right: 12px; display: grid; width: 36px; height: 36px; padding: 0; place-items: center; border: 1px solid transparent; background: transparent; color: var(--muted); cursor: pointer; font-family: Arial, sans-serif; font-size: 28px; line-height: 1; }
.close-button:hover { border-color: var(--line); color: var(--gold-light); }
.close-button:focus-visible { outline: 2px solid var(--gold-light); outline-offset: 2px; }
.eyebrow { display: flex; margin: 0; align-items: center; justify-content: center; gap: 11px; color: var(--gold); font-size: 9px; letter-spacing: .28em; }
.eyebrow span { width: 26px; height: 1px; background: var(--gold); opacity: .55; }
h2 { margin: 12px 0 28px; font-family: 'Noto Serif TC', serif; font-size: 30px; font-weight: 600; letter-spacing: .08em; text-align: center; }
form { display: grid; }
label { margin: 0 0 7px; color: #c9c3d0; font-size: 11px; letter-spacing: .12em; }
input { width: 100%; height: 44px; margin-bottom: 18px; padding: 0 13px; border: 1px solid var(--line); border-radius: 0; outline: none; background: rgba(7, 6, 18, .72); color: var(--ink); font-size: 14px; transition: border-color .2s ease, box-shadow .2s ease; }
input:focus { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(212, 179, 106, .12); }
.login-error { margin: -4px 0 16px; color: #e7a4a4; font-size: 12px; line-height: 1.6; }
.submit-button { display: flex; min-height: 46px; padding: 0 20px; align-items: center; justify-content: center; gap: 54px; border: 1px solid var(--gold); background: var(--gold); color: #151129; cursor: pointer; font-size: 12px; letter-spacing: .14em; transition: .25s ease; }
.submit-button:hover:not(:disabled) { background: var(--gold-light); transform: translateY(-2px); }
.submit-button:disabled { cursor: wait; opacity: .65; }
.submit-button:focus-visible { outline: 2px solid var(--gold-light); outline-offset: 3px; }
@media (max-width: 520px) {
  .login-overlay { padding: 16px; align-items: end; }
  .login-dialog { padding: 36px 22px 28px; }
}
</style>
