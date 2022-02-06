import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
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
});
