import React, { useState } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {validFormCreator, validFieldCreator,isRequiredFieldCreator, maxLengthCreator} from '../../tools/validators';
import {createIncomeOrExpenses} from '../../actions/createIncomeOrExpenses';

const useStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },
        margin: {
            margin: theme.spacing(1),   
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

function AddIncomeOrExpenses(props){
    const classes = useStyles();

    const handleChangeIncomeOrExpenses = e => {
        setIncomeOrExpenses(e.target.value);
        setCategory('');
    };

    const [incomeOrExpenses = 'expenses', setIncomeOrExpenses] = React.useState();
    const [description = '', setDescription] = useState(); 
    const [amount =  0, setAmount] = useState();
    const [category = '', setCategory] = useState();
    const [isTouchedDescription = false, TouchDescription] = useState();
    const [isTouchedAmount = false, TouchAmount] = useState();
    const maxLengthField15 =  maxLengthCreator(15);
    const isReqiredDescription = isRequiredFieldCreator(description);
    const isValidFieldDescription = validFieldCreator([isReqiredDescription(), maxLengthField15(description)]);
    const isReqiredAmount = isRequiredFieldCreator(amount);
    const isValidFieldAmount = validFieldCreator([isReqiredAmount(amount)]);
    const isReqiredCategory = isRequiredFieldCreator(category);
    const isValidFieldCategory = validFieldCreator([isReqiredCategory()]);
    const isValidForm = validFormCreator([isValidFieldDescription(true), isValidFieldAmount(true), isValidFieldCategory(true)]);


    return(
        <>
            {props.loading === true ? <LinearProgress/> : false}
            <form className={classes.root} noValidate autoComplete="on">
                <TextField
                    onChange={e => setDescription(e.target.value)}
                    onBlur={() => TouchDescription(true)}
                    value={description}
                    helperText={isTouchedDescription === true ? isValidFieldDescription() : false}
                    error={isTouchedDescription  === true ? isValidFieldDescription(true) : false}
                    required
                    fullWidth
                    className={classes.margin}
                    label="Description"
                />

                <TextField
                    onChange={e => setAmount(e.target.value >= 0 ? e.target.value : 0)}
                    onBlur={() => TouchAmount(true)}
                    value={amount}
                    helperText={isTouchedAmount === true ? isValidFieldAmount() : false}
                    error={isTouchedAmount === true ? isValidFieldAmount(true) : false}
                    required
                    fullWidth
                    type="number"
                    className={classes.margin}
                    label="Amount"
                />
                
                <Select
                    fullWidth
                    className={classes.margin}
                    value={incomeOrExpenses}
                    onChange={handleChangeIncomeOrExpenses}
                >
                    <MenuItem value='expenses'>Expenses</MenuItem>
                    <MenuItem value='income'>Income</MenuItem>
                </Select>

                <Select
                    fullWidth
                    className={classes.margin}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    {
                        props.categorys.map(item =>
                            item.type === incomeOrExpenses ?
                            <MenuItem key={`${item.name}-${item.type}`} value={item.name}>{item.name}</MenuItem>
                            :
                            false
                        )
                    }
                </Select>

                <Button
                    onClick={() => props.createIncomeOrExpenses(category, incomeOrExpenses, amount, description)}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.margin}
                    startIcon={<SaveIcon />}
                    disabled={isValidForm()}
                >
                    Save
                </Button>
                {!!props.error ? <Typography variant="body1" color="error">{props.error}</Typography> : false}
            </form>
        </>
    )
}

function mapStateToProps(state){
    return{
        categorys: state.categorys.categorys,
        loading: state.financialHistory.loadingCreate,
        error: state.financialHistory.error
    }
}
  
function mapDispatchToProps(dispatch){
    return{
        createIncomeOrExpenses: (category, type, amount, description) => dispatch(createIncomeOrExpenses(category, type, amount, description))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddIncomeOrExpenses);