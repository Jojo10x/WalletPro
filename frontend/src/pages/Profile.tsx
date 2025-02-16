import { useState } from "react";
import Navigation from "../components/common/Navigation";
import { useAuth } from "../hooks/useAuth";
import { User, Mail } from "lucide-react";
import { WalletBalance } from "../components/wallet/WalletBalance";
import Stats from "../components/views/Stats";
import Graphs from "../components/views/Graphs";
import List from "../components/views/List";

const Profile = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState("all");

  const renderContent = () => {
    switch (activeView) {
      case "graphs":
        return <Graphs />;
      case "stats":
        return <Stats />;
      default:
        return <List />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <User className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Welcome back
                </h2>
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <WalletBalance />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex divide-x divide-gray-200">
              <button
                onClick={() => setActiveView("all")}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors
                          ${
                            activeView === "all"
                              ? "bg-gray-100 text-[#00a63e]"
                              : "text-gray-500 hover:bg-gray-300 cursor-pointer hover:text-[#1F2833]"
                          }`}
              >
                All Transactions
              </button>
              <button
                onClick={() => setActiveView("graphs")}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors
                          ${
                            activeView === "graphs"
                              ? "bg-gray-100 text-[#00a63e]"
                              : "text-gray-500 hover:bg-gray-300 cursor-pointer hover:text-[#1F2833]"
                          }`}
              >
                Graphs
              </button>
              <button
                onClick={() => setActiveView("stats")}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors
                          ${
                            activeView === "stats"
                              ? "bg-gray-100 text-[#00a63e]"
                              : "text-gray-500 hover:bg-gray-00 cursor-pointer hover:text-[#1F2833]"
                          }`}
              >
                Statistics
              </button>
            </div>
          </div>

          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
