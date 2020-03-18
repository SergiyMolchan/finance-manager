import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import {validFormCreator, validFieldCreator,isRequiredFieldCreator, maxLengthCreator} from '../../tools/validators';
import {createCategory} from '../../actions/createCategory'

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

function AddCategory(props){
    const classes = useStyles();
  
    const handleChange = e => {
        setIncomeOrExpenses(e.target.value);
    };

    const [incomeOrExpenses = 'expenses', setIncomeOrExpenses] = React.useState();
    const [newCategory = '', setNewCategory] = useState(); 
    const [isRouchedNewCategory = false, TouchNewCategory] = useState();
    const maxLengthField10 = maxLengthCreator(10);
    const isReqiredNewCategory = isRequiredFieldCreator(newCategory);
    const isValidFieldNewCategory = validFieldCreator([isReqiredNewCategory(), maxLengthField10(newCategory)]);
    const isValidForm = validFormCreator([isValidFieldNewCategory(true)]);

    return(
        <>  
            {props.loading === true ? <LinearProgress/> : false}
            <form className={classes.root} noValidate autoComplete="on">
                <TextField
                    onChange={e => setNewCategory(e.target.value)}
                    onBlur={() => TouchNewCategory(true)}
                    value={newCategory}
                    helperText={isRouchedNewCategory === true ? isValidFieldNewCategory() : false}
                    error={isRouchedNewCategory === true ? isValidFieldNewCategory(true) : false}
                    required
                    fullWidth
                    className={classes.margin}
                    label="NewCategory"
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

                <Button
                    onClick={() => props.createCategory(newCategory, incomeOrExpenses)}
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
        loading: state.categorys.loading,
        error: state.categorys.error
    }
}

function mapDispatchToProps(dispatch){
    return{
        createCategory: (name, type) => dispatch(createCategory(name, type))
    }
}

AddCategory.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    createCategory: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);