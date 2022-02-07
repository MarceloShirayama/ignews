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

// # mocks
const mockUseSession = (isActive: object = null) => {
  const mockUseSession: MockedFunction<typeof useSession> = useSession as any;
  const result = mockUseSession.mockReturnValueOnce({
    data: isActive,
  } as any);
  return result;
};

const mockUseRouter = () => {
  const mockUseRouter: MockedFunction<typeof useRouter> = useRouter as any;
  const mockPush = jest.fn();
  mockUseRouter.mockReturnValueOnce({
    push: mockPush,
  } as any);
  return mockPush;
};

type GetPrismicClientMock = {
  data: {
    title: [{ type: string; text: string }];
    content: [{ type: string; text: string }];
  };
  last_publication_date: string;
};

const mockGetPrismicClient = ({
  data,
  last_publication_date,
}: GetPrismicClientMock) => {
  const mockGetPrismicClient: MockedFunction<typeof getPrismicClient> =
    getPrismicClient as any;

  const result = mockGetPrismicClient.mockReturnValueOnce({
    getByUID: jest.fn().mockResolvedValueOnce({
      data,
      last_publication_date,
    }),
  } as any);

  return result;
};

describe("PostPreview page", () => {
  it("renders correctly", () => {
    mockUseSession();

    render(<PostPreview post={postFake} />);

    expect(screen.getByText(postFake.title)).toBeInTheDocument();
    expect(screen.getByText(postFake.updatedAt)).toBeInTheDocument();
    expect(screen.getByText(postFake.content)).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when active subscription", async () => {
    mockUseSession({ activeSubscription });
    const mockPush = mockUseRouter();

    render(<PostPreview post={postFake} />);

    expect(mockPush).toHaveBeenCalledWith(`/posts/${postFake.slug}`);
  });

  it("loads initial data with getStaticProps", async () => {
    mockUseSession({ activeSubscription });

    mockGetPrismicClient({
      data: {
        title: [{ type: "heading", text: postFake.title }],
        content: [{ type: "paragraph", text: postFake.content }],
      },
      last_publication_date: lastPublicationDateFake,
    });

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
