import { render, screen } from "@testing-library/react";
import Posts from "../../pages/posts";

const fakePosts = [
  {
    slug: "fake-slug",
    title: "fake-title",
    excerpt: "fake-excerpt",
    updatedAt: "fake-updated-at",
  },
];

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={fakePosts} />);

    expect(screen.getByText(fakePosts[0].title)).toBeInTheDocument();
    expect(screen.getByText(fakePosts[0].excerpt)).toBeInTheDocument();
    expect(screen.getByText(fakePosts[0].updatedAt)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/posts/${fakePosts[0].slug}`
    );
  });
});
