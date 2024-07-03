import React from "react";
import "@testing-library/jest-dom";
import { act } from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, /* Routes, Route */ } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Home from "../src/components/Home.tsx";
import { response, transformedResults } from "./mockData.ts";

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

// const Wrapper = () => {
//   return (
//     <MemoryRouter initialEntries={['/']}>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </MemoryRouter>
//   );
// };

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
      render(<Wrapper />);
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

  test("Redirects to the next page when the after button is clicked", async () => {
    // const getPageParams = () => {
    //   const searchParams = new URLSearchParams(window.location.search);
    //   const page = searchParams.get("page");
    //   return page;
    // }

    // Object.defineProperty(window, 'location', {
    //   value: {
    //     search: '',
    //   },
    // });

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
    await userEvent.click(currentBtn)
    
    await waitFor(() => {
      console.log(window.location.search)
      console.log(window.location.href)
      // expect(page).toBe(1);
      // expect(window.location.search).toBe("/?page=1");
    });
  });
});
