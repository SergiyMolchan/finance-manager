const mongoose = require('mongoose');
const errorHandler = require('../utils/errorHandler');
const Schema = mongoose.Schema;

const financialHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User' 
    },
    category: {
        type: String
    },
    type:{
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    date:{
        type: Number
    }
});

const financialHistory = module.exports = mongoose.model('financialHistory', financialHistorySchema);

module.exports.getFinancialHistory = async (req, res) => {
    try {
        const financialhistory = await financialHistory.find({user: req.user.id});
        res.status(200).json({success: true, financialhistory});
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.addFinancialHistoryItem = async (req, res) => {
    try {
        if(!req.body.category){
            res.status(409).json({success: false, message: 'Choose a category.'});
        } else if (!req.body.type || (req.body.type !== 'expenses' && req.body.type !== 'income')) {
            res.status(409).json({success: false, message: "Type must be income or expenses."});
        } else if (req.body.amount === 0){
            res.status(409).json({success: false, message: 'Enter your amount.'});
        } else if (!req.body.description){
            res.status(409).json({success: false, message:'Enter your description.'});
        } else {
            const financialhistory = new financialHistory({
                user: req.user.id,
                category: req.body.category,
                type: req.body.type,
                amount: req.body.amount,
                description: req.body.description,
                date: new Date().getTime()
            });
            await financialhistory.save();
            const financialhistoryList = await financialHistory.find({user: req.user.id});
            res.status(200).json({success: true, financialhistory: financialhistoryList});
        }
    } catch (error) {
        errorHandler(res, error);
    }
}
