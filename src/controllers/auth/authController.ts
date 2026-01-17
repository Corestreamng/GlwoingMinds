import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {prisma} from "../../lib/prisma";

export const SignUp = expressAsyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: role,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully", newUser, hasError: false });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occured",
      error: error.message,
      hasError: false,
    });
  }
});

export const Login = expressAsyncHandler(async (req, res) => {
  const { email, password, fullName } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        fullName,
        email,
      },
    });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const authenticate = await bcrypt.compare(password, user.password);
    if (!authenticate) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    res.status(200).json({ message: "Login Successful" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error?.message });
    console.log(error);
  }
});
