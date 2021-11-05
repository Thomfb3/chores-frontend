import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

function AdminRoute({ exact, path, children }) {
    const { currentUser, currentTeam, isAdmin } = useContext(UserContext);
    console.debug(
        "PrivateRoute",
        "exact=", exact,
        "path=", path,
        "currentUser=", currentUser,
        "currentTeam=", currentTeam,
        "isAdmin=", isAdmin
    );

    if (!isAdmin) {
        return <Redirect to="/homepage" />
    };
    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
};

export default AdminRoute;