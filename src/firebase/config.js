import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
 
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}
 
// Debug: kiểm tra biến môi trường có được đọc không
console.log("Firebase config:", {
  apiKey: firebaseConfig.apiKey ? "✓ có" : "✗ thiếu",
  authDomain: firebaseConfig.authDomain ? "✓ có" : "✗ thiếu",
  projectId: firebaseConfig.projectId ? "✓ có" : "✗ thiếu",
  appId: firebaseConfig.appId ? "✓ có" : "✗ thiếu",
})
 
const app      = initializeApp(firebaseConfig)
export const auth     = getAuth(app)
export const provider = new GoogleAuthProvider()
 