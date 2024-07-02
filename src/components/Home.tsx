import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies, Results } from "../services/APIService";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import "../styles/Home.css";

function Home() {
  const [results, setResults] = useState<Results>({metadata: {pagination: {currentPage: 1, totalPages: 1}}, movies: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectPage = (page: number) => setSearchParams({ page: `${page}`})

  useEffect(() => {
    const filters = { page: !searchParams.get("page") ? 1 : Number(searchParams.get("page"))};
    getMovies({ filters })
      .then(data => {
        setResults(data);
        setIsLoading(false);
        setError(false);
      })
      .catch(error => {
        console.error("Error getting data", error);
        setIsLoading(false);
        setError(true);
      });
  }, [searchParams]);

  return (
    <>
      <header>
        <div className="div-title"><h1>BestMovies 🎬</h1></div>
      </header>
      <main>
        <h3>Trending</h3>
        {isLoading && <p data-testid="loading-message">Loading...</p>}
        {error && <p data-testid="error-message">Sorry, this content is not available</p>}
        <MovieList movies={results.movies} />
        <Pagination 
          currentPage={results.metadata.pagination.currentPage} 
          totalPages={500} 
          onSelectPage={selectPage} 
        />
      </main>
    </>
  )
}

export default Home
