import React, { useEffect, useState, useContext }from "react";
import findUserInTeam from "../helpers/findUserInTeam";
import formatDate from "../helpers/formatDate";
import UserContext from "../auth/UserContext";

function ChoreComment({user, comment, date}) { 
    const { currentUser, currentTeamUsers } = useContext(UserContext);
    const choreCommentUser = findUserInTeam(user, currentTeamUsers)

    return (
        <div>
            <p>{choreCommentUser.username}</p>
            <img 
                    className="" 
                    alt={choreCommentUser.profileImage}
                    src={choreCommentUser.profileImage}
                /> 
            <p>{formatDate(date)}</p>
            <p>{comment}</p>
        </div>
    );
};

export default ChoreComment