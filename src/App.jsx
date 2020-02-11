import React from 'react';
import {BrowserRouter, Switch, Route, Redirect, NavLink, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import NavTabs from './components/NavTabs';
import Registration from './components/Registration';

function AccessRoutes(props){
  if(props.isAuth){
    return(
      <Switch>
        <Route path='/' exact component={() => <p>page</p>}/>
        <Redirect to='/'/>
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path='/login' component={() => <p>login</p>}/>
        <Route path='/registration' component={Registration}/>
        <Redirect to='/registration'/>
      </Switch>
    );
  }
}

function App(props) {
  return(
    <BrowserRouter>
      <NavTabs/>
      <AccessRoutes/>
    </BrowserRouter>
  )
}

function mapStateToProps(state){
  return{
    isAuth: !!state.auth.token
  }
}

export default connect(mapStateToProps)(App);