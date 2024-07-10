import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../src/components/MovieCard.tsx";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
   useNavigate: () => mockedUsedNavigate,
}));

describe("MovieCard component", () => {
  const movie = {
    id: 653346,
    title: "Kingdom of the Planet of the Apes",
    year: "2024",
    posterPath: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    genres: [ "Science Fiction", "Adventure", "Action" ],
    overview: "Several generations in the future following Caesar's reign, apes are now the dominant species.",
    voteAverage: 6.879,
    voteCount: 1150,
  }

  test("Renders movie title", () => {
    render(<MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>);
    const title = screen.getByText(movie.title);
    expect(title).toBeInTheDocument();
  });

  test("Renders movie year", () => {
    render(<MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>);
    const year = screen.getByText(/2024/);
    expect(year).toBeInTheDocument();
  });

  test("Renders movie genres", () => {
    render(<MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>);
    const genres = screen.getByText(/Science Fiction, Adventure/);
    expect(genres).toBeInTheDocument();
  });

  test("Renders image with correct src and alt", () => {
    render(<MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", movie.posterPath);
    expect(image).toHaveAttribute("alt", movie.title);
  });

  test("Renders a different movie data", () => {
    const anotherMovie = {
      id: 1136318,
      title: "Battle Over Britain",
      year: "2023",
      posterPath: "https://image.tmdb.org/t/p/w500/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
      genres: [ "War" ],
      overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
      voteAverage: 7.412,
      voteCount: 51,
    }
    render(<MemoryRouter>
      <MovieCard movie={anotherMovie} />
    </MemoryRouter>);
    const title = screen.getByText(anotherMovie.title);
    const year = screen.getByText(/2023/);
    expect(title).toBeInTheDocument();
    expect(year).toBeInTheDocument();
  });

  test("Renders 'Title not available' if the title is null", () => {
    const noTitle = {
      id: 1136318,
      title: null as unknown as string,
      year: "2023",
      posterPath: "https://image.tmdb.org/t/p/w500/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
      genres: [ "War" ],
      overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
      voteAverage: 7.412,
      voteCount: 51,
    }
    render(<MemoryRouter>
      <MovieCard movie={noTitle} />
    </MemoryRouter>);
    const title = screen.getByText("Title not available");
    expect(title).toBeInTheDocument();
  });

  test("Renders '-' if the year is null", () => {
    const noYear = {
      id: 1136318,
      title: "Battle Over Britain",
      year: null as unknown as string,
      posterPath: "https://image.tmdb.org/t/p/w500/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
      genres: [ "War" ],
      overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
      voteAverage: 7.412,
      voteCount: 51,
    }
    render(<MemoryRouter>
      <MovieCard movie={noYear} />
    </MemoryRouter>);
    const year = screen.getByText(/-/);
    expect(year).toBeInTheDocument();
  });

  test("Renders default movie poster if posterPath includes null or undefined", () => {
    const noMoviePoster = {
      id: 1136318,
      title: "Battle Over Britain",
      year: "2023",
      posterPath: "https://image.tmdb.org/t/p/w500undefined",
      genres: [ "War" ],
      overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
      voteAverage: 7.412,
      voteCount: 51,
    }
    render(<MemoryRouter>
      <MovieCard movie={noMoviePoster} />
    </MemoryRouter>);
    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image.src).toContain("http://localhost");
  });

  test("Calls useNavigate when clicking the movie poster or title", () => {
    render(<MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      fireEvent.click(link);
    })
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(2);
  });
});
