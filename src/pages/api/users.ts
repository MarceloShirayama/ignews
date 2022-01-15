import { NextApiRequest, NextApiResponse } from "next";

export default function ApiSearchUsers(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Jack Doe" },
  ];

  return res.json(users);
}
