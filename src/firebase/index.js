import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_uBNfCbsq4-nvHUp81RqamAOHvXy9ev0",
  authDomain: "cooking-app-42208.firebaseapp.com",
  projectId: "cooking-app-42208",
  storageBucket: "cooking-app-42208.appspot.com",
  messagingSenderId: "405444464297",
  appId: "1:405444464297:web:c70d5cce4c7ccb0d83a3b8",
  measurementId: "G-5SFQ01M237",
};

export const app = initializeApp(firebaseConfig);
export let isNew = false;
const auth = getAuth(app);
let uid = "no user";
let userName = "no user";

//LOGIN AND REGISTER METHODS
//Register with mail
export const registerWithEmail = (email, password, userName) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//Login with mail
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

//Login with Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  let result = await signInWithPopup(auth, provider)
  const {isNewUser} = getAdditionalUserInfo(result)
  isNew = isNewUser 
  return result
};

//CHECK AUTH STATE
onAuthStateChanged(auth, (user) => {
  if(user){
    uid = user.uid;
    userName=user.displayName;
  }
});

export const isLogged = () =>{
  return uid
}

export const logout = () => {
  signOut(auth);  
}

export const getCurrentUserId = () => {
  return uid;
}

export const getNameFromUser = () => {
    return userName;
}