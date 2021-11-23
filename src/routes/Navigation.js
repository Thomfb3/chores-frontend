import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import HeaderProfile from "../common/HeaderProfile";
import UserContext from "../auth/UserContext";
import choreBoardLogo from "../assets/images/chore-board-logo.svg";
import MobileNavigation from "./MobileNavigation"

function Navigation({ logout }) {
    const { currentUser, currentTeam, isAdmin } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="Navigation__list">
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
                {/* <li>
                    <NavLink to="/login" style={{textDecoration:"none"}}>
                        <Button
                            sx={{ m: 2, backgroundColor: '#1193ff', borderRadius: '5px', textDecoration: "none" }}
                                variant="contained"
                        >
                            Login
                        </Button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup" style={{textDecoration:"none"}}>
                        <Button
                            sx={{ m: 2, backgroundColor: '#1193ff', borderRadius: '5px', textDecoration: "none" }}
                                variant="contained"
                        >
                            Signup
                        </Button>
                    </NavLink>
                </li> */}
            </ul>
        );
    };


    function loggedInNoTeamNav() {
        return (

            <ul>
                <p className="Body__no-team-message">You'll need to be on team to play. If you don't have a team you can make one. Remember your team's password so others can join. You only need to login to a team once.</p>
                {/* <li>
                    <NavLink to="/create-team">
                        Create Team
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/join-team">
                        Join Team
                    </NavLink>
                </li> */}
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
            <div className="Navigation__nav">
            {(currentUser && currentTeam) ?
               <MobileNavigation />
                :
                (null) 
            }
                <div className="Navigation__logo-box">
                    <Link to="/">
                        <img className="Navigation__logo" src={choreBoardLogo} alt={"Chore Board Logo"}></img>
                    </Link>
                </div>
                <div className="Navigation__profile">
                {currentUser ? <HeaderProfile logout={logout} /> : " "}
                </div>
            </div>
            {determineNavigation()}
        </nav>
    );
};



export default Navigation;