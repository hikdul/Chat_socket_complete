import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect, } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {PublcRoute} from './PublcRoute'
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './privateRoute';


export const AppRouter = () => {

    const { auth, verifyToken } = useContext(AuthContext)
    console.log({ auth })
    useEffect(() => { verifyToken() }, [verifyToken])

    if (auth.checking)
        return <h1>please wait...</h1>

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route path="/auth" component={AuthRouter} />*/}
                    <PublcRoute isAuth={auth.logged} path="/auth" component={AuthRouter}  />
                    {/*<Route exact path="/" component={ChatPage} />*/}
                    <PrivateRoute isAuth={auth.logged} path="/" component={ChatPage}/>

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
