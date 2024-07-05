import "@testing-library/jest-dom";
import { getMovieGenres } from "../src/services/movieService";
import { responseGenres, resultGenres } from "./mockData";

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
