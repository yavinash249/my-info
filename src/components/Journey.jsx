import { motion } from 'framer-motion';
import { FaSatellite, FaCloud, FaCode } from 'react-icons/fa';

const Journey = () => {
  const journeySteps = [
    {
      year: '2023',
      title: 'CubeSat Startup',
      description: 'Started journey with satellite technology, working on CubeSat development .',
      icon: <FaSatellite className="text-accent text-4xl" />,
      image: 'https://media.istockphoto.com/id/1359474346/vector/nanosatellite-satellite-with-low-mass-and-size.jpg?s=612x612&w=0&k=20&c=gIRXf1bvaGiCNGmSLLrJBSBW_xrnOo5KXn258VGift0=', // Add your image path here
    },
    {
      year: '2024',
      title: 'Cloud Technology',
      description: 'By seeing market demandnow learning AWS and cloud architecture.',
      icon: <FaCloud className="text-primary text-4xl" />,
      image: 'https://www.saviantconsulting.com/images/blog/azure-vs-aws.jpg', // Add your image path here
    },
    {
      year: '2024',
      title: 'Web Development',
      description: 'Upskilling myself in modern web development with React, Node.js, and full-stack technologies.',
      icon: <FaCode className="text-accent text-4xl" />,
      image: 'https://www.sectorlink.com/img/blog/web-devel-important.jpg', // Add your image path here
    },
    {
      year: '2025',
      title: 'Trainee',
      description : 'Join wizcoder and learn about team collaboration and working in a team how they work and manage entire project.',
      icon: <FaCode className='text-amber-400 text-4xl'/>,
      image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ];

  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">My Journey</h2>
          <p className="text-accent text-lg">From Satellites to Web Development</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent opacity-20" />

          {journeySteps.map((step, index) => (
            <motion.div
              key={`${step.year}-${step.title}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex items-center mb-20 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className="w-1/2 px-8">
                <div className={`p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 border-transparent hover:border-primary/30 transition-all duration-300 ${
                  index % 2 === 0 ? 'text-right' : 'text-left'
                }`}>
                  <div className="text-accent font-bold text-xl mb-2">{step.year}</div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center z-10 transform hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Image */}
              <div className="w-1/2 px-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-48 rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 z-10" />
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Journey; 