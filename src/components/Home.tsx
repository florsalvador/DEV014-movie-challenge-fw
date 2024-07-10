import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies, Results } from "../services/APIService";
import { getMovieGenres } from "../services/movieService";
import { formatGenresToMap, formatGenresToOptions } from "../utils/transformers";
import ListOptions from "./ListOptions";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import "../styles/Home.css";

function Home() {
  const [results, setResults] = useState<Results>({metadata: {pagination: {currentPage: 1, totalPages: 1}}, movies: []});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    getMovieGenres()
    .then(data => setGenres(data))
    .catch(error => console.error("Error getting genres", error))
  }, []);

  const optionsFilter = formatGenresToOptions(genres);
  const selectFilter = (id: string) => {
    const newSearchParams = { genreId: id }
    setSearchParams((prevParams) => {
      return new URLSearchParams({
        ...Object.fromEntries(prevParams.entries()),
        ...newSearchParams,
      });
    });
  };

  const optionsSort = [
    {value: "title.asc", label: "Title (a-z)"}, 
    {value: "title.desc", label: "Title (z-a)"},
    {value: "popularity.asc", label: "Popularity (asc)"}, 
    {value: "popularity.desc", label: "Popularity (desc)"}
  ]
  const selectSort = (opt: string) => {
    const newSearchParams = { sortBy: opt }
    setSearchParams((prevParams) => {
      return new URLSearchParams({
        ...Object.fromEntries(prevParams.entries()),
        ...newSearchParams,
      });
    });
  }

  const clearFilter = () => {
    setSearchParams((state) => {
      state.delete("genreId")
      return state
    })
  }
  const clearSort = () => {
    setSearchParams((state) => {
      state.delete("sortBy")
      return state
    })
  }

  const selectPage = (page: number) => {
    const newSearchParams = { page: `${page}`}
    setSearchParams((prevParams) => {
      return new URLSearchParams({
        ...Object.fromEntries(prevParams.entries()),
        ...newSearchParams,
      });
    });
  };

  useEffect(() => {
    const filters = {
      page: !searchParams.get("page") ? 1 : Number(searchParams.get("page")),
      genreId: !searchParams.get("genreId") ? null : Number(searchParams.get("genreId")),
      sortBy: !searchParams.get("sortBy") ? null : searchParams.get("sortBy")
    };
    const genresMap = (formatGenresToMap(genres))
    getMovies({ filters }, genresMap)
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
  }, [genres, searchParams]);

  const findLabel = (opt: string, listSelect: { value: string, label: string }[]) => {
    const option = listSelect.find(({ value }) => value === opt);
    return option?.label;
  }

  return (
    <>
      <header>
        <div className="div-title"><a href="/"><h1>BestMovies 🎬</h1></a></div>
      </header>
      <nav>
        <h3>
          {searchParams.get("genreId") && findLabel(searchParams.get("genreId") as string, optionsFilter) + " Movies "}
          {searchParams.get("sortBy") && "Sorted by " + findLabel(searchParams.get("sortBy") as string, optionsSort)}
          {searchParams.get("genreId") || searchParams.get("sortBy") ? "" : "Trending"}
        </h3>
        <div className="select-options">
          <ListOptions
            selectType="Filter by Genre"
            options={optionsFilter}
            selectedOption={!searchParams.get("genreId") ? null : { value: searchParams.get("genreId") as string, label: "genre" }}
            onChange={selectFilter}
            onClear={clearFilter}
          />
          <ListOptions
            selectType="Sort by"
            options={optionsSort}
            selectedOption={!searchParams.get("sortBy") ? null : { value: searchParams.get("sortBy") as string, label: "sort" }}
            onChange={selectSort}
            onClear={clearSort}
          />
        </div>
      </nav>
      <main>
        {isLoading && <div className="loader-error-div"><div className="loader" data-testid="loader"></div></div>}
        {error && <div className="loader-error-div"><p className="error" data-testid="error-message">Movies not available</p></div>}
        {!isLoading && !error && <><MovieList movies={results.movies} /><Pagination
          currentPage={results.metadata.pagination.currentPage}
          totalPages={Math.min(results.metadata.pagination.totalPages, 500)}
          onSelectPage={selectPage} /></>}
      </main>
    </>
  )
}

export default Home
