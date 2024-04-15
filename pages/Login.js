import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import {  doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from './firebase';

function Login() {

    const [refcode, setrefcode] = useState()
    const [userref, setuserref] = useState(null)

    
    const [ids, setids] = useState([])

    useEffect(()=>{
        db.collection('user').onSnapshot((snapshot)=>{
            setids(
            snapshot.docs.map((doc)=>({
              id : doc.id,
              data : doc.data()
            }))
          )
        })
  },[])   
  
  useEffect(()=>{
      const arr =[]
    ids?.map(({id,data:{refcode, uid, refpoint}})=>{
        return arr.push({
            refcode :refcode,
            uid :uid,
            refpoint :refpoint,
        })
    })
    setuserref(arr.find(item => item.refcode === refcode))
  }, [ids, refcode])



    const ref =async()=>{
           if(userref?.uid){
            await updateDoc(doc(db, 'user', userref?.uid),{
                refpoint : userref.refpoint + 1
            })
           }
    }

    // sign up functionality start //

    const tellink=async()=>{
        const provider = new GoogleAuthProvider()

        var fst = Math.floor(Math.random() * 10);
        var sec = Math.floor(Math.random() * 10);
        var trd = Math.floor(Math.random() * 10);
        var frt = Math.floor(Math.random() * 10);
        var fif = Math.floor(Math.random() * 10);

        var rand = fst + '' + sec + trd + frt + fif

       
        
        
        signInWithPopup(auth, provider).then(async(value)=>{
               
        
        
        
        try{
            const res = await getDoc(doc(db, 'user',  value?.user?.uid))

            if(userref !== ''){
                ref()
            }
    
            if(!res.exists()){
                setDoc(doc(db, 'user', value?.user?.uid),{
                    refcode : rand,
                    name : value?.user?.displayName,
                    email : value?.user?.email,
                    uid : value?.user?.uid,
                    balance : 0,
                    username : "@" + value?.user?.displayName.slice(0, 3) + "-" + value?.user?.displayName.slice(0, -3),
                    refpoint : 0,
                    dpoint : 0,
                })

                setDoc(doc(db, 'upload', value?.user?.uid),{})
            }


            

        }catch(e){
            console.log(e);
        }
        })
    }

    // sign up functionality end //


    const [loading, setloading] = useState(false)

     useEffect(()=>{
         setTimeout(()=>{
         setloading(false)
         }, 8000)
 
         clearTimeout(setloading(true))
     },[])

  return (
    <div className='login'>
       <div className='loginlogo'>
        {/* <Lottie animationData={bp} /> */}
        
        <div className='loginlogoimage'></div>

        <p>Enter referral code</p>

        <OTPInput
        value={refcode}
        onChange={setrefcode}
        inputStyle={{padding:'10px', 
         width:'3em', height:'3em',border:'1px solid white',
        fontSize: '15px', osuccflow:'hidden',counterReset:'none', color:'white', backgroundColor:'transparent',margin: '0 3.5px'}}
        numInputs={5}
        disabled={false}
        autoFocus
        inputType={'tel'}
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        ></OTPInput>

        <button onClick={tellink}>
            SIGNUP / SIGNIN
            <div className='gl'></div>
        </button>

       </div>

       <div className='div'>
       <p>CAT AI is not your average token – its a game-changer. With its innovative approach to decentralized finance and its focus on harnessing the power of artificial intelligence, CAT AI is paving the way for a smarter, more efficient future. By leveraging the intelligence and agility of our feline companions, CAT AI is able to execute transactions with lightning speed and unparalleled accuracy, ensuring a seamless experience for users.</p>
       </div>
    </div>
  )
}

export default Login