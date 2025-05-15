import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from './auth';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, error } = await loginAdmin(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin/messages');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleLogin} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border-2 border-transparent hover:border-primary/30 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Admin Login</h2>
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full bg-gray-700/50 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full bg-gray-700/50 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium"
            >
              Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;