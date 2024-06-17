import express, {Express} from "express";
import {connectDB} from "./utils/db";
import dotenv from "dotenv";
import scraperRouters from './router/scraperRouters';
import {scrapeTelemart} from "./service/scraperTelemart.service";
import {scraperRozetka} from "./service/scraperRozetka.service";


dotenv.config();

const port = process.env.PORT || 5000;

const start = async (): Promise<void> => {
    const app: Express = express();

    app.use(express.json());

    console.log();
    await connectDB();

    app.use('/api', scraperRouters);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

start();