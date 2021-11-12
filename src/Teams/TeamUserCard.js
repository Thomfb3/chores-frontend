import React, { useContext } from "react";
import { Link } from "react-router-dom";
import defaultProfileImage from '../assets/images/default-profile-pic.gif';
import UserContext from "../auth/UserContext";
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';

function TeamUserCard({ id, isCurrentUser, profileImage, username, firstName, isAdmin, points }) {
    console.debug("TeamUserCard");
    const { currentUser, currentTeamUsers } = useContext(UserContext);

    const defaultProfilePic = (currentUser.profileImage === "defaultProfile.jpg")
        ? defaultProfileImage
        : currentUser.profileImage;

    return (
        <div className="TeamUserCard">
  
            <div className="TeamUserCard__box-shadow">
            
            <div className="TeamUserCard__other"></div>
                <div className="TeamUserCard__clipped"></div>
            </div>

            <div className="TeamUserCard__container">

                <div className="TeamUserCard__inner-container">
                    {(isAdmin) &&
                        <StarIcon
                            sx={{
                                position: 'absolute',
                                color: '#1093ff',
                                padding: '0px',
                                margin: '0px',
                                float: 'left',
                                zIndex: '3',
                                transform: 'translateX(-6px)'
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
                    <p className="TeamUserCard__points">{points} pts</p>
                </div>
            </div>
        </div>
    );
};

export default TeamUserCard;