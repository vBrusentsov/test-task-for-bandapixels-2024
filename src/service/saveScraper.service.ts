import { Item } from '../entities/Item';
import { Product } from '../interfaces/product.interface';
import { appDataSource } from '../utils/ormconfig';

export async function saveProductsDatabase(products: Product[]) {
    try {
        const itemRepository = appDataSource.getRepository(Item);

        await Promise.all(
            products.map(async (product) => {
                if (product.link) {
                    const existingItem = await itemRepository.findOne({
                        where: { link: product.link }
                    });

                    if (existingItem) {
                        console.log(
                            `Product with link: ${product.link} already exists`
                        );
                        return;
                    }

                    const newItem = new Item();
                    newItem.title = product.title;
                    newItem.subtitle = product.subtitle;
                    newItem.description = product.description;
                    newItem.price = product.price;
                    newItem.specification = product.specifications;
                    newItem.type = product.type;
                    newItem.profileImage = product.image;
                    newItem.source = product.source;
                    newItem.link = product.link;
                    await itemRepository.save(newItem);
                    return;
                } else {
                    console.log(
                        `Product ${product.title} does not have a valid link`
                    );
                }
            })
        );
    } catch (error) {
        console.error('Error saving products to the database:', error);
    }
}
