import { useState, useEffect } from 'react'
import Search from './components/search.jsx'
import MovieCard from './components/MovieCard.jsx';
import {useDebounce} from 'react-use';
const API_BASE_URL = 'https://api.themoviedb.org/3';
import { updateSearchCount, getTrendingMovies } from './appwrite.js'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS ={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState();

  useDebounce(() =>
    setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();

      if (data.response === 'false') {
        setErrorMessage(data.error || 'An error occurred while fetching movies.');
        setMoviesList([]);
        return;
      }
      
      setMoviesList(data.results || []);
    


      // If a query is provided and there are results, update the search count
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    }
    finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies)
  } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (
    <main>
      <div className= "pattern" />
      <div className="wrapper">
        <header>
          <img src='./hero.png' alt="Hero Banner" />
          <h1>Find  <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
                
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index)=>(
                <li key = {movie.$id}>
                  <p>{index + 1}</p>
                  <img src = {movie.poster_url} alt =  {movie.title}/>

                </li>
              ))}
            </ul>
            </section>
        )}
 
       <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : moviesList.length === 0 ? (
            <p className="text-white">No movies found.</p>
          ) : (
            <ul>
            {moviesList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
              // <p key={movie.id} className="text-white">{movie.title}</p>
            ))}
            </ul>
          )}
        </section>

      </div>
      
    </main>
  )
}

export default App
