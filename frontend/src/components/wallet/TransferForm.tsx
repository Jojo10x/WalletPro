import React, { useState } from "react";
import { useWalletOperations } from "../../hooks/useWalletOperations";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { ErrorMessage } from "../common/ErrorMessage";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { useWallet } from "../../contexts/wallet";

export const TransferForm: React.FC = () => {
  const [toEmail, setToEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { transfer, error } = useWalletOperations();
  const { refreshTransactions } = useWallet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmTransfer = async () => {
    const success = await transfer({
      toEmail,
      amount: parseFloat(amount),
    });

    if (success) {
      setToEmail("");
      setAmount("");
      await refreshTransactions();
    }
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Transfer Money</h2>
        <div>
        <Input
          type="email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          placeholder="Recipient's Email"
          required
          label={""}
        />
          <p className="text-sm text-gray-500 mt-1 text-center">
            Transfers can only be made to registered users
          </p>
          </div>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          min="0.01"
          step="0.01"
          required
          label={""}
        />
        {error && <ErrorMessage message={error} />}
        <Button type="submit"  className="w-full">Transfer</Button>
      </form>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmTransfer}
        title="Confirm Transfer"
        description={`Are you sure you want to transfer $${amount} to ${toEmail}?`}
        confirmText="Confirm Transfer"
      />
    </>
  );
};
