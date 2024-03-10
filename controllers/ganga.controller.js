import GangaService from '../services/ganga.service.js';

const getAllGangas = async (req, res) => {
  const gangas = await GangaService.getAllGangas();
  res.send({ status: 'OK', data: gangas });
};

const getGangaById = async (req, res) => {
  const { gangaId } = req.params;
  const ganga = await GangaService.getGangaById({ gangaId });
  res.send({ status: 'OK', data: ganga });
};

const updateGangaById = async (req, res) => {
  const { gangaId } = req.params;
  const {
    name,
    description,
    realPrice,
    buyPrice,
    salePrice,
    sold,
    amazonLink,
  } = req.body;
  const updatedGanga = await GangaService.updateGangaById({
    gangaId,
    name,
    description,
    realPrice,
    buyPrice,
    salePrice,
    sold,
    amazonLink,
  });
  res.send({ status: 'OK', data: updatedGanga });
};

const deleteGangaById = async (req, res) => {
  const { gangaId } = req.params;
  const deletedGanga = await GangaService.deleteGangaById({ gangaId });
  res.send({ status: 'OK', data: deletedGanga });
};

const createGangasFromCSV = async (req, res) => {
  const filePath = req.file.path;
  const gangas = await GangaService.createGangasFromCSV({ filePath });
  res.send({ status: 'OK', data: gangas });
};

export default {
  getAllGangas,
  getGangaById,
  updateGangaById,
  deleteGangaById,
  createGangasFromCSV,
};
