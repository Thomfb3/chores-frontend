import React, { useContext } from "react";
import findUserInTeam from "../helpers/findUserInTeam";
import { determineProfilePic } from "../helpers/determineProfilePic";
import UserContext from "../auth/UserContext";
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';

function TeamUserCard({
    id,
    isCurrentUser,
    position,
    profileImage,
    username,
    firstName,
    isAdmin,
    currentPoints,
    allTimePoints,
    pointsView
}) {
    console.debug("TeamUserCard");
    const { currentTeamUsers } = useContext(UserContext);
    const teamUser = findUserInTeam(id, currentTeamUsers);

    const determineOrdinal = (position) => {
        if (+position <= 3) return "top-three";
        let str = position.toString();
        if (str.charAt(str.length - 1) === "1") return "st";
        if (str.charAt(str.length - 1) === "2") return "nd";
        if (str.charAt(str.length - 1) === "3") return "rd";
        return "th";
    };

    const determinePositionStyle = (position) => {
        if (position === 1) return "first";
        if (position === 2) return "second";
        if (position === 3) return "third";
        if (position > 3) {
            return `other-number--${determineOrdinal(position)}`;
        };
    };

    const determinePointView = (pointsView) => {
        if (pointsView === "all") {
            return (
                <div className="TeamUserCard__all-points">
                    <p className={`TeamUserCard__all-points--label`}>All Time Points</p>
                    <p className={`TeamUserCard__all-points--points TeamUserCard__points-${determinePositionStyle(position)}`}>{allTimePoints} pts</p>
                </div>
            )
        } else {
            return (
                <div className="TeamUserCard__all-points">
                    <p className={`TeamUserCard__all-points--label`}>Current Points</p>
                    <p className={`TeamUserCard__all-points--points TeamUserCard__points-${determinePositionStyle(position)}`}>{currentPoints} pts</p>
                </div>
            )
        }
    };

    return (
        <div className="TeamUserCard">
            <div className={`TeamUserCard__container TeamUserCard__container--${determinePositionStyle(position)}`}>
                <div className="TeamUserCard__inner-container TeamUserCard__inner-container--align-center">
                    <div className="TeamUserCard__left">
                        <div className="TeamUserCard__position-container">
                            <div className={`TeamUserCard__position TeamUserCard__${determinePositionStyle(position)}`}>{position}</div>
                        </div>
                        {(isAdmin) &&
                            <StarIcon
                                className="TeamUserCard__star"
                                sx={{

                                }}
                            />
                        }
                        <Avatar
                            className="Profile__avatar--component"
                            alt={determineProfilePic(teamUser)}
                            src={determineProfilePic(teamUser)}
                            sx={{ width: 65, height: 65 }}
                        >{firstName.charAt(0)}</Avatar>
                        <div className="TeamUserCard__name">
                            <div>
                                <p className="TeamUserCard__firstname">{firstName}</p>
                                <p className="TeamUserCard__username">{username}</p>
                            </div>
                            <div className="TeamUserCard__titles">
                                {isCurrentUser ? <p>{`(Me)`}</p> : ""}
                                {isAdmin ? <p>{`(Team Manager)`}</p> : ""}

                            </div>
                        </div>
                    </div>
                    {determinePointView(pointsView)}
                </div>
            </div>
        </div>
    );
};

export default TeamUserCard;