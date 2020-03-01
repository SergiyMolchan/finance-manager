import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import parseDateToStr from '../tools/parseDateToStr';
import {getList} from '../actions/getFinancialHistory';
import AddHystoryElem from './AddHystoryElem/AddHystoryElem';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        margin: '20px 0px',
        padding: '20px 0px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
    }
}));


function ListItem(props){
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
class List extends React.Component{

    componentDidMount(){
        this.props.getList();
    }

    render(){
        return this.props.loading ?
            <LinearProgress/>
        :
        <>
            <Card style={{minWidth: 275, margin: '20px 0px', padding: '20px 0px'}}>
                {
                    this.props.hystoryList.length === 0 ?
                        <Typography style={{textAlign: 'center'}} variant='body1'>Your financial history is empty.</Typography>
                    :
                    this.props.hystoryList.map(item => 
                      <ListItem
                          key={item._id} 
                          date={item.date} 
                          type={item.type}
                          amount={item.amount} 
                          description={item.description}
                          category={item.category}
                      />
                  )
                }
            </Card>
            <AddHystoryElem/>
        </>
        }
}


function mapStateToProps(state){
    return{
        loading: state.financialHistory.loading,
        hystoryList: state.financialHistory.hystoryList,
        error: state.financialHistory.error
    }
}

function mapDispatchToProps(dispatch){
    return{
        getList: () => dispatch(getList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);