import jwt from 'jsonwebtoken';
import env from '../config/env';
import {pick} from 'lodash';
import {generateHash} from '../utils/hash';


export default (sequelize, DateTypes) => {
    const User = sequelize.define('user', {
        uuid: {
            type: DateTypes.UUID,
            defaultValue: DateTypes.UUIDV4
        },
        username: {
            type: DateTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DateTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
                trim: true
            }
        },
        password: {
            type: DateTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [
                    6, 25
                ],
                trim: true
            }
        },
    }, {
        underscored: true,
        timestamps: true,
    });

    const hashPassword = async (user) => {
        if (!user.changed('password')) return;
        user.setDataValue('password', await generateHash(user.password));
    };

    User.beforeCreate(hashPassword);
    User.beforeUpdate(hashPassword);

    User.prototype.getTokenData = function () {
        return pick(this.dataValues, ['id', 'uuid']);
    };

    User.prototype.getToken = function () {
        return jwt.sign(this.getTokenData(), env.JWT_SECRET, {expiresIn: env.JWT_EXPIRES_IN});
    };

    User.prototype.toJSON = function () {
        const data = this.dataValues;
        delete data.password;
        delete data.createdAt;
        delete data.updatedAt;
        return data;
    };

    return User;
};