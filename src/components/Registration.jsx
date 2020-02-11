import React from 'react';
import {connect} from 'react-redux';
import {registration} from '../actions/registration';

function Registration() {
  return (
      <>
        <p>register</p>
      </>
  );
}

function mapStateToProps(state){
  return{
    error: state.registration.error,
    loading: state.registration.loading
  }
}

function mapDispatchToProps(dispatch){
  return{
    registration: (login, password) => dispatch(registration(login, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);