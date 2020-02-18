const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models/User');

router.use(express.json());
router.use(express.urlencoded({extended: false})); 

router.post('/addCategorysOfIncome', passport.authenticate('jwt', {session: false}), models.addCategorysOfIncome);
router.post('/addCategorysOfExpenses', passport.authenticate('jwt', {session: false}), models.addCategorysOfExpenses);

module.exports = router;