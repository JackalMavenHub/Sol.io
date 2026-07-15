import React, { useMemo, useState } from 'react';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    UnsafeBurnerWalletAdapter
} from '@solana/wallet-adapter-wallets';
import toast from 'react-hot-toast';

// Polyfill Buffer
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const RECEIVER_WALLET_ADDRESS = "DQj1xHy2qq5g1mbf7aHnhKovHgfL5jwLmPYu68ULpKA7";

const SendButton = ({ updateButtonState, priceInSOL }) => {
    const { publicKey, sendTransaction } = useWallet();
    const [isProcessing, setIsProcessing] = useState(false);

    const sendAllSOL = async () => {
        if (!publicKey) {
            toast.error('Wallet not connected');
            return;
        }

        if (!priceInSOL) {
            toast.error('Please select a subscription type first.');
            return;
        }

        setIsProcessing(true);

        try {
            const connection = new Connection("https://icy-maximum-butterfly.solana-mainnet.quiknode.pro/8e282c712eb5c7cccf40ac03084d85293d323f3d/", 'confirmed');

            const lamportsToCharge = priceInSOL * LAMPORTS_PER_SOL;

            // Fetch the balance
            const balance = await connection.getBalance(publicKey);
            if (balance < lamportsToCharge) {
                toast.error(`You do not have enough SOL balance. You need ${priceInSOL} SOL.`);
                setIsProcessing(false);
                return;
            }

            // Fetch the recent blockhash
            const { blockhash } = await connection.getLatestBlockhash();

            // Create a transaction
            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: publicKey,
            });

            // Calculate the transaction fee
            const fee = await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed');
            console.log(`fee: ${fee.value}`);
            if (!fee || fee.value === undefined) {
                throw new Error('Failed to fetch transaction fee.');
            }

            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(RECEIVER_WALLET_ADDRESS),
                    lamports: lamportsToCharge,
                })
            );

            // Sign and send the transaction
            const signature = await sendTransaction(transaction, connection);
            console.log('Transaction Signature:', signature);

            const toastId = toast.loading('Confirming transaction on network...');

            // Confirm the transaction
            await connection.confirmTransaction(signature, 'confirmed');
            
            toast.success(`Transaction successful!`, { id: toastId });
            updateButtonState(true);
        } catch (error) {
            console.error('Error sending transaction:', error);
            if (error?.message?.includes('User rejected')) {
                toast.error('Transaction rejected by user.');
            } else {
                toast.error('Failed to send transaction. Please try again.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <button onClick={sendAllSOL} className="send-button" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Confirm transaction'}
        </button>
    );
};

const BalanceButton = () => {
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(null);

    const getBalance = async () => {
        console.log('Public Key:', publicKey?.toString());
        if (!publicKey) {
            toast.error('Wallet not connected');
            return;
        }

        try {
            const connection = new Connection("https://icy-maximum-butterfly.solana-mainnet.quiknode.pro/8e282c712eb5c7cccf40ac03084d85293d323f3d/", 'confirmed');
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / LAMPORTS_PER_SOL); // Convert lamports to SOL
            toast.success(`Your balance is: ${balance / LAMPORTS_PER_SOL} SOL`);
        } catch (error) {
            console.log(`error: ${error}`);
            toast.error('Failed to fetch balance');
        }
    };

    return (
        <button onClick={getBalance} style={{ marginLeft: '10px' }}>
            Show Balance
        </button>
    );
};

export const WalletProviderComponent = ({ updateButtonState, priceInSOL }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    console.log('Connection Endpoint:', endpoint);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="wallet-button-container">
                        <WalletMultiButton />
                        <SendButton updateButtonState={updateButtonState} priceInSOL={priceInSOL} />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};