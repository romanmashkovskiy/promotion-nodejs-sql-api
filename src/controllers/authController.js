import models from '../models';
import {successResponse} from '../utils/response';

const {User} = models;

const authController = {
    register: async (req, res) => {
        const {userName, email, password} = req.body;

        const user = await User.create({userName, email, password});
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
    getMe: async ({user}, res) => successResponse(res, {
        user
    }),
};

export default authController;