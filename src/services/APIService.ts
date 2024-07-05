import { formatMovie, MovieData } from "../utils/transformers";
import Movie from "../models/Movie";
import { getToken } from "../utils/getEnv";

interface ApiFilters { 
  filters: { 
    page: number
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

export function getMovies({ filters }: ApiFilters = { filters: { page: 1 } }): Promise<Results> {
  const url = `https://api.themoviedb.org/3/discover/movie?page=${filters.page}`;
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
      movies: data.results.map((ele: MovieData) => formatMovie(ele))
    };
    return dataResults;
  })
  .catch(error => {
    throw error;
  })
}
