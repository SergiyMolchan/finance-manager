import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import AddHystoryElem from '../AddHystoryElem/AddHystoryElem';
import {getListOfCurrentMonth} from '../../actions/getListOfCurrentMonth';
import {getListAll} from '../../actions/getListAll';
import {getCategorys} from '../../actions/getCategorys';

class ListWrapper extends React.Component{

    componentDidMount(){
        if(this.props.categorys.length === 0 && this.props.hystoryList.length === 0){
            this.props.getListOfCurrentMonth();
            this.props.getCategorys();
        }
    }

    render(){
        return this.props.loading ?
            <LinearProgress/>
        :
        <>
            <Card style={{minWidth: 275, margin: '20px 0px', padding: '20px 0px'}}>
                {
                    this.props.hystoryList.length !== 0 ?
                        this.props.children
                    :
                    <Typography style={{textAlign: 'center'}} variant='body1'>Your financial history is empty.</Typography>
                }
            </Card>
            <AddHystoryElem/>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', margin: '15px 0px'}}>
                <Button
                    onClick={() => this.props.getListAll()}
                    variant="outlined"
                    color="primary"
                    startIcon={<GetAppIcon />}
                >
                    Download the entire list
                </Button>
            </div>
        </>
    }
}

function mapStateToProps(state){
    return{
        loading: -1 !== [state.financialHistory.loading, state.categorys.loading].indexOf(true),
        hystoryList: state.financialHistory.hystoryList,
        categorys: state.categorys.categorys,
        error: state.financialHistory.error
    }
}

function mapDispatchToProps(dispatch){
    return{
        getListOfCurrentMonth: (getAll) => dispatch(getListOfCurrentMonth(getAll)),
        getCategorys: () => dispatch(getCategorys()),
        getListAll: () => dispatch(getListAll())
    }
}

ListWrapper.propTypes = {
    loading: PropTypes.bool,
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
    categorys: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string
    })),
    error: PropTypes.string,
    getListOfCurrentMonth: PropTypes.func,
    getCategorys: PropTypes.func,
    getListAll: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWrapper);