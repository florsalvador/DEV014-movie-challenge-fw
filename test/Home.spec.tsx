import React from "react";
import {act} from 'react';
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Home from "../src/components/Home.tsx"
import { response, transformedData } from "./mockData.ts"

jest.mock("../src/utils/getEnv", () => ({
  getToken: () => "faketoken"
}));

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
      render(<Home />);
    });
    const movieTitle1 = screen.getByText(transformedData[0].title)
    const movieTitle2 = screen.getByText(transformedData[1].title)
    const movieImages = screen.getAllByRole("img");
    expect(movieTitle1).toBeInTheDocument();
    expect(movieTitle2).toBeInTheDocument();
    expect(movieImages.length).toBe(2);
  });

  test("Renders loading message", async () => {
    jest.spyOn(React, "useState")
    .mockImplementationOnce(() => [[], () => null])
    .mockImplementationOnce(() => [true, () => null])
    .mockImplementationOnce(() => [false, () => null])
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      }),
    ) as jest.Mock;
    await act(async () => {
      render(<Home />);
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
});
