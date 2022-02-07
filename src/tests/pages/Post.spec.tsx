import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import { mocked } from "ts-jest/dist/utils/testing";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../services/prismic";

jest.mock("next-auth/react");

jest.mock("../../services/prismic");

// # input fake data
const fakePost = {
  slug: "my-new-post",
  title: "My New Post",
  content: "fake-post-content",
  updatedAt: "10 de Abril",
};
const fakeLastPublicationDate = "04-01-2022";
const activeSubscription = "fake-active subscription";

// # format output date
const fakeLastPublicationDateFormatted = new Date(
  fakeLastPublicationDate
).toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={fakePost} />);

    expect(screen.getByText(fakePost.title)).toBeInTheDocument();
    expect(screen.getByText(fakePost.updatedAt)).toBeInTheDocument();
  });

  it("redirects user if no subscription is found", async () => {
    const mockedGetSession = mocked(getSession);

    mockedGetSession.mockResolvedValueOnce({ activeSubscription: null } as any);

    const result = await getServerSideProps({
      req: { cookies: {} },
      params: { slug: `${fakePost.slug}` },
    } as any);

    expect(result).toEqual(
      expect.objectContaining({
        redirect: {
          destination: `/posts/preview/${fakePost.slug}`,
          permanent: false,
        },
      })
    );
  });

  it("redirects user if subscription is found", async () => {
    const mockedGetSession = mocked(getSession);

    const mockedGetPrismicClient = mocked(getPrismicClient);

    mockedGetPrismicClient.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: fakePost.title }],
          content: [{ type: "paragraph", text: fakePost.content }],
        },
        last_publication_date: fakeLastPublicationDate,
      }),
    } as any);

    mockedGetSession.mockResolvedValueOnce({ activeSubscription } as any);

    const response = await getServerSideProps({
      params: { slug: `${fakePost.slug}` },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: fakePost.slug,
            title: fakePost.title,
            content: `<p>${fakePost.content}</p>`,
            updatedAt: fakeLastPublicationDateFormatted,
          },
        },
      })
    );
  });
});
