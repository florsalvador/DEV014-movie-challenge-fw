import '@testing-library/jest-dom'
import {formatMovie, MovieData} from "../src/utils/transformers"
import {data, data2, movieType, movieType2, incorrectDataType, missingPosterPath, missingTitle, missingVideo} from "./mockData"

describe("formatMovie", () => {
  test("Transforms object into a type Movie object", () => {
    expect(formatMovie(data)).toEqual(movieType);
    expect(formatMovie(data2)).toEqual(movieType2);
    // expect(formatMovie(data)).toBeInstanceOf(Movie);
  });

  test("Transforms data successfully if the object is missing a property that is not required", () => {
    expect(formatMovie(missingVideo as MovieData)).toEqual(movieType);
    // console.log(formatMovie(missingVideo))
  });

  test("Does not transform correctly if a property has an incorrect data type.", () => {
    expect(formatMovie(incorrectDataType)).not.toEqual(movieType);
    // console.log(formatMovie(incorrectDataType))
  });

  test("If posterPath is missing if it will include 'undefined'", () => {
    const transformedMissingPosterPath = formatMovie(missingPosterPath as MovieData);
    expect(transformedMissingPosterPath.posterPath.includes("undefined")).toBe(true);
    // console.log("Object is missing poster_path", formatMovie(missingPosterPath));
  });

  test("If title is missing if it will be undefined", () => {
    const transformedMissingTitle = formatMovie(missingTitle as MovieData);
    expect(transformedMissingTitle.title).toBe(undefined);
    // console.log("Object is missing title", formatMovie(missingTitle));
  });
});
