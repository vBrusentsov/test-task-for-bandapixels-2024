import { Item } from '../entities/Item';
import { appDataSource } from '../utils/ormconfig';

export async function getAllElement() {
    try {
        const getElements = appDataSource.getRepository(Item);
        return await getElements.find();
    } catch (error) {
        console.log(error);
    }
}
