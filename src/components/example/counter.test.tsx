import { fireEvent, render, screen } from "@testing-library/react";

import Counter from "./counter";

describe("Counter", () => {
  it("render counter 컴포넌트 - decrease 버튼 클릭", () => {
    render(<Counter />);

    const countValue = screen.getByTestId("count-value");
    expect(countValue).toHaveTextContent("0");

    const decreaseButton = screen.getByTestId("decrease");
    fireEvent.click(decreaseButton);

    expect(countValue).toHaveTextContent("-1");
  });

  it("render counter 컴포넌트 - increase 버튼 클릭", () => {
    render(<Counter />);

    const countValue = screen.getByTestId("count-value");
    expect(countValue).toHaveTextContent("0");

    const decreaseButton = screen.getByTestId("increase");
    fireEvent.click(decreaseButton);

    expect(countValue).toHaveTextContent("1");
  });
});
