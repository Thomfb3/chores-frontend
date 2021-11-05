import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Navigation() {
    const { currentUser, currentTeam, isAdmin } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/my-chores">
                        My Chores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chores">
                        Everyone's Chores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/unclaimed-chores">
                        Unclaimed Chores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/team">
                        The Team
                    </NavLink>
                </li>

                {isAdmin ? 
                   ( <li>
                        <NavLink to="/manage-chores">
                            Manage Chores
                        </NavLink>
                    </li>
                    ) 
                 :(null)}
            </ul>
        );
    };

    function loggedOutNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup">
                        Signup
                    </NavLink>
                </li>
            </ul>
        );
    };

    function loggedInNoTeamNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/create-team">
                        Create Team
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/join-team">
                        Join Team
                    </NavLink>
                </li>
            </ul>
        );
    };

    function determineNavigation() {
        if (currentUser && currentTeam) {
            return loggedInNav();
        } else if (currentUser) {
            return loggedInNoTeamNav();
        } else {
            return loggedOutNav();
        };
    };


    return (
        <nav className="Navigation">
            <div className="Navigation-logo-box">
                <Link to="/" className="Navigation-logo">
                    Chores
                </Link>
            </div>
            {determineNavigation()}
            <div>

            </div>
        </nav>
    );
};



export default Navigation;