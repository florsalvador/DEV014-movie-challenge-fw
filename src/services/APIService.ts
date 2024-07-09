import { formatMovie, MovieData } from "../utils/transformers";
import Movie from "../models/Movie";
import { getToken } from "../utils/getEnv";

interface Filters { 
  filters: { 
    page: number, 
    genreId: number | null, 
    sortBy: string | null 
  }
}

export interface Results {
  metadata: { 
    pagination: {
      currentPage: number, 
      totalPages: number
    }
  },
  movies: Movie[]
}

export function getMovies({ filters }: Filters = {filters: {page: 1, genreId: null, sortBy: null}}, genres: Map<number, string>): Promise<Results> {
  const filter = filters.genreId ? `&with_genres=${filters.genreId}` : "";
  const sort = filters.sortBy ? `&sort_by=${filters.sortBy}` : "";
  const url = `https://api.themoviedb.org/3/discover/movie?page=${filters.page}${filter}${sort}`;
  const token = getToken();
  const request: RequestInit = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  return fetch(url, request)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      } else return response.json();
    })
    .then(data => {
      const dataResults: Results = {
        metadata: {
          pagination: {
            currentPage: data.page,
            totalPages: data.total_pages
          }
        },
        movies: data.results.map((ele: MovieData) => formatMovie(ele, genres))
      };
      return dataResults;
    })
    .catch(error => {
      throw error;
    })
}
