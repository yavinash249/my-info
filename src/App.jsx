import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './admin/AdminLogin';
import Messages from './admin/Message';
import AdminLayout from './admin/AdminLayout';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin login route - outside of protected layout */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/messages" replace />} />
            <Route path="messages" element={<Messages />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
