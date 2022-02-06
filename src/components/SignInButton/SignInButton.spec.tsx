import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { MockedFunction } from "ts-jest";
import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const mockUseSession: MockedFunction<typeof useSession> = useSession as any;
    mockUseSession.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const mockUseSession: MockedFunction<typeof useSession> = useSession as any;
    mockUseSession.mockReturnValueOnce({
      data: {
        activeSubscription: {},
        expires: "",
        user: {
          name: "John Doe",
        },
      },
      status: "authenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
