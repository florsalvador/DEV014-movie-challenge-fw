import React from "react";
import "@testing-library/jest-dom";
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import Home from "../src/components/Home.tsx";
import { response, transformedResults, responseGenres } from "./mockData.ts";

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

const history = createMemoryHistory();
const RenderHome = () => {
  return <Router location={history.location} navigator={history}>
    <Home />
  </Router>
}

const getFetchMocks = () => {
  global.fetch = jest.fn((url: string) => {
    if (url.includes("genre/movie/list")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseGenres),
      });
    } else if (url.includes("discover/movie")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      });
    }
    return Promise.reject(new Error("Unknown URL"));
  }) as jest.Mock;
};

describe("Home component", () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    history.replace("");
  })

  test("Renders movie titles and images", async () => {
    getFetchMocks();
    await act(async () => {
      render(<RenderHome />);
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
      render(<RenderHome />);
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
      render(<RenderHome />);
    });
    const errorMsg = screen.getByTestId("error-message");
    expect(errorMsg).toBeInTheDocument();
  });

  test("Renders pagination buttons", async () => {
    getFetchMocks();
    await act(async () => {
      render(<RenderHome />);
    });
    const currentBtn = screen.getByTestId("current-page-btn")
    const beforeBtn = screen.getByTestId("before-btn")
    const afterBtn = screen.getByTestId("after-btn")
    expect(currentBtn).toBeInTheDocument();
    expect(beforeBtn).toBeInTheDocument();
    expect(afterBtn).toBeInTheDocument();
  });

  test("Redirects to the next page when the after button is clicked", async () => {
    getFetchMocks();
    await act(async () => {
      render(<RenderHome />);
    });
    const afterBtn = screen.getByTestId("after-btn");
    await userEvent.click(afterBtn)
    await waitFor(() => {
      expect(history.location.search).toBe("?page=2");
    });
  });

  test("Changes search param when a genre filter is selected", async () => {
    getFetchMocks();
    await act(async () => {
      render(<RenderHome />);
    });
    const selectGenre = screen.getAllByTestId("select")[0];
    await userEvent.selectOptions(selectGenre, "16")
    await waitFor(() => {
      expect(history.location.search).toBe("?genreId=16");
    });
  });

  test("Changes search param when a sortBy option is selected", async () => {
    getFetchMocks();
    await act(async () => {
      render(<RenderHome />);
    });
    const selectSort = screen.getAllByTestId("select")[1];
    await userEvent.selectOptions(selectSort, "title.asc")
    await waitFor(() => {
      expect(history.location.search).toBe("?sortBy=title.asc");
    });
  });

});
