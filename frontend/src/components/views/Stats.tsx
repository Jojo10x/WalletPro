import { TrendingUp, TrendingDown, Users, Calendar } from "lucide-react";
import { useWallet } from "../../contexts/wallet";
import { Transaction } from "../../types/transaction.types";

interface StatsAccumulator {
  totalIncoming: number;
  totalOutgoing: number;
  contacts: Record<string, number>;
  days: Record<string, number>;
}

const Stats = () => {
  const { transactions } = useWallet();

  const stats = transactions.reduce<StatsAccumulator>(
    (acc, transaction: Transaction) => {
      if (transaction.type === "Deposit") {
        acc.totalIncoming += transaction.amount;
      } else {
        acc.totalOutgoing += transaction.amount;
      }
      const contact =
        transaction.type === "Deposit"
          ? transaction.fromUserEmail
          : transaction.toUserEmail;
      acc.contacts[contact] = (acc.contacts[contact] || 0) + transaction.amount;

      const day = new Date(transaction.timestamp).toLocaleDateString("en-US", {
        weekday: "long",
      });
      acc.days[day] = (acc.days[day] || 0) + 1;

      return acc;
    },
    {
      totalIncoming: 0,
      totalOutgoing: 0,
      contacts: {},
      days: {},
    }
  );

  const topContacts = Object.entries(stats.contacts)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5);

  const busiestDays = Object.entries(stats.days)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#00a63e]/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#00a63e]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Incoming</p>
              <p className="text-2xl font-bold text-[#00a63e]">
                ${stats.totalIncoming.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-400/10 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Outgoing</p>
              <p className="text-2xl font-bold text-red-400">
                ${stats.totalOutgoing.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#1F2833]" />
          <h3 className="text-lg font-medium text-[#1F2833]">Top Contacts</h3>
        </div>
        <div className="space-y-4">
          {topContacts.map(([email, amount]) => (
            <div
              key={email}
              className="flex justify-between items-center border-b border-gray-100 pb-2"
            >
              <span className="text-gray-700">{email}</span>
              <span className="text-gray-600">
                ${(amount as number).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#1F2833]" />
          <h3 className="text-lg font-medium text-[#1F2833]">
            Transaction Patterns
          </h3>
        </div>
        <div className="space-y-4">
          {busiestDays.map(([day, count]) => (
            <div
              key={day}
              className="flex justify-between items-center border-b border-gray-100 pb-2"
            >
              <span className="text-gray-700">{day}</span>
              <span className="text-gray-600">{count} transactions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
