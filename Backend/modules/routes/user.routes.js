const express = require('express');
const routes = express.Router();
const userController = require('../controllers/User/user.controller');
const { body } = require('express-validator');

// User Registration Route  
routes.post('/register',[
    body('fullName.firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('fullName.lastName').optional().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email address').isLength({ min: 5 }).withMessage('Email must be at least 5 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser)

module.exports = routes;



