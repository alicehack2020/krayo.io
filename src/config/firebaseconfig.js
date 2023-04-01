import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyBkfOmbUDG5G8CJXl0eowILhRooi9GkXf4",
  authDomain: "c3ihub.firebaseapp.com",
  projectId: "c3ihub",
  storageBucket: "c3ihub.appspot.com",
  messagingSenderId: "889069575059",
  appId: "1:889069575059:web:2dc985ef0e873adc362666",
  measurementId: "G-GHSG9LYE95"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;