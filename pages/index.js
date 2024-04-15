import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './store/userSlice';
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import Main from "./Main";
import Login from './Login';
import Loader from './Loader';


const Home = () => {

    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
        if(authUser){
            dispatch(
            login({
                email : authUser.email,
                displayName : authUser.displayName,
                photoURL : authUser.photoURL,
                uid: authUser.uid,
            })
            )
        }else{
            dispatch(
                logout()
            )
        } 
        })
    },[dispatch])

    // loader functionality start //
    const [loading, setloading] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
        setloading(false)
        }, 3000)

        clearTimeout(setloading(true))
    },[])


    return (
        <>  
            {   
                !loading ?
                user ?
                <Main/>
                :
                <Login/>
                :
                <Loader/>
            }
            
        </>
    )  
}

export default Home
