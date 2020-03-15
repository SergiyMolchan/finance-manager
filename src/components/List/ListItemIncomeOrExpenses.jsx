import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import parseDateToStr from '../../tools/parseDateToStr';

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 14,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 140,
    },
    listItem: {
        width: '100%',
        padding: '10px 15px',
        borderBottom: '1px solid silver',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    income: {
        color: 'green'
    },
    expenses: {
        color: 'red'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0px 20px 0px 0px'
    },
}));

function ListItemIncomeOrExpenses(props){
    const classes = useStyles();
    return(
        <div className={classes.listItem}>
            <div>
                <Typography variant="h6">{props.description}</Typography>
                <Typography variant="subtitle1">{props.category}</Typography>
            </div>
            <div>
                <Typography className={props.type === 'income' ? classes.income : classes.expenses} variant="h6">{props.type === 'income' ? ' +' : ' -'}{props.amount}</Typography>
                <form className={classes.container} noValidate>
                    <TextField
                        disabled
                        type="date"
                        defaultValue={parseDateToStr(props.date)}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />
                </form>
            </div>
        </div>
    )
}

ListItemIncomeOrExpenses.propTypes = {
    date: PropTypes.number,
    type: PropTypes.string,
    amount: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string
}

export default ListItemIncomeOrExpenses;