import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

function PrivateRoute({ exact, path, children }) {
    const { currentUser, currentTeam } = useContext(UserContext);
    console.debug(
        "PrivateRoute",
        "exact=", exact,
        "path=", path,
        "currentUser=", currentUser,
        "currentTeam=", currentTeam
    );

    if (!currentUser) {
        return <Redirect to="/homepage" />
    };
    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
};

export default PrivateRoute;