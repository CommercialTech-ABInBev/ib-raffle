import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";
import { Grid } from '@material-ui/core';

// import Notifications from '../pages/admin/Notifications';
import CreateGift from '../pages/admin/CreateGift';
import Dashboard from '../pages/admin/Dashboard';
import Winners from '../pages/admin/Winners';
import Gifts from '../pages/admin/Gifts';

import Header from '../components/Header';

function AdminRoute() {

    return (
        <Grid container>
            <Header />
            <Switch>
                {/* <Route exact path="/admin/notifications" component={Notifications} /> */}
                <Route exact path="/admin/winners" component={Winners} />
                <Route exact path="/admin/gifts/create" component={CreateGift} />
                <Route exact path="/admin/gifts" component={Gifts} />
                <Route exact path="/admin" component={Dashboard} />
            </Switch>
        </Grid>
    )
}

export default AdminRoute;