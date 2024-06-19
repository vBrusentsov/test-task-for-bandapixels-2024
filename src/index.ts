import express, { Express } from 'express';
import { connectDB } from './utils/db';
import dotenv from 'dotenv';
import cors from 'cors';
import scraperRouters from './router/scraperRouters';

dotenv.config();

const port = process.env.PORT || 5000;
const start = async (): Promise<void> => {
    try {
        const app: Express = express();

        app.use(express.json());

        app.use(
            cors({
                origin: '*',
                methods: '*',
                allowedHeaders: '*'
            })
        );
        await connectDB();
        app.get('/', (req, res) => {
            res.status(200).send('healthCheck page');
        });
        app.use('/api', scraperRouters);

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();
