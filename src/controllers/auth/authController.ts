import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {prisma} from "../../lib/prisma";
import jwt from 'jsonwebtoken'

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
    const {password:_, ...user} = newUser
    res
      .status(201)
      .json({ message: "User created successfully", user, hasError: false });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occured",
      error: error.message,
      hasError: true,
    });
  }
});

export const Login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error?.message,
    });
  }
});