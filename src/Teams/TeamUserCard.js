import React, { useContext } from "react";
import defaultProfileImage from '../assets/images/default-profile-pic.gif';
import UserContext from "../auth/UserContext";
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';

function TeamUserCard({ id, isCurrentUser, position, profileImage, username, firstName, isAdmin, points }) {
    console.debug("TeamUserCard");
    const { currentUser, currentTeamUsers } = useContext(UserContext);

    const defaultProfilePic = (currentUser.profileImage === "defaultProfile.jpg")
        ? defaultProfileImage
        : currentUser.profileImage;


    const determineOrdinal = (position) => {
        if (position > 3) return "top-three";
        let str = position.toString();
        if (str.charAt(str.length - 1) === "1") return "st";
        if (str.charAt(str.length - 1) === "2") return "nd";
        if (str.charAt(str.length - 1) === "2") return "rd";
    }

    const determinePositionStyle = (position) => {
        if (position === 1) return "first";
        if (position === 2) return "second";
        if (position === 3) return "third";
        if (position > 3) {
            return `other-number--${determineOrdinal(position)}`;
        } 
    }

    return (
        <div className="TeamUserCard">

            <div className="TeamUserCard__box-shadow">

                <div className="TeamUserCard__other"></div>
                <div className={`TeamUserCard__clipped TeamUserCard__clipped--${determinePositionStyle(position)}`}></div>
            </div>

            <div className="TeamUserCard__container">
                <div className="TeamUserCard__inner-container TeamUserCard__inner-container--align-center">
                    <div className="TeamUserCard__position-container">
                        <div className={`TeamUserCard__position TeamUserCard__${determinePositionStyle(position)}`}>{position}</div>
                    </div>
                    {(isAdmin) &&
                        <StarIcon
                            sx={{
                                position: 'absolute',
                                color: '#1093ff',
                                padding: '0px',
                                margin: '0px',
                                float: 'left',
                                zIndex: '3',
                                transform: 'translate(70px, -22px)',
                            }}
                        />
                    }
                    <Avatar
                        className="Profile__avatar--component"
                        alt={defaultProfilePic}
                        src={defaultProfilePic}
                        sx={{ width: 65, height: 65 }}
                    >{firstName.charAt(0)}</Avatar>

                    <div className="TeamUserCard__name-grow">
                        <div>
                            <p className="TeamUserCard__firstname">{firstName}</p>
                            <p className="TeamUserCard__username">{username}</p>
                        </div>
                        <div className="TeamUserCard__titles">
                            {isCurrentUser ? <p>{`(Me)`}</p> : ""}
                            {isAdmin ? <p>{`(Team Manager)`}</p> : ""}
                        </div>
                    </div>
                    <p className={`TeamUserCard__points TeamUserCard__points-${determinePositionStyle(position)}`}>{points} pts</p>
                </div>
            </div>
        </div>
    );
};

export default TeamUserCard;