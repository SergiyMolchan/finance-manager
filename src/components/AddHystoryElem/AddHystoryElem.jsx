import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddIncomeOrExpenses from './AddIncomeOrExpenses';
import AddCategory from './AddCategory';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
        );
    }
  
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
  
    function a11yProps(index) {
        return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        };
    }

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
}));

function AddHystoryElem() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
    <div>
        <IconButton onClick={handleOpen} 
            color='default' 
            aria-label="add" 
            style={{zIndex: 10, backgroundColor:'#3f51b5', position: 'fixed', left: 10, bottom: 10}} 
            className={classes.margin}>
            <AddIcon fontSize="large" />
        </IconButton>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
                        <Tab label="Add item income or expenses" {...a11yProps(0)} />
                        <Tab label="Add category" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <AddIncomeOrExpenses/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AddCategory/>
                </TabPanel>
            </div>
            </Fade>
        </Modal>
    </div>
    );
}

export default AddHystoryElem;