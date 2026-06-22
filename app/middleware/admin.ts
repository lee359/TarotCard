import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const { $firebaseAuth } = useNuxtApp()
  if (!$firebaseAuth) return navigateTo({ path: '/', query: { adminLogin: '1' } })

  const user = await new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      $firebaseAuth,
      (currentUser) => {
        unsubscribe()
        resolve(currentUser)
      },
      reject
    )
  })

  if (!user) return navigateTo({ path: '/', query: { adminLogin: '1' } })

  if (!await hasAdminAccess(user)) {
    await signOut($firebaseAuth)
    return navigateTo({
      path: '/',
      query: { adminLogin: '1', adminError: 'unauthorized' }
    })
  }
})
