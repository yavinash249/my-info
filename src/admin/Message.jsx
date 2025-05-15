import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getSession } from './auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const session = await getSession();
        if (!session) {
          navigate('/admin/login');
          return;
        }

        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError('Failed to fetch messages. Please try again later.');
          console.error('Error fetching messages:', error);
        } else {
          setMessages(data || []);
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again later.');
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-primary text-xl">Loading messages...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-xl">{error}</div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-primary">Messages</h1>
        {messages.length === 0 ? (
          <p className="text-center text-accent text-lg">No messages found.</p>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border-2 border-transparent hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-xl text-primary">{message.name}</h3>
                  <span className="text-sm text-accent">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-300 mb-2">{message.email}</p>
                <p className="text-gray-400">{message.message}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Messages;