import logo from './logo.svg';
import './App.css';
import { login, logout, signup, useAuth } from './firebase';
import {useState, useRef} from 'react'
import { async } from '@firebase/util';
import Profile from './Profile';

function App() {
  const emailRef = useRef()
  const  passwordRef = useRef()
  const[loading, setLoading] = useState(false)
  const currentUser = useAuth()
  async function handleSingup(){
    setLoading(true)
    try{
      await signup(emailRef.current.value, passwordRef.current.value)
    }catch{
      alert("Error")
    }
    setLoading(false)
  }
  async function handleLogin(){
    setLoading(true)
    try{
      await login(emailRef.current.value, passwordRef.current.value)
    }catch{
      alert("Error")
    }
    setLoading(false)
  }
  async function handleLogOut(){
    setLoading(true)
    try{
      await logout()
    }catch{
      alert("Error")
    }
    setLoading(false)
  }
  return (
    <div className="App">
      {currentUser && 
      <>
        <Profile/>
      
      </>}
      
      <div>Current loged in user: {currentUser?.email}</div>
      <input ref={emailRef} placeholder="email"/>
      <input type="password" ref={passwordRef} palceholder ="password"/>
      <button disabled={loading || currentUser!=null}onClick={handleSingup}>sign Up</button>
      <button disabled={loading || currentUser!=null}onClick={handleLogin}>Login</button>
      <button disabled={loading || !currentUser}onClick={handleLogOut}>Sign out</button>
    
    </div>
  );
}

export default App;
