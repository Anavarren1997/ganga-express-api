import PalletService from '../services/pallet.service.js';
import GangaService from '../services/ganga.service.js';
import { SuccessHttpResponse } from '../utils/httpResponses/success.httpResponse.ts';
import { CreatedHttpResponse } from '../utils/httpResponses/created.httpResponse.ts';
import PalletResponse from '../responses/pallet.response.js';
import GangaResponse from '../responses/ganga.response.js';

const getAllPallets = async (req, res) => {
  const pallets = await PalletService.getAllPallets();

  new SuccessHttpResponse(res, {
    pallets: new PalletResponse(pallets).buildPalletResponse(),
  }).send();
};

const getPalletById = async (req, res) => {
  const { palletId } = req.params;
  const pallet = await PalletService.getPalletById({ palletId });
  new SuccessHttpResponse(res, {
    pallet: new PalletResponse(pallet).buildPalletResponse(),
  });
};

const createPallet = async (req, res) => {
  const { name, priceWorth, costPrice, vat, shippingPrice } = req.body;
  const newPallet = await PalletService.createPallet({
    name,
    priceWorth,
    costPrice,
    vat,
    shippingPrice,
  });

  new CreatedHttpResponse(res, {
    pallet: new PalletResponse(newPallet).buildPalletResponse(),
  });
};

const updatePalletById = async (req, res) => {
  const { palletId } = req.params;
  const {
    name,
    priceWorth,
    costPrice,
    vat,
    shippingPrice,
    moneyReturn,
    totalPaid,
  } = req.body;
  const updatedPallet = await PalletService.updatePalletById({
    palletId,
    name,
    priceWorth,
    costPrice,
    vat,
    shippingPrice,
    moneyReturn,
    totalPaid,
  });

  new SuccessHttpResponse(res, {
    pallet: new PalletResponse(updatedPallet).buildPalletResponse(),
  });
};

const deletePalletById = async (req, res) => {
  const { palletId } = req.params;
  const deletedPallet = await PalletService.deletePalletById({ palletId });

  new SuccessHttpResponse(res, {
    pallet: new PalletResponse(deletedPallet).buildPalletResponse(),
  });
};

const createGangaForPallet = async (req, res) => {
  const { palletId } = req.params;
  const { amazonUrl, realPrice, buyPrice } = req.body;
  const newGanga = await GangaService.createGangaForPallet({
    palletId,
    amazonUrl,
    realPrice,
    buyPrice,
  });

  new CreatedHttpResponse(res, {
    ganga: new GangaResponse(newGanga).buildGangaResponse(),
  }).send();
};

const createGangasFromCsvForPallet = async (req, res) => {
  const { palletId } = req.params;
  const filePath = req.file.path;
  const gangas = await GangaService.createGangasFromCSV({ filePath, palletId });

  new CreatedHttpResponse(res, {
    gangas: new GangaResponse(gangas).buildGangaResponse(),
  }).send();
};

export default {
  getAllPallets,
  getPalletById,
  createPallet,
  updatePalletById,
  deletePalletById,
  createGangaForPallet,
  createGangasFromCsvForPallet,
};
