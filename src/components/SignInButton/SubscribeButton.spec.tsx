import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { MockedFunction } from "ts-jest";
import { SubscribeButton } from "../SubscribeButton";

jest.mock("next-auth/react");

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
});
