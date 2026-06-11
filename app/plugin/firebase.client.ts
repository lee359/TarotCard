// app/plugins/firebase.client.ts
import { getApp, getApps, initializeApp } from 'firebase/app'
import type { FirebaseOptions } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig: FirebaseOptions = {
    apiKey: config.public.firebaseApiKey as string | undefined,
    authDomain: config.public.firebaseAuthDomain as string | undefined,
    projectId: config.public.firebaseProjectId as string | undefined,
    storageBucket: config.public.firebaseStorageBucket as string | undefined,
    messagingSenderId: config.public.firebaseMessagingSenderId as string | undefined,
    appId: config.public.firebaseAppId as string | undefined
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  const db = getFirestore(app)

  return {
    provide: {
      db
    }
  }
})