import { render, screen } from "@testing-library/react";
import Home from "../src/app/(home)/page";
import "@testing-library/jest-dom";

export class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}

window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /JG's Next.js Boilerplate/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
