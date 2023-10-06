import { initializeApp } from "firebase/app";
import {
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import {ref, uploadString,getStorage, getDownloadURL, deleteObject} from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const authService = getAuth();
export {
  authService,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
};
export const dbService = getFirestore();
export const dbAddDoc = addDoc;
export const dbCollection = collection;
export const storageService = getStorage();

export default app;