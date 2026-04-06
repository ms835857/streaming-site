import { motion } from 'framer-motion';

function AboutUs() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="about-page glass"
    >
      <h1 className="text-gold">Our Vision</h1>
      <p className="large-text">
        AnimeVerse was born from a simple desire: to create a premium, distraction-free sanctuary for fans of Japanese animation and global cinema.
      </p>
      <div className="about-grid">
         <div className="about-item">
            <h3 className="text-gold">Curated Library</h3>
            <p>Every title in our 100+ collection is hand-picked for quality and impact.</p>
         </div>
         <div className="about-item">
            <h3 className="text-gold">Community Driven</h3>
            <p>Built by fans, for fans. Your watchlists and likes shape the future of the platform.</p>
         </div>
      </div>

      <style>{`
        .about-page { padding: 5rem; border-radius: var(--radius-lg); text-align: center; }
        .large-text { font-size: 1.5rem; max-width: 900px; margin: 2rem auto; color: var(--text-muted); }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 4rem; text-align: left; }
        .about-item { padding: 2rem; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid var(--glass-border); }
        .about-item h3 { margin-bottom: 1rem; }
      `}</style>
    </motion.div>
  );
}

export default AboutUs;
