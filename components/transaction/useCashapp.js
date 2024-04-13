import React,{ useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey, Keypair, clusterApiUrl } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { db } from '../../pages/firebase'
import { selectUser } from '../../pages/store/userSlice'
import { useSelector } from 'react-redux';
import { selectinfo } from '../../pages/store/infoSlice'
import { toast } from 'react-toastify'
import { Timestamp, doc, updateDoc } from 'firebase/firestore'


export const useCashapp = () => {
    const user = useSelector(selectUser)
    const info = useSelector(selectinfo)

    const [amount, setAmount] = useState(0);
    const [receiver, setReceiver] = useState('4EJ8PE36mFH8gVYEFy2dFyJVTgULWZoFYyxu68kxA64m');
    const [transactionPurpose, setTransactionPurpose] = useState('');

    const { connected, publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [trasachash, settransachash] = useState('')
    const [err, seterr] = useState('')

    const makeTransaction = async (fromWallet, toWallet, amount, reference) => {
        const network = WalletAdapterNetwork.Devnet;
        const endpoint = clusterApiUrl(network);
        const connection = new Connection(endpoint);

        const blockhash = await connection.getLatestBlockhash('finalized');

        const transaction = new Transaction({
            recentBlockhash: blockhash.blockhash,
            feePayer: fromWallet,
        });

        const transferInstruction = SystemProgram.transfer({
            fromPubkey: fromWallet,
            lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
            toPubkey: toWallet,
        });

        transferInstruction.keys.push({
            pubkey : reference,
            isSigner : false,
            isWritable : false,
        })

        transaction.add(transferInstruction);

        return transaction;
    };

    const doTransaction = async ({ amount, receiver }) => {

        var fst = Math.floor(Math.random() * 10);
        var sec = Math.floor(Math.random() * 10);
        var trd = Math.floor(Math.random() * 10);
        var frt = Math.floor(Math.random() * 10);
        var fif = Math.floor(Math.random() * 10);

        var rand = fst + '' + sec + trd + frt + fif

        const fromWallet = publicKey;
        const toWallet = new PublicKey(receiver);
        const bnAmount = new BigNumber(amount);
        const reference = Keypair.generate().publicKey;
        const transaction = await makeTransaction(fromWallet, toWallet, bnAmount, reference);

        try {
            const txhash = await sendTransaction(transaction, connection);
            settransachash(`${txhash}`)
                await updateDoc(doc(db, 'user', user?.uid),{
                    balance : parseFloat(info?.userinfo.balance )+ parseFloat(amount)
                })
        
                    await updateDoc(doc(db, 'upload', user?.uid),{
                        [rand + 'uploaded']:{
                            amount : amount,
                            time : Timestamp.now(),
                            uid : rand,
                        }
                    })
                toast.success('transaction complete')
                window.location.reload()
                
            } catch (error) {
                console.error("Error sending transaction:", error);
                toast.error('something went wrong')
                window.location.reload()
        }

       
    };

    return {
        connected,
        publicKey,
        doTransaction,
        amount,
        err,
        setAmount,
        receiver,
        setReceiver,
        transactionPurpose,
        setTransactionPurpose,
        trasachash
    };
};
