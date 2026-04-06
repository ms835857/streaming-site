import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Anime from './pages/Anime';
import TopAnime from './pages/TopAnime';
import Movies from './pages/Movies';
import TopMovies from './pages/TopMovies';
import Watchlist from './pages/Watchlist';
import AdminPanel from './pages/AdminPanel';
import AboutUs from './pages/AboutUs';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/top-anime" element={<TopAnime />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/top-movies" element={<TopMovies />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
