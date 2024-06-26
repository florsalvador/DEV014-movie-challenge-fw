import { formatMovie, MovieData } from "../utils/transformers";
import Movie from "../models/Movie";
import { getToken } from "../utils/getEnv";

function getMovies(): Promise<Movie[]> {
  const url = "https://api.themoviedb.org/3/discover/movie";
  const token = getToken();
  const request: RequestInit = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  return fetch(url, request)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    } else return response.json()})
  .then(data => data.results)
  .then(results => (results).map((ele: MovieData) => formatMovie(ele)))
  .catch(error => error)
}

export default getMovies
