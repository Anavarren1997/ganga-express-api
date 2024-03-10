import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import { parsePrice } from '../helpers/ganga.helper.js';

/**
 * Scrapes the content of a webpage given its URL.
 * @param {string} url The URL of the webpage to scrape.
 * @returns {Promise<string>} The HTML content of the webpage.
 */
async function scrapePageContent(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  await browser.close();
  return html;
}

/**
 * Extracts the title of a product from the loaded webpage content.
 * @param {CheerioStatic} $ A Cheerio instance of the loaded webpage.
 * @returns {string} The product title.
 */
function extractTitle($) {
  const titleSelector = '#productTitle';
  return $(titleSelector).text().trim();
}

/**
 * Extracts the price of a product from the loaded webpage content.
 * @param {CheerioStatic} $ A Cheerio instance of the loaded webpage.
 * @returns {string} The product price as a string.
 */
function extractPrice($) {
  const priceSectionSelector = '.priceToPay';
  const wholePrice = $(`${priceSectionSelector} .a-price-whole`)
    .first()
    .text()
    .trim();
  const fractionPrice = $(`${priceSectionSelector} .a-price-fraction`)
    .first()
    .text()
    .trim();
  return parsePrice(`${wholePrice}${fractionPrice}`);
}

/**
 * Extracts the weight of a product from the loaded webpage content.
 * @param {CheerioStatic} $ A Cheerio instance of the loaded webpage.
 * @returns {string|null} The product weight as a string or null if not found.
 */
function extractWeight($) {
  let weight = $('tr.po-item_weight').find('.po-break-word').text().trim();

  if (!weight) {
    $('tr').each((index, element) => {
      if (
        $(element)
          .find('th')
          .text()
          .trim()
          .match(/Peso del producto|Dimensiones del producto/i)
      ) {
        const weightText = $(element).find('td').text().trim();
        weight = weightText.match(/[\d,.]+\s*(kg|kilogramos)/i)?.[0];
        return false;
      }
    });
  }

  if (weight) {
    weight = weight.replace(',', '.').replace(/\s*(kg|kilogramos)/i, '');
  }

  return weight || null;
}

/**
 * Scrapes an Amazon product page for the product's title, price, and weight.
 * @param {Object} params Parameters for scraping.
 * @param {string} params.url The URL of the Amazon product page.
 * @returns {Promise<Object>} An object containing the product's title, price, and weight.
 */
export async function scrapeAmazonProduct({ url }) {
  try {
    const html = await scrapePageContent(url);
    const $ = load(html);

    const title = extractTitle($);
    const price = extractPrice($);
    const weight = extractWeight($);

    return { amazonLink: url, title, price, weight };
  } catch (error) {
    console.error('Error al raspar el artículo de Amazon:', error);
    throw error;
  }
}
