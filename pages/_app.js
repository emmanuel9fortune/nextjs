import dynamic from 'next/dynamic'
import Head from 'next/head'
import './index.css'
import '../styles/globals.css' 
import { Provider } from 'react-redux';
import {store} from './store/Store';
import React from 'react';


const WalletConnectionProvider = dynamic(()=> import('../context/WalletConnectionProvider'),{
    ssr : false
})

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/log.jpg" type="image/x-icon" />
                <title>Cat Ai</title>
            </Head>
                    <WalletConnectionProvider>
                        <React.StrictMode>
                            <Provider store={store}>
                                    <Component {...pageProps} />
                            </Provider>
                        </React.StrictMode>
                    </WalletConnectionProvider>
        </>
    )
}

export default MyApp
