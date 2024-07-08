import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ListOptions from "../src/components/ListOptions";

describe("ListOptions component", () => {
  const options = [
    { value: "28", label: "Action" },
    { value: "35", label: "Comedy" }
  ]
  const onClick = jest.fn();

  test("Renders a select element with options and a button", () => {
    render(<ListOptions 
      selectType={"Filter by genre"} 
      options={options} 
      selectedOption={null} 
      onChange={onClick} 
      onClear={onClick}  
    />);
    const select = screen.getByTestId("select")
    const option1 = screen.getByTestId(options[0].value)
    const option2 = screen.getByTestId(options[1].value)
    const button = screen.getByRole("button")
    expect(select).toBeInTheDocument();
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("Changes the select value when an option is selected", () => {
    render(<ListOptions 
      selectType={"Filter by genre"} 
      options={options} 
      selectedOption={null} 
      onChange={onClick} 
      onClear={onClick}  
    />);
    const select = screen.getByTestId("select")
    fireEvent.change((select), { target: { value: options[0].value } });
    expect(select).toHaveValue(options[0].value);
  });

  test("Resets select value when the button is clicked", () => {
    render(<ListOptions 
      selectType={"Filter by genre"} 
      options={options} 
      selectedOption={options[1]} 
      onChange={onClick} 
      onClear={onClick}  
    />);
    const select = screen.getByTestId("select");
    const button = screen.getByRole("button");
    fireEvent.click((button));
    waitFor(() => {
      expect(select).toHaveValue("");
    });
  });
})
