import { getToken } from "../utils/getEnv";
import { formatMovie, formatGenresToMap } from "../utils/transformers";
import Movie from "../models/Movie";

export interface Genre {
  id: number,
  name: string
}

export async function getMovieGenres(): Promise<Genre[]> {
  const url = "https://api.themoviedb.org/3/genre/movie/list";
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
  .then(data => data.genres)
  .catch(error => {
    throw error;
  })
}

export async function getMovieDetail(id: number): Promise<Movie> {
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const token = getToken();
  const request: RequestInit = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const genres =  await getMovieGenres();
  const genresMap = (formatGenresToMap(genres));
  return fetch(url, request)
  .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    } else return response.json();
  })
  .then(data => {
    data.genre_ids = data.genres.map((el: {id: number, name: string}) => el.id);
    return data;
  })
  .then(result => formatMovie(result, genresMap))
  .catch(error => {
    throw error;
  })
}
