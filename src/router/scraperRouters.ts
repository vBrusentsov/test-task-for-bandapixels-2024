import express, {Router, Request, Response, NextFunction} from 'express';
import {scrapeTelemart} from "../service/scraperTelemart.service";
import {scraperRozetka} from "../service/scraperRozetka.service";
import {getAllElement} from "../service/getAllElement.service";

const scraperRouters = Router();

scraperRouters.post('/scrape/telemart', async (request: Request, res: Response, next: NextFunction) => {
    try {
        await scrapeTelemart()
        res.status(200).send({massage: 'get info about videocard on Telemart'})
    } catch (error) {
        res.status(500).send({message: error});
    }
});
scraperRouters.post('/scrape/rozetka', async ( request: Request, res: Response, next: NextFunction) => {
    try {
        await scraperRozetka()
        res.status(200).send({massage: 'get info about videocard  on Rozetka'})
    } catch (error) {
        res.status(500).send({message: error});
    }
});
scraperRouters.get('/getElement', async (req, res, next: NextFunction) => {
    try {
        const element = await getAllElement();
        res.status(200).json(element);
    } catch (error) {
        console.log(`Error fetching element:, ${error}`);
        res.status(500).send({message: error});
    }
});
export default scraperRouters;
