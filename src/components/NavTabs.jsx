import React from 'react';
import {connect} from 'react-redux';
import {useHistory, BrowserRouter as Router} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {logout} from '../actions/auth';

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

function NavTabs(props) {
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
            Finance manager
          </Typography>
          <Router>
            {
              props.isAuth ?
              <>
                <Button variant="outlined" className={classes.menuButton} color="inherit" onClick={() => handleClick('/categorys')}>Categorys</Button>
                <Button variant="outlined" className={classes.menuButton} color="inherit" onClick={() => props.logout()}>Logout</Button>
              </>
              :              
              <>
                <Button variant="outlined" className={classes.menuButton} color="inherit" onClick={() => handleClick('/registration')}>Registration</Button>
                <Button variant="outlined" className={classes.menuButton} color="inherit" onClick={() => handleClick('/login')}>Login</Button>
              </>
            }
          </Router>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state){
  return{
    isAuth: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch){
  return{
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavTabs);