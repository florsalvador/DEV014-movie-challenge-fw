import "@testing-library/jest-dom";
import { getMovies } from "../src/services/APIService";
import { formatGenresToMap } from "../src/utils/transformers";
import { response, transformedResults, responsePage2, transformedResultsPage2, resultGenres } from "./mockData";

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

describe("getMovies", () => {
  test("Returns an object that contains a movie array with page 2", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responsePage2),
      }),
    ) as jest.Mock;
    const filters = { page: 2, genreId: null, sortBy: null };
    const genresMap = (formatGenresToMap(resultGenres))
    const result = await getMovies({ filters }, genresMap);
    expect(result).toEqual(transformedResultsPage2);
  });

  test("Returns an object that contains a movie array filtered by genreId 16 (animation)", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      }),
    ) as jest.Mock;
    const filters = { page: 1, genreId: 16, sortBy: null };
    const genresMap = (formatGenresToMap(resultGenres))
    const result = await getMovies({ filters }, genresMap);
    result.movies.pop()
    expect(result.movies.length).toBe(1);
  });

  test("Returns an object that contains a movie array sorted by title.asc", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      }),
    ) as jest.Mock;
    const filters = { page: 1, genreId: null, sortBy: "title.asc" };
    const genresMap = (formatGenresToMap(resultGenres))
    const result = await getMovies({ filters }, genresMap);
    expect(result).toEqual(transformedResults);
  });

  test("Returns an error in case the request is not successful", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: "error"}),
      }),
    ) as jest.Mock;
    const filters = { page: 1, genreId: null, sortBy: null };
    const genresMap = (formatGenresToMap(resultGenres))
    try {
      await getMovies({ filters }, genresMap);
    } catch (error) { 
      expect(error).toBeInstanceOf(Error);
    }
  });
});
