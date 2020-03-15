import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddHystoryElem from '../AddHystoryElem/AddHystoryElem';
import {getList} from '../../actions/getFinancialHistory';
import {getCategorys} from '../../actions/getCategorys';

class ListWrapper extends React.Component{

    componentDidMount(){
        if(this.props.categorys.length === 0 && this.props.hystoryList.length === 0){
            this.props.getList();
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
        getList: () => dispatch(getList()),
        getCategorys: () => dispatch(getCategorys())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWrapper);