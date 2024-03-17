import { dbPool } from '../app';

const getAllPallets = async () => {
  const [pallets] = await dbPool.query(`SELECT * from pallets`);
  return pallets;
};

const getPalletById = async ({ palletId }) => {
  const [pallets] = await dbPool.query(`SELECT * from pallets WHERE id = ?;`, [
    palletId,
  ]);

  if (pallets.length === 0) return null;

  return pallets[0];
};

const createPallet = async ({
  name,
  priceWorth,
  costPrice,
  vat,
  shippingPrice,
  totalPaid,
}) => {
  await dbPool.query(
    `INSERT INTO pallets (name, price_worth, cost_price, vat, shipping_expenses, total_paid)
          VALUES (?, ?, ?, ?, ?, ?);`,
    [name, priceWorth, costPrice, vat, shippingPrice, totalPaid]
  );

  // Obtener la fila recién insertada
  const [pallets] = await dbPool.query(
    `SELECT * FROM pallets WHERE name = ? ORDER BY id DESC LIMIT 1`,
    [name]
  );

  return pallets[0];
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
  let updateFields = [];
  let queryParams = [];

  if (name !== undefined) {
    updateFields.push('name = ?');
    queryParams.push(name);
  }
  if (priceWorth !== undefined) {
    updateFields.push('price_worth = ?');
    queryParams.push(priceWorth);
  }
  if (costPrice !== undefined) {
    updateFields.push('cost_price = ?');
    queryParams.push(costPrice);
  }
  if (vat !== undefined) {
    updateFields.push('vat = ?');
    queryParams.push(vat);
  }
  if (shippingPrice !== undefined) {
    updateFields.push('shipping_expenses = ?');
    queryParams.push(shippingPrice);
  }
  if (totalPaid !== undefined) {
    updateFields.push('total_paid = ?');
    queryParams.push(totalPaid);
  }
  if (moneyReturn !== undefined) {
    updateFields.push('money_return = ?');
    queryParams.push(moneyReturn);
  }

  // Agrega el id del producto a los parámetros
  queryParams.push(palletId);

  // Actualiza solo los campos proporcionados
  await dbPool.query(
    `UPDATE pallets 
     SET ${updateFields.join(', ')}
     WHERE id = ?;`,
    queryParams
  );

  // Obtener la fila actualizada
  const [updatedPallet] = await dbPool.query(
    `SELECT * FROM pallets WHERE id = ?`,
    [palletId]
  );

  return updatedPallet[0];
};

const deletePalletById = async ({ palletId }) => {
  // Obtener la fecha actual
  const currentDate = new Date();

  // Formatear la fecha actual para que sea compatible con MySQL (YYYY-MM-DD HH:MM:SS)
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  // Elimina el producto
  await dbPool.query(`UPDATE pallets SET deleted_at = ? WHERE id = ?;`, [
    formattedDate,
    palletId,
  ]);

  // Obtener la fila eliminada
  const [deletedPallet] = await dbPool.query(
    `SELECT * FROM pallets WHERE id = ?`,
    [palletId]
  );

  return deletedPallet[0];
};

export default {
  getAllPallets,
  getPalletById,
  createPallet,
  updatePalletById,
  deletePalletById,
};
