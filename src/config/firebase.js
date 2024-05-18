import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7i-wLBd2wjS0LEqWz9kLHdUkHyFyhZjQ",
  authDomain: "qho640-eef15.firebaseapp.com",
  projectId: "qho640-eef15",
  storageBucket: "qho640-eef15.appspot.com",
  messagingSenderId: "854198086829",
  appId: "1:854198086829:web:be4d735d160ca22063aa24",
  measurementId: "G-9VN9SK7YRQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore,storage }