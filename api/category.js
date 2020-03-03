const express = require('express');
const router = express.Router();
const passport = require('passport');
const models = require('../models/User');

router.use(express.json());
router.use(express.urlencoded({extended: false})); 

router.get('/getCategorys', passport.authenticate('jwt', {session: false}), models.getCategorys);
router.post('/addCategorys', passport.authenticate('jwt', {session: false}), models.addCategorys);

module.exports = router;