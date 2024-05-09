import { Icon } from '@material-ui/core';
import { AppBar, ListItem, ListItemText, makeStyles, Toolbar, Hidden, Drawer, Divider } from '@material-ui/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../assets/jss/navbarStyles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles(styles);

export default function Navbar(props) {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    // Method to find out the active route
    const activeRoute = (route) => {
        return window.location.href.indexOf(route) > -1 ? true : false
    }

    const handleMenuClick = () => {
        setOpen(!open);
    }

    return (
        <div>
            <AppBar elevation={15} className={classes.appBarStyle}>
                <Toolbar>
                    <h1 className={classes.flex} >SocioMap</h1>
                    <Hidden smDown>
                        <div className={classes.linkPlacement}>
                            {
                                props.routes.map((route, key) => {
                                    const listItemClasses = classNames({
                                        [classes.linkStyle]: true,
                                        [classes.activeRoute]: activeRoute(route.path)
                                    })
                                    return (
                                        <NavLink
                                            to={route.path}
                                            key={key}
                                            className={classes.navLink}
                                        >
                                            <ListItem className={listItemClasses}>
                                                <ListItemText
                                                    primary={route.name}
                                                    className={classes.textStyle}
                                                />
                                            </ListItem>
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                    </Hidden>
                    <Hidden mdUp>
                        <MenuIcon onClick={handleMenuClick} />
                        <Drawer
                            open={open}
                            anchor="right"
                            classes={{
                                paper: classes.drawerPaper
                            }}
                        >
                            <ChevronLeftIcon onClick={handleMenuClick} />
                            <div className={classes.listItems}>
                                {
                                    props.routes.map((route, key) => {
                                        const listItemClasses = classNames({
                                            [classes.linkStyle]: true,
                                            [classes.activeRoute]: activeRoute(route.path)
                                        })
                                        return (
                                            <NavLink
                                                to={route.path}
                                                key={key}
                                                className={classes.navLink}
                                            >
                                                <ListItem className={listItemClasses}>
                                                    <ListItemText
                                                        primary={route.name}
                                                        className={classes.textStyle}
                                                    />
                                                </ListItem>
                                            </NavLink>
                                        )
                                    })
                                }
                            </div>
                        </Drawer>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    )

}