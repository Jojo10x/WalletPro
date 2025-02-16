import React, { useEffect } from "react";
import { useWalletOperations } from "../../hooks/useWalletOperations";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useWallet } from "../../contexts/wallet";
import { AlertCircle, Wallet } from "lucide-react";

export const WalletBalance: React.FC = () => {
  const { balance, isLoading } = useWallet();
  const { fetchBalance, error } = useWalletOperations();

  useEffect(() => {
    fetchBalance();
  }, []);

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Your Balance</h2>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-1">
            <p className="text-4xl font-bold text-green-600">
              ${balance.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">Available Balance</p>
          </div>
        )}
      </div>
    </div>
  );
};
