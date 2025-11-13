import React, { useState, useEffect } from 'react';
import { Star, Search, Film, Calendar, TrendingUp, Award } from 'lucide-react';

const MovieRatingExplorer = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Sample movie data
  const movieData = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      year: 1994,
      genre: "Drama",
      rating: 9.3,
      director: "Frank Darabont",
      plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      cast: ["Tim Robbins", "Morgan Freeman"],
      runtime: 142
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      genre: "Crime",
      rating: 9.2,
      director: "Francis Ford Coppola",
      plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      cast: ["Marlon Brando", "Al Pacino"],
      runtime: 175
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      rating: 9.0,
      director: "Christopher Nolan",
      plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests.",
      cast: ["Christian Bale", "Heath Ledger"],
      runtime: 152
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime",
      rating: 8.9,
      director: "Quentin Tarantino",
      plot: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      cast: ["John Travolta", "Uma Thurman"],
      runtime: 154
    },
    {
      id: 5,
      title: "Forrest Gump",
      year: 1994,
      genre: "Drama",
      rating: 8.8,
      director: "Robert Zemeckis",
      plot: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.",
      cast: ["Tom Hanks", "Robin Wright"],
      runtime: 142
    },
    {
      id: 6,
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      rating: 8.8,
      director: "Christopher Nolan",
      plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
      cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      runtime: 148
    },
    {
      id: 7,
      title: "The Matrix",
      year: 1999,
      genre: "Sci-Fi",
      rating: 8.7,
      director: "Lana Wachowski, Lilly Wachowski",
      plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      cast: ["Keanu Reeves", "Laurence Fishburne"],
      runtime: 136
    },
    {
      id: 8,
      title: "Interstellar",
      year: 2014,
      genre: "Sci-Fi",
      rating: 8.6,
      director: "Christopher Nolan",
      plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      cast: ["Matthew McConaughey", "Anne Hathaway"],
      runtime: 169
    },
    {
      id: 9,
      title: "Gladiator",
      year: 2000,
      genre: "Action",
      rating: 8.5,
      director: "Ridley Scott",
      plot: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
      cast: ["Russell Crowe", "Joaquin Phoenix"],
      runtime: 155
    },
    {
      id: 10,
      title: "The Departed",
      year: 2006,
      genre: "Crime",
      rating: 8.5,
      director: "Martin Scorsese",
      plot: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in Boston.",
      cast: ["Leonardo DiCaprio", "Matt Damon"],
      runtime: 151
    }
  ];

  useEffect(() => {
    setMovies(movieData);
  }, []);

  const genres = ['All', ...new Set(movieData.map(m => m.genre))];

  const filteredMovies = movies
    .filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === 'All' || movie.genre === selectedGenre)
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'year') return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating / 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="ml-2 font-semibold text-lg">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Movie Rating Explorer
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Discover and explore top-rated movies</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white cursor-pointer"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white cursor-pointer"
            >
              <option value="rating">Sort by Rating</option>
              <option value="year">Sort by Year</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 hover:bg-opacity-70 transition-all cursor-pointer transform hover:scale-105 shadow-xl"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold flex-1">{movie.title}</h3>
                <Award className="text-yellow-400 flex-shrink-0 ml-2" size={24} />
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                <Calendar size={16} />
                <span>{movie.year}</span>
                <span className="mx-2">•</span>
                <span className="px-2 py-1 bg-purple-600 bg-opacity-30 rounded text-purple-300 text-xs">
                  {movie.genre}
                </span>
              </div>

              <StarRating rating={movie.rating} />

              <p className="text-gray-300 text-sm mt-3 line-clamp-2">{movie.plot}</p>

              <button className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <Film className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">No movies found</p>
          </div>
        )}

        {/* Movie Detail Modal */}
        {selectedMovie && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMovie(null)}
          >
            <div
              className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedMovie.title}</h2>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-2">
                      <Calendar size={18} />
                      {selectedMovie.year}
                    </span>
                    <span>{selectedMovie.runtime} min</span>
                    <span className="px-3 py-1 bg-purple-600 bg-opacity-30 rounded text-purple-300">
                      {selectedMovie.genre}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="text-gray-400 hover:text-white text-3xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <StarRating rating={selectedMovie.rating} />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp size={18} />
                    Director
                  </h3>
                  <p className="text-gray-300">{selectedMovie.director}</p>
                </div>

                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">Cast</h3>
                  <p className="text-gray-300">{selectedMovie.cast.join(', ')}</p>
                </div>

                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">Plot</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedMovie.plot}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMovie(null)}
                className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieRatingExplorer;