import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider} from './contexts/auth/AuthContext';
import NotFound from './pages/NotFound';
import { Dashboard } from './pages/Dashboard';
import './index.css';
import AuthForm from './components/auth/AuthForm';
import { WalletProvider } from './contexts/wallet/WalletContext';
import { useAuth } from './hooks/useAuth';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <WalletProvider>
                  <Dashboard />
                </WalletProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <WalletProvider>
                  <Profile />
                </WalletProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default App;