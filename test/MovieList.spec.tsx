import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MovieList from "../src/components/MovieList.tsx";
import { transformedData } from "./mockData.ts";

describe("MovieList component", () => {
  test("Renders movie titles", () => {
    render(<MovieList movies={transformedData} />);
    const movieTitle1 = screen.getByText(transformedData[0].title);
    const movieTitle2 = screen.getByText(transformedData[1].title);
    expect(movieTitle1).toBeInTheDocument();
    expect(movieTitle2).toBeInTheDocument();
  })

  test("Renders movie images", () => {
    render(<MovieList movies={transformedData} />);
    const movieImages = screen.getAllByRole("img");
    expect(movieImages[0].getAttribute('src')).toBe(transformedData[0].posterPath)
    expect(movieImages[1].getAttribute('src')).toBe(transformedData[1].posterPath)
  })

  test("Renders movie years", () => {
    render(<MovieList movies={transformedData} />);
    const movieYears = screen.getAllByText(/2024/);
    expect(movieYears.length).toBe(2);
  })

  test("Renders an empty div if there are no movies in the array", () => {
    const emptyList = [];
    const { container } = render(<MovieList movies={emptyList} />);
    expect(container.innerHTML).toBe(`<div class="movie-list"></div>`);
  })
})
