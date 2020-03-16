import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
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
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', margin: '15px 0px'}}>
                <Button
                    onClick={() => this.props.getList(true)}
                    variant="outlined"
                    color="primary"
                    startIcon={<ListIcon />}
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
        getList: (getAll) => dispatch(getList(getAll)),
        getCategorys: () => dispatch(getCategorys())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWrapper);