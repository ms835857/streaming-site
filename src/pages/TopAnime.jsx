import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api';

const AnimatedCount = ({ finalCount }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let currentCount = 0;
    const increment = Math.max(1, Math.ceil(finalCount / 100));
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= finalCount) {
        currentCount = finalCount;
        clearInterval(interval);
      }
      setCount(currentCount);
    }, 20);
    return () => clearInterval(interval);
  }, [finalCount]);
  return <>{count.toLocaleString()}</>;
};

function TopAnime() {
  const [topAnime, setTopAnime] = useState([]);
  const isLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    api.getTopAnime().then(setTopAnime).catch(console.error);
  }, []);

  return (
    <div className="discovery-page">
      <section className="page-header">
        <h1 className="text-gold">Hall of Fame: Anime</h1>
        <p className="subtitle">The greatest masterpieces as ranked by the global community.</p>
      </section>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid-container"
      >
        {topAnime.map((anime, index) => (
          <motion.div 
            key={anime.id} 
            whileHover={{ scale: 1.02 }}
            className="anime-card-modern glass ranking-card"
          >
            <div className="rank-tag">#{index + 1}</div>
            <div className="card-top">
               <img src={`/${anime.top_anime_image}`} alt={anime.top_anime_name} className="card-img" />
            </div>
            <div className="card-body">
              <h3>{anime.top_anime_name}</h3>
              <p className="description">{anime.top_anime_description}</p>
              
              <div className="stats-row">
                 <div className="stat">
                    <span className="label">Likes</span>
                    <span className="value text-gold"><AnimatedCount finalCount={anime.like_count || 1200} /></span>
                 </div>
                 <div className="stat">
                    <span className="label">Views</span>
                    <span className="value">50K+</span>
                 </div>
              </div>

              <Link to={anime.watchnow_link} target="_blank" className="btn-watch glass">
                 Stream Masterpiece
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .ranking-card { position: relative; border: 1px solid rgba(255, 215, 0, 0.1); overflow: hidden; height: 100%; display: flex; flex-direction: column; }
        .card-top { height: 450px; overflow: hidden; position: relative; width: 100%; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: var(--transition); }
        .ranking-card:hover .card-img { transform: scale(1.05); }
        .rank-tag {
          position: absolute;
          top: -15px;
          left: -15px;
          width: 50px;
          height: 50px;
          background: var(--accent);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.2rem;
          border-radius: 50%;
          z-index: 10;
          box-shadow: 0 0 15px var(--accent-glow);
        }
        .stats-row {
          display: flex;
          justify-content: space-around;
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }
        .stat { display: flex; flex-direction: column; align-items: center; }
        .stat .label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); }
        .stat .value { font-weight: 800; font-size: 1.1rem; }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 3.5rem;
          padding-top: 2rem;
        }
      `}</style>
    </div>
  );
}

export default TopAnime;
