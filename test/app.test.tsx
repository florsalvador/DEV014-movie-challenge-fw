import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from "../src/components/App.tsx";

describe("App component", () => {
  test("Renders the title 'BestMovies'", () => {
    render(<App />);
    const learnText = screen.getByText(/BestMovies/i);
    expect(learnText).toBeInTheDocument();
  });
});
