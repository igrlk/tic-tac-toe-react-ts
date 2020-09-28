import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { lazyComponent } from './utils/lazyComponent';

const Dashboard = lazy(() => import('pages/Dashboard'));

export const Routes = () => (
	<Switch>
		<Route exact path='/dashboard' component={lazyComponent(Dashboard)} />
		<Redirect from='*' to='/dashboard' />
	</Switch>
);
