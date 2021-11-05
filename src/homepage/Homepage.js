import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Homepage() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return (
            <div className="">
                <h1 className="">Chores</h1>
                <p>All the jobs in one, convenient place.</p>
                <Link to="/login">
                    <button className="Button">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="Button">Signup</button>
                </Link>
            </div>
        );
    };
    return (
        <div className="">
            <h1 className="">Welcome Back, {currentUser.firstName || currentUser.username} !</h1>
        </div>
    );
}

export default Homepage;