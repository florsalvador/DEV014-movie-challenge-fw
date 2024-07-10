import React from "react";
import "@testing-library/jest-dom";
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "../src/components/MovieDetail";
import { responseMovieDetail } from "./mockData";

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

describe("MovieDetail component", () => {
  const movieId = 1022790;

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  })

  test("Renders movie details based on the provided movie id", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseMovieDetail),
      }),
    ) as jest.Mock;
    await act(async () => {
      render(<MemoryRouter initialEntries={[`/movie/${movieId}`]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>);
    });
    const title = screen.getByTestId("movie-title");
    const overview = screen.getByTestId("movie-overview");
    await waitFor(() => {
      expect(title.innerHTML).toContain(responseMovieDetail.title);
      expect(overview.innerHTML).toContain(responseMovieDetail.overview);
    });
  });

  test("Renders loading message", async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn(() =>
      new Promise(resolve =>
        setTimeout(() =>
          resolve({
            ok: true,
            json: () => Promise.resolve(responseMovieDetail),
          }),
        1000)
      )
    ) as jest.Mock;
    await act(async () => {
      render(<MemoryRouter initialEntries={[`/movie/${movieId}`]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>);
    });
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  test("Renders an error message if the API request fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: "error"}),
      }),
    ) as jest.Mock;
    await act(async () => {
      render(<MemoryRouter initialEntries={[`/movie/${movieId}`]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>);
    });
    const errorMsg = screen.getByTestId("error-message");
    expect(errorMsg).toBeInTheDocument();
  });

});
