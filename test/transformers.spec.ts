import '@testing-library/jest-dom'
import { formatMovie } from "../src/utils/transformers"
import { data1, data2, incorrectDataType, missingRequiredData, missingData, dataMovie1, dataMovie2 } from "./fakeData"

describe("formatMovie", () => {
  test("Transforms object into a type Movie object", () => {
    expect(formatMovie(data1)).toEqual(dataMovie1);
    expect(formatMovie(data2)).toEqual(dataMovie2);
    // expect(formatMovie(data)).toBeInstanceOf(Movie);
  });

  test("If a property has an incorrect data type, it will not be transformed correctly.", () => {
    expect(formatMovie(incorrectDataType)).not.toEqual(dataMovie2);
  });

  test("Property is undefined if it's missing from the object", () => {
    const transformedMissingRequiredData = formatMovie(missingRequiredData);
    expect(transformedMissingRequiredData.posterPath).toBe(undefined);
  });

  test("Transforms data into a type Movie object even if the object is missing a not required property", () => {
    expect(formatMovie(missingData)).toEqual(dataMovie2);
  });

  console.log("Correct data in object", formatMovie(data1));
  console.log("Property 'id' has a wrong data type", formatMovie(incorrectDataType));
  console.log("Object is missing 'poster_path', a required property", formatMovie(missingRequiredData));
  console.log("Object is missing 'vote_count' property", formatMovie(missingData));
});
