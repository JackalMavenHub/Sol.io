import React, { useMemo, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { toast } from 'react-hot-toast';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';

// Default styles
require('@solana/wallet-adapter-react-ui/styles.css');

interface WalletContextProviderProps {
    children: ReactNode;
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
        ],
        []
    );

    const handleError = (error: any) => {
        console.error('Wallet connection error:', error);
        if (error.name === 'WalletNotReadyError') {
            toast.error('Please install a Solana wallet extension like Phantom or Solflare.');
        } else {
            toast.error(error.message ? error.message : 'An error occurred while connecting your wallet.');
        }
    };

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect onError={handleError}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
