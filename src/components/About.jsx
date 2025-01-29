/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import { FaRocket, FaLightbulb, FaHeart } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: <FaRocket className="text-primary text-3xl" />,
      title: "Innovation Driven",
      description: "Passionate about exploring cutting-edge technologies and pushing boundaries in software development."
    },
    {
      icon: <FaLightbulb className="text-accent text-3xl" />,
      title: "Problem Solver",
      description: "From satellite engineering to web development, I bring a unique perspective to technical challenges."
    },
    {
      icon: <FaHeart className="text-primary text-3xl" />,
      title: "User Focused",
      description: "Committed to creating intuitive and accessible digital experiences that make a difference."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">About Me</h2>
          <p className="text-accent text-lg">My Journey in Technology</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="/src/assets/PROFILE.jpg" // Add your image path
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">
              From Satellites to Web Development
            </h3>
            <p className="text-gray-300 leading-relaxed">
              My journey began in after completing BCA and start small scale Sartup STAR Orbital for CubeSat development, where I honed my 
              problem-solving .While working on cubesat with team i learn about ardunio programming and circut board 
              desgin and atenna development. This help me to understand the how team work and solve the problem with collaboration.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Today, I learning and looking modern web technologies to create 
              efficient, scalable, and user-friendly applications. I also tried many no code tool so if im not
              good at coding atleast im still capable to make mark in industry.
            </p>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 border-transparent hover:border-primary/30 transition-all duration-300"
            >
              <div className="mb-4">{value.icon}</div>
              <h4 className="text-xl font-semibold text-accent mb-2">{value.title}</h4>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
