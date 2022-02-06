import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/dist/utils/testing";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";

jest.mock("../../services/stripe");

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return {
        data: null,
        status: "loading",
      };
    },
  };
});

describe("Home page", () => {
  it("Should render correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: 10 }} />);

    const expectedRegulaExpression = /10/;
    const regularExpression = screen.getByText(expectedRegulaExpression);
    const image = document.querySelector("img") as HTMLImageElement;

    expect(regularExpression).toBeInTheDocument();
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
    expect(image.src).toContain("/images/avatar.svg");
  });

  it("loads initial data with getStaticProps", async () => {
    const mockedRetrievePricesStripe = mocked(stripe.prices.retrieve);
    const id = "fake-price-id";
    const unit_amount = 1000;

    mockedRetrievePricesStripe.mockResolvedValue({
      id,
      unit_amount,
    } as any);

    const result = await getStaticProps({});
    console.log(result);

    expect(result).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: id,
            amount: `$${unit_amount / 100}.00`,
          },
        },
      })
    );
  });
});
