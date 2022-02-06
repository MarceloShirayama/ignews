import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MockedFunction } from "ts-jest";
import { SubscribeButton } from "../SubscribeButton";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const mockUseSession: MockedFunction<typeof useSession> = useSession as any;
    mockUseSession.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirect to signIn route when user is not logged in", () => {
    const mockUseSession: MockedFunction<typeof useSession> = useSession as any;
    mockUseSession.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    const mockSignIn: MockedFunction<typeof signIn> = signIn as any;

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(mockSignIn).toHaveBeenCalled();
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith("github");
  });

  it("redirects to posts when user already has subscription", () => {
    const mockUseSession: MockedFunction<typeof useSession> = useSession as any;
    mockUseSession.mockReturnValueOnce({
      data: {
        expires: "",
        user: { name: "John Doe" },
        activeSubscription: {},
      },
      status: "authenticated",
    });
    const mockedUseRouter: MockedFunction<typeof useRouter> = useRouter as any;
    const mockedPush = jest.fn();
    mockedUseRouter.mockReturnValueOnce({ push: mockedPush } as any);

    render(<SubscribeButton />);

    fireEvent.click(screen.getByText("Subscribe now"));

    expect(mockedPush).toHaveBeenCalled();
    expect(mockedPush).toHaveBeenCalledTimes(1);
    expect(mockedPush).toHaveBeenCalledWith("/posts");
  });
});
