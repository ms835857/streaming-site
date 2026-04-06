import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function AdminPanel() {
  const [data, setData] = useState({
    anime: [], movies: []
  });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState('anime'); // 'anime' or 'movie'
  const [formData, setFormData] = useState({ id: null, title: '', description: '', genre: '', image: '', link: '' });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [anime, movies] = await Promise.all([api.getAnime(), api.getMovies()]);
      setData({ anime, movies });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const openForm = (type, item = null) => {
    setCurrentType(type);
    if (item) {
      setFormData({
        id: item.id,
        title: item.anime_title || item.movie_title,
        description: item.anime_discription || item.movie_description,
        genre: item.anime_genre || item.movie_genre,
        image: item.anime_image_path || item.movie_image_path,
        link: item.watchnowlink
      });
    } else {
      setFormData({ id: null, title: '', description: '', genre: '', image: '', link: '' });
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = currentType === 'anime' ? {
      anime_title: formData.title,
      anime_discription: formData.description,
      anime_genre: formData.genre,
      anime_image_path: formData.image,
      anime_releasedate: new Date().toISOString().split('T')[0],
      watchnowlink: formData.link
    } : {
      movie_title: formData.title,
      movie_description: formData.description,
      movie_genre: formData.genre,
      movie_image_path: formData.image,
      movie_releasedate: new Date().toISOString().split('T')[0],
      watchnowlink: formData.link
    };

    if (formData.id) {
      if (currentType === 'anime') await api.updateAnime(formData.id, payload);
      else await api.updateMovie(formData.id, payload);
    } else {
      if (currentType === 'anime') await api.addAnime(payload);
      else await api.addMovie(payload);
    }
    setModalOpen(false);
    fetchData();
  };

  const handleDelete = async (type, id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      if (type === 'anime') await api.deleteAnime(id);
      else await api.deleteMovie(id);
      fetchData();
    }
  };

  return (
    <div className="admin-root container">
      <header className="page-header">
        <h1 className="text-gold">Admin Command Center</h1>
        <p className="subtitle">Manage the universe content and release cycles.</p>
      </header>

      <div className="admin-grid">
        {/* Anime Management */}
        <section className="admin-section glass">
           <div className="section-head">
              <h2>Anime Database</h2>
              <button className="btn-add" onClick={() => openForm('anime')}>Add New Anime</button>
           </div>
           <div className="table-responsive">
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Genre</th><th>Actions</th></tr></thead>
                <tbody>
                  {data.anime.map(item => (
                    <tr key={item.id}>
                      <td>{item.anime_title}</td>
                      <td>{item.anime_genre}</td>
                      <td className="actions">
                        <button onClick={() => openForm('anime', item)} className="btn-edit"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('anime', item.id)} className="btn-delete"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>

        {/* Movie Management */}
        <section className="admin-section glass">
           <div className="section-head">
              <h2>Cinema Database</h2>
              <button className="btn-add" onClick={() => openForm('movie')}>Add New Movie</button>
           </div>
           <div className="table-responsive">
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Genre</th><th>Actions</th></tr></thead>
                <tbody>
                  {data.movies.map(item => (
                    <tr key={item.id}>
                      <td>{item.movie_title}</td>
                      <td>{item.movie_genre}</td>
                      <td className="actions">
                        <button onClick={() => openForm('movie', item)} className="btn-edit"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('movie', item.id)} className="btn-delete"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content glass"
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.9 }}
            >
              <h3>{formData.id ? 'Edit' : 'Add'} {currentType === 'anime' ? 'Anime' : 'Movie'}</h3>
              <form onSubmit={handleSave} className="admin-form">
                <input type="text" placeholder="Title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <textarea placeholder="Description" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <input type="text" placeholder="Genre (e.g. Action, Drama)" required value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} />
                <input type="text" placeholder="Image Path (e.g. images/demonslayer.jpg)" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                <input type="text" placeholder="Watch Link" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
                <div className="form-actions">
                  <button type="submit" className="btn-save">Save Content</button>
                  <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .admin-root { padding: 4rem 0; }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .admin-section { padding: 2rem; border-radius: var(--radius-lg); }
        .section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .btn-add { background: var(--accent); color: black; font-weight: 700; padding: 0.8rem 1.5rem; border-radius: 30px; }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th, .admin-table td { text-align: left; padding: 1rem; border-bottom: 1px solid var(--glass-border); }
        .actions { display: flex; gap: 0.5rem; }
        .btn-edit, .btn-delete { width: 32px; height: 32px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; }
        .btn-edit { background: rgba(255, 215, 0, 0.2); color: var(--accent); }
        .btn-delete { background: rgba(139, 0, 0, 0.2); color: #ff4d4d; }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); z-index: 2000; display: flex; align-items: center; justify-content: center; }
        .modal-content { padding: 3rem; width: 600px; border-radius: var(--radius-lg); }
        .modal-content h3 { margin-bottom: 2rem; font-size: 2rem; color: var(--accent); }
        .admin-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .admin-form input, .admin-form textarea { background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 1rem; border-radius: 8px; color: white; }
        .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
        .btn-save { flex: 1; background: var(--primary); color: white; padding: 1rem; border-radius: 8px; font-weight: 700; }
        .btn-cancel { padding: 1rem 2rem; color: var(--text-muted); }

        @media (max-width: 1024px) { .admin-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default AdminPanel;
