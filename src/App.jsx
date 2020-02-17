import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import NavTabs from './components/NavTabs';
import Registration from './components/Auth/Registration';
import Authorization from './components/Auth/Authorization';
import {autoLogin} from "./actions/auth";

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
            <Route path='/' exact component={() => <p>page</p>}/>
            <Redirect to='/'/>
          </> 
          : 
          <>
            <Route path='/login' component={Authorization}/>
            <Route path='/registration' component={Registration}/>
            <Redirect to='/registration'/>
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
  }
}

function mapDispatchToProps(dispatch){
  return{
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);