import React, {useState} from 'react';
import PropTypes from 'prop-types';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import {validFormCreator, validFieldCreator,isRequiredFieldCreator, minLengthCreator, maxLengthCreator} from '../../tools/validators';
import {Authorization} from '../../actions/auth';

const useStyles = makeStyles(
  theme => ({
    root: {
        minWidth: 275,
        maxWidth: 760,
        width: '100%',
        textAlign: 'center',
        margin: '0px 10px',
        padding: '10px 0px'
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

function Auth(props) {
    const classes = useStyles();
    const [login = '', setLogin] = useState();
    const [password  = '', setPassword] = useState();
    const [isTouchedLogin = false, TouchLogin] = useState();
    const [isTouchedPassword, TouchPassword] = useState();

    const isReqiredLogin = isRequiredFieldCreator(login);
    const isReqiredPassword = isRequiredFieldCreator(password);
    const minLength6 = minLengthCreator(6);
    const maxLenght30 = maxLengthCreator(30);
    const validFieldLogin = validFieldCreator([isReqiredLogin(), minLength6(login), maxLenght30(login)]);
    const validFieldPassword = validFieldCreator([isReqiredPassword(), maxLenght30(password)]);
    const isValidRegistrationForm = validFormCreator([validFieldLogin(true), validFieldPassword(true)]);
  
    return (
        <div className={classes.wrapper}>
        <Card className={classes.root}>
            <CardHeader
                title="Log in"
                subheader="Log in to an already created account"
            />
            {props.loading === true ? <LinearProgress/> : false}
            <CardActions>
            <form className={classes.root} noValidate autoComplete="on">
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

                <Button
                onClick={() => props.Authorization(login, password)}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<HowToRegIcon/>}
                disabled={isValidRegistrationForm()}
                >
                Sign in
                </Button>
            </form>
            </CardActions>
            {!!props.error ? <Typography variant="body1" color="error">{props.error}</Typography> : false}
        </Card>
        </div>
    );
}

function mapStateToProps(state){
    return{
        error: state.auth.error,
        loading: state.auth.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        Authorization: (login, password) => dispatch(Authorization(login, password)),
    }
}

Auth.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    Authorization: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);