"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./blog/route"));
const route_2 = __importDefault(require("./authRoute/route"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Api Running successfully!",
        data: {
            version: "1.0",
        },
    });
});
router.use("/blog", route_1.default);
router.use("/auth", route_2.default);
exports.default = router;
