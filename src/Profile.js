import React,{useState, useEffect} from 'react'
import { upload, useAuth } from './firebase';

import './profile.css';
export default function Profile() {
    const currentUser = useAuth();
    const [photoURL, setPhotoURL] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK2A8s_-bzszwOzl9ehRf_H1b7GHdjWF9Y_A&usqp=CAU");
    const[loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    function handleChange (e){
        if(e.target.files[0]){
            setPhoto(e.target.files[0])
        }

    }
    function handleClick(){
    upload(photo,currentUser, setLoading)
    }
    useEffect(()=>{
        if(currentUser?.photoURL){
            setPhotoURL(currentUser.photoURL)
        }
    
    },[currentUser])
  return (
    <div>
        <input type="file" onChange={handleChange}/>
        <img src={photoURL} alt='avertar' className='profilepic'/>
        <input type="text" placeholder="Enter Firsname"/>
        <input type="text" placeholder="Enter Surname"/>
        <button disabled ={loading ||!photo}onClick={handleClick}>upload</button>
    </div>
  )
}
