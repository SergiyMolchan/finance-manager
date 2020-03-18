import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import NavTabs from './components/NavTabs';
import Registration from './components/Auth/Registration';
import Authorization from './components/Auth/Authorization';
import ListWrapper from './components/List/ListWrapper';
import getArticlesForTheCurrentMonth from '../src/tools/getArticlesForTheCurrentMonth';
import ListItemIncomeOrExpenses from './components/List/ListItemIncomeOrExpenses';
import ListCategorysItem from './components/List/ListCategorysItem';
import {autoLogin} from './actions/auth';

class App extends React.Component{

    componentDidMount(){
        this.props.autoLogin();
    }

    render(){
        return(
            <BrowserRouter>
                <NavTabs/>
                <Switch>
                {
                    this.props.isAuth ?
                    <>  
                        {
                            this.props.categorys.map(categoryItem => 
                                <Route key={categoryItem.type + '/' + categoryItem.name} path={'/' + categoryItem.type + '/' + categoryItem.name}>
                                    <ListWrapper>{
                                        getArticlesForTheCurrentMonth(this.props.hystoryList)
                                        .filter(hystoryListItem => hystoryListItem.type === categoryItem.type && hystoryListItem.category === categoryItem.name)
                                        .map(item => 
                                            <ListItemIncomeOrExpenses
                                                key={item._id} 
                                                date={item.date} 
                                                type={item.type}
                                                amount={item.amount} 
                                                description={item.description}
                                                category={item.category}
                                            />
                                        )
                                    }</ListWrapper>
                                </Route>
                            )
                        }
                        <Route path='/categorys'>
                            <ListWrapper>{
                                this.props.categorys.map(item => 
                                    <ListCategorysItem
                                        key={item._id}
                                        name={item.name}
                                        type={item.type}
                                    /> 
                                )
                            }</ListWrapper>
                        </Route>
                        <Route path='/' exact>
                            <ListWrapper>{
                                this.props.hystoryList.map(item => 
                                    <ListItemIncomeOrExpenses
                                        key={item._id} 
                                        date={item.date} 
                                        type={item.type}
                                        amount={item.amount} 
                                        description={item.description}
                                        category={item.category}
                                    />
                                )
                            }</ListWrapper>
                        </Route>
                        <Redirect to='/'/>
                    </> 
                    : 
                    <>
                        <Route path='/login' component={Authorization}/>
                        <Route path='/registration' component={Registration}/>
                        <Redirect to='/login'/>
                    </>     
                }
              </Switch>
            </BrowserRouter>
        )
    }
}

function mapStateToProps(state){
    return{
        isAuth: !!state.auth.token,
        categorys: state.categorys.categorys,
        hystoryList: state.financialHistory.hystoryList,
        error: state.financialHistory.error
    }
}

function mapDispatchToProps(dispatch){
    return{
        autoLogin: () => dispatch(autoLogin()),
    }
}

App.propTypes = {
    isAuth: PropTypes.bool,
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
    autoLogin: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);