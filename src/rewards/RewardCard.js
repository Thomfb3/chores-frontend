import React, { useContext } from "react";
import { Link } from "react-router-dom";
import formatDate from "../helpers/formatDate";
import findUserInTeam from "../helpers/findUserInTeam";
import UserContext from "../auth/UserContext";

function RewardCard({
    id,
    title,
    description,
    points,
    status,
    rewardImage,
    sponsor,
    createdBy,
    createdAt
}) {

    console.debug("RewardCard");
    const { currentUser, currentTeamUsers } = useContext(UserContext);
    const createdByUser = findUserInTeam(createdBy, currentTeamUsers);

    return (
        <Link to={`/rewards/${id}`}>
            <div className="" style={{ border: "1px solid red", margin: "20px" }}>
                <div className="">
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <p className="">{points}</p>
                    <p className="">{sponsor}</p>
                    <p className="">{status}</p>
                    <p className="">{`Reward was created at ${formatDate(createdAt)}, by ${createdByUser.username}`}</p>
                </div>
            </div>
        </Link>
    );
};


export default RewardCard;




