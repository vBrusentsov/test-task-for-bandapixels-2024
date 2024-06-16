import puppeteer, { Browser, Page } from 'puppeteer';
import { CheerioAPI, load } from 'cheerio';
import { Product } from "../interfaces/product.interface";
import {type} from "node:os";
import {saveProductsDatabase} from "./saveScraper.service";


export async function scraperRozetka() {
    const browser: Browser = await puppeteer.launch({});
    const page: Page = await browser.newPage();
    await page.goto('https://hard.rozetka.com.ua/ua/videocards/c80087/');
    await page.setViewport({ width: 1200, height: 800 });
    await page.waitForSelector('.catalog-grid__cell');
    await autoScroll(page);
    const content = await page.content();
    const $: CheerioAPI = load(content);

    let products: Product[] = [];


    $(`.catalog-grid__cell`).each( (index, element) => {
        const link = $(element).find('.product-link').attr('href') || null;
        let title = ($(element).find('.goods-tile__title').text().trim()) || null;
        let subtitle = $(element).find('.goods-title__subtitle').text().trim() || null;
        let description = $(element).find('.goods-title__description').text().trim() || null;
        let priceElement = $(element).find('.goods-tile__price-value');
        let priceText = priceElement.text().trim();
        let price = parseFloat(priceText.replace(/[^\d.]/g, '').replace(',', '.')) || null;

        let specifications: { [key: string]: string } = {};
        $(element).find('.product-short-char__item').each((i, specElement) => {
            let label = $(specElement).find('.product-short-char__item__label').text().trim();
            let value = $(specElement).find('.product-short-char__item__value').text().trim();
            specifications[label] = value;
        });
        let specificationJson = JSON.stringify(specifications) || null;

        const type = $('.goods-tile__content').attr('data-prod-type') || null;
        let image = $(element).find('.goods-tile__picture img').attr('src') || null;
        let source = 'rozetka';


        products.push({link,  title, subtitle, description, price, specifications: specificationJson, type, image, source});});

    await saveProductsDatabase(products);

    await browser.close();
}



async function autoScroll(page: Page) {
    await page.evaluate(() => {
        return new Promise<void>((resolve, reject) => {
            let totalHeight = 0;
            const distance = 100;
            const scrollInterval = 10; // Зменшуємо інтервал до 50 мілісекунд
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, scrollInterval);
        });
    });
}

