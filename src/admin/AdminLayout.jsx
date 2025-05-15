import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSession, logoutAdmin } from './auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminLayout = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
// kuch nahi bas testing ke liye hai yeh line
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        setSession(session);
        if (!session) {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-primary text-xl">Loading...</div>
    </div>
  );
  
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">Admin Panel</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.nav>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;