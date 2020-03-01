import React, { useState } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {validFormCreator, validFieldCreator,isRequiredFieldCreator, maxLengthCreator} from '../../tools/validators';

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

function AddElem(props){
    const classes = useStyles();

    const handleChange = e => {
        setIncomeOrExpenses(e.target.value);
    };

    const [incomeOrExpenses = 'expenses', setIncomeOrExpenses] = React.useState();
    const [description = '', setDescription] = useState(); 
    const [amount =  0, setAmount] = useState();
    const [isTouchedDescription = false, TouchDescription] = useState();
    const [isTouchedAmount = false, TouchAmount] = useState();
    const maxLengthField15 =  maxLengthCreator(15);
    const isReqiredDescription = isRequiredFieldCreator(description);
    const isValidFieldDescription = validFieldCreator([isReqiredDescription(), maxLengthField15(description)]);
    const isReqiredAmount = isRequiredFieldCreator(amount);
    const isValidFieldAmount = validFieldCreator([isReqiredAmount(amount)]);
    const isValidForm = validFormCreator([isValidFieldDescription(true), isValidFieldAmount(true)]);


    return(
        <>
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
                    onChange={handleChange}
                >
                    <MenuItem value='expenses'>Expenses</MenuItem>
                    <MenuItem value='income'>Income</MenuItem>
                </Select>

                <Select
                    fullWidth
                    className={classes.margin}
                    value={'category'}
                    onChange={() => console.log('set category')}
                >
                    <MenuItem value='category'>category</MenuItem>
                </Select>

                <Button
                    onClick={() => console.log(description)}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.margin}
                    startIcon={<SaveIcon />}
                    disabled={isValidForm()}
                >
                    Save
                </Button>

            </form>
        </>
    )
}

function mapStateToProps(state){
    return{
  
    }
}
  
function mapDispatchToProps(dispatch){
    return{

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddElem);