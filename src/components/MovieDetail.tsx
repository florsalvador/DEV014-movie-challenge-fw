import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../services/movieService";
import Movie from "../models/Movie";
import "../styles/MovieDetail.css";

function MovieDetail() {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getMovieDetail(parseInt(id as string))
    .then(data => {
      setMovie(data);
      setIsLoading(false);
      setError(false);
    })
    .catch(error => {
      console.error("Error getting movie details", error);
      setIsLoading(false);
      setError(true);
    })
  }, [id])

  const backgroundStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(11,23,29,1) 0%, rgba(11,23,29,0.9) 33%, rgba(11,23,29,0.8) 64%, rgba(11,23,29,1) 95%), url(${movie.posterPath})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "70%",
    backgroundPosition: "right 0% top 0%",
  };

  const voteAverage = Math.round(movie.voteAverage/2);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= voteAverage) {
      stars.push(<span key={i} style={{color: "#FFC530", fontSize: "22px"}}>★</span>)
    } else stars.push(<span key={i} style={{color: "#b2b2b2", fontSize: "22px"}}>★</span>)
  }

  return (
    <>
      <header>
        <div className="div-title"><a href="/"><h1>BestMovies 🎬</h1></a></div>
      </header>
      <main style={backgroundStyle}>
        <a className="go-back-btn" href="/" title="Go back to movie list"><span>&#8592;</span>&nbsp; Back to movie list</a>
        {isLoading && <div className="loader-error-div"><div className="loader" data-testid="loader"></div></div>}
        {error && <div className="loader-error-div"><p className="error" data-testid="error-message">Movie details not available</p></div>}
        {!isLoading && !error && <article>
          <img className="img-movie-detail" src={movie.posterPath} alt={movie.title} />
          <div className="movie-info">
            <h2 data-testid="movie-title">{movie.title || "Title not available"} {movie.year ? "(" + movie.year + ")" : ""}</h2>
            <div className="score">{stars}<p className="vote-average">{(movie.voteAverage/2).toFixed(2)}{"/5"}</p>
            </div>
            <p data-testid="movie-overview">{movie.overview || ""}</p>
            <p><span>Genres:</span> {movie.genres? movie.genres.join(", "): "..."}</p>
            
          </div>
        </article>}
      </main>
    </>
  )
}

export default MovieDetail
