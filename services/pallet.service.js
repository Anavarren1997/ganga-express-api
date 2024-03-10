import PalletModel from '../models/pallet.model.js';

const getAllPallets = async () => {
  const pallets = await PalletModel.getAllPallets();
  return pallets;
};

const getPalletById = async ({ palletId }) => {
  const pallet = await PalletModel.getPalletById({ palletId });
  return pallet;
};

const createPallet = async ({
  name,
  priceWorth,
  costPrice,
  vat,
  shippingPrice,
}) => {
  let totalPaid = costPrice;

  if (vat) {
    totalPaid *= 1.21;
  }

  if (shippingPrice) {
    totalPaid += shippingPrice;
  }

  const pallet = await PalletModel.createPallet({
    name,
    priceWorth,
    costPrice,
    vat,
    shippingPrice,
    totalPaid: totalPaid.toFixed(2),
  });
  return pallet;
};

const updatePalletById = async ({
  palletId,
  name,
  priceWorth,
  costPrice,
  vat,
  shippingPrice,
  totalPaid,
  moneyReturn,
}) => {
  const pallet = await PalletModel.updatePalletById({
    palletId,
    name,
    priceWorth,
    costPrice,
    vat,
    shippingPrice,
    totalPaid,
    moneyReturn,
  });
  return pallet;
};

const deletePalletById = async ({ palletId }) => {
  const pallet = await PalletModel.deletePalletById({ palletId });
  return pallet;
};

export default {
  getAllPallets,
  getPalletById,
  createPallet,
  updatePalletById,
  deletePalletById,
};
