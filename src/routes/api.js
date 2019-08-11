import PromiseRouter from 'express-promise-router';
import {authController, productsController} from '../controllers';
import APIError from '../utils/APIError';
import {errorResponse} from '../utils/response';
import {loginGuard, accessGuard} from '../middlewares';

const Router = PromiseRouter();

/*Auth*/
Router.post('/auth/register', authController.register);
Router.post('/auth/login', loginGuard(), authController.login);
Router.get('/auth/me', accessGuard(), authController.getMe);

/*Products*/
Router.post('/my-products', accessGuard(), productsController.addProduct);
Router.get('/my-products', accessGuard(), productsController.getMyProducts);
Router.get('/my-products/:id', accessGuard(), productsController.getMyProduct);
Router.put('/my-products/:id', accessGuard(), productsController.changeProduct);
Router.get('/products', productsController.list);
Router.delete('/my-products/:id', accessGuard(), productsController.deleteProduct);

/* Not found handler */
Router.use((req, res, next) => next(new APIError(`${req.url} - Not Found`, 404)));

/* Error handler */
Router.use((err, req, res, next) => {
    switch (err.name) {
        case 'ValidationError':
            const errors = values(err.errors).map(error => error.properties);
            console.log(`${err.name}: `, errors);
            return errorResponse(res, {
                name: err.name,
                status: 422,
                errors: errors
            });
        default: {
            console.error(`${err.name}: `, err);
            return errorResponse(res, err);
        }
    }
});

export default Router;