import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import musicImg from "../assets/music.jpg"
import jobPortalImg from "../assets/job.jpg"
import galleryImg from "../assets/gallery.jpg"
// eslint-disable-next-line no-unused-vars
import { title } from 'framer-motion/client';
import playerImg from "../assets/PLAYER.jpg"
import mainImg from "../assets/main.jpg"

const Projects = () => {
  const projects = [
    {
      title: "Music school website",
      description: "Simple music school website made with next js and aceternity Ui.",
      image: musicImg, // Add your image path
      tags: ["next js", "shadcn", "axios"],
      githubUrl: "https://github.com/yavinash249/rinui",
      liveUrl: "https://rinui-vert.vercel.app/"
    },
    {
      title: "Job Portal",
      description: "A static job portal website to add and view job listings",
      image: jobPortalImg, // Add your image path
      tags: ["React", "Node.js", "json"],
      githubUrl: "https://github.com/yavinash249/job-portal",
      liveUrl: "https://job-portal-alpha-jade.vercel.app/"
    },
    {
      title: "Image gallery",
      description: "Build image gallery with react js and unsplash api",
      image: galleryImg, // Add your image path
      tags: ["Unsplash api", "react js", "Axios"],
      githubUrl: "https://github.com/yavinash249/Gallery",
      liveUrl: "https://gallery-nu-eight.vercel.app/"
    },
    {
      title:" Static playlist player",
      description: "A static youtube playlist player",
      image: playerImg,
      tags: ["React","vite"],
      githubUrl:"https://github.com/yavinash249/music-player-static",
      liveUrl: "https://music-player-static-alpha.vercel.app/"
    },
    {
      title: "Portfolio",
      description: "A portfolio website to showcase my projects and skills",
      image: mainImg,
      tags: ["React", "vite"],
      githubUrl: "https://github.com/yavinash249/my-info",
      liveUrl: "https://aksavinash.vercel.app/"
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
          <h2 className="text-4xl font-bold text-primary mb-4">Projects</h2>
          <p className="text-accent text-lg">Some of my recent work</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border-2 border-transparent hover:border-primary/30 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-accent bg-accent/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-primary transition-colors"
                  >
                    <FaGithub className="mr-2" />
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-primary transition-colors"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;