import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiDocker } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'React', icon: <FaReact size={50} className="text-primary" /> },
    { name: 'Node.js', icon: <FaNodeJs size={50} className="text-primary-hover" /> },
    { name: 'JavaScript', icon: <SiJavascript size={50} className="text-accent" /> },
    { name: 'TypeScript', icon: <SiTypescript size={50} className="text-primary" /> },
    { name: 'Python', icon: <FaPython size={50} className="text-accent" /> },
    { name: 'MongoDB', icon: <SiMongodb size={50} className="text-primary" /> },
    { name: 'SQL', icon: <FaDatabase size={50} className="text-accent" /> },
    { name: 'Docker', icon: <SiDocker size={50} className="text-primary" /> },
  ];

  const noCodeTools = [
    {
      name: 'Zapier',
      description: 'Automation & Integration'
    },
    {
      name: 'FlutterFlow',
      description: 'Mobile App Development'
    },
    {
      name: 'Webflow',
      description: 'Web Design & CMS'
    },
    {
      name: 'Zoho',
      description: 'Business Solutions'
    },
    {
      name: 'Airtable',
      description: 'Database & Workflow'
    },
    {
      name: 'Adalo',
      description: 'Mobile App Builder'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-primary">Skills & Technologies</h2>
            <p className="text-accent max-w-2xl mx-auto">
              A collection of technologies and tools I work with to build modern web applications.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-700/50 hover:border-primary/50 border-2 border-transparent transition-all duration-300 flex flex-col items-center justify-center"
              >
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-lg font-medium text-gray-200">{skill.name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-primary">No-Code Expertise</h3>
            <h4 className="text font-semibold mb-5 text-orange-600">No-code tools if you find i'm not good at coding </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {noCodeTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="transition-all duration-300 group-hover:-translate-y-1">
                    <h4 className="text-lg font-semibold text-accent mb-1">{tool.name}</h4>
                    <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {tool.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-primary">Additional Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Git', 'REST APIs', 'GraphQL', 'AWS', 'CI/CD', 'Agile', 'Testing', 'UI/UX'].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-800/50 backdrop-blur-sm px-5 py-2.5 rounded-lg text-accent text-sm hover:bg-gray-700/50 hover:border-primary/50 border-2 border-transparent transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;