import {initializeApp} from 'firebase/app'
 import{ useEffect, useState} from 'react'
 import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
 import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
 const firebaseConfig = {
    apiKey: "AIzaSyB8CB9NLa1vbsREct9x7r2QWNzl0fXx3YA",
    authDomain: "apparelbase-76671.firebaseapp.com",
    projectId: "apparelbase-76671",
    storageBucket: "apparelbase-76671.appspot.com",
    messagingSenderId: "101281494605",
    appId: "1:101281494605:web:acb62d132a8456585d8e04",
    measurementId: "G-S25VVVM4TB"
  };
  const app = initializeApp(firebaseConfig)
  const auth = getAuth()

  export function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
  }
  export function login(email, password){
    return signInWithEmailAndPassword(auth,email,password)
  }
  export function logout(){
    return signOut(auth)
  }
  export function useAuth(){
    const [currentUser, setCurrentUser] = useState();
    useEffect(()=>{
        const unbn =  onAuthStateChanged(auth, user=>{
           setCurrentUser(user) 
        })
    return unbn
    },[])
    return currentUser;
  }
  const storage  = getStorage();
  
  export async function upload(file, currentUser , setLoading){

    const fileRef = ref(storage, currentUser.uid +".png")
   
    setLoading(true)
    const snapshot=  await uploadBytes(fileRef,file)
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser,{photoURL:photoURL})
    setLoading(false)
    alert("Updated")
  }