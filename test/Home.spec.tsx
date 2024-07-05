import React from "react";
import { act, useState } from 'react';
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import Home from "../src/components/Home.tsx"
import { response, transformedResults } from "./mockData.ts"

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

let mockSearchParam = "";
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
    return [
      params,
      (newParams: string) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      }
    ];
  }
}));

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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      }),
    ) as jest.Mock;
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
    global.fetch = jest.fn(() =>
      new Promise(resolve =>
        setTimeout(() =>
          resolve({
            ok: true,
            json: () => Promise.resolve(response),
          }),
        1000)
      )
    ) as jest.Mock;
    await act(async () => {
      render(<Wrapper />);
    });
    const loadingMsg = screen.getByTestId("loading-message");
    expect(loadingMsg).toBeInTheDocument();
  });

  test("Renders error message if the API request fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: "error"}),
      }),
    ) as jest.Mock;
    await act(async () => {
      render(<Home />);
    });
    const errorMsg = screen.getByTestId("error-message");
    expect(errorMsg).toBeInTheDocument();
  });

  test("Renders pagination buttons", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      }),
    ) as jest.Mock;
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
});
