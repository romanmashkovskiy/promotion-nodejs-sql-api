import PromiseRouter from 'express-promise-router';
import {authController} from '../controllers';
import APIError from '../utils/APIError';
import {errorResponse} from '../utils/response';

const Router = PromiseRouter();

/*Auth*/
Router.post('/auth/register', authController.register);

/* Not found handler */
Router.use((req, res, next) => next(new APIError(`${req.url} - Not Found`, 404)));

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