import { useWallet } from "../../contexts/wallet";
import {
  LineChart,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "../../types/transaction.types";

interface MonthlyData {
  [month: string]: {
    incoming: number;
    outgoing: number;
  };
}

const Graphs = () => {
  const { transactions } = useWallet();
  const monthlyData = transactions.reduce<MonthlyData>(
    (acc, transaction: Transaction) => {
      const date = new Date(transaction.timestamp);
      const month = date.toLocaleString("default", { month: "short" });
      if (!acc[month]) {
        acc[month] = { incoming: 0, outgoing: 0 };
      }
      if (transaction.type === "Deposit") {
        acc[month].incoming += transaction.amount;
      } else {
        acc[month].outgoing += transaction.amount;
      }
      return acc;
    },
    {}
  );

  const chartData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    incoming: data.incoming,
    outgoing: data.outgoing,
  }));

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-slate-800 p-4">
        <h3 className="mb-3 text-base font-medium text-gray-200">
          Monthly Flow
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.375rem",
                  padding: "0.5rem",
                }}
                labelStyle={{ color: "#9CA3AF" }}
              />
              <Line
                type="monotone"
                dataKey="incoming"
                stroke="#34D399"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="outgoing"
                stroke="#F87171"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-slate-800 p-4">
        <h3 className="mb-3 text-base font-medium text-gray-200">
          Distribution
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.375rem",
                  padding: "0.5rem",
                }}
                labelStyle={{ color: "#9CA3AF" }}
              />
              <Bar dataKey="incoming" fill="#34D399" />
              <Bar dataKey="outgoing" fill="#F87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
