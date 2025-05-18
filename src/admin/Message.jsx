
// modify code for deleteing the message on supabase


import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getSession, deleteMessage } from './auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(null);
  const navigate = useNavigate();

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

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch messages');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Real-time subscription
    const subscription = supabase
      .channel('messages_changes')
      .on(
        'postgres_changes',
        { 
          event: '*',
          schema: 'public',
          table: 'messages'
        },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [navigate]);

  const handleDelete = async (messageId) => {
    setConfirmingDelete(messageId);
  };
 // delete message 
  const confirmDelete = async () => {
    try {
      setDeletingId(confirmingDelete);
      await deleteMessage(confirmingDelete);
      setMessages(messages.filter(msg => msg.id !== confirmingDelete));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
      setConfirmingDelete(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-xl max-w-md text-center">
        <p>{error}</p>
        <button
          onClick={fetchMessages}
          className="mt-4 px-4 py-2 bg-primary rounded hover:bg-opacity-80 transition"
        >
          Retry
        </button>
      </div>
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
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-primary/30 transition-all duration-300 relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-xl text-primary">{message.name}</h3>
                    <a 
                      href={`mailto:${message.email}`} 
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {message.email}
                    </a>
                  </div>
                  <span className="text-sm text-accent">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-6 whitespace-pre-line">{message.message}</p>
                
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => handleDelete(message.id)}
                    disabled={deletingId === message.id}
                    className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded text-sm flex items-center gap-1 transition-colors"
                  >
                    {deletingId === message.id ? (
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                    {deletingId === message.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Dialog */}
      {confirmingDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700"
          >
            <h3 className="text-xl font-bold mb-4 text-primary">Confirm Deletion</h3>
            <p className="mb-6 text-gray-300">Are you sure you want to delete this message? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmingDelete(null)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId === confirmingDelete}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition flex items-center gap-2"
              >
                {deletingId === confirmingDelete ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Messages;