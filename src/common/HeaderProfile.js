import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";


function HeaderProfile({ logout }) {
    const { currentUser, currentTeam } = useContext(UserContext);

    return (
        <div>
            <NavLink to="/profile">
                Profile
            </NavLink>

            <NavLink to="/" onClick={logout}>
                Logout <small>{currentUser.firstName || currentUser.username}</small>
            </NavLink>
        </div>
    );
}


export default HeaderProfile;