import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MovieList from "../src/components/MovieList.tsx";
import { transformedData } from "./mockData.ts";

describe("MovieList component", () => {
  test("Renders movie titles", () => {
    render(<MovieList movies={transformedData} />);
    const movieTitle1 = screen.getByText(/Inside Out 2/);
    const movieTitle2 = screen.getByText(/Kingdom of the Planet of the Apes/);
    expect(movieTitle1).toBeInTheDocument();
    expect(movieTitle2).toBeInTheDocument();
  })

  test("Renders movie images", () => {
    render(<MovieList movies={transformedData} />);
    const movieImages = screen.getAllByRole("img");
    expect(movieImages.length).toBe(2);
    // console.log(movieImages)
    // const movieImg1 = screen.getByRole("img");
    // const movieImg2 = screen.getByRole("img");
    // expect(movieImg1).toBeInTheDocument();
    // expect(movieImg2).toBeInTheDocument();
  })

  test("Renders movie years", () => {
    render(<MovieList movies={transformedData} />);
    const movieYears = screen.getAllByText("2024");
    expect(movieYears.length).toBe(2);
  })

  test("Renders an empty div if there are no movies in the array", () => {
    const emptyList = [];
    const { container } = render(<MovieList movies={emptyList} />);
    expect(container.innerHTML).toBe(`<div class="movie-list"></div>`);
  })

  // test("Renders an error message if the movie list is empty", () => {
  //   const emptyList = [];
  //   const { container } = render(<MovieList movies={emptyList} />);
  //   expect(container.innerHTML).toBe(`<p>Sorry, this content is not available</p>`)
  //   // console.log(container.innerHTML);

  //   // {movieList.length == 0 ? (
  //   //   <p>Sorry, this content is not available</p>
  //   // ) : (
  //   //   <div className="movie-list">{movieList}</div>
  //   // )}
  // })

})
