import React, { useContext } from "react";
import findUserInTeam from "../helpers/findUserInTeam";
import { determineProfilePic } from "../helpers/determineProfilePic";
import { formatLongDate, formatTime } from "../helpers/formatDate";
import UserContext from "../auth/UserContext";
import Avatar from '@mui/material/Avatar';


function ChoreComment({ user, comment, date }) {
    const { currentUser, currentTeamUsers } = useContext(UserContext);
    const choreCommentUser = findUserInTeam(user, currentTeamUsers);

    return (
        <div className="ChoreComment">
            <div className="ChoreComment__details">
                <div className="ChoreComment__image">
                    {choreCommentUser.profileImage &&
                        <Avatar
                            className="Profile__avatar--component"
                            alt={determineProfilePic(choreCommentUser)}
                            src={determineProfilePic(choreCommentUser)}
                            sx={{ width: 45, height: 45 }}
                        >{choreCommentUser.username.charAt(0)}</Avatar>
                    }
                </div>
                <div className="ChoreComment__info">
                    <p className="ChoreComment__name">{choreCommentUser.username}</p>
                    <p className="ChoreComment__date">{`${formatLongDate(date)} @ ${formatTime(date)}`}</p>
                    <div className="ChoreComment__comment">
                        <p>{comment}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoreComment