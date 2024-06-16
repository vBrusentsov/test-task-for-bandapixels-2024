import {appDataSource} from "./ormconfig";

export const connectDB = async (): Promise<void> => {
    appDataSource.initialize()
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.error(err)});
}
