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
            <img src={movie.posterPath.includes(".jpg")? movie.posterPath : defaultPoster} alt={movie.title} />
          </div>
        </a>
        <a href="#">
          <p className="movie-title">{movie.title || "Title not available"}</p>
        </a>
        <p>{movie.year || "-"}</p>
      </div>
    </>
  )
}

export default MovieCard
