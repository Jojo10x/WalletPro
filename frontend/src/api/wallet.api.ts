import axios from './axios';
import { WalletBalance, TransferRequest, DepositRequest, WithdrawRequest } from '../types/wallet.types';

export const getBalance = () => axios.get<WalletBalance>('/wallet/balance');
export const transferMoney = (data: TransferRequest) => axios.post('/wallet/transfer', data);
export const deposit = (data: DepositRequest) => axios.post('/wallet/deposit', data);
export const withdraw = (data: WithdrawRequest) => axios.post('/wallet/withdraw', data);
