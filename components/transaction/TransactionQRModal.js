import Modal from '../Modal'
import { truncate } from "../../utils/string"
import {ClipboardDocumentListIcon} from '@heroicons/react/24/outline'
import { selectinfo } from '../../pages/store/infoSlice';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../pages/firebase';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'



const TransactionQRModal = ({ modalOpen, setModalOpen, userAddress, avatar, ArrowLeftEndOnRectangleIcon }) => {

    const info = useSelector(selectinfo)

    const xrp1=()=>{
        navigator.clipboard.writeText(info?.userinfo.refcode)
        toast.info('copied')
    }

    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div >

                <div className="profilebox">
                    
                    <Image alt='' width="400" height="400"  className="profimg" src={avatar} />
                    
                    <small>Wallet address</small>
                    {
                        userAddress ?
                        <p > {truncate(`${userAddress}`)}</p>
                        :
                        <p>No wallet found</p>
                    }
                    <div className="prfwrts">
                       <p> Name : {info?.userinfo.name} </p>
                    </div>
                    <div className="prfwrts">
                        <p>Email : {info?.userinfo.email}</p>
                    </div>
                    <div className="prfwrts">
                        <p>UserName : {info?.userinfo.username}</p> 
                    </div>
                    <CopyToClipboard text={info?.userinfo.refcode} onCopy={xrp1}>
                        <div className="prfwrts"> 
                            <p>Ref. code : {info?.userinfo.refcode}</p>
                            <ClipboardDocumentListIcon style={{width:'25px'}}/>
                        </div>
                    </CopyToClipboard>
                    <div onClick={()=>signOut(auth)} className="prfwrts logoutprf">
                        <p>Logout</p>
                        {/* <ArrowLeftEndOnRectangleIcon style={{width:'25px'}}/> */}
                     </div>

                </div>
            </div>
        </Modal>
    )
}

export default TransactionQRModal
