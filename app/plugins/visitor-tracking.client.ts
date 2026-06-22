import { doc, increment, serverTimestamp, setDoc } from 'firebase/firestore'

const SESSION_KEY = 'luna-arcana-visit-counted'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const { $firestore } = nuxtApp

  nuxtApp.hook('app:mounted', async () => {
    const route = router.currentRoute.value

    if (!$firestore || route.path.startsWith('/admin') || sessionStorage.getItem(SESSION_KEY)) return

    try {
      await setDoc(doc($firestore, 'siteStats', 'visitors'), {
        count: increment(1),
        lastVisitedAt: serverTimestamp()
      }, { merge: true })
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch (error) {
      console.warn('[Firestore] Unable to record visitor count.', error)
    }
  })
})
