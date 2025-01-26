import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import Journey from './Journey';

const Home = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I&apos;m <span className="text-primary">Avinash Yadav</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-accent mb-8">
              Software Developer
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              I build exceptional and accessible digital experiences for the web.
            </p>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <FaGithub size={30} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <HiMail size={30} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Journey />
    </div>
  );
};

export default Home;