const ANIME_LIST = [
  { id: 101, anime_title: 'Demon Slayer', anime_discription: 'Tanjiro Kamado sets out to become a demon slayer after his family was slaughtered.', anime_genre: 'Action, Supernatural', anime_releasedate: '2019-04-06', anime_image_path: 'images/demonslayer.jpg', watchnowlink: 'https://www.crunchyroll.com/search?q=Demon+Slayer' },
  { id: 102, anime_title: 'Attack on Titan', anime_discription: 'Humans are fighting for survival against man-eating giants called Titans.', anime_genre: 'Action, Drama', anime_releasedate: '2013-04-07', anime_image_path: 'images/aot.jpg', watchnowlink: 'https://www.crunchyroll.com/search?q=Attack+on+Titan' },
  { id: 103, anime_title: 'Fullmetal Alchemist: Brotherhood', anime_discription: 'Two brothers search for the Philosopher Stone to restore their bodies.', anime_genre: 'Adventure, Fantasy', anime_releasedate: '2009-04-05', anime_image_path: 'images/FMAB.jpg', watchnowlink: 'https://www.crunchyroll.com/search?q=Fullmetal+Alchemist' },
  { id: 104, anime_title: 'Naruto Shippuden', anime_discription: 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition.', anime_genre: 'Action, Adventure', anime_releasedate: '2007-02-15', anime_image_path: 'images/naruto.jpg', watchnowlink: '#' },
  { id: 105, anime_title: 'One Piece', anime_discription: 'Monkey D. Luffy and his pirate crew in search of the ultimate treasure.', anime_genre: 'Adventure, Fantasy', anime_releasedate: '1999-10-20', anime_image_path: 'images/onepiece.jpg', watchnowlink: '#' },
  { id: 106, anime_title: 'Jujutsu Kaisen', anime_discription: 'A boy swallows a cursed talisman and becomes part of a secret society.', anime_genre: 'Action, Supernatural', anime_releasedate: '2020-10-03', anime_image_path: 'images/jujutsokaisan.jpg', watchnowlink: '#' },
  { id: 107, anime_title: 'Bleach: Thousand-Year Blood War', anime_discription: 'Ichigo Kurosaki returns to face the ultimate threat to the Soul Society.', anime_genre: 'Action, Supernatural', anime_releasedate: '2022-10-11', anime_image_path: 'images/bleach.jpg', watchnowlink: '#' },
  { id: 108, anime_title: 'Death Note', anime_discription: 'An intelligent high school student goes on a secret crusade to eliminate criminals.', anime_genre: 'Psychological, Thriller', anime_releasedate: '2006-10-04', anime_image_path: 'images/deathnote.jpg', watchnowlink: '#' },
  { id: 109, anime_title: 'Hunter x Hunter', anime_discription: 'Gon Freecss aspires to become a Hunter and find his father.', anime_genre: 'Action, Adventure', anime_releasedate: '2011-10-02', anime_image_path: 'images/hxh.jpg', watchnowlink: '#' },
  { id: 110, anime_title: 'My Hero Academia', anime_discription: 'A superhero-loving boy without powers is determined to enroll in a prestigious academy.', anime_genre: 'Action, Sci-Fi', anime_releasedate: '2016-04-03', anime_image_path: 'images/mp.jpg', watchnowlink: '#' },
  { id: 111, anime_title: 'Sword Art Online', anime_discription: 'Players trapped in a virtual reality MMORPG must fight for their lives.', anime_genre: 'Action, Fantasy', anime_releasedate: '2012-07-08', anime_image_path: 'images/sao.jpg', watchnowlink: '#' },
  { id: 112, anime_title: 'Tokyo Ghoul', anime_discription: 'A college student is transformed into a half-ghoul after a chance encounter.', anime_genre: 'Action, Horror', anime_releasedate: '2014-07-04', anime_image_path: 'images/tokyoghoul.jpg', watchnowlink: '#' },
  { id: 113, anime_title: 'Solo Leveling', anime_discription: 'The weakest hunter in the world becomes the strongest through a mysterious leveling system.', anime_genre: 'Action, Fantasy', anime_releasedate: '2024-01-07', anime_image_path: 'images/sololeveling.jpg', watchnowlink: '#' },
  { id: 114, anime_title: 'Blue Lock', anime_discription: 'Japan searches for the ultimate striker through a rigorous survival program.', anime_genre: 'Sports, Drama', anime_releasedate: '2022-10-09', anime_image_path: 'images/bluelock.jpg', watchnowlink: '#' },
  { id: 115, anime_title: 'Spy x Family', anime_discription: 'A spy, an assassin, and a telepath form a fake family to achieve their goals.', anime_genre: 'Action, Comedy', anime_releasedate: '2022-04-09', anime_image_path: 'images/spyxfamily.jpeg', watchnowlink: '#' },
  { id: 116, anime_title: 'Chainsaw Man', anime_discription: 'A young man merges with his chainsaw-dog devil to hunt down enemies.', anime_genre: 'Action, Horror', anime_releasedate: '2022-10-12', anime_image_path: 'images/chainsawman.jpg', watchnowlink: '#' },
  { id: 117, anime_title: 'Black Clover', anime_discription: 'A boy without magic enters a world where magic is everything.', anime_genre: 'Action, Fantasy', anime_releasedate: '2017-10-03', anime_image_path: 'images/blackclover.jpg', watchnowlink: '#' },
  { id: 118, anime_title: 'Steins;Gate', anime_discription: 'Self-proclaimed mad scientist Rintarou Okabe accidentaly discovers time travel.', anime_genre: 'Sci-Fi, Thriller', anime_releasedate: '2011-04-06', anime_image_path: 'images/steinsgate.jpg', watchnowlink: '#' },
  { id: 119, anime_title: 'One Punch Man', anime_discription: 'A hero who can defeat any opponent with a single punch seeks a challenge.', anime_genre: 'Action, Comedy', anime_releasedate: '2015-10-05', anime_image_path: 'images/opm.jpg', watchnowlink: '#' },
  { id: 120, anime_title: 'Kaiju No. 8', anime_discription: 'A man working in the cleanup crew gains the ability to transform into a Kaiju.', anime_genre: 'Action, Sci-Fi', anime_releasedate: '2024-04-13', anime_image_path: 'images/kj8.jpg', watchnowlink: '#' },
  // ... Adding more generically to reach 50
  ...Array.from({ length: 30 }).map((_, i) => ({
    id: 121 + i,
    anime_title: `Epic Saga Vol. ${i + 1}`,
    anime_discription: 'An incredible journey through time and space in this high-quality animated feature.',
    anime_genre: i % 2 === 0 ? 'Fantasy' : 'Action',
    anime_releasedate: '2023-11-20',
    anime_image_path: i % 2 === 0 ? 'images/blacksummoner.jpg' : 'images/skeletonknight.jpg',
    watchnowlink: '#'
  }))
];

const MOVIE_LIST = [
  { id: 201, movie_title: 'The Avengers', movie_description: 'Earth mightiest heroes must come together to stop Loki.', movie_genre: 'Action, Sci-Fi', movie_releasedate: '2012-05-04', movie_image_path: 'images/avangers2.png', watchnowlink: '#' },
  { id: 202, movie_title: 'The Batman', movie_description: 'Batman ventures into Gotham City underworld when a sadistic killer leaves clues.', movie_genre: 'Action, Crime', movie_releasedate: '2022-03-04', movie_image_path: 'images/batman.jpg', watchnowlink: '#' },
  { id: 203, movie_title: 'Man of Steel', movie_description: 'An alien child is sent from his dying planet to Earth to live among humans.', movie_genre: 'Action, Sci-Fi', movie_releasedate: '2013-06-14', movie_image_path: 'images/manofsteel.jpeg', watchnowlink: '#' },
  { id: 204, movie_title: 'Iron Man', movie_description: 'After being held captive, billionaire industrialist Tony Stark creates a suit of armor.', movie_genre: 'Action, Adventure', movie_releasedate: '2008-05-02', movie_image_path: 'images/ironman.jpg', watchnowlink: '#' },
  { id: 205, movie_title: 'Deadpool 2', movie_description: 'Deadpool forms the X-Force to protect a young mutant from the time-traveling Cable.', movie_genre: 'Action, Comedy', movie_releasedate: '2018-05-18', movie_image_path: 'images/deadpool2.jpeg', watchnowlink: '#' },
  { id: 206, movie_title: 'Mission: Impossible', movie_description: 'Ethan Hunt must clear his name after being framed for the murder of his IMF team.', movie_genre: 'Action, Adventure', movie_releasedate: '1996-05-22', movie_image_path: 'images/mi6.jpg', watchnowlink: '#' },
  { id: 207, movie_title: 'Wonder Woman', movie_description: 'Diana, princess of the Amazons, trains to be an unconquerable warrior.', movie_genre: 'Action, Adventure', movie_releasedate: '2017-06-02', movie_image_path: 'images/wonderwoman.png', watchnowlink: '#' },
  { id: 208, movie_title: 'Inside Out', movie_description: 'After a move, a girl emotions search for balance in her new life.', movie_genre: 'Animation, Adventure', movie_releasedate: '2015-06-19', movie_image_path: 'images/insideout.jpg', watchnowlink: '#' },
  { id: 209, movie_title: 'Uncharted', movie_description: 'Street-smart Nathan Drake is recruited to recover a fortune lost by Ferdinand Magellan.', movie_genre: 'Action, Adventure', movie_releasedate: '2022-02-18', movie_image_path: 'images/uncharted.jpg', watchnowlink: '#' },
  { id: 210, movie_title: 'Captain Marvel', movie_description: 'Carol Danvers becomes one of the universe most powerful heroes when Earth is caught in a war.', movie_genre: 'Action, Sci-Fi', movie_releasedate: '2019-03-08', movie_image_path: 'images/captianmarvel.jpg', watchnowlink: '#' },
  ...Array.from({ length: 40 }).map((_, i) => ({
    id: 211 + i,
    movie_title: `Cinematic Masterpiece Vol. ${i + 1}`,
    movie_description: 'A visually stunning cinematic experience that redefined the genre with its storytelling and effects.',
    movie_genre: i % 3 === 0 ? 'Action' : (i % 3 === 1 ? 'Drama' : 'Sci-Fi'),
    movie_releasedate: '2024-05-01',
    movie_image_path: 'images/moviebg1.jpg',
    watchnowlink: '#'
  }))
];

const USERS = [
  { id: 1, username: 'admin', password: 'password', role: 'admin' },
  { id: 2, username: 'user', password: 'password', role: 'user' }
];

export const initStorage = () => {
    // Check version to see if we need a data refresh
    const CURRENT_DB_VERSION = '2.0'; 
    if (localStorage.getItem('anime_db_version') !== CURRENT_DB_VERSION) {
        localStorage.setItem('users', JSON.stringify(USERS));
        localStorage.setItem('anime', JSON.stringify(ANIME_LIST));
        localStorage.setItem('topAnime', JSON.stringify(ANIME_LIST.slice(0, 10).map((a, i) => ({
            ...a,
            id: i + 1,
            anime_rank: i + 1,
            top_anime_name: a.anime_title,
            top_anime_description: a.anime_discription,
            top_anime_genre: a.anime_genre,
            top_anime_releasedate: a.anime_releasedate,
            top_anime_image: a.anime_image_path,
            watchnow_link: a.watchnowlink,
            like_count: 5000 - (i * 200)
        }))));
        localStorage.setItem('movies', JSON.stringify(MOVIE_LIST));
        localStorage.setItem('topMovies', JSON.stringify(MOVIE_LIST.slice(0, 10).map((m, i) => ({
            ...m,
            id: i + 11,
            movie_rank: i + 1,
            top_movie_name: m.movie_title,
            top_movie_description: m.movie_description,
            top_movie_genre: m.movie_genre,
            top_movie_releasedate: m.movie_releasedate,
            top_movie_image: m.movie_image_path,
            watchnow_link: m.watchnowlink,
            like_count: 8000 - (i * 300)
        }))));
        localStorage.setItem('trendingAnime', JSON.stringify(ANIME_LIST.slice(5, 10).map((a, i) => ({
            trending_anime_rank: i + 1,
            trending_anime_name: a.anime_title,
            trending_anime_image: a.anime_image_path,
            watch_nowlink: a.watchnowlink
        }))));
        localStorage.setItem('trendingMovies', JSON.stringify(MOVIE_LIST.slice(3, 8).map((m, i) => ({
            trending_movie_rank: i + 1,
            trending_movie_name: m.movie_title,
            trending_movie_image: m.movie_image_path,
            watch_nowlink: m.watchnowlink
        }))));
        localStorage.setItem('watchlists', JSON.stringify([]));
        localStorage.setItem('anime_db_version', CURRENT_DB_VERSION);
        localStorage.setItem('anime_db_initialized', 'true');
    }
};

const getTable = (table) => JSON.parse(localStorage.getItem(table) || '[]');
const setTable = (table, data) => localStorage.setItem(table, JSON.stringify(data));

export default {
  login: async (username, password) => {
    const users = getTable('users');
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return { success: true, token: 'jwt_' + Math.random().toString(36).substr(2), user };
  },
  register: async (username, password) => {
    const users = getTable('users');
    if (users.find(u => u.username === username)) throw new Error('Username taken');
    const newUser = { id: Date.now(), username, password, role: 'user' };
    users.push(newUser);
    setTable('users', users);
    return { success: true };
  },
  getAnime: async () => getTable('anime'),
  getTopAnime: async () => getTable('topAnime'),
  getTrendingAnime: async () => getTable('trendingAnime'),
  getMovies: async () => getTable('movies'),
  getTopMovies: async () => getTable('topMovies'),
  getTrendingMovies: async () => getTable('trendingMovies'),
  
  getWatchlist: async (userId) => {
    const watchlists = getTable('watchlists').filter(w => w.user_id == userId);
    const anime = getTable('anime');
    const movies = getTable('movies');
    
    return watchlists.map(w => {
      const a = anime.find(x => x.id == w.anime_id) || anime.find(x => x.id == w.top_anime_id) || {};
      const m = movies.find(x => x.id == w.movie_id) || movies.find(x => x.id == w.top_movie_id) || {};
      return {
        watchlist_entry_id: w.id,
        added_at: w.added_at,
        anime_id: w.anime_id,
        anime_title: a.anime_title || a.top_anime_name,
        anime_discription: a.anime_discription || a.top_anime_description,
        anime_genre: a.anime_genre || a.top_anime_genre,
        anime_image: a.anime_image_path || a.top_anime_image,
        anime_watchlink: a.watchnowlink || a.watchnow_link,
        movie_id: w.movie_id,
        movie_name: m.movie_title || m.top_movie_name,
        movie_description: m.movie_description || m.top_movie_description,
        movie_genre: m.movie_genre || m.top_movie_genre,
        movie_image: m.movie_image_path || m.top_movie_image,
        movie_watchlink: m.watchnowlink || m.watchnow_link
      };
    });
  },
  addToWatchlist: async (userId, animeId, movieId) => {
    const table = getTable('watchlists');
    if (table.find(w => w.user_id == userId && (w.anime_id == animeId || w.movie_id == movieId))) return { success: false, message: 'Already in watchlist' };
    table.push({ id: Date.now(), user_id: userId, anime_id: animeId, movie_id: movieId, added_at: new Date().toISOString() });
    setTable('watchlists', table);
    return { success: true };
  },
  removeFromWatchlist: async (entryId) => {
    let table = getTable('watchlists');
    table = table.filter(w => w.id !== entryId);
    setTable('watchlists', table);
    return { success: true };
  },

  // Admin Methods
  addAnime: async (animeData) => {
    const table = getTable('anime');
    const newAnime = { ...animeData, id: Date.now() };
    table.push(newAnime);
    setTable('anime', table);
    return { success: true, anime: newAnime };
  },
  updateAnime: async (id, animeData) => {
    let table = getTable('anime');
    table = table.map(a => a.id == id ? { ...a, ...animeData } : a);
    setTable('anime', table);
    return { success: true };
  },
  deleteAnime: async (id) => {
    let table = getTable('anime');
    table = table.filter(a => a.id != id);
    setTable('anime', table);
    return { success: true };
  },

  addMovie: async (movieData) => {
    const table = getTable('movies');
    const newMovie = { ...movieData, id: Date.now() };
    table.push(newMovie);
    setTable('movies', table);
    return { success: true, movie: newMovie };
  },
  updateMovie: async (id, movieData) => {
    let table = getTable('movies');
    table = table.map(m => m.id == id ? { ...m, ...movieData } : m);
    setTable('movies', table);
    return { success: true };
  },
  deleteMovie: async (id) => {
    let table = getTable('movies');
    table = table.filter(m => m.id != id);
    setTable('movies', table);
    return { success: true };
  }
};
