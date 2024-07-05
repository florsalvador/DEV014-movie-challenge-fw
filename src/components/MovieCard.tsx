import Movie from "../models/Movie"
import "../styles/MovieCard.css"
import defaultPoster from '../assets/default-movie-poster.jpg';

interface MovieCardProps {
  movie: Movie; 
}

function MovieCard({ movie } : MovieCardProps) {
  return (
    <>
      <div className="card">
        <a href="#">
          <div className="img-hover">
            <img 
              src={movie.posterPath.includes("null") || movie.posterPath.includes("undefined") ? defaultPoster : movie.posterPath} 
              alt={movie.title} 
            />
          </div>
        </a>
        <a href="#">
          <p className="movie-title">{movie.title || "Title not available"}</p>
        </a>
        <p className="year-genres">{movie.year || "-"} &nbsp;•&nbsp; {movie.genres.slice(0, 2).join(", ")}</p>
      </div>
    </>
  )
}

export default MovieCard
