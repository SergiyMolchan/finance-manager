import React from 'react';
import {BrowserRouter, Switch, Route, Redirect, NavLink, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import NavTabs from './components/NavTabs';
import Registration from './components/Auth/Registration';
import Authorization from './components/Auth/Authorization';

function App(props) {
  return(
    <BrowserRouter>
      <NavTabs/>
      <Switch>
      {
        props.isAuth ?
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

function mapStateToProps(state){
  return{
    isAuth: !!state.auth.token,
  }
}

export default connect(mapStateToProps)(App);