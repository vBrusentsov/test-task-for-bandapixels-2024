import express, {Router, Request, Response, NextFunction} from 'express';
import {scrapeTelemart} from "../service/scraperTelemart.service";
import {scraperRozetka} from "../service/scraperRozetka.service";

const scraperRouters = Router();

scraperRouters.post('/scrape/telemart', (request: Request, res: Response, next: NextFunction) => {
    try {
        scrapeTelemart()
        res.status(200).send({massage: 'get info about videocard on Telemart'})
    } catch (error) {
        res.status(500).send({message: error});
    }
})
scraperRouters.post('/scrape/rozetka', ( request: Request, res: Response, next: NextFunction) => {
    try {
        scraperRozetka()
        res.status(200).send({massage: 'get info about videocard  on Rozetka'})
    } catch (error) {
        res.status(500).send({message: error});
    }
})

export default scraperRouters;
