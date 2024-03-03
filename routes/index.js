import GangaRouter from "./ganga.routes.js";
import express from "express";

const router = express.Router();

router.use("/gangas", GangaRouter);

export default router;
