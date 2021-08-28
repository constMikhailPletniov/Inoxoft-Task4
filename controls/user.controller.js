/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */


const { getUsers } = require('../services/user.service');
const { BAD_REQUEST, CREATE } = require('../config/conf');
const { User } = require('../database');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const userCreate = await User.create(req.body);
            res.status(CREATE).json(userCreate);
        } catch (err) {
            next(err);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userDelete = await User.findByIdAndDelete(user_id);

            res.status(200).json(userDelete);
        } catch (err) {
            next(err);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await getUsers();
            res.json(users);
        } catch (err) {
            res.status(BAD_REQUEST).json(err.message);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const userById = await User.findById(user_id);

            res.json(userById);
        } catch (err) {
            next(err);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { ...data } = req.body;

            await User.findByIdAndUpdate(user_id, data);

            res.status(CREATE).json({ message: 'The dara was update' });

        } catch (err) {
            next(err);
        }
    }
}
