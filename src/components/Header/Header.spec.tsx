import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
    };
  },
}));

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

describe("Home component", () => {
  it("renders correctly", () => {
    render(<Header />);

    const image = document.querySelector("img") as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/images/logo.svg");
    expect(screen.getByAltText("Logo ig.news")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });
});
