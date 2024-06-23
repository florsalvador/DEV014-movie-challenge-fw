import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from "../src/App.tsx";

describe("App", () => {
  test("Renders the text 'learn more'", () => {
    render(<App />);
    const learnText = screen.getByText(/learn more/i);
    expect(learnText).toBeInTheDocument();
  });
});
