import React, { useContext } from "react";
import { Context } from '../index.js';
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { DASHBOARD_ROUTE, DEFAULT_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const Switcher = observer(() => {
    const { user } = useContext(Context);
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {!user.isAuth && publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {user.isAuth ? <Redirect to={DASHBOARD_ROUTE} /> : <Redirect to={DEFAULT_ROUTE} />}
        </Switch>
    );
});

export default Switcher;