const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models/User');

router.use(express.json());
router.use(express.urlencoded({extended: false})); 

router.post('/addCategorys', passport.authenticate('jwt', {session: false}), models.addCategorys);

module.exports = router;