import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'anime';

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const userId = localStorage.getItem('user_id') || 1;
        const res = await api.getWatchlist(userId);
        setWatchlist(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, []);

  const handleRemove = async (entryId) => {
    try {
      await api.removeFromWatchlist(entryId);
      setWatchlist(watchlist.filter(w => w.watchlist_entry_id !== entryId));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = watchlist.filter(item => {
    if (tab === 'anime') return item.anime_id !== null;
    return item.movie_id !== null;
  });

  return (
    <div className="discovery-page">
      <section className="page-header">
        <h1 className="text-gold">Your Collection</h1>
        <p className="subtitle">Everything you're tracking in one premium vault.</p>
      </section>

      <div className="tab-control glass">
         <button 
           className={tab === 'anime' ? 'tab-btn active' : 'tab-btn'}
           onClick={() => setSearchParams({ tab: 'anime' })}
         >
           Anime Library
         </button>
         <button 
           className={tab === 'movie' ? 'tab-btn active' : 'tab-btn'}
           onClick={() => setSearchParams({ tab: 'movie' })}
         >
           Movie Collection
         </button>
      </div>

      <motion.div 
        layout
        className="grid-container"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? filteredItems.map(item => {
            const title = item.anime_title || item.movie_name;
            const desc = item.anime_discription || item.movie_description;
            const img = item.anime_image || item.movie_image;
            const watchlink = item.anime_watchlink || item.movie_watchlink;

            return (
              <motion.div 
                key={item.watchlist_entry_id} 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="anime-card-modern glass"
              >
                <div className="card-top">
                  <img src={`/${img || 'images/placeholder.png'}`} alt={title} className="card-img" />
                </div>
                <div className="card-body">
                  <Link to={tab === 'anime' ? '/anime' : '/movies'} className="card-title-link">
                    <h3>{title}</h3>
                  </Link>
                  <div className="meta-info">
                    <span>Added: {new Date(item.added_at).toISOString().split('T')[0]}</span>
                    <button 
                      onClick={() => handleRemove(item.watchlist_entry_id)} 
                      className="btn-remove"
                      title="Remove"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                  <Link to={watchlink} target="_blank" className="btn-watch glass">
                    Stream Now
                  </Link>
                </div>
              </motion.div>
            );
          }) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state glass text-center"
            >
              <i className="fas fa-folder-open"></i>
              <p>Your {tab} collection is currently empty.</p>
              <Link to={tab === 'anime' ? '/anime' : '/movies'} className="text-gold">Browse Highlights →</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        .tab-control {
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 0.75rem;
          margin: 0 auto 4rem;
          width: fit-content;
          border-radius: 50px;
        }
        .tab-btn {
          background: transparent;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 40px;
          font-weight: 700;
          transition: var(--transition);
        }
        .tab-btn.active { background: var(--accent); color: black; }
        .tab-btn:hover:not(.active) { background: rgba(255, 255, 255, 0.1); }

        .btn-remove { background: rgba(255, 0, 0, 0.1); color: #ff4d4d; width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255, 0, 0, 0.2); }
        .btn-remove:hover { background: #ff4d4d; color: white; }

        .card-title-link { color: inherit; text-decoration: none; }
        .card-title-link:hover h3 { color: var(--accent); transition: var(--transition); }

        .empty-state {
          grid-column: 1 / -1;
          padding: 8rem;
          border-radius: var(--radius-lg);
        }
        .empty-state i { font-size: 3rem; margin-bottom: 2rem; color: var(--glass-border); }
        .empty-state p { font-size: 1.2rem; margin-bottom: 1rem; }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2.5rem;
        }
      `}</style>
    </div>
  );
}

export default Watchlist;
