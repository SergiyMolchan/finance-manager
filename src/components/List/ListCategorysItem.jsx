import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import getArticlesForTheCurrentMonth from '../../tools/getArticlesForTheCurrentMonth';

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
        transition: '0.15s',
        width: '100%',
        padding: '10px 15px',
        borderBottom: '1px solid silver',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.75)'
        },
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
        padding: '0px 30px 0px 0px'
    },
}));

function ListCategorysItem(props){
    const classes = useStyles();

    let history = useHistory();
  
    function redirect(path) {
        history.push(path);
    }
    const amount = getArticlesForTheCurrentMonth(props.hystoryList)
        .filter(hystoryListItem => hystoryListItem.type === props.type && hystoryListItem.category === props.name)
        .reduce((sum, current) => sum + current.amount, 0);

    return(
        <div className={classes.listItem} onClick={() => redirect(`/${props.type}/${props.name}`)}>
            <div>
                <Typography variant="h6">{props.name}</Typography>
                <Typography variant="subtitle1">{props.type}</Typography>
            </div>
            <div className={classes.container}>
                {
                    props.type === 'income'  ?
                    <Typography className={classes.income} variant="h6">{amount}</Typography>
                    :
                    <Typography className={classes.expenses} variant="h6">{`-${amount}`}</Typography>
                }
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        hystoryList: state.financialHistory.hystoryList,
    }
}

ListCategorysItem.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    hystoryList: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        user: PropTypes.string,
        category: PropTypes.string,
        type: PropTypes.string,
        amount: PropTypes.number,
        description: PropTypes.string,
        date: PropTypes.number,
        __v: PropTypes.number,
    })),
}

export default connect(mapStateToProps)(ListCategorysItem);