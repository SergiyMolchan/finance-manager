const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const errorHandler = require('../utils/errorHandler');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        createIndexes:{
            unique: true,
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    categorys: [{
        name: {
            type: String,
        },
        type: {
            type: String,
        }
    }],
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.regitration = async (req, res) => {
    try {
        const candidate = await User.findOne({login: req.body.login});

        if(!req.body.login || req.body.login < 6){
            res.status(409).json({success: false, message: 'Enter your login.'});
        } else if (candidate) {
            res.status(409).json({success: false, message: "Login is already taken."});
        } else if (!req.body.password || req.body.password.length < 6) {
            res.status(409).json({success: false, message: "Enter your password more 6 symbols."});
        } else if (req.body.password !== req.body.repeatPassword){
            res.status(409).json({success: false, message: "Passwords must be identical."});
        } else {
            const salt = bcrypt.genSaltSync(7);
            const user = new User({
                login: req.body.login.trim(),
                password: bcrypt.hashSync(req.body.password.trim(), salt),
                categorysOfIncome: [],
                categorysOfExpenses: []
            });
            await user.save();
            res.status(201).json({success: true, message: "Registered."});
        }
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.login = async (req, res) => {
    try {
        const candidate = await User.findOne({login: req.body.login});
        const timeLifeOfToken = 60 * 60;
    
        if(candidate){
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
            if(passwordResult){
                const token = jwt.sign({
                    login: candidate.login,
                    id: candidate._id
                }, config.jwt, {expiresIn: timeLifeOfToken});
                res.status(200).json({token: `Bearer ${token}`, timeLifeOfToken: timeLifeOfToken});
            } else {
                res.status(401).json({message: "Invalid password."});
            }
        } else {
            res.status(404).json({message: "User is not found."});
        }
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.addCategorys = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({_id: req.user.id}, {$push: {categorys: {name: req.body.name, type: req.body.type}}}, {new: true});
        res.status(200).json({success: true, categorys: user.categorys});
    } catch (error) {
        errorHandler(res, error);  
    }
}

module.exports.getCategorys = async (req, res) => {
    try {
        const user = await User.findById({_id: req.user.id});
        res.status(200).json({success: true, categorys: user.categorys});
    } catch (error) {
        errorHandler(res, error);  
    }
}