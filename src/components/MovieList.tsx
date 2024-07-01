import MovieCard from "./MovieCard";
import Movie from "../models/Movie";
import "../styles/MovieList.css"

interface MovieListProps {
  movies: Movie[];
}

function MovieList({ movies }: MovieListProps) {
  const movieList = movies.map(movie =>
    <MovieCard key={movie.id} movie={movie} />
  );
  return (
    <>
      {movies.length == 0 ? (
        <p data-testid="error-no-movies">Movies not available</p>
      ) : (
        <div className="movie-list">{movieList}</div>
      )}
    </>
  );
}

export default MovieList
