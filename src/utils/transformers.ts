import Movie from "../models/Movie"

interface MovieData {
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

function formatMovie(data: MovieData) {
  const movie: Movie = {
    id: data.id,
    title: data.title,
    releaseDate: data.release_date,
    posterPath: data.poster_path,
    genreIds: data.genre_ids,
    overview: data.overview
  }
  return movie;
}

export default formatMovie
