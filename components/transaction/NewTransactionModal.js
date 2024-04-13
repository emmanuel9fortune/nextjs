import Modal from '../Modal'
import { useCashapp } from './useCashapp'


const NewTransactionModal = ({ modalOpen, setModalOpen }) => {

    const {doTransaction, amount, setAmount, receiver, setReceiver, transactionPurpose, setTransactionPurpose, err} = useCashapp()

   

    const onPay = async () => {
        
        // Pay and add transaction funcationallity goes here!
        await doTransaction({amount, receiver, transactionPurpose})
        
        
        // Clear states
        setAmount(0)
        setReceiver("")
        setTransactionPurpose("")
    }

    

    

    const onAmountInput = (e) => {
        e.preventDefault()
        const newAmount = e.target.value

        setAmount(newAmount)

        const input = document.querySelector('input#amount')
        input.style.width = newAmount.length + 'ch'
    }

    

    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="relative flex flex-col items-center justify-center space-y-8">
                <div className="flex items-center justify-center text-center text-7xl font-semibold text-[#512da8]">
                    <input style={{backgroundColor:'transparent', borderBottom:'1px solid grey', height:'45px', paddingBottom:'5px', color:'white', fontSize:'25px', width:
                    '3em'}} className="w-12 outline-none" id="amount" name="amount" type="number" value={amount} onChange={onAmountInput} min={0} />
                    <label style={{fontSize:'25px'}} htmlFor="amount">SOL</label>
                </div>

                <div className="flex w-full flex-col space-y-2">
                    <div className="flex rounded-lg border border-gray-200 p-4">
                        <label className="text-gray-300" htmlFor="receiver">
                            To:
                        </label>
                        <input   style={{backgroundColor:'transparent'}} className="w-full pl-2 font-medium text-gray-600 placeholder-gray-300 outline-none" id="receiver" name="receiver" type="text" placeholder="Enter Wallet Address" value={'4EJ8PE36mFH8gVYEFy2dFyJVTgULWZoFYyxu68kxA64m'} onChange={(e) => setReceiver(e.target.value)} disabled />
                    </div>
                </div>

                <div className="flex w-full space-x-1">
                    {amount > 0  ?
                    <button onClick={onPay} style={{backgroundColor:'white', color:'black'}} className="w-full rounded-lg  py-3 px-12 hover:bg-opacity-70">
                        Deposit
                    </button>
                    :
                    <button style={{backgroundColor:'grey', color:'black'}} className="w-full rounded-lg  py-3 px-12 hover:bg-opacity-70">
                        Deposit
                    </button>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default NewTransactionModal
