import { useEffect, useState } from "react";
import getMovies from "../services/APIService";
import MovieList from "./MovieList";
import Movie from "../models/Movie";
import "../styles/App.css";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMovies()
      .then(data => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error getting data", error);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <h1>BestMovies</h1>
      {isLoading ? (
        <p data-testid="loading-message">Loading...</p>
      ) : error ? (
        <p data-testid="error-message">Sorry, this content is not available</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </>
  )
}

export default Home
