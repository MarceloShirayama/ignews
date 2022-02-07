import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

describe("Async component", () => {
  it("renders correctly method 1", async () => {
    render(<Async />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();
    expect(
      await screen.findByText("Click me", {}, { timeout: 2000 })
    ).toBeInTheDocument();
  });

  it("renders correctly method 2", async () => {
    render(<Async />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.getByText("Click me")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("renders correctly method 3", async () => {
    render(<Async />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByText("Click me 2"), {
      timeout: 2000,
    });
  });
});
