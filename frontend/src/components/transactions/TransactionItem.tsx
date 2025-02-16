import React from "react";
import { Transaction } from "../../types/transaction.types";
import { useAuth } from "../../hooks/useAuth";
import { ArrowDownLeft, ArrowUpRight, Mail, Clock } from "lucide-react";

interface Props {
  transaction: Transaction;
}

export const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const { user } = useAuth();
  const isIncoming = transaction.toUserEmail === user?.email;

  return (
    <div className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div
            className={`p-2 rounded-full shrink-0 ${
              isIncoming ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isIncoming ? (
              <ArrowDownLeft
                className={`w-5 h-5 ${
                  isIncoming ? "text-green-600" : "text-red-600"
                }`}
              />
            ) : (
              <ArrowUpRight
                className={`w-5 h-5 ${
                  isIncoming ? "text-green-600" : "text-red-600"
                }`}
              />
            )}
          </div>
          <div className="min-w-0 flex-1 sm:flex-none">
            <p
              className={`text-lg font-bold ${
                isIncoming ? "text-green-600" : "text-red-600"
              }`}
            >
              {isIncoming ? "+" : "-"}${transaction.amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">
              {transaction.description}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto sm:text-right">
          <div className="flex items-center sm:justify-end gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 shrink-0" />
            <span className="font-medium truncate max-w-[150px] sm:max-w-none">
              {isIncoming ? transaction.fromUserEmail : transaction.toUserEmail}
            </span>
          </div>
          <div className="flex items-center sm:justify-end gap-2 mt-1 text-sm text-gray-500">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-[150px] sm:max-w-none">
              {new Date(transaction.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};