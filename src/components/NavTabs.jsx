import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(path) {
        history.push(path);
    }

    const openMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Finance manager
                    </Typography>
                        {
                            props.isAuth ?
                            <>  
                                <IconButton edge="start" className={classes.menuButton} onClick={openMenu} color="inherit" aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {handleClose(); handleClick('/') }}>Home</MenuItem>
                                    <MenuItem onClick={() => {handleClose(); handleClick('/categorys') }}>Categorys</MenuItem>
                                    <MenuItem onClick={() => {handleClose(); props.logout()}}>Logout</MenuItem>
                                </Menu>
                            </>
                            :              
                            <>
                                <Button variant="outlined" className={classes.menuButton} color="inherit" onClick={() => handleClick('/registration')}>Registration</Button>
                                <Button variant="outlined" className={classes.menuButton} color="inherit" onClick={() => handleClick('/login')}>Login</Button>
                            </>
                        }
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

NavTabs.propTypes = {
    isAuth: PropTypes.bool,
    logout: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(NavTabs);