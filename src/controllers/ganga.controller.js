import GangaResponse from '../responses/ganga.response.js';
import GangaService from '../services/ganga.service.js';
import { CreatedHttpResponse } from '../utils/httpResponses/created.httpResponse';
import { SuccessHttpResponse } from '../utils/httpResponses/success.httpResponse';

const getAllGangas = async (req, res) => {
  const gangas = await GangaService.getAllGangas();

  new SuccessHttpResponse(res, {
    ganga: new GangaResponse(gangas).buildGangaResponse(),
  }).send();
};

const getGangaById = async (req, res) => {
  const { gangaId } = req.params;
  const ganga = await GangaService.getGangaById({ gangaId });

  new SuccessHttpResponse(res, {
    ganga: new GangaResponse(ganga).buildGangaResponse(),
  }).send();
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

  new SuccessHttpResponse(res, {
    ganga: new GangaResponse(updatedGanga).buildGangaResponse(),
  }).send();
};

const deleteGangaById = async (req, res) => {
  const { gangaId } = req.params;
  const deletedGanga = await GangaService.deleteGangaById({ gangaId });

  new SuccessHttpResponse(res, {
    ganga: new GangaResponse(deletedGanga).buildGangaResponse(),
  }).send();
};

const createGangasFromCSV = async (req, res) => {
  const filePath = req.file.path;
  const gangas = await GangaService.createGangasFromCSV({ filePath });

  new CreatedHttpResponse(res, {
    gangas: new GangaResponse(gangas).buildGangaResponse(),
  }).send();
};

export default {
  getAllGangas,
  getGangaById,
  updateGangaById,
  deleteGangaById,
  createGangasFromCSV,
};
