import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return {
        data: null,
        status: "loading",
      };
    },
  };
});

describe("Home page", () => {
  it("Should render correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: 10 }} />);

    const expectedRegulaExpression = /10/;
    const regularExpression = screen.getByText(expectedRegulaExpression);
    const image = document.querySelector("img") as HTMLImageElement;

    expect(regularExpression).toBeInTheDocument();
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
    expect(image.src).toContain("/images/avatar.svg");
  });
});
