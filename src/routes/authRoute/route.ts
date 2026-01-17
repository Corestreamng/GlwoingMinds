import express from "express";
import {
  loginValidator,
  signupValidator,
} from "../../validators/authValidator";
import { Login, SignUp } from "../../controllers/auth/authController";

const router = express.Router();

router.post("/signup", signupValidator, SignUp);
router.post("/login", loginValidator, Login);

export default router;
