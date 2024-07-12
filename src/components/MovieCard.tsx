import { useNavigate } from "react-router-dom";
import Movie from "../models/Movie";
import defaultPoster from "../assets/default-movie-poster.jpg";
import "../styles/MovieCard.css";

interface MovieCardProps {
  movie: Movie; 
}

function MovieCard({ movie } : MovieCardProps) {
  const navigate = useNavigate();
  const goToDetails = () => navigate(`/movie/${movie.id}`, { replace: true });
  return (
    <>
      <div className="card">
        <a onClick={() => goToDetails()} role="link">
          <div className="img-hover">
            <img 
              className="movie-card-img"
              src={movie.posterPath.includes("null") || movie.posterPath.includes("undefined") ? defaultPoster : movie.posterPath} 
              alt={movie.title} 
            />
          </div>
        </a>
        <a onClick={() => goToDetails()} title={movie.title || "Title not available"} role="link">
          <p className="movie-title">{movie.title || "Title not available"}</p>
        </a>
        <p className="year-genres">{movie.year || "-"} &nbsp;•&nbsp; {movie.genres.slice(0, 2).join(", ")}</p>
      </div>
    </>
  )
}

export default MovieCard
