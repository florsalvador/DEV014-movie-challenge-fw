import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import MovieCard from "../src/components/MovieCard.tsx"

describe("MovieCard component", () => {
  const movie = {
    "id": 653346,
    "title": "Kingdom of the Planet of the Apes",
    "year": "2024",
    "posterPath": "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    "genreIds": [ 878, 12, 28 ],
    "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species."
  }

  test("Renders movie title", () => {
    render(<MovieCard movie={movie} />);
    const title = screen.getByText(/Kingdom of the Planet of the Apes/);
    expect(title).toBeInTheDocument();
  });

  test("Renders movie year", () => {
    render(<MovieCard movie={movie} />);
    const year = screen.getByText(/2024/);
    expect(year).toBeInTheDocument();
  });

  test("Renders image with correct src and alt", () => {
    render(<MovieCard movie={movie} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", movie.posterPath);
    expect(image).toHaveAttribute("alt", movie.title);
  })

  test("Renders a different movie data", () => {
    const anotherMovie = {
      id: 1136318,
      title: "Battle Over Britain",
      year: "2023",
      posterPath: "https://image.tmdb.org/t/p/w500/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
      genreIds: [ 10752 ],
      overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble."
    }
    render(<MovieCard movie={anotherMovie} />);
    const title = screen.getByText(anotherMovie.title);
    const year = screen.getByText(anotherMovie.year);
    expect(title).toBeInTheDocument();
    expect(year).toBeInTheDocument();
  });

  test("Renders 'Title not available' if the title is null", () => {
    const noTitle = {
      id: 1136318,
      title: null as unknown as string,
      year: "2023",
      posterPath: "https://image.tmdb.org/t/p/w500/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
      genreIds: [ 10752 ],
      overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble."
    }
    render(<MovieCard movie={noTitle} />);
    const title = screen.getByText("Title not available");
    expect(title).toBeInTheDocument();
  });

  test("Renders '-' if the year is null", () => {
    const noTitle = {
      id: 1136318,
      title: "Battle Over Britain",
      year: null as unknown as string,
      posterPath: "https://image.tmdb.org/t/p/w500/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
      genreIds: [ 10752 ],
      overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble."
    }
    render(<MovieCard movie={noTitle} />);
    const year = screen.getByText("-");
    expect(year).toBeInTheDocument();
  });

  test("Renders default movie poster if posterPath includes null or undefined", () => {
    const noMoviePoster = {
      id: 1136318,
      title: "Battle Over Britain",
      year: "2023",
      posterPath: "https://image.tmdb.org/t/p/w500undefined",
      genreIds: [ 10752 ],
      overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble."
    }
    render(<MovieCard movie={noMoviePoster} />);
    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image.src).toContain("http://localhost");
  });
});
