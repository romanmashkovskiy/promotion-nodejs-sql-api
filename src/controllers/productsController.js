import { successResponse } from '../utils/response';
import models from '../models';

const { Product, User, Review } = models;

const productsController = {
    addProduct: async (req, res) => {
        const { user, body: { title, description } } = req;

        await user.createProduct({
            title,
            description
        });

        return successResponse(res, { message: 'Product created successfully' });
    },

    getMyProducts: async (req, res) => {
        const { user } = req;

        const products = await user.getProducts({
            include: [
                {
                    model: User,
                    attributes: ['userName', 'email']
                },
                {
                    model: Review,
                    include: [{
                        model: User,
                        attributes: ['userName', 'email']
                    }]
                }
            ]
        });

        return successResponse(res, products);
    },

    getProduct: async (req, res) => {
        const { params: { id } } = req;

        const product = await Product.findByPk(id);

        return successResponse(res, product);
    },

    getProducts: async (req, res) => {
        const products = await Product.findAll({
            include: [
                {
                    model: User,
                    attributes: ['userName', 'email']
                },
                {
                    model: Review,
                    include: [{
                        model: User,
                        attributes: ['userName', 'email']
                    }]
                }
            ]
        });

        return successResponse(res, products);
    },

    deleteProduct: async (req, res) => {
        const { params: { id } } = req;

        await Product.destroy({
            where: {
                id
            }
        });

        return successResponse(res, { message: 'Product deleted successfully' });
    },

    changeProduct: async (req, res) => {
        const { params: { id }, body: { title, description } } = req;

        await Product.update({ title, description }, {
            where: {
                id
            }
        });

        return successResponse(res, { message: 'Product changed successfully' });
    },

    addReview: async (req, res) => {
        const { user, body: { rating, text }, params: { id } } = req;

        await Review.create({
            rating,
            text,
            userId: user.id,
            productId: id
        });

        return successResponse(res, { message: 'Review added successfully' });
    }
};

export default productsController;