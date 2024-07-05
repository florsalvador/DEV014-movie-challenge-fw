import "@testing-library/jest-dom";
import { 
  formatMovie, 
  MovieData, 
  formatGenresToMap 
} from "../src/utils/transformers";
import { 
  data, 
  data2, 
  movieType, 
  movieType2, 
  incorrectDataType, 
  missingPosterPath, 
  missingTitle, 
  missingVideo,
  resultGenres
} from "./mockData";

describe("formatMovie", () => {
  const genresMap = formatGenresToMap(resultGenres);
  test("Transforms object into a type Movie object", () => {
    expect(formatMovie(data, genresMap)).toEqual(movieType);
    expect(formatMovie(data2, genresMap)).toEqual(movieType2);
  });

  test("Transforms data successfully if the object is missing a property that is not required", () => {
    expect(formatMovie(missingVideo as MovieData, genresMap)).toEqual(movieType);
  });

  test("Does not transform correctly if a property has an incorrect data type.", () => {
    expect(formatMovie(incorrectDataType, genresMap)).not.toEqual(movieType);
  });

  test("If posterPath is missing if it will include 'undefined'", () => {
    const transformedMissingPosterPath = formatMovie(missingPosterPath as MovieData, genresMap);
    expect(transformedMissingPosterPath.posterPath.includes("undefined")).toBe(true);
  });

  test("If title is missing if it will be undefined", () => {
    const transformedMissingTitle = formatMovie(missingTitle as MovieData, genresMap);
    expect(transformedMissingTitle.title).toBe(undefined);
  });

  test("If genres is missing if it will be an empty arraay", () => {
    const data = {
      "adult": false,
      "backdrop_path": "/11G6N5zW0KykVS0EcNKeXHUmQj8.jpg",
      "genre_ids": null as unknown as number[],
      "id": 1136318,
      "original_language": "en",
      "original_title": "Battle Over Britain",
      "overview": "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
      "popularity": 646.548,
      "poster_path": "/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
      "release_date": "2023-12-01",
      "title": "Battle Over Britain",
      "video": false,
      "vote_average": 7.412,
      "vote_count": 51
    }
    const newData = formatMovie(data, genresMap);
    expect(newData.genres).toEqual([]);
  });
});
