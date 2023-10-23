import Express from "express";
import User from "./../schemas/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req: Express.Request, res: Express.Response) => {
  // get email and password from request
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(401).send({ message: "Required name, email and password" });
  }

  // Check if this user already exists or not
  const user = await User.findOne({
    email,
  });

  if (user) {
    res.status(401).send({ message: "User with same email already exists." });
  }

  // If not create record of this user
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(hashedPassword);

  const newUser = new User({
    name,
    email,
    authentication: {
      password: hashedPassword,
    },
  });

  newUser.save();

  // return user info
  res.status(201).send(newUser);
};

const loginUser = async (req: Express.Request, res: Express.Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({ message: "Required email and password" });
  }

  // Check if this user exists or not
  const user = await User.findOne({ email }).select("+authentication.password");
  if (!user) {
    return res.status(400).send({
      message: "User with that mail does not exists. Please sign up first",
    });
  }

  // Check if password matches in the database
  console.log(password, user?.authentication);
  const passwordMatch = await bcrypt.compare(
    password,
    user?.authentication?.password as string
  );
  if (!passwordMatch) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  if (user && user.authentication) {
    user.authentication.access_token = jwt.sign(
      String(user?._id),
      process.env.APP_SECRET as string
    );
  }

  await user?.save();
  console.log(user?.authentication?.access_token);

  // set access token, refresh token in cookies and return user info
  res.cookie("AUTH_COOKIE", user?.authentication?.access_token, {
    httpOnly: true,
  });

  return res.status(200).send(user);
};

const getAllUsers = async (req: Express.Request, res: Express.Response) => {
  const users = await User.find();

  res.send(users).status(200);
};

const logout = async (req: Express.Request, res: Express.Response) => {
  res.cookie("AUTH_COOKIE", "");

  res.status(200).send({ message: "User logout successfully!" });
};

const getCurrLoggedInUser = () => {};

export { registerUser, loginUser, getAllUsers, getCurrLoggedInUser, logout };
