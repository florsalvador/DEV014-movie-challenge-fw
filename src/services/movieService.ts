import { getToken } from "../utils/getEnv";

export interface Genre {
  id: number,
  name: string
}

export function getMovieGenres(): Promise<Genre[]> {
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
