import axios from './axios';
import { Transaction } from '../types/transaction.types';

export const getTransactions = () => axios.get<Transaction[]>('/wallet/transactions');
