import { NextApiRequest, NextApiResponse } from "next";

export default function ApiSearchUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Jack Doe" },
  ];

  return res.json(users);
}
