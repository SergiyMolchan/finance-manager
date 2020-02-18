const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models/financialHistory');

router.use(express.json());
router.use(express.urlencoded({extended: false})); 

router.post('/addFinancialHistoryItem', passport.authenticate('jwt', {session: false}), models.addFinancialHistoryItem);
router.get('/getFinancialHistory', passport.authenticate('jwt', {session: false}), models.getFinancialHistory);

module.exports = router;