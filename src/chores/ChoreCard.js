import React, { useContext } from "react";
import { Link } from "react-router-dom";
import formatDate from "../helpers/formatDate";
import findUserInTeam from "../helpers/findUserInTeam";
import UserContext from "../auth/UserContext";

function ChoreCard({
    id,
    title,
    description,
    points,
    status,
    assigneeUsername,
    assigneeName,
    assigneeImage,
    choreImage,
    assigner, 
    assignee,
    createdBy,
    createdAt, 
    dueDate,
    cardType 
    }) {

    console.debug("ChoreCard");
    const { currentUser, currentTeamUsers } = useContext(UserContext);

    if (cardType==="MyChoreList") {
        const userAssignee = findUserInTeam(assignee, currentTeamUsers);
        const userAssigner = findUserInTeam(assigner, currentTeamUsers);

        return (
            <Link to={`/chores/${id}`}>
                <div className="" style={{border: "1px solid red", margin: "20px"}}>
                <div className="">{userAssignee.profileImage && 
                <img 
                    className="" 
                    alt={userAssignee.profileImage}
                    src={userAssignee.profileImage}
                     /> 
                    }
                <p>{userAssignee.firstName}</p>
                </div>
                    <div className="">
                        <h4>{title}</h4>
                        <p>{description}</p>
                        <p className="">{points}</p>
                        <p className="">{formatDate(dueDate)}</p>
                        <p className="">{`Chore was created at ${formatDate(createdAt)}, by ${userAssigner.username}`}</p>
                    </div>
                </div>
            </Link>
        );

    } else if (cardType==="TeamChoresList") { 
        return (
            <Link to={`/chores/${id}`}>
                <div className="" style={{border: "1px solid red", margin: "20px"}}>
                <div className="">{assigneeImage && 
                <img 
                    className="" 
                    alt={assigneeImage}
                    src={assigneeImage}
                     /> 
                    }
                <p>{assigneeUsername}</p>
                <p>{assigneeName}</p>
                </div>
    
                    <div className="">
                        <h4>{title}</h4>
                        <p>{status}</p>
                        <p>{description}</p>
                        <p className="">{points}</p>
                        <p className="">{formatDate(dueDate)}</p>
                    </div>
                </div>
            </Link>
        );
    } else if (cardType==="UnclaimedChoresList") {
        const createdByUser = findUserInTeam(createdBy, currentTeamUsers);
        return (
            <Link to={`/chores/${id}`}>
                <div className="" style={{border: "1px solid red", margin: "20px"}}>
       
                    <div className="">
                        <h4>{title}</h4>
                        <p>{description}</p>
                        <p className="">{points}</p>
                        <p className="">{formatDate(dueDate)}</p>
                        <p className="">{`Chore was create at ${formatDate(createdAt)}, by ${createdByUser.username}`}</p>
                    </div>
                </div>
            </Link>
        );
    }
};


export default ChoreCard;




