import { initializeApp,  } from "firebase/app"
import { getAnalytics, initializeAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import 'firebase/analytics'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCk55j_rxvh2Xwau4ifeyzl2uSv4W6nbw0",
  authDomain: "chasescroll-619d4.firebaseapp.com",
  databaseURL: "https://chasescroll-619d4-default-rtdb.firebaseio.com",
  projectId: "chasescroll-619d4",
  storageBucket: "chasescroll-619d4.appspot.com",
  messagingSenderId: "126010586447",
  appId: "1:126010586447:web:88e521c76667219a97c13a",
  measurementId: "G-MYZ5BJPBET",
}

const app = initializeApp(firebaseConfig)
//initializeAnalytics(app);
//const analytics = getAnalytics(app)

// Initialize Firebase
const auth = getAuth(app)

const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.addScope("profile")
googleAuthProvider.addScope("email")



export { app,  auth, googleAuthProvider }
