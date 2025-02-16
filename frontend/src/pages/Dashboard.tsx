import React from "react";
import { WalletProvider } from "../contexts/wallet/WalletContext";
import { WalletBalance } from "../components/wallet/WalletBalance";
import { TransferForm } from "../components/wallet/TransferForm";
import { DepositForm } from "../components/wallet/DepositForm";
import { TransactionList } from "../components/transactions/TransactionList";
import Navigation from "../components/common/Navigation";

export const Dashboard: React.FC = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <WalletBalance />
              <DepositForm />
              <TransferForm />
            </div>
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-4">
                Recent Transactions
              </h2>
              <div className="flex-grow">
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletProvider>
  );
};