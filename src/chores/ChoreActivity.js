import React, { useEffect, useState, useContext }from "react";
import findUserInTeam from "../helpers/findUserInTeam";
import formatDate from "../helpers/formatDate";
import UserContext from "../auth/UserContext";


function ChoreActivity({user, event, date}) { 
    const { currentUser, currentTeamUsers } = useContext(UserContext);

    const choreActivityDate = formatDate(date);
    const choreActivityUser = findUserInTeam(user, currentTeamUsers);

    return (
        <div>
            <p>{choreActivityUser.username}</p>
            <p>{event}</p>
            <p>{choreActivityDate}</p>
        </div>
    );
}


export default ChoreActivity