/* eslint-disable camelcase */
const { User } = require('../database');
const { ErrorHandler } = require('../errors/errors.handler');
const { CONFLICT, NOT_FOUND } = require('../config');

module.exports = {
    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userFindId = await User.findById(user_id);

            if (!userFindId) {
                throw new ErrorHandler(NOT_FOUND, 'User by id not found!');
            }

            next();

        } catch (err) {

            next(err);

        }
    },
    isValidEmail: async (req, res, next) => {
        try {
            const { email = '' } = req.body;

            const userEmail = await User.findOne({ email: email.trim() });

            if (userEmail) {
                throw new ErrorHandler(CONFLICT, 'Email is already exist');
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}
