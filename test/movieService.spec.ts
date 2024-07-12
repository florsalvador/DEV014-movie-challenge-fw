import "@testing-library/jest-dom";
import { getMovieGenres, getMovieDetail } from "../src/services/movieService";
import { responseGenres, resultGenres, responseMovieDetail, resultMovieDetail } from "./mockData";

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

describe("getMovieGenres", () => {
  test("Returns an array of objects", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseGenres),
      }),
    ) as jest.Mock;
    const result = await getMovieGenres();
    expect(result).toEqual(resultGenres);
  });

  test("Returns an error in case the request is not successful", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: "error"}),
      }),
    ) as jest.Mock;
    try {
      await getMovieGenres();
    } catch (error) { 
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe("getMovieDetail", () => {
  const movieId = 1022789;
  
  test("Returns a Movie type object", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseMovieDetail),
      }),
    ) as jest.Mock;
    const result = await getMovieDetail(movieId);
    expect(result).toEqual(resultMovieDetail);
  });

  test("Returns an error in case the request is not successful", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: "error"}),
      }),
    ) as jest.Mock;
    try {
      await getMovieDetail(movieId);
    } catch (error) { 
      expect(error).toBeInstanceOf(Error);
    }
  });
});
