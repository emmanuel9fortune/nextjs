import React, { useEffect, useState } from 'react'
import Homebod from './Homebod'
import { db} from './firebase'
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './store/userSlice';
import { info } from './store/infoSlice';

function Main() {

    // getting user information functionality start //
    const user = useSelector(selectUser)

    const [userinfo, setuserinfo] = useState([])
  
    const dispatch = useDispatch()  
  
    useEffect(()=>{
          const unsub = onSnapshot(doc(db, "user", user.uid), (doc) => {
              setuserinfo( doc.data());
          });
  
          return ()=>{
            unsub()
          }
    },[user.uid])

  
    useEffect(()=>{
        if(userinfo){
            dispatch(
            info({
                userinfo : userinfo,
            })
            )
        }
    },[dispatch, userinfo])
    // getting user information functionality end //

  return (
    <>
        <Homebod/>
    </>
  )
}

export default Main