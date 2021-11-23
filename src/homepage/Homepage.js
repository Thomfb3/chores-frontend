import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Homepage() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Redirect to="/login"/>
    };
    return (
        <div className="">
            <h1 className="">Welcome Back, {currentUser.firstName || currentUser.username} !</h1>
        </div>
    );
};

export default Homepage;