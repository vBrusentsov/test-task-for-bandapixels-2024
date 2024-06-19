import puppeteer from 'puppeteer';
import { Product } from '../interfaces/product.interface';
import { CheerioAPI, load } from 'cheerio';
import { saveProductsDatabase } from './saveScraper.service';

export async function scrapeTelemart() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://telemart.ua/ua/videocard/', { timeout: 1000000 });

    await page.waitForSelector('.product-item');

    const content = await page.content();
    const $: CheerioAPI = load(content);

    const products: Product[] = [];

    $('.product-item__inner').each((index, element) => {
        const title =
            $(element).find('.product-item__title a').text().trim() || null;
        const subtitle =
            $(element).find('.product-card__subtitle').text().trim() || null;
        const description =
            $(element).find('.product-card__description').text().trim() || null;
        const price = Number($(element).attr('data-price')) || null;

        const specifications: { [key: string]: string } = {};
        $(element)
            .find('.product-short-char__item')
            .each((i, specElement) => {
                const label = $(specElement)
                    .find('.product-short-char__item__label')
                    .text()
                    .trim();
                const value = $(specElement)
                    .find('.product-short-char__item__value')
                    .text()
                    .trim();
                specifications[label] = value;
            });
        const specificationJson = JSON.stringify(specifications);

        const type = $(element).attr('data-prod-type') || null; // Додайте логіку для визначення типу
        const image =
            $(element).find('.product-item__pic__img img').attr('src') || null;
        const link =
            $(element).find('.product-item__title a').attr('href') || null;
        const source = 'telemart';

        products.push({
            link,
            title,
            subtitle,
            description,
            price,
            specifications: specificationJson,
            type,
            image,
            source
        });
    });

    await saveProductsDatabase(products);

    await browser.close();
}
