import "@testing-library/jest-dom"
import {getMovies} from "../src/services/APIService"
import {response, transformedResults, responsePage2, transformedResultsPage2} from "./mockData"

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

describe("getMovies", () => {
  test("Returns an object with an array of movies and metadata with page 1 as default", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      }),
    ) as jest.Mock;

    const result = await getMovies();
    expect(result).toEqual(transformedResults);
    expect(global.fetch).toHaveBeenCalled();
  });

  test("Returns an object with an array of movies and metadata with page 2", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responsePage2),
      }),
    ) as jest.Mock;

    const filters = { page: 2 }
    const result = await getMovies({ filters });
    expect(result).toEqual(transformedResultsPage2);
    expect(global.fetch).toHaveBeenCalled();
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
      await getMovies();
    } catch (error) { 
      expect(error).toBeInstanceOf(Error);
    }
  });
});
