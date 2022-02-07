import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { MockedFunction } from "ts-jest/dist/utils/testing";
import PostPreview from "../pages/posts/preview/[slug]";

jest.mock("next-auth/react");

const postFake = {
  slug: "fake-post-slug",
  title: "fake-post-title",
  content: "fake-post-content",
  updatedAt: "fake-post-updatedAt",
};

describe("PostPreview page", () => {
  it("renders correctly", () => {
    const mockUseSession: MockedFunction<typeof useSession> = useSession as any;
    mockUseSession.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    render(<PostPreview post={postFake} />);

    expect(screen.getByText(postFake.title)).toBeInTheDocument();
    expect(screen.getByText(postFake.updatedAt)).toBeInTheDocument();
    expect(screen.getByText(postFake.content)).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });
});
