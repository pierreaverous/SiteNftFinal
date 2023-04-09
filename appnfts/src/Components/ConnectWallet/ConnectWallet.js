import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './ConnectWalletStyles.scss'

function ConnectWalletButton() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);

    async function connectWallet() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWeb3(new Web3(window.ethereum));
                setAccount(accounts[0]);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('No wallet detected');
        }
    }

    useEffect(() => {
        connectWallet();
    }, []);

    function handleConnect() {
        connectWallet();
    }

    return (
        <button className='connect' onClick={handleConnect}>
            {account ? 'wallet Connecté' : 'Connect Wallet'}
        </button>
    );
}

export default ConnectWalletButton;
