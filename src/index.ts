import express, {Express} from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const start = async (): Promise<void> => {
    const app: Express = express();

    app.use(express.json());
    


    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

start();