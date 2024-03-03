import express from "express";
import GangasController from "../controllers/ganga.controller.js";

const router = express.Router();

router.get("/", GangasController.getAllGangas);

router.get("/:gangaId", GangasController.getGangaById);

router.post("/", GangasController.createGanga);

router.delete("/:gangaId", GangasController.deleteGangaById);

router.put("/:gangaId", GangasController.updateGangaById);

export default router;
