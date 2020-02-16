import React from 'react';
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { SvgIcon } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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

function ThunkItRegistration(props) {
    const classes = useStyles();
    let history = useHistory();
    function handleClick(path) {
      history.push(path);
      props.onNewAccount();
    }

    return(
        <div className={classes.wrapper}>
        <Card className={classes.root}>
            <CardHeader
                title="Thunk it registration"
            />
            <CardContent>
              <SvgIcon color='primary' fontSize='large' component={HowToRegIcon}/>
              <br/>
              <Typography variant='overline'>To continue <Link onClick={() => handleClick('/login')} style={{ cursor: 'pointer' }} color='secondary'>log in</Link></Typography><br/>
              <Typography variant='overline'><Link onClick={() => handleClick('/registration')} style={{ cursor: 'pointer' }} color='secondary'>Create new account</Link></Typography>
            </CardContent>
        </Card>
        </div>
    )
}

ThunkItRegistration.propTypes = {
  onNewAccount: PropTypes.func.isRequired,
};

export default ThunkItRegistration;