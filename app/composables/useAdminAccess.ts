import { doc, getDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'

export async function hasAdminAccess(user: User | null) {
  const { $firestore } = useNuxtApp()

  if (!user || !$firestore) return false

  try {
    const adminSnapshot = await getDoc(doc($firestore, 'admins', user.uid))
    return adminSnapshot.exists() && adminSnapshot.data().active === true
  } catch (error) {
    console.error('[Firebase] Unable to verify administrator access.', error)
    return false
  }
}
