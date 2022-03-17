import React from "react"
import { Switch, Route, Redirect } from "react-router"
import Authpage from "./pages/AuthPage/AuthPage"
import Mainpage from "./pages/MainPage/MainPage"


export const useRoutes = (isLogin) => {
    if(isLogin) {
        return (
            <Switch>
                <Route path="/" component={Mainpage} />
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
                <Route path="/login" component={Authpage} />
                <Redirect to="/login" />
            </Switch>
    )
}