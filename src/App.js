import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

import { RouteGuard, history } from './routes';
import { Login, LiveMap, Dota, Geofence, LiveMonitor, FirmwareUpdate, Profile, FotaCampaign, DC, Dashboard } from './pages';
import { setAuthToken } from './utils';

import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './App.css';
import { UserActions } from './stores/actions';
import TripHistory from './pages/LiveMap/TripHistory/TripHistory';

function App() {
    const dispatch = useDispatch();
    const { login, themeColor } = useSelector(({ User }) => User);
    const { loading } = useSelector(({ App }) => App);
    const loaderRef = useRef(null);

    useEffect(() => {
        if (loading)
            loaderRef.current.continuousStart();
        else loaderRef.current.complete();
    }, [loading]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            setAuthToken(token.access);
            dispatch(UserActions.loginUserByToken(token))
        }
    }, [dispatch, login, themeColor]);

    return (
        <div className='app overflow-x-hidden'>
            <LoadingBar
                ref={loaderRef}
                color='#30AEFF'
                height={4}
                shadow={true}
                waitingTime={1500}
                loaderSpeed={1500}
            />

            <div style={{ filter: loading ? 'blur(2px)' : 'none', transition: 'filter 0.2s' }}>
                <Router history={history}>
                    <Switch>
                        <RouteGuard path="/dashboard" component={Dashboard} />
                        <RouteGuard path="/livemap/firmware_update" component={FirmwareUpdate} />
                        <RouteGuard path="/livemap/live_monitor" component={LiveMonitor} />
                        <RouteGuard path="/livemap/trip_history" component={TripHistory} />
                        <RouteGuard path="/livemap/geofence" component={Geofence} />
                        <RouteGuard path="/livemap/dota" component={Dota} />
                        <RouteGuard path="/livemap/device_config" component={DC} />
                        <RouteGuard path="/livemap/:id?" component={LiveMap} />
                        <RouteGuard path="/fota_campaign" component={FotaCampaign} />
                        <RouteGuard path="/profile" component={Profile} />
                        <Route path="/login" component={Login} />
                        <Route exact path='/' render={() => <Redirect to='/login' />} />
                        <Redirect to="/login" />
                    </Switch>
                </Router>
            </div>
            <NotificationContainer />
        </div>
    );
}

export default App;
