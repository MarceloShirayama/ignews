import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/dist/utils/testing";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

const fakePosts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "fake-excerpt",
    updatedAt: "10 de Abril",
  },
];
const fakeLastPublicationDate = "04-01-2022";

const fakeLastPublicationDateFormatted = new Date(
  fakeLastPublicationDate
).toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

jest.mock("../../services/prismic");

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

  it("loads initial data with getStaticProps", async () => {
    const mockedGetPrismicClient = mocked(getPrismicClient);

    mockedGetPrismicClient.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: fakePosts[0].slug,
            data: {
              title: [{ type: "heading", text: fakePosts[0].title }],
              content: [{ type: "paragraph", text: fakePosts[0].excerpt }],
            },
            last_publication_date: fakeLastPublicationDate,
          },
        ],
      }),
    } as any);

    const result = await getStaticProps({});

    expect(result).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: fakePosts[0].slug,
              title: fakePosts[0].title,
              excerpt: fakePosts[0].excerpt,
              updatedAt: fakeLastPublicationDateFormatted,
            },
          ],
        },
      })
    );
  });
});
