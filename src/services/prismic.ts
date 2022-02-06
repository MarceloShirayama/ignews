import Prismic from "@prismicio/client";

// TODO: migrate to @prismício/client v6
export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(process.env.PRISMIC_END_POINT, {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismic;
}
