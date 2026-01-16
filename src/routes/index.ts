import express from "express";
import BlogRoutes from "./blog/route";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Api Running successfully!",
    data: {
      version: "1.0",
    },
  });
});

router.use("/blog", BlogRoutes);

export default router;
