import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBXL_B0vwGgjlyNgNSxfp81aWHBIGwPaSk",
  authDomain: "crud-56522.firebaseapp.com",
  projectId: "crud-56522",
  storageBucket: "crud-56522.appspot.com",
  messagingSenderId: "157071779506",
  appId: "1:157071779506:web:a8d24c5aa69013d5748bab"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

export default app;
