import { Transaction } from "./transaction.types";

export interface WalletContextType {
  balance: number;
  updateBalance: (balance: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  transactions: Transaction[];
  refreshTransactions: () => Promise<void>;
}