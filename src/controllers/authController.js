import models from '../models';
import {successResponse} from '../utils/response';

const authController = {
    register: async (req, res) => {
        const {username, email, password} = req.body;

        const user = await models.User.create({username, email, password});
        const token = await user.getToken();

        return successResponse(res, {
            token,
            user
        });
    },
    login: async (req, res) => {
        const {user} = req;

        const token = await user.getToken();

        return successResponse(res, {
            token,
            user
        });
    },
};

export default authController;