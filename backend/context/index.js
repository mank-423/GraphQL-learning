import jwt from "jsonwebtoken";

export const buildContext = async ({ req }) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];

  let userId = null;
  if (token) {
    const decoded = jwt.decode(token);
    userId = decoded?.sub || null;
  }

  return { userId };
};
