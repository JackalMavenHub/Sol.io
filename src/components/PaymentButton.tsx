import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import toast from 'react-hot-toast';

// Polyfill Buffer
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

const RECEIVER_WALLET_ADDRESS = "DQj1xHy2qq5g1mbf7aHnhKovHgfL5jwLmPYu68ULpKA7";

interface PaymentButtonProps {
    updateButtonState: (completed: boolean) => void;
    priceInSOL: number;
    disabled?: boolean;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({ updateButtonState, priceInSOL, disabled = false }) => {
    const { publicKey, sendTransaction } = useWallet();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission if inside a form
        
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

            const balance = await connection.getBalance(publicKey);
            if (balance < lamportsToCharge) {
                toast.error(`You do not have enough SOL balance. You need ${priceInSOL} SOL.`);
                setIsProcessing(false);
                return;
            }

            const { blockhash } = await connection.getLatestBlockhash();

            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: publicKey,
            });

            const fee = await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed');
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

            const signature = await sendTransaction(transaction, connection);
            const toastId = toast.loading('Confirming transaction on network...');

            await connection.confirmTransaction(signature, 'confirmed');
            
            toast.success(`Transaction successful!`, { id: toastId });
            updateButtonState(true);
        } catch (error: any) {
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
        <button 
            type="button" 
            onClick={handlePayment} 
            disabled={disabled || isProcessing}
            className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 border ${
                disabled || isProcessing 
                    ? 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-white/90 border-white active:scale-[0.98]'
            }`}
        >
            {isProcessing ? 'Processing...' : 'Confirm transaction'}
        </button>
    );
};
