import { createContext, useContext } from 'react';
import { WalletContextType } from '../../types/context.types';

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletContext = createContext<WalletContextType | undefined>(undefined);