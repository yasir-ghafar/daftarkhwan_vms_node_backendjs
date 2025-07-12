const { StatusCodes } = require('http-status-codes');
const { AuthRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');
const { ErrorResponse } = require('../utils/common');


const authRepository = new AuthRepository();

async function createUser(userData) {
    try {
        const userExists = await authRepository.getByEmail(userData.email);
         if (userExists) {
            return new AppError('Cannot create a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
         } else {
            const user = await authRepository.create(userData);
            return user;
         }

    } catch(error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.array.array.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError('Cannot create a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        throw error;
    }
}

async function loginUser(userData) {
    try {
        console.log(userData);
        const user = await authRepository.getByEmail(userData);
        console.log(`getting user in crud repo ${user.name}`);
        return user;
    } catch(error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.array.array.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError('Cannot create a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        throw error;
    }
}


module.exports = {
    createUser,
    loginUser
    
}