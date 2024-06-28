import { useEffect, useState } from "react";
import "../styles/App.css";
import getMovies from "../services/APIService";
import MovieList from "./MovieList";
import Movie from "../models/Movie";

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
        console.error(error);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <h1>BestMovies</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Sorry, this content is not available</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </>
  )
}

export default Home
