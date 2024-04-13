import { truncate } from "../../utils/string"
import Image from 'next/image'

const Profile = ({ setModalOpen, avatar, publicKey }) => {
    const onProfileOpen = () => {
        setModalOpen(true)
    }
    return (
        <div onClick={onProfileOpen} className="flex cursor-pointer flex-col items-center space-y-3">
            <div className="h-16 w-16 rounded-full border-2 border-white">
                <Image alt=''  width="400" height="400"  className="h-full w-full rounded-full object-cover" src={avatar} />
            </div>
 
            <div style={{color:'white'}} className="flex flex-col items-center space-y-1">
                {
                    !publicKey ?
                    null
                    :
                    <small>wallet address</small>
                }
                {
                    !publicKey  ?
                       <p>no wallet connected</p>
                    :
                        <p className="font-semibold ">
                           { truncate(`${publicKey}`)}
                        </p>
                }

                {/* <p className="text-sm font-light italic text-gray-100">${}</p> */}
            </div>
        </div>
    )
}

export default Profile
