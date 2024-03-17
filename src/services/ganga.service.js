import {
  scrapeGangas,
  parseGangasFromCsv,
  prepareGangasForDatabase,
} from '../helpers/ganga.helper.js';
import GangaModel from '../models/ganga.model.js';
import PalletModel from '../models/pallet.model.js';
import { csvToJson } from '../utils/csv.util.js';

const getAllGangas = async () => {
  const gangas = await GangaModel.getAllGangas();
  return gangas;
};

const getGangaById = async ({ gangaId }) => {
  const ganga = await GangaModel.getGangaById({ gangaId });
  return ganga;
};

const createGanga = async ({
  name,
  description,
  realPrice,
  buyPrice,
  salePrice,
  amazonLink,
}) => {
  const ganga = await GangaModel.createGanga({
    name,
    description,
    realPrice,
    buyPrice,
    salePrice,
    amazonLink,
  });
  return ganga;
};

const updateGangaById = async ({
  gangaId,
  name,
  description,
  realPrice,
  buyPrice,
  salePrice,
  sold,
  amazonLink,
}) => {
  const ganga = await GangaModel.updateGangaById({
    gangaId,
    name,
    description,
    realPrice,
    buyPrice,
    salePrice,
    sold,
    amazonLink,
  });
  return ganga;
};

const deleteGangaById = async ({ gangaId }) => {
  const ganga = await GangaModel.deleteGangaById({ gangaId });
  return ganga;
};

const createGangasFromCSV = async ({ filePath, palletId }) => {
  // Transformo el csv en un objeto JSON
  const jsonGangasFromCsv = await csvToJson({ filePath });

  // Transformación inicial y parseo de los datos del CSV
  const parsedGangas = parseGangasFromCsv(jsonGangasFromCsv);

  // Scrapeo de las gangas en Amazon
  const scrapedGangas = await scrapeGangas(parsedGangas);

  // obtengo el vat del pallet
  const { shipping_expenses } = await PalletModel.getPalletById({ palletId });

  // Parseo final para introducir los datos en la BD
  const gangasToCreate = prepareGangasForDatabase({
    parsedGangas,
    scrapedGangas,
    shippingExpenses: shipping_expenses,
  });

  const gangas = await GangaModel.bulkCreateGangas({
    gangas: gangasToCreate,
    palletId,
  });
  return gangas;
};

export default {
  createGangasFromCSV,
  getAllGangas,
  getGangaById,
  createGanga,
  updateGangaById,
  deleteGangaById,
};
