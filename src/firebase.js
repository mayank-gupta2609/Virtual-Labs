import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCO6ncoX9nw3UCeeF3UAtwq1h4ZTXpaccA",
  authDomain: "vlabs-92646.firebaseapp.com",
  projectId: "vlabs-92646",
  storageBucket: "vlabs-92646.appspot.com",
  messagingSenderId: "604006648794",
  appId: "1:604006648794:web:e6c14e7fdca6bce575cee3",
  measurementId: "G-WHQ7JMS36T"
};
 

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider }