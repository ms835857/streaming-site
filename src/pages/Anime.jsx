import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api';

function Anime() {
  const [animes, setAnimes] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allAnime, trendRes] = await Promise.all([
          api.getAnime(),
          api.getTrendingAnime()
        ]);
        setAnimes(allAnime.sort((a,b) => b.id - a.id));
        setTrending(trendRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToWatchlist = async (anime_id) => {
    try {
        const userId = localStorage.getItem('user_id') || 1;
        const res = await api.addToWatchlist(userId, anime_id, null);
        if (res.success) {
           alert("✨ Added to your watchlist!");
        } else {
           alert(res.message);
        }
    } catch(err) {
        console.error(err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="discovery-page">
      <section className="page-header">
        <h1 className="text-gold">Browse Anime</h1>
        <p className="subtitle">Discover {animes.length} hand-picked titles from around the world.</p>
      </section>

      <div className="discovery-layout">
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid-container"
        >
          {animes.map(anime => (
            <motion.div 
              key={anime.id} 
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="anime-card-modern glass glow-card"
            >
              <div className="card-top">
                <img src={`/${anime.anime_image_path}`} alt={anime.anime_title} className="card-img" />
                <div className="card-badge">{anime.anime_genre.split(',')[0]}</div>
              </div>
              <div className="card-body">
                <h3>{anime.anime_title}</h3>
                <p className="description">{anime.anime_discription}</p>
                <div className="meta-info">
                   <span><i className="far fa-calendar"></i> {anime.anime_releasedate.split('-')[0]}</span>
                   {isLoggedIn && (
                     <button 
                       onClick={() => addToWatchlist(anime.id)} 
                       className="icon-btn-watchlist" 
                       title="Add to Watchlist"
                     >
                        <i className="fas fa-plus"></i>
                     </button>
                   )}
                </div>
                <Link to={anime.watchnowlink} target="_blank" className="btn-watch glass">
                  Watch Now <i className="fas fa-play"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.main>

        <aside className="side-panel glass">
          <h2 className="panel-title text-gold">Trending Now</h2>
          <div className="trending-list">
            {trending.map(item => (
              <motion.div 
                key={item.trending_anime_rank} 
                whileHover={{ x: 5 }}
                className="trending-item"
              >
                <div className="rank">#{item.trending_anime_rank}</div>
                <img src={`/${item.trending_anime_image}`} alt={item.trending_anime_name} className="mini-thumb" />
                <div className="item-text">
                   <h4>{item.trending_anime_name}</h4>
                   <Link to={item.watch_nowlink} className="mini-link">Stream →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </aside>
      </div>

      <style>{`
        .page-header { margin-bottom: 4rem; text-align: center; }
        .page-header h1 { font-size: 3.5rem; }
        .discovery-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 3rem;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2.5rem;
        }
        .anime-card-modern {
          height: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
        }
        .card-top { position: relative; height: 380px; overflow: hidden; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: var(--transition); }
        .anime-card-modern:hover .card-img { transform: scale(1.1); filter: brightness(0.6); }
        .card-badge { position: absolute; top: 1rem; right: 1rem; background: var(--primary); color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
        .card-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .card-body h3 { font-size: 1.25rem; font-weight: 700; color: var(--text-gold); line-height: 1.2; height: 45px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .description { font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; height: 3.6rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .meta-info { display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 0.8rem; margin-top: 0.5rem; }
        .icon-btn-watchlist { width: 32px; height: 32px; border-radius: 50%; color: var(--accent); background: rgba(255, 215, 0, 0.1); border: 1px solid var(--accent); }
        .icon-btn-watchlist:hover { background: var(--accent); color: black; }
        .btn-watch { width: 100%; padding: 0.75rem; border-radius: var(--radius-md); text-align: center; font-weight: 700; font-size: 0.9rem; margin-top: 0.5rem; transition: var(--transition); border: 1px solid var(--primary) !important; color: white !important; }
        .btn-watch:hover { background: var(--primary) !important; color: white !important; }

        .side-panel { padding: 2rem; border-radius: var(--radius-lg); height: fit-content; sticky; top: 120px; }
        .panel-title { font-size: 1.5rem; margin-bottom: 2rem; text-align: center; }
        .trending-item { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--glass-border); }
        .rank { font-size: 1.2rem; font-weight: 900; color: rgba(255, 215, 0, 0.2); min-width: 40px; }
        .mini-thumb { width: 60px; height: 80px; object-fit: cover; border-radius: 4px; }
        .item-text h4 { font-size: 0.95rem; margin-bottom: 4px; }
        .mini-link { font-size: 0.8rem; color: var(--accent); font-weight: 600; }

        @media (max-width: 1024px) {
          .discovery-layout { grid-template-columns: 1fr; }
          .side-panel { order: -1; margin-bottom: 3rem; }
        }
      `}</style>
    </div>
  );
}

export default Anime;
