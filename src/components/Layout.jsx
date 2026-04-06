import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const username = localStorage.getItem('username');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/login');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Anime', path: '/anime', dropdown: [
      { name: 'Top Rated', path: '/top-anime' },
      { name: 'Discover', path: '/anime' }
    ]},
    { name: 'Movies', path: '/movies', dropdown: [
      { name: 'Top Rated', path: '/top-movies' },
      { name: 'Discover', path: '/movies' }
    ]},
  ];

  return (
    <div className="layout-root">
      {/* Premium Sticky Header */}
      <header className={`fixed-header ${isScrolled ? 'scrolled glass' : ''}`}>
        <div className="container header-content">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/">
              <span className="text-gold">ANIME</span><span className="text-white">VERSE</span>
            </Link>
          </motion.div>

          <nav className="desktop-nav">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.name} className="nav-item">
                  {link.dropdown ? (
                    <div className="dropdown-parent">
                      <span className="nav-link-text">{link.name} <i className="fas fa-chevron-down"></i></span>
                      <ul className="dropdown-menu glass">
                        {link.dropdown.map(d => (
                          <li key={d.path}><Link to={d.path}>{d.name}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link to={link.path} className={`nav-link-text ${location.pathname === link.path ? 'active' : ''}`}>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}

              {isLoggedIn ? (
                <>
                  <li className="nav-item dropdown-parent">
                    <span className="nav-link-text">Watchlists <span className="badge">New</span></span>
                    <ul className="dropdown-menu glass">
                      <li><Link to="/watchlist?tab=anime">Anime Collection</Link></li>
                      <li><Link to="/watchlist?tab=movie">Movie Collection</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn-logout">
                      Logout ({username})
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="btn-login glass">Login / Register</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content with Entrance Animation */}
      <main className="main-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="content-container container"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="footer-modern glass">
        <div className="container footer-grid">
           <div className="footer-brand">
              <span className="text-gold">ANIME</span>VERSE
              <p>Your premium gateway to the best Japanese animation and global cinema.</p>
           </div>
           <div className="footer-links">
             <Link to="/about-us">About</Link>
             <Link to="/community">Community</Link>
             <Link to="/terms">Terms</Link>
           </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2024 AnimeVerse. Crafted for the truly passionate.</p>
        </div>
      </footer>

      <style>{`
        .layout-root {
          padding-top: var(--header-height);
        }
        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          z-index: 1000;
          transition: var(--transition);
          display: flex;
          align-items: center;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo a {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: 2px;
        }
        .nav-list {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          align-items: center;
        }
        .nav-link-text {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-muted);
          transition: var(--transition);
          cursor: pointer;
        }
        .nav-link-text:hover, .nav-link-text.active {
          color: var(--accent);
        }
        .dropdown-parent {
          position: relative;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: var(--transition);
          list-style: none;
          padding: 1rem 0;
          margin-top: 1rem;
          border-radius: var(--radius-md);
        }
        .dropdown-parent:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown-menu a {
          display: block;
          padding: 0.75rem 1.5rem;
          font-size: 0.9rem;
        }
        .dropdown-menu a:hover {
          background: rgba(255, 215, 0, 0.1);
          color: var(--accent);
        }
        .btn-login {
          padding: 0.6rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          border: 1px solid var(--accent) !important;
          color: var(--accent) !important;
        }
        .btn-login:hover {
          background: var(--accent) !important;
          color: black !important;
        }
        .btn-logout {
          background: var(--primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
        }
        .main-viewport {
          min-height: calc(100vh - 300px);
          padding: 3rem 0;
        }
        .footer-modern {
          padding: 4rem 0 2rem;
          margin-top: 5rem;
        }
        .footer-brand h2 { font-size: 1.5rem; margin-bottom: 1rem; }
        .footer-grid { display: flex; justify-content: space-between; margin-bottom: 3rem; }
        .footer-links { display: flex; gap: 2rem; }
        .footer-bottom { border-top: 1px solid var(--glass-border); padding-top: 2rem; text-align: center; font-size: 0.85rem; color: var(--text-muted); }
        .badge { background: var(--primary); color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; margin-left: 5px; }
      `}</style>
    </div>
  );
}

export default Layout;
