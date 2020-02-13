import React, {useState} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import {validFormCreator, validFieldCreator,isRequiredFieldCreator, minLengthCreator, maxLengthCreator, repeatPasswordCreator} from '../tools/validators';
import {registration} from '../actions/registration';

const useStyles = makeStyles(
  theme => ({
    root: {
      minWidth: 275,
      maxWidth: 760,
      width: '100%',
      textAlign: 'center',
      margin: '0px 10px'
    },
    wrapper: {
      width: '100%',
      padding: '50px 0px',
      display: 'flex',
      justifyContent: 'center',
    },
    margin: {
      margin: theme.spacing(1),
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
  }));

function Registration() {
  const classes = useStyles();
  const [login = '', setLogin] = useState();
  const [password  = '', setPassword] = useState();
  const [repeatPassword  = '', setRepearPassword] = useState();
  const [isTouchedLogin = false, TouchLogin] = useState();
  const [isTouchedPassword, TouchPassword] = useState();
  const [isTouchedRepeatPassword, TouchRepeatPassword] = useState();

  const isReqiredLogin = isRequiredFieldCreator(login);
  const isReqiredPassword = isRequiredFieldCreator(password);
  const isReqiredRepeatPassword = isRequiredFieldCreator(repeatPassword);
  const minLength5 = minLengthCreator(5);
  const maxLenght30 = maxLengthCreator(30);
  const repeatPasswordValidator = repeatPasswordCreator(password, repeatPassword);
  const validFieldLogin = validFieldCreator([isReqiredLogin(), minLength5(login), maxLenght30(login)]);
  const validFieldPassword = validFieldCreator([isReqiredPassword(), minLength5(password), maxLenght30(password)]);
  const validFieldRepeatPassword = validFieldCreator([isReqiredRepeatPassword(), repeatPasswordValidator()]);
  const isValidRegistrationForm = validFormCreator([validFieldLogin(true), validFieldPassword(true), validFieldRepeatPassword(true)]);
  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardHeader
            title="Registration"
            subheader="Create new account"
        />
        <CardActions>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              onChange={e => setLogin(e.target.value)}
              onBlur={() => TouchLogin(true)}
              value={login}
              helperText={isTouchedLogin === true ? validFieldLogin() : false}
              error={isTouchedLogin === true ? validFieldLogin(true) : false}
              required
              fullWidth
              className={classes.margin}
              label="Login"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              onChange={e => setPassword(e.target.value)}
              onBlur={() => TouchPassword(true)}
              value={password}
              helperText={isTouchedPassword === true ? validFieldPassword() : false}
              error={isTouchedPassword === true ? validFieldPassword(true) : false}
              fullWidth
              required 
              className={classes.margin}
              label="Password" 
              type="password" 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              onChange={e => setRepearPassword(e.target.value)}
              onBlur={() => TouchRepeatPassword(true)}
              value={repeatPassword}
              helperText={isTouchedRepeatPassword === true ? validFieldRepeatPassword() : false}
              error={isTouchedRepeatPassword === true ? validFieldRepeatPassword(true) : false}
              fullWidth
              required 
              className={classes.margin}
              label="Repeat password" 
              type="password" 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<HowToRegIcon/>}
              disabled={isValidRegistrationForm()}
            >
              Create new account
            </Button>
          </form>
        </CardActions>
      </Card>
    </div>
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