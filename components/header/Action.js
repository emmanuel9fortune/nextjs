import {PaperAirplaneIcon} from '@heroicons/react/24/outline'

const Action = ({ setModalOpen, publickey }) => {
    const onNewTransaction = () => {
        setModalOpen(true)
    }
 
    return (
        <div style={{width:'100%', alignItems:'center', justifyContent:'center', display:'flex'}}>
            { publickey !== null?
                <button onClick={onNewTransaction} className="depbtn">
                    <PaperAirplaneIcon style={{width:'32px', color:'rgb(180, 100, 245)'}}/>
                    <span className="font-medium ">Deposit</span>
                </button>
                :
                <button className="depbtn emptnull">
                    <PaperAirplaneIcon style={{width:'32px', color:'rgb(180, 100, 245)'}}/>
                    <span className="font-medium ">Deposit</span>
                </button>
            }
        </div>
    )
}

export default Action
