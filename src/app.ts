import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppRoutes from "./routes/index";
import path from 'path'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api/v1", AppRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
