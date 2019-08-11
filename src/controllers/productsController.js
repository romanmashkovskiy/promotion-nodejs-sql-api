import {successResponse} from '../utils/response';
import models from '../models';

const {Product, User} = models;

const productsController = {
    addProduct: async (req, res) => {
        const {user, body: {title, description}} = req;

        await user.createProduct({
            title,
            description
        });

        return successResponse(res, {message: 'Product created successfully'});
    },
    getMyProducts: async (req, res) => {
        const {user} = req;

        const products = await user.getProducts();

        return successResponse(res, products);
    },
    list: async (req, res) => {
        const products = await Product.findAll({
            include: [{
                model: User,
                attributes: ['userName'],
            }]
        });

        return successResponse(res, products);
    },
    deleteProduct: async (req, res) => {
        const {params: {id}} = req;

        await Product.destroy({
            where: {
                id
            }
        });

        return successResponse(res, {message: 'Product deleted successfully'});
    },
};

export default productsController;