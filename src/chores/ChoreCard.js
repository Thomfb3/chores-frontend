import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDate, formatShortDate, formatDay } from "../helpers/formatDate";
import findUserInTeam from "../helpers/findUserInTeam";
import UserContext from "../auth/UserContext";
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./ChoreCard"
import defaultProfileImage from '../assets/images/default-profile-pic.gif';

function ChoreCard({
    id,
    title,
    description,
    points,
    status,
    assigneeName,
    assigneeImage,
    choreImage,
    assignerId,
    assignee,
    createdBy,
    createdAt,
    dueDate,
    cardType
}) {

    console.debug("ChoreCard");

    const { currentUser, currentTeamUsers } = useContext(UserContext);
    const determineStatusColorClass = (status, assignee) => {
        if (!assignee) {
            return "ChoreCard__unclaimed";
        }
        if (status === "open" || status === "rejected") {
            return "ChoreCard__need-to-do";
        }
        if (status === "pending") {
            return "ChoreCard__needs-review";
        }
        if (status === "approved") {
            return "ChoreCard__approved";
        }
    };

    const defaultProfilePic = (currentUser.profileImage === "defaultProfile.jpg")
    ? defaultProfileImage
    : currentUser.profileImage;

    console.log(status)
    if (cardType === "MyChoreList") {
        const userAssignee = findUserInTeam(assignee._id, currentTeamUsers);
        const userAssigner = findUserInTeam(assignerId, currentTeamUsers);
        return (
            <Link to={`/chores/${id}`} className="ChoreCard">
                <div className={`ChoreCard__container ${determineStatusColorClass(status, userAssignee)} `}>
                    <div className="ChoreCard__inner-container">
                        <div>
                            <p className="ChoreCard__title">{title}</p>
                            <p className="ChoreCard__name">{description}</p>
                        </div>
                        <div>
                            <p className="ChoreCard__points">{points} pts</p>
                        </div>
                        <div className="ChoreCard__due-date">
                            <p className="ChoreCard__due-date--label">Due Date</p>
                            <p className="ChoreCard__due-date--day">{formatDay(dueDate)}</p>
                            <p className="ChoreCard__due-date--date">{formatShortDate(dueDate)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="ChoreCard__footer">{`Chore was created and assigned to  by ${userAssigner.username} at ${formatDate(createdAt)}. Submit chore by due date.`}</p>
                    </div>
                </div>
            </Link>
        );

    } else if (cardType === "TeamChoresList") {
        const userAssignee = findUserInTeam(assignee._id, currentTeamUsers);
        return (
            <Link to={`/chores/${id}`} className="ChoreCard">
                <div className={`ChoreCard__container ${determineStatusColorClass(status, userAssignee)} `}>
                    {(userAssignee.role === "admin") &&
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
                    <div className="ChoreCard__inner-container ChoreCard__inner-container--align-center">

                        <div className="ChoreCard__image">
                            {assigneeImage &&
                                <Avatar
                                    className="Profile__avatar--component"
                                    alt={assigneeImage}
                                    src={defaultProfilePic}
                                    sx={{ width: 45, height: 45 }}
                                >{assigneeName.charAt(0)}</Avatar>
                            }
                        </div>
                        <div className="ChoreCard__name-grow">
                            <p className="ChoreCard__everyone-name">{assigneeName}
                                {(currentUser.username === userAssignee.username) &&
                                    <span className="ChoreCard__everyone-me">{'(me)'}</span>
                                }
                                {(userAssignee.role === "admin") &&
                                    <span className="ChoreCard__everyone-me">{'(Team Manager)'}</span>
                                }</p>
                            <p className="ChoreCard__everyone-title">{title}</p>
                        </div>
                        <div>
                            <p className={
                                (status === 'approved') ?
                                    "ChoreCard__everyone-points-approved"
                                    :
                                    "ChoreCard__everyone-points"}
                            >
                                {points} pts
                                </p>
                        </div>
                        {(status === 'approved') ?
                            <div className="ChoreCard__approved-section">
                                <p>Approved</p>
                                <CheckCircleOutlineIcon sx={{ fontSize: '30px', marginLeft: '5px' }} />
                            </div>
                            :
                            <div>
                                <p className="ChoreCard__everyone-due-date">{formatShortDate(dueDate)}</p>
                            </div>
                        }
                    </div>
                </div>
            </Link>
        );
    } else if (cardType === "UnclaimedChoresList") {
        const createdByUser = findUserInTeam(createdBy, currentTeamUsers);
        let userAssignee = false;
        return (
            <Link to={`/chores/${id}`} className="ChoreCard">
                <div className={`ChoreCard__container ${determineStatusColorClass(status, userAssignee)} `}>
                    <div className="ChoreCard__inner-container">
                        <div>
                            <p className="ChoreCard__title">{title}</p>
                            <p className="ChoreCard__name">{description}</p>
                        </div>
                        <div>
                            <p className="ChoreCard__points">{points} pts</p>
                        </div>
                        <div className="ChoreCard__due-date">
                            <p className="ChoreCard__due-date--label">Due Date</p>
                            <p className="ChoreCard__due-date--day">{formatDay(dueDate)}</p>
                            <p className="ChoreCard__due-date--date">{formatShortDate(dueDate)}</p>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
};


export default ChoreCard;




