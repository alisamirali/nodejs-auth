import Express from "express";
import User from "../schemas/user";

export const validator = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const cookie = req.cookies;
  const auth_cookie = cookie.AUTH_COOKIE;

  if (!auth_cookie) {
    return res.status(401).send({
      message:
        "You are not authorized to make this request. Please login first",
    });
  }

  const user_exists_with_access_token = await User.findOne({
    "authentication.access_token": auth_cookie,
  });

  if (!user_exists_with_access_token) {
    return res.status(401).send({
      message:
        "You are not authorized to make this request. Please login first",
    });
  }

  next();
};
