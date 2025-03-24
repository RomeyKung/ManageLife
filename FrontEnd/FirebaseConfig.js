// นำเข้าโมดูลที่คุณต้องการใช้งานจาก Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// ปรับปรุงการกำหนดค่า Firebase ของเว็บแอปของคุณ
const firebaseConfig = {
  apiKey: "qwe",
  authDomain: "qwe",
  projectId: "qwe",
  storageBucket: "qwe",
  messagingSenderId: "qwe",
  appId: "qwe",
};

// ตั้งค่า Firebase
export const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_AUTH = getAuth(app);
