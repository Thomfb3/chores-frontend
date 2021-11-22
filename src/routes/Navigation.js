import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import HeaderProfile from "../common/HeaderProfile";
import UserContext from "../auth/UserContext";
import choreBoardLogo from "../assets/images/chore-board-logo.svg";

function Navigation({ logout }) {
    const { currentUser, currentTeam, isAdmin } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/my-chores"
                        className="Navigation__link"
                        activeClassName="Navigation__link-active" >
                        My Chores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/all-chores"
                        className="Navigation__link"
                        activeClassName="Navigation__link-active" >

                        Everyone's Chores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/unclaimed-chores"
                        className="Navigation__link"
                        activeClassName="Navigation__link-active" >
                        Unclaimed Chores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/team"
                        className="Navigation__link"
                        activeClassName="Navigation__link-active" >
                        The Team
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/rewards"
                        className="Navigation__link"
                        activeClassName="Navigation__link-active" >
                        Rewards
                    </NavLink>
                </li>
                {isAdmin ?
                    <li>
                        <NavLink to="/manage-chores"
                            className="Navigation__link"
                            activeClassName="Navigation__link-active" >
                            Manage Chores
                            </NavLink>
                    </li>
                    : (null)}
                {isAdmin ?
                    <li>
                        <NavLink to="/manage-rewards"
                            className="Navigation__link"
                            activeClassName="Navigation__link-active" >
                            Manage Rewards
                            </NavLink>
                    </li>
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
            <div className="Navigation__nav">
                {determineNavigation()}
            </div>
            <div>
            </div>
        </nav>
    );
};



export default Navigation;