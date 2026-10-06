import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQWoSR47VXkiZHXvRD5-kPkgku9gJ8ugI",
  authDomain: "paw-center-b6b80.firebaseapp.com",
  projectId: "paw-center-b6b80",
  storageBucket: "paw-center-b6b80.firebasestorage.app",
  messagingSenderId: "855214335065",
  appId: "1:855214335065:web:3cdd4a278100eca8fe3d48"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch (e) {
  auth = getAuth(app);
}

export { auth };