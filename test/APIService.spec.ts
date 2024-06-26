import "@testing-library/jest-dom"
import getMovies from "../src/services/APIService"
import {response, transformedData} from "./mockData"

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

describe("getMovies", () => {
  test("Returns array with type Movie ojects", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      }),
    ) as jest.Mock;

    const result = await getMovies();
    expect(result).toEqual(transformedData);
    expect(global.fetch).toHaveBeenCalled();
  });

  test("Returns error in case the request is not successful", async () => {
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


  // beforeEach(() => {
  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve(response),
  //     })
  //   ) as jest.Mock;

  //   // jest.spyOn(global, 'fetch').mockImplementation(() => {
  //   //   return Promise.resolve(
  //   //     new Response(
  //   //       JSON.stringify(response), 
  //   //       { 
  //   //         status: 200, 
  //   //         statusText: 'OK', 
  //   //         headers: { 'Content-Type': 'application/json' }
  //   //       }
  //   //     )
  //   //   );
  //   // });

  //   // jest.mock("import.meta", () => ({
  //   //   env: {
  //   //     VITE_TOKEN_API: "fake token"
  //   //   }
  //   // }));
  // });