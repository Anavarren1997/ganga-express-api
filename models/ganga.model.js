import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'sporttia',
  password: 'sporttia',
  database: 'gangaexpresss_dev',
});

const getAllGangas = async () => {
  const [gangas] = await connection.query(`SELECT * from products`);
  return gangas;
};

const getGangaById = async ({ gangaId }) => {
  const [gangas] = await connection.query(
    `SELECT * from products WHERE id = ?;`,
    [gangaId]
  );

  if (gangas.length === 0) return null;

  return gangas[0];
};

const createGanga = async ({
  name,
  description,
  realPrice,
  buyPrice,
  salePrice,
  amazonLink,
  palletId,
}) => {
  await connection.query(
    `INSERT INTO products (name, description, real_price, buy_price, sale_price, amazon_link, pallet_id)
          VALUES (?, ?, ?, ?, ?, ?);`,
    [name, description, realPrice, buyPrice, salePrice, amazonLink, palletId]
  );

  // Obtener la fila recién insertada
  const [gangas] = await connection.query(
    `SELECT * FROM products WHERE name = ? ORDER BY id DESC LIMIT 1`,
    [name]
  );

  return gangas[0];
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
  let updateFields = [];
  let queryParams = [];

  if (name !== undefined) {
    updateFields.push('name = ?');
    queryParams.push(name);
  }
  if (description !== undefined) {
    updateFields.push('description = ?');
    queryParams.push(description);
  }
  if (realPrice !== undefined) {
    updateFields.push('real_price = ?');
    queryParams.push(realPrice);
  }
  if (buyPrice !== undefined) {
    updateFields.push('buy_price = ?');
    queryParams.push(buyPrice);
  }
  if (salePrice !== undefined) {
    updateFields.push('sale_price = ?');
    queryParams.push(salePrice);
  }
  if (sold !== undefined) {
    updateFields.push('sold = ?');
    queryParams.push(sold);
  }
  if (amazonLink !== undefined) {
    updateFields.push('amazon_link = ?');
    queryParams.push(amazonLink);
  }

  // Agrega el id del producto a los parámetros
  queryParams.push(gangaId);

  // Actualiza solo los campos proporcionados
  await connection.query(
    `UPDATE products 
     SET ${updateFields.join(', ')}
     WHERE id = ?;`,
    queryParams
  );

  // Obtener la fila actualizada
  const [updatedGanga] = await connection.query(
    `SELECT * FROM products WHERE id = ?`,
    [gangaId]
  );

  return updatedGanga[0];
};

const deleteGangaById = async ({ gangaId }) => {
  // Obtener la fecha actual
  const currentDate = new Date();

  // Formatear la fecha actual para que sea compatible con MySQL (YYYY-MM-DD HH:MM:SS)
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  // Elimina el producto
  await connection.query(`UPDATE products SET deleted_at = ? WHERE id = ?;`, [
    formattedDate,
    gangaId,
  ]);

  // Obtener la fila eliminada
  const [deletedGanga] = await connection.query(
    `SELECT * FROM products WHERE id = ?`,
    [gangaId]
  );

  return deletedGanga[0];
};

const bulkCreateGangas = async ({ gangas }) => {
  // Crea un array de arrays con los valores de las gangas
  const values = gangas.map((ganga) => [
    ganga.name,
    ganga.description,
    ganga.realPrice,
    ganga.buyPrice,
    ganga.salePrice,
    ganga.amazonLink,
    ganga.weight,
    ganga.palletId,
  ]);

  // Realiza la inserción masiva en la base de datos
  await connection.query(
    `INSERT INTO products (name, description, real_price, buy_price, sale_price, amazon_link, weight, pallet_id)
     VALUES ?`,
    [values]
  );

  // Obtener la fila recién insertada
  const [createdGangas] = await connection.query(
    `SELECT * FROM products ORDER BY id DESC LIMIT ${values.length}`
  );

  return createdGangas;
};

export default {
  getAllGangas,
  getGangaById,
  createGanga,
  updateGangaById,
  deleteGangaById,
  bulkCreateGangas,
};
