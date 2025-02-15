export interface Transaction {
  id: string;
  fromUserEmail: string;
  toUserEmail: string;
  amount: number;
  timestamp: string;
  type: string;
  description: string;
}