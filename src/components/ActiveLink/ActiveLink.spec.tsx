import { render, screen } from "@testing-library/react";
import ActiveLink from ".";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
    };
  },
}));

describe("ActiveLink", () => {
  it("renders correctly", () => {
    const { debug } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
