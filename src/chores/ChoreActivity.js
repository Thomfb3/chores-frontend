import React, { useEffect, useState, useContext }from "react";
import findUserInTeam from "../helpers/findUserInTeam";
import { formatDate, formatShortDate, formatDay, formatTime } from "../helpers/formatDate";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import UserContext from "../auth/UserContext";


function ChoreActivity({user, status, event, date}) { 
    const { currentUser, currentTeamUsers } = useContext(UserContext);

    const choreActivityDate = formatDate(date);
    const choreActivityUser = findUserInTeam(user, currentTeamUsers);

    const activityStatus = !status ? "Unknown" : status;
    return (
        <div className="ChoreActivity">
            <div className={`ChoreActivity__status-marker ChoreActivity__status-marker--${status}`}>{capitalizeFirstLetter(activityStatus)}</div>
            <p className="ChoreActivity__event">{`${capitalizeFirstLetter(event)} - `}</p>
            <p className="ChoreActivity__event">{`by ${choreActivityUser.username} - `}</p>
            <p className="ChoreActivity__date">{`on ${formatShortDate(date)} @ ${formatTime(date)}`}</p>
        </div>
    );
}


export default ChoreActivity