import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAb63Z9r52Ox9whcfs_dwdVxH1UVz-jsgM",
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: "applet-c9b84",
  storageBucket: "applet-c9b84.firebasestorage.app",
  messagingSenderId: "109222056685",
  appId: "1:109222056685:web:f6a00145b4fdfc97bcb2e4",
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
