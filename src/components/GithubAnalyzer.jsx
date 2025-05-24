import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaStar, FaCalendarAlt } from 'react-icons/fa';

const GithubAnalyzer = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGitHubData = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('User not found');
      const userData = await userRes.json();
      setProfile(userData);

      // Fetch user repositories
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
      const reposData = await reposRes.json();
      setRepos(reposData);

      // Fetch commit activity (this requires authentication for higher rate limits)
      const commitsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
      const commitsData = await commitsRes.json();
      
      // Filter push events and extract commits
      const userCommits = commitsData
        .filter(event => event.type === 'PushEvent')
        .flatMap(event => event.payload.commits.map(commit => ({
          ...commit,
          repo: event.repo.name,
          date: event.created_at
        })));
      
      setCommits(userCommits.slice(0, 3)); // Get top 10 recent commits

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchGitHubData();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12  px-4">
      <div className="min-h-screen  max-w-6xl mx-auto py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
        >
          <h1 className="text-4xl font-bold mb-8 text-primary flex items-center gap-3">
            <FaGithub className="text-purple-500" />
            GitHub Profile Analyzer
          </h1>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-8">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {profile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Profile Section */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={profile.avatar_url}
                  alt={profile.name || username}
                  className="w-32 h-32 rounded-full border-2 border-purple-500"
                />
                <div>
                  <h2 className="text-2xl font-bold">{profile.name || username}</h2>
                  <p className="text-gray-400 mb-2">{profile.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <FaCodeBranch className="text-gray-400" />
                      {profile.public_repos} repositories
                    </span>
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      {profile.followers} followers
                    </span>
                  </div>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                  >
                    View Profile
                  </a>
                </div>
              </div>

              {/* Repositories Section */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaCodeBranch />
                  Recent Repositories
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map(repo => (
                    <motion.div
                      key={repo.id}
                      whileHover={{ y: -5 }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/30 transition-all"
                    >
                      <h4 className="font-bold mb-1 truncate">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-purple-400"
                        >
                          {repo.name}
                        </a>
                      </h4>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {repo.description || 'No description'}
                      </p>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCodeBranch className="text-blue-400" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Commits Section */}
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaCalendarAlt />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {commits.length > 0 ? (
                    commits.map((commit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800/30 border border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-purple-400">
                            {commit.repo.split('/')[1]}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(commit.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-1">
                          {commit.message.length > 100 
                            ? `${commit.message.substring(0, 100)}...` 
                            : commit.message}
                        </p>
                        <a
                          href={`https://github.com/${commit.repo}/commit/${commit.sha}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-400 hover:text-purple-400"
                        >
                          View commit
                        </a>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400">No recent commit activity found</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GithubAnalyzer;