import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="home-page"
    >
      {/* Hero Section */}
      <section className="hero-section text-center">
        <motion.h1 variants={itemVariants} className="hero-title">
          Explore Your <span className="text-gold">Universe</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="hero-subtitle">
          The ultimate destination for anime enthusiasts and cinephiles. Discover over 100+ curated titles.
        </motion.p>
        <motion.div variants={itemVariants} className="hero-actions">
           <Link to="/anime" className="btn-main glass">Browse Anime</Link>
           <Link to="/movies" className="btn-outline">Watch Movies</Link>
        </motion.div>
      </section>
      
      {/* Categories Grid */}
      <section className="categories-section">
        <motion.h2 variants={itemVariants} className="section-heading text-center">Featured Categories</motion.h2>
        <div className="categories-grid">
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="category-card anime-box glass glow-card"
          >
            <Link to="/anime">
              <div className="card-overlay">
                <h3>ANIME</h3>
                <p>Discover high-octane action and emotional storytelling.</p>
              </div>
              <img src="/animes.jpg" alt="Anime" className="card-bg-img" />
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="category-card movie-box glass glow-card"
          >
            <Link to="/movies">
              <div className="card-overlay">
                <h3>MOVIES</h3>
                <p>Experience the latest blockbusters and timeless classics.</p>
              </div>
              <img src="/movies.jpg" alt="Movie" className="card-bg-img" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="quote-section glass text-center">
        <motion.div variants={itemVariants}>
           <p className="quote-text">"Imagination is the only weapon in the war against reality."</p>
           <span className="quote-author">— AnimeVerse Community</span>
        </motion.div>
      </section>

      <style>{`
        .hero-section {
          padding: 8rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: radial-gradient(circle at center, rgba(139, 0, 0, 0.1) 0%, transparent 70%);
        }
        .hero-title {
          font-size: 5.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 2.5rem;
          text-transform: uppercase;
          width: 100%;
          max-width: 1000px;
        }
        .hero-subtitle {
          font-size: 1.4rem;
          color: var(--text-muted);
          max-width: 800px;
          margin: 0 auto 3rem;
        }
        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        .btn-main {
          background: var(--primary) !important;
          color: white !important;
          padding: 1.25rem 3rem;
          border-radius: 40px;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .btn-outline {
          border: 2px solid var(--accent);
          color: var(--accent);
          padding: 1.1rem 3rem;
          border-radius: 40px;
          font-weight: 700;
        }
        .btn-outline:hover { background: var(--accent); color: black; }

        .categories-section { padding: 8rem 0; }
        .section-heading { font-size: 3rem; margin-bottom: 4rem; }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 4rem;
        }
        .category-card {
          position: relative;
          height: 550px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }
        .card-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 80%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 3rem;
          text-align: left;
        }
        .card-overlay h3 { font-size: 3.5rem; color: var(--accent); margin-bottom: 1rem; }
        .card-overlay p { font-size: 1.1rem; color: var(--text-muted); }
        .category-card:hover .card-bg-img { transform: scale(1.1); filter: brightness(0.4); }

        .quote-section {
          padding: 5rem;
          border-radius: var(--radius-lg);
          margin-bottom: 5rem;
        }
        .quote-text { font-family: var(--font-heading); font-size: 2.2rem; font-style: italic; font-weight: 500; margin-bottom: 1rem; }
        .quote-author { color: var(--accent); font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }

        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
          .categories-grid { grid-template-columns: 1fr; }
          .category-card { height: 400px; }
        }
      `}</style>
    </motion.div>
  );
}

export default Home;
