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

function TopMovies() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    api.getTopMovies().then(setTopMovies).catch(console.error);
  }, []);

  return (
    <div className="discovery-page">
      <section className="page-header">
        <h1 className="text-gold">Cinematic Hall of Fame</h1>
        <p className="subtitle">The highest grossing and most acclaimed movies of the decade.</p>
      </section>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid-container"
      >
        {topMovies.map((movie, index) => (
          <motion.div 
            key={movie.id} 
            whileHover={{ scale: 1.02 }}
            className="anime-card-modern glass ranking-card"
          >
            <div className="rank-tag" style={{background: '#8B0000', color: 'white'}}>#{index + 1}</div>
            <div className="card-top">
               <img src={`/${movie.top_movie_image}`} alt={movie.top_movie_name} className="card-img" />
            </div>
            <div className="card-body">
              <h3>{movie.top_movie_name}</h3>
              <p className="description">{movie.top_movie_description}</p>
              
              <div className="stats-row">
                 <div className="stat">
                    <span className="label">IMDb Rating</span>
                    <span className="value text-gold"><AnimatedCount finalCount={95} /> / 100</span>
                 </div>
                 <div className="stat">
                    <span className="label">Global Views</span>
                    <span className="value"><AnimatedCount finalCount={movie.like_count || 8500} />K+</span>
                 </div>
              </div>

              <Link to={movie.watchnow_link} target="_blank" className="btn-watch glass" style={{ borderColor: '#8B0000 !important' }}>
                 Experience Cinema
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .ranking-card { position: relative; border: 1px solid rgba(139, 0, 0, 0.2); overflow: hidden; height: 100%; display: flex; flex-direction: column; }
        .card-top { height: 450px; overflow: hidden; position: relative; width: 100%; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: var(--transition); }
        .ranking-card:hover .card-img { transform: scale(1.05); }
        .rank-tag {
          position: absolute;
          top: -15px;
          left: -15px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.2rem;
          border-radius: 50%;
          z-index: 10;
          box-shadow: 0 0 15px rgba(139, 0, 0, 0.3);
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

export default TopMovies;
