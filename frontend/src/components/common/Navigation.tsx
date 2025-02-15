import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const goHome = () => {  
    navigate('/');
  }
  const goProfile = () => {
    navigate('/profile');
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-black hover:text-cyan-400 cursor-pointer" onClick={goHome}>WalletPro</div>
          <div className="flex items-center gap-1">
           <button onClick={goProfile} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
           <UserCircle size={30}/> 
           </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={30} />
            <span>Logout</span>
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;