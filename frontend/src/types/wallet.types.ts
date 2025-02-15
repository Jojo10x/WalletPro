export interface WalletBalance {
  balance: number;
}

export interface TransferRequest {
  toEmail: string;
  amount: number;
}

export interface DepositRequest {
  amount: number;
}

export interface WithdrawRequest {
  amount: number;
}