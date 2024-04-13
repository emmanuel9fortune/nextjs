import { useState, useEffect } from 'react'
import Action from '../components/header/Action'
import NavMenu from '../components/header/NavMenu'
import Profile from '../components/header/Profile'
import NewTransactionModal from '../components/transaction/NewTransactionModal'
import { useWallet } from '@solana/wallet-adapter-react'
import TransactionQRModal from '../components/transaction/TransactionQRModal'
import { getAvatarUrl } from "../functions/getAvatarUrl"
import {  WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import {FireIcon, GiftIcon, PaperAirplaneIcon, ClockIcon, ChevronRightIcon, MinusIcon, ExclamationTriangleIcon,ExclamationCircleIcon, ClipboardDocumentListIcon, CheckBadgeIcon, UserIcon, QueueListIcon, ArrowLeftEndOnRectangleIcon} from '@heroicons/react/24/outline'
import { selectinfo } from './store/infoSlice'
import { useSelector } from 'react-redux';
import { truncate } from "../utils/string"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { selectUser } from './store/userSlice'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import Slipbars from './Slipbars'
import axios from 'axios'
import Connection from './Connection'
import Loader from './Loader'
import Image from 'next/image'




const Homebod = () => {

    const { connected, publicKey } = useWallet()
    const [userAddress, setUserAddress] = useState('2342322222222222222')
    const [avatar, setAvatar] = useState("")
    const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false)
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false)

    // Get Avatar based on the userAddress//
    //////////////////////////////////////////

    useEffect(() => {
        if(connected){
            setAvatar(getAvatarUrl(publicKey.toString()))
        }else{
            setAvatar(getAvatarUrl(userAddress))
        }
    },[connected, publicKey, userAddress])

    /////////////////////////////////////////////////
    ///////////////////////////////////////////////

    const info = useSelector(selectinfo)


    const [pop1, setpop1] = useState(false)
    const fstpop =()=>{
        pop1 ? setpop1(false) : setpop1(true)
    }

    const [pop2, setpop2] = useState(false)
    const secpop =()=>{
        pop2 ? setpop2(false) : setpop2(true)
    }

    const [pop3, setpop3] = useState(false)
    const trdpop =()=>{
        pop3 ? setpop3(false) : setpop3(true)
    }

    const [menu, setmenu] = useState(false)
    const menuclick =()=>{
        menu ? setmenu(false) : setmenu(true)
    }



  


    const onNewTransaction = () => {
        setNewTransactionModalOpen(true)
    }

    const viewprof =()=>{
        setTransactionQRModalOpen(true)
    }

    // copy functionality //
    ///////////////////////////////

    const [copied, setcopied] = useState(false)
    const copy =()=>{
        setTimeout(() => {
            setcopied(true)
        }, 2000);

        clearTimeout(setcopied(false))
    }


    const xrp1=()=>{
        navigator.clipboard.writeText(info?.userinfo.refcode)
        toast.info('copied')
    }
    // copy functionaly end//
    ////////////////////////////

    const user = useSelector(selectUser)


    // getting receipts //
    ///////////////////////////////////////////

  const [userr, setuserr] = useState([])

  useEffect(()=>{
      const func =()=>{
          const unsub = onSnapshot(doc(db, "upload", user?.uid), (doc) => {
              setuserr(doc.data());
            });
        
            return ()=>{
              unsub()
            }
      }
  
      user?.uid && func()
      
    },[user?.uid])

    // getting receipts end //
    ///////////////////////////////////////////


    // connect to wallet warning  //
    ///////////////////////////////////////////

    const connectwarning =()=>{
        toast.error('connect wallet to deposit')
    }

    // connect to wallet warning end //
    ///////////////////////////////////////////



     // functionality for displaying the balance //
    ///////////////////////////////////////////

    const numft = new Intl.NumberFormat('en-us', {
        maximumFractionDigits: 3
    })

      const [coin, setcoin] = useState([])
      const [crp, setcrp] = useState('')
  
  
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en'
  
      useEffect(()=>{
          try{
            axios?.get(url)?.then((reponse)=>{
                setcoin(reponse.data)
            })
          }catch(e){
            console.log(e);
          }
      },[])

      useEffect(()=>{
        coin?.map((cn)=>(
        'sol'=== cn?.symbol ?
               setcrp(cn?.current_price)
             : null
         ))
     },[ coin])

     // functionality for displaying the balance end//
    ///////////////////////////////////////////



    // functionality for missions//
    ///////////////////////////////////////////

    const fstclick =async()=>{
        if(info?.userinfo.balance > 0){
            window.open('')
            await updateDoc(doc(db, 'user', user.uid),{
                fst : true,
                dpoint : info?.userinfo.dpoint + 100
            })
        }else{
            toast('insufficient funds')
        }
       
    }

    const secclick =async()=>{
        if(info?.userinfo.balance > 0){
            window.open('')
            await updateDoc(doc(db, 'user', user.uid),{
                sec : true,
                dpoint : info?.userinfo.dpoint + 100
            })
        }else{
            toast('insufficient funds')
        }
    }

    const trdclick =async()=>{
        if(info?.userinfo.balance > 0){
            window.open('')
            await updateDoc(doc(db, 'user', user.uid),{
                trd : true,
                dpoint : info?.userinfo.dpoint + 100
            })
        }else{
            toast('insufficient funds')
        }    
    }

    const frtclick =async()=>{
        if(info?.userinfo.balance > 0){
            window.open('')
            await updateDoc(doc(db, 'user', user.uid),{
                frt : true,
                dpoint : info?.userinfo.dpoint + 100
            })
        }else{
            toast('insufficient funds')
        }
    }

    // functionality for missions//
    ///////////////////////////////////////////




      // reward timer //
    ////////////////////////////////////////////////////////////////

    // const [time, settime] = useState(0)

    // const calctimer = () => {
    //     // Get the current time
    //     let currentTime = new Date();
    
    //     // Calculate the future time (24 hours from now)
    //     let futureTime = info?.userinfo.futuretime; // Adding 24 hours in milliseconds
    
    //     // Calculate the difference in seconds
    //     if(info?.userinfo.futuretime){
    //         settime((info?.userinfo.futuretime - currentTime.getTime())/ 1000) ;
    //     }
    
    // };


    const calculateTimeLeft = (targetDate) => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
    };
    
      const getTargetDateFromStorage = () => {
        const storedTargetDate = localStorage.getItem('targetDate');
        return storedTargetDate ? new Date(storedTargetDate) : null;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(getTargetDateFromStorage()));
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft(getTargetDateFromStorage()));
        }, 1000);
    
        return () => clearTimeout(timer);
      });
    
      const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
      };
    
      // Update the countdown timer when the user comes back online

      useEffect(() => {
        const handleOnline = () => {
          setTimeLeft(calculateTimeLeft(getTargetDateFromStorage()));
        };
    
        window.addEventListener('online', handleOnline);
    
        return () => window.removeEventListener('online', handleOnline);
      }, []);
  
    const hours = formatTime(timeLeft.hours);
    const minutes = formatTime(timeLeft.minutes);
    const seconds = formatTime(timeLeft.seconds);


    const claimbtn=async()=>{
        settime()

        if(info?.userinfo.balance > 0 ){
            await updateDoc(doc(db, 'user', user.uid),{
                dpoint : info?.userinfo.balance < 50 ? info?.userinfo.dpoint + 100 : info?.userinfo.dpoint + 200,
                claim : true,
                
            })
        }else{
            toast.error('insufficient balance')
        }

    }

    const settime=()=>{
        // Get the current date and time
        const currentDate = new Date();

        // Add 24 hours to the current date and time
        const targetDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

        // Convert the resulting date object to ISO 8601 format
        const isoString = targetDate.toISOString();

        // Store the ISO string in localStorage with the key 'targetDate'
        localStorage.setItem('targetDate', isoString);

    }

    const [check, setcheck] = useState()

    useEffect(()=>{
        const isCountdownEnded = (timeLeft) => {
            return Object.values(timeLeft).every(value => value === 0);
          };
          
          // Example usage
          const timeLeft = calculateTimeLeft(getTargetDateFromStorage());
          const countdownEnded = isCountdownEnded(timeLeft);
          setcheck(countdownEnded)
    },[])



    const getit = localStorage.getItem('')

    

    return (
        <>
            {
                info?.userinfo.email ?
                <div className="main">
                    
                <ToastContainer theme='dark' />

                    <header className="sidebar">
                        <Profile setModalOpen={setTransactionQRModalOpen} avatar={avatar} publicKey={publicKey} />
                        <TransactionQRModal ArrowLeftEndOnRectangleIcon={ArrowLeftEndOnRectangleIcon} avatar={avatar} modalOpen={transactionQRModalOpen} setModalOpen={setTransactionQRModalOpen} userAddress={publicKey} myKey={publicKey} />

                        <NavMenu connected={connected} publicKey={publicKey} />

                        <Action setModalOpen={setNewTransactionModalOpen} publicKey={publicKey}  />
                        <NewTransactionModal modalOpen={newTransactionModalOpen} setModalOpen={setNewTransactionModalOpen} />
                    </header>

                    <div className='dashboard'> 
                        <div className='header'>
                            <div className='menu' onClick={menuclick}>
                                <div className='menuline'></div>
                                <div className='menuline'></div>
                                <div className='menuline'></div>
                            </div>
                            <div className='logo'></div>
                            <h3>CAT AI</h3>
                        </div>

                            <div className='connection'>
                                <Connection>
                                    <p style={{color:'grey'}} >Dashboard</p>
                                </Connection>
                            </div>
                        <div className='dashboardbod'>

                            <div className='dashboardbox1'>
                                <p>Balance</p>
                                {
                                    crp ?
                                    <h1>${numft.format(info?.userinfo.balance * crp)}</h1>
                                    :
                                    <h1>-</h1>
                                }
                                <small style={{color:'grey'}}>{numft.format(info?.userinfo.balance)}(sol)</small>
                            </div>

                            <div className='dashboardbox1'>
                                <p>CAi points(+)</p>
                                <h1>{numft.format(info?.userinfo.refpoint * 100  + info?.userinfo.dpoint)}</h1>
                            </div>
                        </div>

                        <div className='boxlinks'>  
                            {
                                publicKey ?
                                <div className='boxlink bxx' onClick={onNewTransaction}>
                                    <PaperAirplaneIcon style={{width:'22px', color:'rgb(180, 100, 245)'}}/>
                                    <p>Deposit</p>
                                </div>
                            :
                            <div className='boxlink bxx emptnull' onClick={connectwarning}>
                                <PaperAirplaneIcon style={{width:'22px', color:'rgb(180, 100, 245)'}}/>
                                <p>Deposit</p>
                            </div>
                            }

                            <div className='boxlink bxx1'>
                                <WalletMultiButton className='bxx1'>
                                    <p className='pxx'>
                                        {publicKey ? '' : 'connect'}
                                    </p>
                                </WalletMultiButton>
                            </div>


                            <div className='boxlink bxx' onClick={trdpop}>
                                <ClockIcon style={{width:'22px', color:'rgb(180, 100, 245)'}}/>
                                <p>History</p>
                            </div>
                        </div>

                        {
                            info?.userinfo.refcode ?
                            <CopyToClipboard text={info?.userinfo.refcode} onCopy={xrp1}>
                                <div className='refferal' >
                                    <div style={{display:'flex'}}>
                                    {
                                        copied ?
                                        <CheckBadgeIcon style={{width:'25px' ,color:'green'}}/>
                                        :
                                        <ClipboardDocumentListIcon style={{width:'25px'}}/>
                                    }
                                    <p onClick={copy}>{info?.userinfo.refcode}</p>
                                    </div>

                                    <p>refs: {info?.userinfo.refpoint}</p>
                                </div>
                            </CopyToClipboard>
                            :
                            <div className='refferal'></div>
                        }
                        


                        <div className='secboxdash'>
                            <div onClick={fstpop} className='secboxdash1'>
                                <div className='divicon'>
                                    <FireIcon style={{width:'30px', color:'rgba(14, 108, 231, 0.74)'}} />
                                </div>
                                <p>View missions</p>
                                <ChevronRightIcon className='iconfr' style={{width:'22px'}}/>
                            </div>

                            <div onClick={secpop} className='secboxdash1'>
                                <div className='divicon'>
                                    <GiftIcon style={{width:'30px', color:'goldenrod'}} />
                                </div>
                                <p>Claim CAi point</p>
                                <ChevronRightIcon className='iconfr' style={{width:'22px'}}/>
                            </div>
                        </div>


                        

















                        {/* display timer */}
                        {
                            pop2 ?
                            <div className='dashbodpop'>
                                <div className='dashpop' >
                                    <MinusIcon style={{width:'50px'}} />
                                    <h3>Daily Rewards</h3>
                                    <div className='warn'>
                                        <ExclamationTriangleIcon style={{width:'20px'}}/>
                                        <small>Claim +100 CAi points daitly.</small>
                                    </div>

                                <div className='timeclaimer'>
                                    {
                                        !check  ?
                                        <p>{hours} : {minutes} : {seconds}</p>
                                        :
                                        <h1>claim daily CAi point +100 !!!🎁</h1>
                                    }

                                    {
                                        !check || targetDate ?

                                        <button className='claimerbtn2'>Waiting...</button>
                                            :
                                        <button onClick={claimbtn} className='claimerbtn'>Claim</button>

                                    }
                                </div>

                                </div>
                                <div className='closser' onClick={secpop}></div>
                            </div>
                        :
                        null
                        }

                        {/* display misions */}
                        {
                            pop1 ?
                            <div className='dashbodpop'>
                                <div className='dashpop' >
                                    <MinusIcon style={{width:'50px'}} />
                                    <h3>Missions</h3>
                                    <div className='warn'>
                                        <ExclamationTriangleIcon style={{width:'20px'}}/>
                                        <small>Complete a mission and get +100 CAi points</small>
                                    </div>

                                    <div className='secboxdash1'>
                                        <div className='twt'></div>
                                        <div>
                                            <p>Follow us on Twitter</p>
                                            {
                                            info?.userinfo.fst === true ?
                                            <small style={{color:'green'}}>Completed</small>
                                                :
                                            <small>Pending</small>
                                            }
                                        </div>
                                        {
                                            info?.userinfo.fst === true ?
                                            null
                                            :
                                        <button onClick={fstclick} className='bttn'>start</button>
                                        }
                                    </div>

                                    <div className='secboxdash1'>
                                        <div className='tel'></div>
                                        <div>
                                            <p>Join Telegram group</p>
                                            {
                                            info?.userinfo.sec === true ?
                                            <small style={{color:'green'}}>Completed</small>
                                                :
                                            <small>Pending</small>
                                            }
                                        </div>
                                        {
                                            info?.userinfo.sec === true ?
                                            null
                                            :
                                        <button onClick={secclick} className='bttn'>start</button>
                                        }
                                    </div>

                                    <div className='secboxdash1'>
                                        <div className='lik'></div>
                                        <div>
                                            <p>Like & Comment</p>
                                            {
                                            info?.userinfo.trd === true ?
                                            <small style={{color:'green'}}>Completed</small>
                                                :
                                            <small>Pending</small>
                                            }
                                        </div>
                                        {
                                            info?.userinfo.trd === true ?
                                            null
                                            :
                                            <button onClick={trdclick} className='bttn'>start</button>
                                        }
                                    </div>

                                    <div className='secboxdash1'>
                                        <div className='rtw'></div>
                                        <div>
                                            <p>Retweet</p>
                                            {
                                            info?.userinfo.frt === true ?
                                            <small style={{color:'green'}}>Completed</small>
                                                :
                                            <small>Pending</small>
                                            }
                                        </div>
                                        {
                                            info?.userinfo.frt === true ?
                                            null
                                            :
                                            <button onClick={frtclick} className='bttn'>start</button>
                                        }
                                    </div>

                                </div>
                                <div className='closser' onClick={fstpop}></div>
                            </div>
                        :
                        null
                        }

                        {/* display transactions */}
                        {
                            pop3 ?
                            <div className='dashbodpop'>
                                <div className='dashpop' >
                                    <MinusIcon style={{width:'50px'}} />
                                    <h3>Transactions</h3>
                                    <div className='warn'>
                                        <ExclamationTriangleIcon style={{width:'20px'}}/>
                                        <small>All Transactions to this account will be displayed here</small>
                                    </div>

                                <div className='transslips'>
                                { userr ?
                                        Object.keys(userr).length !== 0 ?
                                            Object.entries(userr)?.sort((a,b)=>b[1]?.uploaded?.time - a[1]?.uploaded?.time ).map((frnd)=>(
                                                <Slipbars key={userr[0]}  frnds={frnd} />
                                            ))
                                            :
                                            <div className='emptcont'>
                                                <p>No transaction available</p>
                                            </div>
                                        :
                                        null
                                    }
                                </div>

                                </div>
                                <div className='closser' onClick={trdpop}></div>
                            </div>
                        :
                        null
                        }

                    </div>

                    {
                        menu ?
                        <div className='mobbarpop' data-aos ='fade-left'>
                        <div className='mobsidebar' data-aos ='fade-left'>
                            <div className='mobsidebarhd fstmobbox' onClick={viewprof}>
                                <div></div>
                                <div className="h-16 w-16 rounded-full border-2 border-white">
                                    <Image alt='' width="400" height="400"  className="h-full w-full rounded-full object-cover" src={avatar} />
                                </div>
                                {
                                    !publicKey  ?
                                        <p>connect wallet</p>
                                    :
                                        <p className="font-semibold " style={{fontSize:'12px'}}>
                                        { truncate(`${publicKey?.toString()}`)}
                                        </p>
                                }
                            </div>

                            <div className='mobsidebarhd'>
                                <div className='mobicons'>
                                    <QueueListIcon style={{width:'26px'}}/>
                                    <small>Dashboard</small>
                                </div>
                                <div className='mobicons'>
                                    <UserIcon style={{width:'26px'}} />
                                    <small>About</small>
                                </div>
                                <div className='mobicons'>
                                    <ExclamationCircleIcon style={{width:'26px'}}/>
                                    <small>FAQs</small>
                                </div>
                            </div>

                            <div className='mobsidebarhd'>
                                <div className='mobwalletbxbtn'>
                                    <WalletMultiButton className='mobbxx1'>
                                        <p className='pxx'>
                                            {publicKey ? '' : <ClockIcon style={{width:'26px'}}/>}
                                            {publicKey ? '' : 'connect'}
                                        </p>
                                    </WalletMultiButton>
                                </div>

                                {
                                    publicKey ?
                                    <div className='mobwalletbxbtn1' onClick={onNewTransaction}>
                                        <PaperAirplaneIcon style={{width:'26px', color:'rgb(180, 100, 245)'}}/>
                                        <p>Deposit</p>
                                    </div>
                                    :
                                    <div className='mobwalletbxbtn1 emptnull'>
                                        <PaperAirplaneIcon style={{width:'26px', color:'rgb(180, 100, 245)'}}/>
                                        <p>Deposit</p>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='sidebarcloser' onClick={menuclick}></div>
                    </div>
                    :
                    null
                    }
                </div>
                :
                <Loader/>
            }
        </>
    )
}

export default Homebod
