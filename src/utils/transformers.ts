import Movie from "../models/Movie";
import { Genre } from "../services/movieService";

export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export function formatMovie(data: MovieData, genresNames: Map<number, string>) {
  const movie: Movie = {
    id: data.id,
    title: data.title,
    year: data.release_date.slice(0, 4),
    posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    genres: data.genre_ids.map((n: number) => genresNames.get(n)) as string[],
    overview: data.overview
  }
  return movie;
}

export function formatGenresToMap(data: Genre[]) {
  const genreMap = new Map();
  data.map((el: Genre) => {
      genreMap.set(el.id, el.name);
  });
  return genreMap;
}
