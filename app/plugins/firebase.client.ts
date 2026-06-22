import { getApp, getApps, initializeApp } from 'firebase/app'
import type { FirebaseOptions } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig: FirebaseOptions = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  }

  const missingKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingKeys.length) {
    console.warn(`[Firebase] Missing configuration: ${missingKeys.join(', ')}`)
    return {
      provide: {
        firebaseApp: null,
        firestore: null,
        firebaseAuth: null,
        db: null
      }
    }
  }

  const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
  const firestore = getFirestore(firebaseApp)
  const firebaseAuth = getAuth(firebaseApp)

  return {
    provide: {
      firebaseApp,
      firestore,
      firebaseAuth,
      db: firestore
    }
  }
})
