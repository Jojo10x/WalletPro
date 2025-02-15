import React, { useState } from 'react';
import { useWalletOperations } from '../../hooks/useWalletOperations';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { ErrorMessage } from '../common/ErrorMessage';
import { ConfirmationModal } from '../common/ConfirmationModal';

export const DepositForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { deposit, error } = useWalletOperations();
  const [isSuccess, setIsSuccess] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState<number | null>(null); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDeposit = async () => {
    const success = await deposit({
      amount: parseFloat(amount),
    });

    if (success) {
      setDepositedAmount(parseFloat(amount)); 
      setAmount('');
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setDepositedAmount(null); 
      }, 3000); 
    }
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Add Money</h2>
        <div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to deposit"
            min="0.01"
            step="0.01"
            required
            className="w-full"
            label={''}
          />
        </div>
        {error && <ErrorMessage message={error} />}
        {isSuccess && depositedAmount !== null && ( 
          <div className="text-green-600 font-medium">
            Successfully added ${depositedAmount.toFixed(2)} to your account!
          </div>
        )}
        <Button type="submit" className="w-full">
          Add Money
        </Button>
      </form>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDeposit}
        title="Confirm Deposit"
        description={`Are you sure you want to deposit $${amount} to your account?`}
        confirmText="Confirm Deposit"
      />
    </>
  );
};