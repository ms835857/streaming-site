import { motion } from 'framer-motion';

function Community() {
  const activities = [
    { id: 1, user: 'OtakuMaster', act: 'Added "Solo Leveling" to their watchlist', time: '2 mins ago' },
    { id: 2, user: 'CinephileX', act: 'Liked "Inception"', time: '15 mins ago' },
    { id: 3, user: 'AnimeFan99', act: 'Completed "Naruto Shippuden"', time: '1 hour ago' },
    { id: 4, user: 'Admin', act: 'Verified 100 new titles in the library', time: 'Yesterday' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="community-page container"
    >
      <div className="discovery-layout">
        <main className="glass" style={{padding: '3rem', borderRadius: 'var(--radius-lg)'}}>
           <h1 className="text-gold">Community Hub</h1>
           <p className="subtitle">See what your fellow enthusiasts are discovering.</p>
           
           <div className="activity-feed">
             {activities.map(item => (
                <div key={item.id} className="activity-card glass glow-card">
                   <div className="user-icon"><i className="fas fa-user-circle"></i></div>
                   <div className="activity-text">
                      <p><strong>{item.user}</strong> {item.act}</p>
                      <small>{item.time}</small>
                   </div>
                </div>
             ))}
           </div>
        </main>

        <aside className="glass side-panel" style={{padding: '2rem'}}>
           <h2 className="text-gold" style={{fontSize: '1.2rem', marginBottom: '1rem'}}>Top Posters</h2>
           <ul style={{listStyle: 'none'}}>
              <li style={{marginBottom: '1rem'}}>🥇 OtakuMaster <span className="badge">LEVEL 50</span></li>
              <li style={{marginBottom: '1rem'}}>🥈 CinephileX <span className="badge">LEVEL 42</span></li>
           </ul>
        </aside>
      </div>

      <style>{`
        .activity-feed { margin-top: 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .activity-card { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; border-radius: var(--radius-md); }
        .user-icon { font-size: 2rem; color: var(--accent); opacity: 0.5; }
        .activity-text p { font-size: 0.95rem; text-align: left; color: white !important; }
        .activity-text small { color: var(--text-muted); }
      `}</style>
    </motion.div>
  );
}

export default Community;
