import React from "react";
import "@testing-library/jest-dom";
import { act } from 'react';
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, /* Routes, Route */ } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
import Home from "../src/components/Home.tsx";
import { response, transformedResults, responseGenres } from "./mockData.ts";

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

// const setSearchParamsMock = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useSearchParams: () => [new URLSearchParams(), setSearchParamsMock],
// }));

const Wrapper = () => {
  return <MemoryRouter>
      <Home />
  </MemoryRouter>
}

describe("Home component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  })

  test("Renders movie titles and images", async () => {
    global.fetch = jest.fn((url: string) => {
      if (url.includes("genre/movie/list")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(responseGenres),
        })
      } else if (url.includes("discover/movie")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(response),
        })
      }
      return Promise.reject(new Error("Unknown URL"));
    }) as jest.Mock;
    await act(async () => {
      render(<Wrapper />);
    });
    const movieTitle1 = screen.getByText(transformedResults.movies[0].title)
    const movieTitle2 = screen.getByText(transformedResults.movies[1].title)
    const movieImages = screen.getAllByRole("img");
    expect(movieTitle1).toBeInTheDocument();
    expect(movieTitle2).toBeInTheDocument();
    expect(movieImages.length).toBe(2);
  });

  test("Renders loading message", async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn((url: string) => {
      if (url.includes("genre/movie/list")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(responseGenres),
        })
      } else if (url.includes("discover/movie")) {
        return new Promise(resolve =>
          setTimeout(() =>
            resolve({
              ok: true,
              json: () => Promise.resolve(response),
            }),
          1000)
        )
      }
      return Promise.reject(new Error("Unknown URL"));
    }) as jest.Mock;
    await act(async () => {
      render(<Wrapper />);
    });
    const loadingMsg = screen.getByTestId("loading-message");
    expect(loadingMsg).toBeInTheDocument();
  });

  test("Renders error message if the API request fails", async () => {
    global.fetch = jest.fn((url: string) => {
      if (url.includes("genre/movie/list")) {
        return Promise.resolve({
          ok: false,
          status: 401,
          json: () => Promise.resolve({ message: "error"}),
        })
      } else if (url.includes("discover/movie")) {
        return Promise.resolve({
          ok: false,
          status: 401,
          json: () => Promise.resolve({ message: "error"}),
        })
      }
      return Promise.reject(new Error("Unknown URL"));
    }) as jest.Mock;
    await act(async () => {
      render(<Wrapper />);
    });
    const errorMsg = screen.getByTestId("error-message");
    expect(errorMsg).toBeInTheDocument();
  });

  test("Renders pagination buttons", async () => {
    global.fetch = jest.fn((url: string) => {
      if (url.includes("genre/movie/list")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(responseGenres),
        })
      } else if (url.includes("discover/movie")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(response),
        })
      }
      return Promise.reject(new Error("Unknown URL"));
    }) as jest.Mock;
    await act(async () => {
      render(<Wrapper />);
    });
    const currentBtn = screen.getByTestId("current-page-btn")
    const beforeBtn = screen.getByTestId("before-btn")
    const afterBtn = screen.getByTestId("after-btn")
    expect(currentBtn).toBeInTheDocument();
    expect(beforeBtn).toBeInTheDocument();
    expect(afterBtn).toBeInTheDocument();
  });

  test("Redirects to the next page when the after button is clicked", async () => {
    global.fetch = jest.fn((url: string) => {
      if (url.includes("genre/movie/list")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(responseGenres),
        })
      } else if (url.includes("discover/movie")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(response),
        })
      }
      return Promise.reject(new Error("Unknown URL"));
    }) as jest.Mock;

    await act(async () => {
      render(<Wrapper />);
    });

    const afterBtn = screen.getByTestId("after-btn")
    // await userEvent.click(afterBtn)
    fireEvent.click(afterBtn);

    // expect(window.location.search).toBe("?page=2");

    // const mockSearchParams = new URLSearchParams();
    // mockSearchParams.set("page", "2");

    // jest.mock('react-router-dom', () => ({
    //   ...jest.requireActual('react-router-dom'),
    //   useSearchParams: () => [mockSearchParams]
    // }));

    // expect(mockSetSearchParams).toHaveBeenCalledWith({}, "", "/?page=2");
    // window.history.pushState = originalSetSearchParams;

    // await waitFor(() => {
    //   const searchParams = new URLSearchParams(window.location.search);
    //   // console.log(searchParams);
    //   expect(searchParams.get("page")).toBe("2");
    // });
    await waitFor(() => {
      console.log(window.location.search)
      console.log(window.location.href)
      // expect(window.location.search).toBe("/?page=2");
    });
  });

});
