import React from 'react';
import PropTypes from 'prop-types';
import {NavLink, useHistory, BrowserRouter as Router} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavTabs(props) {
  const classes = useStyles();
  let history = useHistory();

  function handleClick(path) {
    history.push(path);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Finance manager app
          </Typography>
          <Router>
            <Button color="inherit" onClick={() => handleClick('/registration')}>Registration</Button>
            <Button color="inherit" onClick={() => handleClick('/login')}>Login</Button>
          </Router>
        </Toolbar>
      </AppBar>
    </div>
  );
}