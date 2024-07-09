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
    year: !data.release_date ? "" : data.release_date.slice(0, 4),
    posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    genres: !data.genre_ids ? [] : data.genre_ids.map((n: number) => genresNames.get(n)) as string[],
    overview: data.overview,
    voteAverage: data.vote_average,
    voteCount: data.vote_count
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

export interface Options {
  value: string;
  label: string;
}

export function formatGenresToOptions(data: Genre[]) {
  const genreOptions: Options[] = [];
  data.forEach((el: Genre) => {
    genreOptions.push({ value: `${el.id}`, label: el.name })
  })
  return genreOptions;
}
