import { scrapeAmazonProduct } from '../utils/scraper.utils.js';

export function transformGangaTitle(title) {
  // Dividir la cadena en palabras
  const words = title.split(' ');

  // Crear un título transformado
  let transformedTitle = '';

  // Recorrer las palabras y agregarlas al título transformado hasta que la longitud sea menor que 50 caracteres
  let charCount = 0;
  for (let i = 0; i < words.length; i++) {
    if ((transformedTitle + words[i]).length <= 50) {
      transformedTitle += words[i] + ' ';
      charCount += words[i].length + 1; // Se suma 1 para contar también el espacio
    } else {
      break;
    }
  }

  // Eliminar el último espacio
  transformedTitle = transformedTitle.trim();

  return transformedTitle;
}

export function parsePrice(price) {
  if (typeof price === 'string') {
    // Si el precio es una cadena, primero reemplazamos la coma por el punto
    price = price.replace(',', '.');
  }

  // Convertimos a un número utilizando parseFloat
  const parsedPrice = parseFloat(price);

  if (!isNaN(parsedPrice)) {
    // Si parsedPrice es un número válido
    return parsedPrice.toFixed(2); // Devuelve el precio con dos decimales
  } else {
    // Si no es un número válido, devolvemos null o manejamos el error según sea necesario
    return null;
  }
}

export function parseGangasFromCsv(gangasFromCsv) {
  return gangasFromCsv.map((ganga) => ({
    amazonLink: ganga.amazonLink,
    realPrice: parsePrice(ganga.realPrice),
    buyPrice: parsePrice(ganga.buyPrice),
  }));
}

export async function scrapeGangas(parsedGangas) {
  const scrapedGangas = await Promise.all(
    parsedGangas.map(
      async (ganga) => await scrapeAmazonProduct({ url: ganga.amazonLink })
    )
  );
  return scrapedGangas;
}

export function prepareGangasForDatabase({
  parsedGangas,
  scrapedGangas,
  shippingExpenses,
}) {
  return parsedGangas.map((parsedGanga) => {
    const scrappedGanga = scrapedGangas.find(
      (sg) => sg.amazonLink === parsedGanga.amazonLink
    );
    const realPrice = scrappedGanga.price ?? parsedGanga.realPrice;
    const buyPrice = (
      parsedGanga.buyPrice * 1.21 +
      shippingExpenses / parsedGangas.length
    ).toFixed(2);
    const salePrice = Math.floor(realPrice * 0.6);

    return {
      name: transformGangaTitle(scrappedGanga.title),
      description: scrappedGanga.title,
      realPrice,
      buyPrice,
      salePrice,
      amazonLink: parsedGanga.amazonLink,
      weight: scrappedGanga.weight,
    };
  });
}
