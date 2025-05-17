import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
// import LogoIcon from '../assets/letter-b.svg'
import LogoPng from '../assets/letter-b.png'; // Use your PNG file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled , setScrolled] = useState(false);

  useEffect(()=> {
    const handleScroll = () => {
      if(window.scrollY > 50){
        setScrolled(true);
      }else{
        setScrolled(false);
      }
    };
    window.addEventListener('scroll',handleScroll);
    return()=> window.removeEventListener('scroll',handleScroll);
  }, []);
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Projects', path: '/projects' },
    { title: 'Skills', path: '/skills' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full font-roboto  shadow-lg z-50 transition-all duration-300 ${scrolled ? 'bg-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center text-xl font-bold">
            <img src={LogoPng} alt="A" className="h-9 w-9 mr-2" />
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-11 flex  items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
