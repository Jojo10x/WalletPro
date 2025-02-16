import React, { useState } from 'react';
import { useWalletOperations } from '../../hooks/useWalletOperations';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { ErrorMessage } from '../common/ErrorMessage';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { useWallet } from '../../contexts/wallet';

export const DepositForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { deposit, error } = useWalletOperations();
  const [isSuccess, setIsSuccess] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState<number | null>(null);
  const { refreshTransactions, updateBalance, balance } = useWallet();
  const [validationError, setValidationError] = useState<string>('');
  
  const MIN_DEPOSIT = 1.00;
  const MAX_DEPOSIT = 100000;
  
  const validateAmount = (value: string): boolean => {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      setValidationError('Please enter a valid amount');
      return false;
    }
    
    if (numValue < MIN_DEPOSIT) {
      setValidationError(`Minimum deposit amount is $${MIN_DEPOSIT}`);
      return false;
    }
    
    if (numValue > MAX_DEPOSIT) {
      setValidationError(`Maximum deposit amount is $${MAX_DEPOSIT.toLocaleString()}`);
      return false;
    }
    
    setValidationError('');
    return true;
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (value) {
      validateAmount(value);
    } else {
      setValidationError('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAmount(amount)) {
      setIsConfirmModalOpen(true);
    }
  };
  
  const handleConfirmDeposit = async () => {
    const success = await deposit({
      amount: parseFloat(amount),
    });
    
    if (success) {
      setDepositedAmount(parseFloat(amount));
      
      const newBalance = balance + parseFloat(amount);
      updateBalance(newBalance);
      
      await refreshTransactions();
      
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
            onChange={handleAmountChange}
            placeholder="Amount to deposit"
            min={MIN_DEPOSIT}
            max={MAX_DEPOSIT}
            step="0.01"
            required
            className="w-full"
            label={''}
          />
          <p className="text-sm text-gray-500 mt-1 text-center">
            Min: ${MIN_DEPOSIT} - Max: ${MAX_DEPOSIT.toLocaleString()}
          </p>
        </div>
        {validationError && <ErrorMessage message={validationError} />}
        {error && <ErrorMessage message={error} />}
        {isSuccess && depositedAmount !== null && (
          <div className="text-green-600 font-medium">
            Successfully added ${depositedAmount.toFixed(2)} to your account!
          </div>
        )}
        <Button 
          type="submit" 
          className="w-full"
          disabled={!!validationError || !amount}
        >
          Add Money
        </Button>
      </form>
      
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDeposit}
        title="Confirm Deposit"
        description={`Are you sure you want to deposit $${parseFloat(amount).toLocaleString()} to your account?`}
        confirmText="Confirm Deposit"
      />
    </>
  );
};