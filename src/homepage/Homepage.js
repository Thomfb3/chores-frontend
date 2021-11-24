import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Homepage() {
    const { currentUser, currentTeam } = useContext(UserContext);

    if (!currentUser) {
        return <Redirect to="/login"/>
    };
    if (!currentTeam) {
        return <Redirect to="/join-team"/>
    };
    return (
        <div className="Homepage">
            <h1 className="Homepage__hello">Hi {currentUser.firstName || currentUser.username}!<br></br>Let's get things done.</h1>
            <div className="Homepage__background">
            </div>
        </div>
    );
};

export default Homepage;