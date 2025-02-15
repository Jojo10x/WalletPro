import React from 'react';
import { Transaction } from '../../types/transaction.types';
import { useAuth } from '../../hooks/useAuth';
interface Props {
  transaction: Transaction;
}

export const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const { user } = useAuth();
  const isIncoming = transaction.toUserEmail === user?.email;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">
            {isIncoming ? 'From: ' + transaction.fromUserEmail : 'To: ' + transaction.toUserEmail}
          </p>
          <p className="text-sm text-gray-500">{new Date(transaction.timestamp).toLocaleString()}</p>
        </div>
        <div className={`font-bold ${isIncoming ? 'text-green-600' : 'text-red-600'}`}>
          {isIncoming ? '+' : '-'}${transaction.amount.toFixed(2)}
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{transaction.description}</p>
    </div>
  );
};
