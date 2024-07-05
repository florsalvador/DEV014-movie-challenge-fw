import React from "react";
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../src/components/Pagination";

describe("Pagination component", () => {
  const onClick = jest.fn();

  test("Renders first page and last page buttons, as well as the before and after buttons", () => {
    const dataPagination = {
      currentPage: 2,
      totalPages: 10
    }
    render(<Pagination 
      currentPage={dataPagination.currentPage} 
      totalPages={dataPagination.totalPages} 
      onSelectPage={onClick} 
    />);
    const firstPage = screen.getByText("1");
    const lastPage = screen.getByText(dataPagination.totalPages);
    expect(firstPage).toBeInTheDocument();
    expect(lastPage).toBeInTheDocument();
    expect(screen.getByTestId("before-btn")).toBeInTheDocument();
    expect(screen.getByTestId("after-btn")).toBeInTheDocument();
  })

  test("The before button is disabled if the current page is the first page", () => {
    const dataPagination = {
      currentPage: 1,
      totalPages: 10
    }
    render(<Pagination 
      currentPage={dataPagination.currentPage} 
      totalPages={dataPagination.totalPages} 
      onSelectPage={onClick} 
    />);
    const beforeBtn = screen.getByTestId("before-btn");
    expect(beforeBtn).toHaveAttribute("disabled");
  })

  test("The after button is disabled if the current page is the last page", () => {
    const dataPagination = {
      currentPage: 10,
      totalPages: 10
    }
    render(<Pagination 
      currentPage={dataPagination.currentPage} 
      totalPages={dataPagination.totalPages} 
      onSelectPage={onClick} 
    />);
    const afterBtn = screen.getByTestId("after-btn");
    expect(afterBtn).toHaveAttribute("disabled");
  })

  test("Renders '...' button 3 places after current page button if current page is not 1 or 2", () => {
    const dataPagination = {
      currentPage: 5,
      totalPages: 10
    }
    render(<Pagination 
      currentPage={dataPagination.currentPage} 
      totalPages={dataPagination.totalPages} 
      onSelectPage={onClick} 
    />);
    const buttons = screen.getAllByRole("button");
    const indexOfCurrentPage = buttons.indexOf(screen.getByTestId("current-page-btn"));
    expect(buttons[indexOfCurrentPage+3].innerHTML).toBe(". . .")
  })
  
  test("Renders '...' button 3 places before current page button if current page is not 1 or 2", () => {
    const dataPagination = {
      currentPage: 5,
      totalPages: 10
    }
    render(<Pagination 
      currentPage={dataPagination.currentPage} 
      totalPages={dataPagination.totalPages} 
      onSelectPage={onClick} 
    />);
    const buttons = screen.getAllByRole("button");
    const indexOfCurrentPage = buttons.indexOf(screen.getByTestId("current-page-btn"));
    expect(buttons[indexOfCurrentPage-3].innerHTML).toBe(". . .")
  })

  test("Executes callback when user clicks one of the buttons", () => {
    const dataPagination = {
      currentPage: 3,
      totalPages: 10
    }
    render(<Pagination 
      currentPage={dataPagination.currentPage} 
      totalPages={dataPagination.totalPages} 
      onSelectPage={onClick} 
    />);
    const afterBtn = screen.getByTestId("after-btn");
    fireEvent.click(afterBtn);
    expect(onClick).toHaveBeenCalled();
  })
})
