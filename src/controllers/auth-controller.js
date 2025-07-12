const express = require('express');
const { AuthService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

async function registerUser(req, res) {
    try {
        if (req.body) {
            console.log(req.body);
            
            const user = await AuthService.createUser({
                name: req.body.name,
                email: req.body.email,
                password_hash: req.body.password,
                company_id: req.body.company_id,
                phoneNumber: req.body.phone_number
            });
            SuccessResponse.data = user;
            SuccessResponse.message = `Welcom Mr. ${user.name} You have Registered Successfully!`
            return res.json(SuccessResponse);
        }
    } catch(error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);    
    }
    return SuccessResponse;
}

async function loginUser(req, res) {
    try {
        if (req.body) {
            console.log(req.body);
            const user = await AuthService.loginUser(req.body.email);
            console.log(`User Fetched: ${user.name}`);
            SuccessResponse.data = user;
            SuccessResponse.message = 'User Logged In Successfully!'
            return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
        }
    } catch(error) {
        ErrorResponse.error = error;
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);    
    }
    return SuccessResponse;
}



module.exports = {
    registerUser,
    loginUser
}