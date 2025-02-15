import { useState } from 'react';
import * as walletApi from '../api/wallet.api';
import { TransferRequest, DepositRequest, WithdrawRequest } from '../types/wallet.types';
import { useWallet } from '../contexts/wallet';

export const useWalletOperations = () => {
  const { updateBalance, setIsLoading } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      const response = await walletApi.getBalance();
      updateBalance(response.data.balance);
      setError(null);
    } catch  {
      setError('Failed to fetch balance');
    } finally {
      setIsLoading(false);
    }
  };

  const transfer = async (data: TransferRequest) => {
    try {
      setIsLoading(true);
      await walletApi.transferMoney(data);
      await fetchBalance();
      setError(null);
      return true;
    } catch {
      setError('Transfer failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deposit = async (data: DepositRequest) => {
    try {
      setIsLoading(true);
      await walletApi.deposit(data);
      await fetchBalance();
      setError(null);
      return true;
    } catch  {
      setError( 'Deposit failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const withdraw = async (data: WithdrawRequest) => {
    try {
      setIsLoading(true);
      await walletApi.withdraw(data);
      await fetchBalance();
      setError(null);
      return true;
    } catch {
      setError( 'Withdrawal failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchBalance, transfer, deposit, withdraw, error };
};
