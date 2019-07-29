import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import models from '../models';
import env from '../config/env';
import {validateHash} from '../utils/hash';

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, next) => {
        try {
            const user = await models.User.findOne({where: {email: email}});


            if (!user || !await validateHash(password, user.password)) {
                return next(null, false, {message: 'Invalid email or password'});
            }
            next(null, user);
        }
        catch (err) {
            next(err);
        }
    }
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: env.JWT_SECRET
    },
    async (payload, next) => {
        try {
            const user = await User.findOne({
                where: {
                    id: payload.id,
                    uuid: payload.uuid
                }
            });
            next(null, user);
        }
        catch (err) {
            next(err);
        }
    }
));

export default passport;

