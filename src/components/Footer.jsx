import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub size={20} />,
      url: 'https://github.com/yavinash249'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={20} />,
      url: 'https://www.linkedin.com/in/y-avinash-yadav/'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter size={20} />,
      url: 'https://x.com/YADAVAVINASH7'
    },
    {
      name: 'Email',
      icon: <HiMail size={20} />,
      url: 'mailto:y.avinash249@gmail.com'
    }
  ];

  return (
    <footer className="relative mt-20">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold text-primary mb-2">Avinash Yadav</h3>
            <p className="text-gray-400 text-sm">
              Building website with modern technologies
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <h4 className="text-accent font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
            <Link to="/"> Home </Link>
              {/* <a href="#home" className="text-gray-400 hover:text-primary transition-colors">Home</a> */}
             <Link to="/about"> About </Link>
             <Link to="/skills"> Skills </Link>
             <Link to="/projects"> Projects </Link>
             <Link to="/contact"> Contact </Link>
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4 className="text-accent font-semibold mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-primary transition-colors duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Avinash Yadav. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="mx-2 text-gray-600">•</span>
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
