// นำเข้าโมดูลที่คุณต้องการใช้งานจาก Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// ปรับปรุงการกำหนดค่า Firebase ของเว็บแอปของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyCJxCDI2R4Gys96m0FRb2NZNcQkXc0jt7E",
  authDomain: "managelife-74367.firebaseapp.com",
  projectId: "managelife-74367",
  storageBucket: "managelife-74367.appspot.com",
  messagingSenderId: "34544116724",
  appId: "1:34544116724:web:7de2483f9a783230c10fa1",
};

// ตั้งค่า Firebase
export const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_AUTH = getAuth(app);