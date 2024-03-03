import GangaService from "../services/ganga.service.js";

const getAllGangas = (req, res) => {
  const gangas = GangaService.getAllGangas();
  res.send("Fetched all gangas");
};

const getGangaById = (req, res) => {
  const { gangaId } = req.params;
  const ganga = GangaService.getGangaById({ gangaId });
  res.send(`Fetching ganga: ${gangaId}`);
};

const createGanga = (req, res) => {
  const newGanga = GangaService.createGanga();
  res.send("Creating gangas");
};

const updateGangaById = (req, res) => {
  const { gangaId } = req.params;
  const updatedGanga = GangaService.updateGangaById({ gangaId });
  res.send(`Updating ganga: ${gangaId}`);
};

const deleteGangaById = (req, res) => {
  const { gangaId } = req.params;
  const deletedGanga = GangaService.deleteGangaById({ gangaId });
  res.send(`Deleting ganga with id : ${gangaId}`);
};

export default {
  getAllGangas,
  getGangaById,
  createGanga,
  updateGangaById,
  deleteGangaById,
};
