import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MockedFunction } from "ts-jest/dist/utils/testing";
import PostPreview, { getStaticProps } from "../pages/posts/preview/[slug]";
import { getPrismicClient } from "../services/prismic";

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../services/prismic");

// # input fake data
const postFake = {
  slug: "fake-post-slug",
  title: "fake-post-title",
  content: "fake-post-content",
  updatedAt: "fake-post-updatedAt",
};
const activeSubscription = "fake-active-subscription";
const lastPublicationDateFake = "04-01-2022";

// # format output date
const fakeLastPublicationDateFormatted = new Date(
  lastPublicationDateFake
).toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

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

  it("redirects user to full post when active subscription", async () => {
    const mockUseSession: MockedFunction<typeof useSession> = useSession as any;
    const mockUseRouter: MockedFunction<typeof useRouter> = useRouter as any;
    const mockPush = jest.fn();

    mockUseSession.mockReturnValueOnce({
      data: { activeSubscription },
    } as any);

    mockUseRouter.mockReturnValueOnce({
      push: mockPush,
    } as any);

    render(<PostPreview post={postFake} />);

    expect(mockPush).toHaveBeenCalledWith(`/posts/${postFake.slug}`);
  });

  it("loads initial data with getStaticProps", async () => {
    const mockUseSession: MockedFunction<typeof useSession> = useSession as any;

    mockUseSession.mockReturnValueOnce({
      data: { activeSubscription },
    } as any);

    const mockGetPrismicClient: MockedFunction<typeof getPrismicClient> =
      getPrismicClient as any;

    mockGetPrismicClient.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: postFake.title }],
          content: [{ type: "paragraph", text: postFake.content }],
        },
        last_publication_date: lastPublicationDateFake,
      }),
    } as any);

    const response = await getStaticProps({ params: { slug: postFake.slug } });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: postFake.slug,
            title: postFake.title,
            content: `<p>${postFake.content}</p>`,
            updatedAt: fakeLastPublicationDateFormatted,
          },
        },
      })
    );
  });
});
