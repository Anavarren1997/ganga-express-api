import PalletService from '../services/pallet.service.js';
import GangaService from '../services/ganga.service.js';

const getAllPallets = async (req, res) => {
  const Pallets = await PalletService.getAllPallets();
  res.send({ status: 'OK', data: Pallets });
};

const getPalletById = async (req, res) => {
  const { palletId } = req.params;
  const pallet = await PalletService.getPalletById({ palletId });
  res.send({ status: 'OK', data: pallet });
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
  res.send({ status: 'OK', data: newPallet });
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
  res.send({ status: 'OK', data: updatedPallet });
};

const deletePalletById = async (req, res) => {
  const { palletId } = req.params;
  const deletedPallet = await PalletService.deletePalletById({ palletId });
  res.send({ status: 'OK', data: deletedPallet });
};

const createGangaForPallet = async (req, res) => {
  const { palletId } = req.params;
  const { amazonUrl, realPrice, buyPrice } = req.body;
  const newPallet = await GangaService.createGangaForPallet({
    palletId,
    amazonUrl,
    realPrice,
    buyPrice,
  });
  res.send({ status: 'OK', data: newPallet });
};

const createGangasFromCsvForPallet = async (req, res) => {
  const { palletId } = req.params;
  const filePath = req.file.path;
  const gangas = await GangaService.createGangasFromCSV({ filePath, palletId });
  res.send({ status: 'OK', data: gangas });
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
