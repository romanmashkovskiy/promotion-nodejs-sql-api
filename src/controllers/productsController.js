import {successResponse} from '../utils/response';

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
};

export default productsController;