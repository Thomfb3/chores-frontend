import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import HeaderProfile from "../common/HeaderProfile";
import UserContext from "../auth/UserContext";
import choreBoardLogo from "../assets/images/chore-board-logo.svg";

function Navigation({logout}) {
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
                <li>
                    <NavLink to="/rewards">
                        Rewards
                    </NavLink>
                </li>

                {isAdmin ?

                    (<span>
                        <li>
                            <NavLink to="/manage-chores">
                                Manage Chores
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manage-rewards">
                                Manage Rewards
                            </NavLink>
                        </li>
                    </span>
                    )
                    : (null)}
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
        {currentUser ? <HeaderProfile logout={logout} /> : " "}
            <div className="Navigation__logo-box">
                <Link to="/">
                   <img className="Navigation__logo" src={choreBoardLogo} alt={"Chore Board Logo"}></img>
                </Link>
            </div>
            {determineNavigation()}
            <div>

            </div>
        </nav>
    );
};



export default Navigation;