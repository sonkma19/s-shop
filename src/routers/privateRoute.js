
import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../action/auth'

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isLogin() ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )
    )} />

)


export default PrivateRoute
