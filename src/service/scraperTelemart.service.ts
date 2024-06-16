import puppeteer from 'puppeteer';
import {Product} from '../interfaces/product.interface';
import {CheerioAPI, load} from 'cheerio';
import {saveProductsDatabase} from "./saveScraper.service";


export async function scrapeTelemart() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://telemart.ua/ua/videocard/');

    await page.waitForSelector('.product-item');

    const content = await page.content();
    const $: CheerioAPI = load(content);


    let products: Product[] = [];


    $('.product-item__inner').each((index, element) => {
        let title = $(element).find('.product-item__title a').text().trim() || null;
        let subtitle = $(element).find('.product-card__subtitle').text().trim() || null;
        let description = $(element).find('.product-card__description').text().trim() || null;
        let price = Number($(element).attr('data-price')) || null;

        let specifications: { [key: string]: string } = {};
        $(element).find('.product-short-char__item').each((i, specElement) => {
            let label = $(specElement).find('.product-short-char__item__label').text().trim();
            let value = $(specElement).find('.product-short-char__item__value').text().trim();
            specifications[label] = value;
        });
        let specificationJson = JSON.stringify(specifications);

        let type = ($(element).attr('data-prod-type')) || null; // Додайте логіку для визначення типу
        let image = ($(element).find('.product-item__pic__img img').attr('src')) || null;
        let link = ($(element).find('.product-item__title a').attr('href')) || null;
        let source = 'telemart';

        products.push({ link, title, subtitle, description, price, specifications: specificationJson, type, image, source});
    });

    await saveProductsDatabase(products);

    await browser.close();
}