import React, { useEffect } from 'react';
import { TransactionItem } from './TransactionItem';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useWallet } from '../../contexts/wallet';

export const TransactionList: React.FC = () => {
  const { transactions, refreshTransactions, isLoading } = useWallet();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    refreshTransactions().catch(() => {
      setError('Failed to load transactions');
    });
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (transactions.length === 0) return <div>No transactions found</div>;

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};