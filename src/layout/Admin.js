import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import styles from '../assets/jss/adminStyles';
import routes from '../routes'
import { Route, Switch, Redirect } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
// import { fetchStoreItems } from '../redux/storeItems'
import { useDispatch, useSelector } from 'react-redux';
import gifImage from '../assets/images/bubble-pop.gif'

const useStyles = makeStyles(styles);

const switchRoutes = (
    <Switch>
        {
            routes.map((prop, key) => {

                return (
                    <Route
                        path={prop.path}
                        component={prop.component}
                        key={key}
                    />
                )
            })
        }
    </Switch>
);

export default function Admin(props) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log(props);
        setTimeout(() => {
            setLoading(false);
        },2000)
    },[])
    // let notification = useSelector((state) => state.ui.notification);
    // const isAuthenticated = useSelector(state => state.login.isAuthenticated);

    return (
        <div>
            <div className={classes.wrapper}>

                {/* Navbar goes here */}
                <div className={classes.navbar}>
                    <Navbar
                        routes={routes}
                    />
                </div>
                <div className={classes.content}>
                    {
                        // isAuthenticated?
                        loading ?
                            <Grid container justifyContent='center' alignContent='center' style={{height: "80vh"}}>
                                <Grid item>
                                    <img src={gifImage} alt="Moving GIF" />
                                </Grid>
                            </Grid>
                            :
                            switchRoutes
                    }
                </div>
            </div>
        </div>
    )
}