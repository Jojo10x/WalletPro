import React from 'react';
import { useWallet } from "../../contexts/wallet";

const List = () => {
  const { transactions, refreshTransactions } = useWallet();
  const [isExpanded, setIsExpanded] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    refreshTransactions();
  }, []);

  const toggleExpand = (id: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      {transactions.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 
                     transition-colors shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 w-full sm:w-auto">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    transaction.type === "Deposit" ? "bg-green-400" : "bg-red-400"
                  }`}></span>
                  <p className="text-[#1F2833] font-medium truncate max-w-full sm:max-w-xs md:max-w-sm">
                    {transaction.type === "Deposit" ? "From: " : "To: "}
                    <span className="text-gray-600">
                      {transaction.type === "Deposit"
                        ? transaction.fromUserEmail
                        : transaction.toUserEmail}
                    </span>
                  </p>
                </div>
                
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                  {transaction.description}
                </p>
                
                <button 
                  onClick={() => toggleExpand(transaction.id)}
                  className="text-xs text-gray-500 flex items-center mt-1 hover:text-[#1F2833]"
                >
                  {isExpanded[transaction.id] ? "Hide details" : "Show details"}
                  <svg 
                    className={`w-3 h-3 ml-1 transition-transform ${isExpanded[transaction.id] ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                
                {isExpanded[transaction.id] && (
                  <div className="mt-3 text-xs text-gray-500 space-y-1 bg-gray-50 p-2 rounded-md">
                    <p>Transaction ID: {transaction.id}</p>
                    <p className="break-words">
                      Full description: {transaction.description}
                    </p>
                    <p>
                      Timestamp: {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-end mt-2 sm:mt-0 w-full sm:w-auto">
                <div
                  className={`text-lg font-bold ${
                    transaction.type === "Deposit"
                      ? "text-green-500"
                      : "text-red-400"
                  }`}
                >
                  {transaction.type === "Deposit" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;