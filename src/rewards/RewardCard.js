import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../helpers/formatDate";
import findUserInTeam from "../helpers/findUserInTeam";
import UserContext from "../auth/UserContext";

function RewardCard({
    id,
    title,
    description,
    points,
    status,
    sponsor,
    createdBy,
    createdAt
}) {

    console.debug("RewardCard");
    const { currentTeamUsers } = useContext(UserContext);
    const createdByUser = findUserInTeam(createdBy, currentTeamUsers);
    const foundSponsor = findUserInTeam(sponsor, currentTeamUsers);

    return (
        <Link to={`/rewards/${id}`} className="RewardCard">
            <div className="RewardCard__container">
                <div className="RewardCard__inner-container RewardCard__inner-container--align-center">
                    <div className="RewardCard__title-grow">
                        <p className="RewardCard__title">{title}</p>
                        <p className="RewardCard_description">{description}</p>
                    </div>
                    <div className="RewardCard__points-section">
                        <p>Points Required</p>
                        <p className="RewardCard__points">{points} pts</p>
                    </div>
                    <div className="RewardCard__sponsor-section">
                        <p className="RewardCard__status">{status === "open" ? "Available" : "Currently Unavailable"}</p>
                        <p className="RewardCard__sponsor-label">Sponsored by:</p>
                        <p className="RewardCard__sponsor">{foundSponsor.username}</p>
                    </div>
                </div>
                <p className="RewardCard__footer">{`Reward was created at ${formatDate(createdAt)}, by ${createdByUser.username}`}</p>
            </div>
        </Link>
    );
};

export default RewardCard;




