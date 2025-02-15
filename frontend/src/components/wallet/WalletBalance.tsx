import React, { useEffect } from 'react';
import { useWalletOperations } from '../../hooks/useWalletOperations';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useWallet } from '../../contexts/wallet';

export const WalletBalance: React.FC = () => {
  const { balance, isLoading } = useWallet();
  const { fetchBalance, error } = useWalletOperations();

  useEffect(() => {
    fetchBalance();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Your Balance</h2>
      <p className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</p>
    </div>
  );
};